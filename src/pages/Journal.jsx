import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../components/shared/SectionLabel';
import ScrollReveal from '../components/shared/ScrollReveal';

const ARTICLES = [
  {
    title: 'THE WEIGHT OF INTENTION',
    excerpt: 'Why we chose 480 GSM cotton and what it means for the future of heavyweight garments.',
    date: 'MAY 2026',
    image: 'https://media.base44.com/images/public/6a03f3f1188ee53a0781a5ff/147731796_generated_da62751e.png',
  },
  {
    title: 'CONCRETE DREAMS',
    excerpt: 'A visual essay on brutalist architecture and its influence on our design language.',
    date: 'APR 2026',
    image: 'https://media.base44.com/images/public/6a03f3f1188ee53a0781a5ff/02d2108a0_generated_462662ba.png',
  },
  {
    title: 'VALKYRIE MANIFESTO',
    excerpt: "We don't follow trends. We build culture. An origin story.",
    date: 'MAR 2026',
    image: 'https://media.base44.com/images/public/6a03f3f1188ee53a0781a5ff/6c4356c4f_generated_5d42afcc.png',
  },
];

export default function Journal() {
  return (
    <div className="pt-24 pb-20 px-6 md:px-10 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <SectionLabel label="DISPATCHES" />
        <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-[-0.03em] mt-3">
          JOURNAL
        </h1>
      </motion.div>

      <div className="space-y-16">
        {ARTICLES.map((article, i) => (
          <ScrollReveal key={article.title} delay={i * 0.1}>
            <article className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground">
                  {article.date}
                </p>
                <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-[-0.02em] mt-3">
                  {article.title}
                </h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mt-3">
                  {article.excerpt}
                </p>
                <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/60 mt-6 group-hover:text-foreground transition-colors">
                  READ MORE →
                </span>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}