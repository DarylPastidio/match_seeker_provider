import enum
from datetime import datetime
from .extensions import db
from sqlalchemy.dialects.postgresql import JSON

class UserRole(enum.Enum):
    SEEKER = "seeker"
    PROVIDER = "provider"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False)  # Enum for better role management
    industry = db.Column(db.String(100))
    location = db.Column(db.String(100))
    credit_rating = db.Column(db.Integer, default=50,nullable=True )  # Only for seekers
    services_offered = db.Column(JSON, nullable=True)  # Only for providers
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<User {self.email} - {self.role.value}>"
