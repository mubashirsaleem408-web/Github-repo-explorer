import { Link, NavLink, useLocation } from "react-router-dom";
import { FiGithub, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Users", path: "/users" },
    { name: "Repositories", path: "/repositories" },
    { name: "Topics", path: "/topics" },
  ];

  return (
    <>
      <nav className="w-full bg-bg-dark border-b border-border-subtle relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FiGithub className="text-white text-2xl" />
            <span className="text-white font-semibold text-lg">
              GitHub Explorer
            </span>
          </Link>

          {/* Desktop Nav Links */}
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
          <div className="flex items-center gap-3">
            <a
              href="https://personal-portfolio-44.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex text-xs font-medium px-3 py-1.5 rounded-full border border-border-subtle text-text-muted hover:text-white hover:border-accent transition-colors duration-200"
            >
              About The Developer
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-border-subtle text-text-muted hover:text-white hover:border-accent transition-colors duration-200"
            >
              {isOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 z-50 animate-fade-in-up border-t border-border-subtle bg-bg-dark shadow-2xl px-6 py-4 flex flex-col gap-1">
            {/* Nav links */}
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-border-subtle text-white"
                      : "text-text-muted hover:text-white hover:bg-border-subtle"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Divider */}
            <div className="my-3 border-t border-border-subtle" />

            {/* About The Developer — centered button */}
            <a
              href="https://personal-portfolio-44.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="self-center text-xs font-medium px-5 py-2 rounded-full border border-border-subtle text-text-muted hover:text-white hover:border-accent transition-colors duration-200"
            >
              About The Developer
            </a>
          </div>
        )}
      </nav>

      {/* Full-screen backdrop — blocks page content, click to close */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-bg-dark/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Navbar;