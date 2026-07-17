import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Poster Boy AI", path: "/branded-content" },
    { name: "Studio Work", path: "/studio-work" },
    { name: "About & Contact", path: "/team" },
  ];

  // Close menu on route change
  const handleNavClick = () => setIsOpen(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 border-b border-white/5 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2" onClick={handleNavClick}>
              <span className="font-display text-2xl font-thin uppercase tracking-widest text-shadow-sm">
                <span className="text-[#FF9933]">T</span>
                <span className="text-white">V</span>
                <span className="text-[#138808]">³</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-semibold uppercase tracking-widest transition-colors ${
                    location.pathname === item.path 
                      ? "text-primary border-b-2 border-primary pb-1" 
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Desktop Call to Action */}
            <div className="hidden md:block">
              <Link to="/team" className="px-5 py-2.5 rounded-full bg-primary/20 text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all">
                Connect
              </Link>
            </div>
            
            {/* Mobile Hamburger */}
            <button 
              className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, idx) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  onClick={handleNavClick}
                  className={`text-2xl font-display uppercase tracking-[0.2em] transition-colors ${
                    location.pathname === item.path 
                      ? "text-primary" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="mt-4"
            >
              <Link 
                to="/team" 
                onClick={handleNavClick}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:bg-white transition-all"
              >
                Connect With Us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
