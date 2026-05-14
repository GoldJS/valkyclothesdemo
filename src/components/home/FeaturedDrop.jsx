import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ScrollReveal from '../shared/ScrollReveal';
import SectionLabel from '../shared/SectionLabel';
import ProductCard from '../shared/ProductCard';
import FadeDivider from '../shared/FadeDivider';

export default function FeaturedDrop() {
  const { data: products = [] } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => base44.entities.Product.filter({ is_featured: true }, '-created_date', 4),
    initialData: [],
  });

  if (products.length === 0) return null;

  return (
    <><FadeDivider />
    <section className="px-6 md:px-10 py-20 md:py-32">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <SectionLabel label="001 — CURRENT DROP" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-[-0.02em] mt-3">
              THE ARCHIVE
            </h2>
          </div>
          <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground hidden md:block">
            {products.length} PIECES
          </span>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section></>
  );
}