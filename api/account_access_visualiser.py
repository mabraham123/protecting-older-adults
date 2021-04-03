import json
import password_generator as passgen

Nodes={}
passwords=[]
devices=[]
accounts=[]

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

    #Convert data into a graph data structure
    convert_account_access_data_to_graph(account_access_interview_data)
    #Find the user defined weak passwords
    bad_passwords= find_user_defined_weak_passwords()
    #Find re-used passwords
    reused_passwords= find_reused_passwords()
    #Find the accounts without MFA
    non_MFA_accounts= find_non_MFA_accounts()
    #Find most critical Nodes in graph
    most_critical_node= find_most_critical_node()
    #Find out if the user has password protect devices
    devices_protected= password_protected_devices()
    #Find if the user uses a password manager
    uses_password_manager= password_manager_present()

    #Work out the users secuirty grade
    grade=calculate_security_grade(len(reused_passwords.get("reused")),len(non_MFA_accounts.get("non_MFA")),len(bad_passwords.get("critical")),len(bad_passwords.get("issues")), len(devices_protected.get("protected")), uses_password_manager)


    analysis={
        #Find the user defined weak passwords
        "bad_passwords": bad_passwords,
        #Find re-used passwords
        "reused_passwords": reused_passwords,
        #Find the accounts without MFA
        "non_MFA_accounts": non_MFA_accounts,
        #Find most critical Nodes in graph
        "most_critical_node": most_critical_node,
        "devices": devices_protected,
        "uses_password_manager": uses_password_manager,
        "grade": grade
    }
    return analysis


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
        pairs=data[index].get("incoming")
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
        Nodes[index]["in_edges"]= {'edges':edges, 'recovery':recovery, 'pairs':pairs}

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
            #Save the nodes that are devices for quick access
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
        "strong":[],
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
        else:
            passwords_vulnerabilities["strong"].append(passwords[index])

    return passwords_vulnerabilities

##Method to find any passwords that have been used more than once
#to access multiple accounts
def find_reused_passwords():
    reused_passwords={
        'reused':[],
        'solution': "Avoid reusing passwords by using a different password for all of your accounts. If you are having trouble remembering all of your passwords you might benifit from some password management strategies."
    }

    #Loop all the passwords
    for index in range(len(passwords)):
        if len(Nodes[passwords[index]].get("out_edges").get("edges")) + len(Nodes[passwords[index]].get("out_edges").get("recovery")) > 1:
            reused_passwords['reused'].append({
                "name": Nodes[passwords[index]].get("name"),
                "account_liked": Nodes[passwords[index]].get("out_edges").get("edges") + Nodes[passwords[index]].get("out_edges").get("recovery")
            })

    return reused_passwords


def find_non_MFA_accounts():
    non_MFA=[]
    MFA=[]

    #Loop over every account
    for index in Nodes:
        #Check if the node is an account
        if Nodes[index].get("type") == "Social Media" or Nodes[index].get("type") == "Email" or Nodes[index].get("type") == "Finance" or Nodes[index].get("type") == "Shopping" or Nodes[index].get("type") == "Entertainment" or Nodes[index].get("type") == "Gaming":
            #Save account
            accounts.append(str(index))
            #Loop over every item in the pairs array
            for x in range(len(Nodes[index].get("in_edges").get("pairs"))):
                if Nodes[index].get("in_edges").get("pairs")[x].get("recovery") != True:
                    if len(Nodes[index].get("in_edges").get("pairs")[x].get("needed")) < 3:
                        non_MFA.append(index)
                    else:
                        MFA.append(index)


    return {
        "non_MFA":non_MFA,
        "MFA": MFA,
        "solution": "use MFA"
        }

       
def find_most_critical_node():
    current={
        "name":"",
        "length": 0
        }

    #Loop over every node
    for index in Nodes:
        if (len(Nodes[index].get("out_edges").get("edges")) + len(Nodes[index].get("out_edges").get("recovery"))) > current.get("length") and Nodes[index].get("type")!='Password Manager':
            current["name"]= index
            current["length"]= len(Nodes[index].get("out_edges").get("recovery")) + len(Nodes[index].get("out_edges").get("edges"))
            
    return current.get("name")


def calculate_precentage_reused_passwords(number_of_reused_passwords):
    total=len(passwords)
    precentage= round((number_of_reused_passwords/total)*100,0)
    if precentage == 0:
        return 7
    elif precentage <= 10:
        return 6
    elif precentage > 10 and precentage <=25:
        return 5
    elif precentage > 25 and precentage <=50:
        return 4
    elif precentage > 50 and precentage <=70:
        return 3
    elif precentage > 70 and precentage <=90:
        return 2
    elif precentage > 90:
        return 1

def calculate_precentage_of_MFA_usasage_of_all_accounts(number_of_non_MFA_accounts):
    total=len(accounts)
    precentage= round((number_of_non_MFA_accounts/total)*100,0)
    if precentage == 0:
        return 7
    elif precentage <= 10:
        return 6
    elif precentage > 10 and precentage <=25:
        return 5
    elif precentage > 25 and precentage <=50:
        return 4
    elif precentage > 50 and precentage <=70:
        return 3
    elif precentage > 70 and precentage <=90:
        return 2
    elif precentage > 90:
        return 1

def password_manager_present():
    value=[ v for k,v in Nodes.items() if k.startswith('Password Manager')]
    if len(value) > 0:
        return True
    else:
        return False

def calculate_precentage_of_passwords_at_a_given_strength(number_of_passwords):
    total=len(passwords)
    precentage= round((number_of_passwords/total)*100,0)
    if precentage == 0:
        return 7
    elif precentage > 0 and precentage <=10:
        return 6
    elif precentage > 10 and precentage <=20:
        return 5
    elif precentage > 20 and precentage <=50:
        return 4
    elif precentage > 50 and precentage <=70:
        return 3
    elif precentage > 70 and precentage < 100:
        return 2
    elif precentage==100:
        return 1


def password_protected_devices():
    password_protected_devices={
        "protected":[],
        "not_protected": []
    }

    for index in devices:
        if (len(Nodes[index].get("in_edges").get("edges"))+len(Nodes[index].get("in_edges").get("recovery")))==0 and index not in password_protected_devices["not_protected"]:
            password_protected_devices["not_protected"].append(index)

        for method in range(len(Nodes[index].get("in_edges").get("edges"))):
            if Nodes[Nodes[index].get("in_edges").get("edges")[method]].get("type") == "Password":
                if index not in password_protected_devices["protected"]:
                    password_protected_devices["protected"].append(index)
            elif Nodes[Nodes[index].get("in_edges").get("edges")[method]].get("type") == "Biometric":
                if index not in password_protected_devices["protected"]:
                    password_protected_devices["protected"].append(index)
            elif Nodes[Nodes[index].get("in_edges").get("edges")[method]].get("type") == "Pincode": 
               if index not in password_protected_devices["protected"]:
                    password_protected_devices["protected"].append(index)
            else:
                if index not in password_protected_devices["not_protected"]:
                    password_protected_devices["not_protected"].append(index)
    
    return password_protected_devices

def calculate_precentage_of_password_protected_devices_of_all_devices(password_protected_devices):
    total = len(devices)
    precentage= round((password_protected_devices/total)*100,0)
    if precentage == 100:
        return 7
    elif precentage <100 and precentage >= 50:
        return 3
    elif precentage <50 and precentage >= 25 :
        return 2
    elif precentage <25  and precentage >=0:
        return 0


def calculate_security_grade(number_of_reused_passwords,number_of_non_MF_accounts, number_of_weak_passwords,number_of_avg_passwords, number_of_password_protected_devices,uses_password_manager):

    grades=["A+","A","B+","B","C","D","F"]
    finalgrade=0
    criteria={}
    #Calculare grade for password reuse
    reused_password_grade=calculate_precentage_reused_passwords(number_of_reused_passwords)
    criteria["reused_password_grade"]= reused_password_grade

    #Use of Multi-Factor_Authentication
    MFA_usage_grade=calculate_precentage_of_MFA_usasage_of_all_accounts(number_of_non_MF_accounts)
    criteria["MFA_usage_grade"]= MFA_usage_grade

    #Check if they use a password manager
    password_manager_grade= 7 if uses_password_manager == True else 0
    criteria["password_manager_grade"]= password_manager_grade
    
    #Check how many average passwords the user has
    number_of_avg_password_grade= calculate_precentage_of_passwords_at_a_given_strength(number_of_avg_passwords)
    criteria["number_of_avg_password_grade"]= number_of_avg_password_grade
    
    #Check how many weak passwords the user has
    number_of_weak_password_grade= calculate_precentage_of_passwords_at_a_given_strength(number_of_weak_passwords)
    criteria["number_of_weak_password_grade"]= number_of_weak_password_grade
    
    #Check how many of the devices have passwords
    number_of_password_protected_devices_grade= calculate_precentage_of_password_protected_devices_of_all_devices(number_of_password_protected_devices)
    criteria["number_of_password_protected_devices_grade"]= number_of_password_protected_devices_grade
    
    total_possible_grade=len(grades)*len(criteria)
    finalgrade= reused_password_grade + MFA_usage_grade + password_manager_grade + number_of_avg_password_grade + number_of_weak_password_grade + number_of_password_protected_devices_grade

    final=round(((finalgrade/total_possible_grade)*100),0)




    return {
        "grade": calculate_grade(final),
        "final": final,
        "breakdown": criteria
    }
    
def calculate_grade(grade):
    if grade==100:
        return "A+"
    elif grade >=90 and grade < 100:
        return "A"
    elif grade >=80 and grade < 90:
        return "B+"
    elif grade >=70 and grade < 80:
        return "B"
    elif grade >=60 and grade < 70:
        return "C"
    elif grade >=50 and grade < 60:
        return "D"
    elif grade >=0 and grade < 59:
        return "F"
