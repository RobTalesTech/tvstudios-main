import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, Play, Zap, Clapperboard, Users, Camera, Briefcase, ChevronRight, Clock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const Unit02 = () => {
  const [showColor, setShowColor] = useState(false);
  const [showApprentice, setShowApprentice] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] pt-32 selection:bg-emerald-500/30 selection:text-white font-body">
      
      {/* AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[10%] right-[20%] w-[30%] h-[30%] bg-emerald-500 blur-[200px] rounded-full opacity-[0.03]" />
         <div className="absolute bottom-[0%] left-[10%] w-[40%] h-[40%] bg-emerald-900 blur-[150px] rounded-full opacity-[0.05]" />
      </div>

      <div className="container px-4 mx-auto max-w-5xl relative z-10">
        
        {/* Navigation */}
        <div className="mb-16">
          <Link to="/studio-work" className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-500 transition-colors font-mono text-[9px] uppercase tracking-[0.4em] group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Exit Official Showreel
          </Link>
        </div>

        {/* Header Intro */}
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 bg-emerald-500/5 text-emerald-500 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-[0.3em] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_1s_ease-in-out_infinite]" />
            Exclusive Production — TvUnit 02
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-white leading-none">
            H & <span className="text-emerald-500 italic font-serif lowercase">Ms</span>
          </h1>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed italic font-serif">
              Children's Adventure Fantasy Drama. Utilizing an experimental technology blend to accelerate the pipeline without losing the raw feel of cinema.
            </p>
            <div className="font-mono text-[11px] text-emerald-400 uppercase tracking-[0.5em] font-black border-y border-white/5 py-4 inline-block px-8">
              Releasing Soon This Year. To Be Announced.
            </div>
          </div>
        </div>

        {/* H&M POSTER IGNITION BLOCK (THE SHOWREEL HUB) */}
        <div className="flex flex-col items-center mb-32 relative">
           <motion.div 
              animate={{ 
                filter: showColor ? 'grayscale(0%)' : 'grayscale(100%) brightness(0.8)',
                scale: showColor ? 1.02 : 1,
                boxShadow: showColor ? '0 30px 80px rgba(16,185,129,0.2)' : '0 30px 60px rgba(0,0,0,0.8)'
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="relative w-full max-w-md aspect-[2/3] rounded-sm overflow-hidden border border-white/5 mb-8 z-10"
           >
              <img 
                 src="/src/assets/H&M POSTER.png" 
                 className="w-full h-full object-cover"
                 alt="H&M Official Poster Exhibition"
                 onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.classList.add('bg-zinc-900', 'flex', 'items-center', 'justify-center'); }}
              />
              {!showColor && <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />}
           </motion.div>

           <div className="relative z-20 -mt-14">
             <button 
               onClick={() => setShowColor(!showColor)}
               className={`group flex items-center gap-3 px-8 py-4 rounded-full font-mono text-[10px] uppercase tracking-[0.4em] font-black transition-all border ${showColor ? 'bg-emerald-500 text-black border-emerald-500 hover:bg-emerald-400' : 'bg-[#050505] text-white/50 border-white/10 hover:border-emerald-500 hover:text-white'}`}
             >
                {showColor ? 'IGNITED VISUALS' : 'VIEW SHOWREEL POSTER'}
                <Play className={`w-3 h-3 ${showColor ? 'fill-black' : 'group-hover:text-emerald-500'}`} />
             </button>
           </div>
        </div>

        {/* EPISODE ROADMAP : RESTORED */}
        <div className="mb-24">
          <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-2xl group hover:border-[#10B981]/20 transition-all duration-700">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-10 flex items-center gap-4 italic uppercase">
              <Clock className="w-6 h-6 text-emerald-500" /> Production Pipeline
            </h2>
            
            <div className="space-y-8 max-w-3xl">
              {/* Episodes 1-3 */}
              <div className="flex gap-6 group text-left">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black text-sm z-10 shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="w-px h-full bg-emerald-500/20 group-hover:bg-emerald-500/40 transition-colors" />
                </div>
                <div className="pb-8">
                  <h4 className="text-xl font-bold text-white mb-2">Episodes 01 - 03</h4>
                  <p className="text-emerald-500 text-[10px] uppercase tracking-widest font-mono mb-4 font-bold">Successfully Produced</p>
                  <p className="text-zinc-500 leading-relaxed font-serif italic text-base">
                    Core narrative blocks and primary world-building established. These episodes define the visual language of the H & Ms universe.
                  </p>
                </div>
              </div>

              {/* Current Focus: Post */}
              <div className="flex gap-6 group text-left">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500 z-10 shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite] opacity-20" />
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <div className="w-px h-full bg-white/5" />
                </div>
                <div className="pb-8">
                  <h4 className="text-xl font-bold text-white mb-2">Post-Production: Ep 02 & 03</h4>
                  <p className="text-emerald-400 text-[10px] uppercase tracking-widest font-mono mb-4 font-bold">Active Post-Processing</p>
                  <p className="text-zinc-500 leading-relaxed font-serif italic text-base">
                    Utilizing the refined tech-blend for visual effects, color grading, and final sound engineering. Currently in the final polish phase.
                  </p>
                </div>
              </div>

              {/* Remaining Episodes */}
              <div className="flex gap-6 group text-left">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 z-10 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Episodes 04 - 09</h4>
                  <p className="text-emerald-500/50 text-[10px] uppercase tracking-widest font-mono mb-4">Extended Pipeline: Pre-Production</p>
                  <p className="text-zinc-500 leading-relaxed font-serif italic text-base">
                    Active scripting, talent casting, and cinematic location scouting. Conceptualization for the subsequent broadcast blocks is currently in development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SMALLER APPRENTICESHIP WINDOW - LAYERED */}
        <div className="mb-32 flex justify-end">
           <div className="w-full md:w-[70%] lg:w-[60%] bg-[#050505] border border-white/5 hover:border-emerald-500/30 transition-colors p-8 relative overflow-hidden group rounded-2xl cursor-pointer" onClick={() => setShowApprentice(!showApprentice)}>
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 blur-[30px] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                 <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                       <h4 className="font-serif text-xl font-black italic text-white uppercase tracking-tighter">Join Production</h4>
                       <span className="font-mono text-[9px] text-emerald-500 uppercase tracking-widest">Apprentice Program</span>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">{showApprentice ? 'Close Comms' : 'Secure Channel'}</span>
                    <div className={`w-2 h-2 rounded-full transition-colors ${showApprentice ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} />
                 </div>
              </div>
              
              <AnimatePresence>
                {showApprentice && (
                  <motion.div 
                     initial={{ height: 0, opacity: 0, marginTop: 0 }}
                     animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                     exit={{ height: 0, opacity: 0, marginTop: 0 }}
                     transition={{ duration: 0.4, ease: "easeInOut" }}
                     className="overflow-hidden border-t border-white/5"
                  >
                     <div className="pt-6">
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                           {["AD", "Production Mgr", "Cinematographer"].map((role) => (
                              <span key={role} className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 font-mono text-[8px] uppercase tracking-widest rounded-full">{role}</span>
                           ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                           <p className="font-mono text-[9px] text-zinc-500 leading-[1.8] uppercase tracking-widest text-justify flex-1 border-l border-emerald-500/20 pl-4">
                              Exclusive learning alignment for filmmaking interns. Only strictly disciplined creatives ready to complete the project from start to finish.
                           </p>
                           <a 
                              href="mailto:careers@thevillagestudios.com?subject=Application:%20H%26Ms%20Production%20Team" 
                              onClick={(e) => e.stopPropagation()}
                              className="group/btn shrink-0 inline-flex items-center justify-between px-6 py-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-mono uppercase tracking-widest text-[9px] hover:bg-emerald-500 hover:text-black transition-all w-full sm:w-auto text-center rounded-full"
                           >
                              <span className="mr-3">Request Review</span>
                              <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                           </a>
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
};

export default Unit02;
