import requests
import json

try:
    response = requests.get('https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=4328')
    data = response.json()
    if data['events']:
        first_event = data['events'][0]
        # Print all keys to check for time and weather
        print(json.dumps(first_event, indent=2))
except Exception as e:
    print(e)
