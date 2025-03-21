# Authentication Project

A Node.js backend project implementing user authentication with features like user verification and password reset functionality.

## Project Overview

This project provides a robust authentication system built with Express.js and MongoDB. It includes user management features such as:
- User registration and login
- Email verification
- Password reset functionality
- Role-based access control (User/Admin)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (planned)

## Dependencies

- `express`: ^4.21.2 - Web application framework
- `mongoose`: ^8.12.1 - MongoDB object modeling tool
- `cors`: ^2.8.5 - Cross-Origin Resource Sharing middleware
- `dotenv`: ^16.4.7 - Environment variable management

## Development Dependencies

- `nodemon`: ^3.1.9 - Development server with auto-reload

## Project Structure

```
├── index.js          # Application entry point
├── model/            # Database models
│   └── User.model.js # User schema and model
├── utils/            # Utility functions
│   └── db.js        # Database connection setup
└── .env             # Environment variables (not in repo)
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=4000
   MONGO_URL=your_mongodb_connection_string
   BASE_URL=your_frontend_url
   ```

## Running the Application

Development mode with auto-reload:
```bash
 npm start
```

## API Endpoints

Currently implemented endpoints:
- `GET /` - Welcome message
- `GET /nilesh` - Test endpoint
- `GET /piyush` - Test endpoint
- `GET /haldar` - Test endpoint

More endpoints for authentication will be implemented:
- User registration
- User login
- Email verification
- Password reset

## Environment Variables

- `PORT`: Server port (default: 4000)
- `MONGO_URL`: MongoDB connection string
- `BASE_URL`: Frontend application URL for CORS

## Security Features

- CORS protection with configurable origin
- Request body parsing with size limits
- Password hashing (planned)
- JWT authentication (planned)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request