import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

const Home = () => {
  const features = [
    { icon: Zap, title: "Fast", desc: "Generate certificates instantly" },
    { icon: Shield, title: "Verified", desc: "Secure QR-based validation" },
    { icon: Sparkles, title: "Clean Design", desc: "Simple professional templates" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white">

      
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-3xl"
        >
      
          <motion.div variants={item} className="mb-6">
            <span className="text-xs border border-neutral-800 px-3 py-1 rounded-full text-neutral-400">
              Certificate Generator
            </span>
          </motion.div>

       
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-semibold leading-tight mb-6"
          >
            Create Certificates <br />
            in Seconds
          </motion.h1>

    
          <motion.p
            variants={item}
            className="text-neutral-400 text-sm md:text-base mb-8"
          >
            Generate clean, verifiable certificates with QR codes and unique IDs.
          </motion.p>

        
          <motion.div variants={item} className="flex gap-3 justify-center">
            <Link to="/generate">
              <button className="px-5 py-2.5 bg-white text-black rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-neutral-200 transition">
                Get Started <ArrowRight size={16} />
              </button>
            </Link>

            <button className="px-5 py-2.5 border border-neutral-800 rounded-lg text-sm hover:border-white transition">
              Learn More
            </button>
          </motion.div>
        </motion.div>

      
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 grid md:grid-cols-3 gap-4 w-full max-w-3xl"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={i}
                variants={item}
                className="border border-neutral-800 rounded-xl p-5 text-center"
              >
                <div className="flex justify-center mb-3">
                  <Icon size={20} className="text-white" />
                </div>

                <h3 className="text-sm font-medium mb-1">
                  {feature.title}
                </h3>

                <p className="text-xs text-neutral-400">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Home;