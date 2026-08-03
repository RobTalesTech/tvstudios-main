import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, Zap, Sparkles, ShieldCheck, Star, Smartphone, Play, Camera, PenTool, MessageSquare, CheckCircle2, Cpu, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import StationHeader from "@/components/StationHeader";

const FilmReelStrip = ({ position }: { position: 'top' | 'bottom' }) => {
  const [digits, setDigits] = useState("000000");
  useEffect(() => {
    const interval = setInterval(() => {
      setDigits(Math.floor(Math.random() * 1000000).toString().padStart(6, '0'));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 w-full h-8 bg-black z-[100] flex items-center overflow-hidden border-y border-white/5`}>
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, ease: "linear", repeat: Infinity }} className="flex items-center whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            <div className="flex gap-1.5">{[...Array(6)].map((_, j) => (<div key={j} className="w-2.5 h-1 border border-white/10 rounded-[1px]" />))}</div>
            <span className="font-mono text-[7px] font-black text-white/20 tracking-[0.4em] uppercase">TV³ STUDIOS // PHASE: EXECUTION // SYNC_{digits}</span>
            <div className="flex gap-1.5 text-[#f7d08a]/20"><Zap className="w-2 h-2" /><Sparkles className="w-2 h-2" /></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Station05 = () => {
  const [hasSeenHub, setHasSeenHub] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [isProtocolDeclassified, setIsProtocolDeclassified] = useState(false);
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const [error, setError] = useState(false);

  const checkPassword = () => {
    if (!hasSeenHub) {
      if (password === "tvs2026" || password === "VrMaking01" || ["7021881642", "9930950149", "9328455599"].includes(password)) {
        setHasSeenHub(true);
        setShowKeyModal(false);
        setError(false);
        setPassword("");
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } else {
      if (password === "tvs2026" || password === "VrMaking01") {
        setIsProtocolDeclassified(true);
        setShowKeyModal(false);
        setError(false);
        setPassword("");
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#f7d08a] selection:text-black font-body overflow-x-hidden relative">
      <style>{`
        .gold-chrome {
          background: linear-gradient(to bottom, #f7d08a 0%, #c1923d 50%, #f7d08a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .light-beam {
          position: absolute; width: 50vw; height: 50vw; border-radius: 50%; filter: blur(120px); opacity: 0.15; pointer-events: none; z-index: 1;
        }
        .beam-magenta { background: #ff00ff; top: -10%; left: -10%; animation: drift 15s infinite alternate; }
        .beam-cyan { background: #00ffff; bottom: -10%; right: -10%; animation: drift 20s infinite alternate-reverse; }
        @keyframes drift { 0% { transform: translate(0,0); } 100% { transform: translate(20%, 20%); } }
      `}</style>

      {/* GLOBAL CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 z-0">
         <div className="light-beam beam-magenta" />
         <div className="light-beam beam-cyan" />
         <div className="absolute inset-0 bg-black/80" />
      </div>

      <FilmReelStrip position="top" />
      <FilmReelStrip position="bottom" />

      <div className="relative z-10 w-full pt-20">
        
        {/* PHASE 1: HERO ENTRY */}
        {!hasSeenHub && (
          <section className="h-[90vh] flex flex-col items-center justify-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
               <span className="font-mono text-[10px] uppercase tracking-[0.9em] text-[#f7d08a] font-black opacity-80 mb-14 border-b border-[#f7d08a]/20 pb-2">THE FIRST OTT PRODUCTION FROM TV³ STUDIOS</span>
               <div className="flex flex-col items-center mb-10 select-none">
                  <h1 className="font-display text-[4rem] md:text-[7rem] font-bold uppercase tracking-tighter leading-[0.8] m-0 gold-chrome">OTT SHOW,</h1>
                  <h1 className="font-display text-[5rem] md:text-[8.5rem] font-bold text-white lowercase tracking-tight leading-[0.8] -mt-2 md:-mt-6">Youth Drama <span className="text-[#ff2e63] font-black uppercase text-[2.5rem] md:text-[5rem] mr-2">18+</span><span className="text-[#ff2e63]">..</span></h1>
                  <p className="font-serif text-3xl md:text-4xl text-white opacity-80 italic mt-6 tracking-widest">Title Releasing soon.</p>
               </div>
               <div className="flex flex-col items-center gap-6 mb-12">
                  <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.4em]">Openings available for Assistant Direction and Production Team.</p>
                  <a href="mailto:tv3studios@proton.me" className="px-8 py-3 border border-white/10 rounded-full font-mono text-[9px] uppercase tracking-widest text-[#f7d08a] hover:bg-[#f7d08a] hover:text-black transition-all">Submit Resume</a>
               </div>
                <button onClick={() => { setShowKeyModal(true); setShowPassword(false); }} className="bg-[#D4AF37] text-black px-12 py-4 rounded-full font-black uppercase tracking-[0.4em] text-[11px] hover:bg-white transition-all shadow-[0_20px_60px_rgba(212,175,55,0.2)]">Enter Production Hub</button>
            </motion.div>
          </section>
        )}

        <AnimatePresence>
          {hasSeenHub && (
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full py-20 bg-transparent flex flex-col items-center">
              <div className="container mx-auto px-6 max-w-5xl">
                
                <StationHeader 
                  unitNumber="UNIT_05" 
                  unitTitle="OTT PRODUCTION HUB" 
                  status="PROTOCOL UNLOCKED" 
                  statusColor="#10B981"
                />

                <div className="flex flex-col items-center space-y-32">
                   {/* PHASE 2 REVEAL: TITLE & POSTER */}
                   <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="text-center select-none flex flex-col items-center">
                      <div className="space-y-4">
                        <span className="font-mono text-[10px] text-[#f7d08a] tracking-[1.5em] uppercase font-black block">Classified Access Only</span>
                        <h2 className="font-display text-[4.5rem] md:text-[8rem] font-bold uppercase tracking-tighter leading-[0.8] m-0 gold-chrome">ABHI NAI,</h2>
                        <h2 className="font-display text-[5rem] md:text-[8.5rem] font-bold text-white lowercase tracking-tight leading-[0.8] -mt-2 md:-mt-6">KABHI NAI <span className="text-[#ff2e63]">..</span></h2>
                        <p className="font-serif text-3xl md:text-4xl text-[#f7d08a] italic tracking-[0.1em] mt-6">Jawani ki Fislan</p>
                      </div>
                   </motion.div>

                   <div className="w-full flex flex-col items-center">
                      <h4 className="font-display text-2xl md:text-3xl font-black text-[#f7d08a] uppercase tracking-[0.2em] italic mb-12">Master Production Poster</h4>
                      <motion.div onClick={() => setIsZoomed(true)} className="relative cursor-zoom-in w-full max-w-lg aspect-[2/3] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,1)] group">
                         <img src="/src/assets/ABHInaiKABHInai.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Poster" />
                         <div className="absolute inset-0 bg-gradient-to-r from-[#f7d08a]/10 via-transparent to-[#f7d08a]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                      <div className="mt-12 flex flex-col items-center gap-4 bg-white/[0.02] border border-white/5 px-6 py-2 rounded-full">
                         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="font-mono text-[10px] text-emerald-500 tracking-[0.6em] uppercase font-black">Protocol: Active</span>
                      </div>
                   </div>

                    {/* THE COLLECTIVE DUMP SECTION */}
                    <div className="w-full flex flex-col items-center">
                      {!isProtocolDeclassified ? (
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="mt-20 p-12 bg-white/[0.02] border border-white/10 rounded-[4rem] text-center space-y-8 max-w-2xl">
                           <ShieldCheck className="w-12 h-12 text-[#f7d08a] mx-auto opacity-30" />
                           <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Deep Protocol Locked</h4>
                           <p className="font-serif text-sm text-zinc-500 italic leading-relaxed">System boards, technical reports, and Director's collectives are currently encrypted. Provide password to declassify.</p>
                           <button onClick={() => { setShowKeyModal(true); setShowPassword(false); }} className="px-10 py-5 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-full hover:bg-[#f7d08a] transition-all">Declassify Full Report</button>
                        </motion.div>
                      ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-48 pt-20 pb-40">
                           
                           {/* SECTION 1: THE CORE COLLABORATION (HKD SIGNATURE) */}
                           <div className="max-w-6xl mx-auto px-6 relative">
                              <span className="font-mono text-[8px] text-[#f7d08a] uppercase tracking-[1em] block text-center mb-16 animate-pulse">Foundation // Core Collaboration</span>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                 <div className="space-y-10">
                                    <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85]">
                                       ROHIT <br/>
                                       <span className="text-[#f7d08a]">BADGUJAR</span><br/>
                                       <span className="text-zinc-800">&</span> KUNDAN <br/>
                                       <span className="text-white">SAD.</span>
                                    </h2>
                                    <div className="h-px w-24 bg-[#f7d08a]/40" />
                                    <p className="font-serif text-xl text-zinc-400 italic leading-relaxed">
                                       "A singular directive born from the collision of two worlds. Bridging raw, red-earth narrative depth with the aggressive digital reach of the HKD Network."
                                    </p>
                                 </div>
                                 <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] relative border-l-[#f7d08a]/30">
                                    <div className="space-y-8">
                                       <div className="space-y-2">
                                          <span className="font-mono text-[9px] text-[#f7d08a] uppercase tracking-widest font-black">The Artistic Directive (Rohit)</span>
                                          <p className="text-sm text-zinc-500 font-serif italic">Emotional scaling, narrative architecture, and visual pulse.</p>
                                       </div>
                                       <div className="space-y-2">
                                          <span className="font-mono text-[9px] text-[#f7d08a] uppercase tracking-widest font-black">The Strategic Backbone (Kundan)</span>
                                          <p className="text-sm text-zinc-500 font-serif italic">Syndicate expansion and mass-scale cultural penetration via HKD.</p>
                                       </div>
                                       <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-[10px] font-black">HKD</div>
                                          <span className="font-mono text-[9px] text-white uppercase tracking-widest animate-pulse">● SYNC_ACTIVE</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* SECTION 2: THE PROJECT DOSSIER (STATISTICS) */}
                           <div className="max-w-4xl mx-auto p-16 bg-white/[0.01] border border-white/10 rounded-[4rem] space-y-12 relative overflow-hidden">
                              <span className="font-mono text-[8px] text-[#f7d08a] uppercase tracking-widest absolute top-6 right-10">Dossier Beta // Statistics</span>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                                 <div className="space-y-2"><span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest block">Project Code</span><span className="text-white font-black text-xs uppercase tracking-widest">TV³_ANC_01</span></div>
                                 <div className="space-y-2"><span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest block">Episodes</span><span className="text-white font-black text-xs uppercase tracking-widest">10 Episodes</span></div>
                                 <div className="space-y-2"><span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest block">Season</span><span className="text-white font-black text-xs uppercase tracking-widest">01 / Master</span></div>
                                 <div className="space-y-2"><span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest block">Crossover</span><span className="text-white font-black text-xs uppercase tracking-widest">MP / Mumbai</span></div>
                                 <div className="space-y-2"><span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest block">Format</span><span className="text-white font-black text-xs uppercase tracking-widest">Neo-Noir Drama</span></div>
                                 <div className="space-y-2"><span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest block">Bitrate</span><span className="text-white font-black text-xs uppercase tracking-widest">12-Bit RAW</span></div>
                              </div>
                              <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="flex items-center gap-4"><Camera className="w-5 h-5 text-zinc-500" /><div className="space-y-1"><span className="font-mono text-[7px] text-zinc-600 uppercase tracking-widest block">Lens Protocol</span><span className="text-white font-black text-[10px] uppercase tracking-widest">Anamorphic Master Prime</span></div></div>
                                 <div className="flex items-center gap-4"><Zap className="w-5 h-5 text-zinc-500" /><div className="space-y-1"><span className="font-mono text-[7px] text-zinc-600 uppercase tracking-widest block">Audio Architecture</span><span className="text-white font-black text-[10px] uppercase tracking-widest">7.1.4 Atmos Spatial</span></div></div>
                              </div>
                           </div>

                           {/* SECTION 3: THE NARRATIVE SOUL (MANIFESTO / SYNOPSIS) */}
                           <div className="space-y-32">
                              <div className="text-center max-w-5xl mx-auto space-y-12">
                                 <span className="font-mono text-[9px] text-[#f7d08a] tracking-[1.2em] mb-4 block uppercase opacity-60">Creative Manifesto</span>
                                 <h2 className="text-3xl md:text-6xl font-black text-white italic tracking-tighter leading-[1.1] font-serif">"The Director is the <span className="text-[#f7d08a]">Mother and Producer</span>..."</h2>
                                 <p className="font-serif text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed border-l border-white/5 pl-8 italic">"The soul of the project is being built from the raw dirt of Pansemal to the high-def screens of the world."</p>
                              </div>

                              <div className="max-w-xl mx-auto p-12 bg-gradient-to-br from-[#f7d08a]/10 to-transparent border border-[#f7d08a]/20 rounded-[3.5rem] relative">
                                 <div className="flex items-center gap-3 mb-6"><MessageSquare className="w-4 h-4 text-[#f7d08a]" /><span className="font-mono text-[9px] text-[#f7d08a] uppercase tracking-[0.4em] font-black">Logline Protocol</span></div>
                                 <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-tight">"The visceral <span className="text-[#f7d08a]">fislan</span> of youth in an era where everyone is acting, but no one is living."</h3>
                              </div>

                              <div className="max-w-2xl mx-auto space-y-8 border-t border-white/5 pt-12">
                                 <div className="flex items-center justify-between">
                                    <span className="font-mono text-[9px] text-[#f7d08a] uppercase tracking-[0.4em] font-black">Detailed Synopsis</span>
                                    <button onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)} className="group flex items-center gap-3 text-[8px] font-mono text-zinc-500 hover:text-white uppercase tracking-widest transition-all">
                                       {isSynopsisExpanded ? '[ Close Protocol ]' : '[ Read Full Protocol ]'}<div className={`w-1.5 h-1.5 rounded-full ${isSynopsisExpanded ? 'bg-red-500' : 'bg-[#f7d08a] animate-pulse'}`} />
                                    </button>
                                 </div>
                                 <AnimatePresence>
                                    {isSynopsisExpanded && (
                                       <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                          <p className="font-serif text-lg text-zinc-400 leading-relaxed italic text-justify pt-4">A multi-story odyssey that tracks the intersection of three lives across the heart of MP... every frame is optimized for profit-first cinematic scaling.</p>
                                       </motion.div>
                                    )}
                                 </AnimatePresence>
                              </div>
                           </div>

                           {/* SECTION 4: THE PRODUCTION MACHINE (ROADMAPS) */}
                           <div className="space-y-32">
                              <div className="w-full max-w-6xl mx-auto space-y-16">
                                 <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter text-center">Protocol: <span className="text-[#f7d08a]">Spatial Board</span></h2>
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                       { date: "09 APRIL", label: "Strategic Lockdown", status: "Critical", icon: ShieldCheck, highlight: true, note: "Locking primary alliances." },
                                       { date: "08 MARCH", label: "System Ignition", status: "Completed", icon: Zap, highlight: true, note: "Indori Soul translation." },
                                       { date: "18 MARCH", label: "Parallel Arc Sync", status: "Active", icon: Star, note: "Choreographing narratives." }
                                    ].map((card, idx) => (
                                       <motion.div key={idx} className={`p-10 bg-zinc-900/40 border rounded-[2.5rem] space-y-6 ${card.highlight ? 'border-[#f7d08a]/30' : 'border-white/5'}`}>
                                          <div className="flex justify-between items-center"><div className="flex items-center gap-4"><card.icon className={`w-4 h-4 ${card.highlight ? 'text-[#f7d08a]' : 'text-zinc-600'}`} /><span className="font-mono text-[10px] font-black">{card.date}</span></div></div>
                                          <h4 className="text-xl font-black uppercase italic tracking-tighter text-[#f7d08a]">{card.label}</h4>
                                          <p className="text-zinc-500 font-serif text-xs italic">{card.note}</p>
                                       </motion.div>
                                    ))}
                                 </div>
                              </div>

                              <div className="max-w-3xl mx-auto space-y-16 relative">
                                 <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter text-center">Structure: <span className="text-zinc-600">Vertical_Roadmap</span></h2>
                                 <div className="relative pl-12 border-l border-white/10 space-y-24">
                                    {[
                                       { date: "08 MARCH", title: "SYSTEM IGNITION", desc: "Digital profit architecture ignited." },
                                       { date: "18 MARCH", title: "PARALLEL ARC SYNC", desc: "Multi-dimensional narrative sync." }
                                    ].map((milestone, i) => (
                                       <div key={i} className="relative">
                                          <div className="absolute -left-[54px] top-0 w-3 h-3 bg-[#f7d08a] rounded-full animate-pulse" />
                                          <span className="font-mono text-[9px] text-[#f7d08a] tracking-[0.5em] mb-2 block uppercase">{milestone.date}</span>
                                          <h4 className="text-2xl font-black text-white tracking-tighter uppercase">{milestone.title}</h4>
                                          <p className="font-serif italic text-zinc-500 text-sm mt-2">{milestone.desc}</p>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           {/* SECTION 5: THE HUMAN CAPITAL (COLLECTIVE) */}
                           <div className="space-y-16">
                              <div className="max-w-5xl mx-auto p-16 bg-zinc-950 border border-white/5 rounded-[4rem] relative overflow-hidden">
                                 <span className="font-mono text-[8px] text-[#f7d08a] uppercase tracking-widest absolute top-8 left-1/2 -translate-x-1/2">The Production Cabinet</span>
                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center pt-8">
                                    <div className="space-y-2"><h5 className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Protocol Director</h5><p className="text-xl font-black text-white italic uppercase">[OPERATIVE_01]</p></div>
                                    <div className="space-y-2"><h5 className="font-mono text-[8px] text-[#f7d08a] uppercase tracking-widest">Associate Producer</h5><p className="text-xl font-black text-[#f7d08a] italic uppercase">Avinash Badgujar</p></div>
                                    <div className="space-y-2"><h5 className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Cinema Diagnostic</h5><p className="text-xl font-black text-white italic uppercase">TV³ Visual Unit</p></div>
                                 </div>
                              </div>
                              <div className="text-center group p-12 hover:bg-white/[0.01] transition-all rounded-[3rem] max-w-4xl mx-auto">
                                 <h3 className="text-3xl md:text-5xl font-black text-white/50 italic tracking-tighter uppercase">"Bridging the <span className="text-[#f7d08a]">Soul Gap</span> in OTT."</h3>
                              </div>
                           </div>

                           {/* SECTION 6: THE INNOVATION FLOOR (TECH & AI) */}
                           <div className="p-20 bg-zinc-950 border border-white/5 rounded-[4rem] text-center space-y-12 max-w-6xl mx-auto relative overflow-hidden">
                              <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest block -mt-10">Innovation_Module</span>
                              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#f7d08a]/20 animate-[scan_4s_linear_infinite]" />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                 <div className="space-y-6 text-left">
                                    <Cpu className="w-8 h-8 text-[#f7d08a] opacity-50" />
                                    <h4 className="text-3xl font-black text-white tracking-tighter uppercase">AI App Integration</h4>
                                    <p className="font-serif text-sm text-zinc-500 italic">Developing a custom-node application to track real-time visual logic and IP security for the Station 05 floor.</p>
                                 </div>
                                 <div className="space-y-6 text-left border-l border-white/5 pl-12">
                                    <ShieldCheck className="w-8 h-8 text-[#f7d08a] opacity-50" />
                                    <h4 className="text-3xl font-black text-white tracking-tighter uppercase">IP Protection Floor</h4>
                                    <p className="font-serif text-sm text-zinc-500 italic">Encryption protocols active for all 10 episodes. No unauthorized scraping or distribution possible.</p>
                                 </div>
                              </div>
                           </div>

                        </motion.div>
                     )}
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

      <AnimatePresence>
        {showKeyModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 text-center">
            <div className="max-w-md w-full p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] space-y-10 flex flex-col items-center">
               <ShieldCheck className="w-12 h-12 text-[#f7d08a] opacity-40" />
               <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">{hasSeenHub ? 'Deep Protocol Authorization' : 'Authorized Access Only'}</h3>
               <div className="relative w-full">
                 <input 
                   type={showPassword ? "text" : "password"} 
                   value={password} 
                   onChange={(e) => setPassword(e.target.value)} 
                   placeholder="Entry Protocol..." 
                   className="w-full bg-black border border-white/10 p-6 pl-16 pr-16 rounded-2xl text-center font-mono text-[#f7d08a] focus:border-[#f7d08a] transition-all" 
                 />
                 <button 
                   type="button" 
                   onClick={() => setShowPassword(!showPassword)} 
                   className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors focus:outline-none"
                 >
                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 </button>
               </div>
               <div className="flex gap-4 w-full"><button onClick={checkPassword} className="flex-1 py-5 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-full hover:bg-[#f7d08a] transition-all">Authenticate</button></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isZoomed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[4000] bg-black/98 backdrop-blur-[100px] flex items-center justify-center overflow-hidden">
             <div className="absolute top-10 right-10 flex items-center gap-6 z-[4001]">
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full p-2 px-6">
                   <button onClick={() => setZoomScale(s => Math.max(0.5, s - 0.2))} className="text-white hover:text-[#f7d08a] text-xl font-black">-</button>
                   <div className="h-4 w-[1px] bg-white/10" /><button onClick={() => setZoomScale(s => Math.min(3, s + 0.2))} className="text-white hover:text-[#f7d08a] text-xl font-black">+</button>
                </div>
                <button onClick={() => { setIsZoomed(false); setZoomScale(1); }} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-black uppercase text-[10px] hover:bg-[#f7d08a] transition-all">Close</button>
             </div>
             <motion.div onWheel={(e) => setZoomScale(s => Math.min(3, Math.max(0.5, s + (e.deltaY < 0 ? 0.1 : -0.1))))} animate={{ scale: zoomScale }} transition={{ type: "spring", damping: 20 }}>
                <img src="/src/assets/ABHInaiKABHInai.png" className="max-w-2xl w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair shadow-[0_0_100px_rgba(247,208,138,0.1)]" alt="Zoomed Poster" />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  </div>
  );
};

export default Station05;
