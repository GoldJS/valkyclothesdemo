import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import ProductCard from '../components/shared/ProductCard';
import SectionLabel from '../components/shared/SectionLabel';

const CATEGORIES = [
  { value: 'all', label: 'ALL' },
  { value: 'hoodies', label: 'HOODIES' },
  { value: 'tees', label: 'TEES' },
  { value: 'bottoms', label: 'BOTTOMS' },
  { value: 'outerwear', label: 'OUTERWEAR' },
  { value: 'footwear', label: 'FOOTWEAR' },
  { value: 'accessories', label: 'ACCESSORIES' },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date'),
    initialData: [],
  });

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 pb-20 px-6 md:px-10 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <SectionLabel label="THE COLLECTION" />
        <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-[-0.03em] mt-3">
          SHOP
        </h1>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap gap-4 md:gap-6 mb-12 md:mb-16 border-b border-border pb-6"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`font-mono text-[10px] tracking-[0.2em] transition-colors duration-300 ${
              activeCategory === cat.value
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-32">
          <div className="w-6 h-6 border-2 border-muted border-t-foreground animate-spin" />
        </div>
      )}

      {/* Product Grid */}
      {!isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-32">
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
            NO PIECES FOUND
          </p>
        </div>
      )}
    </div>
  );
}