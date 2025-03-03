# Seeker-Provider Matching Application - MVP

## Overview

This project is a minimal viable prototype (MVP) for a **Seeker-Provider Matching Application**. The goal is to demonstrate the ability to build a back-end, front-end, and database integration with matching logic, authentication, and deployment.

### Key Features:

- **User Registration & Authentication**: Two roles (Seeker and Provider) with token-based authentication (JWT).
- **Profile Management**: Users can manage their profiles, with relevant fields for Seekers and Providers.
- **Matching Functionality**: Simple matching algorithm that suggests Providers for Seekers based on shared preferences (location, industry, etc.).
- **Basic Front-End**: A simple front-end to demonstrate user creation and profile updates.
- **Deployment**: Instructions for running the application in a local or sandbox environment via Docker.

## Tech Stack

- **Back-End**: Python/Flask
- **Front-End**: React (Minimal SPA)
- **Database**: PostgreSQL
- **Authentication**: JWT (Token-based)
- **Matching Logic**: Simple algorithm based on common fields (e.g., location, industry)
- **Deployment**: Docker (docker-compose for local development)

## Functional Requirements

- **Sign-Up & Login**:
  - Seeker: Email, password, industry preference, location, etc.
  - Provider: Email, password, service focus, location, etc.
- **Edit Profile**: Users can update their relevant profile fields.

- **View Matches (Seeker → Providers)**: A Seeker can view a list of relevant Providers based on matching criteria (industry, location, etc.).

- **Optional**: Basic analytics or logs tracking user actions.

## Setup Instructions

### Prerequisites

Before running the application, make sure you have the following installed:

- Docker
- Docker Compose
- Python 3.8+
- Node.js 21.6+
- PostgreSQL 17

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:stevenhawking63/Seeker-and-Provider-React-Python-Flask-.git
   ```
   ```bash
   cd Seeker-and-Provider-React-Python-Flask-
   ```
2. **Backend Setup (Flask API)**
   - Install the required Python dependencie
     ```bash
     pip install -r backend/requirements.txt
     ```
3. **Frontend Setup (React)**
   - Navigate to the frontend directory
     ```bash
     cd frontend
     ```
   - Install the required npm packages
     ```bash
     npm install
     ```
4. **Database Setup**
   - Set up **PostgreSQL**, and create a database **seeker_provider_db**
   - Modify the **.env** file in **backend** folder
     - DATABASE_URL= "postgresql://[username]:[password]@localhost:5432/seeker_provider_db"
5. **Database Migrate**
   ```bash
   cd..
   ```
   ```bash
   cd backend
   ```
   ```bash
   flask db init
   ```
   ```bash
   flask db migrate -m "Initial Migration"
   ```
   ```bash
   flask db upgrade
   ```
6. **Run the Application**
   - For local development, you can run the **Flask backend** and **React front-end** separately
     - Backend (Flask API)
       ```
       cd backend
       ```
       ```bash
       python run.py
       ```
     - Frontend (React)
       ```
       cd frontend
       ```
       ```
       npm run dev
       ```
   - Alternatively, you can use Docker to run the full application in one command.
     ```bash
     docker-compose up --build
     ```
   - The application will be accessible at http://localhost:3000 (React front-end) and http://localhost:5000 (Flask back-end)

### Docker Setup

1. **Build Docker Image**
   - In the project root directory, build the Docker image
   ```bash
   docker-compose build
   ```
2. **Run Docker Containers**
   - Start the application with Docker Compose
   ```bash
   docker-compose up
   ```
3. **Stopping the Application**
   - To stop the running Docker containers
   ```bash
   docker-compose down
   ```

## Sample Profile Data

### Seeker Profile

```bash
{
"Email": "seeker@gmail.com",
"Password": "12345678",
"Role": "Seeker"
"Location": "United States",
"Industry": "Technology",
}
```

### Provider Profile

```bash

{
"Email": "provider@gmail.com",
"Password": "12345678",
"Role": "Provider"
"Services": ["Health","Entertainment"] ,
"Location": "United States"
"Industry": "Technology",
}
```

## Demo

For a demo of the application, please visit the following link (if deployed):

- 🎥 Demo (Optional, if deployed)
- 🔗 GitHub Repository: Provide your GitHub link here

## Documentation

#### System Architecture

The application follows a typical three-layer architecture

1. **Front-End (React)**: Single-page application built using React that interacts with the Flask backend via RESTful APIs.
2. **Back-End (Flask)**: Python-based API that handles user authentication, profile management, and matching logic. It also interacts with the PostgreSQL database.
3. **Database (PostgreSQL)**: A relational database used for storing user profiles and matching data.

#### Matching Logic

- The matching functionality is based on the user's preferences (location, industry) and ranks Providers for Seekers accordingly.
- A Seeker can view a list of Providers with matching criteria, allowing them to make a selection based on their needs.

#### Known Limitations

- The matching logic is very basic and could be improved by incorporating more complex algorithms (e.g., machine learning-based recommendation systems).
- The front-end UI is minimal and can be expanded to include more user-friendly features.
- Authentication and user roles are implemented, but additional security features (e.g., password hashing) can be added for better security.

#### Future Enhancements

- **Improved Matching Algorithm**: Incorporate machine learning models or more refined algorithms to better match Seekers and Providers.
- **Email Verification**: Add email verification during registration to ensure valid user accounts.
- **User Ratings**: Allow users to rate Providers/Seekers, adding credibility to the platform.

## Submission

- GitHub Repository: GitHub Repository URL
- Loom Demo: Loom Demo Link
