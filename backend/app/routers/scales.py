from fastapi import APIRouter, HTTPException, Depends, Header
from typing import Optional

router = APIRouter(
    prefix="/api/scales",
    tags=["scales"]
)

SECRET_API_KEY = "a3b3c3-888"  # Jawnie na potrzeby laboratorium

DB_SCALES = [
    {
        "id": 1,
        "name": "C Major (Ionian)",
        "key": "C",
        "type": "major",
        "notes": ["C", "D", "E", "F", "G", "A", "B"]
    },
    {
        "id": 2,
        "name": "A Minor (Aeolian)",
        "key": "A",
        "type": "minor",
        "notes": ["A", "B", "C", "D", "E", "F", "G"]
    },
    {
        "id": 3,
        "name": "G Major (Ionian)",
        "key": "G",
        "type": "major",
        "notes": ["G", "A", "B", "C", "D", "E", "F#"]
    },
    {
        "id": 4,
        "name": "C Dorian",
        "key": "C",
        "type": "dorian",
        "notes": ["C", "D", "Eb", "F", "G", "A", "Bb"]
    }
]


async def verify_api_key(x_api_key: Optional[str] = Header(None)):

    if x_api_key is None:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized! Couldn't find X-API-Key, Code: 401"
        )

    if x_api_key != SECRET_API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Unathorized! Invalid X-API-Key, Code: 401"
        )

    return True


@router.get("/")
def get_scales(api_key_valid: bool = Depends(verify_api_key)):

    return DB_SCALES  # Framework automatycznie ustawia status 200 i zmienia obiekt na JSON

@router.get("/{id}")
def get_scale(id: int):  # Jesli nie bedzie int zwroci blad 422 Unprocessable Entity

    found_scale = None
    for scale in DB_SCALES:
        if scale["id"] == id:
            found_scale = scale
            break  

    if found_scale:
        return found_scale
    else:
        raise HTTPException(
            status_code=404,
            detail=f"Couldn't find a scale with id: {id}, Code: 404")
