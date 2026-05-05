import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { RiSunLine, RiMoonLine, RiMusicLine } from "react-icons/ri";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/app", label: "Mulai" },
  { to: "/about", label: "Tentang" },
];

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-100 dark:border-zinc-800/60 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-[17px] tracking-tight text-zinc-900 dark:text-white group"
        >
          <span className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 transition-transform group-hover:scale-105">
            <RiMusicLine size={15} />
          </span>
          MoodTune
        </Link>

        {/* Links */}
        <div className="flex items-center gap-0.5">
          {links.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-200
                  ${
                    isActive
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-lg bg-zinc-100 dark:bg-zinc-800/70" />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
          aria-label="Toggle tema"
        >
          {dark ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
        </button>
      </div>
    </nav>
  );
}
