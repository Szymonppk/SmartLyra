from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_current_user, get_db
from app.models.User import User
from app.services.RecordingService import RecordingService
from app.schemas.RecordingSchema import RecordingSchema

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
            message="Plik przesłany, trwa analiza w tle.",
            created_at=recording.created_at
        )
    except Exception as e:
        print(f"Upload error: {e}")
        raise HTTPException(status_code=500, detail="Wystąpił błąd podczas przetwarzania pliku.")