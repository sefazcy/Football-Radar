import { useState } from 'react'

export default function SearchArea({ onSearch, loading }) {
    const [term, setTerm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (term.trim()) {
            onSearch(term)
        }
    }

    return (
        <form className="search-area" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter team name (e.g. Arsenal)..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
        </form>
    )
}
