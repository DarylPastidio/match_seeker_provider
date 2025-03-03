from app import create_app

app = create_app()

if __name__ != "__main__":
    application = app  # For Gunicorn deployment
