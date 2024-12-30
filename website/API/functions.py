import random

def generate_code():
    string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    number = '1234567890'
    email_message = ''
    get_string  = True

    for i in range(6):
        if get_string:
            random_int = random.randint(0, (len(string) - 1))
            get_string = False
            email_message += string[random_int]
        else:
            random_int = random.randint(0, (len(number) - 1))
            get_string = True
            email_message += number[random_int]
    
    return email_message