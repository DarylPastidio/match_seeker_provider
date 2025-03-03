from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Load configuration (Ensure DATABASE_URI is set in config.py)
    app.config.from_object('app.config.Config')

    # Initialize database
    db.init_app(app)
    
    # Initialize migration tool
    migrate.init_app(app, db)

    # Register blueprints (if any)
    
    return app
