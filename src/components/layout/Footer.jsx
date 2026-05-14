import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-bold text-lg tracking-[0.3em] text-foreground mb-4">
              VALKYRIE
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Born from concrete and conviction. Crafted for those who refuse to conform.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground mb-6 uppercase">Navigate</h4>
            <div className="flex flex-col gap-3">
              {['Shop All', 'New Arrivals', 'Collections', 'Journal'].map((item) => (
                <Link key={item} to="/shop" className="font-body text-sm text-foreground/70 hover:text-foreground transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground mb-6 uppercase">Information</h4>
            <div className="flex flex-col gap-3">
              {['About', 'Shipping & Returns', 'Care Guide', 'Size Guide'].map((item) => (
                <span key={item} className="font-body text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground mb-6 uppercase">Connect</h4>
            <div className="flex flex-col gap-3">
              {['Instagram', 'Twitter / X', 'TikTok', 'Contact'].map((item) => (
                <span key={item} className="font-body text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            © 2026 VALKYRIE. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            DESIGNED FOR THE UNCOMPROMISING
          </p>
        </div>
      </div>
    </footer>
  );
}