import requests

url = 'https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=4328&s=2024-2025'
r = requests.get(url)
data = r.json()
if data.get('events'):
    print(f"Total events: {len(data['events'])}")
    # Print last event to see if it has recent ones
    print(f"Last event: {data['events'][-1]['strEvent']} Date: {data['events'][-1]['dateEvent']}")
else:
    print("No events")
