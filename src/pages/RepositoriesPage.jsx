import { useState, useEffect } from "react";
import { FiStar, FiGitBranch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { searchRepos } from "../services/githubApi";

const languages = ["", "JavaScript", "TypeScript", "Python", "Java", "HTML", "CSS", "Go", "Rust"];
const sortOptions = [
  { value: "stars", label: "Most Stars" },
  { value: "forks", label: "Most Forks" },
  { value: "updated", label: "Recently Updated" },
];

function RepositoriesPage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("stars");
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true);
      try {
        const data = await searchRepos({ query, language, sort, page });
        setRepos(data.items);
        setTotalCount(data.total_count);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [language, sort, page]); // NOTE: query yahan nahi hai, sirf button se trigger hoga

  function handleSearchSubmit(e) {
    e.preventDefault();
    setPage(1);
    // useEffect nahi chalega kyunki query dependency me nahi - manual trigger
    searchRepos({ query, language, sort, page: 1 }).then((data) => {
      setRepos(data.items);
      setTotalCount(data.total_count);
    });
  }

  const totalPages = Math.min(Math.ceil(totalCount / 12), 84);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-white text-3xl font-bold mb-2">Browse Repositories</h1>
      <p className="text-text-muted mb-8">
        Explore public repositories, filter by language and sort by popularity.
      </p>

      {/* Filters */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories (optional)..."
          className="flex-1 bg-bg-card border border-border-subtle rounded-full px-5 py-2.5 text-sm text-white placeholder-text-muted outline-none focus:border-accent"
        />

        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setPage(1);
          }}
          className="bg-bg-card-solid border border-border-subtle rounded-full px-4 py-2.5 text-sm text-white/60 outline-none"
        >
          <option value="">All Languages</option>
          {languages.slice(1).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="bg-bg-card-solid border border-border-subtle rounded-full px-4 py-2.5 text-sm text-white/60 outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-gradient-to-r from-accent to-accent-light text-white text-sm font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity duration-200"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-text-muted text-center py-10">Loading...</p>}

      {!loading && repos.length === 0 && (
        <p className="text-text-muted text-center py-10">No repositories found.</p>
      )}

      {!loading && repos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-card-solid border border-border-subtle rounded-xl p-5 hover:border-accent/50 transition-colors duration-300"
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

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="flex items-center gap-1 text-text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <FiChevronLeft /> Previous
            </button>
            <span className="text-text-muted text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className="flex items-center gap-1 text-text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next <FiChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RepositoriesPage;