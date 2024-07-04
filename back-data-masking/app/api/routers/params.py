from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.schemas import schemas
from app.db.services import params as crudparam
from app.api.deps import get_db1 as get_db,get_db2_dep

router = APIRouter(tags=["Params"])

@router.post("/", response_model=schemas.Param)
def create_param(param: schemas.ParamCreate, db: Session = Depends(get_db)):
    return crudparam.create_param(db=db, param=param)

@router.get("/{usuario_tx}", response_model=schemas.Param)
def read_param(usuario_tx: str, db: Session = Depends(get_db)):
    db_param = crudparam.get_param(db, usuario_tx=usuario_tx)
    if db_param is None:
        raise HTTPException(status_code=404, detail="Parámetro no encontrado")
    return db_param

@router.get("/", response_model=list[schemas.Param])
def read_all_params(db: Session = Depends(get_db)):
    return crudparam.get_all_params(db)

@router.put("/{usuario_tx}", response_model=schemas.Param)
def update_param(usuario_tx: str, param: schemas.ParamCreate, db: Session = Depends(get_db)):
    db_param = crudparam.update_param(db, usuario_tx, param)
    if db_param is None:
        raise HTTPException(status_code=404, detail="Parámetro no encontrado")
    return db_param

@router.delete("/{usuario_tx}", response_model=schemas.Param)
def delete_param(usuario_tx: str, db: Session = Depends(get_db)):
    db_param = crudparam.delete_param(db, usuario_tx)
    if db_param is None:
        raise HTTPException(status_code=404, detail="Parámetro no encontrado")
    return db_param
