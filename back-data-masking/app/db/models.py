from sqlalchemy import Column, ForeignKey, Integer, String, BigInteger, TIMESTAMP, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base


class TDMASKParams(Base):
    __tablename__ = "T_DMASK_PARAMS"
    usuario_tx = Column(String(80), primary_key=True, index=True)
    nombre_usuario_de = Column(String(80))
    apellidos_usuario_de = Column(String(80))
    autorizacion_usuario_fl = Column(Boolean)
    fecha_alta_usuario_fh = Column(TIMESTAMP)
    rol_usuario_de = Column(String(80))
    usuario = relationship("TDMASKUsuarios", back_populates="params")
class TDMASKUsuarios(Base):
    __tablename__ = "T_DMASK_USUARIOS"
    usuario_tx = Column(String(80),ForeignKey("T_DMASK_PARAMS.usuario_tx"), primary_key=True, index=True)
    clave_usuario_de = Column(String(80))
    params = relationship("TDMASKParams", back_populates="usuario")

class TDMASKLogAccesos(Base):
    __tablename__ = "T_DMASK_LOG_ACCESOS"
    log_acceso_id = Column(BigInteger, primary_key=True, index=True)
    usuario_tx = Column(String(80), ForeignKey("T_DMASK_USUARIOS.usuario_tx"))
    inicio_log_acceso_fh = Column(TIMESTAMP)
    fin_log_acceso_fh = Column(TIMESTAMP)

class TDMASKVistasAccesos(Base):
    __tablename__ = "T_DMASK_VISTAS_ACCESOS"
    vista_acceso_id = Column(Integer, primary_key=True, index=True)
    nombre_vista_acceso_de = Column(String(80))

class TDMASKEventos(Base):
    __tablename__ = "T_DMASK_EVENTOS"
    evento_id = Column(BigInteger, primary_key=True, index=True)
    usuario_tx = Column(String(80), ForeignKey("T_DMASK_USUARIOS.usuario_tx"))
    vista_acceso_id = Column(Integer, ForeignKey("T_DMASK_VISTAS_ACCESOS.vista_acceso_id"))
    log_acceso_id = Column(BigInteger, ForeignKey("T_DMASK_LOG_ACCESOS.log_acceso_id"))
    solicitud_evento_fh = Column(TIMESTAMP)
    tiempo_permiso_evento_fh = Column(Integer)
    validacion_creacion_fl = Column(Boolean)
    inicio_evento_fh = Column(TIMESTAMP)
    fin_evento_fh = Column(TIMESTAMP)
    estado_evento_fl = Column(Boolean)
    cancelacion_evento_fh = Column(TIMESTAMP)

    usuario = relationship("TDMASKUsuarios")
    vista_acceso = relationship("TDMASKVistasAccesos")
    log_acceso = relationship("TDMASKLogAccesos")
