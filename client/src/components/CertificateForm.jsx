import { useState } from "react";
import { User, Briefcase, Calendar, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

const CertificateForm = ({ setData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    event: "",
    duration: "",
    admin: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.event.trim()) newErrors.event = "Event is required";
    if (!formData.date) newErrors.date = "Date is required";
    if(!formData.admin.trim()) newErrors.admin = "Admin name is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setData(formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const fields = [
    { name: "name", placeholder: "Full Name", icon: User, type: "text" },
    { name: "role", placeholder: "Role / Position", icon: Briefcase, type: "text" },
    { name: "event", placeholder: "Event / Program", icon: Calendar, type: "text" },
    { name: "duration", placeholder: "Duration (Optional)", icon: Clock, type: "text" },
    { name: "admin", placeholder: "Admin Name", icon: User, type: "text" },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black text-white border border-neutral-800 p-6 rounded-xl space-y-5 max-w-md w-full"
    >
      <div>
        <h3 className="text-lg font-semibold">Certificate Details</h3>
        <p className="text-neutral-400 text-sm mt-1">
          Enter the recipient's details to generate a certificate
        </p>
      </div>

      {fields.map((field, i) => {
        const Icon = field.icon;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="relative group">
              <Icon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition"
              />

              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg bg-black border
                placeholder-neutral-500 text-sm
                focus:outline-none transition ${
                  errors[field.name]
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-neutral-800 focus:border-white"
                }`}
              />
            </div>
            {errors[field.name] && (
              <p className="text-xs text-red-400 mt-1">{errors[field.name]}</p>
            )}
          </motion.div>
        );
      })}

      <div>
        <div className="relative group">
          <Calendar
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2.5 rounded-lg bg-black border
            text-sm focus:outline-none transition ${
              errors.date
                ? "border-red-500/50 focus:border-red-500"
                : "border-neutral-800 focus:border-white"
            }`}
          />
        </div>
        {errors.date && (
          <p className="text-xs text-red-400 mt-1">{errors.date}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileTap={{ scale: 0.97 }}
        className="w-full py-2.5 rounded-lg bg-white text-black text-sm font-medium 
        flex items-center justify-center gap-2 hover:bg-neutral-200 transition disabled:opacity-50"
      >
        <Send size={16} />
        {isLoading ? "Generating..." : "Generate Certificate"}
      </motion.button>
    </motion.form>
  );
};

export default CertificateForm;