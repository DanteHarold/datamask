import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

# Verificar si la variable se carga correctamente
print(os.getenv('DATABASE_URL'))

class Settings:
    DATABASE_URL1 = os.getenv("DATABASE_URL1", "mysql+pymysql://root:99753@localhost/datamasking")
    DATABASE_URL2 = os.getenv("DATABASE_URL2", "mysql+pymysql://root:99753@localhost/datamasking_view")

settings = Settings()
print(f"Loaded DATABASE_URL: {settings.DATABASE_URL1}")

# Crear el engine de SQLAlchemy
# engine = create_engine(settings.DATABASE_URL1)

# Ahora puedes usar `engine` para interactuar con la base de datos
