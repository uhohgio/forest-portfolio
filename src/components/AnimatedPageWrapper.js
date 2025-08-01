import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: -50 }, // Start off-screen to the left, invisible
  in: { opacity: 1, x: 0 },         // Slide into view, fully visible
  out: { opacity: 0, x: 50 }       // Slide off-screen to the right, invisible
};

const pageTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.3
};

const AnimatedPageWrapper = ({ children }) => {
  // AnimatePresence is needed to animate components when they are removed from the React tree (like when changing pages)
  return (
    <AnimatePresence mode='wait'> {/* 'wait' mode ensures one animation finishes before the next begins */}
      <motion.div
        key={typeof window !== 'undefined' ? window.location.pathname : ''} // Unique key for each page ensures re-animation
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }} // Important for proper animation positioning
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPageWrapper;