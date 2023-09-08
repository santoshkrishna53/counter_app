from flask import Flask, Blueprint, send_from_directory, render_template
from flask_cors import CORS

# Importing blueprints
from backend.blueprints.counters_api import counters

app = Flask(__name__)
cors = CORS(app)

# Configuration for serving the Angular frontend
app = Flask(__name__, static_folder='angular/dist/angular')
CORS(app)

# importing angular build
angular = Blueprint('app', __name__, template_folder='angular/dist/angular')

# Registering blueprints
app.register_blueprint(angular)
index_file = 'index.html'

# Registering the counters API blueprint
app.register_blueprint(counters)

# Serve static assets from the 'assets' directory
@app.route('/assets/<path:filename>')
def custom_static_for_assets(filename):
    return send_from_directory('angular/dist/angular/assets', filename)

# Serve other static files from the Angular build directory
@app.route('/<path:filename>')
def custom_static(filename):
    return send_from_directory('angular/dist/angular/', filename)

# Route for the main index.html file
@app.route('/')
def index():
    return render_template(index_file)

# Error handlers for 404, 401, and 403 errors
@app.errorhandler(404)
def not_found_error(error):
    return render_template(index_file)


@app.errorhandler(401)
def unauthenticated_error(error):
    return render_template(index_file)

@app.errorhandler(403)
def unauthorize_error(error):
    return render_template(index_file)

if __name__ == '__main__':
    # Run the Flask app on localhost with debugging enabled
    app.run(host='127.0.0.1', port=5000, debug=True)
