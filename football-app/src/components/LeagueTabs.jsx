
export default function LeagueTabs({ activeLeagueId, onLeagueSelect, leagues }) {
    return (
        <div className="league-tabs">
            {leagues.map(league => (
                <button
                    key={league.id}
                    className={`league-tab ${activeLeagueId === league.id ? 'active' : ''}`}
                    onClick={() => onLeagueSelect(league.id)}
                >
                    {league.name}
                </button>
            ))}
        </div>
    )
}
