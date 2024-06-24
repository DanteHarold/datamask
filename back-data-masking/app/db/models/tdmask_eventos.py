from sqlalchemy import Column, ForeignKey, Integer, String, BigInteger, TIMESTAMP, BYTE
from sqlalchemy.orm import relationship
from ..base import Base
class TDMASKEventos(Base):
    __tablename__ = "T_DMASK_EVENTOS"
    evento_id = Column(BigInteger, primary_key=True, index=True)
    usuario_tx = Column(String(80), ForeignKey("T_DMASK_USUARIOS.usuario_tx"))
    vista_acceso_id = Column(Integer, ForeignKey("T_DMASK_VISTAS_ACCESOS.vista_acceso_id"))
    log_acceso_id = Column(BigInteger, ForeignKey("T_DMASK_LOG_ACCESOS.log_acceso_id"))
    solicitud_evento_fh = Column(TIMESTAMP)
    tiempo_permiso_evento_fh = Column(Integer)
    validacion_creacion_fl = Column(BYTE)
    inicio_evento_fh = Column(TIMESTAMP)
    fin_evento_fh = Column(TIMESTAMP)
    estado_evento_fl = Column(BYTE)
    cancelacion_evento_fh = Column(TIMESTAMP)

    usuario = relationship("TDMASKUsuarios")
    vista_acceso = relationship("TDMASKVistasAccesos")
    log_acceso = relationship("TDMASKLogAccesos")