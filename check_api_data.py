import requests
import json

def check_kocaelispor_data():
    # 1. Search for Kocaelispor to get ID
    search_url = "https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=Kocaelispor"
    try:
        resp = requests.get(search_url)
        data = resp.json()
        if not data['teams']:
            print("Kocaelispor not found")
            return
        
        team = data['teams'][0]
        team_id = team['idTeam']
        print(f"Team Found: {team['strTeam']} (ID: {team_id})")
        
        # 2. Get Last 5 Events
        events_url = f"https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id={team_id}"
        resp = requests.get(events_url)
        events_data = resp.json()
        
        print("\n--- Last 5 Matches (API Data) ---")
        if events_data['results']:
            for event in events_data['results']:
                print(f"Date: {event['dateEvent']}, League: {event['strLeague']}, Match: {event['strEvent']}, Score: {event['intHomeScore']}-{event['intAwayScore']}")
        else:
            print("No events found in eventslast.php")

        # 3. Check for Turkish Cup League
        # I'll try to find if there is a specific league for it by searching matches/leagues doesn't have a direct search often, 
        # but I can check the 'strLeague' field from the events above to see if Cup matches are even appearing.
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_kocaelispor_data()
