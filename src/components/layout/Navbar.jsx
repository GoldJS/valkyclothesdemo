import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../shared/MagneticButton';

const NavLink = ({ label, path, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className="group relative font-mono text-[11px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300"
  >
    {label}
    {/* Animated underline */}
    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
  </Link>
);

export default function Navbar({ cartCount = 0, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'SHOP', path: '/shop' },
    { label: 'NEW ARRIVALS', path: '/shop?filter=new' },
    { label: 'COLLECTIONS', path: '/collections' },
    { label: 'JOURNAL', path: '/journal' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/70 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-16">
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <Link to="/" className="font-heading font-bold text-lg tracking-[0.3em] text-foreground hover:text-foreground/70 transition-colors duration-300">
              VALKYRIE
            </Link>
          </MagneticButton>

          {/* Center Nav - Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink key={link.label} label={link.label} path={link.path} />
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            {[{ icon: Search }, { icon: User }].map(({ icon: Icon }, i) => (
              <MagneticButton key={i} strength={0.4} className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </motion.button>
              </MagneticButton>
            ))}

            <MagneticButton strength={0.4}>
              <motion.button
                onClick={onCartOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-foreground text-background text-[8px] font-mono flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </MagneticButton>

            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5" strokeWidth={1.5} /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-5 h-5" strokeWidth={1.5} /></motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
              >
                <NavLink label={link.label} path={link.path} onClick={() => setMobileOpen(false)} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}