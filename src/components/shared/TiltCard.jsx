import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function TiltCard({ children, className = '', intensity = 8 }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, hovered: false });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * intensity,
      rotateY: (x - 0.5) * intensity,
      glareX: x * 100,
      glareY: y * 100,
      hovered: true,
    });
  };

  const handleMouseLeave = () =>
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, hovered: false });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.hovered ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      className={`relative ${className}`}
    >
      {children}
      {/* Glare overlay */}
      {tilt.hovered && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
            zIndex: 10,
          }}
        />
      )}
    </motion.div>
  );
}