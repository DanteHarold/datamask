from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.schemas import schemas
from app.db import services
from app.api.deps import get_db

router = APIRouter()

@router.post("/", response_model=schemas.VistaAcceso)
def create_vista_acceso(vista_acceso: schemas.VistaAccesoCreate, db: Session = Depends(get_db)):
    return services.create_vista_acceso(db=db, vista_acceso=vista_acceso)

@router.get("/{vista_acceso_id}", response_model=schemas.VistaAcceso)
def read_vista_acceso(vista_acceso_id: int, db: Session = Depends(get_db)):
    db_vista_acceso = services.get_vista_acceso(db, vista_acceso_id=vista_acceso_id)
    if db_vista_acceso is None:
        raise HTTPException(status_code=404, detail="Vista de acceso no encontrada")
    return db_vista_acceso

@router.put("/{vista_acceso_id}", response_model=schemas.VistaAcceso)
def update_vista_acceso(vista_acceso_id: int, vista_acceso: schemas.VistaAccesoCreate, db: Session = Depends(get_db)):
    db_vista_acceso = services.update_vista_acceso(db, vista_acceso_id, vista_acceso)
    if db_vista_acceso is None:
        raise HTTPException(status_code=404, detail="Vista de acceso no encontrada")
    return db_vista_acceso

@router.delete("/{vista_acceso_id}", response_model=schemas.VistaAcceso)
def delete_vista_acceso(vista_acceso_id: int, db: Session = Depends(get_db)):
    db_vista_acceso = services.delete_vista_acceso(db, vista_acceso_id)
    if db_vista_acceso is None:
        raise HTTPException(status_code=404, detail="Vista de acceso no encontrada")
    return db_vista_acceso
