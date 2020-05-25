from flask import Flask, render_template, jsonify
import logging
app = Flask(__name__)

@app.route('/')
def index():
    try:
        return render_template("index.html")
    except Exception as e:
        logging.exception(e)
        return jsonify({1:1})