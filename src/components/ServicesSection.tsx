import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Disc3, MonitorPlay, Film, ArrowRight } from "lucide-react";
import StudioTVDisplay from "./StudioTVDisplay";

// --- Data Models ---
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

const PACKAGES = [
  {
    title: "Foundational",
    desc: "Visual identity for emerging brands.",
    price: "$800",
    features: ["Brand Typography & Colors", "Primary & Secondary Logos", "Basic Style Guide", "2 Social Media Layouts"],
  },
  {
    title: "Cinematic Overhaul",
    desc: "A complete prestige visual system.",
    price: "$2,200",
    features: ["Comprehensive Brand Architecture", "Custom Graphic Assets", "Full Motion Graphics Kit", "Extensive Brand Bible"],
  },
  {
    title: "Retained Visuals",
    desc: "Ongoing production to maintain visual authority.",
    price: "Custom",
    features: ["Unlimited Asset Variations", "Priority Artistic Direction", "Weekly Campaign Assets", "Dedicated Designer"],
  }
];

const REELS_DATA = [
  { id: 1, title: "Lagin Bigin - Brand Track", youtubeId: "2ccAgY4UoX4", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400" },
  { id: 2, title: "Brand Showcase", youtubeId: "kC9Fx8QEXpI", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400" },
  { id: 3, title: "Pest Control Template", youtubeId: "Jn94dBgZ2xY", image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=400" },
  { id: 4, title: "Brand Ad Template", youtubeId: "vqI3xYcFJFM", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400" },
];

const ServicesSection = () => {
  // Audio State (Unified Singleton Logic)
  const [activeAudioUri, setActiveAudioUri] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [audioTab, setAudioTab] = useState<"ai" | "original">("ai");

  useEffect(() => {
    const handleStop = () => {
      setActiveId(null);
      setActiveAudioUri(null);
    };
    window.addEventListener('stop-all-audio', handleStop);
    return () => window.removeEventListener('stop-all-audio', handleStop);
  }, []);

  const toggleAudio = (id: string, url: string) => {
    if (activeId === id) {
      setActiveId(null);
      setActiveAudioUri(null);
    } else {
      // Notify all other components to stop audio
      window.dispatchEvent(new CustomEvent('stop-all-audio'));
      setActiveId(id);
      setActiveAudioUri(url);
    }
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

  // AI Video State
  const [activeReel, setActiveReel] = useState<number | null>(null);

  return (
    <section id="services" className="px-4 py-24 md:px-6 md:py-32 bg-[#020202] text-white selection:bg-[hsl(43_72%_55%)] selection:text-black">
      <div className="mx-auto max-w-7xl">
        
         {/* Header */}
        <div className="mb-24 text-center">
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-12 font-mono text-[10px] uppercase tracking-[0.4em] text-[hsl(43_72%_55%)] drop-shadow-[0_0_8px_hsla(43,72%,55%,0.6)]"
          >
            Direct Pipeline Activation
          </motion.p>
          
          <StudioTVDisplay />
          
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="font-serif italic text-zinc-500 text-sm md:text-base tracking-[0.2em] mb-12 mt-12"
          >
            we are creating for our display
          </motion.p>

          {/* THE PRODUCTION FLOOR ACTIVATION BLOCK */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-1 bg-gradient-to-r from-zinc-800 via-[hsl(43_72%_55%)] to-zinc-800 rounded-2xl mb-20"
          >
            <div className="bg-black/90 backdrop-blur-xl px-10 py-8 rounded-xl border border-white/5 text-center max-w-2xl">
               <span className="text-emerald-500 font-mono text-[9px] uppercase tracking-[0.6em] mb-4 block animate-pulse">Production Floor Active</span>
               <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase mb-6">Current Services Open to Book</h3>
               <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.2em] leading-relaxed mb-8">
                 These services are the exact modules powering the studio's own internal productions. Every booking fuels our <span className="text-white">A.I. Technology Integration</span> and the <span className="text-[#f7d08a]">Global Studio Upgradation</span> program. Managed and owned exclusively by the Director.
               </p>
               <div className="flex gap-4 justify-center">
                  <a href="https://wa.me/918149981660" className="px-6 py-2 bg-[hsl(43_72%_55%)] text-black font-black text-[9px] tracking-widest uppercase rounded-full hover:bg-white transition-all">
                    Direct Booking
                  </a>
                  <div className="px-6 py-2 border border-white/10 text-white/40 font-mono text-[9px] tracking-widest uppercase rounded-full select-none cursor-default">
                    AI Tech-Sync v.8.0
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 mb-20">

          {/* 1. AUDIO PRODUCTION: THE PIANO UI */}
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative rounded-3xl border border-[hsl(43_72%_55%)]/20 bg-black/50 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_30px_hsla(43,72%,55%,0.05)] overflow-hidden flex flex-col"
          >
            {/* Fluid Waveform Dot Background & Staggered Timing (2s Fade / 3s Appear) */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,20,1)_0%,_rgba(10,10,10,0)_100%)] blur-[40px] opacity-60" />
            <motion.div 
              animate={isAudioProdPlaying ? {
                backgroundPosition: ["0px 0px", "40px 40px", "0px 80px", "0px 0px"],
                opacity: [0, 0, 0.3, 0.3, 0]
              } : { opacity: 0.1 }}
              transition={isAudioProdPlaying ? { 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear",
                times: [0, 0.4, 0.6, 0.9, 1] // 0-2s (40%) is 0, 2-5s (60%) appears
              } : { duration: 1 }}
              className="absolute inset-0 z-0" 
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px'
              }}
            />
            
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] pointer-events-none z-0 transition-colors duration-1000 ${isAudioProdPlaying ? "bg-[hsl(43_72%_55%)]/30" : "bg-[hsl(43_72%_55%)]/10"}`} />
            
            <div className="relative border-4 border-[#111] rounded-2xl bg-[#090909] overflow-hidden mb-6 aspect-[4/3] flex flex-col shadow-[inset_0_0_60px_rgba(0,0,0,1)] z-10">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(43_72%_55%)]/[0.04] to-transparent pointer-events-none z-10" />
               
               <div className="flex-1 flex flex-col p-6 z-20 relative">
                  {/* Playlist Tabs */}
                  <div className="flex gap-4 mb-6 border-b border-white/5 pb-4">
                    <button onClick={() => setAudioTab("ai")} className={`font-mono text-xs uppercase tracking-widest transition-all ${audioTab === "ai" ? "text-[hsl(43_72%_55%)] drop-shadow-[0_0_8px_hsla(43,72%,55%,0.8)]" : "text-zinc-600 hover:text-zinc-400"}`}>
                      AI Songs
                    </button>
                    <button onClick={() => setAudioTab("original")} className={`font-mono text-xs uppercase tracking-widest transition-all ${audioTab === "original" ? "text-[hsl(43_72%_55%)] drop-shadow-[0_0_8px_hsla(43,72%_55%,0.8)]" : "text-zinc-600 hover:text-zinc-400"}`}>
                      Originals
                    </button>
                  </div>

                  {/* Playlist Content */}
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                     {audioTab === "original" ? (
                       <div className="flex flex-col h-full items-center justify-center p-6 text-center">
                         <Play className="w-12 h-12 text-[hsl(43_72%_55%)]/20 mb-4" />
                         <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(43_72%_55%)] leading-relaxed">
                           Complete Service: From Lyrics and Composition to Full Creation, Mixing, and Mastering at Industry Standard Levels.
                         </p>
                         <p className="font-mono text-[8px] uppercase tracking-widest text-zinc-600 mt-6 animate-pulse">[ PRODUCTION FLOOR ACTIVE ]</p>
                       </div>
                     ) : (
                       <div className="space-y-2">
                         {AI_SONGS.map((song) => (
                           <button 
                             key={song.id}
                             onClick={() => toggleAudio(song.id, song.url)}
                             className={`w-full text-left px-4 py-3 font-mono text-xs uppercase tracking-widest rounded border transition-all flex justify-between items-center ${isAudioPlaying(song.id) ? "bg-[hsl(43_72%_55%)]/10 border-[hsl(43_72%_55%)]/30 text-[hsl(43_72%_55%)]" : "bg-transparent border-transparent text-zinc-500 hover:bg-white/5 hover:text-zinc-300"}`}
                           >
                             <div className="flex items-center gap-3">
                               <Play className={`w-3 h-3 ${isAudioPlaying(song.id) ? "fill-[hsl(43_72%_55%)]" : ""}`} />
                               {song.title}
                             </div>
                             {isAudioPlaying(song.id) && (
                               <div className="flex items-end gap-[2px] h-3">
                                 <motion.div animate={{ height: ["20%", "100%", "40%", "80%"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-[hsl(43_72%_55%)]" />
                                 <motion.div animate={{ height: ["60%", "30%", "100%", "50%"] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-[hsl(43_72%_55%)]" />
                                 <motion.div animate={{ height: ["100%", "20%", "60%", "90%"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-[hsl(43_72%_55%)]" />
                               </div>
                             )}
                           </button>
                         ))}
                       </div>
                     )}
                  </div>
               </div>
            </div>

            {/* FULL WIDTH PIANO KEYBOARD (Bottom Anchored) */}
            <div className="absolute left-0 right-0 bottom-0 h-24 opacity-5 pointer-events-none z-0 flex items-end">
               <div className="flex w-full h-full border-t border-white/20">
                  {[...Array(24)].map((_, i) => (
                     <div key={i} className="flex-1 h-full border-r border-white/20 bg-white/5 relative">
                        {/* Black Keys */}
                        {[1, 2, 4, 5, 6].includes(i % 7) && (
                           <div className="absolute top-0 right-[-25%] w-1/2 h-[60%] bg-zinc-900 border border-white/10 rounded-b-sm z-10" />
                        )}
                     </div>
                  ))}
               </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <h3 className="font-display text-2xl font-bold mb-1">Audio Production</h3>
                <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest leading-0 mb-0">Industry Standard Rendering</p>
                {/* Discrete Production Contact */}
                <a href="tel:+9167467145" className="text-[hsl(43_72%_55%)] font-mono text-[8px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Production Direct Access // Engagement Line</a>
              </div>
              <div className="flex items-center gap-4">
                {/* Recording Indicator */}
                <div className="flex items-center gap-2">
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                  />
                  <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 font-bold">Live</span>
                </div>
                
                <div className="flex gap-2">
                  <a href="tel:+9167467145" className="bg-zinc-900 border border-white/10 text-white p-2 rounded hover:bg-white hover:text-black transition-all">
                    <Play className="w-3 h-3 fill-current rotate-90" />
                  </a>
                  <a href="https://wa.me/918149981660" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[hsl(43_72%_55%)] transition-colors inline-block text-center select-none min-w-[100px]">
                    {audioTab === "ai" ? "PRODUCE" : "RECORD"}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>


          {/* 2. DJ SERVICES: AUTHENTIC GENRE LOGIC */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             whileHover="hover"
             className={`relative rounded-3xl border transition-all duration-700 p-6 md:p-8 overflow-hidden flex flex-col shadow-2xl group ${isDjPlaying ? "bg-[#050510]" : "border-white/5 bg-black"}`}
             style={isDjPlaying ? { borderColor: `${getColorHex(activeDjObj?.color)}80`, boxShadow: `0 0 50px ${getColorHex(activeDjObj?.color)}1a` } : {}}
          >
            {/* Background Piano Key depiction (Architectural fade) */}
            <div className="absolute inset-x-0 bottom-0 h-40 opacity-[0.02] pointer-events-none z-0 flex items-end justify-center px-4">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="flex-1 h-full border-r border-white/20" />
              ))}
            </div>

            {/* The Console Dotted Background - Fades on hover */}
            <motion.div 
              variants={{
                hover: { opacity: 0.08, scale: 1.05 }
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-0 opacity-[0.03]" 
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
                backgroundSize: '20px 20px'
              }}
            />
            
            <div className={`relative border rounded-2xl overflow-hidden mb-6 flex-1 z-10 flex flex-col transition-all duration-700 ${isDjPlaying ? "bg-[#08080f]" : "border-[#222] bg-[#0a0a0a]"}`} 
              style={isDjPlaying ? { borderColor: `${getColorHex(activeDjObj?.color)}4d` } : {}}
            >
              
              {/* Visualizer Display */}
              <div className="h-40 w-full bg-[#050505] border-b border-[#222] flex flex-col items-center justify-center relative shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                 {isDjPlaying && (
                   <motion.div 
                     animate={{ opacity: [0.1, 0.2, 0.1] }} 
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 blur-[60px]" 
                     style={{ backgroundColor: getColorHex(activeDjObj?.color) }} 
                   />
                 )}
                 
                 {/* The Disc */}
                 <motion.div 
                    animate={isDjPlaying ? { rotate: 360, scale: [1, 1.05, 1] } : { rotate: 0 }}
                    transition={isDjPlaying ? { rotate: { duration: 2 / (activeDjObj?.speed || 1), repeat: Infinity, ease: "linear" }, scale: { duration: 0.5 / (activeDjObj?.speed || 1), repeat: Infinity } } : {}}
                    className="relative z-20 mb-4"
                 >
                    <Disc3 className={`w-16 h-16 transition-colors duration-700 ${isDjPlaying ? '' : 'text-zinc-800'}`} 
                      style={isDjPlaying ? { color: getColorHex(activeDjObj?.color), filter: `drop-shadow(0 0 15px ${getColorHex(activeDjObj?.color)}cc)` } : {}}
                    />
                 </motion.div>

                 {/* Digital Frequency Bars - Speed controlled by genre */}
                 <div className="relative z-10 flex gap-[3px] items-end h-8 overflow-hidden">
                   {[...Array(20)].map((_, i) => (
                     <motion.div 
                        key={i} 
                        animate={isDjPlaying ? { 
                          height: [Math.random() * 20 + 20 + "%", Math.random() * 100 + "%", Math.random() * 40 + "%"],
                          opacity: [0.6, 1, 0.8]
                        } : { height: "10%", opacity: 0.2 }} 
                        transition={{ duration: (Math.random() * 0.3 + 0.2) / (activeDjObj?.speed || 1), repeat: Infinity, repeatType: "mirror" }} 
                        className={`w-1.5 rounded-t-sm transition-colors duration-700 ${isDjPlaying ? "" : "bg-zinc-700"}`}
                        style={isDjPlaying ? { backgroundColor: getColorHex(activeDjObj?.color), boxShadow: `0 0 8px ${getColorHex(activeDjObj?.color)}80` } : {}}
                      />
                   ))}
                 </div>
              </div>

              {/* Console Tracks */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#0a0a0a]">
                {DJ_SERVICES.map((dj) => (
                  <button
                    key={dj.id}
                    onClick={() => toggleAudio(dj.id, dj.url)}
                    className={`font-mono text-[10px] uppercase font-bold tracking-widest py-3 px-4 rounded border transition-all text-left flex justify-between items-center ${isAudioPlaying(dj.id) ? "text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "bg-[#111] text-zinc-600 border-[#222] hover:border-[#333] hover:text-zinc-400"}`}
                    style={isAudioPlaying(dj.id) ? { backgroundColor: getColorHex(dj.color), borderColor: '#fff' } : {}}
                  >
                    <div className="flex items-center gap-2">
                       <span className={`w-1 h-1 rounded-full ${isAudioPlaying(dj.id) ? 'bg-white' : 'bg-white/10'}`} />
                       {dj.title}
                    </div>
                    {isAudioPlaying(dj.id) && <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping shadow-[0_0_5px_rgba(255,255,255,1)]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <h3 className={`font-display text-2xl font-bold mb-1 transition-colors duration-700 ${isDjPlaying ? '' : 'text-white'}`}
                  style={isDjPlaying ? { color: getColorHex(activeDjObj?.color) } : {}}
                >
                  DJ Services
                </h3>
                <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">Active Console State</p>
                <a href="tel:+9167467145" className="text-white/20 font-mono text-[8px] uppercase tracking-widest hover:text-white/50 transition-colors">Production Registry Line</a>
              </div>
              <AnimatePresence>
                {isDjPlaying ? (
                  <motion.a 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    href={`https://wa.me/918149981660?text=${encodeURIComponent(`Hi, I'm interested in booking the ${activeDjObj?.title}. Let's discuss the session.`)}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex-shrink-0 ml-2"
                    style={{ backgroundColor: getColorHex(activeDjObj?.color), border: `1px solid ${getColorHex(activeDjObj?.color)}` }}
                  >
                    Book {activeDjObj?.title.split(' ')[0]}
                  </motion.a>
                ) : (
                  <div className="bg-white/5 border border-white/10 text-zinc-600 px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest cursor-not-allowed">
                    Select Genre
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 3. AI VIDEO PRODUCTION: Mobile Reel Format embedded */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="relative rounded-3xl border border-purple-500/20 bg-[#07050a] p-6 md:p-8 shadow-[0_0_30px_rgba(168,85,247,0.05)] overflow-hidden"
          >
            <div className="flex flex-col mb-6">
              <h3 className="font-display text-2xl font-bold mb-1 text-white">AI Video Production</h3>
              <p className="text-zinc-400 font-body text-[11px] leading-relaxed mb-4">
                This unit is completely dedicated to new creation. Generating the exact art required to serve brands and build digital presence.
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-[9px] font-bold text-purple-400">
                <span className="border border-purple-500/30 bg-purple-500/10 px-2 py-1 rounded">₹500 / Sec Base Rate</span>
                <span className="border border-white/10 bg-white/5 px-2 py-1 rounded text-white">₹3.5K Pack</span>
                <span className="border border-white/10 bg-white/5 px-2 py-1 rounded text-white">₹10K Pack</span>
                <span className="border border-white/10 bg-white/5 px-2 py-1 rounded text-white">₹25K Pack</span>
              </div>
            </div>

            {/* The Integrated Reels Display Gallery */}
            <div className="relative border border-zinc-800 rounded-xl bg-black overflow-hidden mb-6 w-full p-4 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory min-h-[260px]">
              {REELS_DATA.map((reel) => (
                <div 
                  key={reel.id} 
                  onClick={() => setActiveReel(reel.id)}
                  className={`relative shrink-0 w-[140px] aspect-[9/16] rounded-md overflow-hidden bg-zinc-900 border transition-all cursor-pointer snap-center group ${activeReel === reel.id ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-white/10 hover:border-white/30'}`}
                >
                   {activeReel === reel.id ? (
                      <div className="w-full h-full pointer-events-none yt-hide-branding">
                         <iframe
                           src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=0&loop=1&playlist=${reel.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                           className="w-full h-full scale-105"
                           allow="autoplay; encrypted-media; fullscreen"
                           allowFullScreen
                         />
                      </div>
                   ) : (
                      <>
                        <img src={reel.image} alt="Reel" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white drop-shadow-md opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all" />
                        <p className="absolute bottom-3 left-3 right-3 font-mono text-[8px] text-white uppercase font-bold tracking-widest truncate">{reel.title}</p>
                      </>
                   )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                 <MonitorPlay className="w-4 h-4 text-purple-400" />
                 <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">Generative Space</span>
              </div>
              <a href="https://wa.me/918149981660?text=I'm%20interested%20in%20AI%20Video" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400 font-mono text-xs uppercase tracking-widest underline underline-offset-4 transition-colors">
                Book AI Team
              </a>
            </div>
          </motion.div>


          {/* 4. REAL PRODUCTION & OG WRITING (Simplified wrappers for speed) */}
          <div className="lg:col-span-1 space-y-12">
            {/* Real Production */}
            <div className="relative rounded-3xl border border-zinc-800 bg-[#0a0a0a] p-6 md:p-8 overflow-hidden">
              <h3 className="font-display text-2xl font-bold mb-1 text-white">Real Production</h3>
              <p className="text-zinc-400 font-body text-[11px] leading-relaxed mb-6">
                Physical camera, lighting rigs, and crew. Scale depends on product requirements.
              </p>
              <div className="space-y-3 font-mono text-[9px] text-white/40 uppercase tracking-widest">
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Status</span> <span className="text-emerald-400">Active Pipeline</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Niche</span> <span className="text-white">High Budget MV</span></div>
              </div>
            </div>

            {/* OG Writing */}
            <div className="relative rounded-3xl border border-[#00FF41]/30 bg-[#050A05] p-6 md:p-8 overflow-hidden">
               <h3 className="font-serif italic text-2xl text-zinc-300 mb-4">OG Writer's Room</h3>
               <p className="font-serif text-xs md:text-sm leading-relaxed text-zinc-400 mb-6">
                  Complete narrative architecture for business survival and branding influence.
               </p>
               <a href="https://wa.me/918149981660?text=I'm%20a%20founder.%20I%20need%20copywriting." target="_blank" rel="noopener noreferrer" className="bg-[#00FF41]/10 border border-[#00FF41]/50 px-4 py-3 rounded-lg text-[#00FF41] font-mono text-[10px] uppercase font-bold tracking-widest block text-center hover:bg-[#00FF41]/20 transition-all">
                  Draft Now
               </a>
             </div>
          </div>
        </div>

        {/* Global Hidden Audio Controller */}
        {activeAudioUri && <audio src={activeAudioUri} autoPlay loop className="hidden" />}

      </div>
    </section>
  );
};

export default ServicesSection;
