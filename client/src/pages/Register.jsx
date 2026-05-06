import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      return setError("All fields are required");
    }

    if (data.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (data.password !== data.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setIsLoading(true);
      await register(data.name, data.email, data.password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md border border-neutral-800 rounded-xl p-6 space-y-6"
        >
          <div>
            <h2 className="text-2xl font-semibold">Admin Register</h2>
            <p className="text-sm text-neutral-400 mt-1">
              Create a new admin account
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={data.name}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 bg-black border border-neutral-800 rounded-lg text-sm placeholder-neutral-500 focus:outline-none focus:border-white transition"
              />
            </div>

            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={data.email}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 bg-black border border-neutral-800 rounded-lg text-sm placeholder-neutral-500 focus:outline-none focus:border-white transition"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 bg-black border border-neutral-800 rounded-lg text-sm placeholder-neutral-500 focus:outline-none focus:border-white transition"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 bg-black border border-neutral-800 rounded-lg text-sm placeholder-neutral-500 focus:outline-none focus:border-white transition"
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 border border-red-500/30 bg-red-500/10 p-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-white text-black rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-neutral-200 transition disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : (
                <>
                  <UserPlus size={16} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-neutral-400">
              Already have an account?{" "}
              <Link to="/login" className="text-white hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Register;