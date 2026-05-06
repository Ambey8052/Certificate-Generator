import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      await login(data.email, data.password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
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
          className="w-full max-w-md"
        >
          <div className="border border-neutral-800 rounded-xl p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Admin Login</h2>
              <p className="text-sm text-neutral-400 mt-2">
                Enter your credentials to access the admin dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-black border border-neutral-800 rounded-lg text-sm 
                  placeholder-neutral-500 focus:outline-none focus:border-white transition"
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
                  className="w-full pl-9 pr-3 py-2.5 bg-black border border-neutral-800 rounded-lg text-sm 
                  placeholder-neutral-500 focus:outline-none focus:border-white transition"
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
                {isLoading ? "Logging in..." : (
                  <>
                    <LogIn size={16} />
                    Login
                  </>
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-sm text-neutral-400">
                Don't have an account?{" "}
                <Link to="/register" className="text-white hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Login;