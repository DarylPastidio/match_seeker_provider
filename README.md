# Seeker-Provider Matching Application (MVP)

## Overview
This is a minimal viable prototype (MVP) for a basic "Seeker-Provider" matching application. The project demonstrates user authentication, profile management, and a simple matching algorithm using Flask (backend), React (frontend), and PostgreSQL (database). The application is containerized using Docker and can be deployed locally using Docker Compose.

## Features
- **User Registration & Authentication**
  - Two user roles: **Seeker** and **Provider**
  - JWT-based authentication for secure login and session management
- **Profile Management**
  - Seekers: Industry preference, location, credit rating, etc.
  - Providers: Industry focus, services offered, location, etc.
- **Matching Algorithm**
  - Suggests relevant Providers for Seekers based on shared attributes (e.g., location, industry)
- **Basic Frontend (React) or API Testing**
  - Minimal UI for user actions
  - Postman scripts for API testing
- **Deployment & Documentation**
  - Dockerized setup with `docker-compose.yml`
  - Deployment-ready instructions for Heroku or similar environments

## Tech Stack
- **Backend**: Flask (Python) with Flask-RESTful & Flask-JWT-Extended
- **Frontend**: React (JavaScript)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **Containerization**: Docker & Docker Compose

## Setup Instructions
### Prerequisites
Ensure you have the following installed on your system:
- Docker & Docker Compose
- Python 3.8+
- Node.js 21.6+ (for frontend development)
- PostgreSQL 17 (for Database)

### Clone the Repository
```sh
git clone https://github.com/DarylPastidio/match_seeker_provider
cd match_seeker_provider
```

### Instructions for spinning up the app locally
#### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Create a virtual environment and install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Database Setup:
   * Set up PostgreSQL, and create a database seeker_provider_db
   * Modify the .env file in backend folder
DATABASE_URL= "postgresql://[username]:[password]@localhost:5432/seeker_provider_db"

4. Run database migrations:
   ```
   flask db init
   flask db migrate -m "Initial Migration"
   flask db upgrade
   ```
5. Start the backend server:
   ```sh
   python run.py
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install --legacy-peer-deps
   ```
3. Start the React app:
   ```sh
   npm run dev
   ```

### Running with Docker Compose
To run the entire project using Docker, execute:
```sh
sudo docker-compose up --build
```
This will start the backend, frontend, and PostgreSQL database.

### Caution: If you are going to deploy, please follow these steps.

1. Find and open the .env file:
   ```sh
   frontend\.env
   ```
2. Change the following in the file:

   * This is the original file.
   ```sh
   axios.defaults.baseURL = "http://127.0.0.1:5000/";
   ```
   * Change the file with the IP.
   ```sh
   axios.defaults.baseURL = "http://146.19.207.28:5000/";
   ```
   Here 146.19.207.28 is changable IP address which you want.

## API Endpoints
| Method | Endpoint              | Description                      |
|--------|-----------------------|----------------------------------|
| POST   | `/auth/register`      | Register a new user              |
| POST   | `/auth/login`         | Authenticate user & return token |
| GET    | `/profile/profile`    | Get user profile details         |
| PUT    | `/profile/profile`    | Update user profile              | 
| GET    | `/matches`            | Get matched providers for seeker |

## Sample Profile Data

### Seeker Profile

```
{
"Email": "seeker@gmail.com",
"Password": "12345678",
"Role": "Seeker"
"Location": "United States",
"Industry": "Technology",
}
```

### Provider Profile

```
{
"Email": "provider@gmail.com",
"Password": "12345678",
"Role": "Provider"
"Services": ["Health","Entertainment"] ,
"Location": "United States"
"Industry": "Technology",
}
```

## Deployment
To deploy to a platform like Heroku:
1. Ensure you have a `Procfile` and configure environment variables.
2. Push your project to a Heroku Git repository.
3. Deploy using:
   ```sh
   git push heroku main
   ```

## System Architecture
- **Flask backend** handles authentication, profile management, and matching logic.
- **React frontend** provides a simple interface for user interactions.
- **PostgreSQL database** stores user data and relationships.
- **Docker Compose** orchestrates the setup for local development.

## Known Limitations & Future Enhancements
- Current matching logic is basic and could be improved with AI/ML techniques.
- Minimal frontend; can be extended with a better UI/UX.
- No email verification during registration.

## Demo & Submission
- Record a Loom video (3-5 minutes) showcasing the app.
- Submit the GitHub repository link or a ZIP file with your code.

## License
This project is licensed under the MIT License.

