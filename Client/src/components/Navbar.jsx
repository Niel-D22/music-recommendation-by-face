import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/app", label: "Mulai" },
  { to: "/about", label: "Tentang" },
];

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-lg tracking-tight text-brand-500"
        >
          MoodTune
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${
                  pathname === link.to
                    ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Toggle dark/light */}
        <button
          onClick={toggleTheme}
          className="btn-ghost w-9 h-9 justify-center p-0"
          aria-label="Toggle tema"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
