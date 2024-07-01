from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.schemas import schemas
from app.db.services import  eventos as crudeventos
from app.api.deps import get_db

router = APIRouter(tags=["Eventos"])

@router.post("/", response_model=schemas.Evento)
def create_evento(evento: schemas.EventoCreate, db: Session = Depends(get_db)):
    return crudeventos.create_evento(db=db, evento=evento)

@router.get("/{evento_id}", response_model=schemas.Evento)
def read_evento(evento_id: int, db: Session = Depends(get_db)):
    db_evento = crudeventos.get_evento(db, evento_id=evento_id)
    if db_evento is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return db_evento

@router.get("/", response_model=list[schemas.Evento])
def read_all_eventos(db: Session = Depends(get_db)):
    return crudeventos.get_all_eventos(db)

@router.put("/{evento_id}", response_model=schemas.Evento)
def update_evento(evento_id: int, evento: schemas.EventoCreate, db: Session = Depends(get_db)):
    db_evento = crudeventos.update_evento(db, evento_id, evento)
    if db_evento is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return db_evento

@router.delete("/{evento_id}", response_model=schemas.Evento)
def delete_evento(evento_id: int, db: Session = Depends(get_db)):
    db_evento = crudeventos.delete_evento(db, evento_id)
    if db_evento is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return db_evento
