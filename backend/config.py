import os
from typing import Optional

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    mongo_uri: Optional[str] = os.getenv("MONGO_URI")
    secret_key: str = os.getenv("SECRET_KEY")
    algorithm: str = "HS256"
    email_pass: str = os.getenv("EMAIL_PASS")
    email_address: str = "dasariyaswanthsribalachandra@gmail.com"

    class Config:
        env_file = ".env"


settings = Settings()
