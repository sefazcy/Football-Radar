import React from 'react'

export default function LiveMatches() {
    // Mock data to simulate live matches (Mackolik style)
    const liveMatches = [
        { id: 1, home: 'Fenerbahçe', away: 'Galatasaray', hScore: 2, aScore: 1, time: '78\'', league: 'Turkish Super Lig', live: true },
        { id: 2, home: 'Beşiktaş', away: 'Trabzonspor', hScore: 0, aScore: 0, time: '12\'', league: 'Turkish Super Lig', live: true },
        { id: 3, home: 'Kocaelispor', away: 'Sakaryaspor', hScore: 1, aScore: 0, time: '45+2\'', league: 'TFF 1. Lig', live: true },
        { id: 4, home: 'Manchester City', away: 'Arsenal', hScore: 3, aScore: 2, time: '88\'', league: 'Premier League', live: true },
    ]

    return (
        <div className="match-list live-section">
            <h3 style={{ borderBottom: '1px solid #da3633', paddingBottom: '0.5rem', color: '#da3633', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="pulsating-circle"></span>
                LIVE SCORES (DEMO)
            </h3>
            {liveMatches.map((match) => (
                <div key={match.id} className="match-card live-card" style={{ borderLeft: '4px solid #da3633' }}>
                    <div className="match-info-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px', marginRight: '1rem', color: '#da3633', fontWeight: 'bold' }}>
                        <span>{match.time}</span>
                    </div>
                    <div className="teams">
                        <span style={{ textAlign: 'right', flex: 1, fontWeight: 'bold' }}>{match.home}</span>
                        <div className="score-badge live-score" style={{ background: '#da3633', color: 'white' }}>
                            {match.hScore} - {match.aScore}
                        </div>
                        <span style={{ textAlign: 'left', flex: 1, fontWeight: 'bold' }}>{match.away}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#8b949e', marginLeft: 'auto' }}>
                        {match.league}
                    </div>
                </div>
            ))}
        </div>
    )
}
