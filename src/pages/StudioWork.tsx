import Footer from "@/components/Footer";
import CinematicReel from "@/components/CinematicReel";
import { motion } from "framer-motion";
import { PlayCircle, Settings, CheckCircle2, Users, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const StudioWork = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      
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
                  Every <span className="text-white">UNIT</span> is dedicated to the specific creation associated with there full time and focus towards.
               </p>
            </div>
          </div>

          {/* 2. THE BROADCAST UNITS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
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
                  <Link to="/unit/01" className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-yellow-500 group-hover/link:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" /> ENTER UNIT: Imaginative Production Signal
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* TvUnit 02 */}
            <motion.div 
               id="studio-unit-02"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="h-full"
            >
              <div className="flex flex-col h-full bg-emerald-500/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all">
                <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-1 pointer-events-none">
                  <Users className="w-10 h-10 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors" />
                  <span className="text-[9px] font-mono text-emerald-500/40 font-black">CREW 15</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10 pointer-events-none">TvUnit 02</h3>
                <p className="text-emerald-500/80 font-bold uppercase tracking-widest text-[10px] mb-6 relative z-10 pointer-events-none">Webshow Release • In Production</p>
                <p className="text-muted-foreground text-[13px] md:text-sm leading-relaxed mb-auto relative z-10 pointer-events-none">
                  Releasing soon with 09 episodes... and in production. The studio is getting ahead with its experimental tech blend, accelerating the pipeline without losing the raw feel.
                </p>
                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/5 relative z-10">
                  <Link to="/unit/02" className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover/link:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" /> ENTER UNIT: Active Production Floor
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
                <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-6 relative z-10 pointer-events-none">YouTube Channel • Growth & Target</p>
                <p className="text-muted-foreground text-[13px] md:text-sm leading-relaxed mb-auto relative z-10 pointer-events-none">
                  Launching Youtube Channel for fast, targeted growth. Features Music Videos paired with regional satire and marketing mediums. This is about serving our own area and market first.
                </p>
                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/5 relative z-10">
                  <Link to="/unit/03" className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-blue-500 group-hover/link:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" /> ENTER UNIT: Live Campaign Active
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
                  <Link to="/unit/04" className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-purple-500 group-hover/link:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" /> ENTER UNIT: Active Pipeline Showcase
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
                  <Link to="/unit/05" className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-[hsl(43_72%_55%)] group-hover/link:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" /> ENTER UNIT: Elite Intake Portal
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* TvUnit 06 - AI FILMMAKING HUB */}
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
                  <Link to="/unit/06" className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer w-full group/link py-2">
                     <div className="w-2 h-2 rounded-full bg-[#00FF66] group-hover/link:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" /> ENTER UNIT: AI Visual Lab
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      <CinematicReel />
      <Footer />
    </div>
  );
};

export default StudioWork;
