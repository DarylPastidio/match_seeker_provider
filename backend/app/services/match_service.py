from ..models import User

def get_matches(user):
    """Finds matching Providers for a Seeker (or vice versa) based on industry & location."""
    print(user.role.value)
    if user.role.value == 'seeker':
        matches = User.query.filter_by(role='PROVIDER', industry=user.industry, location=user.location).all()
    else:  # If user is a provider, find matching seekers
        matches = User.query.filter_by(role='SEEKER', industry=user.industry, location=user.location).all()

    return [{'role':match.role.value, 'email': match.email, 'industry': match.industry, 'location': match.location, 'services_offered':match.services_offered, 'credit_rating':match.credit_rating} for match in matches]