from sqlalchemy.orm import Session, joinedload
from app.models.Recording import Recording
from typing import Optional
from app.models.Scale import Scale
class RecordingRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, recording: Recording) -> Recording:
        
        self.db.add(recording)
        self.db.commit()
        self.db.refresh(recording)
        return recording

    def get_by_id(self, recording_id: int) -> Optional[Recording]:
       
        return self.db.query(Recording).filter(Recording.id == recording_id).first()

    def update_detected_scale(self, recording_id: int, scale_id: int) -> Optional[Recording]:
        
        recording = self.get_by_id(recording_id)
        if recording:
            recording.detected_scale_id = scale_id
            self.db.commit()
            self.db.refresh(recording)
        return recording
    
    def get_all_by_user(self, user_id: int):
        return (
            self.db.query(Recording)
            .options(joinedload(Recording.scale)) 
            .filter(Recording.user_id == user_id)
            .order_by(Recording.created_at.desc())
            .all()
        )