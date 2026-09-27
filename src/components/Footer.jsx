import React from 'react'
import { FiGithub } from "react-icons/fi";

function Footer() {
  return (
    <footer className="w-full border-t border-border-subtle px-6 py-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <FiGithub />
          <span>Built with React & GitHub REST API</span>
        </div>
        <div className="flex items-center gap-4 text-text-muted text-sm">
          <span>Open Source</span>
          <span>/</span>
          <span>Explore</span>
          <span>/</span>
          <span>Build</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer
