import { motion } from "framer-motion";
import { useState } from "react";

const DirectorTalk = () => {
  const [storyClicked, setStoryClicked] = useState(false);

  return (
    <section className="relative w-full bg-[#030303] py-20 md:py-24 border-t border-white/5 overflow-hidden">
      {/* Cinematic Red Ambient Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[60%] w-[80%] bg-red-600/[0.04] blur-[150px] rounded-full" />
      
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/30 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
             <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
             Briefing
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6 text-white">
             FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 italic font-serif lowercase pr-2">Better</span> CREATION
          </h2>
          
          <div className="space-y-4 text-zinc-400 font-body text-xs md:text-sm leading-relaxed max-w-md mx-auto">
            <p className="font-medium text-white/90 text-center">
              "Be better every day. Leverage raw engineering. Apply cinematic discipline."
            </p>
            <p className="border-l-2 border-red-500/30 pl-4 italic text-center">
              Vision: Audience first. Content creates value. Build the monumental.
            </p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold text-center mt-2">— By Founder</p>
          </div>
          
          <div className="mt-8">
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
      </div>
    </section>
  );
};

export default DirectorTalk;
