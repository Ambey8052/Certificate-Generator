import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
     
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="relative w-16 h-16"
      >
        <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full opacity-75 blur-sm"></div>
        <div className="absolute inset-1 bg-slate-950 rounded-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <Sparkles className="text-purple-400" size={24} />
          </motion.div>
        </div>
      </motion.div>

     
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-center"
      >
        <p className="text-gray-300 font-semibold">Loading</p>
        <p className="text-purple-400 text-sm">Please wait...</p>
      </motion.div>
    </div>
  );
};

export default Loader;