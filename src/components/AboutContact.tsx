import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Play, Sparkles, Smartphone, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const AboutContact = () => {
  return (
    <section className="relative w-full bg-[#020202] py-32 overflow-hidden border-t border-white/5" id="about">
      
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[hsl(43_72%_55%)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: THE STORY ARCHITECTURE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="font-mono text-[9px] text-[hsl(43_72%_55%)] uppercase tracking-[0.5em] mb-6 block font-black">Architecture // 2024 - 2026</span>
            <h2 className="font-display text-5xl md:text-7xl text-white tracking-tighter mb-8 leading-none uppercase font-black">
              Art <br /> <span className="text-zinc-600 italic font-serif lowercase">Entrepreneur.</span>
            </h2>
            
            <div className="space-y-6 text-zinc-400 font-serif text-sm md:text-base leading-relaxed italic max-w-lg border-l-2 border-white/5 pl-8">
              <p>
                From self-learned filmmaking to the intense grit of Mumbai (2021-2024), the journey has been an ideological evolution. Home-coming in 2024 wasn't a retreat, it was a regrouping.
              </p>
              <p>
                Started on <span className="text-white font-bold">01 Jan 2026</span>, TVS is the platform where filmmaking becomes a democratized art. We bridge the right talent with the right creator – prioritizing the artist who creates for joy over the businessman who creates for margin.
              </p>
              <p className="text-white font-bold not-italic font-mono text-xs uppercase tracking-widest mt-8 flex items-center gap-3">
                 <Sparkles className="w-3 h-3 text-[hsl(43_72%_55%)]" />
                 We are good with choosing the right artist or talent for the right job.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <a 
                  href="https://wa.me/918149981660" 
                  className="group flex flex-col p-6 bg-white/[0.02] border border-white/10 hover:border-[hsl(43_72%_55%)] transition-all rounded-xl"
                >
                   <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-2">Secure Line</span>
                   <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-[hsl(43_72%_55%)]" />
                      <span className="text-white font-mono text-xs uppercase tracking-widest font-black">WhatsApp Studio</span>
                   </div>
                </a>
                <a 
                  href="mailto:contact@thevillagestudios.com" 
                  className="group flex flex-col p-6 bg-white/[0.02] border border-white/10 hover:border-white/40 transition-all rounded-xl"
                >
                   <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-2">Official Comms</span>
                   <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-zinc-400" />
                      <span className="text-white font-mono text-xs uppercase tracking-widest font-black">Direct Mail</span>
                   </div>
                </a>
            </div>
          </motion.div>

          {/* RIGHT: THE ROBTALES EXHIBIT (3 MOBILE PHONES) */}
          <div className="relative flex justify-center items-end gap-2 md:gap-4 pt-20">
             {/* Phone 1: Past Journey */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.1 }}
               className="w-1/3 max-w-[180px] aspect-[9/19] bg-zinc-900 rounded-[2rem] border-[4px] border-zinc-800 relative overflow-hidden shadow-2xl"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="p-4 h-full flex flex-col justify-end relative z-20">
                   <Instagram className="w-4 h-4 text-white/20 mb-2" />
                   <p className="font-mono text-[7px] text-zinc-500 uppercase tracking-widest mb-1">RobTales // 2019</p>
                   <div className="w-full h-px bg-white/10 mb-2" />
                   <span className="text-[10px] text-white/90 font-serif italic leading-tight">"Poetry in the raw dirt."</span>
                </div>
                <div className="absolute inset-x-0 top-0 h-1/2 bg-zinc-800/40 animate-pulse" />
             </motion.div>

             {/* Phone 2: Center - The Evolution (Primary) */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
               className="w-[38%] max-w-[200px] aspect-[9/19] bg-zinc-950 rounded-[2.5rem] border-[6px] border-zinc-800 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20 -mb-8 scale-110"
             >
                <div className="absolute inset-0 z-0">
                   <img src="/character-rob.jpg" className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity" alt="Rob Exhibit" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="p-5 h-full flex flex-col justify-end relative z-20">
                   <Play className="w-5 h-5 text-[hsl(43_72%_55%)] mb-3 fill-current" />
                   <p className="font-mono text-[8px] text-[hsl(43_72%_55%)] uppercase tracking-[0.3em] mb-1 font-black">Live Stats</p>
                   <h4 className="text-white font-display text-xs uppercase tracking-widest mb-1">Visual Anthology</h4>
                   <div className="flex gap-4 items-center">
                      <div className="flex flex-col">
                         <span className="text-white font-mono text-[9px] font-black tracking-tighter">84.2K</span>
                         <span className="text-zinc-600 text-[6px] uppercase tracking-widest">Views</span>
                      </div>
                      <div className="flex flex-col">
                         <span className="text-white font-mono text-[9px] font-black tracking-tighter">1.4K</span>
                         <span className="text-zinc-600 text-[6px] uppercase tracking-widest">Saves</span>
                      </div>
                   </div>
                </div>
             </motion.div>

             {/* Phone 3: Future Vision */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="w-1/3 max-w-[180px] aspect-[9/19] bg-zinc-900 rounded-[2rem] border-[4px] border-zinc-800 relative overflow-hidden shadow-2xl"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <div className="p-4 h-full flex flex-col justify-end relative z-20">
                   <Smartphone className="w-4 h-4 text-white/20 mb-2" />
                   <p className="font-mono text-[7px] text-zinc-500 uppercase tracking-widest mb-1">Digital Protocol</p>
                   <div className="w-full h-px bg-white/10 mb-2" />
                   <span className="text-[10px] text-white/60 font-mono tracking-tighter uppercase leading-tight font-black italic">Building in <br/> Silence.</span>
                </div>
                <div className="absolute inset-x-0 top-0 h-1/2 bg-zinc-800/40 animate-pulse" />
             </motion.div>
          </div>

        </div>


      </div>
    </section>
  );
};

export default AboutContact;
