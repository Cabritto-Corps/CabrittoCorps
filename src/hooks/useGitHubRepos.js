import { useState, useEffect } from 'react'

const ORG = 'Cabritto-Corps'
const API = `https://api.github.com/orgs/${ORG}/repos?per_page=100&type=public`

function toCardData(repo) {
  const tags = [
    ...(repo.topics ?? []),
    ...(repo.language ? [repo.language] : []),
  ].slice(0, 4)

  const stars = repo.stargazers_count
  const forks = repo.forks_count
  const stat  = stars > 0
    ? `★ ${stars} star${stars > 1 ? 's' : ''}`
    : forks > 0
      ? `⚡ ${forks} fork${forks > 1 ? 's' : ''}`
      : 'público'

  const updatedAt = new Date(repo.updated_at)
  const diffDays  = Math.floor((Date.now() - updatedAt) / 86_400_000)
  const meta      = diffDays === 0
    ? 'atualizado hoje'
    : diffDays < 30
      ? `há ${diffDays}d`
      : updatedAt.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })

  return {
    name:    repo.name,
    desc:    repo.description || 'Repositório da Cabritto Corps.',
    tags,
    stat,
    meta,
    url:     repo.html_url,
    stars:   repo.stargazers_count,
    forks:   repo.forks_count,
  }
}

export default function useGitHubRepos() {
  const [repos,   setRepos]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(API, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`)
        return res.json()
      })
      .then(data => {
        const sorted = data
          .filter(r => !r.fork)
          .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
          .map(toCardData)
        setRepos(sorted)
      })
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return { repos, loading, error }
}
