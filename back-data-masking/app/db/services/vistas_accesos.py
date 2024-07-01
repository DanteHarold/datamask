from sqlalchemy.orm import Session
from app.db.schemas import schemas
from app.db import models

# Log Accesos

def get_vista_acceso(db: Session, vista_acceso_id: int):
    return db.query(models.TDMASKVistasAccesos).filter(models.TDMASKVistasAccesos.vista_acceso_id == vista_acceso_id).first()

def get_all_vistas_accesos(db: Session):
    return db.query(models.TDMASKVistasAccesos).all()

def create_vista_acceso(db: Session, vista_acceso: schemas.VistaAccesoCreate):
    db_vista_acceso = models.TDMASKVistasAccesos(**vista_acceso.dict())
    db.add(db_vista_acceso)
    db.commit()
    db.refresh(db_vista_acceso)
    return db_vista_acceso

def update_vista_acceso(db: Session, vista_acceso_id: int, vista_acceso_update: schemas.VistaAccesoCreate):
    db_vista_acceso = get_vista_acceso(db, vista_acceso_id)
    if db_vista_acceso:
        for key, value in vista_acceso_update.dict().items():
            setattr(db_vista_acceso, key, value)
        db.commit()
        db.refresh(db_vista_acceso)
    return db_vista_acceso

def delete_vista_acceso(db: Session, vista_acceso_id: int):
    db_vista_acceso = get_vista_acceso(db, vista_acceso_id)
    if db_vista_acceso:
        db.delete(db_vista_acceso)
        db.commit()
    return db_vista_acceso

def get_vistas_no_asignadas(db: Session, usuario_tx: str):
    subquery = db.query(models.TDMASKEventos.vista_acceso_id).filter(models.TDMASKEventos.usuario_tx == usuario_tx).subquery()
    vistas_no_asignadas = db.query(models.TDMASKVistasAccesos).filter(~models.TDMASKVistasAccesos.vista_acceso_id.in_(subquery)).all()
    return vistas_no_asignadas