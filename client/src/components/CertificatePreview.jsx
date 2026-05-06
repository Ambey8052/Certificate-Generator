import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Award, CheckCircle } from "lucide-react";

const CertificatePreview = ({ data, certificateId, qrValue }) => {
  const isComplete =
    data.name && data.role && data.event && data.date;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4 max-w-2xl w-full"
    >
      {/* Certificate Preview */}
      <div className="bg-black text-white border border-neutral-800 rounded-xl p-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Award size={32} className="text-white" />
          </div>

          <p className="text-xs uppercase tracking-widest text-neutral-500">
            Certificate of Completion
          </p>

          <h1 className="text-4xl font-semibold">
            {data.name || "Your Name"}
          </h1>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <p className="text-neutral-400 text-sm">
            has successfully completed
          </p>

          <p className="text-xl font-medium">
            {data.role || "Role / Position"}
          </p>

          <p className="text-neutral-500 text-sm">
            in
          </p>

          <p className="text-lg font-semibold">
            {data.event || "Event / Program"}
          </p>

          {data.duration && (
            <p className="text-sm text-neutral-400">
              Duration: {data.duration}
            </p>
          )}

          <p className="text-neutral-300 text-lg font-light pt-2">
            at Amaanitvam Foundation
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end pt-6 border-t border-neutral-800 text-sm">
          <div>
            <p className="text-neutral-500 text-xs">Date</p>
            <p className="font-medium">
              {data.date
                ? new Date(data.date).toLocaleDateString()
                : "DD/MM/YYYY"}
            </p>
          </div>

          <div className="text-center">
            <p className="text-neutral-500 text-xs">Certificate ID</p>
            <p className="font-mono text-xs">
              {certificateId || "XXXX-XXXX-XXXX"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-neutral-500 text-xs">Authorized By</p>
            <p className="font-medium">Administration</p>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      {isComplete && certificateId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-neutral-800 rounded-xl p-6 bg-black/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-green-500" />
                <p className="text-sm font-medium text-green-500">Ready for Download</p>
              </div>
              <p className="text-xs text-neutral-400">
                Certificate ID: <span className="text-white font-mono">{certificateId}</span>
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="bg-white p-3 rounded-lg">
                <QRCodeSVG
                  value={qrValue || certificateId}
                  size={100}
                  level="H"
                />
              </div>
              <p className="text-xs text-neutral-500">Scan to verify</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Incomplete Warning */}
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border border-neutral-700 rounded-xl p-4 bg-neutral-900/50 text-center text-sm text-neutral-400"
        >
          Fill all required fields to preview certificate
        </motion.div>
      )}
    </motion.div>
  );
};

export default CertificatePreview;