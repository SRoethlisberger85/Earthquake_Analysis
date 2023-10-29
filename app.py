from flask import Flask, jsonify, render_template, request, send_from_directory
import sqlite3

app = Flask(__name__, static_url_path='/static', static_folder='static')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/combined_ngdc_earthquakes', methods=['GET'])
def get_earthquake_data():
    try:
        with sqlite3.connect('earthquake_analysis.db') as conn:
            cursor = conn.cursor()
            query = 'SELECT * FROM earthquake.combined_ngdc_earthquakes'
            cursor.execute(query)
            results = cursor.fetchall()
            return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/suicide_data', methods=['GET'])
def get_suicide_data():
    try:
        with sqlite3.connect('earthquake_analysis.db') as conn:
            cursor = conn.cursor()
            query = 'SELECT * FROM earthquake.suicide_data'
            cursor.execute(query)
            results = cursor.fetchall()
            return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/worldgdpdata', methods=['GET'])
def get_gdp_data():
    try:
        with sqlite3.connect('earthquake_analysis.db') as conn:
            cursor = conn.cursor()
            query = 'SELECT * FROM earthquake.worldgdpdata'
            cursor.execute(query)
            results = cursor.fetchall()
            return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
