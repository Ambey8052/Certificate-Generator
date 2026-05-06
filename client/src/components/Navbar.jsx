import { Link, useLocation } from "react-router-dom";
import { Award, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const publicNavItems = [
    { name: "Home", path: "/" },
    { name: "Generate", path: "/generate" },
  ];

  const authNavItems = [
    { name: "Generate", path: "/generate" },
    { name: "Admin", path: "/admin" },
  ];

  const navItems = user ? authNavItems : publicNavItems;

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-sm bg-black/80 border-b border-neutral-800 px-6 py-4 flex justify-between items-center"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <Award size={20} className="text-white" />
        <span className="text-sm font-semibold tracking-wide hidden sm:inline">
          Amaanitvam Foundation
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={i}
              to={item.path}
              className={`relative text-sm transition ${
                isActive ? "text-white font-medium" : "text-neutral-400 hover:text-white"
              }`}
            >
              {item.name}
              {isActive && (
                <motion.span
                  layoutId="navbar-underline"
                  className="absolute left-0 -bottom-1 h-0.5 bg-white w-full"
                />
              )}
            </Link>
          );
        })}

        {/* Auth Buttons */}
        {user ? (
          <div className="flex items-center gap-3 border-l border-neutral-800 pl-6">
            <span className="text-xs text-neutral-500 hidden sm:inline">
              {user.name}
            </span>
            <button
              onClick={logout}
              className="p-2 hover:bg-neutral-900 rounded-lg transition text-neutral-400 hover:text-white"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 border-l border-neutral-800 pl-6">
            <Link
              to="/login"
              className="text-sm px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-white transition hover:bg-white/5"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm px-3 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;