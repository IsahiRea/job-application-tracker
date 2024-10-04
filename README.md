# Job Application Tracker

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Introduction

The **Job Application Tracker** is a web application that allows users to manage their job applications in one place. Users can sign up, log in, and track the progress of their applications by adding details such as the company, position, and status of their job search.

The app provides the following key functionalities:
- **User Authentication**: Secure user registration and login using JWT.
- **CRUD Operations**: Users can create, read, update, and delete job applications.


## Features

- **User Registration and Login**: Securely register and log in with hashed passwords.
- **JWT-based Authentication**: API endpoints are protected using JWT.
- **Track Applications**: Add and manage job applications with relevant details (company name, position, status, date applied).
- **CRUD Operations**: Users can create, update, and delete applications.
- **User Profile Management**: Users can view and update their profile (name, email), and change their password.
- **Search and Filter**: Search and filter applications by company, position, and status.
  
## Tech Stack

- **Backend**: 
  - Node.js
  - Express
  - MongoDB with Mongoose
  - JWT (JSON Web Tokens) for authentication
  - Bcrypt for password hashing
- **Dev Tools**: 
  - Nodemon for development
  - Postman for API testing

## Environment Variables

| Variable     | Description                                                |                     
|--------------|------------------------------------------------------------|
| `PORT`       | The port number on which the server will run. Default: 5000|
| `MONGO_URI`  | MongoDB connection string.                                 |
| `JWT_SECRET` | A secret key used to sign JWT tokens. Make sure to use a strong, random key.|


## API Endpoints

### Authorization
For protected routes, include the Authorization header:
`Authorization: Bearer <JWT_TOKEN>`

### Job Authenticaction Routes

| Method | Endpoint                      | Description                           | Protected |
|--------|-------------------------------|---------------------------------------|-----------|
| POST   | `/api/auth/register`          | Register a new user                   | No        |
| POST   | `/api/auth/login`             | Log in a user                         | No        |
| GET    | `/api/auth/profile`           | Get the user's profile                | Yes       |
| PUT    | `/api/auth/profile`           | Update the user's profile (name, email)| Yes       |
| PUT    | `/api/auth/profile/password`  | Change the user's password            | Yes        |

### Job Applications Routes

| Method | Endpoint                      | Description                           | Protected |
|--------|-------------------------------|---------------------------------------|-----------|
| GET    | `/api/applications`            | Get all job applications, with optional search and filter by company, position, or status | Yes       |
| POST   | `/api/applications`            | Create a new job application          | Yes       |
| PUT    | `/api/applications/:id`        | Update a specific job application     | Yes       |
| DELETE | `/api/applications/:id`        | Delete a specific job application     | Yes       |

#### Query Parameters for Search and Filter:

| Parameter | Description                                                   |
|-----------|---------------------------------------------------------------|
| `company` | Filters applications by company name (case-insensitive)       |
| `position`| Filters applications by job position (case-insensitive)       |
| `status`  | Filters applications by status (`applied`, `interviewing`, etc.) |