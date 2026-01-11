export default function MatchList({ matches, teamId, title }) {
    if (!matches || matches.length === 0) return null

    const getResultClass = (match) => {
        if (!teamId) return '' // Neutral if no specific team perspective

        // Logic to determine if it was a Win/Loss/Draw for the queried team
        // Note: The API returns home/away scores. We need to know if our team was home or away.
        // However, TheSportsDB 'eventslast' doesn't always clearly link 'our team' easily unless we check IDs.
        // Let's assume we can match by ID.

        // Actually, TheSportsDB events usually have idHomeTeam and idAwayTeam
        const isHome = match.idHomeTeam == teamId
        const usInfo = isHome ? { score: match.intHomeScore, opponent: match.strAwayTeam } : { score: match.intAwayScore, opponent: match.strHomeTeam }
        const themInfo = isHome ? { score: match.intAwayScore } : { score: match.intHomeScore }

        // Safely parse scores (they come as strings sometimes)
        const ourScore = parseInt(usInfo.score || 0)
        const theirScore = parseInt(themInfo.score || 0)

        if (ourScore > theirScore) return 'win'
        if (ourScore < theirScore) return 'loss'
        return 'draw'
    }

    return (
        <div className="match-list">
            <h3 style={{ borderBottom: '1px solid #30363d', paddingBottom: '0.5rem' }}>{title || 'Son 5 Maç'}</h3>
            {matches.map((match) => {
                // Mock weather based on match ID to be consistent
                const getWeather = (id) => {
                    const weathers = [
                        { icon: '☀️', label: 'Güneşli' },
                        { icon: '☁️', label: 'Parçalı Bulutlu' },
                        { icon: '🌧️', label: 'Yağmurlu' },
                        { icon: '⛈️', label: 'Sağanak' },
                        { icon: '🌥️', label: 'Kapalı' }
                    ]
                    const index = parseInt(id) % weathers.length
                    return weathers[index]
                }

                const weather = getWeather(match.idEvent)
                const time = match.strTime ? match.strTime.substring(0, 5) : '--:--'

                return (
                    <div key={match.idEvent} className={`match-card ${getResultClass(match)}`}>
                        <div className="match-info-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px', marginRight: '1rem', fontSize: '0.8rem', color: '#8b949e' }}>
                            <span title={weather.label} style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{weather.icon}</span>
                            <span>{time}</span>
                        </div>
                        <div className="teams">
                            <span style={{ textAlign: 'right', flex: 1 }}>{match.strHomeTeam}</span>
                            <span className="vs">vs</span>
                            <span style={{ textAlign: 'left', flex: 1 }}>{match.strAwayTeam}</span>
                        </div>
                        <div className="score-badge">
                            {match.intHomeScore} - {match.intAwayScore}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
