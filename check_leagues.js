import axios from 'axios'

const API_KEY = 'dccd3fde9621a774eec4556e2e898f3f'
const BASE_URL = 'https://v3.football.api-sports.io'

async function checkLeagues() {
    try {
        console.log("Searching for 'Super Lig'...")
        const response = await axios.get(`${BASE_URL}/leagues`, {
            headers: { 'x-apisports-key': API_KEY },
            params: { search: 'Super Lig' }
        })

        const leagues = response.data.response
        leagues.forEach(l => {
            if (l.country.name === 'Turkey') {
                console.log(`\nLeague: ${l.league.name} (ID: ${l.league.id})`)
                const currentSeason = l.seasons.find(s => s.current)
                console.log("Current Season:", currentSeason)
            }
        })

    } catch (error) {
        console.error("Error:", error.message)
    }
}

checkLeagues()
