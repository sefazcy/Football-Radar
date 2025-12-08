import requests
import json

test_params = [
    # Premier League, Round 10
    {'url': 'https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4328&r=10&s=2024-2025', 'name': 'PL r10'},
    # Super Lig, Round 10
    {'url': 'https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=4339&r=10&s=2024-2025', 'name': 'SL r10'}
]

for t in test_params:
    try:
        r = requests.get(t['url'])
        data = r.json()
        if data.get('events'):
            print(f"{t['name']}: {len(data['events'])} events. First: {data['events'][0]['strEvent']}")
        else:
            print(f"{t['name']}: No events found")
    except Exception as e:
        print(f"{t['name']}: Error {e}")
