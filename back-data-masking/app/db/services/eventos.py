from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.schemas import schemas
from app.db import models
import re
# Eventos

def get_evento(db: Session, evento_id: int):
    return db.query(models.TDMASKEventos).filter(models.TDMASKEventos.evento_id == evento_id).first()

def get_all_eventos(db: Session):
    return db.query(models.TDMASKEventos).all()

# def get_eventos_by_usuario(db: Session, usuario_tx: str):
#     return db.query(models.TDMASKEventos).filter(models.TDMASKEventos.usuario_tx == usuario_tx).all()
def get_eventos_by_usuario(db: Session, usuario_tx: str):
    return db.query(
        models.TDMASKEventos,
        models.TDMASKVistasAccesos.nombre_vista_acceso_de.label("nombre_vista_acceso_de")
    ).join(
        models.TDMASKVistasAccesos,
        models.TDMASKEventos.vista_acceso_id == models.TDMASKVistasAccesos.vista_acceso_id
    ).filter(
        models.TDMASKEventos.usuario_tx == usuario_tx
    ).all()

def create_evento(db: Session, evento: schemas.EventoCreate):
    db_evento = models.TDMASKEventos(**evento.dict())
    db.add(db_evento)
    db.commit()
    db.refresh(db_evento)
    return db_evento

def update_evento(db: Session, evento_id: int, evento_update: schemas.EventoCreate):
    db_evento = get_evento(db, evento_id)
    if db_evento:
        for key, value in evento_update.dict().items():
            setattr(db_evento, key, value)
        db.commit()
        db.refresh(db_evento)
    return db_evento

def delete_evento(db: Session, evento_id: int):
    db_evento = get_evento(db, evento_id)
    if db_evento:
        db.delete(db_evento)
        db.commit()
    return db_evento

def create_view(db1: Session, db2: Session, view_name: str):
    extracted_part = re.search(r"DP_(.*?)_", view_name).group(1)
    try:
        view_nameDP = f"""datamasking_view.{view_name}_DP"""
        create_view_query = text(f"""
        CREATE OR REPLACE VIEW {view_nameDP} AS
        SELECT
            A.cliente_id,
            B.*
        FROM datamasking_view.{view_name} A
        LEFT JOIN datamasking.T_DP_EQ_{extracted_part}_D B
        ON A.dp_numero_documento_cd = B.dp_numero_documento_cd;
        """)
        db1.execute(create_view_query)
        db1.commit()
        return {"message": "View created successfully"}
    except Exception as e:
        db1.rollback()
        raise e