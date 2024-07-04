from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Crear el engine y sessionmaker para la primera base de datos
engine1 = create_engine(settings.DATABASE_URL1)
SessionLocal1 = sessionmaker(autocommit=False, autoflush=False, bind=engine1)

# Crear el engine y sessionmaker para la segunda base de datos
engine2 = create_engine(settings.DATABASE_URL2)
SessionLocal2 = sessionmaker(autocommit=False, autoflush=False, bind=engine2)

Base = declarative_base()

# Definir la función para obtener la sesión de la primera base de datos
def get_db1():
    db = SessionLocal1()
    try:
        yield db
    finally:
        db.close()

# Definir la función para obtener la sesión de la segunda base de datos
def get_db2():
    db = SessionLocal2()
    try:
        yield db
    finally:
        db.close()
