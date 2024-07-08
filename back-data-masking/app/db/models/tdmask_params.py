from sqlalchemy import Column, ForeignKey, Integer, String, BigInteger, TIMESTAMP, BYTE
from sqlalchemy.orm import relationship
from ..base import Base

class TDMASKParams(Base):
    __tablename__ = "T_DMASK_PARAMS"
    usuario_tx = Column(String(80), primary_key=True, index=True)
    nombre_usuario_de = Column(String(80))
    apellidos_usuario_de = Column(String(80))
    email_usuario_de = Column(String(80))
    autorizacion_usuario_fl = Column(BYTE)
    fecha_alta_usuario_fh = Column(TIMESTAMP)
    rol_usuario_de = Column(String(80))
    usuario = relationship("TDMASKUsuarios", back_populates="params")