import sys
from flask import Flask
app=Flask(__name__)
@app.route('/test',methods=['GET'])
def test():
    a = [1]
    pro(a)
    print (a)
    return '1'

def pro(t):
    t.append(1)
if __name__ == "__main__":
    app.run(debug=True)
