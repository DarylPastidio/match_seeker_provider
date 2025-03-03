from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os

app = Flask(__name__)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:jci@localhost:5432/seeker_provider_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'supersecretkey')  # Change this in production

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(10), nullable=False)  # 'seeker' or 'provider'
    industry = db.Column(db.String(100))
    location = db.Column(db.String(100))
    credit_rating = db.Column(db.Integer, nullable=True)  # Only for seekers
    services_offered = db.Column(db.String(255), nullable=True)  # Only for providers

# Database Initialization
@app.before_first_request
def create_tables():
    db.create_all()

# User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        email=data['email'],
        password=hashed_pw,
        role=data['role'],
        industry=data.get('industry'),
        location=data.get('location'),
        credit_rating=data.get('credit_rating') if data['role'] == 'seeker' else None,
        services_offered=data.get('services_offered') if data['role'] == 'provider' else None
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully!'}), 201

# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'id': user.id, 'role': user.role})
        return jsonify({'access_token': access_token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

# Profile Retrieval
@app.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({
        'email': user.email,
        'role': user.role,
        'industry': user.industry,
        'location': user.location,
        'credit_rating': user.credit_rating,
        'services_offered': user.services_offered
    }), 200

# Profile Update
@app.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    data = request.get_json()
    user.industry = data.get('industry', user.industry)
    user.location = data.get('location', user.location)
    if user.role == 'seeker':
        user.credit_rating = data.get('credit_rating', user.credit_rating)
    if user.role == 'provider':
        user.services_offered = data.get('services_offered', user.services_offered)
    
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200

# Matching Functionality
@app.route('/matches', methods=['GET'])
@jwt_required()
def get_matches():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    if user.role == 'seeker':
        matches = User.query.filter_by(role='provider', industry=user.industry, location=user.location).all()
    else:
        matches = User.query.filter_by(role='seeker', industry=user.industry, location=user.location).all()
    
    match_list = [{'email': match.email, 'industry': match.industry, 'location': match.location} for match in matches]
    return jsonify({'matches': match_list}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

# Dockerfile
with open('Dockerfile', 'w') as f:
    f.write("""
    FROM python:3.9
    WORKDIR /app
    COPY requirements.txt requirements.txt
    RUN pip install -r requirements.txt
    COPY . .
    CMD ["python", "app.py"]
    """)

# docker-compose.yml
with open('docker-compose.yml', 'w') as f:
    f.write("""
    version: '3.8'
    services:
      db:
        image: postgres:latest
        environment:
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
          POSTGRES_DB: seeker_provider_db
        ports:
          - "5432:5432"
      web:
        build: .
        ports:
          - "5000:5000"
        depends_on:
          - db
    """)
