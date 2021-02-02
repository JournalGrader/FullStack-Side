import requests;hostIP = 'http://0.0.0.0'
port = 2005
R = requests.get(f'{hostIP}:{port}/test')
