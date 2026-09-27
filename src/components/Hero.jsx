import { FiGithub, FiSearch, FiArrowRight, FiZap } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../services/githubApi";

const popularSearches = ["facebook", "microsoft", "torvalds", "vercel", "google", "github"];

function Hero() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const searchWrapperRef = useRef(null); // NAYA

  // NAYA - click-outside detection
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target)
      ) {
        setResults([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const users = await searchUsers(query);
      if (users.length > 0) {
        setQuery("");
      }
      setResults(users);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  }

  function handleSelectUser(username) {
    setResults([]);
    setQuery("");
    navigate(`/profile/${username}`);
  }

  return (
    <section className="w-full flex flex-col items-center text-center px-6 pt-20 pb-16">
      <FiGithub className="text-white text-5xl mb-6" />

      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Explore. Connect.{" "}
        <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
          Build.
        </span>
      </h1>

      <p className="text-text-muted text-base md:text-lg max-w-2xl mb-10">
        Search for GitHub users and explore their repositories, find trending
        projects, and get inspired by the open source community.
      </p>

      {/* NAYA - ref lagaya is wrapper pe */}
      <div ref={searchWrapperRef} className="w-full max-w-2xl relative">
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center bg-bg-card border border-border-subtle rounded-full px-5 py-2 gap-3"
        >
          <FiSearch className="text-text-muted text-lg shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a username (e.g. facebook, microsoft, torvalds...)"
            className="flex-1 bg-transparent outline-none text-white placeholder-text-muted text-sm min-w-0"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="flex items-center gap-2 bg-gradient-to-r from-accent to-accent-light text-white text-sm font-medium px-5 py-2.5 rounded-full shrink-0 hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-60"
          >
            <FiArrowRight />
            <span>{isSearching ? "Searching..." : "Search"}</span>
          </button>
        </form>

        {results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-bg-card-solid border border-border-subtle rounded-2xl overflow-hidden z-20 text-left shadow-2xl">
            {results.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelectUser(user.login)}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-border-subtle transition-colors duration-200"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white text-sm">{user.login}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {results.length === 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <span className="flex items-center gap-1.5 text-text-muted text-sm">
            <FiZap className="text-accent" />
            Popular searches
          </span>
          {popularSearches.map((name) => (
            <button
              key={name}
              onClick={() => setQuery(name)}
              className="text-xs text-text-muted bg-bg-card border border-border-subtle px-3 py-1.5 rounded-full hover:text-white hover:border-accent transition-colors duration-200"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default Hero;