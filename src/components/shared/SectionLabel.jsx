import React from 'react';

export default function SectionLabel({ label, className = '' }) {
  return (
    <span className={`font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase ${className}`}>
      {label}
    </span>
  );
}