from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import User
from ..services.match_service import get_matches
import json

match_bp = Blueprint('match', __name__)

@match_bp.route('/matches', methods=['GET'])
@jwt_required()
def find_matches():
    print("match")
    current_user = json.loads(get_jwt_identity())
    user = User.query.get(current_user['id'])
    print(user)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    matches = get_matches(user)
    return jsonify({'matches': matches}), 200
    # return jsonify({"match":"match"})
