# Use the official Node.js image as the base image for frontend build
FROM node:14 as frontend

# Set the working directory in the container
WORKDIR /app

# Copy the Angular source code
COPY frontend/ .

# Install frontend dependencies
RUN npm install

# Build the Angular application
RUN npm run build -- --prod

# Use the official Python image as the final image for the backend
FROM python:3.8 as backend

# Set the working directory in the container
WORKDIR /app

# Copy the generated dist folder from the frontend build
COPY --from=frontend /app/dist /app/dist

# Copy the backend source code and dependencies to the container
COPY backend/ .

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5000 (or the port your Flask app is running on)
EXPOSE 5000

# Run the app using Gunicorn
CMD ["gunicorn", "--bind", ":$PORT", "--workers", "1", "--threads", "8", "--timeout", "0", "main:app"]
