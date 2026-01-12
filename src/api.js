import axios from 'axios'

const API_KEY = 'dccd3fde9621a774eec4556e2e898f3f'
const BASE_URL = 'https://v3.football.api-sports.io'

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': API_KEY,
        'x-apisports-key': API_KEY // Dashboard key usage defaults to this sometimes, keeping both for safety
    }
})

export const api = {
    // Search team by name
    searchTeam: (name) => apiClient.get(`/teams`, { params: { search: name } }),

    // Get last matches for a team
    getLastMatches: (teamId) => apiClient.get(`/fixtures`, {
        params: {
            team: teamId,
            last: 10,
            status: 'FT-LIVE-1H-2H-HT-ET-P' // Finished and Live matches
        }
    }),

    // Get live matches specifically
    getLiveMatches: () => apiClient.get(`/fixtures`, { params: { live: 'all' } }),

    // Get league fixtures (using date range for "This Week" feel)
    // We'll calculate dates dynamically in App.jsx
    getLeagueMatches: (leagueId, fromDate, toDate) => apiClient.get(`/fixtures`, {
        params: {
            league: leagueId,
            season: 2025, // Updated to 2025 season based on API response
            from: fromDate,
            to: toDate
        }
    })
}

// Helper to get League IDs
export const LEAGUE_IDS = {
    SUPER_LIG: 203,
    PREMIER_LEAGUE: 39,
    LA_LIGA: 140,
    BUNDESLIGA: 78,
    SERIE_A: 135,
    LIGUE_1: 61,
    TFF_1_LIG: 204
}
