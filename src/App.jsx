import { useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import SearchArea from './components/SearchArea'
import TeamInfo from './components/TeamInfo'
import MatchList from './components/MatchList'
import Footer from './components/Footer'
import LeagueTabs from './components/LeagueTabs'

function App() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [team, setTeam] = useState(null)
    const [matches, setMatches] = useState([])

    // New state for leagues
    const [activeLeague, setActiveLeague] = useState(null)
    const [leagueMatches, setLeagueMatches] = useState([])

    // League definitions with current active rounds (Verified for Jan 11, 2026)
    const leagues = [
        { id: '4339', name: 'Süper Lig', round: '17' }, // Winter Break (Next: 18 on Jan 17)
        { id: '4328', name: 'Premier League', round: '21' }, // Latest played (Jan 4-6)
        { id: '4335', name: 'La Liga', round: '18' }, // Latest played (Jan 2-4)
        { id: '4331', name: 'Bundesliga', round: '16' }, // Active This Week (Jan 9-11)
        { id: '4332', name: 'Serie A', round: '20' } // Active This Week (Jan 10-11)
    ]

    const searchTeam = async (term) => {
        setLoading(true)
        setError(null)
        setTeam(null)
        setMatches([])
        setActiveLeague(null) // Clear active league when searching
        setLeagueMatches([])

        try {
            // 1. Search for the team
            const teamResponse = await axios.get(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${term}`)

            if (!teamResponse.data.teams) {
                throw new Error('Takım bulunamadı. Lütfen başka bir isim deneyin.')
            }

            const foundTeam = teamResponse.data.teams[0]
            setTeam(foundTeam)

            // 2. Get last 5 matches
            const matchesResponse = await axios.get(`https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${foundTeam.idTeam}`)

            if (matchesResponse.data.results) {
                setMatches(matchesResponse.data.results)
            }

        } catch (err) {
            console.error(err)
            setError(err.message || 'Bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    const handleLeagueSelect = async (leagueId) => {
        if (leagueId === activeLeague) return // Don't reload if already active

        setLoading(true)
        setError(null)
        setTeam(null) // Clear team result when selecting league
        setMatches([])
        setActiveLeague(leagueId)

        const selectedLeague = leagues.find(l => l.id === leagueId)

        try {
            // Use eventsround.php with specific round to get CORRECT data for each league
            // eventspastleague.php is restricted on free tier and returns duplicate mock data
            // We use s=2025-2026 as the current season.
            const response = await axios.get(`https://www.thesportsdb.com/api/v1/json/3/eventsround.php?id=${leagueId}&r=${selectedLeague.round}&s=2025-2026`)

            if (response.data.events) {
                setLeagueMatches(response.data.events)
            } else {
                setLeagueMatches([])
                setError('Bu lig için maç verisi bulunamadı.')
            }
        } catch (err) {
            console.error(err)
            setError('Maç verileri çekilirken bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
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

                {loading && !team && !leagueMatches.length && (
                    <div style={{ textAlign: 'center', margin: '2rem' }}>
                        <div className="loader">Yükleniyor...</div>
                    </div>
                )}

                {team && (
                    <>
                        <TeamInfo team={team} />
                        <MatchList matches={matches} teamId={team.idTeam} />
                    </>
                )}

                {activeLeague && leagueMatches.length > 0 && !team && (
                    <MatchList
                        matches={leagueMatches}
                        title="Bu Haftanın Sonuçları"
                    />
                )}

                <Footer />
            </div>
        </>
    )
}

export default App
