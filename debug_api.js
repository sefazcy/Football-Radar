import axios from 'axios'

const API_KEY = 'dccd3fde9621a774eec4556e2e898f3f'
const BASE_URL = 'https://v3.football.api-sports.io'
const TRABZON_ID = 611 // I'll search to be sure, but let's try search first

async function debugTrabzon() {
    try {
        // 1. Get ID
        console.log("Searching Trabzonspor...")
        const searchRes = await axios.get(`${BASE_URL}/teams`, {
            headers: { 'x-apisports-key': API_KEY },
            params: { search: 'Trabzonspor' }
        })
        const teamObj = searchRes.data.response[0]
        const teamId = teamObj.team.id
        console.log(`ID: ${teamId}`)

        // 2. Get Last Matches (as in code)
        console.log("Fetching Last 10 Matches...")
        const matchesRes = await axios.get(`${BASE_URL}/fixtures`, {
            headers: { 'x-apisports-key': API_KEY },
            params: {
                team: teamId,
                last: 10,
                status: 'FT-LIVE-1H-2H-HT-ET-P'
            }
        })

        console.log(`Matches Found: ${matchesRes.data.response.length}`)
        if (matchesRes.data.response.length > 0) {
            console.log("Sample Match:", matchesRes.data.response[0].fixture.date)
        } else {
            console.log("Errors:", matchesRes.data.errors)
        }

    } catch (e) {
        console.log("Error", e.message)
    }
}

debugTrabzon()
