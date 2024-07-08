from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine1,engine2, Base
from app.api.routers import usuarios, params, log_accesos, vistas_accesos, eventos,auth

Base.metadata.create_all(bind=engine1)

app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost",  # Para permitir solicitudes desde localhost
    "http://localhost:5173",  # Puerto común para aplicaciones React
    "http://localhost:4200",  # Puerto común para aplicaciones Angular
    "http://localhost:8080",  # Puerto común para aplicaciones Vue
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir solicitudes desde estos orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los headers
)

app.include_router(usuarios.router, prefix="/api/v1/usuarios")
app.include_router(params.router, prefix="/api/v1/params")
app.include_router(log_accesos.router, prefix="/api/v1/log_accesos")
app.include_router(vistas_accesos.router, prefix="/api/v1/vistas_accesos")
app.include_router(eventos.router, prefix="/api/v1/eventos")
app.include_router(auth.router, prefix="/api/v1/auth")