import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scenes = [
  { 
    text: "FEATURE FILMS", 
    fontBase: "font-serif tracking-widest", 
    color: "#D4AF37", // Gold for prestige, legacy, and heavy cinematic grading
    shadow: "0 0 40px rgba(212,175,55,0.4)"
  },
  { 
    text: "WEB SERIES", 
    fontBase: "font-mono font-bold tracking-widest", 
    color: "#FF4500", // Cinematic Orange-Red for episodic heat
    shadow: "0 0 40px rgba(255,69,0,0.4)"
  },
  { 
    text: "ADVERTISEMENT", 
    fontBase: "font-display italic tracking-tight", 
    color: "#00E5FF", // Electric Cyan for high-retention consumer psychology
    shadow: "0 0 40px rgba(0,229,255,0.4)"
  },
  { 
    text: "AI VIDEOS", 
    fontBase: "tracking-widest", 
    color: "#FFFFFF", 
    shadow: "0 0 40px rgba(255,255,255,0.4)"
  },
  { 
    text: "MUSIC VIDEOS", 
    fontBase: "font-mono font-bold tracking-widest", 
    color: "#8A2BE2", // Deep Royal Purple representing audio architecture & rhythm
    shadow: "0 0 40px rgba(138,43,226,0.4)"
  },
  { 
    text: "WEB SHOWS", 
    fontBase: "font-display tracking-[0.2em]", 
    color: "#CCFF00", // Digital Broadcast Yellow-Green for live fast-paced formats
    shadow: "0 0 40px rgba(204,255,0,0.4)"
  },
  { 
    text: "CREATIVE COMMERCIALS", 
    fontBase: "font-display font-black tracking-tighter", 
    color: "#FF0055", // Neon Red/Pink for aggressive algorithmic impact
    shadow: "0 0 40px rgba(255,0,85,0.4)"
  },
  { 
    text: "DOCUMENTARIES", 
    fontBase: "font-mono font-light tracking-[0.2em]", 
    color: "#00FF66", // Matrix Green representing raw truth & factual reporting
    shadow: "0 0 40px rgba(0,255,102,0.4)"
  },
  { 
    text: "SHORT FILMS", 
    fontBase: "font-serif italic tracking-[0.3em]", 
    color: "#FFFFFF", // Pure stark white for pure, unfiltered artistic expression
    shadow: "0 0 30px rgba(255,255,255,0.3)"
  }
];

const MechanicalViewfinder = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % scenes.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const current = scenes[index];

  return (
    <div className="relative flex h-[50vh] w-full items-center justify-center bg-[#020202] overflow-hidden border-y border-white/5">
      {/* Viewfinder UI */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[90%] md:w-[70%] h-[70%] border-[0.5px] border-white/10 relative">
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/40"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/40"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/40"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/40"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-30">
             <div className="w-full h-[1px] bg-red-600 absolute top-1/2 left-0"></div>
             <div className="w-[1px] h-full bg-red-600 absolute top-0 left-1/2"></div>
          </div>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)", x: 20 }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0 }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)", x: -20 }}
          transition={{ duration: 0.3, type: "tween", ease: "easeOut" }}
          className="relative z-10 px-4 text-center"
        >
          <h2 
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase min-h-[100px] flex items-center justify-center ${current.fontBase}`}
            style={current.text !== "AI VIDEOS" ? { color: current.color, textShadow: current.shadow } : {}}
          >
            {current.text === "AI VIDEOS" ? (
              <span className="flex items-center gap-2 md:gap-4 drop-shadow-[0_0_40px_rgba(255,255,255,0.5)]">
                 <span className="font-serif italic text-[#00E5FF]">A</span>
                 <span className="font-mono font-black text-[#FF0055]">I</span>
                 <span className="font-display font-black tracking-widest text-[#CCFF00]">VIDEOS</span>
              </span>
            ) : current.text}
          </h2>
          {/* Chromatic Glitch Effect using the same font base */}
          <h2 className={`absolute top-0 left-0 w-full text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-[#FF0000] opacity-40 mix-blend-screen pointer-events-none translate-x-[3px] flex items-center justify-center min-h-[100px] ${current.fontBase}`}>
            {current.text === "AI VIDEOS" ? (
              <span className="flex items-center gap-2 md:gap-4">
                 <span className="font-serif italic">A</span>
                 <span className="font-mono font-black">I</span>
                 <span className="font-display font-black tracking-widest">VIDEOS</span>
              </span>
            ) : current.text}
          </h2>
          <h2 className={`absolute top-0 left-0 w-full text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-[#00FFFF] opacity-40 mix-blend-screen pointer-events-none -translate-x-[3px] flex items-center justify-center min-h-[100px] ${current.fontBase}`}>
            {current.text === "AI VIDEOS" ? (
              <span className="flex items-center gap-2 md:gap-4">
                 <span className="font-serif italic">A</span>
                 <span className="font-mono font-black">I</span>
                 <span className="font-display font-black tracking-widest">VIDEOS</span>
              </span>
            ) : current.text}
          </h2>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 font-body text-[10px] uppercase tracking-[0.3em] text-red-600/60 font-black flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
        REC. TVS PRODUCTIONS WORK BY WORK
      </div>
    </div>
  );
};

export default function CreativeShowcase() {
  return (
    <section className="w-full bg-[#020202] flex flex-col py-16 gap-8 border-t border-white/10">
       <div className="text-center px-4 mb-4">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-red-600 mb-2">ACTIVE DIRECTIVE</p>
        
        <motion.h3 
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="inline-block font-display text-2xl md:text-4xl tracking-widest font-black uppercase text-transparent bg-clip-text" 
          style={{ backgroundImage: 'linear-gradient(90deg, #D4AF37, #FF0055, #8A2BE2, #00E5FF, #D4AF37)', backgroundSize: '200% auto' }}
        >
          WE ARE CREATING...
        </motion.h3>
        
      </div>
      <MechanicalViewfinder />
    </section>
  );
}
