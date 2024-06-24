from sqlalchemy import Column, ForeignKey, Integer, String, BigInteger, TIMESTAMP, BYTE
from sqlalchemy.orm import relationship
from ..base import Base

class TDMASKLogAccesos(Base):
    __tablename__ = "T_DMASK_LOG_ACCESOS"
    log_acceso_id = Column(BigInteger, primary_key=True, index=True)
    usuario_tx = Column(String(80), ForeignKey("T_DMASK_USUARIOS.usuario_tx"))
    inicio_log_acceso_fh = Column(TIMESTAMP)
    fin_log_acceso_fh = Column(TIMESTAMP)