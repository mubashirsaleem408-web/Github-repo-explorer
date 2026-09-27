import { Link, NavLink } from "react-router-dom";
import { FiGithub, FiSun, FiMoon } from "react-icons/fi";
import { useState } from "react";

function Navbar() {

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Users", path: "/users" },
    { name: "Repositories", path: "/repositories" },
    { name: "Topics", path: "/topics" },
  ];

  return (
    <nav className="w-full bg-bg-dark border-b border-border-subtle px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FiGithub className="text-white text-2xl" />
          <span className="text-white font-semibold text-lg">
            GitHub Explorer
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-text-muted hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <a
            href="https://personal-portfolio-44.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-border-subtle text-text-muted hover:text-white hover:border-accent transition-colors duration-200"
          >
            About The Developer
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;