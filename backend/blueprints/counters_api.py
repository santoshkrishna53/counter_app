from flask import Blueprint, request
import json


# Create a Blueprint named 'counters'
counters = Blueprint('counters', __name__)

# Define the storage file path for counters
storage_file = "backend/blueprints/counters.txt"

# Route for retrieving counters (GET request)
@counters.route('/api/counters', methods=["GET"])
def get_counters():
    try:
        # Attempt to open and read the storage file
        with open(storage_file, 'r') as file:
            data = file.read()

        # Return the counters as JSON response with a success status code (200)
        return {"counters" : data, "status" : "success"}, 200
    except FileNotFoundError:
        # Return an error response with a 400 status code if the file is not found
        return {"status" : "Failed"}, 400

# Route for updating counters (POST request)
@counters.route('/api/counters', methods=["POST"])
def write_data():
    try:
        # Get the JSON payload from the request
        payload = request.json
        data = payload.get("data","")

        # Write the updated counters data to the storage file
        with open(storage_file, 'w') as file:
            file.write(json.dumps(data))
        
        # Return the updated counters as JSON response with a success status code (200)
        return {"counters" : data, "status" : "success"}, 200
    except Exception as e:

        # Return an error response with a 400 status code if there's an exception
        return {"status" : "Failed", "error" : str(e)}, 400