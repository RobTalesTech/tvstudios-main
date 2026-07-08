import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleClose = () => {
    setIsVideoOpen(false);
  };

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
            <span className="text-gradient-gold block pb-2 md:pb-4">TV³</span>
            <span className="text-foreground block mt-[-10px] md:mt-[-30px]">Studios</span>
          </h1>

          <p className="mb-12 max-w-2xl font-body text-sm md:text-base text-white/60 leading-relaxed font-light">
            <strong className="text-white/90 font-medium tracking-wider">WE ARE THE NEW OLD TO MAKE THE DIGITAL GOLD.</strong><br/>
            TV³ Studios executes the coming era of AI Filmmaking—merging raw cinematic tradition with next-gen technical architecture. We build for the audience, first.
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

      {/* Cinematic Video Modal (PREMIUM TV PROJECTION) */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl"
          >
            <motion.button
              onClick={handleClose}
              className="absolute top-8 right-8 z-[120] text-white/30 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[85vw] md:w-[60vw] aspect-video group"
            >
              {/* Premium TV Frame */}
              <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-white/0 rounded-lg blur-sm opacity-50" />
              <div className="absolute -inset-[1px] bg-white/10 rounded-lg" />
              
              <div className="relative h-full w-full overflow-hidden rounded-md bg-black shadow-[0_0_100px_rgba(0,0,0,1)] shadow-[0_0_40px_rgba(212,175,55,0.1)]">
                <iframe
                  src="https://drive.google.com/file/d/13NLDaOngekg6P45uWLfcVCtUCCe21w80/preview"
                  title="TV³ Studios Showreel"
                  className="h-full w-full scale-[1.01]"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/85 backdrop-blur border border-white/10 px-4 py-2 rounded-full text-center max-w-[90%] shadow-2xl">
                  <p className="font-mono text-[9px] text-zinc-300 uppercase tracking-widest">
                    Google Drive video not loading?{" "}
                    <a 
                      href="https://drive.google.com/file/d/13NLDaOngekg6P45uWLfcVCtUCCe21w80/view?usp=sharing" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary underline font-bold hover:text-white transition-colors ml-1"
                    >
                      Open in New Tab ↗
                    </a>
                  </p>
                </div>
                
                {/* Glass Overlays to hide possible branding/UI elements */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-20" />
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
              </div>

              {/* Status Tags */}
              <div className="absolute -top-12 left-0 flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/40">Silent Projection</span>
                 </div>
                 <div className="h-px w-8 bg-white/10" />
                 <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/40">Studio Motion</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
