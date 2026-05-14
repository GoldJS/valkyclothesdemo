import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../shared/MagneticButton';
import PremiumButton from '../shared/PremiumButton';

const HERO_IMAGE = 'https://media.base44.com/images/public/6a03f3f1188ee53a0781a5ff/65fdeee6a_generated_2068105c.png';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, 80]);
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src={HERO_IMAGE}
          alt="Editorial hero"
          className="w-full h-full object-cover opacity-60"
          style={{ scale: 1.12 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />
      </motion.div>

      {/* Subtle animated grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground mb-6"
          >
            SS26 COLLECTION — NOW LIVE
          </motion.p>

          {/* Staggered headline */}
          {['NOT MADE', 'FOR EVERYONE'].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-bold text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.03em] text-foreground block"
              >
                {line}
              </motion.h1>
            </div>
          ))}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-body text-sm md:text-base text-muted-foreground mt-6 max-w-md leading-relaxed"
          >
            Engineered for the monolithic few. Premium heavyweight construction meets brutalist elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10"
          >
            <MagneticButton strength={0.25}>
              <Link to="/shop">
                <PremiumButton variant="outline">
                  SHOP THE DROP
                  <ArrowRight className="w-4 h-4" />
                </PremiumButton>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-muted-foreground to-transparent"
        />
        <span className="font-mono text-[8px] tracking-[0.3em] text-muted-foreground rotate-90 origin-center mt-2">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}