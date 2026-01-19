import pika
import json
import time
import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

sys.path.append(os.path.dirname(os.path.abspath(__file__)))


from app.repositories.RecordingRepository import RecordingRepository
from app.models.Recording import Recording


RABBITMQ_HOST = os.getenv('RABBITMQ_HOST', 'localhost')
DATABASE_URL = os.getenv('DATABASE_URL')

if not DATABASE_URL:
    print(" [!] Brak DATABASE_URL.")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def analyze_audio_logic(file_path):
    print(f" [AI] Analyzing: {file_path}")
    time.sleep(5) 
    return 1 

def process_task(ch, method, properties, body):
    db = SessionLocal() 
    
    repo = RecordingRepository(db)

    try:
        data = json.loads(body)
        rec_id = data.get("recording_id")
        
        print(f" [Worker] Processing ID: {rec_id}")

       
        recording = repo.get_by_id(rec_id)
        
        if not recording:
            print(" [!] Recording not found!")
            ch.basic_ack(delivery_tag=method.delivery_tag)
            return

        
        scale_id = analyze_audio_logic(recording.file_path)

        
        repo.update_detected_scale(rec_id, scale_id)
        
        print(f" [Worker] Updated ID {rec_id} -> Scale {scale_id}")
        ch.basic_ack(delivery_tag=method.delivery_tag)

    except Exception as e:
        print(f" [!] Worker Error: {e}")
        db.rollback() 
    finally:
        db.close()

