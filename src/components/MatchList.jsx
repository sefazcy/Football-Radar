import React from 'react'

export default function MatchList({ matches, teamId, title }) {
    if (!matches || matches.length === 0) return null

    const getResultClass = (match) => {
        // match.teams.home.id, match.goals.home, etc.
        if (!teamId) return ''

        const isHome = match.teams.home.id === teamId
        const ourScore = isHome ? match.goals.home : match.goals.away
        const theirScore = isHome ? match.goals.away : match.goals.home

        if (ourScore === null) return '' // Match hasn't started or no score
        if (ourScore > theirScore) return 'win'
        if (ourScore < theirScore) return 'loss'
        return 'draw'
    }

    const formatTime = (dateString, statusShort) => {
        if (['1H', '2H', 'HT', 'ET', 'P', 'LIVE'].includes(statusShort)) {
            return statusShort // Show match time/status directly if live
        }
        const date = new Date(dateString)
        return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
    }

    return (
        <div className="match-list">
            <h3 style={{ borderBottom: '1px solid #30363d', paddingBottom: '0.5rem' }}>{title || 'Matches'}</h3>
            {matches.map((match) => {
                const resultClass = getResultClass(match)
                const isLive = ['1H', '2H', 'HT', 'ET', 'P', 'LIVE'].includes(match.fixture.status.short)

                return (
                    <div key={match.fixture.id} className={`match-card ${resultClass}`} style={isLive ? { borderLeft: '4px solid #da3633' } : {}}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px', marginRight: '1rem', color: isLive ? '#da3633' : '#8b949e' }}>
                            <span style={{ fontWeight: 'bold' }}>{formatTime(match.fixture.date, match.fixture.status.short)}</span>
                            {!isLive && <span style={{ fontSize: '0.75rem' }}>{formatDate(match.fixture.date)}</span>}
                        </div>

                        <div className="teams">
                            <div style={{ flex: 1, textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                                <span style={{ fontWeight: isLive ? 'bold' : 'normal' }}>{match.teams.home.name}</span>
                                <img src={match.teams.home.logo} alt="" style={{ width: '25px', height: '25px', objectFit: 'contain' }} />
                            </div>

                            <div className={`score-badge ${isLive ? 'live-score' : ''}`} style={isLive ? { background: '#da3633', color: 'white' } : {}}>
                                {match.goals.home ?? '-'} - {match.goals.away ?? '-'}
                            </div>

                            <div style={{ flex: 1, textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '10px' }}>
                                <img src={match.teams.away.logo} alt="" style={{ width: '25px', height: '25px', objectFit: 'contain' }} />
                                <span style={{ fontWeight: isLive ? 'bold' : 'normal' }}>{match.teams.away.name}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
