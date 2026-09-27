import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { searchUsersPaginated } from "../services/githubApi";

function UsersPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function performSearch(searchQuery, pageNum) {
    setLoading(true);
    try {
      const data = await searchUsersPaginated(searchQuery, pageNum);
      setUsers(data.items);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setPage(1);
    setHasSearched(true);
    performSearch(query, 1);
  }

  function goToPage(newPage) {
    setPage(newPage);
    performSearch(query, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const totalPages = Math.min(Math.ceil(totalCount / 12), 84); // GitHub API max 1000 results (84 pages of 12)

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-white text-3xl font-bold mb-2">Explore Users</h1>
      <p className="text-text-muted mb-8">
        Search and discover GitHub users from around the world.
      </p>

      <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-8">
        <div className="flex-1 flex items-center bg-bg-card border border-border-subtle rounded-full px-5 py-2.5 gap-3">
          <FiSearch className="text-text-muted shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="flex-1 bg-transparent outline-none text-white placeholder-text-muted text-sm min-w-0"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-accent to-accent-light text-white text-sm font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity duration-200"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-text-muted text-center py-10">Loading...</p>}

      {!loading && hasSearched && users.length === 0 && (
        <p className="text-text-muted text-center py-10">No users found.</p>
      )}

      {!loading && users.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {users.map((user) => (
              <Link
                key={user.id}
                to={`/profile/${user.login}`}
                className="flex items-center gap-3 bg-bg-card-solid border border-border-subtle rounded-xl p-4 hover:border-accent/50 transition-colors duration-300"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-white text-sm font-medium">{user.login}</span>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="flex items-center gap-1 text-text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <FiChevronLeft /> Previous
            </button>
            <span className="text-text-muted text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(page + 1)}
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

export default UsersPage;