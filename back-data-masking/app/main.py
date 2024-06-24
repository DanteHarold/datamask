from fastapi import FastAPI
from app.db.session import engine, Base
from app.api.routers import usuarios, params, log_accesos, vistas_accesos, eventos

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(usuarios.router, prefix="/api/v1/usuarios")
app.include_router(params.router, prefix="/api/v1/params")
app.include_router(log_accesos.router, prefix="/api/v1/log_accesos")
app.include_router(vistas_accesos.router, prefix="/api/v1/vistas_accesos")
app.include_router(eventos.router, prefix="/api/v1/eventos")