from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, User
import json

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = json.loads(get_jwt_identity()) 
    user = User.query.get(current_user['id'])
    print(user)
    return jsonify({
        'email': user.email,
        'role': user.role.value,
        'industry': user.industry,
        'location': user.location,
        'services_offered': user.services_offered,
        'credit_rating':user.credit_rating
    })

@profile_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user = json.loads(get_jwt_identity())
    user = User.query.get(current_user['id'])
    data = request.get_json()
    user.industry = data.get('industry', user.industry)
    user.location = data.get('location', user.location)
    user.services_offered = data.get('services_offered', user.services_offered)
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200
