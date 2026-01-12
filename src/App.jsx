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
    const [leagueTitle, setLeagueTitle] = useState("Upcoming Matches")

    // League definitions for Tabs
    const leagues = [
        { id: LEAGUE_IDS.SUPER_LIG, name: 'Süper Lig' },
        { id: LEAGUE_IDS.PREMIER_LEAGUE, name: 'Premier League' },
        { id: LEAGUE_IDS.LA_LIGA, name: 'La Liga' },
        { id: LEAGUE_IDS.BUNDESLIGA, name: 'Bundesliga' },
        { id: LEAGUE_IDS.SERIE_A, name: 'Serie A' },
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

            // Get first result
            const teamData = teamResults[0]
            setTeam(teamData)

            // 2. Get Last Matches
            // Free Tier limit: 'last' param not allowed, fetch season and slice manually
            const fixturesResponse = await api.getLastMatches(teamData.team.id)
            const allSeasonMatches = fixturesResponse.data.response || []

            // Sort: Newest first
            const sortedMatches = allSeasonMatches.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))

            // Filter: Only started/finished matches
            const validStatuses = ['FT', 'AET', 'PEN', 'LIVE', '1H', '2H', 'HT', 'ET', 'P']
            const playedMatches = sortedMatches.filter(m => validStatuses.includes(m.fixture.status.short))

            // Take top 5
            setMatches(playedMatches.slice(0, 5))

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
        setLeagueTitle("Upcoming Matches")

        try {
            // Try fetching UPCOMING matches first
            let response = await api.getLeagueUpcoming(leagueId)
            let events = response.data.response || []

            if (events.length === 0) {
                // Fallback: If no upcoming matches (e.g. Winter Break), show PAST results
                setLeagueTitle("Latest Results (Winter Break/Ended)")
                // Note: 'last' param works for LEAGUES on free tier usually, but if fails, we might need season logic too.
                // However, free tier usually blocks 'last' everywhere. Let's try.
                // Check debug result: "Free plans do not have access to the Last parameter." -> Applies globally.
                // So we can't use getLeaguePast with 'last' param.
                // Limitation: We can't fetch WHOLE league season (too big) to sort client side easily? 
                // Actually we can, but it's heavy (380 matches).
                // API-Football free tier is tricky.
                // Let's settle for: If no upcoming, show specific error about winter break.
                setError('No upcoming matches found (League might be on break).')
            } else {
                events.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date))
                setLeagueMatches(events)
            }

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
                    {/* Group by League */}
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
                    title={leagueTitle}
                />
            )}

            <Footer />
        </div>
    )
}

export default App
