import sys
import json
import logging

# logging.basicConfig(
#     level=logging.INFO,
#     format='%(levelname)s: %(asctime)s pid:%(process)s module:%(module)s %(lineno)d: %(message)s',
#     # datefmt='%d/%m/%y %H:%M:%S',
#     handlers=[
#         logging.FileHandler("debug.log"),
#         logging.StreamHandler()
#     ]
# )




# logging.info(data)

print("######### python script is running #########")
sys.stdout.flush()

while True:
  m = sys.stdin.readline()
  print(m)
  sys.stdout.flush()

# # Read the data sent from Electron

# my_var = 'initial_value'

# # Handle messages from the main.js file
# def message_handler(message):
#   global my_var
#   parts = message.split('|')
#   if parts[0] == 'set_value':
#       my_var = parts[1]
#       print(f'Variable updated: {my_var}')
#       sys.stdout.flush()


# # Set up a loop to listen for messages
# while True:
#   message = input()
#   print(message)
#   sys.stdout.flush()
#   message_handler(message)
#   print("hi")
#   sys.stdout.flush()



# # # Convert the data to a Python object
# data = json.loads(data)
# print(data)
# sys.stdout.flush()
