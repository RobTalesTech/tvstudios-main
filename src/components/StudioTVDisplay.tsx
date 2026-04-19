import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Play, Zap, Power, ChevronRight, ChevronLeft, X, Volume2, Signal, Headphones, Menu, Monitor, Disc3, AlertCircle } from "lucide-react";

// --- Data Models for Audio TV ---
const AI_SONGS = [
  { id: "s1", title: "Brand Zingles", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "s2", title: "Corporate Songs", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "s3", title: "Personal Songs", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "s4", title: "Songs for Entrepreneurs", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
];

const DJ_SERVICES = [
  { id: "d1", title: "Corporate DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", color: "blue", speed: 0.6 },
  { id: "d2", title: "Residential DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", color: "emerald", speed: 0.8 },
  { id: "d3", title: "Event DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", color: "purple", speed: 1 },
  { id: "d4", title: "Personal Party DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", color: "rose", speed: 1.2 },
  { id: "d5", title: "Festive DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", color: "orange", speed: 1.5 },
];

interface ServiceItem {
  id: string;
  name: string;
  price: string;
  channel: string;
  desc?: string;
  hasAudio?: boolean;
}

interface TVVariant {
  id: string;
  name: string;
  color: string;
  frameTexture: string; 
  cursorColor: string;
  desc: string;
  variant: "gold" | "silver" | "obsidian" | "audio";
  services?: ServiceItem[];
}

const STATION_ARRAY: TVVariant[] = [
  { 
    id: "TV01", 
    name: "GOLDEN TV: CREATIVE CONTENT CREATIONS", 
    color: "#D4AF37", 
    variant: "gold",
    frameTexture: "linear-gradient(135deg, #f7d08a 0%, #D4AF37 50%, #8a6d3b 100%)", 
    cursorColor: "#f7d08a",
    desc: "CREATIVE CONTENT CREATION WITH CONSULTANCY",
    services: [
      { id: "S1", channel: "01", name: "LOGO DESIGN", price: "₹501" },
      { id: "S2", channel: "02", name: "BRAND ZINGLE (30s)", price: "₹301", hasAudio: true },
      { id: "S3", channel: "03", name: "CREATIVE AD (15s)", price: "₹1,501" }
    ]
  },
  { 
    id: "TV02", 
    name: "SEARCH DIRECT // ACCESS HUB", 
    color: "#e2e2e2", 
    variant: "silver",
    frameTexture: "linear-gradient(135deg, #ffffff 0%, #a1a1a1 50%, #444444 100%)", 
    cursorColor: "#fff",
    desc: "FASTEST NAVIGATION // INSTANT ACCESS"
  },
  { 
    id: "TV03", 
    name: "OBSIDIAN VAULT", 
    color: "#111", 
    variant: "obsidian",
    frameTexture: "linear-gradient(135deg, #333 0%, #000 50%, #111 100%)", 
    cursorColor: "#ff2e63",
    desc: "PERSONAL DIRECT ACCESS // ENCRYPTED"
  },
  { 
    id: "TV04", 
    name: "FREQUENCY TV", 
    color: "#10B981", 
    variant: "audio",
    frameTexture: "linear-gradient(135deg, #064e3b 0%, #10B981 50%, #065f46 100%)", 
    cursorColor: "#10B981",
    desc: "AUDIO COMMAND CENTRE",
    services: [
      { id: "A1", channel: "01", name: "AUDIO PRODUCTION", price: "₹1,501" },
      { id: "A2", channel: "02", name: "DJ SERVICES", price: "₹2,501" }
    ]
  }
];

const DIRECT_ITEMS = [
  { id: "d1", name: "LOGO DESIGN", category: "Station 01", type: "Service", action: (s: any) => { s.setEngagedId("TV01"); s.setSelectedChannel("01"); } },
  { id: "d2", name: "BRAND ZINGLE", category: "Station 01", type: "Service", action: (s: any) => { s.setEngagedId("TV01"); s.setSelectedChannel("02"); } },
  { id: "d3", name: "CREATIVE AD", category: "Station 01", type: "Service", action: (s: any) => { s.setEngagedId("TV01"); s.setSelectedChannel("03"); } },
  { id: "d4", name: "AUDIO PRODUCTION", category: "Frequency TV", type: "Service", action: (s: any) => { s.setEngagedId("TV04"); s.setSelectedChannel("01"); } },
  { id: "d5", name: "DJ SERVICES", category: "Frequency TV", type: "Service", action: (s: any) => { s.setEngagedId("TV04"); s.setSelectedChannel("02"); } },
  { id: "d6", name: "UNIT 01: IMAGINATIVE", category: "Studio Floor", type: "Unit", path: "/unit/01" },
  { id: "d7", name: "UNIT 02: WEBSHOW", category: "Studio Floor", type: "Unit", path: "/unit/02" },
  { id: "d8", name: "UNIT 03: THE BLEND", category: "Studio Floor", type: "Unit", path: "/unit/03" },
  { id: "d9", name: "UNIT 05: FLAGSHIP OTT", category: "Studio Floor", type: "Unit", path: "/unit/05" },
  { id: "d10", name: "UNIT 06: AI LAB", category: "Studio Floor", type: "Unit", path: "/unit/06" },
  { id: "d11", name: "TEAM CONTACT", category: "Corporate", type: "Page", path: "/team" },
  { id: "d12", name: "FOUNDER STORY", category: "Corporate", type: "Page", path: "/founder-story" },
  { id: "d13", name: "STUDIO WORK", category: "Corporate", type: "Page", path: "/studio-work" },
];

const StudioTVDisplay = () => {
  const [engagedId, setEngagedId] = useState<string | null>(null);
  const [isBooting, setIsBooting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [showStatusMsg, setShowStatusMsg] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Audio Block States
  const [activeAudioUri, setActiveAudioUri] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [audioTab, setAudioTab] = useState<"ai" | "original">("ai");

  const activeStation = STATION_ARRAY.find(s => s.id === engagedId);

  // SFX
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playSound = (type: 'pop' | 'click' | 'beep') => {
    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtxRef.current;
    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.01);
    } else if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'beep') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.3);
    }
  };

  useEffect(() => {
    if (engagedId) {
      document.body.style.overflow = "hidden";
      document.body.style.cursor = (engagedId === 'TV04' || engagedId === 'TV02') ? "auto" : "none";
      if (engagedId === 'TV04' || engagedId === 'TV02') {
        setIsBooting(false);
      } else {
        setIsBooting(true);
      }
      playSound('pop');
      const bootTimer = setTimeout(() => setIsBooting(false), 800);
      return () => clearTimeout(bootTimer);
    } else {
      document.body.style.overflow = "auto";
      document.body.style.cursor = "auto";
      setIsMenuOpen(false);
      setSelectedChannel(null);
      setShowStatusMsg(false);
      resetAudio();
    }
  }, [engagedId]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const toggleAudio = (id: string, url: string) => {
    if (activeId === id) {
      setActiveId(null);
      setActiveAudioUri(null);
    } else {
      setActiveId(id);
      setActiveAudioUri(url);
    }
  };

  const resetAudio = () => {
    setActiveId(null);
    setActiveAudioUri(null);
  };

  const handleServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playSound('beep');
    setShowStatusMsg(true);
  };

  const isAudioPlaying = (id: string) => activeId === id;
  const isDjPlaying = activeId?.startsWith("d");
  const isAudioProdPlaying = activeId?.startsWith("s");
  const activeDjObj = DJ_SERVICES.find(d => d.id === activeId);

  const getColorHex = (color?: string) => {
    switch(color) {
      case 'blue': return '#3b82f6';
      case 'emerald': return '#10b981';
      case 'purple': return '#a855f7';
      case 'rose': return '#f43f5e';
      case 'orange': return '#f97316';
      default: return '#71717a';
    }
  };

  const curSvc = activeStation?.services?.find(s => s.channel === selectedChannel);

  return (
    <div id="station-container" className="relative w-screen bg-black overflow-x-hidden">
      
      {/* 1. SELECTION STATIONS */}
      <div className="flex flex-col items-center w-full">
        {STATION_ARRAY.map((station) => (
          <section key={station.id} className="h-screen w-screen flex items-center justify-center p-2 snap-start relative">
             <motion.div 
                layoutId={`tv-unit-${station.id}`}
                onClick={() => setEngagedId(station.id)}
                className="relative h-[45vh] aspect-[16/9] flex flex-col items-center justify-center cursor-pointer group"
             >
                <div 
                  className="relative w-full h-full p-1 border-[4px] border-[#0c0c0b] rounded-[1rem] bg-black shadow-[0_40px_100px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden"
                  style={{ background: station.frameTexture }}
                >
                   <div className="w-full h-full bg-[#030303] rounded-lg flex flex-col items-center justify-center relative">
                      <div className="p-8 border-2 border-white/5 rounded-full group-hover:bg-[#D4AF37] transition-all">
                         <Play className="w-10 h-10 group-hover:text-black transition-colors" />
                      </div>
                      <span className="absolute bottom-10 font-serif text-[10px] text-zinc-800 tracking-[0.5em] group-hover:text-white uppercase transition-colors">{station.name}</span>
                   </div>
                </div>
                <div className="absolute bottom-[-1.5%] left-1/2 -translate-x-1/2">
                   <div className={`w-[120px] h-[18px] ${station.variant === 'gold' ? 'bg-[#8a6d3b]' : 'bg-zinc-800'} clip-triangle shadow-2xl`} 
                        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                </div>
             </motion.div>
          </section>
        ))}
      </div>

      {/* 2. BROADCAST GLASS (DIVE) */}
      <AnimatePresence>
        {engagedId && activeStation && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[5000] bg-black/99 backdrop-blur-3xl flex items-center justify-center overflow-hidden p-[5vh] ${engagedId === 'TV04' ? 'cursor-auto' : 'cursor-none'}`}
          >
             <motion.div 
               layoutId={`tv-unit-${engagedId}`}
               onMouseMove={handleMouseMove}
               className="relative h-full aspect-[16/9] flex flex-col items-center justify-center bg-black rounded-[2.5rem] p-0.5 overflow-hidden shadow-[0_0_150px_rgba(212,175,55,0.3)]"
               style={{ 
                 maxHeight: '85vh', 
                 maxWidth: '95vw', 
                 background: activeStation.frameTexture,
                 boxShadow: activeStation.variant === 'audio' ? '0 0 150px rgba(16,185,129,0.3)' : undefined
               }}
             >
                <div className={`relative w-full h-full rounded-[2.2rem] flex flex-col overflow-hidden transition-colors duration-800 ${activeStation.variant === 'gold' ? 'bg-white' : 'bg-[#010101]'}`}>
                   
                   {/* STARTUP FLASH */}
                   <AnimatePresence>
                      {isBooting && (
                         <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white z-[7000] pointer-events-none flex items-center justify-center">
                            <motion.span animate={{ opacity: [0, 1, 0, 1] }} transition={{ duration: 0.1, repeat: 8 }} className="font-serif text-black text-5xl font-black italic">INITIALIZING...</motion.span>
                         </motion.div>
                      )}
                   </AnimatePresence>

                   {/* DIGITAL OSD MESSAGE */}
                   <AnimatePresence>
                      {showStatusMsg && (
                         <motion.div 
                           initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                           className="absolute top-12 left-1/2 -translate-x-1/2 z-[9000] min-w-[320px]"
                         >
                            <div className="bg-[#0c0c0c] border-2 border-emerald-500/40 p-1 flex flex-col shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                               <div className="bg-emerald-500/10 px-6 py-2 flex justify-between items-center border-b border-emerald-500/20">
                                  <span className="font-mono text-[8px] text-emerald-500 font-black uppercase tracking-[0.4em]">SYSTEM RESPONSE</span>
                                  <button onClick={() => setShowStatusMsg(false)} className="text-emerald-500/40 hover:text-emerald-500 transition-colors"><X className="w-4 h-4" /></button>
                               </div>
                               <div className="p-8 text-center flex flex-col items-center">
                                  <AlertCircle className="w-10 h-10 text-emerald-500 mb-4 animate-pulse" />
                                  <p className="font-mono text-zinc-300 text-[10px] uppercase font-bold tracking-[0.2em] mb-6 leading-relaxed">PROTOCOL ENCRYPTED<br />UNLOCKING ON:</p>
                                  <span className="font-mono text-emerald-500 text-2xl font-black tracking-widest bg-emerald-500/5 px-6 py-2 border border-emerald-500/20">05 JUNE 2026</span>
                                  <div className="mt-6 flex gap-3">
                                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                     <div className="w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse delay-75" />
                                     <div className="w-2 h-2 rounded-full bg-emerald-500/20 animate-pulse delay-150" />
                                  </div>
                               </div>
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>

                   {/* GOLD CROSSHAIR (HIDDEN FOR TV04) */}
                   {engagedId !== 'TV04' && (
                     <motion.div animate={{ x: mousePos.x, y: mousePos.y }} className="absolute top-0 left-0 pointer-events-none z-[8000] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-10 h-10 relative flex items-center justify-center">
                           <div className="absolute w-[1.5px] h-full bg-[#D4AF37]" />
                           <div className="absolute h-[1.5px] w-full bg-[#D4AF37]" />
                           <div className="w-4 h-4 border-2 border-[#D4AF37] rounded-full" />
                        </div>
                     </motion.div>
                   )}

                   {/* BROADCAST HEADER */}
                   <div className={`px-16 py-10 border-b ${activeStation.variant === 'gold' ? 'border-black/5' : 'border-white/5'} flex flex-col items-center relative`}>
                      {(selectedChannel || isMenuOpen) && (
                         <button 
                           onClick={() => { setSelectedChannel(null); setIsMenuOpen(false); resetAudio(); playSound('click'); }}
                           className={`absolute left-10 top-1/2 -translate-y-1/2 flex items-center gap-3 px-8 py-4 border-4 ${activeStation.variant === 'gold' ? 'border-black bg-white text-black' : 'border-white bg-black text-white'} font-serif font-black italic text-xl uppercase hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer`}
                         >
                            <ChevronLeft className="w-6 h-6" />
                            BACK
                         </button>
                      )}

                      <h2 className={`font-serif ${activeStation.variant === 'audio' ? 'text-emerald-500' : 'text-[#D4AF37]'} text-3xl font-black tracking-tighter uppercase leading-none text-center`}>
                        {activeStation.name}
                      </h2>
                      
                      <div className="relative mt-6">
                         <button 
                           onClick={() => { setIsMenuOpen(!isMenuOpen); playSound('click'); }}
                           className={`flex items-center gap-6 px-10 py-4 ${activeStation.variant === 'audio' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-black text-[#D4AF37]'} border-2 hover:bg-[#D4AF37] hover:text-black transition-all group cursor-pointer`}
                         >
                            <Menu className="w-5 h-5" />
                            <span className="font-serif text-xl font-black italic tracking-widest uppercase">{engagedId === 'TV04' ? "Select Audio Services" : "Service Menu"}</span>
                         </button>

                         <AnimatePresence>
                           {isMenuOpen && (
                              <motion.div 
                                initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                className={`absolute top-[110%] left-1/2 -translate-x-1/2 w-[400px] bg-black border-4 ${activeStation.variant === 'audio' ? 'border-emerald-500' : 'border-[#D4AF37]'} z-[6000] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden`}
                              >
                                 {activeStation.services?.map((svc) => (
                                    <button 
                                      key={svc.id}
                                      onClick={() => { setSelectedChannel(svc.channel); setIsMenuOpen(false); resetAudio(); playSound('click'); }}
                                      className={`w-full p-6 border-b ${activeStation.variant === 'audio' ? 'border-emerald-500/20' : 'border-[#D4AF37]/20'} flex justify-between items-center ${activeStation.variant === 'audio' ? 'hover:bg-emerald-500' : 'hover:bg-[#D4AF37]'} group transition-all text-left cursor-pointer`}
                                    >
                                       <div className="flex flex-col">
                                          <span className={`font-mono text-[9px] ${activeStation.variant === 'audio' ? 'text-emerald-500' : 'text-[#D4AF37]'} group-hover:text-black font-black tracking-widest uppercase mb-1`}>CH {svc.channel}</span>
                                          <span className="font-serif text-white group-hover:text-black text-xl font-black italic uppercase">{engagedId === 'TV04' ? `CH ${svc.channel} — ${svc.name}` : svc.name}</span>
                                       </div>
                                       {engagedId !== 'TV04' && <span className="font-serif text-white group-hover:text-black text-2xl font-black italic">{svc.price}</span>}
                                    </button>
                                 ))}
                              </motion.div>
                           )}
                         </AnimatePresence>
                      </div>

                      {!selectedChannel && !isMenuOpen && (
                        <button onClick={() => setEngagedId(null)} className="absolute right-10 top-1/2 -translate-y-1/2 p-5 bg-black text-white hover:bg-[#ff2e63] transition-all z-[6000] shadow-xl cursor-pointer">
                           <Power className="w-8 h-8" />
                        </button>
                      )}
                   </div>

                   {/* BROADCAST MAIN PLATE */}
                   <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-black">
                      <AnimatePresence mode="wait">
                         {selectedChannel && curSvc ? (
                            <motion.div 
                              key={selectedChannel} initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1 }}
                              className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden"
                            >
                               {/* --- ORIGINAL PICTORIAL REPRODUCTION --- */}
                               {engagedId === 'TV04' && selectedChannel === '01' ? (
                                  <motion.div 
                                     initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                                     className="relative w-full max-w-4xl rounded-3xl border border-[hsl(43_72%_55%)]/20 bg-black/50 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_30px_hsla(43,72%,55%,0.05)] overflow-hidden flex flex-col cursor-auto"
                                  >
                                    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,20,1)_0%,_rgba(10,10,10,0)_100%)] blur-[40px] opacity-60" />
                                    <motion.div animate={isAudioProdPlaying ? { backgroundPosition: ["0px 0px", "40px 40px"], opacity: [0, 0.3, 0] } : { opacity: 0.1 }} transition={isAudioProdPlaying ? { duration: 5, repeat: Infinity, ease: "linear" } : { duration: 1 }} className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }} />
                                    <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] pointer-events-none z-0 transition-colors duration-1000 ${isAudioProdPlaying ? "bg-[hsl(43_72%_55%)]/30" : "bg-[hsl(43_72%_55%)]/10"}`} />
                                    
                                    <div className="relative border-4 border-[#111] rounded-2xl bg-[#090909] overflow-hidden mb-6 aspect-[16/10] flex flex-col shadow-[inset_0_0_60px_rgba(0,0,0,1)] z-10">
                                       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(43_72%_55%)]/[0.04] to-transparent pointer-events-none z-10" />
                                       <div className="flex-1 flex flex-col p-6 z-20 relative overflow-hidden">
                                          <div className="flex gap-4 mb-6 border-b border-white/5 pb-4">
                                            <button onClick={() => setAudioTab("ai")} className={`font-mono text-xs uppercase tracking-widest transition-all cursor-pointer ${audioTab === "ai" ? "text-[hsl(43_72%_55%)] drop-shadow-[0_0_8px_hsla(43,72%,55%,0.8)]" : "text-zinc-600"}`}>AI Songs</button>
                                            <button onClick={() => setAudioTab("original")} className={`font-mono text-xs uppercase tracking-widest transition-all cursor-pointer ${audioTab === "original" ? "text-[hsl(43_72%_55%)] drop-shadow-[0_0_8px_hsla(43,72%,55%,0.8)]" : "text-zinc-600"}`}>Originals</button>
                                          </div>
                                          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                             {audioTab === "original" ? (
                                               <div className="flex flex-col h-full items-center justify-center p-6 text-center">
                                                 <Play className="w-12 h-12 text-[hsl(43_72%_55%)]/20 mb-4" />
                                                 <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(43_72%_55%)] leading-relaxed">Complete Service: From Lyrics and Composition to Full Creation, Mixing, and Mastering.</p>
                                               </div>
                                             ) : (
                                               <div className="space-y-2">
                                                 {AI_SONGS.map((song) => (
                                                   <button key={song.id} onClick={() => toggleAudio(song.id, song.url)} className={`w-full text-left px-4 py-3 font-mono text-xs uppercase tracking-widest rounded border transition-all flex justify-between items-center cursor-pointer ${isAudioPlaying(song.id) ? "bg-[hsl(43_72%_55%)]/10 border-[hsl(43_72%_55%)]/30 text-[hsl(43_72%_55%)]" : "bg-transparent border-transparent text-zinc-500 hover:bg-white/5 text-zinc-300"}`}>
                                                     <div className="flex items-center gap-3"><Play className={`w-3 h-3 ${isAudioPlaying(song.id) ? "fill-[hsl(43_72%_55%)]" : ""}`} />{song.title}</div>
                                                     {isAudioPlaying(song.id) && <div className="flex items-end gap-[2px] h-3"><motion.div animate={{ height: ["20%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-[hsl(43_72%_55%)]" /></div>}
                                                   </button>
                                                 ))}
                                               </div>
                                             )}
                                          </div>
                                       </div>
                                    </div>

                                    <div className="flex justify-between items-end relative z-10">
                                      <div className="text-left">
                                        <h3 className="font-display text-2xl font-bold mb-1 text-white">Audio Production</h3>
                                        <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-0">Industry Standard Rendering</p>
                                        <a href="#" className="text-[hsl(43_72%_55%)] font-mono text-[8px] uppercase tracking-widest opacity-40">Production Direct Access // Engagement Line</a>
                                      </div>
                                      <div className="flex gap-2">
                                        <button onClick={handleServiceClick} className="bg-zinc-900 border border-white/10 text-white p-2 rounded hover:bg-white hover:text-black transition-all cursor-pointer">
                                          <Play className="w-3 h-3 fill-current rotate-90" />
                                        </button>
                                        <button onClick={handleServiceClick} className="bg-white text-black px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[hsl(43_72%_55%)] transition-colors inline-block text-center select-none min-w-[100px] cursor-pointer">
                                          {audioTab === "ai" ? "PRODUCE" : "RECORD"}
                                        </button>
                                      </div>
                                    </div>
                                  </motion.div>
                               ) : engagedId === 'TV04' && selectedChannel === '02' ? (
                                  <motion.div 
                                     initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                                     className={`relative w-full max-w-4xl rounded-3xl border transition-all duration-700 p-6 md:p-8 overflow-hidden flex flex-col shadow-2xl group cursor-auto ${isDjPlaying ? "bg-[#050510]" : "border-white/5 bg-black"}`}
                                     style={isDjPlaying ? { borderColor: `${getColorHex(activeDjObj?.color)}80` } : {}}
                                  >
                                    <div className="relative border rounded-2xl overflow-hidden mb-6 flex-1 z-10 flex flex-col transition-all duration-700 ${isDjPlaying ? 'bg-[#08080f]' : 'bg-[#0a0a0a]'}" style={isDjPlaying ? { borderColor: `${getColorHex(activeDjObj?.color)}4d` } : {}}>
                                      <div className="h-40 w-full bg-[#050505] border-b border-[#222] flex flex-col items-center justify-center relative shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                                         {isDjPlaying && <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 blur-[60px]" style={{ backgroundColor: getColorHex(activeDjObj?.color) }} />}
                                         <motion.div animate={isDjPlaying ? { rotate: 360 } : { rotate: 0 }} transition={isDjPlaying ? { repeat: Infinity, duration: 3, ease: "linear" } : {}} className="relative z-20 mb-4">
                                            <Disc3 className="w-16 h-16" style={isDjPlaying ? { color: getColorHex(activeDjObj?.color) } : { color: '#222' }} />
                                         </motion.div>
                                      </div>
                                      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#0a0a0a]">
                                        {DJ_SERVICES.map((dj) => (
                                          <button key={dj.id} onClick={() => toggleAudio(dj.id, dj.url)} className={`font-mono text-[10px] uppercase font-bold tracking-widest py-3 px-4 rounded border transition-all text-left flex justify-between items-center cursor-pointer ${isAudioPlaying(dj.id) ? "text-white" : "bg-[#111] text-zinc-600 border-[#222] hover:text-zinc-400"}`} style={isAudioPlaying(dj.id) ? { backgroundColor: getColorHex(dj.color), borderColor: '#fff' } : {}}>
                                            {dj.title}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="flex justify-between items-end relative z-10">
                                      <div className="text-left">
                                        <h3 className="font-display text-2xl font-bold mb-1" style={isDjPlaying ? { color: getColorHex(activeDjObj?.color) } : { color: 'white' }}>DJ Services</h3>
                                        <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">Active Console State // Production Registry Line</p>
                                      </div>
                                      <AnimatePresence>
                                        {isDjPlaying ? (
                                          <motion.button 
                                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                            onClick={handleServiceClick}
                                            className="text-white px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex-shrink-0 ml-2 cursor-pointer"
                                            style={{ backgroundColor: getColorHex(activeDjObj?.color), border: `1px solid ${getColorHex(activeDjObj?.color)}` }}
                                          >
                                            Book {activeDjObj?.title.split(' ')[0]}
                                          </motion.button>
                                        ) : (
                                          <div className="bg-white/5 border border-white/10 text-zinc-600 px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest cursor-not-allowed">
                                            Select Genre
                                          </div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </motion.div>
                               ) : engagedId === 'TV02' ? (
                                  /* SEARCH DIRECT HUB PLATE */
                                  <motion.div 
                                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                     className="w-full max-w-4xl h-full flex flex-col p-8 md:p-12 overflow-hidden cursor-auto"
                                  >
                                     <div className="flex flex-col items-center mb-10">
                                        <div className="bg-white/5 border border-white/10 p-4 rounded-full mb-6">
                                           <Power className="w-10 h-10 text-white animate-pulse" />
                                        </div>
                                        <h2 className="font-serif text-white text-4xl font-black italic uppercase tracking-tighter mb-2">SEARCH DIRECT</h2>
                                        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.4em]">Fastest Studio Navigation Protocol</p>
                                     </div>

                                     <div className="relative mb-8">
                                        <input 
                                           autoFocus
                                           type="text" 
                                           value={searchQuery}
                                           onChange={(e) => setSearchQuery(e.target.value)}
                                           placeholder="Type your destination... (Logo, DJ, Audio, Unit 05...)"
                                           className="w-full bg-[#050505] border-4 border-white p-8 font-serif text-2xl font-black italic text-white uppercase tracking-tight focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-zinc-800"
                                        />
                                        <div className="absolute right-8 top-1/2 -translate-y-1/2 font-mono text-[10px] text-white/20 uppercase tracking-widest hidden md:block">
                                           ESC TO CANCEL
                                        </div>
                                     </div>

                                     <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar-silver space-y-3">
                                        {DIRECT_ITEMS.filter(item => 
                                           item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                           item.category.toLowerCase().includes(searchQuery.toLowerCase())
                                        ).map((item) => (
                                           <div 
                                              key={item.id}
                                              onClick={() => {
                                                 playSound('click');
                                                 if (item.action) {
                                                    item.action({ 
                                                       setEngagedId, 
                                                       setSelectedChannel 
                                                    });
                                                 } else if (item.path) {
                                                    window.location.href = item.path;
                                                 }
                                              }}
                                              className="group flex justify-between items-center p-6 bg-white/[0.03] border border-white/5 hover:border-white hover:bg-white transition-all cursor-pointer"
                                           >
                                              <div className="flex flex-col">
                                                 <span className="font-mono text-[9px] text-zinc-600 group-hover:text-black/40 uppercase tracking-widest mb-1">{item.category} // {item.type}</span>
                                                 <span className="font-serif text-white group-hover:text-black text-2xl font-black italic uppercase tracking-tight">{item.name}</span>
                                              </div>
                                              <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-black group-hover:translate-x-2 transition-all" />
                                           </div>
                                        ))}
                                     </div>
                                  </motion.div>
                               ) : (
                                  /* DEFAULT CINEMATIC PLATE */
                                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-6xl text-center">
                                     <span className="font-mono text-[#D4AF37] text-md font-black tracking-[1em] mb-4 block uppercase italic">Active Frequency // {selectedChannel}</span>
                                     <h1 className="font-serif text-black dark:text-white text-7xl md:text-[120px] font-black italic uppercase tracking-tighter leading-[0.85] mb-12 border-y-[12px] border-current py-10 transition-colors">
                                        {curSvc.name}
                                     </h1>
                                     <div className="flex justify-between items-center bg-black/5 dark:bg-white/5 p-12 border-L-[8px] border-[#D4AF37]">
                                        <div className="text-left flex-1 max-w-2xl">
                                           <span className="font-serif text-black dark:text-emerald-500 text-4xl font-black italic leading-tight uppercase leading-none mb-4 block">Consultancy Directive:</span>
                                           <p className="font-serif text-black dark:text-white text-xl font-bold uppercase leading-relaxed tracking-wider">
                                              {curSvc.desc || "The Studio is performing this service with advanced AI integration and artistic fidelity."}
                                           </p>
                                        </div>
                                        <div className="text-right flex flex-col items-end">
                                           <span className="font-serif text-black dark:text-white text-9xl font-black italic leading-none">{curSvc.price}</span>
                                           <span className="font-mono text-xs text-[#D4AF37] font-black uppercase tracking-[0.6em] mt-4">Authorized Engagement Cost</span>
                                        </div>
                                     </div>
                                     <button onClick={handleServiceClick} className="mt-12 flex items-center gap-8 px-20 py-10 bg-black text-[#D4AF37] border-8 border-black hover:bg-[#D4AF37] hover:text-black transition-all font-serif font-black italic text-4xl uppercase tracking-tighter shadow-2xl cursor-pointer mx-auto decoration-none">
                                        <Zap className="w-10 h-10 fill-current" />
                                        ORDER CREATION
                                     </button>
                                  </motion.div>
                               )}
                            </motion.div>
                         ) : (
                            /* TV IDLE / HOME SCREEN */
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center max-w-4xl p-12">
                               <div className={`mb-12 ${engagedId === 'TV04' ? 'text-emerald-500' : 'text-zinc-800'}`}>
                                  {engagedId === 'TV04' ? <Headphones className="w-32 h-32" /> : <Monitor className="w-48 h-48" />}
                               </div>
                               <h2 className={`font-serif ${engagedId === 'TV04' ? 'text-white' : 'text-zinc-800'} text-7xl font-black italic uppercase tracking-tighter leading-none mb-8`}>
                                  {engagedId === 'TV04' ? "AUDIO COMMAND CENTRE" : "STATION ONLINE"}
                               </h2>
                               <p className={`font-serif ${engagedId === 'TV04' ? 'text-white/40' : 'text-zinc-800'} text-3xl font-black italic uppercase leading-tight tracking-wider opacity-60 mb-12`}>
                                  {engagedId === 'TV04' ? "Select your audio services" : "Initialize production frequency via the Service Menu."}
                               </p>
                            </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                   
                   {/* Global Audio Controller */}
                   {activeAudioUri && <audio src={activeAudioUri} autoPlay loop className="hidden" />}
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        .font-serif { font-family: 'Libre Baskerville', serif; }
        .clip-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-silver::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-silver::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-silver::-webkit-scrollbar-thumb { background: #ffffff22; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default StudioTVDisplay;
