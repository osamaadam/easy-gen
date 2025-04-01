# EasyAuth

A full-stack authentication system built with React and NestJS.

## Overview

EasyAuth is a simple yet secure authentication system that demonstrates best practices for implementing user authentication in web applications. The project consists of:

- **Frontend**: React application with form validation and protected routes
- **Backend**: NestJS API with JWT authentication
- **Database**: MongoDB

## Project Structure

```text
easy-gen-auth/
├── server/         # NestJS backend
├── web/            # React frontend
├── compose.yml     # Docker Compose configuration
└── README.md       # This file
```

## Prerequisites

- Docker and Docker Compose
- Node.js v22+ and npm (for local development)

## Running with Docker

The easiest way to run the entire application stack is using Docker Compose:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd easy-gen-auth
   ```

2. Start the application:

   ```bash
   docker compose up -d
   ```

3. Access the application:

   - Frontend: <http://localhost:5173>
   - Backend API: <http://localhost:3000>
   - API Documentation: <http://localhost:3000/api>

4. To stop the application:

   ```bash
   docker compose down
   ```

## Development

For more information about developing each part of the application:

- [Web Frontend Documentation](./web/README.md)
- [Server Backend Documentation](./server/README.md)

## Environment Variables

The application uses the following environment variables (already set in the Docker Compose file):

### Backend

- `JWT_SECRET`: Secret key for JWT token generation
- `MONGO_URI`: MongoDB connection string

### Frontend

- `VITE_BACKEND_URL`: URL of the backend API
