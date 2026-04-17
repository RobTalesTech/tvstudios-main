import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-display text-8xl md:text-9xl font-bold text-gradient-gold mb-4">404</h1>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Signal Lost — TvUnit Not Found
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary/20 text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all"
        >
          Return to Broadcast
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
