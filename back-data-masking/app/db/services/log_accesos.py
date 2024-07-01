from sqlalchemy.orm import Session
from app.db import models
from app.db.schemas import schemas

def get_log_acceso(db: Session, log_acceso_id: int):
    return db.query(models.TDMASKLogAccesos).filter(models.TDMASKLogAccesos.log_acceso_id == log_acceso_id).first()

def get_all_log_accesos(db: Session):
    return db.query(models.TDMASKLogAccesos).all()

def create_log_acceso(db: Session, log_acceso: schemas.LogAccesoCreate):
    db_log_acceso = models.TDMASKLogAccesos(**log_acceso.dict())
    db.add(db_log_acceso)
    db.commit()
    db.refresh(db_log_acceso)
    return db_log_acceso

def update_log_acceso(db: Session, log_acceso_id: int, log_acceso_update: schemas.LogAccesoCreate):
    db_log_acceso = get_log_acceso(db, log_acceso_id)
    if db_log_acceso:
        for key, value in log_acceso_update.dict().items():
            setattr(db_log_acceso, key, value)
        db.commit()
        db.refresh(db_log_acceso)
    return db_log_acceso

def delete_log_acceso(db: Session, log_acceso_id: int):
    db_log_acceso = get_log_acceso(db, log_acceso_id)
    if db_log_acceso:
        db.delete(db_log_acceso)
        db.commit()
    return db_log_acceso