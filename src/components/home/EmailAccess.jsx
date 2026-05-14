import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import PremiumButton from '../shared/PremiumButton';
import FadeDivider from '../shared/FadeDivider';

export default function EmailAccess() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <><FadeDivider />
    <section className="px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            006 — INNER CIRCLE
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-[-0.02em] mt-3">
            MEMBERS ACCESS
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed">
            Early access to drops. Exclusive releases. No spam — only significance.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {submitted ? (
            <div className="mt-12">
              <p className="font-mono text-[11px] tracking-[0.2em] text-foreground">
                YOU'RE IN. WATCH YOUR INBOX.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                className="flex-1 bg-card border border-border px-5 py-4 font-mono text-[11px] tracking-[0.15em] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors"
                required
              />
              <PremiumButton type="submit" variant="solid">
                JOIN
                <ArrowRight className="w-4 h-4" />
              </PremiumButton>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section></>
  );
}