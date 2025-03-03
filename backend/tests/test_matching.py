def test_get_matches(client, auth_headers):
    response = client.get('/matches', headers=auth_headers)
    assert response.status_code == 200