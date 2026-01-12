import axios from 'axios'

const API_KEY = 'dccd3fde9621a774eec4556e2e898f3f'
const BASE_URL = 'https://v3.football.api-sports.io'

async function testApi() {
    try {
        console.log("Testing API Connection...")
        const response = await axios.get(`${BASE_URL}/status`, {
            headers: {
                'x-apisports-key': API_KEY
            }
        })
        console.log("Status:", response.data)

        console.log("\nTesting Süper Lig Fixtures (Next 10)...")
        const fixtures = await axios.get(`${BASE_URL}/fixtures`, {
            headers: {
                'x-apisports-key': API_KEY
            },
            params: {
                league: 203,
                season: 2024,
                next: 5
            }
        })

        if (fixtures.data.response) {
            console.log(`Found ${fixtures.data.response.length} matches.`)
            console.log(fixtures.data.response[0])
        } else {
            console.log("No matches found.", fixtures.data)
        }

    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message)
    }
}

testApi()
