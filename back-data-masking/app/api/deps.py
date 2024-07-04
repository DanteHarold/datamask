from app.db.session import get_db1, get_db2

# Dependencia para obtener la sesión de la primera base de datos
def get_db1_dep():
    return get_db1()

# Dependencia para obtener la sesión de la segunda base de datos
def get_db2_dep():
    return get_db2()
