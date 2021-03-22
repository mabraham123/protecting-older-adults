from flask import Flask, jsonify, request, json

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return {
        'data' : 'Hello World'
    }

# def info_serializer(todo):
#     return{
#         'id': todo.id,
#         'graph': todo.graph
#     }

@app.route('/analysis', methods=['POST'])
def analysis():
    accountgraph = json.loads(request.data)
    print(request_data.keys())
    return {
        'data': 'asds'
    }


# @app.route('/analysis/<string:graph>')
# def analysis(graph):
#     request_data = json.loads(request.data)
#     print(request_data)
#     return {
#         'data' : "sa"
#     }


if __name__ == '__main__':
    app.run(debug=True)