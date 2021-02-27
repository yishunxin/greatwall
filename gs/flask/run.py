# -*-coding:utf8-*-
from flask import Flask, render_template
import logging
app = Flask(__name__)
app.template_folder
@app.route('/',methods=['GET'])
def index():
	try:
		return render_template('index.html')
	except Exception as e:
		logging.exception(e)
		return 'no'

if __name__ == '__main__':
	app.run(debug=True,port=4399)