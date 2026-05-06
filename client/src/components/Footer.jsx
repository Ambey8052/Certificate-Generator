import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="border-t border-neutral-800  py-10 px-6 bg-black text-white"
    >
      <div className="max-w-5xl mx-auto">

      
        <div className="grid md:grid-cols-3 gap-8 mb-8">

     
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Amaantivam Foundation</h3>
            <p className="text-sm text-neutral-400">
              Generate clean, verifiable certificates with QR-based validation.
            </p>
          </div>

        
          <div className="space-y-3">
            <h4 className="text-sm font-medium">About-Me</h4>
            <div className="flex flex-col gap-2 text-sm text-neutral-400">
              <a href="https://port-folio-react-57ha.vercel.app" className="hover:text-white transition">Portfolio</a>
              <a href="https://www.linkedin.com/in/karan-kumar-17736632a" className="hover:text-white transition">LinkedIn</a>
              <a href="https://github.com/Ambey8052" className="hover:text-white transition">GitHub</a>
            </div>
          </div>

        
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Contact</h4>
            <div className="space-y-2 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>info@amaantivamfoundation.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

       
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 border-t border-neutral-800 pt-6">
          <p>© {currentYear} Amaantivam Foundation</p>
          <p className="mt-3 md:mt-0">All rights reserved</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;