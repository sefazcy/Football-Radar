import axios from 'axios'

const API_KEY = 'dccd3fde9621a774eec4556e2e898f3f'
const BASE_URL = 'https://v3.football.api-sports.io'

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': API_KEY,
        'x-apisports-key': API_KEY
    }
})

export const api = {
    // Search team by name
    searchTeam: (name) => apiClient.get(`/teams`, { params: { search: name } }),

    // Get last matches for a team
    // Free Tier doesn't support 'last' parameter. We must fetch season fixtures and filter manually.
    getLastMatches: (teamId) => apiClient.get(`/fixtures`, {
        params: {
            team: teamId,
            season: 2025
        }
    }),

    // Get live matches specifically
    getLiveMatches: () => apiClient.get(`/fixtures`, { params: { live: 'all' } }),

    // Get league fixtures
    // We try to get 'next' matches to show upcoming schedule
    getLeagueUpcoming: (leagueId) => apiClient.get(`/fixtures`, {
        params: {
            league: leagueId,
            season: 2025,
            next: 10
        }
    }),

    // Get league Last results (fallback if no upcoming)
    getLeaguePast: (leagueId) => apiClient.get(`/fixtures`, {
        params: {
            league: leagueId,
            season: 2025,
            last: 10
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
