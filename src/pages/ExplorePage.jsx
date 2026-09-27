import { useState, useEffect } from "react";
import { FiStar, FiGitBranch, FiTrendingUp } from "react-icons/fi";
import { getTrendingRepos } from "../services/githubApi";

function ExplorePage() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrending() {
      setLoading(true);
      setError(null);
      try {
        const data = await getTrendingRepos(30);
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <FiTrendingUp className="text-accent text-2xl" />
        <h1 className="text-white text-3xl font-bold">Trending</h1>
      </div>
      <p className="text-text-muted mb-8">
        Repositories gaining traction in the last 30 days.
      </p>

      {loading && <p className="text-text-muted text-center py-10">Loading...</p>}
      {error && <p className="text-white text-center py-10">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {repos.map((repo, index) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ animationDelay: `${index * 0.05}s` }}
              className="animate-fade-in-up bg-bg-card-solid border border-border-subtle rounded-xl p-5 hover:border-accent/50 transition-colors duration-300"
            >
              <h3 className="text-accent font-semibold mb-1">{repo.full_name}</h3>
              {repo.description && (
                <p className="text-text-muted text-sm mb-3 line-clamp-2">
                  {repo.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-text-muted">
                {repo.language && <span>{repo.language}</span>}
                <span className="flex items-center gap-1">
                  <FiStar /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FiGitBranch /> {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExplorePage;