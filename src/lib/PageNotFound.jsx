import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground mb-4">ERROR 404</p>
      <h1 className="font-heading font-bold text-5xl md:text-7xl tracking-[-0.03em] text-foreground">
        VOID
      </h1>
      <p className="font-body text-sm text-muted-foreground mt-4 max-w-sm">
        This page doesn't exist. Perhaps it was never meant to.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-3 border border-foreground/40 hover:border-foreground hover:bg-foreground hover:text-background px-8 py-4 transition-all duration-500 font-mono text-[11px] tracking-[0.25em]"
      >
        <ArrowLeft className="w-4 h-4" />
        RETURN HOME
      </Link>
    </div>
  );
}