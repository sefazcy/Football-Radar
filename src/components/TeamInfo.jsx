export default function TeamInfo({ team }) {
    if (!team) return null

    return (
        <div className="team-info">
            <img src={team.strTeamBadge} alt={team.strTeam} className="team-logo" />
            <div className="team-details">
                <h2>{team.strTeam}</h2>
                <div className="team-meta">
                    <span>{team.strLeague}</span> • <span>Established {team.intFormedYear}</span>
                </div>
                <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem', color: '#8b949e' }}>
                    {team.strDescriptionEN ? team.strDescriptionEN.substring(0, 200) + '...' : ''}
                </p>
            </div>
        </div>
    )
}
