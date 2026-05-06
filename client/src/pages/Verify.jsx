import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Award, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { certificateAPI } from "../services/api";
import Loader from "../components/Loader";

const Verify = () => {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await certificateAPI.verify(certificateId);

        if (data.valid) {
          setCertificate(data.certificate);
          setIsValid(true);
        } else {
          setError(data.message || "Certificate not found");
          setIsValid(false);
        }
      } catch (err) {
        setError(err.message || "Failed to verify certificate");
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyCertificate();
  }, [certificateId]);

  if (loading) {
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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              Certificate Verification
            </h1>
            <p className="text-neutral-400">
              Verify the authenticity of this certificate
            </p>
          </div>

          {error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-red-500/30 bg-red-500/10 rounded-lg p-8 text-center"
            >
              <AlertCircle size={32} className="mx-auto mb-3 text-red-500" />
              <h2 className="text-lg font-medium mb-2">Invalid Certificate</h2>
              <p className="text-neutral-400 text-sm">{error}</p>
            </motion.div>
          ) : isValid && certificate ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Success Badge */}
              <div className="flex items-center justify-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-lg w-fit mx-auto">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Certificate Valid</span>
              </div>

              {/* Certificate Preview */}
              <div className="bg-black border border-neutral-800 rounded-xl p-10 space-y-6">
                <div className="text-center space-y-3">
                  <div className="flex justify-center">
                    <Award size={32} className="text-white" />
                  </div>

                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Certificate of Completion
                  </p>

                  <h1 className="text-3xl font-semibold">
                    {certificate.name}
                  </h1>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-neutral-400 text-sm">
                    has successfully completed
                  </p>

                  <p className="text-lg font-medium">
                    {certificate.role}
                  </p>

                  <p className="text-neutral-500 text-sm">
                    in
                  </p>

                  <p className="text-base">
                    {certificate.event}
                  </p>

                  {certificate.duration && (
                    <p className="text-sm text-neutral-400">
                      Duration: {certificate.duration}
                    </p>
                  )}
                </div>

                <div className="border-t border-neutral-800 pt-6 space-y-4">
                  <div className="text-center">
                    <p className="text-xs text-neutral-500 mb-3">
                      Certificate ID: <span className="text-white font-mono">{certificate.certificateId}</span>
                    </p>
                    <div className="flex justify-center">
                      <QRCodeSVG
                        value={certificate.qrValue}
                        size={150}
                        bgColor="#000000"
                        fgColor="#ffffff"
                        level="H"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-xs text-neutral-400">
                    <div>
                      <p className="text-neutral-500 text-xs">Issued By</p>
                      <p className="font-medium text-white">{certificate.issuedBy?.name}</p>
                      <p>{certificate.issuedBy?.email}</p>
                    </div>

                    <div>
                      <p className="text-neutral-500 text-xs">Issued On</p>
                      <p className="font-medium text-white">
                        {new Date(certificate.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Verify;
