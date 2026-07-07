import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";

const STATIONS = [
  { id: "00", name: "PANSEMAL [MP]", x: 50, y: 50, color: "#ff0000", isBase: true }, 
  { id: "01", name: "VASHI [MH]", x: 44, y: 68, color: "#D4AF37" },
  { id: "02", name: "INDORE [MP]", x: 58, y: 38, color: "#D4AF37" },
  { id: "03", name: "NAGPUR [MH]", x: 68, y: 52, color: "#D4AF37" },
  { id: "04", name: "AHMEDABAD [GJ]", x: 38, y: 46, color: "#D4AF37" },
  { id: "05", name: "SURAT [GJ]", x: 40, y: 56, color: "#D4AF37" },
];

const MovementSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPins, setShowPins] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. FOREGROUND TEXT ESCALATION (Standard Scroll Persistence)
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -300]);
  
  // 2. KINETIC MAP OVERLAY (Layer 0 Background)
  // Scale Linear Zoom from 1.0 to 1.8 (Centered on Pansemal)
  const mapScale = useTransform(scrollYProgress, [0.15, 0.65], [1, 1.8]);
  const mapOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0]);
  const mapBlur = useTransform(scrollYProgress, [0.75, 0.95], ["blur(0px)", "blur(20px)"]);

  useEffect(() => {
    const unsub = scrollYProgress.onChange((v) => {
      // Trigger Pins at scale approx 1.4 (around 0.4 scroll)
      if (v >= 0.35 && v <= 0.85) {
        setShowPins(true);
      } else {
        setShowPins(false);
      }
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-black">
      
      {/* LAYER 1: FOREGROUND (INTERACTION & CONTENT) */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-[50]">
        
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="text-center px-4 mix-blend-difference pointer-events-auto"
        >
          <div className="flex flex-col items-center mb-8">
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <h2 className="text-[10px] font-mono text-[#D4AF37] tracking-[0.8em] uppercase font-black">Studio Pulse</h2>
             </div>
          </div>

          <h3 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none text-white mb-6">
            WE ARE THE NEW OLD <br className="hidden md:block"/> 
            <span className="text-[#D4AF37] font-serif lowercase">to make the</span> DIGITAL GOLD.
          </h3>
          
          <p className="font-mono text-[9px] text-[#D4AF37] tracking-[0.4em] uppercase mb-12 font-black">
             From the team and talent from the various skill set and diversity.
          </p>

          <div className="max-w-3xl mx-auto space-y-8">
             <p className="font-serif text-white/50 text-base md:text-lg leading-relaxed uppercase border-x border-white/10 px-10">
                TV³ Studios executes the coming era of AI Filmmaking—merging raw cinematic tradition with next-gen technical architecture. We build for the audience, first.
             </p>
             
             <button className="flex items-center gap-4 mx-auto group cursor-pointer">
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all">
                   <Play className="w-4 h-4 group-hover:text-black transition-colors" />
                </div>
                <span className="font-mono text-[10px] text-white tracking-[0.3em] uppercase group-hover:text-[#D4AF37] transition-colors">Watch Showreel</span>
             </button>
          </div>
        </motion.div>

        {/* LAYER 0: BACKGROUND (THE CARTOGRAPHIC INJECT) */}
        <motion.div 
          style={{ opacity: mapOpacity, scale: mapScale, filter: mapBlur }}
          className="absolute inset-0 z-0 flex items-center justify-center bg-black pointer-events-none"
        >
           <div className="relative w-full h-full transform-gpu overflow-hidden">
              {/* THE TOPOGRAPHICAL MAP (DESATURATED) */}
              <img 
                src="/india_obsidian_topography_pansemal_1776187016826.png" 
                alt="Satellite View"
                className="w-full h-full object-cover scale-150 grayscale brightness-[0.35] contrast-[1.3]"
              />

              {/* GLASSY EDGE FINISH */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
              <div className="absolute inset-0 backdrop-blur-[2px] mask-edge-blur" />

              {/* SATELLITE HUD (COORDINATED PINS) */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative w-full h-full">
                    {STATIONS.map((station, i) => (
                       <motion.div
                         key={station.id}
                         initial={{ opacity: 0 }}
                         animate={showPins ? { opacity: 1 } : { opacity: 0 }}
                         className="absolute"
                         style={{ 
                            left: `${station.x}%`, 
                            top: `${station.y}%`,
                            transform: 'translate(-50%, -50%)'
                         }}
                       >
                           <div className="flex flex-col items-center">
                              <div 
                                className={`relative w-1.5 h-1.5 rounded-full ${station.isBase ? 'w-3 h-3 bg-red-600 shadow-[0_0_15px_red]' : 'bg-[#D4AF37]'}`}
                              >
                                 {station.isBase && (
                                   <motion.div 
                                     animate={{ scale: [1, 3, 1], opacity: [0.6, 0, 0.6] }}
                                     transition={{ duration: 2, repeat: Infinity }}
                                     className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500 pointer-events-none opacity-60"
                                   />
                                 )}
                              </div>
                              {/* HUD TYPOGRAPHY (TECHNICAL WELCH) */}
                              <div className="mt-2 text-center flex flex-col items-center">
                                 <span className="font-mono text-white text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap drop-shadow-md">{station.name}</span>
                                 <span className={`font-mono ${station.isBase ? 'text-red-500' : 'text-[#D4AF37]'} text-[8px] font-black tracking-widest mt-0.5`}>[ST {station.id}]</span>
                              </div>
                           </div>
                       </motion.div>
                    ))}
                 </div>
              </div>
           </div>
        </motion.div>

        {/* SIGNAL LOSS TRANSITION */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]) }}
          className="absolute inset-0 z-[100] bg-black pointer-events-none"
        />

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mask-edge-blur {
          mask-image: radial-gradient(circle, transparent 40%, black 100%);
        }
      `}} />
    </div>
  );
};

export default MovementSection;
