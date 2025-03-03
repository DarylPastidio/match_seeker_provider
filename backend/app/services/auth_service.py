from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from ..models import db, User
from flask import jsonify
import json
from datetime import timedelta

def register_user(data):
    print(f"Raw services_offered: {data['services_offered']}")

    # Ensure password is hased
    hashed_pw = generate_password_hash(data['password']).decode('utf-8')

    # Conver services_offered to JSON if it's a string
    services_offered = data['services_offered']
    if isinstance(services_offered, str):
        try:
            services_offered = json.loads(services_offered) # Convert valid JSON string to a Python object
        except json.JSONDecodeError:
            services_offered = None # Default to None if parsing fails

    # Create the user
    new_user = User(
        email=data['email'], 
        password=hashed_pw, 
        role=data['role'].upper(), 
        industry=data['industry'],
        location=data['location'], 
        services_offered=services_offered
    )

    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully!'}), 201

def login_user(data):
    user = User.query.filter_by(email=data['email']).first()
    print("=============login===================>>")
    print("role:", user.role.value)
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=json.dumps({'id': user.id, 'role': user.role.value}),expires_delta=timedelta(hours=1))
        print("token:", access_token)
        return jsonify({'access_token': access_token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401
