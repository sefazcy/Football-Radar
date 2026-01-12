import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchArea from './components/SearchArea'
import TeamInfo from './components/TeamInfo'
import MatchList from './components/MatchList'
import Footer from './components/Footer'
import LeagueTabs from './components/LeagueTabs'
import { api, LEAGUE_IDS } from './api'

function App() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [team, setTeam] = useState(null)
    const [matches, setMatches] = useState([]) // Team matches

    // League View State
    const [activeLeague, setActiveLeague] = useState(LEAGUE_IDS.SUPER_LIG) // Default to Süper Lig
    const [leagueMatches, setLeagueMatches] = useState([])

    // League definitions for Tabs
    const leagues = [
        { id: LEAGUE_IDS.SUPER_LIG, name: 'Süper Lig' },
        { id: LEAGUE_IDS.PREMIER_LEAGUE, name: 'Premier League' },
        { id: LEAGUE_IDS.LA_LIGA, name: 'La Liga' },
        { id: LEAGUE_IDS.BUNDESLIGA, name: 'Bundesliga' },
        { id: LEAGUE_IDS.SERIE_A, name: 'Serie A' },
        //{ id: LEAGUE_IDS.TFF_1_LIG, name: 'TFF 1. Lig' }
    ]

    // Load initial league matches (Live/This Week) on mount
    useEffect(() => {
        handleLeagueSelect(activeLeague)
    }, [])

    const searchTeam = async (term) => {
        setLoading(true)
        setError(null)
        setTeam(null)
        setMatches([])
        setActiveLeague(null)
        setLeagueMatches([])

        try {
            // 1. Search Team
            const response = await api.searchTeam(term)
            const teamResults = response.data.response

            if (!teamResults || teamResults.length === 0) {
                throw new Error('Team not found. Please try another name.')
            }

            // Get first result (API returns { team: {...}, venue: {...} })
            const teamData = teamResults[0]
            setTeam(teamData) // Save the whole object to pass to TeamInfo

            // 2. Get Last Matches
            // Since we fetch the whole season (Free Tier limit), we need to sort and slice here.
            const fixturesResponse = await api.getLastMatches(teamData.team.id)
            const allSeasonMatches = fixturesResponse.data.response || []

            // Sort by date descending (Newest first)
            const sortedMatches = allSeasonMatches.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))

            // Filter only played/live matches and take top 5
            const validStatuses = ['FT', 'AET', 'PEN', 'LIVE', '1H', '2H', 'HT', 'ET', 'P']
            const lastMatches = sortedMatches.filter(m => validStatuses.includes(m.fixture.status.short)).slice(0, 5)

            setMatches(lastMatches)

        } catch (err) {
            console.error(err)
            setError(err.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleLeagueSelect = async (leagueId) => {
        setActiveLeague(leagueId)
        setTeam(null)
        setMatches([])
        setLoading(true)
        setError(null)

        try {
            // Calculate date range for "This Week" (e.g. Last 3 days to Next 4 days)
            const today = new Date()
            const pastDate = new Date(today)
            pastDate.setDate(today.getDate() - 3)
            const futureDate = new Date(today)
            futureDate.setDate(today.getDate() + 7) // Show upcoming week matches too

            const from = pastDate.toISOString().split('T')[0]
            const to = futureDate.toISOString().split('T')[0]

            const response = await api.getLeagueMatches(leagueId, from, to)

            // Sort matches: Live first, then by date
            const events = response.data.response || []
            events.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date))

            if (events.length === 0) {
                setError('No matches found for this week (Winter Break likely).')
            }

            setLeagueMatches(events)

        } catch (err) {
            console.error(err)
            setError('Could not load league matches.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <Header />
            <SearchArea onSearch={searchTeam} loading={loading} />

            <LeagueTabs
                activeLeagueId={activeLeague}
                onLeagueSelect={handleLeagueSelect}
                leagues={leagues}
            />

            {error && (
                <div style={{ color: '#da3633', textAlign: 'center', marginBottom: '1rem', background: 'rgba(218, 54, 51, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                    ⚠️ {error}
                </div>
            )}

            {loading && (
                <div style={{ textAlign: 'center', margin: '2rem' }}>
                    <div className="loader">Loading...</div>
                </div>
            )}

            {/* TEAM VIEW */}
            {team && (
                <>
                    <TeamInfo team={team} />
                    {/* Group matches by League */}
                    {Object.entries(matches.reduce((acc, match) => {
                        const leagueName = match.league.name
                        if (!acc[leagueName]) acc[leagueName] = []
                        acc[leagueName].push(match)
                        return acc
                    }, {})).map(([leagueName, leagueMatches]) => (
                        <MatchList
                            key={leagueName}
                            matches={leagueMatches}
                            teamId={team.team.id}
                            title={`${leagueName} Results`}
                        />
                    ))}
                </>
            )}

            {/* LEAGUE VIEW */}
            {activeLeague && leagueMatches.length > 0 && !team && (
                <MatchList
                    matches={leagueMatches}
                    title="This Week's Fixtures"
                />
            )}

            <Footer />
        </div>
    )
}

export default App
