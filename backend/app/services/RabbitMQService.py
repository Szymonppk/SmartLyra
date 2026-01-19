import pika
import json
import os

class RabbitMQService:
    def __init__(self):
        self.host = os.getenv('RABBITMQ_HOST', 'rabbitmq')
        self.queue_name = 'audio_processing'

    def publish(self, message: dict):
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters(self.host))
            channel = connection.channel()
            
            channel.queue_declare(queue=self.queue_name)
            
            channel.basic_publish(
                exchange='',
                routing_key=self.queue_name,
                body=json.dumps(message)
            )
            connection.close()
            print(f" [RabbitMQ] Sent task: {message}")
        except Exception as e:
            print(f" [RabbitMQ ERROR] Connection error: {e}")
            