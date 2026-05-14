import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../shared/ScrollReveal';
import SectionLabel from '../shared/SectionLabel';
import MagneticButton from '../shared/MagneticButton';
import FadeDivider from '../shared/FadeDivider';
import PremiumButton from '../shared/PremiumButton';

function getTimeLeft() {
  const target = new Date();
  target.setDate(target.getDate() + 12);
  target.setHours(20, 0, 0, 0);
  const diff = target - new Date();
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownRelease() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = [
    { value: time.days, label: 'DAYS' },
    { value: time.hours, label: 'HRS' },
    { value: time.minutes, label: 'MIN' },
    { value: time.seconds, label: 'SEC' },
  ];

  return (
    <><FadeDivider />
    <section className="px-6 md:px-10 py-20 md:py-32">
      <ScrollReveal>
        <div className="text-center">
          <SectionLabel label="005 — LIMITED RELEASE" />
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-[-0.02em] mt-3">
            PHANTOM DROP
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-md mx-auto">
            50 units. No restock. Once they're gone, they exist only in memory.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex justify-center gap-4 md:gap-8 mt-12 md:mt-16">
          {blocks.map((block) => (
            <div key={block.label} className="text-center">
              <div className="w-16 md:w-24 h-16 md:h-24 border border-border bg-card flex items-center justify-center relative overflow-hidden group hover:border-foreground/30 transition-colors duration-500">
                {/* subtle inner glow on hover */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.03] transition-colors duration-500" />
                <motion.span
                  key={block.value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-heading font-bold text-2xl md:text-4xl relative z-10"
                >
                  {String(block.value).padStart(2, '0')}
                </motion.span>
              </div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground mt-3">
                {block.label}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="text-center mt-12">
          <MagneticButton strength={0.2} className="inline-block">
            <PremiumButton variant="outline">GET NOTIFIED</PremiumButton>
          </MagneticButton>
        </div>
      </ScrollReveal>
    </section></>
  );
}