from pydantic import (
    BaseModel,
    EmailStr,
    Field,
)

from typing import Optional

from datetime import datetime


# ======================================================
# AUTH MODELS
# ======================================================
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class SendOTPRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str
    password: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    email: str
    full_name: str
    created_at: datetime

    class Config:
        populate_by_name = True


# ======================================================
# LINK MODELS
# ======================================================
class LinkCreate(BaseModel):
    title: str
    url: str
    category: str = "general"
    tags: list[str] = []
    description: Optional[str] = None
    color: str = "#3B82F6"


class LinkUpdate(BaseModel):
    title: Optional[str] = None
    url: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[list[str]] = None
    description: Optional[str] = None
    color: Optional[str] = None


class Link(BaseModel):
    id: str = Field(alias="_id")
    title: str
    url: str
    category: str
    tags: list[str]
    description: Optional[str]
    color: str
    created_at: datetime
    user_id: str

    class Config:
        populate_by_name = True