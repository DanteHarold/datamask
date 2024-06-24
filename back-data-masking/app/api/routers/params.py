from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.schemas import schemas
from app.db import services
from app.api.deps import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Param)
def create_param(param: schemas.ParamCreate, db: Session = Depends(get_db)):
    return services.create_param(db=db, param=param)

@router.get("/{usuario_tx}", response_model=schemas.Param)
def read_param(usuario_tx: str, db: Session = Depends(get_db)):
    db_param = services.get_param(db, usuario_tx=usuario_tx)
    if db_param is None:
        raise HTTPException(status_code=404, detail="Parámetro no encontrado")
    return db_param

@router.put("/{usuario_tx}", response_model=schemas.Param)
def update_param(usuario_tx: str, param: schemas.ParamCreate, db: Session = Depends(get_db)):
    db_param = services.update_param(db, usuario_tx, param)
    if db_param is None:
        raise HTTPException(status_code=404, detail="Parámetro no encontrado")
    return db_param

@router.delete("/{usuario_tx}", response_model=schemas.Param)
def delete_param(usuario_tx: str, db: Session = Depends(get_db)):
    db_param = services.delete_param(db, usuario_tx)
    if db_param is None:
        raise HTTPException(status_code=404, detail="Parámetro no encontrado")
    return db_param
