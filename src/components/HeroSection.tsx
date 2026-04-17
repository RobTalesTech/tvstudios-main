import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play, X } from "lucide-react";

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="hero" className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-background pt-24 pb-12">
      {/* Background Orbs & Cinematic Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#030303]">
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-background to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-background to-transparent z-10" />
        
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[20%] -left-[10%] aspect-square w-[60%] rounded-full bg-[hsl(43_72%_55%)] blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-[30%] -right-[15%] aspect-square w-[70%] rounded-full bg-[hsl(43_72%_55%)] blur-[140px]"
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[60px] z-0" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 1.05, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <p className="mb-6 font-body text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] text-[hsl(43_72%_55%)]">
            CREATING THE EXPERIENCE OF LEGACY FOR EVERYONE
          </p>
          
          <h1 className="mb-8 flex flex-col items-center justify-center font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tighter leading-none select-none">
            <span className="text-gradient-gold block pb-2 md:pb-4">TV</span>
            <span className="text-foreground block mt-[-10px] md:mt-[-30px]">Studios</span>
          </h1>

          <p className="mb-12 max-w-2xl font-body text-sm md:text-base text-white/60 leading-relaxed font-light">
            <strong className="text-white/90 font-medium tracking-wider">WE ARE THE NEW OLD TO MAKE THE DIGITAL GOLD.</strong><br/>
            TV Studios executes the coming era of AI Filmmaking—merging raw cinematic tradition with next-gen technical architecture. We build for the audience, first.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsVideoOpen(true)}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-4 text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
          >
            <span className="absolute inset-0 rounded-full bg-[hsl(43_72%_55%)]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Play className="h-4 w-4 fill-white transition-transform duration-500 group-hover:scale-110" />
            Watch Showreel
          </motion.button>
        </motion.div>
      </div>

      {/* Cinematic Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </motion.button>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-video w-[90vw] max-w-6xl overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/50"
            >
              {/* Temporary placeholder or showreel video link */}
              <iframe
                src="https://www.youtube.com/embed/QVak8sq8A_Q?autoplay=1&loop=1&playlist=QVak8sq8A_Q&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1"
                title="Demo Reel"
                className="h-full w-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
