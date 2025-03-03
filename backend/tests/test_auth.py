import json

def test_register(client):
    response = client.post('/register', json={'email': 'test@example.com', 'password': 'password123', 'role': 'seeker'})
    assert response.status_code == 201

def test_login(client):
    client.post('/register', json={'email': 'test@example.com', 'password': 'password123', 'role': 'seeker'})
    response = client.post('/login', json={'email': 'test@example.com', 'password': 'password123'})
    assert response.status_code == 200
