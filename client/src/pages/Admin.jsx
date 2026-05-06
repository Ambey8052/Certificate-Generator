import { motion } from "framer-motion";
import { Trash2, Search, Eye, Download, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { certificateAPI } from "../services/api";
import Loader from "../components/Loader";

const Admin = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, [token]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await certificateAPI.getAll(token, search);
      setCertificates(data.certificates || []);
    } catch (err) {
      setError(err.message || "Failed to fetch certificates");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) {
        fetchCertificates();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) {
      return;
    }

    try {
      setDeleting(id);
      const data = await certificateAPI.delete(id, token);
      if (data.message) {
        setCertificates(certificates.filter((cert) => cert._id !== id));
      }
    } catch (err) {
      alert(err.message || "Failed to delete certificate");
    } finally {
      setDeleting(null);
    }
  };

  const handleView = (certificateId) => {
    navigate(`/verify/${certificateId}`);
  };

  const handleDownload = async (certificate) => {
    try {
      const blob = await certificateAPI.downloadPDF(certificate.certificateId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate-${certificate.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download certificate");
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const thisMonth = certificates.filter((cert) => {
    const certDate = new Date(cert.date);
    const now = new Date();
    return (
      certDate.getMonth() === now.getMonth() &&
      certDate.getFullYear() === now.getFullYear()
    );
  }).length;

  if (loading && certificates.length === 0) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-neutral-400 mt-1">
                Welcome back, <span className="font-medium">{user?.name}</span>
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-neutral-800 rounded-lg text-sm hover:border-white transition flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-neutral-800 rounded-lg p-6"
            >
              <p className="text-xs text-neutral-500">Total Certificates</p>
              <p className="text-3xl font-semibold mt-2">{certificates.length}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border border-neutral-800 rounded-lg p-6"
            >
              <p className="text-xs text-neutral-500">This Month</p>
              <p className="text-3xl font-semibold mt-2">{thisMonth}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-neutral-800 rounded-lg p-6"
            >
              <p className="text-xs text-neutral-500">Verified</p>
              <p className="text-3xl font-semibold mt-2">{certificates.length}</p>
            </motion.div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                placeholder="Search by ID or name"
                value={search}
                onChange={handleSearch}
                className="w-full pl-9 pr-3 py-2.5 bg-black border border-neutral-800 rounded-lg text-sm 
                placeholder-neutral-500 focus:outline-none focus:border-white transition"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 text-sm text-red-400 border border-red-500/30 bg-red-500/10 p-4 rounded">
              {error}
            </div>
          )}

          {/* Certificates Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-neutral-800 rounded-lg overflow-hidden"
          >
            <div className="grid grid-cols-6 text-xs text-neutral-500 px-4 py-3 border-b border-neutral-800 bg-black/50">
              <span>Name</span>
              <span>Role</span>
              <span>Event</span>
              <span>Date</span>
              <span>Certificate ID</span>
              <span className="text-right">Actions</span>
            </div>

            {certificates.length > 0 ? (
              certificates.map((cert, i) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-6 items-center px-4 py-3 border-b border-neutral-800 hover:bg-neutral-900/50 transition"
                >
                  <span className="text-sm font-medium">{cert.name}</span>
                  <span className="text-sm text-neutral-400">{cert.role}</span>
                  <span className="text-sm text-neutral-400">{cert.event}</span>
                  <span className="text-sm text-neutral-400">
                    {new Date(cert.date).toLocaleDateString()}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    {cert.certificateId}
                  </span>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleView(cert.certificateId)}
                      title="View"
                      className="p-1.5 hover:bg-neutral-800 rounded transition"
                    >
                      <Eye size={14} />
                    </button>

                    <button
                      onClick={() => handleDownload(cert)}
                      title="Download"
                      className="p-1.5 hover:bg-neutral-800 rounded transition"
                    >
                      <Download size={14} />
                    </button>

                    <button
                      onClick={() => handleDelete(cert._id)}
                      disabled={deleting === cert._id}
                      title="Delete"
                      className="p-1.5 hover:bg-red-500/20 rounded transition disabled:opacity-50"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-neutral-400">
                {search ? "No certificates found" : "No certificates yet"}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Admin;