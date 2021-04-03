import random


def generate(upper=True, lower=True, nums=True , syms=True, password_length=15):
    all= ""
    if upper:
        all += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if lower:
        all+= "ABCDEFGHIJKLMNOPQRSTUVWXYZ".lower()

    if nums:
        all+= "0123456789"

    if syms:
        all+= "?!"
        
    password = "".join(random.sample(all, password_length))
    return password



