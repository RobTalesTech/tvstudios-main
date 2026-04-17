import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Send, Music } from "lucide-react";
import { useState } from "react";

const DirectorTalk = () => {
  const [storyClicked, setStoryClicked] = useState(false);

  return (
    <section className="relative w-full bg-[#030303] py-20 md:py-24 border-t border-white/5 overflow-hidden">
      {/* Cinematic Red Ambient Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[60%] w-[80%] bg-red-600/[0.04] blur-[150px] rounded-full" />
      
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Manifesto & Personal Talk */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:max-w-md"
          >
            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/30 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
               <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
               Briefing
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6 text-white">
               FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 italic font-serif lowercase pr-2">Better</span> CREATION
            </h2>
            
            <div className="space-y-4 text-zinc-400 font-body text-xs md:text-sm leading-relaxed">
              <p className="font-medium text-white/90">
                "Be better every day. Leverage raw engineering. Apply cinematic discipline."
              </p>
              <p className="border-l border-red-500/50 pl-4 italic">
                Vision: Audience first. Content creates value. Fund the monumental.
              </p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">— By Founder</p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
               <button 
                onClick={() => setStoryClicked(true)}
                disabled={storyClicked}
                className={`px-6 py-2 rounded-full border text-font-mono text-[9px] uppercase tracking-widest transition-all ${
                  storyClicked 
                    ? "bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed" 
                    : "bg-white/5 border-white/10 text-white hover:bg-white hover:text-black"
                }`}
               >
                  {storyClicked ? "No Story" : "Founder Story"}
               </button>
            </div>
          </motion.div>

          {/* Right: The Instant Funding Highlight (Music Video Project) */}
          <motion.div
            id="music-video-poster"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="group relative"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-orange-500/20 blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity" />
             
             <div className="relative bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                   <Music className="w-10 h-10 text-red-500/10" />
                </div>
                
                <h3 className="text-xl font-mono uppercase tracking-[0.2em] text-white flex items-center gap-3 mb-4 font-bold">
                   <Sparkles className="w-4 h-4 text-[hsl(43_72%_55%)]" />
                   Music Video
                </h3>
                
                <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                   <p className="text-red-400 font-mono text-[9px] uppercase tracking-widest font-black flex items-center gap-2 mb-2">
                      <span className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
                      INSTANT FUNDING REQUIRED
                   </p>
                   <p className="text-zinc-300 text-xs leading-relaxed">
                      Personal production for global reach. Assistant stakeholders needed to scale.
                   </p>
                </div>
                
                <a 
                   href="mailto:tvstudios@upi?subject=Inquiry%20regarding%20Music%20Video%20Funding"
                   className="flex items-center justify-center gap-3 w-full py-4 rounded-lg bg-white text-black font-mono text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-[hsl(43_72%_55%)] active:scale-95"
                >
                   <Send className="w-3 h-3" /> Connect Now
                </a>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DirectorTalk;
