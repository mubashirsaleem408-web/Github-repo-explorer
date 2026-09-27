import { FiStar, FiGitBranch, FiCircle } from "react-icons/fi";

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
};

function RepoCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-bg-card-solid border border-border-subtle rounded-xl p-5 hover:border-accent/50 transition-colors duration-300"
    >
      <h3 className="text-accent font-semibold mb-1">{repo.name}</h3>

      {repo.description && (
        <p className="text-text-muted text-sm mb-3 line-clamp-2">
          {repo.description}
        </p>
      )}

      <div className="flex items-center gap-4 text-xs text-text-muted">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <FiCircle
              className="text-[10px]"
              style={{
                color: languageColors[repo.language] || "#8b8b8b",
                fill: languageColors[repo.language] || "#8b8b8b",
              }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <FiStar /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <FiGitBranch /> {repo.forks_count}
        </span>
      </div>
    </a>
  );
}

export default RepoCard;