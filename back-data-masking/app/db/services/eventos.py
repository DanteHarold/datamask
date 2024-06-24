from sqlalchemy.orm import Session
from app.db.schemas import schemas
from app.db import models

# Eventos

def get_evento(db: Session, evento_id: int):
    return db.query(models.TDMASKEventos).filter(models.TDMASKEventos.evento_id == evento_id).first()

def create_evento(db: Session, evento: schemas.EventoCreate):
    db_evento = models.TDMASKEventos(**evento.dict())
    db.add(db_evento)
    db.commit()
    db.refresh(db_evento)
    return db_evento

def update_evento(db: Session, evento_id: int, evento_update: schemas.EventoCreate):
    db_evento = get_evento(db, evento_id)
    if db_evento:
        for key, value in evento_update.dict().items():
            setattr(db_evento, key, value)
        db.commit()
        db.refresh(db_evento)
    return db_evento

def delete_evento(db: Session, evento_id: int):
    db_evento = get_evento(db, evento_id)
    if db_evento:
        db.delete(db_evento)
        db.commit()
    return db_evento