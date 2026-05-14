import React from 'react';
import ScrollReveal from '../shared/ScrollReveal';
import SectionLabel from '../shared/SectionLabel';
import FadeDivider from '../shared/FadeDivider';

const LOOKBOOK_1 = 'https://media.base44.com/images/public/6a03f3f1188ee53a0781a5ff/6c4356c4f_generated_5d42afcc.png';
const LOOKBOOK_2 = 'https://media.base44.com/images/public/6a03f3f1188ee53a0781a5ff/02d2108a0_generated_462662ba.png';
const LOOKBOOK_3 = 'https://media.base44.com/images/public/6a03f3f1188ee53a0781a5ff/147731796_generated_da62751e.png';

export default function EditorialLookbook() {
  return (
    <><FadeDivider />
    <section className="px-6 md:px-10 py-20 md:py-32">
      <ScrollReveal>
        <SectionLabel label="003 — EDITORIAL" />
        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-[-0.02em] mt-3 mb-12 md:mb-16">
          THE LOOKBOOK
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {/* Large Left */}
        <ScrollReveal className="md:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden group cursor-pointer">
            <img
              src={LOOKBOOK_1}
              alt="Editorial lookbook"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/80">CHAPTER I</p>
              <h3 className="font-heading font-bold text-xl tracking-[-0.01em] mt-1">DESERT MONOLITH</h3>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column */}
        <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
          <ScrollReveal delay={0.1}>
            <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
              <img
                src={LOOKBOOK_2}
                alt="Editorial lookbook"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/80">CHAPTER II</p>
                <h3 className="font-heading font-bold text-xl tracking-[-0.01em] mt-1">URBAN RITUAL</h3>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Wide */}
      <ScrollReveal className="mt-4 md:mt-6">
        <div className="relative aspect-[21/9] overflow-hidden group cursor-pointer">
          <img
            src={LOOKBOOK_3}
            alt="Editorial lookbook"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-foreground/80">CHAPTER III</p>
            <h3 className="font-heading font-bold text-xl tracking-[-0.01em] mt-1">MONOLITH</h3>
          </div>
        </div>
      </ScrollReveal>
    </section></>
  );
}