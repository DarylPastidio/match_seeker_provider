def test_get_profile(client, auth_headers):
    response = client.get('/profile', headers=auth_headers)
    assert response.status_code == 200
def test_update_profile(client, auth_headers):
    response = client.put('/profile', json={'industry': 'Tech'}, headers=auth_headers)
    assert response.status_code == 200