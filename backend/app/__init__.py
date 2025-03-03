from flask import Flask
from .extensions import db, jwt, bcrypt, cors, migrate
from .routes.auth_routes import auth_bp
from .routes.profile_routes import profile_bp
from .routes.match_routes import match_bp


def create_app():
    
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    db.init_app(app)
    
    # Initialize migration tool
    migrate.init_app(app, db)
    
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(match_bp)
    app.config.from_object('app.config.Config')
    print("Server is runing!")
    return app
