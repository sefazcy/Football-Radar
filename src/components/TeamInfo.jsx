export default function TeamInfo({ team }) {
    if (!team) return null

    // API-Football structure: team object contains { team: {...}, venue: {...} }
    // But our search returns an array where each item has { team, venue }.
    // We pass the inner 'team' and 'venue' objects or the whole wrapper.
    // Let's assume we pass the { team, venue } object wrapper as 'data'.

    const { team: teamData, venue } = team

    return (
        <div className="team-info">
            <img src={teamData.logo} alt={teamData.name} className="team-logo" />
            <div className="team-details">
                <h2>{teamData.name}</h2>
                <div className="team-meta">
                    <span>{teamData.country}</span> • <span>Est. {teamData.founded}</span>
                </div>
                <div style={{ maxWidth: '600px', margin: '1rem auto 0', fontSize: '0.9rem', color: '#8b949e' }}>
                    <p><strong>Stadium:</strong> {venue.name} ({venue.city})</p>
                    <p><strong>Capacity:</strong> {venue.capacity.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}
