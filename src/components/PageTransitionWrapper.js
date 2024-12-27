import React from "react";
import { motion } from 'framer-motion';

const PageTransitionWrapper = ({ children }) => {
  return (
    <motion.div
        className="motion-container"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper;
