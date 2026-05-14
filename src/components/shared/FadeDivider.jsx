import React from 'react';

export default function FadeDivider() {
  return (
    <div
      className="w-full h-px"
      style={{
        background: 'linear-gradient(to right, transparent 0%, hsl(0 0% 18%) 20%, hsl(0 0% 18%) 80%, transparent 100%)',
      }}
    />
  );
}