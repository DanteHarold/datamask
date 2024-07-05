from sqlalchemy import Column, ForeignKey, Integer, String, BigInteger, TIMESTAMP, BYTE
from sqlalchemy.orm import relationship
from ..base import Base

class TDMASKUsuarios(Base):
    __tablename__ = "T_DMASK_USUARIOS"
    usuario_tx = Column(String(80),ForeignKey("T_DMASK_PARAMS.usuario_tx"), primary_key=True, index=True)
    clave_usuario_de = Column(String(200))