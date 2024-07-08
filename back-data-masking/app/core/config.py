import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

# Verificar si la variable se carga correctamente
print(os.getenv('DATABASE_URL'))

class Settings:
    DATABASE_URL1 = os.getenv("DATABASE_URL1", "mysql+pymysql://root:99753@localhost/datamasking")
    DATABASE_URL2 = os.getenv("DATABASE_URL2", "mysql+pymysql://root:99753@localhost/datamasking_view")

     # Email settings
    MAIL_USERNAME = os.getenv("MAIL_USERNAME","stonepkmal@gmail.com")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD","loysemgiyhrxcxrk")
    MAIL_FROM = os.getenv("MAIL_FROM","stonepkmal@gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_STARTTLS: bool = True  # Cambiado de MAIL_TLS a MAIL_STARTTLS
    MAIL_SSL_TLS: bool = False  # Cambiado de MAIL_SSL a MAIL_SSL_TLS
settings = Settings()

# Crear el engine de SQLAlchemy
# engine = create_engine(settings.DATABASE_URL1)

# Ahora puedes usar `engine` para interactuar con la base de datos
