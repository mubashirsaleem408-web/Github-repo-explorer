import React from 'react'
import { FiUser, FiBookOpen, FiTrendingUp, FiTag, FiArrowRight } from "react-icons/fi";

const features = [
  {
    icon: FiUser,
    title: "Explore Users",
    description: "Discover GitHub users, view their profiles, followers, and more.",
  },
  {
    icon: FiBookOpen,
    title: "Browse Repositories",
    description: "Explore public repositories, filter by language, topic and more.",
  },
  {
    icon: FiTrendingUp,
    title: "Trending Projects",
    description: "See what's popular in the GitHub community right now.",
  },
  {
    icon: FiTag,
    title: "Explore Topics",
    description: "Find projects based on technologies and interests.",
  },
];

function FeatureCards() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              style={{ animationDelay: `${index * 0.1}s` }}
              className=" animate-fade-in-up bg-bg-card-solid border border-border-subtle rounded-2xl p-6 hover:border-accent/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-border-subtle flex items-center justify-center mb-4">
                <Icon className="text-text-muted text-lg" />
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-muted text-sm mb-4">{feature.description}</p>
              <FiArrowRight className="text-text-muted" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FeatureCards
