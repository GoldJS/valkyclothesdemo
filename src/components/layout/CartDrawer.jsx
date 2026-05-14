import React from 'react';
import { X, Minus, Plus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer({ isOpen, onClose, items = [], onUpdateQuantity, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card/90 backdrop-blur-3xl border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div>
                <h2 className="font-heading font-bold text-sm tracking-[0.2em]">YOUR ARCHIVE</h2>
                <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground mt-1">
                  {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'}
                </p>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                    YOUR ARCHIVE IS EMPTY
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-2">
                    Nothing selected yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 bg-secondary overflow-hidden flex-shrink-0">
                        {item.product_image && (
                          <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-heading font-semibold text-xs tracking-[0.1em]">
                            {item.product_name}
                          </h3>
                          {item.size && (
                            <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                              SIZE: {item.size}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-[11px]">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-heading font-semibold text-sm">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-border">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">TOTAL</span>
                  <span className="font-heading font-bold text-lg">${total.toLocaleString()}</span>
                </div>
                <button className="w-full bg-foreground text-background font-mono text-[11px] tracking-[0.25em] py-4 hover:bg-foreground/90 transition-colors flex items-center justify-center gap-3">
                  SECURE THE ARCHIVE
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}