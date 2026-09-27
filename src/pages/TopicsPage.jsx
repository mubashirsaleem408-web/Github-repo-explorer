import { useState } from "react";
import { FiTag, FiStar, FiGitBranch, FiArrowLeft } from "react-icons/fi";
import { getReposByTopic } from "../services/githubApi";

const topics = [
  { name: "react", label: "React" },
  { name: "machine-learning", label: "Machine Learning" },
  { name: "web-development", label: "Web Development" },
  { name: "javascript", label: "JavaScript" },
  { name: "python", label: "Python" },
  { name: "api", label: "API" },
  { name: "docker", label: "Docker" },
  { name: "nodejs", label: "Node.js" },
];

function TopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleTopicClick(topic) {
    setSelectedTopic(topic);
    setLoading(true);
    try {
      const data = await getReposByTopic(topic.name);
      setRepos(data.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function goBack() {
    setSelectedTopic(null);
    setRepos([]);
  }

  // Agar koi topic select hua hai, uski repos dikhao
  if (selectedTopic) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-text-muted hover:text-white transition-colors duration-200 mb-6"
        >
          <FiArrowLeft /> Back to topics
        </button>

        <h1 className="text-white text-3xl font-bold mb-8">
          #{selectedTopic.label}
        </h1>

        {loading && <p className="text-text-muted text-center py-10">Loading...</p>}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

  // Warna, topics ki list dikhao
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-white text-3xl font-bold mb-2">Explore Topics</h1>
      <p className="text-text-muted mb-8">
        Find projects based on technologies and interests.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {topics.map((topic) => (
          <button
            key={topic.name}
            onClick={() => handleTopicClick(topic)}
            className="flex flex-col items-center gap-2 bg-bg-card-solid border border-border-subtle rounded-xl p-6 hover:border-accent/50 transition-colors duration-300"
          >
            <FiTag className="text-accent text-xl" />
            <span className="text-white text-sm font-medium">{topic.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopicsPage;