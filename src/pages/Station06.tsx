import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, PlayCircle, Heart, MessageSquare, Fingerprint, Activity, Code, Eye, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import StationHeader from "@/components/StationHeader";

const Station06 = () => {
  const [likes, setLikes] = useState(2504);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[#00FF66] selection:text-black font-body overflow-x-hidden relative">
      
      {/* ARCHITECTURAL LAB GRID BACKGROUND */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
        style={{ 
          backgroundSize: '50px 50px', 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)' 
        }} 
      />

      <div className="relative z-10 w-full pt-28 pb-10">
        <div className="container mx-auto px-6 max-w-[1400px]">
          
          <StationHeader 
            unitNumber="UNIT_06" 
            unitTitle="AI R&D LAB // GENERATIVE CINEMA" 
            status="GENERATIVE STATUS: ONLINE" 
            statusColor="#00FF66"
          />

          {/* SECTION I: THE MISSION (EDITORIAL PRINT ART STYLE) */}
          <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 relative">
            <div className="lg:col-span-8 flex flex-col justify-center">
               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                 <p className="font-mono text-[10px] text-[#00FF66] uppercase tracking-[0.8em] font-black mb-6">Integration Phase 1.0</p>
                 <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase leading-[0.85] tracking-tighter mix-blend-difference mb-8">
                   MACHINES <br/>
                   <span className="text-zinc-600 italic lowercase font-serif">dreaming</span><br/>
                   CINEMA.
                 </h1>
               </motion.div>
            </div>
            
            <div className="lg:col-span-4 flex flex-col justify-end lg:pl-16 relative">
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
                 className="p-8 border border-white/10 bg-white/[0.01] backdrop-blur-xl relative top-20 lg:top-0"
               >
                 <Eye className="w-8 h-8 text-[#00FF66] mb-6 opacity-50" />
                 <h3 className="font-mono text-sm text-white font-bold uppercase tracking-widest mb-4">The Studio Apparatus</h3>
                 <p className="font-serif text-sm md:text-base text-zinc-400 leading-relaxed italic mb-8">
                   This unit is the experimental nucleus of our studio. We are not just adopting AI; we are dissecting it and aggressively integrating it directly into the pulse of real filmmaking. 
                 </p>
                 
                 <div className="space-y-6 pt-6 border-t border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF66]/5 to-transparent h-[50px] w-full animate-[scan_2s_linear_infinite]" />
                    
                    <div className="relative z-10">
                       <div className="flex justify-between items-end mb-1">
                         <span className="font-mono text-[9px] uppercase tracking-widest text-white">Neural Visuals [GAN-FX]</span>
                         <span className="font-mono text-[9px] text-[#00FF66] animate-pulse">INTEGRATED_98%</span>
                       </div>
                       <div className="h-[2px] w-full bg-white/10 overflow-hidden relative">
                          <motion.div animate={{ width: ['90%', '98%', '94%', '98%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute h-full bg-[#00FF66]" />
                       </div>
                    </div>

                    <div className="relative z-10">
                       <div className="flex justify-between items-end mb-1">
                         <span className="font-mono text-[9px] uppercase tracking-widest text-white">Audio Synthesis [NEURAL-VOX]</span>
                         <span className="font-mono text-[9px] text-[#00FF66] animate-pulse">ACTIVE_RUNNING</span>
                       </div>
                       <div className="flex items-center gap-[2px] h-3 overflow-hidden opacity-80">
                          {[...Array(24)].map((_, i) => (
                             <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], height: ['20%', '100%', '20%'] }} transition={{ duration: Math.random() * 0.8 + 0.3, repeat: Infinity, delay: Math.random() }} className="w-1 bg-[#00FF66]" />
                          ))}
                       </div>
                    </div>

                    <div className="relative z-10">
                       <div className="flex justify-between items-end mb-1">
                         <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">Dynamic Subtitles & Logic</span>
                         <motion.span animate={{ opacity: [0, 1] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} className="font-mono text-[9px] text-[#00FF66]">_COMPILING...</motion.span>
                       </div>
                       <div className="font-mono text-[7px] text-[#00FF66]/50 uppercase mt-2 bg-black/50 p-2 border border-white/5 line-clamp-2">
                          <motion.p animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                             {">"} generating translation logic tree... [ok] <br/>
                             {">"} syncing audio cues to render... [pending]
                          </motion.p>
                       </div>
                    </div>
                 </div>
               </motion.div>
            </div>
          </section>

          {/* SECTION II: THE SHOWCASE - MAKING MADE */}
          <section className="mt-40 border-t border-white/10 pt-20">
             
             {/* Showcase Header */}
             <div className="text-center mb-24 max-w-4xl mx-auto space-y-8">
                <span className="font-mono text-[10px] text-zinc-600 block uppercase tracking-[1em]">Experimental Webshow</span>
                <h2 className="font-display text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">
                   MAKING <span className="text-[#00FF66]">MADE</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left p-8 md:p-12 bg-[#050505] border border-white/5 shadow-[0_0_80px_rgba(0,255,102,0.02)]">
                   <p className="font-serif text-[15px] leading-[2] text-zinc-400 italic">
                     We are engineering an experience. Fictionalizing the parallel opposite of television's most acclaimed niche—<span className="text-white font-bold not-italic">Breaking Bad</span>. We are digging into the hidden, connected fiction of RR (Revolter Rights). A complex creator bridging his television nostalgia with cutting-edge AI autonomy.
                   </p>
                   <p className="font-serif text-[15px] leading-[2] text-zinc-400 italic">
                     This is pure psychologically-driven visual print art translated to motion. We want you to feel the weight of the tech. We are merging raw storytelling with aggressive AI visual and audio manipulation to prove we can connect humanity without boundaries. 
                   </p>
                </div>
             </div>

             {/* PSYCHOLOGICAL DUAL POSTER EXHIBITION (MAGAZINE/PRINT ART STYLE) */}
             <div className="relative w-full min-h-[800px] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 mt-32 mb-40">
                
                {/* Center Typographic Overlays (Print Style) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
                   <h2 className="font-display text-[15vw] font-black text-white mix-blend-overlay opacity-40 uppercase leading-none tracking-tighter whitespace-nowrap">
                     VISUAL / ART
                   </h2>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] text-[#00FF66] uppercase tracking-[2em] font-black z-30 hidden md:block whitespace-nowrap mix-blend-difference">
                   The Mirror Narrative
                </div>

                {/* POSTER 1: AI / PARALLEL */}
                <motion.div 
                  initial={{ rotate: -5, x: -50, opacity: 0 }}
                  whileInView={{ rotate: -2, x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative z-10 w-[85%] md:w-[40%] md:absolute md:left-[10%] aspect-[2/3] group cursor-none"
                >
                   {/* Decorative Print Borders */}
                   <div className="absolute -inset-4 border border-zinc-800 scale-[0.95] group-hover:scale-100 transition-transform duration-700 pointer-events-none" />
                   
                   <div className="w-full h-full border border-white/10 overflow-hidden relative shadow-[0_30px_100px_rgba(0,0,0,1)] bg-black">
                      <img src="/character-rob.jpg" className="w-full h-full object-cover filter grayscale contrast-[1.3] brightness-90 group-hover:scale-105 transition-transform duration-[1.5s]" alt="AI Parallel" />
                      
                      {/* Typographic Glitch Overlay */}
                      <div className="absolute top-6 left-6 mix-blend-difference">
                         <span className="block font-mono text-[8px] text-[#00FF66] uppercase tracking-widest">[ SYNC NODE : 88.X ]</span>
                         <h4 className="font-display text-4xl font-black text-white italic tracking-tighter mt-1">THE EMPTY<br/>FRAME</h4>
                      </div>
                      
                      {/* Barcode/Metadata Footer */}
                      <div className="absolute bottom-0 w-full p-6 flex justify-between items-end bg-gradient-to-t from-black to-transparent">
                         <div className="space-y-1">
                            <div className="flex gap-1">
                               {[...Array(8)].map((_, i) => <div key={i} className="w-1 h-3 bg-white/40" />)}
                            </div>
                            <span className="block font-mono text-[6px] text-white/50 uppercase tracking-widest mt-2">AI MATRIX</span>
                         </div>
                         <Fingerprint className="w-6 h-6 text-[#00FF66] opacity-50 block group-hover:rotate-180 transition-transform duration-1000" />
                      </div>
                   </div>
                </motion.div>

                {/* POSTER 2: ORIGIN / RR */}
                <motion.div 
                  initial={{ rotate: 5, x: 50, opacity: 0 }}
                  whileInView={{ rotate: 3, x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative z-20 w-[85%] md:w-[42%] md:absolute md:right-[8%] md:top-[10%] aspect-[2/3] group cursor-none mt-12 md:mt-0"
                >
                   {/* Decorative Print Borders */}
                   <div className="absolute top-10 -right-10 w-full h-full border border-[#f7d08a]/20 translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-700 pointer-events-none hidden md:block" />

                   <div className="w-full h-full border border-white/20 overflow-hidden relative shadow-[0_50px_100px_rgba(0,0,0,1)] bg-black">
                      <img src="/character-rob.jpg" className="w-full h-full object-cover filter sepia-[0.6] hue-rotate-[-15deg] saturate-[1.8] contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-[1.5s]" alt="Origin Timeline" />
                      
                      {/* Bold Editorial Header */}
                      <div className="absolute top-0 w-full p-8 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start">
                         <h4 className="font-serif text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f7d08a] to-[#a37e40] italic leading-none tracking-tighter border-l-4 border-[#f7d08a] pl-4">
                            REVOLTER<br/>RIGHTS
                         </h4>
                         <span className="font-mono text-[9px] text-white/70 uppercase tracking-[0.4em] writing-vertical-rl rotate-180 border-l border-white/20 pl-2">Origin Timeline</span>
                      </div>
                      
                      {/* Footer Text */}
                      <div className="absolute bottom-8 left-8 right-8">
                         <p className="font-body text-[10px] text-white/60 uppercase tracking-widest text-justify leading-[1.8] border-t border-white/20 pt-4 bg-black/40 backdrop-blur-sm p-4">
                           "There is a only way of living that is creating art to know art and yourself :- <span className="text-[#f7d08a] font-bold">Rob</span>"
                         </p>
                      </div>
                   </div>
                </motion.div>

             </div>

          </section>

          {/* SECTION III: AUDIENCE INTAKE & EXPERIENCE (NOT BUSINESS) */}
          <section className="mb-32">
             <div className="max-w-5xl mx-auto">
                <div className="bg-[#030303] border border-white/10 p-10 md:p-16 relative overflow-hidden group hover:border-[#00FF66]/30 transition-colors duration-700 shadow-2xl">
                   
                   {/* Dynamic scanning line */}
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00FF66]/50 shadow-[0_0_20px_#00FF66] transform -translate-y-full animate-[scan_4s_ease-in-out_infinite]" />
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                      <div>
                         <Code className="w-8 h-8 text-[#00FF66] mb-8" />
                         <h3 className="font-display text-4xl font-black text-white uppercase tracking-tighter mb-4">Back The Vision.</h3>
                         <p className="font-mono text-[11px] text-zinc-400 leading-[1.8] uppercase tracking-widest mb-10 text-justify">
                            This is an audience-driven cinematic pilot. Prove the demand. Back the vision. Be a direct thread in our community registry. Your feedback shapes the generative pipeline. 
                         </p>
                         
                         <div className="flex flex-col gap-4">
                            <a href="https://wa.me/919588627190" target="_blank" rel="noreferrer" className="flex items-center justify-between px-8 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] w-full hover:bg-[#00FF66] transition-all group/btn">
                               <span>Fund Pilot Episode</span>
                               <PlayCircle className="w-4 h-4 group-hover/btn:scale-125 transition-transform" />
                            </a>
                            <a href="https://wa.me/919588627190" target="_blank" rel="noreferrer" className="flex items-center justify-between px-8 py-5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] w-full hover:border-[#00FF66]/40 hover:bg-[#00FF66]/5 transition-all">
                               <span>Join Discord / Studio Hub</span>
                               <MessageSquare className="w-4 h-4 text-[#00FF66]" />
                            </a>
                         </div>
                      </div>

                      <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-16">
                         <div>
                            <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.5em] block mb-6">Current Network Pulse</span>
                            <div className="flex items-center gap-6">
                               <button onClick={handleLike} className={`group flex flex-col items-start gap-2 transition-colors ${hasLiked ? 'text-red-500' : 'text-zinc-500 hover:text-white'}`}>
                                  <div className="flex items-center gap-3">
                                     <Heart className={`w-6 h-6 transition-all ${hasLiked ? 'fill-red-500 scale-110' : 'group-hover:scale-110'}`} /> 
                                     <span className="font-display text-4xl font-black">{likes.toLocaleString()}</span>
                                  </div>
                                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#00FF66]">Users Intrigued</span>
                               </button>
                            </div>
                         </div>
                         
                         <div className="mt-16 bg-white/[0.02] p-6 border border-white/5">
                            <span className="block font-mono text-xl text-white font-black italic tracking-tighter mb-1">3.05%</span>
                            <span className="block font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-4">Generative Progress Map</span>
                            <div className="w-full h-[2px] bg-zinc-900 overflow-hidden relative">
                               <motion.div initial={{ width: 0 }} animate={{ width: '3.05%' }} transition={{ duration: 2 }} className="absolute h-full left-0 bg-[#00FF66]" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </section>

        </div>
      </div>

      <Footer />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
           0% { transform: translateY(-100%); opacity: 0; }
           50% { opacity: 1; }
           100% { transform: translateY(500px); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default Station06;
