# Job Application Tracker

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)

## Introduction

The **Job Application Tracker** is a web application that allows users to manage their job applications in one place. Users can sign up, log in, and track the progress of their applications by adding details such as the company, position, and status of their job search.

The app provides the following key functionalities:
- **User Authentication**: Secure user registration and login using JWT.
- **CRUD Operations**: Users can create, read, update, and delete job applications.
- **JWT Authentication**: Protects application routes to ensure only authenticated users have access.

## Features

- **User Registration and Login**: Securely register and log in with hashed passwords.
- **JWT-based Authentication**: API endpoints are protected using JWT.
- **Track Applications**: Add and manage job applications with relevant details (company name, position, status, date applied).
- **CRUD Operations**: Users can create, update, and delete applications.
- **Authorization Middleware**: Ensures users can only access their own data.
  
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

