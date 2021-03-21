from flask import Flask, jsonify, request, json

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return {
        'data' : 'Hello World'
    }


if __name__ == '__main__':
    app.run(debug=True)