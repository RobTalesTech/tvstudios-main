import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreativeShowcase() {
  const captureWords = [
    { text: "Films", fontBase: "font-serif tracking-widest", color: "#D4AF37", shadow: "0 0 30px rgba(212,175,55,0.4)" },
    { text: "Short Films", fontBase: "font-serif italic tracking-[0.2em]", color: "#FFFFFF", shadow: "0 0 20px rgba(255,255,255,0.3)" },
    { text: "Web Series", fontBase: "font-mono font-bold tracking-widest", color: "#FF4500", shadow: "0 0 30px rgba(255,69,0,0.4)" },
    { text: "AI Video", fontBase: "tracking-widest", color: "#FFFFFF", shadow: "0 0 30px rgba(255,255,255,0.4)" },
    { text: "Music Videos", fontBase: "font-mono font-bold tracking-widest", color: "#8A2BE2", shadow: "0 0 30px rgba(138,43,226,0.4)" },
    { text: "Brand Ads", fontBase: "font-display italic tracking-tight", color: "#00E5FF", shadow: "0 0 30px rgba(0,229,255,0.4)" },
    { text: "Documentaries", fontBase: "font-mono font-light tracking-[0.2em]", color: "#00FF66", shadow: "0 0 30px rgba(0,255,102,0.4)" }
  ];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % captureWords.length);
    }, 2000);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <section className="w-full bg-[#020202] flex flex-col py-16 gap-8 border-t border-white/10 items-center">
      {/* MAIN HEADINGS (Outside/Above Camera) */}
      <div className="text-center px-4 mb-4">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-red-600 mb-2">ACTIVE DIRECTIVE</p>
        
        <motion.h3 
          animate={{ backgroundPosition: ["0% center", "200% center"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="inline-block font-display text-2xl md:text-4xl tracking-widest font-black uppercase text-transparent bg-clip-text" 
          style={{ backgroundImage: 'linear-gradient(90deg, #D4AF37, #FF0055, #8A2BE2, #00E5FF, #D4AF37)', backgroundSize: '200% auto' }}
        >
          WE LOVE CREATING...
        </motion.h3>
      </div>

      {/* COMPACT CINEMATIC CAMERA FRAME */}
      <div className="relative w-80 sm:w-96 h-48 bg-[#0b0b0d] border border-white/10 rounded-[1.5rem] p-4 shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center overflow-visible">
        
        {/* Vintage Top Control knobs */}
        {/* Shutter Release Button */}
        <div className="absolute top-0 left-12 w-7 h-2 bg-gradient-to-b from-zinc-700 to-zinc-800 border-x border-t border-white/10 -translate-y-2 rounded-t-sm shadow-md" />
        {/* Mode Dial */}
        <div className="absolute top-0 right-16 w-10 h-3 bg-gradient-to-b from-zinc-700 to-zinc-800 border-x border-t border-white/10 -translate-y-3 rounded-t flex items-center justify-between px-1 shadow-md">
          <div className="w-[1px] h-full bg-zinc-950" />
          <div className="w-[1px] h-full bg-zinc-950" />
          <div className="w-[1px] h-full bg-zinc-950" />
          <div className="w-[1px] h-full bg-zinc-950" />
        </div>
        {/* Power Switch ring */}
        <div className="absolute top-0 right-8 w-5 h-1.5 bg-zinc-600 border-x border-t border-white/10 -translate-y-1.5 rounded-t-sm" />
        
        {/* Optical Viewfinder window */}
        <div className="absolute top-3 left-4 w-6 h-4 bg-zinc-950 border border-white/20 rounded shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center">
          <div className="w-3 h-2 bg-emerald-500/20 rounded-full blur-[1px] transform rotate-12" />
        </div>

        {/* Self-Timer Red LED */}
        <div className="absolute top-4 right-5 flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
            <span className="font-mono text-[6px] text-zinc-500 uppercase tracking-widest">Capture</span>
          </div>
          <span className="font-mono text-[5px] text-zinc-500 uppercase tracking-widest">
            REC // 24FPS
          </span>
        </div>

        {/* CAMERA LENS ASSEMBLY (Behind the written text) */}
        <div className="absolute w-44 h-44 rounded-full border border-zinc-900 bg-[#040405] shadow-[inset_0_0_25px_rgba(0,0,0,0.9),0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden z-0">
          {/* Inner lens ridges */}
          <div className="absolute w-36 h-36 rounded-full border border-white/5 flex items-center justify-center">
            {/* Shutter Blade silhouettes */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full h-[0.5px] bg-zinc-800/40" 
                style={{ transform: `rotate(${i * 22.5}deg)` }}
              />
            ))}
            {/* Glass element reflections */}
            <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent blur-sm" />
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-bl from-amber-500/5 to-transparent blur-md" />
            
            {/* Viewfinder crosshairs / focus grid - only center dot */}
            <div className="absolute w-16 h-16 flex items-center justify-center">
              {/* Small center dot */}
              <div className="w-1 h-1 rounded-full bg-primary/60" />
            </div>
          </div>
        </div>

        {/* TEXT OVERLAY (Inside the Lens) */}
        <div className="relative z-10 text-center flex flex-col items-center justify-center gap-1 px-4 w-full min-h-[40px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(2px)" }}
              transition={{ duration: 0.3 }}
              className={`text-xs uppercase tracking-wider block font-bold text-center ${captureWords[wordIndex].fontBase}`}
              style={{
                color: captureWords[wordIndex].color,
                textShadow: captureWords[wordIndex].shadow
              }}
            >
              {captureWords[wordIndex].text === "AI Video" ? (
                <span className="flex items-center justify-center gap-1.5">
                  <span className="font-serif italic text-[#00E5FF]">A</span>
                  <span className="font-mono font-black text-[#FF0055]">I</span>
                  <span className="font-display font-black tracking-widest text-[#CCFF00] text-[10px]">VIDEO</span>
                </span>
              ) : (
                captureWords[wordIndex].text
              )}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Bottom left Green LED & Logo */}
        <div className="absolute bottom-2.5 left-5 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
          <span className="font-mono text-[6px] text-zinc-500 tracking-[0.15em] uppercase">
            TV³ STUDIOS // SYSTEM-7
          </span>
        </div>
      </div>
    </section>
  );
}
