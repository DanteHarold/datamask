from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.schemas import schemas
from app.db.services import vistas_accesos as crudvista
from app.api.deps import get_db1 as get_db,get_db2_dep

router = APIRouter(tags=["Vistas"])

@router.post("/", response_model=schemas.VistaAcceso)
def create_vista_acceso(vista_acceso: schemas.VistaAccesoCreate, db: Session = Depends(get_db)):
    return crudvista.create_vista_acceso(db=db, vista_acceso=vista_acceso)

@router.get("/{vista_acceso_id}", response_model=schemas.VistaAcceso)
def read_vista_acceso(vista_acceso_id: int, db: Session = Depends(get_db)):
    db_vista_acceso = crudvista.get_vista_acceso(db, vista_acceso_id=vista_acceso_id)
    if db_vista_acceso is None:
        raise HTTPException(status_code=404, detail="Vista de acceso no encontrada")
    return db_vista_acceso

@router.get("/", response_model=list[schemas.VistaAcceso])
def read_all_vistas_accesos(db: Session = Depends(get_db)):
    return crudvista.get_all_vistas_accesos(db)

@router.put("/{vista_acceso_id}", response_model=schemas.VistaAcceso)
def update_vista_acceso(vista_acceso_id: int, vista_acceso: schemas.VistaAccesoCreate, db: Session = Depends(get_db)):
    db_vista_acceso = crudvista.update_vista_acceso(db, vista_acceso_id, vista_acceso)
    if db_vista_acceso is None:
        raise HTTPException(status_code=404, detail="Vista de acceso no encontrada")
    return db_vista_acceso

@router.delete("/{vista_acceso_id}", response_model=schemas.VistaAcceso)
def delete_vista_acceso(vista_acceso_id: int, db: Session = Depends(get_db)):
    db_vista_acceso = crudvista.delete_vista_acceso(db, vista_acceso_id)
    if db_vista_acceso is None:
        raise HTTPException(status_code=404, detail="Vista de acceso no encontrada")
    return db_vista_acceso

@router.get("/vistas_no_asignadas/{usuario_tx}", response_model=list[schemas.VistaAcceso])
def read_vistas_no_asignadas(usuario_tx: str, db: Session = Depends(get_db)):
    vistas = crudvista.get_vistas_no_asignadas(db, usuario_tx)
    if not vistas:
        raise HTTPException(status_code=404, detail="Vistas no encontradas para el Usuario")
    return vistas