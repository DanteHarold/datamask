from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.schemas import schemas
from app.db.services import log_accesos as crudlogacceso
from app.api.deps import get_db

router = APIRouter(tags=["Log Accesos"])

@router.post("/", response_model=schemas.LogAcceso)
def create_log_acceso(log_acceso: schemas.LogAccesoCreate, db: Session = Depends(get_db)):
    return crudlogacceso.create_log_acceso(db=db, log_acceso=log_acceso)

@router.get("/{log_acceso_id}", response_model=schemas.LogAcceso)
def read_log_acceso(log_acceso_id: int, db: Session = Depends(get_db)):
    db_log_acceso = crudlogacceso.get_log_acceso(db, log_acceso_id=log_acceso_id)
    if db_log_acceso is None:
        raise HTTPException(status_code=404, detail="Log de acceso no encontrado")
    return db_log_acceso

@router.get("/", response_model=list[schemas.LogAcceso])
def read_all_log_acceso(db: Session = Depends(get_db)):
    return crudlogacceso.get_all_log_accesos(db)

@router.put("/{log_acceso_id}", response_model=schemas.LogAcceso)
def update_log_acceso(log_acceso_id: int, log_acceso: schemas.LogAccesoCreate, db: Session = Depends(get_db)):
    db_log_acceso = crudlogacceso.update_log_acceso(db, log_acceso_id, log_acceso)
    if db_log_acceso is None:
        raise HTTPException(status_code=404, detail="Log de acceso no encontrado")
    return db_log_acceso

@router.delete("/{log_acceso_id}", response_model=schemas.LogAcceso)
def delete_log_acceso(log_acceso_id: int, db: Session = Depends(get_db)):
    db_log_acceso = crudlogacceso.delete_log_acceso(db, log_acceso_id)
    if db_log_acceso is None:
        raise HTTPException(status_code=404, detail="Log de acceso no encontrado")
    return db_log_acceso
