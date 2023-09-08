# Counter Management Web Application

## Overview

The Counter Management Web Application is a simple web application built using Angular for the frontend and Flask for the backend. It allows users to create, view, increment, and decrement counters. Counters are stored both locally in the browser's local storage and remotely on a backend API server.

## Features

### 1. Counter List

- Displays a list of counters with their names and current counts.
- Allows users to increment, decrement, and delete counters.
- Provides real-time updates using Angular's two-way data binding and local storage synchronization.

### 2. Add Counter

- Allows users to add new counters with a name and an initial count value.
- Validates user inputs and provides error messages for invalid inputs.

### 3. Data Persistence

- Utilizes the browser's local storage to store counter data for persistence between sessions.
- Communicates with a Flask backend API server to retrieve and update counter data, ensuring data consistency across multiple clients.

## Frontend (Angular)

The Angular frontend is responsible for the user interface and interaction. It includes components, templates, and services for managing counters and communicating with the backend API.

## Backend (Flask)

The Flask backend serves as the API server and provides the following functionality:

- **Counter Retrieval (GET)**: Endpoint for fetching counter data from the server.
- **Counter Update (POST)**: Endpoint for updating counter data on the server.

## Usage

- **View Counters**: The main page displays a list of counters with their names and counts. Users can increment, decrement, and delete counters.

- **Add Counter**: Users can add a new counter by providing a name and an initial count value.

- **Data Synchronization**: The application automatically synchronizes data between the browser's local storage and the backend server, ensuring data consistency.

## Installation and Setup

1. Clone the project repository from GitHub.

2. Install the required frontend and backend dependencies.

   - **For the frontend (Angular)**:

     - Navigate to the `angular` directory.
     - Run `npm install` to install frontend dependencies.

   - **For the backend (Flask)**:
     - Run `pip install -r requirements.txt` to install backend dependencies.

3. Build the Angular frontend by running `ng build --prod` from the `angular` directory.

4. Start the Flask backend server by running `python main.py` from the `root` directory.

5. Access the application in a web browser at [http://localhost:5000/](http://localhost:5000/).

## Dependencies

### Frontend (Angular)

- Angular: Frontend framework for building the user interface.
- RxJS: Library for handling asynchronous operations.
- Bootstrap: CSS framework for styling.
- Angular Forms: Used for form validation and management.
- HttpClient: Used for making HTTP requests to the backend API.

### Backend (Flask)

- Flask: Backend web framework for building the API.
- Flask-CORS: Extension for handling cross-origin resource sharing.
- Python: Programming language used for backend development.

## Contributors

- Santhosh Krishna
