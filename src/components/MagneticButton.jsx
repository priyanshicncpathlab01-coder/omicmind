import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MagneticButton({ children, className = '' }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Spring config for smooth magnetic pull
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Move element towards mouse by a fraction of distance
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const reset = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={handleMouseEnter}
      style={{ x, y }}
      className={`relative inline-flex ${className}`}
    >
      {/* Inner subtle glow that activates on hover */}
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/10 blur-[10px] rounded-full pointer-events-none -z-10"
        />
      )}
      {children}
    </motion.div>
  );
}
