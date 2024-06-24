from sqlalchemy.orm import Session
from app.db import models
from app.db.schemas import  schemas

def get_usuario(db: Session, usuario_tx: str):
    return db.query(models.TDMASKUsuarios).filter(models.TDMASKUsuarios.usuario_tx == usuario_tx).first()

def create_usuario(db: Session, usuario: schemas.UsuarioCreate):
    db_usuario = models.TDMASKUsuarios(**usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

def update_usuario(db: Session, usuario_tx: str, usuario_update: schemas.UsuarioCreate):
    db_usuario = get_usuario(db, usuario_tx)
    if db_usuario:
        for key, value in usuario_update.dict().items():
            setattr(db_usuario, key, value)
        db.commit()
        db.refresh(db_usuario)
    return db_usuario

def delete_usuario(db: Session, usuario_tx: str):
    db_usuario = get_usuario(db, usuario_tx)
    if db_usuario:
        db.delete(db_usuario)
        db.commit()
    return db_usuario