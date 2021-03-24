import json

Nodes={}
passwords=[]


def convert_json_to_dictionary(json_file):
    return json.loads(json_file)


#Wrapper function
def graph_analysis(account_access_interview_data):
    analysis={
    }
    #Convert data into a graph data structure
    data=convert_account_access_data_to_graph(account_access_interview_data)
    analysis={
        "accountaccess":data,
        "passwords": passwords
    } 
    #Find the user defined weak passwords

    #Find re-used passwords

    #Find the accounts with 2FA

    return analysis



#{'name': 'stonechat1', 'type': 'Password', 'opensessions': [], 'incoming': [{'recovery': False, 'needed': ['Password Manager: WordDocFile']}

def convert_account_access_data_to_graph(data):
    #graph=[]
    #Loop through every account in data to make a graph
    for index in data:

        if index not in Nodes:
            Nodes[index]={
                "name": data[index].get("name"),
                "type": data[index].get("type"),
                "in_edges": {'edges':[], 'recovery':[]},
                "out_edges": {'edges':[], 'recovery':[]}
            }
    

        #Set incoming and outgoing edges
        edges=[]
        recovery=[]
        for x in range(len(data[index].get("incoming"))):
            #If the method is not recovery
            if data[index].get("incoming")[x].get("recovery") == False:
                edges+=data[index].get("incoming")[x].get("needed")
                #Find other key to add to their out_edges field
                for a in data[index].get("incoming")[x].get("needed"):
                    # If node does not exists
                    if a not in Nodes:
                        add_node(a)
                    #Setting Node to point to current node  
                    Nodes[a]["out_edges"]["edges"] += [index]
            else:
                recovery+= data[index].get("incoming")[x].get("needed")
                #Find other key to add to their out_edges field
                for a in data[index].get("incoming")[x].get("needed"):
                    # If node does not exists
                    if a not in Nodes:
                        add_node(a)
                    #Setting Node to point to current node  
                    Nodes[a]["out_edges"]["recovery"]+= [index]

        Nodes[index]["in_edges"]= {'edges':edges, 'recovery':recovery}

        if Nodes[index]["type"] == "Password":
            passwords.append(str(index))
           
        
    
    return Nodes


def add_node(name):
    info=name.split(": ")
    Nodes[name]={
        "name": str(info[1]),
        "type": str(info[0]),
        "in_edges": {'edges':[], 'recovery':[]},
        "out_edges": {'edges':[], 'recovery':[]}
    }

