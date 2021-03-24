import json

Nodes={}
passwords=[]
devices=[]

##Initialiser for global variables


def convert_json_to_dictionary(json_file):
    return json.loads(json_file)

def initialiser():
    global Nodes    # Needed to modify global copy of Devices
    Nodes = {}
    
    global passwords    # Needed to modify global copy of passwords
    passwords = []

    global devices    # Needed to modify global copy of devices
    devices = []


#Wrapper function
def graph_analysis(account_access_interview_data):
    initialiser()
    #analysis={}
    #Convert data into a graph data structure
    convert_account_access_data_to_graph(account_access_interview_data)

    #Find the accounts with 2FA

    analysis={
        #Find the user defined weak passwords
        "bad_passwords": find_user_defined_weak_passwords(),
        #Find re-used passwords
        "reused_passwords": find_reused_passwords()
    }
    return analysis



#{'name': 'stonechat1', 'type': 'Password', 'opensessions': [], 'incoming': [{'recovery': False, 'needed': ['Password Manager: WordDocFile']}

def convert_account_access_data_to_graph(data):
    #Loop through every account in data to make a graph
    for index in data:
        #Check if the node has not been created in the graph
        if index not in Nodes:
            #Initialise a Node for the graph
            Nodes[index]={
                "name": data[index].get("name"),
                "type": data[index].get("type"),
                "in_edges": {'edges':[], 'recovery':[]},
                "out_edges": {'edges':[], 'recovery':[]}
            }
    

        #Set incoming and outgoing edges
        edges=[]
        recovery=[]
        #Loop through the nodes needed for what is needed to access an account
        for x in range(len(data[index].get("incoming"))):
            #If the access method is not a recovery method
            if data[index].get("incoming")[x].get("recovery") == False:
                #Create the edges
                edges+=data[index].get("incoming")[x].get("needed")
                #Find other key to add to their out_edges field
                for a in data[index].get("incoming")[x].get("needed"):
                    # If node does not exists
                    if a not in Nodes:
                        add_node(a)
                    #Setting Node to point to current node  
                    Nodes[a]["out_edges"]["edges"] += [index]
            else:
                #Create recovery edges
                recovery+= data[index].get("incoming")[x].get("needed")
                #Find other key to add to their out_edges field
                for a in data[index].get("incoming")[x].get("needed"):
                    # If node does not exists
                    if a not in Nodes:
                        add_node(a)
                    #Setting Node to point to current node  
                    Nodes[a]["out_edges"]["recovery"]+= [index]
        #Save both the edges for normal and recovery methods 
        Nodes[index]["in_edges"]= {'edges':edges, 'recovery':recovery}

        #Save specific data from the access interview
        if Nodes[index]["type"] == "Password":
            #Save the password strength field
            Nodes[index].update({"strength": data[index].get("strength")})
            #Save the nodes that are passwords for quick access
            passwords.append(str(index))
        elif Nodes[index]["type"] == "Device":
        #Save specific data from the access interview
            #Save the password strength field
            Nodes[index].update({"ViewWhenLocked": data[index].get("ViewWhenLocked")})
            #Save the nodes that are passwords for quick access
            devices.append(str(index))   


def add_node(name):
    info=name.split(": ")
    Nodes[name]={
        "name": str(info[1]),
        "type": str(info[0]),
        "in_edges": {'edges':[], 'recovery':[]},
        "out_edges": {'edges':[], 'recovery':[]}
    }

##Find passwords that the user has defined as weak or avaerage
#to suggest them with strong password creation stratigies
#
#Returns- dictonary of weak and average passwords with a solution
def find_user_defined_weak_passwords():
    passwords_vulnerabilities={
        "critical": [],
        "issues": [],
        "solution":"look at nist"
    }
    #Loop all the passwords
    for index in range(len(passwords)):
        #Find any weak passwords
        if Nodes[passwords[index]].get("strength") == "weak":
            passwords_vulnerabilities["critical"].append(passwords[index])
        elif Nodes[passwords[index]].get("strength") == "average":
            #Find any average strength passwords
            passwords_vulnerabilities["issues"].append(passwords[index])

    return passwords_vulnerabilities

##Method to find any passwords that have been used more than once
#to access multiple accounts
def find_reused_passwords():
    reused_passwords={
        'reused':[],
        'solution': "Don't reuse any passwords"
    }

    #Loop all the passwords
    for index in range(len(passwords)):
        if len(Nodes[passwords[index]].get("out_edges").get("edges")) + len(Nodes[passwords[index]].get("out_edges").get("recovery")) > 1:
            reused_passwords['reused'].append({
                "name": passwords[index],
                "account_liked": Nodes[passwords[index]].get("out_edges").get("edges") + Nodes[passwords[index]].get("out_edges").get("recovery")
            })

    return reused_passwords


 