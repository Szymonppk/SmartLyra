from app.models.Recording import Recording
from app.repositories.RecordingRepository import RecordingRepository
from app.models.User import User
import pika
import json
import time
import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append(os.path.dirname(os.path.abspath(__file__)))


RABBITMQ_HOST = os.getenv('RABBITMQ_HOST', 'localhost')
DATABASE_URL = os.getenv('DATABASE_URL')

if not DATABASE_URL:
    print(" [!] Missing DATABASE_URL. Ensure variables are set in docker-compose.", flush=True)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def analyze_audio_logic(file_path):
    print(f" [AI] Analyzing: {file_path}", flush=True)
    time.sleep(5)
    return 1


def process_task(ch, method, properties, body):
    db = SessionLocal()
    repo = RecordingRepository(db)

    try:
        data = json.loads(body)
        rec_id = data.get("recording_id")

        print(f" [Worker] Processing ID: {rec_id}", flush=True)

        recording = repo.get_by_id(rec_id)

        if not recording:
            print(" [!] Recording not found!", flush=True)
            ch.basic_ack(delivery_tag=method.delivery_tag)
            return

        scale_id = analyze_audio_logic(recording.file_path)

        repo.update_detected_scale(rec_id, scale_id)

        print(f" [Worker] Updated ID {rec_id} -> Scale {scale_id}", flush=True)
        ch.basic_ack(delivery_tag=method.delivery_tag)

    except Exception as e:
        print(f" [!] Worker Error: {e}")
        db.rollback()
    finally:
        db.close()


def main():
    print(
        f" [*] Worker starting... RabbitMQ Host: {RABBITMQ_HOST}", flush=True)

    connection = None
    while True:
        try:
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(RABBITMQ_HOST))
            break
        except pika.exceptions.AMQPConnectionError:
            print(" [.] RabbitMQ not ready. Waiting 5s...", flush=True)
            time.sleep(5)

    channel = connection.channel()

    channel.queue_declare(queue='audio_processing')

    channel.basic_qos(prefetch_count=1)

    channel.basic_consume(queue='audio_processing',
                          on_message_callback=process_task)

    print(' [*] Waiting for tasks. Press CTRL+C to exit.', flush=True)
    channel.start_consuming()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted by user')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
