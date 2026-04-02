import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Radio } from "lucide-react";

const stations = [
  {
    id: "station-02",
    path: "/studio-work",
    label: "STATION 02",
    headline: "HKD WEBSHOW",
    ticker: "09 EPISODES IN PRODUCTION — HYBRID AI + REAL FILMMAKING — FIRST STUDIO WEBSERIES RELEASING SOON",
    subline: "The studio's first hybrid AI + real production webseries. Raw storytelling meets next-gen cinematic technology.",
    accentColor: "emerald",
    dotClass: "bg-emerald-500",
    tagClass: "bg-emerald-500/10 border-emerald-500/40 text-emerald-400",
    borderHover: "hover:border-emerald-500/30",
    glowBar: "bg-emerald-500",
  },
  {
    id: "station-03",
    path: "/station/03",
    label: "STATION 03",
    headline: "LAGIN BIGIN",
    ticker: "KHANDESHI MUSICAL ALBUM — 230M+ AUDIENCE IN DIRECT IMPACT ZONE — FIRST BRAND CAMPAIGN BY TV STUDIOS — LIVE NOW",
    subline: "The first brand campaign targeting a massive cultural region. Music, AI visuals, and regional branding fused into one weapon.",
    accentColor: "blue",
    dotClass: "bg-blue-500",
    tagClass: "bg-blue-500/10 border-blue-500/40 text-blue-400",
    borderHover: "hover:border-blue-500/30",
    glowBar: "bg-blue-500",
  },
];

const StationPreview = () => {
  return (
    <section className="relative w-full bg-[#020202] py-20 md:py-28 border-t border-white/5 overflow-hidden">
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
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[hsl(43_72%_55%)] mb-3 drop-shadow-[0_0_8px_hsla(43,72%,55%,0.5)]">
            Now Broadcasting
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            Studio{" "}
            <span className="italic text-zinc-500 font-serif">Productions</span>
          </h2>
        </motion.div>

        {/* Two Breaking News TVs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {stations.map((station, idx) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
            >
              <Link
                to={station.path}
                className={`group block relative rounded-2xl border border-white/10 ${station.borderHover} bg-black overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.04)]`}
              >
                {/* TV outer bezel */}
                <div className="p-2 md:p-2.5">
                  {/* The Screen */}
                  <div className="relative rounded-xl border border-white/15 bg-[#0a0a0a] overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,1)]">
                    
                    {/* CRT scan-line + noise */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none z-30" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-30" />

                    {/* ═══ BREAKING NEWS RED BAR ═══ */}
                    <div className="relative z-20 bg-red-600 px-4 py-2 flex items-center gap-3 shadow-[0_2px_20px_rgba(220,38,38,0.4)]">
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

                    {/* ═══ MAIN CONTENT AREA ═══ */}
                    <div className="relative z-20 px-5 md:px-6 pt-6 pb-4">
                      {/* Station tag */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`w-1.5 h-1.5 rounded-full ${station.dotClass} animate-[pulse_1.5s_ease-in-out_infinite]`} />
                        <span className={`font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] border px-2.5 py-0.5 rounded ${station.tagClass}`}>
                          {station.label}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight leading-none uppercase">
                        {station.headline}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-xs md:text-sm text-zinc-400 leading-relaxed mb-5 max-w-[90%]">
                        {station.subline}
                      </p>

                      {/* COMING SOON badge */}
                      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-md group-hover:bg-white/10 transition-colors">
                        <span className="font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                          Coming Soon — Click to Enter
                        </span>
                      </div>
                    </div>

                    {/* ═══ SCROLLING NEWS TICKER ═══ */}
                    <div className="relative z-20 bg-[#111] border-t border-white/10 overflow-hidden">
                      <div className="flex items-center">
                        {/* Fixed label */}
                        <div className={`shrink-0 ${station.glowBar} px-3 py-2 z-10`}>
                          <span className="font-mono text-[8px] md:text-[9px] font-black uppercase tracking-widest text-black">
                            TVS
                          </span>
                        </div>
                        {/* Scrolling text */}
                        <div className="overflow-hidden flex-1">
                          <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                              duration: 18,
                              ease: "linear",
                              repeat: Infinity,
                            }}
                            className="flex w-fit whitespace-nowrap"
                          >
                            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-zinc-500 px-6 py-2">
                              {station.ticker} &nbsp;•&nbsp; {station.ticker}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TV bottom — indicator lights */}
                  <div className="flex items-center justify-between mt-1.5 px-2">
                    <div className="flex gap-1.5">
                      <div className="h-1 w-5 rounded-full bg-white/10" />
                      <div className="h-1 w-5 rounded-full bg-red-500/40 group-hover:bg-red-500/80 transition-colors" />
                      <div className="h-1 w-5 rounded-full bg-white/10" />
                    </div>
                    <Radio className="w-3.5 h-3.5 text-zinc-800 group-hover:text-zinc-600 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StationPreview;
