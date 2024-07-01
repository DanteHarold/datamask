from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.schemas import schemas
from app.db.services import usuario as crudusuario
from app.api.deps import get_db

router = APIRouter(tags=["Usuarios"])

@router.post("/", response_model=schemas.Usuario)
def create_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    return crudusuario.create_usuario(db=db, usuario=usuario)

@router.get("/{usuario_tx}", response_model=schemas.Usuario)
def read_usuario(usuario_tx: str, db: Session = Depends(get_db)):
    db_usuario = crudusuario.get_usuario(db, usuario_tx=usuario_tx)
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_usuario

@router.get("/", response_model=list[schemas.Usuario])
def read_all_usuarios(db: Session = Depends(get_db)):
    return crudusuario.get_all_usuarios(db)

@router.put("/{usuario_tx}", response_model=schemas.Usuario)
def update_usuario(usuario_tx: str, usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = crudusuario.update_usuario(db, usuario_tx, usuario)
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_usuario

@router.delete("/{usuario_tx}", response_model=schemas.Usuario)
def delete_usuario(usuario_tx: str, db: Session = Depends(get_db)):
    db_usuario = crudusuario.delete_usuario(db, usuario_tx)
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_usuario