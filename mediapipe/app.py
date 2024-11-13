from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

# Endpoint to start the ISL detection script
@app.route('/start-isl-detection', methods=['POST'])
def start_isl_detection():
    try:
        # Start the `isl_detection.py` script as a subprocess
        subprocess.Popen(['python', 'isl_detection.py'])
        return jsonify({'message': 'ISL detection started.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)