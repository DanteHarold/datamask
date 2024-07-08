from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from app.db.session import get_db1
from app.db.models import TDMASKParams
from app.core.config import settings
import jwt
from datetime import datetime, timedelta
import os

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter(tags=["Auth"])

# conf = ConnectionConfig(
#     MAIL_USERNAME=settings.MAIL_USERNAME,
#     MAIL_PASSWORD=settings.MAIL_PASSWORD,
#     MAIL_FROM=settings.MAIL_FROM,
#     MAIL_PORT=settings.MAIL_PORT,
#     MAIL_SERVER=settings.MAIL_SERVER,
#     MAIL_TLS=True,
#     MAIL_SSL=False,
#     USE_CREDENTIALS=True
# )

# class ConnectionConfig(BaseModel):
#     MAIL_USERNAME: str
#     MAIL_PASSWORD: str
#     MAIL_FROM: str
#     MAIL_FROM_NAME: str  # Add this if needed
#     MAIL_PORT: int
#     MAIL_SERVER: str
#     MAIL_USE_TLS: bool
#     MAIL_USE_SSL: bool
#     USE_CREDENTIALS: bool
#     TEMPLATE_FOLDER: str
# Example usage:
conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=True
)


class EmailSchema(BaseModel):
    email: EmailStr

class TokenData(BaseModel):
    email: str

def create_reset_token(email: str):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    encoded_jwt = jwt.encode({"exp": expire, "sub": email}, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_reset_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=403, detail="Invalid token")
        return email
    except jwt.PyJWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

@router.post("/password-reset-request/")
async def password_reset_request(email: EmailSchema, background_tasks: BackgroundTasks, db: Session = Depends(get_db1)):
    user = db.query(TDMASKParams).filter(TDMASKParams.email_usuario_de == email.email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    reset_token = create_reset_token(email.email)
    reset_link = f"http://localhost:3000/reset-password?token={reset_token}"

    message = MessageSchema(
        subject="Password Reset Request",
        recipients=[email.email],
        body=f"Click the link to reset your password: {reset_link}",
        subtype="html"
    )

    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, message)
    return {"message": "Password reset email sent"}

@router.post("/reset-password/")
async def reset_password(token: str, new_password: str, db: Session = Depends(get_db1)):
    email = verify_reset_token(token)
    user = db.query(TDMASKParams).filter(TDMASKParams.email_usuario_de == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    user.clave_usuario_de = new_password  # Make sure to hash the password in production
    db.commit()
    return {"message": "Password reset successful"}
