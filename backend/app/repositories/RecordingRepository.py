from sqlalchemy.orm import Session
from app.models.Recording import Recording
from typing import Optional

class RecordingRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, recording: Recording) -> Recording:
        """Dodaje nowe nagranie do bazy."""
        self.db.add(recording)
        self.db.commit()
        self.db.refresh(recording)
        return recording

    def get_by_id(self, recording_id: int) -> Optional[Recording]:
        """Pobiera nagranie po ID."""
        return self.db.query(Recording).filter(Recording.id == recording_id).first()

    def update_detected_scale(self, recording_id: int, scale_id: int) -> Optional[Recording]:
        """Aktualizuje wykrytą skalę w nagraniu."""
        recording = self.get_by_id(recording_id)
        if recording:
            recording.detected_scale_id = scale_id
            self.db.commit()
            self.db.refresh(recording)
        return recording