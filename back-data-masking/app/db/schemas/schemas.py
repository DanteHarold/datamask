from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# T_DMASK_USUARIOS
class UsuarioBase(BaseModel):
    usuario_tx: str

class UsuarioCreate(UsuarioBase):
    clave_usuario_de: str

class Usuario(UsuarioBase):
    class Config:
        orm_mode = True
#T_DMASK_PARAMS
class ParamBase(BaseModel):
    usuario_tx: str
    nombre_usuario_de: Optional[str]
    apellidos_usuario_de: Optional[str]
    email_usuario_de: Optional[str]
    autorizacion_usuario_fl: Optional[int]
    fecha_alta_usuario_fh: Optional[datetime]
    rol_usuario_de: Optional[str]

class ParamCreate(ParamBase):
    pass

class Param(ParamBase):
    class Config:
        orm_mode = True 

#T_DMASK_LOG_ACCESOS  
class LogAccesoBase(BaseModel):
    usuario_tx: str
    inicio_log_acceso_fh: datetime
    fin_log_acceso_fh: datetime

class LogAccesoCreate(LogAccesoBase):
    pass

class LogAcceso(LogAccesoBase):
    log_acceso_id: int
    class Config:
        orm_mode = True

#T_DMASK_VISTAS_ACCESOS
class VistaAccesoBase(BaseModel):
    vista_acceso_id: int
    nombre_vista_acceso_de: Optional[str] = None

class VistaAccesoCreate(VistaAccesoBase):
    pass

class VistaAcceso(VistaAccesoBase):
    class Config:
        orm_mode = True

#T_DMASK_EVENTOS
class EventoBase(BaseModel):
    usuario_tx: str
    vista_acceso_id: int
    log_acceso_id: int
    solicitud_evento_fh: datetime
    tiempo_permiso_evento_fh: int
    validacion_creacion_fl: int
    inicio_evento_fh: datetime
    fin_evento_fh: datetime
    estado_evento_fl: int
    cancelacion_evento_fh: Optional[datetime] = None

class EventoCreate(EventoBase):
    pass

class Evento(EventoBase):
    evento_id: int
    nombre_vista_acceso_de: str  # Agrega el nombre de la vista
    class Config:
        orm_mode = True
class EventoGet(EventoBase):
    evento_id: int
    class Config:
        orm_mode = True
