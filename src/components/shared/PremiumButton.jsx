import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * A premium button with ripple, shimmer, and magnetic micro-interaction.
 * variant: 'outline' | 'solid'
 */
export default function PremiumButton({ children, className = '', variant = 'outline', onClick, disabled, type = 'button' }) {
  const [ripple, setRipple] = useState(null);
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    onClick && onClick(e);
  };

  const base =
    'relative overflow-hidden inline-flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.25em] transition-all duration-500 select-none';

  const variants = {
    outline: `border px-8 py-4 ${
      hovered
        ? 'border-foreground bg-foreground text-background'
        : 'border-foreground/40 text-foreground'
    }`,
    solid: `px-8 py-4 bg-foreground text-background hover:bg-foreground/85`,
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {/* Shimmer sweep */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={hovered ? { x: ['−100%', '200%'] } : { x: '-100%' }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
        }}
      />
      {/* Ripple */}
      {ripple && (
        <motion.span
          initial={{ scale: 0, opacity: 0.3 }}
          animate={{ scale: 6, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute w-8 h-8 rounded-full bg-current pointer-events-none"
          style={{ left: ripple.x - 16, top: ripple.y - 16 }}
        />
      )}
      {children}
    </motion.button>
  );
}