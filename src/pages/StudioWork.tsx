import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { PlayCircle, Settings, CheckCircle2, Radio } from "lucide-react";
import { Link } from "react-router-dom";

const StudioWork = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      
      {/* Ongoing Productions Section */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-[hsl(43_72%_55%)] mb-4">
              STUDIO JOURNEY
            </h2>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8 leading-tight">
              WITH STUDIO THE BRANDS MOVES AND <br className="hidden md:block"/> TOGETHER THE MARKET MOVES.
            </h3>
            
            <p className="font-mono text-xs md:text-sm text-white/40 uppercase tracking-widest mb-10 border-l-2 border-[hsl(43_72%_55%)] pl-4">
              Building the world of studio where everybody is chasing universe.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Founded by an engineer with 14 years of cinematic filmmaking experience, TV Studios is built for the coming era of digital content. We are pioneering a new global standard: authentic AI Filmmaking. When the world looks for the absolute best in AI video production, our deep roots in real filmmaking make us the unquestionable authority in this category. We leverage this technology to fund, scale, and execute epic, high-budget productions—partnering with visionary brands to treat content not as mere marketing, but as a monumental cultural investment.
              </p>
              
              <blockquote className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm relative">
                <div className="absolute top-0 left-8 -translate-y-1/2 bg-[#020202] px-2 text-[hsl(43_72%_55%)] font-mono text-[10px] tracking-widest uppercase font-bold">
                  Philosophy
                </div>
                <p className="font-serif italic text-white/90 text-sm md:text-base leading-relaxed">
                  "Companies invest daily money on marketing material — but a brand doesn't need marketing. A brand shows its interest in Art and enjoys the process of creation. They serve delight."
                </p>
              </blockquote>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* TvStation 01 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <div className="block h-full bg-yellow-500/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-yellow-500/30 hover:bg-yellow-500/10 transition-all flex flex-col">
                <div className="absolute top-0 right-0 p-6">
                  <Radio className="w-12 h-12 text-yellow-500/30 group-hover:text-yellow-500/60 transition-colors" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10">TvStation 01</h3>
                <p className="text-yellow-500/80 font-bold uppercase tracking-widest text-xs mb-6 relative z-10">Kids Content Services</p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-auto relative z-10">
                  Starting services for kids content as this is the billion-dollar niche. The cuteness behind this is pure—"bachche man ke sachche". We create with absolute imagination and authentic joy.
                </p>
                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-3 text-xs font-semibold text-white/70">
                     <div className="w-2 h-2 rounded-full bg-yellow-500 animate-[pulse_1.5s_ease-in-out_infinite]" /> Exploring Imaginative Frontiers
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TvStation 02 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
            >
              <div className="block h-full bg-emerald-500/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all flex flex-col">
                <div className="absolute top-0 right-0 p-6">
                  <Radio className="w-12 h-12 text-emerald-500/30 group-hover:text-emerald-500/60 transition-colors" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10">TvStation 02</h3>
                <p className="text-emerald-500/80 font-bold uppercase tracking-widest text-xs mb-6 relative z-10">Webshow Release • In Production</p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-auto relative z-10">
                  Releasing soon with 09 episodes... and in production. The studio is getting ahead with its massive tech blend, accelerating the pipeline without losing the raw feel.
                </p>
                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-3 text-xs font-semibold text-white/70">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_1.5s_ease-in-out_infinite]" /> Active Hybrid Production Floor
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TvStation 03 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
            >
              <Link to="/station/03" className="block h-full bg-blue-500/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-blue-500/50 hover:bg-blue-500/10 transition-all flex flex-col cursor-pointer">
                <div className="absolute top-0 right-0 p-6">
                  <Radio className="w-12 h-12 text-blue-500/20 group-hover:text-blue-500/60 transition-colors" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10">TvStation 03</h3>
                <p className="text-white/50 font-bold uppercase tracking-widest text-xs mb-6 relative z-10">YouTube Channel • Growth & Target</p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-auto relative z-10">
                  Launching Youtube Channel for fast, targeted growth. Features Music Videos paired with regional satire and marketing mediums. This is about serving our own area and market first.
                </p>
                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-3 text-xs font-semibold text-white/70">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-[pulse_1.5s_ease-in-out_infinite]" /> Live Campaign Active — Click to Enter
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* TvStation 04 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
            >
              <Link to="/station/04" className="block h-full bg-purple-500/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-purple-500/50 hover:bg-purple-500/10 transition-all flex flex-col cursor-pointer">
                <div className="absolute top-0 right-0 p-6">
                  <Radio className="w-12 h-12 text-purple-500/30 group-hover:text-purple-500/60 transition-colors" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 relative z-10">TvStation 04</h3>
                <p className="text-purple-500/80 font-bold uppercase tracking-widest text-xs mb-6 relative z-10">Branding and Advertisement Services</p>
                
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-auto relative z-10">
                  Built strictly for collaboration and personal growth together. We provide comprehensive brand architecture for peers and businesses ready to elevate.
                </p>

                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/10 relative z-10">
                  <div className="flex items-center gap-3 text-xs font-semibold text-white/70">
                     <div className="w-2 h-2 rounded-full bg-purple-500 animate-[pulse_1.5s_ease-in-out_infinite]" /> ENTER STATION: Active Pipeline Showcase
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* TvStation 05 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="lg:col-span-2"
            >
              <Link to="/station/05" className="block h-full bg-[hsl(43_72%_55%)]/5 backdrop-blur-md border border-[hsl(43_72%_55%)]/20 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-[hsl(43_72%_55%)]/50 hover:bg-[hsl(43_72%_55%)]/10 transition-all flex flex-col cursor-pointer">
                <div className="absolute top-0 right-0 p-6">
                  <Radio className="w-16 h-16 text-[hsl(43_72%_55%)]/30 group-hover:text-[hsl(43_72%_55%)]/60 transition-colors" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10">TvStation 05</h3>
                <p className="text-[hsl(43_72%_55%)] font-bold uppercase tracking-widest text-xs mb-6 relative z-10">Partner with the Empire</p>
                
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-auto max-w-3xl relative z-10">
                  The grand culmination. A real, physically shot webseries based out of the state, aiming directly at connecting the youth. A premium OTT production standing as the heart of our cinematic journey. We are creating unique concepts with high technical knowledge.
                </p>

                <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-[hsl(43_72%_55%)]/10 relative z-10">
                  <div className="flex items-center gap-3 text-xs font-semibold text-white">
                     <div className="w-3 h-3 rounded-full bg-[hsl(43_72%_55%)] animate-[pulse_1s_ease-in-out_infinite]" /> ENTER STATION: ELITE INTAKE PORTAL
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StudioWork;
