import requests
import json

ids = ['4339', '4328', '4335'] # Super Lig, Premier League, La Liga

for lid in ids:
    url = f"https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id={lid}"
    print(f"Checking league {lid}...")
    try:
        r = requests.get(url)
        data = r.json()
        if data.get('events'):
             print(f"League {lid} returned {len(data['events'])} events.")
             print(f"First event: {data['events'][0]['strEvent']}")
        else:
             print(f"League {lid} returned no events.")
    except Exception as e:
        print(f"Error for {lid}: {e}")
