import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiMapPin, FiLink, FiUsers, FiBook, FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { getUserProfile, getUserRepos } from "../services/githubApi";
import RepoCard from "../components/RepoCard";
import ProfileSkeleton from "../components/ProfileSkeleton";
import { delay } from "../utils/delay";

function ProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [userData, reposData] = await Promise.all([
          getUserProfile(username),
          getUserRepos(username),
          delay(500),
        ]);
        setUser(userData);
        setRepos(reposData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-white text-xl mb-4">{error}</p>
        <Link to="/" className="text-accent hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors duration-200 mb-6"
      >
        <FiArrowLeft /> Back to search
      </Link>

      {/* User Profile Card - same jaisa pehle tha */}
      <div className="bg-bg-card-solid border border-border-subtle rounded-2xl p-8 flex flex-col sm:flex-row gap-6 mb-10">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-28 h-28 rounded-full border border-border-subtle shrink-0"
        />
        <div className="flex-1">
          <h1 className="text-white text-2xl font-bold">{user.name || user.login}</h1>
          <p className="text-text-muted mb-3">@{user.login}</p>
          {user.bio && <p className="text-text-muted mb-4">{user.bio}</p>}
          <div className="flex flex-wrap gap-4 text-sm text-text-muted mb-4">
            {user.location && (
              <span className="flex items-center gap-1.5">
                <FiMapPin /> {user.location}
              </span>
            )}
            {user.blog && (
              <a
                href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-accent"
              >
                <FiLink /> {user.blog}
              </a>
            )}
          </div>
          <div className="flex gap-6 text-sm">
            <span className="flex items-center gap-1.5 text-white">
              <FiUsers className="text-text-muted" />
              <strong>{user.followers}</strong>
              <span className="text-text-muted">followers</span>
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <strong>{user.following}</strong>
              <span className="text-text-muted">following</span>
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <FiBook className="text-text-muted" />
              <strong>{user.public_repos}</strong>
              <span className="text-text-muted">repos</span>
            </span>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-accent text-sm hover:underline"
          >
            View on GitHub <FiExternalLink />
          </a>
        </div>
      </div>

      {/* Repositories Section */}
      <h2 className="text-white text-xl font-semibold mb-4">Repositories</h2>
      {repos.length === 0 ? (
        <p className="text-text-muted">No public repositories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {repos.map((repo, index) => (
            <div
              key={repo.id}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="animate-fade-in-up"
            >
              <RepoCard repo={repo} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;