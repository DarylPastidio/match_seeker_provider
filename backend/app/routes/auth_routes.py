from flask import Blueprint, request, jsonify
from ..services.auth_service import register_user, login_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    print( "auth")
    return register_user(request.get_json())

@auth_bp.route('/login', methods=['POST'])
def login():
    print("password:", request.get_json()['password'],"email:", request.get_json()['email'])
    return login_user(request.get_json())
