import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
   
          <div className="flex justify-center mb-4">
            <AlertCircle size={40} className="text-white" />
          </div>

       
          <h1 className="text-5xl font-semibold mb-2">
            404
          </h1>

        
          <h2 className="text-lg font-medium mb-2">
            Page not found
          </h2>

          <p className="text-sm text-neutral-400 mb-6">
            The page you are looking for does not exist or has been moved.
          </p>

         
          <div className="flex justify-center gap-3">

            <Link to="/">
              <button className="px-4 py-2 text-sm bg-white text-black rounded-lg flex items-center gap-2 hover:bg-neutral-200 transition">
                <Home size={14} />
                Home
              </button>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 text-sm border border-neutral-800 rounded-lg flex items-center gap-2 hover:border-white transition"
            >
              <ArrowLeft size={14} />
              Back
            </button>

          </div>

        
          <p className="text-xs text-neutral-500 mt-6">
            HTTP 404
          </p>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default NotFound;