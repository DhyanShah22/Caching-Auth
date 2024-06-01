# Express API with MongoDB and Redis

This project is an Express.js application with MongoDB as the database and Redis for caching. It includes user authentication and basic CRUD operations for managing courses.

## Features

- User authentication (signup and login) with JWT
- CRUD operations for courses
- Redis caching for improved performance
- Middleware for security (Helmet) and logging (Morgan)

## Prerequisites

- Node.js and npm installed
- MongoDB instance running
- Redis server running
- `.env` file with the following environment variables:
  - `PORT`: The port on which the server will run
  - `MONG_URI`: MongoDB connection string
  - `SECRET`: Secret key for JWT

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>


2. Install the dependencies:
    ```sh
    npm install


3. Create a `.env` file in the root directory and add the required environment variables.

4. Start the MongoDB and Redis servers if they are not already running.

5. Run the application:
    ```sh
    npm start


## API Endpoints

### User Authentication

- `POST /api/user/signup`: Signup a new user
- `POST /api/user/login`: Login a user

### Courses

- `GET /api/course`: Get all courses (with caching)
- `GET /api/course/:id`: Get a course by ID (with caching)
- `POST /api/course`: Create a new course
- `PATCH /api/course/:id`: Update a course by ID
- `DELETE /api/course/:id`: Delete a course by ID

## Middleware

- `helmet()`: Adds security headers
- `morgan('dev')`: Logs HTTP requests

## Redis Caching

The project uses Redis for caching user data to improve performance. The `redisServices.js` file contains methods for getting and setting cache.

## Models

### User Model

- **Email**: User's email (must be unique and valid)
- **Password**: User's password (must be strong)

### Course Model

- **Subject**: The subject of the course
- **Faculty**: The faculty teaching the course

## Error Handling

The controllers include basic error handling and validation. Error messages are returned with appropriate HTTP status codes.

## Logging

All requests are logged to the console using Morgan. Redis connection status and errors are also logged.

## Security

Helmet is used to set various HTTP headers to secure the application.

## Contribution

Feel free to submit issues or pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.
