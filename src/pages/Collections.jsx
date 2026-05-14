import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionLabel from '../components/shared/SectionLabel';

const COLLECTIONS = [
  {
    name: 'PHANTOM',
    description: 'All-black essentials for the nocturnal valkyrie.',
    season: 'SS26',
    image: 'https://media.base44.com/images/public/6a03f3f1188ee53a0781a5ff/7e12af2e6_generated_806716e0.png',
  },
  {
    name: 'DESERT DUSK',
    description: 'Earthen tones meet heavyweight construction.',
    season: 'FW25',
    image: 'https://media.base44.com/images/public/6a03f3f1188ee53a0781a5ff/6c4356c4f_generated_5d42afcc.png',
  },
  {
    name: 'MONOLITH',
    description: 'Brutalist outerwear for the uncompromising.',
    season: 'SS25',
    image: 'https://media.base44.com/images/public/6a03f3f1188ee53a0781a5ff/13b69a1f2_generated_2f240620.png',
  },
];

export default function Collections() {
  return (
    <div className="pt-24 pb-20 px-6 md:px-10 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <SectionLabel label="CURATED ARCHIVES" />
        <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-[-0.03em] mt-3">
          COLLECTIONS
        </h1>
      </motion.div>

      <div className="space-y-6">
        {COLLECTIONS.map((collection, i) => (
          <motion.div
            key={collection.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
          >
            <Link to="/shop" className="group block">
              <div className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-secondary">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                  <p className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground">
                    {collection.season}
                  </p>
                  <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-[-0.02em] mt-2">
                    {collection.name}
                  </h2>
                  <p className="font-body text-sm text-muted-foreground mt-2 max-w-sm">
                    {collection.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-foreground/80 group-hover:text-foreground transition-colors">
                    EXPLORE
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}