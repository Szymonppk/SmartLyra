from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.dependencies import get_current_user, get_db
from app.models.User import User
from app.services.RecordingService import RecordingService
from app.schemas.RecordingSchema import RecordingSchema, RecordingListSchema
from typing import List
import os

router = APIRouter(
    prefix="/api/recordings",
    tags=["recordings"]
)

@router.post("/upload", response_model=RecordingSchema)
def upload_recording(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = RecordingService(db)

    try:
        recording = service.process_new_recording(file, current_user.id)
        
        return RecordingSchema(
            id=recording.id,
            filename=recording.file_path,
            message="File sent, analyzing..",
            created_at=recording.created_at
        )
    except Exception as e:
        print(f"Upload error: {e}")
        raise HTTPException(status_code=500, detail="Error with file processing")
    

@router.get("/{recording_id}/download")
def download_recording(
    recording_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = RecordingService(db)
    recording = service.repository.get_by_id(recording_id) 

    if not recording:
        raise HTTPException(status_code=404, detail="Recording not found")
    
    
    if recording.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    
    if not os.path.exists(recording.file_path):
        raise HTTPException(status_code=404, detail="File not found on server")

    
    return FileResponse(
        path=recording.file_path, 
        filename=os.path.basename(recording.file_path),
        media_type='audio/wav'
    )


@router.get("/", response_model=List[RecordingListSchema])
def get_recordings(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    service = RecordingService(db)
    recordings = service.get_user_recordings(current_user.id)
    
    return [
        RecordingListSchema(
            id=rec.id,
            filename=rec.file_path, 
            created_at=rec.created_at,
            scale_name=rec.scale.name if rec.scale else (
                "Analyzing..." if rec.detected_scale_id is None else "Unknown"
            )
        )
        for rec in recordings
    ]