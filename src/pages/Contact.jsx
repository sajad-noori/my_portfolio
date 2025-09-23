import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import "../styles/Contact.css";

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);

      // Show success message
      setSubmitStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div
      className={`contact-page-wrapper ${
        theme === "dark" ? "contact-page-dark" : "contact-page-light"
      }`}
    >
      <div
        className={`contact-container ${
          theme === "dark" ? "theme-dark" : "theme-light"
        }`}
        data-theme={theme}
      >
        <motion.div
          className={`contact-content ${
            theme === "dark" ? "contact-content-dark" : "contact-content-light"
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="contact-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1>Get In Touch</h1>
            <p>
              Have a project in mind or want to collaborate? Feel free to reach
              out!
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="contact-form"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div className="form-group" variants={item}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </motion.div>

            <motion.div className="form-group" variants={item}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </motion.div>

            <motion.div className="form-group" variants={item}>
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Hello! I'd like to discuss a potential project..."
                rows="5"
                required
              ></textarea>
            </motion.div>

            <motion.div variants={item}>
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <FiSend style={{ marginRight: "8px" }} />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <motion.div
                  className="status-message success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  className="status-message error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Oops! Something went wrong. Please try again later.
                </motion.div>
              )}
            </motion.div>
          </motion.form>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="contact-method">
              <div className="contact-icon">
                <FiMail />
              </div>
              <div className="contact-details">
                <h3>Email Me</h3>
                <a href="mailto:sajadnooribaynay@gmail.com">
                  sajadnooribayany@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <FiPhone />
              </div>
              <div className="contact-details">
                <h3>Call Me</h3>
                <a href="tel:+1234567890">+93 (77) 855-896-8</a>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <FiMapPin />
              </div>
              <div className="contact-details">
                <h3>Location</h3>
                <p>Kabul, Afghanistan</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
