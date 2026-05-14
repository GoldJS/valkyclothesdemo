import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import SectionLabel from '../shared/SectionLabel';
import ProductCard from '../shared/ProductCard';
import FadeDivider from '../shared/FadeDivider';

export default function BestSellers() {
  const { data: products = [] } = useQuery({
    queryKey: ['bestseller-products'],
    queryFn: () => base44.entities.Product.filter({ is_best_seller: true }, '-created_date', 4),
    initialData: [],
  });

  if (products.length === 0) return null;

  return (
    <><FadeDivider />
    <section className="px-6 md:px-10 py-20 md:py-32">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <SectionLabel label="002 — MOST COVETED" />
            <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-[-0.02em] mt-3">
              BEST SELLERS
            </h2>
          </div>
          <Link
            to="/shop"
            className="group hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            VIEW ALL
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
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