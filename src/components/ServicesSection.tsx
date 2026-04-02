import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play, Disc3, MonitorPlay, Film, ShieldAlert, ArrowRight } from "lucide-react";

// --- Data Models ---
const AI_SONGS = [
  { id: "s1", title: "Brand Zingles", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "s2", title: "Corporate Songs", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "s3", title: "Personal Songs", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "s4", title: "Songs for Entrepreneurs", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
];

const DJ_SERVICES = [
  { id: "d1", title: "Corporate DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { id: "d2", title: "Residential DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { id: "d3", title: "Event DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { id: "d4", title: "Personal Party DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { id: "d5", title: "Festive DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
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
  // Audio State
  const [audioTab, setAudioTab] = useState<"ai" | "original">("ai");
  const [activeSong, setActiveSong] = useState<string | null>(null);
  const activeSongObj = AI_SONGS.find(s => s.id === activeSong);
  
  // DJ State
  const [activeDj, setActiveDj] = useState<string | null>(null);
  const activeDjObj = DJ_SERVICES.find(d => d.id === activeDj);

  // AI Video State
  const [activeReel, setActiveReel] = useState<number | null>(null);

  // Package State
  const [clickedPackages, setClickedPackages] = useState<{ [key: string]: boolean }>({});

  return (
    <section id="services" className="px-4 py-24 md:px-6 md:py-32 bg-[#020202] text-white selection:bg-[hsl(43_72%_55%)] selection:text-black">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-24 text-center">
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-[hsl(43_72%_55%)] drop-shadow-[0_0_8px_hsla(43,72%,55%,0.6)]"
          >
            Direct Pipeline Activation
          </motion.p>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight"
          >
            Studio <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Services</span>
          </motion.h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 mb-20">

          {/* 1. AUDIO PRODUCTION: RETRO SPEAKER TV */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative rounded-3xl border border-[hsl(43_72%_55%)]/20 bg-black/50 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_30px_hsla(43,72%,55%,0.05)] overflow-hidden"
          >
            {/* The Tiny Grey Dotted Speaker Face Mask */}
            <div 
              className="absolute inset-0 z-0 opacity-[0.15]" 
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
                backgroundSize: '8px 8px'
              }}
            />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(43_72%_55%)]/10 blur-[100px] pointer-events-none z-0" />
            
            <div className="relative border-4 border-[#111] rounded-2xl bg-[#090909] overflow-hidden mb-6 aspect-[4/3] flex flex-col shadow-[inset_0_0_60px_rgba(0,0,0,1)] z-10">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(43_72%_55%)]/[0.04] to-transparent pointer-events-none z-10" />
               
               <div className="flex-1 flex flex-col p-6 z-20 relative">
                  {/* Playlist Tabs */}
                  <div className="flex gap-4 mb-6 border-b border-white/5 pb-4">
                    <button onClick={() => setAudioTab("ai")} className={`font-mono text-xs uppercase tracking-widest transition-all ${audioTab === "ai" ? "text-[hsl(43_72%_55%)] drop-shadow-[0_0_8px_hsla(43,72%,55%,0.8)]" : "text-zinc-600 hover:text-zinc-400"}`}>
                      AI Songs
                    </button>
                    <button onClick={() => setAudioTab("original")} className={`font-mono text-xs uppercase tracking-widest transition-all ${audioTab === "original" ? "text-[hsl(43_72%_55%)] drop-shadow-[0_0_8px_hsla(43,72%,55%,0.8)]" : "text-zinc-600 hover:text-zinc-400"}`}>
                      Original
                    </button>
                  </div>

                  {/* Playlist Content */}
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                     {audioTab === "original" ? (
                       <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-[hsl(43_72%_55%)]/50 animate-pulse">
                         [ COMING SOON... ]
                       </div>
                     ) : (
                       <div className="space-y-2">
                         {AI_SONGS.map((song) => (
                           <button 
                             key={song.id}
                             onClick={() => setActiveSong(activeSong === song.id ? null : song.id)}
                             className={`w-full text-left px-4 py-3 font-mono text-xs uppercase tracking-widest rounded border transition-all flex justify-between items-center ${activeSong === song.id ? "bg-[hsl(43_72%_55%)]/10 border-[hsl(43_72%_55%)]/30 text-[hsl(43_72%_55%)]" : "bg-transparent border-transparent text-zinc-500 hover:bg-white/5 hover:text-zinc-300"}`}
                           >
                             <div className="flex items-center gap-3">
                               <Play className={`w-3 h-3 ${activeSong === song.id ? "fill-[hsl(43_72%_55%)]" : ""}`} />
                               {song.title}
                             </div>
                             {activeSong === song.id && (
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
                  
                  {activeSongObj && <audio src={activeSongObj.url} autoPlay loop className="hidden" />}
               </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <h3 className="font-display text-2xl font-bold mb-1">Audio Production</h3>
                <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">Industry Standard Rendering</p>
              </div>
              <a href="https://wa.me/918149981660?text=I'm%20interested%20in%20Audio%20Production" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[hsl(43_72%_55%)] transition-colors inline-block text-center flex-shrink-0 ml-2">
                Start Call
              </a>
            </div>
          </motion.div>


          {/* 2. DJ SERVICES: Faded Console Deck */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="relative rounded-3xl border border-white/5 bg-black p-6 md:p-8 overflow-hidden flex flex-col shadow-[inset_0_20px_40px_rgba(255,255,255,0.02)]"
          >
            {/* The Deck / Physical Console Lines Background */}
            <div className="absolute inset-0 z-0 bg-transparent opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="relative border border-[#222] rounded-2xl bg-[#0a0a0a] overflow-hidden mb-6 flex-1 z-10 flex flex-col shadow-2xl">
              
              {/* Isolated Disc Lighting header */}
              <div className="h-32 w-full bg-[#050505] border-b border-[#222] flex items-center justify-center relative shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                 {/* The only neon is on the disc and surrounding glow when active */}
                 {activeDj && <div className="absolute inset-0 bg-blue-500/10 blur-[50px]" />}
                 
                 {activeDj ? (
                    <div className="relative z-10 flex gap-[4px] items-center h-16 w-32 justify-center opacity-90 mx-auto">
                      {[...Array(12)].map((_, i) => (
                        <motion.div key={i} animate={{ height: [Math.random() * 20 + "%", Math.random() * 100 + "%", Math.random() * 50 + "%"] }} transition={{ duration: Math.random() * 0.4 + 0.3, repeat: Infinity, repeatType: "mirror" }} className="w-2 rounded-sm bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
                      ))}
                    </div>
                 ) : (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, ease: "linear", repeat: Infinity }}>
                      <Disc3 className="w-16 h-16 text-zinc-800 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
                    </motion.div>
                 )}
              </div>

              {/* Console Buttons */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#0a0a0a]">
                {DJ_SERVICES.map((dj) => (
                  <button
                    key={dj.id}
                    onClick={() => setActiveDj(activeDj === dj.id ? null : dj.id)}
                    className={`font-mono text-[10px] uppercase font-bold tracking-widest py-3 px-4 rounded border transition-all text-left flex justify-between items-center ${activeDj === dj.id ? "bg-blue-900 border-blue-500 text-white shadow-[inset_0_0_10px_rgba(59,130,246,0.3)]" : "bg-[#111] text-zinc-500 border-[#222] hover:border-[#333] hover:text-zinc-400"}`}
                  >
                    {dj.title}
                    {activeDj === dj.id && <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(59,130,246,1)]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <h3 className="font-display text-2xl font-bold mb-1">DJ Services</h3>
                <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">Console Engaged</p>
              </div>
              <AnimatePresence>
                {activeDj ? (
                  <motion.a 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    href="https://wa.me/918149981660?text=I%20want%20to%20book%20a%20DJ" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-600 border border-blue-400 text-white px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white hover:border-white hover:text-black transition-all flex-shrink-0 ml-2"
                  >
                    Book This DJ
                  </motion.a>
                ) : (
                  <div className="opacity-0 px-6 py-2">Placeholder</div>
                )}
              </AnimatePresence>
            </div>
            
            {activeDjObj && <audio src={activeDjObj.url} autoPlay loop className="hidden" />}
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


          {/* 4. REAL PRODUCTION: Cinematic Equipment Theme */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="relative rounded-3xl border border-zinc-800 bg-[#0a0a0a] p-6 md:p-8 overflow-hidden shadow-[inset_0_30px_50px_rgba(255,255,255,0.02)]"
          >
            {/* Cinematic background texture metallic */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0 pointer-events-none" />
            
            <div className="flex flex-col mb-6 relative z-10">
              <h3 className="font-display text-2xl font-bold mb-1 text-white">Real Production</h3>
              <p className="text-zinc-400 font-body text-[11px] leading-relaxed mb-4">
                Physical camera, lighting rigs, and crew. Budget depends strictly on the level of production required for the product.
              </p>
              
              {/* Process booking flow */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest bg-black border border-white/5 px-4 py-2 rounded-lg">
                <span className="text-white">Call</span> <ArrowRight className="w-3 h-3" /> 
                <span className="text-white">Pre-Prod</span> <ArrowRight className="w-3 h-3" /> 
                <span className="text-white">Production</span> <ArrowRight className="w-3 h-3" /> 
                <span className="text-white">Delivery</span>
              </div>
            </div>

            <div className="relative border border-[#222] rounded-xl bg-black overflow-hidden mb-6 p-4 md:p-6 z-10">
               <ul className="space-y-4">
                 <li className="flex gap-3 items-start border-b border-white/5 pb-4">
                    <span className="font-mono text-[10px] text-zinc-600 mt-0.5">01</span>
                    <div>
                      <p className="font-mono text-[10px] text-white font-bold uppercase tracking-wider mb-1">Basic Stage</p>
                      <p className="font-body text-xs text-zinc-400">Experimental Kids Content Digital Update</p>
                    </div>
                 </li>
                 <li className="flex gap-3 items-start border-b border-white/5 pb-4">
                    <span className="font-mono text-[10px] text-zinc-600 mt-0.5">02</span>
                    <div>
                      <p className="font-mono text-[10px] text-white font-bold uppercase tracking-wider mb-1">Scale Stage</p>
                      <p className="font-body text-xs text-zinc-400">HKD Webshow Cinematic Project Focus</p>
                    </div>
                 </li>
                 <li className="flex gap-3 items-start border-b border-white/5 pb-4">
                    <span className="font-mono text-[10px] text-zinc-600 mt-0.5">03</span>
                    <div>
                      <p className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1">Ongoing Status</p>
                      <p className="font-body text-xs text-zinc-300">High Budget Music Videos</p>
                    </div>
                 </li>
                 <li className="flex gap-3 items-start">
                    <span className="font-mono text-[10px] text-zinc-600 mt-0.5">04</span>
                    <div>
                      <p className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Under Process</p>
                      <p className="font-body text-xs text-zinc-600 italic">Advanced internal plate shots</p>
                    </div>
                 </li>
               </ul>
            </div>
            
            <div className="flex justify-between items-center relative z-10 pt-2 border-t border-white/10">
              <span className="font-mono font-bold text-[9px] uppercase tracking-widest text-zinc-500">Tiered Execution</span>
              <a href="https://wa.me/918149981660?text=I'm%20interested%20in%20Real%20Production" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white font-mono text-xs uppercase tracking-widest underline underline-offset-4 transition-colors">
                Initiate Setup
              </a>
            </div>
          </motion.div>


          {/* 5. OG WRITING: ANCIENT PAPER VS TERMINAL GLOW */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
             className="relative rounded-3xl border border-[#00FF41]/30 bg-[#050A05] p-6 md:p-8 shadow-[0_0_40px_rgba(0,255,65,0.05)] overflow-hidden lg:col-span-2"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />
            
            <div className="flex flex-col md:flex-row gap-12 relative z-10">
               {/* Left: Philosophy Pitch (Ancient Paper feel clash) */}
               <div className="flex-1 md:pr-12">
                 <h3 className="font-serif italic text-3xl text-zinc-300 mb-6 drop-shadow-md">
                   OG Writer's Room
                 </h3>
                 
                 <p className="font-serif text-sm md:text-base leading-relaxed text-zinc-400 mb-8 border-l-2 border-[#00FF41]/50 pl-6">
                   The studio does <span className="text-white font-bold italic">not</span> create for the client. We carve out communication for their <span className="text-white font-bold underline underline-offset-4 decoration-[#00FF41]/50">business survival</span>.
                 </p>
                 
                 <div className="bg-[#00FF41]/5 border border-[#00FF41]/20 p-4 rounded-xl">
                   <p className="font-mono text-[10px] md:text-xs leading-relaxed text-[#00FF41] uppercase tracking-widest">
                     // FOUNDER TO FOUNDER SERVICE.<br/>
                     // RARE THAT A STUDIO OPERATES AT THIS LEVEL OF STRATEGIC ARCHITECTURE.
                   </p>
                 </div>
               </div>

               {/* Right: B&W Limited Modules vs Green Active Module */}
               <div className="flex-1 font-mono uppercase text-[10px] md:text-xs tracking-widest flex flex-col justify-center">
                 
                 <div className="mb-8">
                   <span className="text-zinc-600 block mb-3 border-b border-zinc-800 pb-2">[ RESTRICTED MONOCHROME MODULES ]</span>
                   <div className="flex gap-2 flex-col text-zinc-500">
                     <span className="border-l-2 border-zinc-800 pl-4 py-1 opacity-50 select-none">News Documentation</span>
                     <span className="border-l-2 border-zinc-800 pl-4 py-1 opacity-50 select-none">Lyrics Engineering</span>
                     <span className="border-l-2 border-zinc-800 pl-4 py-1 opacity-50 select-none">Screenplay Drafting</span>
                   </div>
                 </div>

                 <div className="pt-2">
                   <span className="text-[#00FF41] animate-pulse block mb-3 border-b border-[#00FF41]/20 pb-2">[ ACTIVE AVAILABLE MODULE ]</span>
                   <div className="bg-[#00FF41]/10 border border-[#00FF41]/50 px-4 py-4 rounded-xl text-[#00FF41] font-bold flex justify-between items-center group cursor-pointer hover:bg-[#00FF41]/20 transition-all shadow-[0_0_15px_rgba(0,255,65,0.05)]">
                      Copy Writing
                      <a href="https://wa.me/918149981660?text=I'm%20a%20founder.%20I%20need%20copywriting." target="_blank" rel="noopener noreferrer" className="bg-[#00FF41] text-black px-4 py-2 rounded font-black group-hover:shadow-[0_0_15px_rgba(0,255,65,0.6)] transition-all flex items-center gap-2">
                        Draft Now <ArrowRight className="w-3 h-3" />
                      </a>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>

        </div>

        {/* 6. STRUCTURED PACKAGES (Restoring exact requested bottom packages) */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black mb-4">Baseline Output Packages</h2>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Fixed architecture pricing. Studio remains intensely scaled.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {PACKAGES.map((pkg, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="border border-white/10 rounded-2xl bg-[#050505] p-8 flex flex-col justify-between"
               >
                 <div>
                   <h4 className="font-display text-2xl font-bold mb-2 text-white">{pkg.title}</h4>
                   <p className="text-zinc-400 font-body text-sm mb-6 min-h-[40px]">{pkg.desc}</p>
                   
                   <p className="font-mono text-xl md:text-3xl font-black text-white mb-2">{pkg.price} <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-normal">/ Starting</span></p>
                   
                   <div className="border-t border-white/10 my-6" />
                   
                   <ul className="space-y-3 mb-8">
                     {pkg.features.map((feat, i) => (
                       <li key={i} className="flex gap-3 text-sm font-body text-zinc-300 items-start">
                         <span className="text-[hsl(43_72%_55%)] mt-1">•</span> {feat}
                       </li>
                     ))}
                   </ul>
                 </div>
                 
                 <a
                     href={`https://wa.me/918149981660?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.title} package (${pkg.price}). Let's discuss.`)}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block w-full py-4 rounded font-mono text-xs font-bold uppercase tracking-widest text-center transition-all bg-white text-black hover:bg-[hsl(43_72%_55%)] hover:text-black"
                  >
                    Select {pkg.title}
                  </a>
               </motion.div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
