import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CertificateForm from "../components/CertificateForm";
import CertificatePreview from "../components/CertificatePreview";
import { motion } from "framer-motion";
import { Download, Loader2, LogIn } from "lucide-react";
import { certificateAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Generate = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({});
  const [certificateId, setCertificateId] = useState(null);
  const [qrValue, setQrValue] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);
  const certRef = useRef();

  const handleFormSubmit = async (data) => {
    try {
      setError(null);
      setIsCreating(true);

      if (token) {
        // If logged in, save to backend
        const response = await certificateAPI.create(data, token);
        
        if (response.certificate) {
          setCertificateId(response.certificate.certificateId);
          setQrValue(response.certificate.qrValue);
          setFormData(data);
        } else {
          throw new Error(response.message || "Failed to create certificate");
        }
      } else {
        // If not logged in, just generate locally
        setCertificateId(generateId());
        setQrValue(`${window.location.origin}/verify/${certificateId}`);
        setFormData(data);
      }
    } catch (err) {
      setError(err.message || "Failed to create certificate");
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const generateId = () => {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CERT-${year}-${random}`;
  };

  const downloadPDF = async () => {
    try {
      setIsDownloading(true);
      setError(null);

      if (certificateId && token) {
        // Download from backend
        const blob = await certificateAPI.downloadPDF(certificateId);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `certificate-${formData.name || "certificate"}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Client-side download for non-logged-in users
        const html2canvas = (await import("html2canvas")).default;
        const jsPDF = (await import("jspdf")).jsPDF;

        const canvas = await html2canvas(certRef.current, {
          backgroundColor: "#000000",
          scale: 2,
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`certificate-${formData.name || "certificate"}.pdf`);
      }
    } catch (err) {
      setError(err.message || "Failed to download certificate");
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const isComplete = formData.name && formData.role && formData.event && formData.date;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold mb-3">
              Certificate Generator
            </h1>
            <p className="text-neutral-400">
              {token ? "Create and download professional certificates" : "Preview certificates (login to save and download)"}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 text-sm border border-red-500/30 bg-red-500/10 text-red-400 p-4 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <CertificateForm
                setData={setFormData}
                onSubmit={handleFormSubmit}
                isLoading={isCreating}
              />
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div ref={certRef} className="min-h-full">
                <CertificatePreview
                  data={formData}
                  certificateId={certificateId}
                  qrValue={qrValue}
                />
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4">
            {isComplete && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={downloadPDF}
                disabled={isDownloading || !certificateId}
                className="px-8 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition bg-white text-black hover:bg-neutral-200 disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Download PDF
                  </>
                )}
              </motion.button>
            )}

            {!token && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-4 border border-neutral-800 rounded-lg max-w-sm"
              >
                <p className="text-sm text-neutral-400 mb-3">
                  Login to save certificates and access the admin dashboard
                </p>
                <Link to="/login">
                  <button className="px-4 py-2 border border-white rounded-lg text-sm hover:bg-white hover:text-black transition flex items-center justify-center gap-2 w-full">
                    <LogIn size={16} />
                    Login Now
                  </button>
                </Link>
              </motion.div>
            )}

            {!isComplete && (
              <p className="text-xs text-neutral-500">
                Complete all required fields to generate certificate
              </p>
            )}
          </div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Generate;