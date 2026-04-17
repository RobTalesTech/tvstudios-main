import React from 'react';
import { motion } from 'framer-motion';

const reelItems = [
  { text: "FEATURE FILMS", color: "#D4AF37", glow: "0 0 60px rgba(212,175,55,0.6)" },
  { text: "WEB SERIES", color: "#FF4500", glow: "0 0 60px rgba(255,69,0,0.6)" },
  { text: "ADVERTISEMENT", color: "#00E5FF", glow: "0 0 60px rgba(0,229,255,0.6)" },
  { text: "AI VIDEOS", color: "#FFFFFF", glow: "0 0 60px rgba(255,255,255,0.8)" },
  { text: "MUSIC VIDEOS", color: "#8A2BE2", glow: "0 0 60px rgba(138,43,226,0.6)" },
  { text: "WEB SHOWS", color: "#CCFF00", glow: "0 0 60px rgba(204,255,0,0.6)" },
  { text: "CREATIVE COMMERCIALS", color: "#FF0055", glow: "0 0 60px rgba(255,0,85,0.6)" },
  { text: "DOCUMENTARIES", color: "#00FF66", glow: "0 0 60px rgba(0,255,102,0.6)" },
  { text: "SHORT FILMS", color: "#FFFFFF", glow: "0 0 40px rgba(255,255,255,0.4)" }
];

const CinematicReel = () => {
  return (
    <section className="w-full bg-[#020202] flex flex-col py-20 border-b border-white/5 relative z-10 overflow-hidden">
      <div className="text-center px-4 mb-16 relative z-20">
        <p className="font-body text-xs uppercase tracking-[0.4em] text-[hsl(43_72%_55%)] mb-3">Continuous Output</p>
        <h3 className="font-display text-4xl md:text-5xl text-white tracking-widest font-black uppercase flex justify-center mt-2">
          {"WE ARE CREATING...".split("").map((char, i) => (
            <motion.span
              key={i}
              animate={{ color: ["#333333", "#D4AF37", "#FF0055", "#00E5FF", "#333333"] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.1, ease: "linear" }}
              className="mx-[1px] md:mx-[2px]"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h3>
      </div>
      
      <div className="relative flex h-[35vh] w-full items-center bg-[#020202] overflow-hidden -top-6">
        {/* Edge fading to black */}
        <div className="absolute left-0 top-0 bottom-0 z-10 w-24 md:w-64 bg-gradient-to-r from-[#020202] to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 z-10 w-24 md:w-64 bg-gradient-to-l from-[#020202] to-transparent pointer-events-none"></div>
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex whitespace-nowrap pt-8 pb-8"
        >
          {[...reelItems, ...reelItems, ...reelItems, ...reelItems].map((item, i) => (
            <div key={i} className="flex items-center px-12 md:px-24 group cursor-default">
              
              <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]">
                {/* Hollow Base Text (Maintains Symmetry & Scroll Alignment) */}
                <span className="font-display text-5xl md:text-[120px] font-black uppercase tracking-tighter text-transparent flex items-center" 
                      style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                  {item.text === "AI VIDEOS" ? (
                    <span className="flex items-center">
                       <span className="font-serif italic mr-2 md:mr-4">A</span>
                       <span className="font-mono font-black mr-6 md:mr-12">I</span>
                       <span className="font-display font-black tracking-tighter">VIDEOS</span>
                    </span>
                  ) : item.text}
                </span>

                {/* Glowing Overlay Text (Only visible on hover) */}
                <span 
                  className="absolute inset-x-0 inset-y-0 flex items-center justify-center font-display text-5xl md:text-[120px] font-black uppercase tracking-tighter opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-screen pointer-events-none"
                  style={item.text !== "AI VIDEOS" ? { color: item.color, textShadow: item.glow } : undefined}
                >
                  {item.text === "AI VIDEOS" ? (
                    <div className="flex items-center" style={{ textShadow: "0 0 40px rgba(255,255,255,0.5)" }}>
                       <span className="font-serif italic text-[#00E5FF] drop-shadow-[0_0_20px_#00E5FF] mr-2 md:mr-4">A</span>
                       <span className="font-mono font-black text-[#FF0055] drop-shadow-[0_0_20px_#FF0055] mr-6 md:mr-12">I</span>
                       <span className="font-display font-black tracking-tighter text-[#CCFF00] drop-shadow-[0_0_20px_#CCFF00]">VIDEOS</span>
                    </div>
                  ) : item.text}
                </span>
              </div>

              {/* Spacing dot */}
              <span className="mx-12 md:mx-24 h-3 w-3 md:h-6 md:w-6 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors duration-500"></span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicReel;
