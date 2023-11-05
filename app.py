from flask import Flask, jsonify, render_template, send_from_directory
import sqlite3

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_earthquake_data')
def get_earthquake_data():
    conn = sqlite3.connect('earthquake_analysis.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM combined_ngdc_earthquakes")
    data = cursor.fetchall()
    conn.close()

    columns = [col[0] for col in cursor.description]
    earthquake_data = [dict(zip(columns, row)) for row in data]

    return jsonify(earthquake_data)

@app.route('/get_suicide_data')
def get_suicide_data():
    conn = sqlite3.connect('earthquake_analysis.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM suicide_data")
    data = cursor.fetchall()
    conn.close()

    columns = [col[0] for col in cursor.description]
    suicide_data = [dict(zip(columns, row)) for row in data]

    return jsonify(suicide_data)

@app.route('/get_gdp_data')
def get_gdp_data():
    conn = sqlite3.connect('earthquake_analysis.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM worldgdpdata")
    data = cursor.fetchall()
    conn.close()

    columns = [col[0] for col in cursor.description]
    gdp_data = [dict(zip(columns, row)) for row in data]

    return jsonify(gdp_data)

if __name__ == '__main__':
    app.run(debug=True)
