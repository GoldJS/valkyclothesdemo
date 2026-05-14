import React from 'react';
import ScrollReveal from '../shared/ScrollReveal';
import SectionLabel from '../shared/SectionLabel';
import FadeDivider from '../shared/FadeDivider';

export default function BrandPhilosophy() {
  return (
    <><FadeDivider />
    <section className="px-6 md:px-10 py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <SectionLabel label="004 — PHILOSOPHY" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-heading font-bold text-3xl md:text-6xl tracking-[-0.03em] mt-6 leading-[1.05]">
            WE DON'T MAKE CLOTHES.<br />
            <span className="text-muted-foreground">WE BUILD ARMOR.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mt-8 md:mt-12 max-w-2xl mx-auto">
            Every thread is a decision. Every stitch is an intention. We source only the heaviest 
            cotton, the most resilient textiles, the rarest hardware. Our garments are not designed 
            to follow trends — they are engineered to outlast them.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-3 gap-8 md:gap-16 mt-12 md:mt-20">
            <div>
              <p className="font-heading font-bold text-2xl md:text-4xl">480</p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mt-2">GSM WEIGHT</p>
            </div>
            <div>
              <p className="font-heading font-bold text-2xl md:text-4xl">100%</p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mt-2">ORGANIC COTTON</p>
            </div>
            <div>
              <p className="font-heading font-bold text-2xl md:text-4xl">∞</p>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground mt-2">DURABILITY</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section></>
  );
}