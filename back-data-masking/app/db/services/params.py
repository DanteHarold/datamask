from sqlalchemy.orm import Session
from app.db import models
from app.db.schemas import  schemas

# Params

def get_param(db: Session, usuario_tx: str):
    return db.query(models.TDMASKParams).filter(models.TDMASKParams.usuario_tx == usuario_tx).first()

def get_all_params(db: Session):
    return db.query(models.TDMASKParams).all()

def create_param(db: Session, param: schemas.ParamCreate):
    db_param = models.TDMASKParams(**param.dict())
    db.add(db_param)
    db.commit()
    db.refresh(db_param)
    return db_param

def update_param(db: Session, usuario_tx: str, param_update: schemas.ParamCreate):
    db_param = get_param(db, usuario_tx)
    if db_param:
        for key, value in param_update.dict().items():
            setattr(db_param, key, value)
        db.commit()
        db.refresh(db_param)
    return db_param

def delete_param(db: Session, usuario_tx: str):
    db_param = get_param(db, usuario_tx)
    if db_param:
        db.delete(db_param)
        db.commit()
    return db_param

def verificar_autorizacion_usuario(db: Session, usuario_tx: str):
    db_usuario = db.query(models.TDMASKParams).filter(models.TDMASKParams.usuario_tx == usuario_tx).first()
    if db_usuario and db_usuario.autorizacion_usuario_fl:
        return True
    return False