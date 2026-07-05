import { useState } from "react";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import CinematicReel from "@/components/CinematicReel";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Settings, CheckCircle2, Users, Cpu, Lock, X, Flame, ChevronRight, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function StudioWork() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1); // 1: basic, 2: role, 3: technical/resume, 4: aspiration, 5: success
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [primaryRole, setPrimaryRole] = useState("editor"); // default editor
  
  // Technical / Experience Answers
  const [software, setSoftware] = useState<string[]>([]);
  const [style, setStyle] = useState("");
  const [speed, setSpeed] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [resumeData, setResumeData] = useState<{ name: string; dataUrl: string } | null>(null);

  // Tailored dynamic responses based on categories
  const [customAnswer1, setCustomAnswer1] = useState("");
  const [customAnswer2, setCustomAnswer2] = useState("");

  // Aspiration Answers
  const [whyThisField, setWhyThisField] = useState("");
  const [ultimateGoal, setUltimateGoal] = useState("");
  const [whyTv3, setWhyTv3] = useState("");
  
  const [submitted, setSubmitted] = useState(false);

  const roles = [
    { id: "editor", label: "Editor", urgent: true },
    { id: "director", label: "Director", urgent: true },
    { id: "production", label: "Production", urgent: false },
    { id: "cinematographer", label: "Cinematographer", urgent: false },
    { id: "music", label: "Music Producer", urgent: false },
    { id: "dj", label: "DJ", urgent: false },
    { id: "actor", label: "Actor", urgent: false },
    { id: "singer", label: "Singer", urgent: false }
  ];

  const handleSoftwareToggle = (sw: string) => {
    setSoftware(prev => 
      prev.includes(sw) ? prev.filter(x => x !== sw) : [...prev, sw]
    );
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      alert("File size exceeds 1.5MB limit. Please upload a smaller PDF/JPG.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setResumeData({
        name: file.name,
        dataUrl: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const scrollToGrid = () => {
    const gridEl = document.getElementById("broadcast-units-grid");
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;

    const application = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      contact,
      primaryRole,
      software: primaryRole === "editor" ? software : [],
      style: (primaryRole === "editor" || primaryRole === "director") ? style : "",
      speed: primaryRole === "editor" ? speed : "",
      experience: experience,
      portfolio: portfolio || "N/A",
      resumeData,
      customAnswer1,
      customAnswer2,
      whyThisField,
      ultimateGoal,
      whyTv3,
      timestamp: new Date().toISOString()
    };

    const existing = localStorage.getItem("tv3_intake_applications");
    const list = existing ? JSON.parse(existing) : [];
    list.push(application);
    localStorage.setItem("tv3_intake_applications", JSON.stringify(list));

    if (supabase) {
      try {
        await supabase.from('tv3_intake_applications').insert([application]);
      } catch (err) {
        console.error("Supabase insert error:", err);
      }
    }

    setSubmitted(true);
    setTimeout(() => {
      setModalStep(5);
      setSubmitted(false);
    }, 800);
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setName("");
    setContact("");
    setPrimaryRole("editor");
    setSoftware([]);
    setStyle("");
    setSpeed("");
    setExperience("");
    setPortfolio("");
    setResumeData(null);
    setCustomAnswer1("");
    setCustomAnswer2("");
    setWhyThisField("");
    setUltimateGoal("");
    setWhyTv3("");
  };

  return (
    <div className="min-h-screen bg-background pt-20 font-mono">
      
      {/* 1. THE STUDIO JOURNEY & TIMELINE */}
      <section className="py-24 relative border-t border-white/5 overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl">
          
          <div className="mb-24 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs font-mono text-[#D4AF37] tracking-[1em] uppercase mb-12 font-black"
            >
              Studio Journey
            </motion.h2>

            <div className="mb-12">
               <motion.h3 
                 className="text-2xl md:text-5xl font-black italic tracking-tighter leading-none text-white max-w-5xl mx-auto"
               >
                 { "WITH STUDIO THE BRANDS MOVES AND TOGETHER THE MARKET MOVES.".split(" ").map((word, i) => (
                    <motion.span 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.8 }}
                      className={`inline-block mr-3 ${["STUDIO", "BRANDS", "MARKET"].includes(word) ? 'uppercase text-[#D4AF37]' : 'lowercase font-serif'}`}
                    >
                       {word}
                    </motion.span>
                 ))}
               </motion.h3>
             </div>
             
             <motion.p 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="font-mono text-[9px] text-white/40 uppercase tracking-[0.5em] mb-20"
             >
               Building the world of studio where everybody is chasing universe.
             </motion.p>

            {/* THE 18% JOURNEY BAR */}
            <div className="relative w-full max-w-4xl mx-auto h-[40px] flex flex-col justify-center mb-24">
               <div className="absolute w-full h-[1px] bg-white/10" />
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: '18%' }}
                 transition={{ duration: 2, ease: "easeOut" }}
                 className="absolute left-0 h-[2px] bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]" 
               />
               <div className="absolute left-[18%] -translate-x-1/2 flex flex-col items-center">
                  <motion.div 
                    animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-4 h-4 rounded-full bg-[#D4AF37] shadow-[0_0_20px_#D4AF37]"
                  />
               </div>
               {[40, 65, 85].map((pos) => (
                  <div key={pos} className="absolute" style={{ left: `${pos}%` }}>
                     <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  </div>
               ))}
            </div>

            <div className="mt-32 max-w-4xl mx-auto border-y border-white/5 py-12">
               <h4 className="text-sm md:text-md text-[#D4AF37] font-black italic tracking-[0.4em] uppercase mb-4">Unit Works</h4>
               <p className="font-serif text-white/40 text-lg md:text-xl italic leading-relaxed uppercase">
                  Every <span className="text-white">UNIT</span> is dedicated to the specific creation associated with their full-time focus.
               </p>
            </div>
          </div>

          {/* 2. THE BROADCAST UNITS GRID */}
          <div id="broadcast-units-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-24">
            
            {/* TvUnit 01 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="h-full"
            >
              <div className="flex flex-col h-full bg-yellow-500/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-yellow-500/30 hover:bg-yellow-500/10 transition-all">
                <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-1 pointer-events-none">
                  <Users className="w-10 h-10 text-yellow-500/20 group-hover:text-yellow-500/40 transition-colors" />
                  <span className="text-[9px] font-mono text-yellow-500/40 font-black">CREW 05</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10 pointer-events-none">TvUnit 01</h3>
                <p className="text-yellow-500/80 font-bold uppercase tracking-widest text-[10px] mb-6 relative z-10 pointer-events-none">Kids Content Services • Golden TV Branch</p>
                <p className="text-muted-foreground text-[13px] md:text-sm leading-relaxed mb-auto relative z-10 pointer-events-none">
                  Starting services for kids content as this is the billion-dollar niche. We believe in better creations for stories, generating higher quality through the most creative AI-driven experiences.
                </p>
                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/5 relative z-10">
                  <Link to="/unit/01" className="flex items-center gap-3 text-xs font-semibold text-red-500 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> LOCKED // UNDER UPGRADE
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* TvUnit 02 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="h-full"
            >
              <div className="flex flex-col h-full bg-emerald-500/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all">
                <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-1 pointer-events-none">
                  <Settings className="w-10 h-10 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors" />
                  <span className="text-[9px] font-mono text-emerald-500/40 font-black">CREW 09</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10 pointer-events-none">TvUnit 02</h3>
                <p className="text-emerald-500/80 font-bold uppercase tracking-widest text-[10px] mb-6 relative z-10 pointer-events-none">Webshow Release • In Production</p>
                <p className="text-muted-foreground text-[13px] md:text-sm leading-relaxed mb-auto relative z-10 pointer-events-none">
                  Releasing soon with 09 episodes... and in production. The studio is getting ahead with its experimental tech blend, accelerating the pipeline without losing the raw feel.
                </p>
                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/5 relative z-10">
                  <Link to="/unit/02" className="flex items-center gap-3 text-xs font-semibold text-red-500 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> LOCKED // UNDER UPGRADE
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* TvUnit 03 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="h-full"
            >
              <div className="flex flex-col h-full bg-blue-500/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-blue-500/30 hover:bg-blue-500/10 transition-all">
                <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-1 pointer-events-none">
                  <Cpu className="w-10 h-10 text-blue-500/20 group-hover:text-blue-500/40 transition-colors" />
                  <span className="text-[9px] font-mono text-blue-500/40 font-black">CREW 15</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10 pointer-events-none">TvUnit 03</h3>
                <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-6 relative z-10 pointer-events-none">YouTube Pipeline • In Creation</p>
                <p className="text-muted-foreground text-[13px] md:text-sm leading-relaxed mb-auto relative z-10 pointer-events-none">
                  Synthesizing regional YouTube pipelines to drive targeted organic connection. Structuring original music videos paired with localized satire and visual mediums, focusing strictly on developing our immediate home market first.
                </p>
                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/5 relative z-10">
                  <Link to="/unit/03" className="flex items-center gap-3 text-xs font-semibold text-red-500 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> LOCKED // UNDER UPGRADE (36% DONE)
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* TvUnit 04 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="h-full"
            >
              <div className="flex flex-col h-full bg-purple-500/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-purple-500/30 hover:bg-purple-500/10 transition-all">
                <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-1 pointer-events-none">
                  <Cpu className="w-10 h-10 text-purple-500/20 group-hover:text-purple-500/40 transition-colors" />
                  <span className="text-[9px] font-mono text-purple-500/40 font-black">CREW 06</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10 pointer-events-none">TvUnit 04</h3>
                <p className="text-purple-400 font-bold uppercase tracking-widest text-[10px] mb-6 relative z-10 pointer-events-none">Branding and Advertisement Services</p>
                <p className="text-muted-foreground text-[13px] md:text-sm leading-relaxed mb-auto relative z-10 pointer-events-none">
                  Built strictly for collaboration and personal growth together. We provide comprehensive brand architecture for peers and businesses ready to elevate.
                </p>
                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/5 relative z-10">
                  <Link to="/unit/04" className="flex items-center gap-3 text-xs font-semibold text-red-500 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> LOCKED // UNDER UPGRADE
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* TvUnit 05 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="h-full"
            >
              <div className="flex flex-col h-full bg-[#f7d08a]/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-[hsl(43_72%_55%)]/30 hover:bg-[hsl(43_72%_55%)]/10 transition-all">
                <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-1 pointer-events-none">
                  <Users className="w-12 h-12 text-[hsl(43_72%_55%)]/20 group-hover:text-[hsl(43_72%_55%)]/40 transition-colors" />
                  <span className="text-[9px] font-mono text-[hsl(43_72%_55%)]/40 font-black">CREW 25</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10 pointer-events-none">TvUnit 05</h3>
                <p className="text-[hsl(43_72%_55%)] font-bold uppercase tracking-widest text-[10px] mb-6 relative z-10 pointer-events-none">Partner with the Empire</p>
                <p className="text-muted-foreground text-[13px] md:text-sm leading-relaxed mb-auto relative z-10 pointer-events-none">
                  The grand culmination. A real, physically shot webseries based out of the state, aiming directly at connecting the youth. A premium OTT production standing as the heart of our cinematic journey. We are creating unique concepts with high technical knowledge.
                </p>
                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/5 relative z-10">
                  <Link to="/unit/05" className="flex items-center gap-3 text-xs font-semibold text-red-500 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> LOCKED // UNDER UPGRADE
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* TvUnit 06 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 }}
               className="h-full"
            >
              <div className="flex flex-col h-full bg-[#00FF66]/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-[#00FF66]/30 hover:bg-[#00FF66]/10 transition-all">
                <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-1 pointer-events-none">
                  <PlayCircle className="w-10 h-10 text-[#00FF66]/20 group-hover:text-[#00FF66]/40 transition-colors" />
                  <span className="text-[9px] font-mono text-[#00FF66]/40 font-black">CREW 12</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10 pointer-events-none">TvUnit 06</h3>
                <p className="text-[#00FF66]/80 font-bold uppercase tracking-widest text-[10px] mb-6 relative z-10 pointer-events-none">AI Innovation • Experimental Hub</p>
                <p className="text-muted-foreground text-[13px] md:text-sm leading-relaxed mb-auto relative z-10 pointer-events-none">
                  The studio is innovating itself to create the global digital show. Taking us into AI innovation in art, visual, and audio technology to showcase our highest creativity and push storytelling boundaries.
                </p>
                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/5 relative z-10 mt-auto">
                  <Link to="/unit/06" className="flex items-center gap-3 text-xs font-semibold text-red-500 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> LOCKED // UNDER UPGRADE
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* JOIN PIPELINE INVITATION PANEL - BROUGHT AFTER ALL THE TV UNITS */}
          <div className="mt-20 max-w-4xl mx-auto border border-white/5 bg-[#050505] p-6 md:p-8 rounded-3xl text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-red-950/60 border-l border-b border-red-500/20 text-red-500 font-mono text-[9px] uppercase tracking-widest font-black flex items-center gap-1.5 z-10">
              <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" /> URGENT INTAKE: EDITORS & DIRECTORS
            </div>

            <div className="max-w-2xl relative z-10 font-mono">
              <h4 className="text-sm text-[hsl(43_72%_55%)] uppercase tracking-[0.2em] mb-2">JOIN THE PIPELINE // INTAKE v2.3</h4>
              <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-4">
                RECRUITING EDITORS & DIRECTORS FOR TV UNITS
              </h3>
              <p className="text-xs text-zinc-500 uppercase tracking-wider leading-relaxed mb-6">
                The studio is scaling its next campaigns. Freshers & experienced operatives are invited to apply for matching TvUnits across: <span className="text-white">Direction, Editing, Production, Cinematography, Music Production, DJing, Acting, and Singing</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[hsl(43_72%_55%)] hover:bg-white text-black font-display text-xs uppercase font-black tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:scale-[1.02]"
                >
                  <UserPlus className="w-4 h-4" />
                  Submit Interest Form
                </button>
                <button
                  onClick={scrollToGrid}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-white/10 hover:border-white/30 text-white font-display text-xs uppercase font-bold tracking-widest rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Explore Active Units
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <CinematicReel />
      <Footer />

      {/* Interactive Screening Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#070707] border border-white/10 rounded-[2rem] w-full max-w-xl p-6 md:p-8 font-mono relative text-left shadow-[0_20px_50px_rgba(0,0,0,0.9)] my-8"
            >
              {/* Close Button */}
              <button 
                onClick={resetForm}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[hsl(43_72%_55%)] animate-pulse" />
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Intake Filter Terminal // Step {modalStep} of 5</span>
              </div>

              {/* Step 1: Basic credentials */}
              {modalStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-2">Operative Credentials</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Enter name and secure contact credentials</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-zinc-500 uppercase tracking-widest">FULL NAME</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. ALEX CARTER"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-zinc-500 uppercase tracking-widest">CONTACT INFO (PHONE / EMAIL)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. +91 99999 99999 or alex@email.com"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => name && contact && setModalStep(2)}
                    disabled={!name || !contact}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[hsl(43_72%_55%)] hover:bg-white text-black disabled:opacity-30 disabled:hover:bg-[hsl(43_72%_55%)] font-display text-xs uppercase font-black tracking-widest rounded-xl transition-all duration-300 mt-4"
                  >
                    Proceed to Role Parameters
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: Role selection */}
              {modalStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-2">Role Alignment</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Select your primary alignment field</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                    {roles.map((role) => {
                      const isSelected = primaryRole === role.id;
                      return (
                        <div 
                          key={role.id}
                          onClick={() => setPrimaryRole(role.id)}
                          className={`px-3.5 py-3 rounded-xl border text-[10px] uppercase font-bold tracking-wider cursor-pointer flex items-center justify-between transition-all select-none ${
                            isSelected 
                              ? 'bg-[hsl(43_72%_55%)]/15 border-[hsl(43_72%_55%)] text-[hsl(43_72%_55%)] shadow-[0_0_15px_rgba(212,175,55,0.05)]' 
                              : 'bg-zinc-950 border-white/5 text-zinc-500 hover:border-white/10 hover:text-zinc-300'
                          }`}
                        >
                          <span>{role.label}</span>
                          {role.urgent && (
                            <span className="text-[8px] bg-red-950 text-red-500 border border-red-500/20 px-1.5 py-0.5 rounded font-black">
                              URGENT
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setModalStep(1)}
                      className="flex-1 px-4 py-3.5 bg-transparent border border-white/10 text-zinc-400 hover:text-white rounded-xl text-xs uppercase font-bold tracking-widest transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setModalStep(3)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-[hsl(43_72%_55%)] hover:bg-white text-black font-display text-xs uppercase font-black tracking-widest rounded-xl transition-all duration-300"
                    >
                      Initialize Screening
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Screening filter questions (Tailored by Role Category) */}
              {modalStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-2">Technical Alignment</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Declare your technical parameters & upload credentials</p>
                  </div>

                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    
                    {/* 1. EDITOR QUESTIONS */}
                    {primaryRole === "editor" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[9px] text-zinc-500 uppercase tracking-widest block">Software Mastery</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["DaVinci Resolve", "Premiere Pro", "After Effects", "Final Cut Pro"].map((sw) => {
                              const isChecked = software.includes(sw);
                              return (
                                <div 
                                  key={sw}
                                  onClick={() => handleSoftwareToggle(sw)}
                                  className={`px-3 py-2.5 rounded-xl border text-[9px] uppercase font-bold tracking-wider cursor-pointer flex items-center justify-between transition-all select-none ${
                                    isChecked ? 'bg-white/10 border-white text-white' : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300'
                                  }`}
                                >
                                  <span>{sw}</span>
                                  {isChecked && <span className="text-[10px]">✓</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] text-zinc-500 uppercase tracking-widest block">Turnaround Commitments</label>
                          <div className="grid grid-cols-3 gap-2">
                            {["Under 24h", "Under 48h", "3+ Days"].map((sp) => {
                              const isChecked = speed === sp;
                              return (
                                <div 
                                  key={sp}
                                  onClick={() => setSpeed(sp)}
                                  className={`px-3 py-2 rounded-xl border text-[8px] md:text-[9px] uppercase font-bold tracking-widest cursor-pointer text-center transition-all select-none ${
                                    isChecked ? 'bg-white/10 border-white text-white' : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300'
                                  }`}
                                >
                                  {sp}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}

                    {/* 2. DIRECTOR QUESTIONS */}
                    {primaryRole === "director" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[9px] text-zinc-500 uppercase tracking-widest block">Primary Directing Style</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["UGC Ad Reels", "Narrative Fiction", "Music Videos", "Satire / Comedy"].map((sty) => {
                              const isChecked = style === sty;
                              return (
                                <div 
                                  key={sty}
                                  onClick={() => setStyle(sty)}
                                  className={`px-3 py-2 rounded-xl border text-[9px] uppercase font-bold tracking-widest cursor-pointer text-center transition-all select-none ${
                                    isChecked ? 'bg-white/10 border-white text-white' : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300'
                                  }`}
                                >
                                  {sty}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] text-zinc-500 uppercase tracking-widest block">Staging & Pre-Production Focus</label>
                          <div className="grid grid-cols-3 gap-2">
                            {["Moodboards", "Storyboards", "Script-Focus"].map((p) => {
                              const isChecked = customAnswer1 === p;
                              return (
                                <div 
                                  key={p}
                                  onClick={() => setCustomAnswer1(p)}
                                  className={`px-3 py-2 rounded-xl border text-[8px] md:text-[9px] uppercase font-bold tracking-widest cursor-pointer text-center transition-all select-none ${
                                    isChecked ? 'bg-white/10 border-white text-white' : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300'
                                  }`}
                                >
                                  {p}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}

                    {/* 3. PRODUCTION QUESTIONS */}
                    {primaryRole === "production" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[9px] text-zinc-500 uppercase tracking-widest block">Management Platform Mastery</label>
                          <div className="grid grid-cols-3 gap-2">
                            {["Notion / Sheets", "Trello", "Excel / PMs"].map((m) => {
                              const isChecked = customAnswer1 === m;
                              return (
                                <div 
                                  key={m}
                                  onClick={() => setCustomAnswer1(m)}
                                  className={`px-3 py-2 rounded-xl border text-[8px] md:text-[9px] uppercase font-bold tracking-widest cursor-pointer text-center transition-all select-none ${
                                    isChecked ? 'bg-white/10 border-white text-white' : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300'
                                  }`}
                                >
                                  {m}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}

                    {/* 4. CINEMATOGRAPHER QUESTIONS */}
                    {primaryRole === "cinematographer" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[9px] text-zinc-500 uppercase tracking-widest block">Camera Rig Mastery</label>
                          <div className="grid grid-cols-3 gap-2">
                            {["Mirrorless/DSLR", "RED / ARRI", "Gimbal/Drones"].map((c) => {
                              const isChecked = customAnswer1 === c;
                              return (
                                <div 
                                  key={c}
                                  onClick={() => setCustomAnswer1(c)}
                                  className={`px-3 py-2 rounded-xl border text-[8px] md:text-[9px] uppercase font-bold tracking-widest cursor-pointer text-center transition-all select-none ${
                                    isChecked ? 'bg-white/10 border-white text-white' : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300'
                                  }`}
                                >
                                  {c}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}

                    {/* 5. MUSIC PRODUCER QUESTIONS */}
                    {primaryRole === "music" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[9px] text-zinc-500 uppercase tracking-widest block">Primary Audio DAW</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["Ableton Live", "FL Studio", "Logic Pro", "Pro Tools"].map((daw) => {
                              const isChecked = customAnswer1 === daw;
                              return (
                                <div 
                                  key={daw}
                                  onClick={() => setCustomAnswer1(daw)}
                                  className={`px-3 py-2.5 rounded-xl border text-[9px] uppercase font-bold tracking-widest cursor-pointer text-center transition-all select-none ${
                                    isChecked ? 'bg-white/10 border-white text-white' : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300'
                                  }`}
                                >
                                  {daw}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}

                    {/* 6. DJ QUESTIONS */}
                    {primaryRole === "dj" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[9px] text-zinc-500 uppercase tracking-widest block">Live Performance Focus</label>
                          <div className="grid grid-cols-3 gap-2">
                            {["Festivals", "Satire/Background", "Staging/Events"].map((djStyle) => {
                              const isChecked = customAnswer1 === djStyle;
                              return (
                                <div 
                                  key={djStyle}
                                  onClick={() => setCustomAnswer1(djStyle)}
                                  className={`px-3 py-2 rounded-xl border text-[8px] md:text-[9px] uppercase font-bold tracking-widest cursor-pointer text-center transition-all select-none ${
                                    isChecked ? 'bg-white/10 border-white text-white' : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300'
                                  }`}
                                >
                                  {djStyle}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}

                    {/* 7. ACTING / SINGER QUESTIONS */}
                    {(primaryRole === "actor" || primaryRole === "singer") && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[9px] text-zinc-500 uppercase tracking-widest block">Style & Range</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["Satire / Comedy", "Serious Drama", "Melodic Vocals", "Voiceover / Dub"].map((rng) => {
                              const isChecked = customAnswer1 === rng;
                              return (
                                <div 
                                  key={rng}
                                  onClick={() => setCustomAnswer1(rng)}
                                  className={`px-3 py-2 rounded-xl border text-[9px] uppercase font-bold tracking-widest cursor-pointer text-center transition-all select-none ${
                                    isChecked ? 'bg-white/10 border-white text-white' : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300'
                                  }`}
                                >
                                  {rng}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Experience Level for All Roles */}
                    <div className="space-y-2">
                      <label className="text-[9px] text-zinc-500 uppercase tracking-widest block">Experience Level</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Fresher / Entry Level", "1-3 Years", "3+ Years"].map((exp) => {
                          const isChecked = experience === exp;
                          return (
                            <div 
                              key={exp}
                              onClick={() => setExperience(exp)}
                              className={`px-3 py-2.5 rounded-xl border text-[8px] md:text-[9px] uppercase font-bold tracking-wider cursor-pointer text-center transition-all select-none ${
                                isChecked ? 'bg-white/10 border-white text-white' : 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {exp}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional Portfolio Link Input */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-zinc-500 uppercase tracking-widest">PORTFOLIO LINK / REEL (OPTIONAL)</label>
                      <input 
                        type="url" 
                        placeholder="YouTube, Drive, or Vimeo link (can leave blank)"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors"
                      />
                    </div>

                    {/* Resume Upload supporting PDF / JPG / PNG */}
                    <div className="space-y-1.5 pt-2">
                      <label className="text-[9px] text-zinc-500 uppercase tracking-widest block">Upload Resume (PDF, JPG, PNG)</label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleResumeChange}
                          className="hidden"
                          id="resume-file-upload"
                        />
                        <label 
                          htmlFor="resume-file-upload"
                          className="px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white cursor-pointer hover:border-white/20 transition-colors"
                        >
                          Choose Document
                        </label>
                        <span className="text-[10px] text-zinc-500 truncate max-w-[200px]">
                          {resumeData ? resumeData.name : "No file chosen (Max 1.5MB)"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setModalStep(2)}
                      className="flex-1 px-4 py-3.5 bg-transparent border border-white/10 text-zinc-400 hover:text-white rounded-xl text-xs uppercase font-bold tracking-widest transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setModalStep(4)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-[hsl(43_72%_55%)] hover:bg-white text-black font-display text-xs uppercase font-black tracking-widest rounded-xl transition-all duration-300"
                    >
                      Proceed to Aspirations
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Aspiration & Alignment Essay Questions */}
              {modalStep === 4 && (
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-tight mb-2">Aspiration screening</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Help us evaluate creative alignment and vision</p>
                  </div>

                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-1.5">
                      <label className="text-[9px] text-zinc-500 uppercase tracking-widest">1. Why did you choose this creative field?</label>
                      <textarea 
                        required
                        placeholder="Tell us about your entry and passion for this medium..."
                        value={whyThisField}
                        onChange={(e) => setWhyThisField(e.target.value)}
                        rows={2}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] text-zinc-500 uppercase tracking-widest">2. What is your ultimate creative goal or dream project?</label>
                      <textarea 
                        required
                        placeholder="What do you aspire to build or direct?"
                        value={ultimateGoal}
                        onChange={(e) => setUltimateGoal(e.target.value)}
                        rows={2}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] text-zinc-500 uppercase tracking-widest">3. Why do you want to collaborate with TV³ Studios specifically?</label>
                      <textarea 
                        required
                        placeholder="What draws you to our production environment?"
                        value={whyTv3}
                        onChange={(e) => setWhyTv3(e.target.value)}
                        rows={2}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setModalStep(3)}
                      className="flex-1 px-4 py-3.5 bg-transparent border border-white/10 text-zinc-400 hover:text-white rounded-xl text-xs uppercase font-bold tracking-widest transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitted}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-[hsl(43_72%_55%)] hover:bg-white text-black font-display text-xs uppercase font-black tracking-widest rounded-xl transition-all duration-300"
                    >
                      {submitted ? "Registering..." : "Submit File"}
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 5: Success confirmation */}
              {modalStep === 5 && (
                <div className="py-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/30 border border-emerald-500/30 text-emerald-500 mx-auto flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base uppercase tracking-widest text-emerald-500 font-bold">OPERATIVE PROFILE REGISTERED</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed mt-2 max-w-sm mx-auto">
                      Thank you. Your filter credentials have been securely stored in the TV³ executive pipeline. The Director will review your case file shortly.
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-zinc-900 hover:bg-white hover:text-black border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    Close Portal
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
