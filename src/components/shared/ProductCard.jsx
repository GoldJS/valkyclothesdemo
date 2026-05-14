import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const displayImage = hovered && product.hover_image_url ? product.hover_image_url : product.image_url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/product/${product.id}`}>
        <TiltCard intensity={6}>
          <div
            className="group cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-4">
              <img
                src={displayImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Edition Label */}
              {product.edition_label && (
                <div className="absolute top-3 right-3">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1">
                    {product.edition_label}
                  </span>
                </div>
              )}

              {/* Stock Warning */}
              {product.stock_count && product.stock_count <= 10 && (
                <div className="absolute bottom-3 left-3">
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-mono text-[9px] tracking-[0.15em] text-foreground bg-background/80 backdrop-blur-sm px-2 py-1"
                  >
                    LAST {product.stock_count}
                  </motion.span>
                </div>
              )}

              {/* Quick View - slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <div className="bg-background/90 backdrop-blur-sm py-3 text-center">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-foreground">QUICK VIEW</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-1.5">
              <h3 className="font-heading font-semibold text-sm tracking-[0.08em] text-foreground group-hover:text-foreground/70 transition-colors duration-300">
                {product.name}
              </h3>
              {product.material_note && (
                <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
                  {product.material_note}
                </p>
              )}
              <p className="font-heading font-medium text-sm text-foreground/80">
                ${product.price?.toLocaleString()}
              </p>
            </div>
          </div>
        </TiltCard>
      </Link>
    </motion.div>
  );
}