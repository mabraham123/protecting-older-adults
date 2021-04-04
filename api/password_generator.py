import random


def generate(upper=True, lower=True, nums=True , syms=True, password_length=12):
    all= ""
    if upper:
        #Removed Captial O as it may look like a Zero
        
        all += "ABCDEFGHJKLMNPQRSTUVWXYZ"

    if lower:
        #Removed lowercase i and l as they may look like 1 or like their captial version 
        #Removed lowercase o as it may look like a Zero
        all+= "abcdefghjkmnpqrstuvwxyz"

    if nums:
        #Removed 1 as it may look like lowercase l or I
        all+= "23456789"

    if syms:
        all+= "?!@"

    if upper==False and lower==False and nums==False and syms==True:
        password= "Select more of the values below"
        return password
    elif upper==False and lower==False and nums==False and syms==False:
        password= "Select more of the values below"
        return password
    elif upper==False and lower==False and nums==True and syms==True:
        password=""
        for x in range(password_length):
            password+=all[random.randint(0,len(all)-1)]
        return password
    elif upper==False and lower==False and nums==True and syms==False:
        password=""
        for x in range(password_length):
            all='1234567890'
            password+=all[random.randint(0,len(all)-1)]
        return password
    
    password=""
    for x in range(password_length):
       password+=all[random.randint(0,len(all)-1)]
    return password
    #password = "".join(random.sample(all, password_length))


    

    



