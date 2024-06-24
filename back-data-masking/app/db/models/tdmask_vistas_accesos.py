from sqlalchemy import Column, ForeignKey, Integer, String, BigInteger, TIMESTAMP, BYTE
from sqlalchemy.orm import relationship
from ..base import Base

class TDMASKVistasAccesos(Base):
    __tablename__ = "T_DMASK_VISTAS_ACCESOS"
    vista_acceso_id = Column(Integer, primary_key=True, index=True)
    nombre_vista_acceso_de = Column(String(80))