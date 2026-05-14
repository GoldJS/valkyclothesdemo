import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Minus, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const pathParts = window.location.pathname.split('/');
  const productId = pathParts[pathParts.length - 1];
  const { setCartOpen } = useOutletContext();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const products = await base44.entities.Product.filter({ id: productId });
      return products[0];
    },
    enabled: !!productId,
  });

  const addToCartMutation = useMutation({
    mutationFn: (data) => base44.entities.CartItem.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        setCartOpen(true);
      }, 800);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-6 h-6 border-2 border-muted border-t-foreground animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">PRODUCT NOT FOUND</p>
      </div>
    );
  }

  const allImages = [product.image_url, ...(product.gallery_images || [])].filter(Boolean);
  const sizes = product.sizes || ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    addToCartMutation.mutate({
      product_id: product.id,
      product_name: product.name,
      product_image: product.image_url,
      size: selectedSize || sizes[0],
      quantity,
      price: product.price,
    });
  };

  return (
    <div className="pt-20 pb-20 min-h-screen">
      {/* Back */}
      <div className="px-6 md:px-10 mb-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          BACK TO SHOP
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="px-6 md:px-10 lg:pr-0"
        >
          {/* Main Image */}
          <div className="aspect-[3/4] bg-secondary overflow-hidden mb-3">
            <img
              src={allImages[selectedImage] || product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-20 bg-secondary overflow-hidden border transition-colors ${
                    selectedImage === i ? 'border-foreground' : 'border-border'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info - Sticky */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-6 md:px-10 lg:pl-12 lg:pr-10 mt-8 lg:mt-0 lg:sticky lg:top-24 lg:self-start"
        >
          {/* Edition */}
          {product.edition_label && (
            <p className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground mb-4">
              {product.edition_label}
            </p>
          )}

          <h1 className="font-heading font-bold text-2xl md:text-4xl tracking-[-0.02em]">
            {product.name}
          </h1>
          {product.subtitle && (
            <p className="font-body text-sm text-muted-foreground mt-1">{product.subtitle}</p>
          )}

          <p className="font-heading font-semibold text-xl mt-4">${product.price?.toLocaleString()}</p>

          {/* Description */}
          {product.description && (
            <p className="font-body text-sm text-muted-foreground leading-relaxed mt-6">
              {product.description}
            </p>
          )}

          {/* Size Selector */}
          <div className="mt-8">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-3">SELECT SIZE</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <motion.button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 border font-mono text-[11px] tracking-[0.1em] transition-all duration-300 ${
                    selectedSize === size
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-foreground/40 text-foreground'
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-3">QUANTITY</p>
            <div className="inline-flex items-center border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-12 h-12 flex items-center justify-center font-mono text-[11px] border-x border-border">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <motion.button
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending || added}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 relative overflow-hidden bg-foreground text-background font-mono text-[11px] tracking-[0.25em] py-5 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 group"
          >
            <span className="absolute inset-0 bg-foreground/0 group-hover:bg-white/5 transition-colors duration-500" />
            {added ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
              >
                <Check className="w-4 h-4" />
                ADDED TO ARCHIVE
              </motion.span>
            ) : addToCartMutation.isPending ? (
              <div className="w-4 h-4 border-2 border-background/40 border-t-background animate-spin" />
            ) : (
              'ADD TO ARCHIVE'
            )}
          </motion.button>

          {/* Fabric Specs */}
          {product.fabric_specs && (
            <div className="mt-8 pt-8 border-t border-border">
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-3">FABRIC & CONSTRUCTION</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {product.fabric_specs}
              </p>
            </div>
          )}

          {/* Shipping */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mb-3">SHIPPING</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Complimentary worldwide shipping on all orders. Arrives in 3–7 business days in signature packaging.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}