import shutil
import os
from uuid import uuid4
from fastapi import UploadFile
from sqlalchemy.orm import Session
from app.models.Recording import Recording
from app.services.RabbitMQService import RabbitMQService
from app.repositories.RecordingRepository import RecordingRepository # <--- IMPORT

UPLOAD_DIR = "uploaded_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class RecordingService:
    def __init__(self, db: Session):
        self.repository = RecordingRepository(db)
        self.rabbit_service = RabbitMQService()

    def process_new_recording(self, file: UploadFile, user_id: int) -> Recording: 
        safe_filename = f"{user_id}_{uuid4()}.wav"
        file_path = os.path.join(UPLOAD_DIR, safe_filename)

        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        except Exception as e:
            raise Exception(f"Błąd zapisu na dysku: {str(e)}")

        
        recording_data = Recording(
            user_id=user_id,
            file_path=file_path,
            detected_scale_id=None
        )
        
        new_recording = self.repository.create(recording_data)

        message = {
            "recording_id": new_recording.id,
            "file_path": file_path,
            "user_id": user_id
        }
        self.rabbit_service.publish(message)

        return new_recording