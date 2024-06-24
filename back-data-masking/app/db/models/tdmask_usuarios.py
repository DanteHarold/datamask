from sqlalchemy import Column, ForeignKey, Integer, String, BigInteger, TIMESTAMP, BYTE
from sqlalchemy.orm import relationship
from ..base import Base

class TDMASKUsuarios(Base):
    __tablename__ = "T_DMASK_USUARIOS"
    usuario_tx = Column(String(80), primary_key=True, index=True)
    clave_usuario_de = Column(String(80))