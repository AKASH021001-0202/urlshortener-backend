# URL Shortener Web Application

This project is a URL shortening web application built using React.js for the frontend and Node.js for the backend. The application includes features like authentication, registration, forgot password, email verification, URL shortening, and a dashboard for displaying URL statistics.


## Features

- User Authentication (Register, Login, Logout)
- Password Reset (Forgot Password, Reset Password)
- Email Verification
- URL Shortening
- Dashboard with URL Statistics
- Secure routes with JWT Authentication


## API Endpoints
Authentication
POST /registers - Register a new user
POST /login - Login a user
POST /forget-password - Send password reset email
POST /reset-password - Reset password
POST /activate - Activate user account

## URL Shortening
POST /url - Shorten a new URL (Protected)
GET /url/stats - Get URL statistics (Protected)


