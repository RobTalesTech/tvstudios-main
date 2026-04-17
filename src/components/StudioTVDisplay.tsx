import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Play, Zap, Power, ChevronRight, ChevronLeft, X, Volume2, Signal, Headphones, Menu, Monitor } from "lucide-react";

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
  variant: "gold" | "silver" | "obsidian";
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
      { id: "S1", channel: "01", name: "LOGO DESIGN", price: "₹501", desc: "(IMMEDIATE IDENTITY)" },
      { id: "S2", channel: "02", name: "BRAND ZINGLE (30s)", price: "₹301", desc: "(THE SOUL MIRROR)", hasAudio: true },
      { id: "S3", channel: "03", name: "CREATIVE AD (15s)", price: "₹1,501", desc: "(HIGH-INTENSITY)" }
    ]
  },
  { 
    id: "TV02", 
    name: "SILVER MASTER", 
    color: "#e2e2e2", 
    variant: "silver",
    frameTexture: "linear-gradient(135deg, #ffffff 0%, #a1a1a1 50%, #444444 100%)", 
    cursorColor: "#fff",
    desc: "A-GRADE CINEMATIC RENDER // HIGH-FIDELITY"
  },
  { 
    id: "TV03", 
    name: "OBSIDIAN VAULT", 
    color: "#111", 
    variant: "obsidian",
    frameTexture: "linear-gradient(135deg, #333 0%, #000 50%, #111 100%)", 
    cursorColor: "#ff2e63",
    desc: "PERSONAL DIRECT ACCESS // ENCRYPTED"
  }
];

const StudioTVDisplay = () => {
  const [engagedId, setEngagedId] = useState<string | null>(null);
  const [isBooting, setIsBooting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  
  const activeStation = STATION_ARRAY.find(s => s.id === engagedId);

  // SFX
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playSound = (type: 'pop' | 'click') => {
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
    }
  };

  useEffect(() => {
    if (engagedId) {
      document.body.style.overflow = "hidden";
      document.body.style.cursor = "none";
      setIsBooting(true);
      playSound('pop');
      const bootTimer = setTimeout(() => setIsBooting(false), 800);
      return () => clearTimeout(bootTimer);
    } else {
      document.body.style.overflow = "auto";
      document.body.style.cursor = "auto";
      setIsMenuOpen(false);
      setSelectedChannel(null);
    }
  }, [engagedId]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const curSvc = activeStation?.services?.find(s => s.channel === selectedChannel);

  return (
    <div id="station-container" className="relative w-screen bg-black overflow-x-hidden">
      
      {/* 1. GALLERY GALLERY SECTIONS */}
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
            className="fixed inset-0 z-[5000] bg-black/99 backdrop-blur-3xl flex items-center justify-center overflow-hidden p-[5vh] cursor-none"
          >
             <motion.div 
               layoutId={`tv-unit-${engagedId}`}
               onMouseMove={handleMouseMove}
               className="relative h-full aspect-[16/9] flex flex-col items-center justify-center bg-black rounded-[2.5rem] p-0.5 overflow-hidden shadow-[0_0_150px_rgba(212,175,55,0.3)]"
               style={{ maxHeight: '85vh', maxWidth: '95vw', background: activeStation.frameTexture }}
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

                   {/* GOLD CROSSHAIR */}
                   <motion.div animate={{ x: mousePos.x, y: mousePos.y }} className="absolute top-0 left-0 pointer-events-none z-[8000] -translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 relative flex items-center justify-center">
                         <div className="absolute w-[1.5px] h-full bg-[#D4AF37]" />
                         <div className="absolute h-[1.5px] w-full bg-[#D4AF37]" />
                         <div className="w-4 h-4 border-2 border-[#D4AF37] rounded-full" />
                      </div>
                   </motion.div>

                   {/* CENTERED BROADCAST HEADER */}
                   <div className="px-16 py-12 border-b border-black/5 flex flex-col items-center relative">
                      {/* TOP LEFT: BACK BUTTON */}
                      {(selectedChannel || isMenuOpen) && (
                         <button 
                           onClick={() => { setSelectedChannel(null); setIsMenuOpen(false); playSound('click'); }}
                           className="absolute left-10 top-1/2 -translate-y-1/2 flex items-center gap-3 px-8 py-4 border-4 border-black font-serif font-black italic text-xl uppercase cursor-none hover:bg-black hover:text-white transition-all bg-white"
                         >
                            <ChevronLeft className="w-6 h-6" />
                            BACK
                         </button>
                      )}

                      <h2 className="font-serif text-[#D4AF37] text-4xl font-black tracking-tighter uppercase leading-none text-center">GOLDEN TV: CREATIVE CONTENT CREATIONS</h2>
                      <span className="font-serif text-black text-xs font-black italic mt-2 uppercase">CREATIVE CONTENT CREATION WITH CONSULTANCY</span>
                      
                      {/* CENTERED SERVICE MENU TRIGGER */}
                      <div className="relative mt-8">
                         <button 
                           onClick={() => { setIsMenuOpen(!isMenuOpen); playSound('click'); }}
                           className="flex items-center gap-6 px-12 py-5 bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all group cursor-none"
                         >
                            <Menu className="w-6 h-6" />
                            <span className="font-serif text-2xl font-black italic tracking-widest uppercase">Service Menu</span>
                         </button>

                         {/* DROP-DOWN CHANNEL LIST */}
                         <AnimatePresence>
                           {isMenuOpen && (
                              <motion.div 
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                className="absolute top-[110%] left-1/2 -translate-x-1/2 w-[400px] bg-black border-4 border-[#D4AF37] z-[6000] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
                              >
                                 {activeStation.services?.map((svc) => (
                                    <button 
                                      key={svc.id}
                                      onClick={() => { setSelectedChannel(svc.channel); setIsMenuOpen(false); playSound('click'); }}
                                      onMouseEnter={() => playSound('click')}
                                      className="w-full p-6 border-b border-[#D4AF37]/20 flex justify-between items-center hover:bg-[#D4AF37] group transition-all text-left"
                                    >
                                       <div className="flex flex-col">
                                          <span className="font-mono text-[9px] text-[#D4AF37] group-hover:text-black font-black tracking-widest uppercase mb-1">CH {svc.channel}</span>
                                          <span className="font-serif text-white group-hover:text-black text-xl font-black italic uppercase leading-tight">{svc.name}</span>
                                       </div>
                                       <span className="font-serif text-[#D4AF37] group-hover:text-black text-2xl font-black italic">{svc.price}</span>
                                    </button>
                                 ))}
                              </motion.div>
                           )}
                         </AnimatePresence>
                      </div>

                      {/* TOP RIGHT: POWER ONLY ON HOME */}
                      {!selectedChannel && !isMenuOpen && (
                        <button onClick={() => setEngagedId(null)} className="absolute right-10 top-1/2 -translate-y-1/2 p-5 bg-black text-white hover:bg-[#ff2e63] transition-all z-[6000] cursor-none shadow-xl">
                           <Power className="w-8 h-8" />
                        </button>
                      )}
                   </div>

                   {/* BROADCAST MAIN PLATE (VISION DATA) */}
                   <div className="flex-1 flex flex-col items-center justify-center p-16 relative overflow-hidden">
                      <AnimatePresence mode="wait">
                         {selectedChannel && curSvc ? (
                            <motion.div 
                              key="channel" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                              className="w-full max-w-6xl text-center"
                            >
                               <span className="font-mono text-[#D4AF37] text-md font-black tracking-[1em] mb-4 block uppercase italic">Active Frequency // {selectedChannel}</span>
                               <h1 className="font-serif text-black text-7xl md:text-[140px] font-black italic uppercase tracking-tighter leading-[0.85] mb-12 border-y-[12px] border-black py-10">
                                  {curSvc.name}
                               </h1>
                               <div className="flex justify-between items-center bg-black/5 p-12 border-L-[8px] border-[#D4AF37]">
                                  <div className="text-left flex-1 max-w-2xl">
                                     <span className="font-serif text-black text-4xl font-black italic leading-tight uppercase leading-none mb-4 block">Consultancy Directive:</span>
                                     <p className="font-serif text-black text-xl font-bold uppercase leading-relaxed tracking-wider">
                                        The Studio is doing this services with a vision to create best experiences specially with AI Production coz where there is a way to make unimaginable visuals and audio why we should not make it for ourself.
                                     </p>
                                  </div>
                                  <div className="text-right flex flex-col items-end">
                                     <span className="font-serif text-black text-9xl font-black italic leading-none">{curSvc.price}</span>
                                     <span className="font-mono text-xs text-[#D4AF37] font-black uppercase tracking-[0.6em] mt-4">Authorized Engagement Cost</span>
                                  </div>
                               </div>
                               <button className="mt-12 flex items-center gap-8 px-20 py-10 bg-black text-[#D4AF37] border-8 border-black hover:bg-[#D4AF37] hover:text-black transition-all font-serif font-black italic text-4xl uppercase tracking-tighter shadow-2xl cursor-none mx-auto">
                                  <Zap className="w-10 h-10 fill-current" />
                                  ORDER CREATION
                               </button>
                            </motion.div>
                         ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center max-w-4xl">
                               <h2 className="font-serif text-black/10 text-8xl font-black italic uppercase tracking-tighter leading-none mb-8">VISIONARY HUB</h2>
                               <p className="font-serif text-black text-3xl font-black italic uppercase leading-tight tracking-wider opacity-60">
                                  Select your starting frequency in the Service Menu above to initialize AI-Driven Content Creation.
                               </p>
                            </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        .font-serif { font-family: 'Libre Baskerville', serif; }
        .clip-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
      `}} />
    </div>
  );
};

export default StudioTVDisplay;
