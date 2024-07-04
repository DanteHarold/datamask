from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.schemas import schemas
from app.db.services import  eventos as crudeventos
from app.api.deps import get_db1 as get_db,get_db2_dep
from app.utils.utils import sanitize_identifier

router = APIRouter(tags=["Eventos"])

@router.post("/", response_model=schemas.EventoGet)
def create_evento(evento: schemas.EventoCreate, db: Session = Depends(get_db)):
    return crudeventos.create_evento(db=db, evento=evento)

@router.get("/{evento_id}", response_model=schemas.Evento)
def read_evento(evento_id: int, db: Session = Depends(get_db)):
    db_evento = crudeventos.get_evento(db, evento_id=evento_id)
    if db_evento is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return db_evento

@router.get("/", response_model=list[schemas.Evento])
def read_all_eventos(db: Session = Depends(get_db)):
    return crudeventos.get_all_eventos(db)

@router.get("/eventos/{usuario_tx}", response_model=list[schemas.Evento])
def list_eventos_by_usuario(usuario_tx: str, db: Session = Depends(get_db)):
    eventos = crudeventos.get_eventos_by_usuario(db, usuario_tx)
    if not eventos:
        raise HTTPException(status_code=404, detail="Eventos no encontrados para el usuario proporcionado")
    return [
        {
            "evento_id": evento.evento_id,
            "usuario_tx": evento.usuario_tx,
            "vista_acceso_id": evento.vista_acceso_id,
            "log_acceso_id": evento.log_acceso_id,
            "solicitud_evento_fh": evento.solicitud_evento_fh,
            "tiempo_permiso_evento_fh": evento.tiempo_permiso_evento_fh,
            "validacion_creacion_fl": evento.validacion_creacion_fl,
            "inicio_evento_fh": evento.inicio_evento_fh,
            "fin_evento_fh": evento.fin_evento_fh,
            "estado_evento_fl": evento.estado_evento_fl,
            "cancelacion_evento_fh": evento.cancelacion_evento_fh,
            "nombre_vista_acceso_de": nombre_vista_acceso_de,
        }
        for evento, nombre_vista_acceso_de in eventos
    ]

@router.put("/{evento_id}", response_model=schemas.Evento)
def update_evento(evento_id: int, evento: schemas.EventoCreate, db: Session = Depends(get_db)):
    db_evento = crudeventos.update_evento(db, evento_id, evento)
    if db_evento is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return db_evento

@router.delete("/{evento_id}", response_model=schemas.EventoGet)
def delete_evento(evento_id: int, db: Session = Depends(get_db)):
    db_evento = crudeventos.delete_evento(db, evento_id)
    if db_evento is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return db_evento

@router.post("/create_view/")
def create_view_endpoint(view_name: str, db1: Session = Depends(get_db), db2: Session = Depends(get_db2_dep)):
    try:
        response = crudeventos.create_view(db1, db2, view_name)
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))