from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.db import models
from app.db.schemas import  schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_usuario(db: Session, usuario: schemas.UsuarioCreate):
    hashed_password = get_password_hash(usuario.clave_usuario_de)
    db_usuario = models.TDMASKUsuarios(usuario_tx=usuario.usuario_tx, clave_usuario_de=hashed_password)
    try:
        db.add(db_usuario)
        db.commit()
        db.refresh(db_usuario)
        return db_usuario
    except IntegrityError:
        db.rollback()
        return None

def authenticate_usuario(db: Session, usuario_tx: str, clave_usuario_de: str):
    db_usuario = db.query(models.TDMASKUsuarios).filter(models.TDMASKUsuarios.usuario_tx == usuario_tx).first()
    if not db_usuario:
        return False
    if not verify_password(clave_usuario_de, db_usuario.clave_usuario_de):
        return False
    return db_usuario

def get_all_usuarios(db: Session):
    return db.query(models.TDMASKUsuarios).all()

def get_usuario(db: Session, usuario_tx: str):
    return db.query(models.TDMASKUsuarios).filter(models.TDMASKUsuarios.usuario_tx == usuario_tx).first()

# def create_usuario(db: Session, usuario: schemas.UsuarioCreate):
#     db_usuario = models.TDMASKUsuarios(**usuario.dict())
#     db.add(db_usuario)
#     db.commit()
#     db.refresh(db_usuario)
#     return db_usuario

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