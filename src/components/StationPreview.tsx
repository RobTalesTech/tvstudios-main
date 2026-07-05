import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cpu, Film } from "lucide-react";

const StationPreview = () => {
  return (
    <section className="relative w-full bg-[#020202] py-20 md:py-28 border-t border-white/5 overflow-hidden font-display">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50%] w-[70%] bg-red-500/[0.03] blur-[120px] rounded-full" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[hsl(43_72%_55%)] mb-3 drop-shadow-[0_0_8px_hsla(43_72%,55%,0.5)]">
            Now Broadcasting
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            frequent{" "}
            <span className="italic text-zinc-500 font-serif lowercase">services.</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
          
          {/* Post Production Services Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full"
          >
            <Link
              to="/services#post-production"
              className="group block h-full relative rounded-2xl border border-white/10 hover:border-[hsl(43_72%_55%)]/40 bg-black overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.04)]"
            >
              <div className="p-2 md:p-2.5 h-full">
                <div className="relative h-full rounded-xl border border-white/15 bg-[#0a0a0a] overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,1)] flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none z-30" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-30" />
                  
                  {/* Subtle Background Icon */}
                  <Film className="absolute -right-8 -bottom-8 w-48 h-48 text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700 pointer-events-none z-0" />

                  <div className="relative z-20 px-5 md:px-6 pt-12 pb-6 min-h-[300px] flex-1 flex flex-col">
                    {/* ═══ OPERATIONS INTEL RED BAR ═══ */}
                    <div className="relative z-[40] bg-red-600 px-4 py-2 flex items-center gap-3 shadow-[0_2px_20px_rgba(220,38,38,0.4)]">
                      <span className="w-2 h-2 rounded-full bg-white animate-[pulse_0.8s_ease-in-out_infinite]" />
                      <span className="font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-white">
                        Operations Intel
                      </span>
                      <div className="ml-auto flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                        <span className="font-mono text-[8px] uppercase tracking-widest text-white/80 hidden sm:inline">
                          ONLINE
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 mt-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-[hsl(43_72%_55%)] animate-[pulse_1.5s_ease-in-out_infinite]" />
                      <span className="font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] border px-2.5 py-0.5 rounded bg-[hsl(43_72%_55%)]/10 border-[hsl(43_72%_55%)]/40 text-[hsl(43_72%_55%)]">
                        POST PRODUCTION
                      </span>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight leading-none uppercase group-hover:text-[hsl(43_72%_55%)] transition-colors">
                        CINEMATIC POST PRODUCTION
                      </h3>
                      <p className="font-body text-xs md:text-sm text-zinc-400 leading-relaxed mb-5 max-w-[90%]">
                        From raw rushes to prestige master files. Premium color grading, high-end soundscapes, dynamic VFX, and sound design pipelines.
                      </p>
                      <div className="mt-auto inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-md group-hover:bg-white/10 transition-colors w-fit">
                        <span className="font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                          EXPLORE POST SERVICES — CLICK TO VIEW
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-20 bg-[#111] border-t border-white/10 overflow-hidden">
                    <div className="flex items-center">
                      <div className="shrink-0 bg-[hsl(43_72%_55%)] px-3 py-2 z-10">
                        <span className="font-mono text-[8px] md:text-[9px] font-black uppercase tracking-widest text-black font-bold">TV³</span>
                      </div>
                      <div className="overflow-hidden flex-1">
                        <motion.div
                          animate={{ x: ["0%", "-50%"] }}
                          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                          className="flex w-fit whitespace-nowrap"
                        >
                          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-zinc-500 px-6 py-2">
                            POST PRODUCTION SERVICES • COLOR GRADING • AUDIO ARCHITECTURE • VFX PIPELINE • DISCOVER SERVICE MATRIX • LIVE INTAKE OPEN &nbsp;•&nbsp; POST PRODUCTION SERVICES • COLOR GRADING • AUDIO ARCHITECTURE • VFX PIPELINE • DISCOVER SERVICE MATRIX • LIVE INTAKE OPEN
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* UGC Ad Reels Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full"
          >
            <Link
              to="/services#ugc-ad-reels"
              className="group block h-full relative rounded-2xl border border-white/10 hover:border-red-500/30 bg-black overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.04)]"
            >
              <div className="p-2 md:p-2.5 h-full">
                <div className="relative h-full rounded-xl border border-white/15 bg-[#0a0a0a] overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,1)] flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none z-30" />
                  
                  {/* Subtle Background Icon */}
                  <Cpu className="absolute -right-8 -bottom-8 w-48 h-48 text-white/[0.015] group-hover:text-white/[0.04] transition-colors duration-700 pointer-events-none z-0" />

                  {/* ═══ BREAKING NEWS RED BAR ═══ */}
                  <div className="relative z-[40] bg-red-600 px-4 py-2 flex items-center gap-3 shadow-[0_2px_20px_rgba(220,38,38,0.4)]">
                    <span className="w-2 h-2 rounded-full bg-white animate-[pulse_0.8s_ease-in-out_infinite]" />
                    <span className="font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-white">
                      Breaking News
                    </span>
                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                      <span className="font-mono text-[8px] uppercase tracking-widest text-white/80 hidden sm:inline">
                        LIVE
                      </span>
                    </div>
                  </div>

                  <div className="relative z-20 px-5 md:px-6 pt-12 pb-6 min-h-[300px] flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4 mt-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
                      <span className="font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] border px-2.5 py-0.5 rounded bg-red-500/10 border-red-500/40 text-red-500">
                        UGC AD REELS
                      </span>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-black mb-3 tracking-tight leading-none uppercase text-white group-hover:text-[hsl(43_72%_55%)] transition-colors">
                        HIGH RETENTION UGC ADS
                      </h3>
                      <p className="font-body text-xs md:text-sm text-zinc-400 leading-relaxed mb-5 max-w-[90%]">
                        Stop scrolling and start converting. We fuse organic creator footage with custom generative AI swaps and elite motion graphics.
                      </p>
                      <div className="mt-auto inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-md group-hover:bg-white/10 transition-colors w-fit">
                        <span className="font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/100 group-hover:text-white transition-colors">
                          EXPLORE UGC SERVICES — CLICK TO VIEW
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-20 bg-[#111] border-t border-white/10 overflow-hidden">
                    <div className="flex items-center">
                      <div className="shrink-0 bg-red-600 px-3 py-2 z-10 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                        <span className="font-mono text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white font-bold">LIVE</span>
                      </div>
                      <div className="overflow-hidden flex-1 pause-marquee">
                        <div
                          className="animate-marquee-left"
                          style={{ "--speed": "25s" } as React.CSSProperties}
                        >
                          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-zinc-300 px-6 py-2">
                            UGC AD REELS • PULSING SCROLL STOPPERS • 40% OFF INTRODUCTORY PACKAGE • LIVE INTAKE OPEN &nbsp;•&nbsp; UGC AD REELS • PULSING SCROLL STOPPERS • 40% OFF INTRODUCTORY PACKAGE • LIVE INTAKE OPEN
                          </span>
                          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-zinc-300 px-6 py-2">
                            UGC AD REELS • PULSING SCROLL STOPPERS • 40% OFF INTRODUCTORY PACKAGE • LIVE INTAKE OPEN &nbsp;•&nbsp; UGC AD REELS • PULSING SCROLL STOPPERS • 40% OFF INTRODUCTORY PACKAGE • LIVE INTAKE OPEN
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StationPreview;
