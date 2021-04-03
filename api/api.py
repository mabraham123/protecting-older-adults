from flask import Flask, jsonify, request
import account_access_visualiser as AAG
import json

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
    request_data = json.loads(request.data)
    analysis=AAG.graph_analysis(request_data)
    return {
        'analysis': analysis
    }

@app.route('/aag')
def aag():
    json='{"Device: laptop":{"name":"laptop","type":"Device","ViewWhenLocked":"false","incoming":[{"recovery":false,"needed":["Biometric: finger"]},{"recovery":false,"needed":["Password: stonechat"]}]},"Device: ipad":{"name":"ipad","type":"Device","ViewWhenLocked":"false","incoming":[{"recovery":false,"needed":["Biometric: finger"]},{"recovery":false,"needed":["Password: stonechat"]}]},"Device: iphone":{"name":"iphone","type":"Device","ViewWhenLocked":"false","incoming":[{"recovery":false,"needed":["Biometric: faceid"]}]},"Biometric: finger":{"name":"finger","type":"Biometric","ViewWhenLocked":"","incoming":[]},"Password: stonechat":{"name":"stonechat","type":"Password","ViewWhenLocked":"","incoming":[{"recovery":false,"needed":["Password Manager: book"]},{"recovery":false,"needed":["Password Manager: WordDocFile"]}],"strength":"weak"},"Biometric: faceid":{"name":"faceid","type":"Biometric","ViewWhenLocked":"","incoming":[]},"Email: btinternet":{"name":"btinternet","type":"Email","opensessions":["Device: laptop","Device: ipad","Device: iphone"],"incoming":[{"recovery":false,"needed":["Password: stonechat1"]}]},"Password: stonechat1":{"name":"stonechat1","type":"Password","opensessions":[],"incoming":[{"recovery":false,"needed":["Password Manager: WordDocFile"]},{"recovery":false,"needed":["Password Manager: book"]}],"strength":"average"},"Social Media: facebook":{"name":"facebook","type":"Social Media","opensessions":["Device: ipad"],"incoming":[],"note":"Not used."},"Password: Stonechat12":{"name":"Stonechat12","type":"Password","opensessions":[],"incoming":[{"recovery":false,"needed":["Password Manager: book"]},{"recovery":false,"needed":["Password Manager: WordDocFile"]}],"strength":"average"},"Number: bankGivenNumber":{"name":"bankGivenNumber","type":"Number","opensessions":[],"incoming":[{"recovery":false,"needed":["Password Manager: book"]},{"recovery":false,"needed":["Password Manager: WordDocFile"]}]},"Number: securityNumber":{"name":"securityNumber","type":"Number","opensessions":[],"incoming":[{"recovery":false,"needed":["Password Manager: book"]},{"recovery":false,"needed":["Password Manager: WordDocFile"]}]},"Word: passcode":{"name":"passcode","type":"Word","opensessions":[],"incoming":[{"recovery":false,"needed":["Password Manager: book"]},{"recovery":false,"needed":["Password Manager: WordDocFile"]}]},"Finance: bank":{"name":"bank","type":"Finance","opensessions":[],"incoming":[{"recovery":false,"needed":["Password: Stonechat12","Number: bankGivenNumber","Number: securityNumber","Word: passcode"]}]},"Shopping: amazon":{"name":"amazon","type":"Shopping","opensessions":["Device: ipad","Device: laptop"],"incoming":[{"recovery":false,"needed":["Email: btinternet","Password: stonechat11"]},{"recovery":true,"needed":["Email: btinternet"]}],"note":"Stores credit card."},"Shopping: m&s":{"name":"m&s","type":"Shopping","opensessions":[],"incoming":[{"recovery":false,"needed":["Email: btinternet","Password: stonechat333"]},{"recovery":true,"needed":["Email: btinternet"]}]},"Password: stonechat11":{"name":"stonechat11","type":"Password","opensessions":[],"incoming":[{"recovery":false,"needed":["Password Manager: WordDocFile"]},{"recovery":false,"needed":["Password Manager: book"]}],"strength":"average"},"Password: stonechat333":{"name":"stonechat333","type":"Password","opensessions":[],"incoming":[{"recovery":false,"needed":["Password Manager: WordDocFile"]},{"recovery":false,"needed":["Password Manager: book"]}],"strength":"average"},"Entertainment: netflix":{"name":"netflix","type":"Entertainment","opensessions":[],"incoming":[{"recovery":false,"needed":["Email: btinternet","Password: wettown11"]},{"recovery":true,"needed":["Email: btinternet"]}]},"Password: wettown11":{"name":"wettown11","type":"Password","opensessions":[],"incoming":[{"recovery":false,"needed":["Password Manager: WordDocFile"]},{"recovery":false,"needed":["Password Manager: book"]}],"strength":"average"},"Password Manager: book":{"name":"book","type":"Password Manager","opensessions":[],"incoming":[]},"Password Manager: WordDocFile":{"name":"WordDocFile","type":"Password Manager","opensessions":["Device: laptop"],"incoming":[],"note":"Daughter has access to this file."}} '
    #json='{"A":{"name":"A","type":"Node","incoming":[]},"B":{"name":"B","type":"Node","incoming":[{"recovery":true,"needed":["A"]}]},"C":{"name":"C","type":"Node","incoming":[{"recovery":true,"needed":["A"]}]}'
    #json='{"A":{"name":"A","type":"Node","ViewWhenLocked":"false","incoming":[]},"B":{"name":"B","type":"Node","ViewWhenLocked":"false","incoming":[{"recovery":true,"needed":["A"]}]},"C":{"name":"C","type":"Node","ViewWhenLocked":"false","incoming":[{"recovery":false,"needed":["A"]}]}}'
    accountgraph=AAG.convert_json_to_dictionary(json)
    #Find passwords with a WEAK strength
    analysis=AAG.graph_analysis(accountgraph)
    return {
        'analysis': analysis
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