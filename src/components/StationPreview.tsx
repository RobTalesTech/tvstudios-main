import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Radio, Users, Cpu, Film } from "lucide-react";
import { useEffect, useState } from "react";

const tvUnits = [
  {
    id: "unit-05",
    path: "/unit/05",
    label: "TV UNIT 05 • FLAGSHIP",
    headline: "CLASSIFIED // PROJECT 05",
    ticker: "BRADCASTING CLASSIFIED INTEL — THE FIRST OTT PRODUCTION FROM TV STUDIOS — SECONDARY & TERTIARY POSITIONS OPEN — JOIN THE COLLECTIVE",
    subline: "Core Team Collaborations Secured. Currently scouting secondary and tertiary members for Assistant Direction (ADs) and Production Management.",
    accentColor: "gold",
    dotClass: "bg-[hsl(43_72%_55%)]",
    tagClass: "bg-[hsl(43_72%_55%)]/10 border-[hsl(43_72%_55%)]/40 text-[hsl(43_72%_55%)]",
    borderHover: "hover:border-[hsl(43_72%_55%)]/40 hover:shadow-[0_0_50px_rgba(212,175,55,0.08)]",
    glowBar: "bg-[hsl(43_72%_55%)]",
    icon: Film,
    themeStyles: "text-[hsl(43_72%_55%)] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
  },
  {
    id: "unit-03",
    path: "/unit/03",
    label: "TV UNIT 03 • THE BLEND",
    content: [
      {
        headline: "LAGIN BEGIN",
        ticker: "KHANDESHI MUSICAL ALBUM — 230M+ AUDIENCE IN DIRECT IMPACT ZONE — FIRST BRAND CAMPAIGN BY TV STUDIOS — LIVE NOW",
        subline: "The first brand campaign targeting a massive cultural region. Music, AI visuals, and regional branding fused into one weapon.",
        path: "/unit/03#campaign-poster",
        accentColor: "blue",
        dotClass: "bg-blue-500",
        tagClass: "bg-blue-500/10 border-blue-500/40 text-blue-400",
        borderHover: "hover:border-[#D4AF37]/30",
        glowBar: "bg-[#800000]",
        themeStyles: "text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] bg-clip-text",
        borderStyle: "border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.15)]",
        icon: Cpu
      },
      {
        headline: "MUSIC VIDEO COLLABORATE",
        ticker: "DIRECTOR'S SPECIAL — INSTANT FUNDING OPPORTUNITY — UNMATCHED CREATIVE FREEDOM — BHARAT THEME",
        subline: "A specialized fund for a high-impact Music Video project. This is a direct engagement for visionary stakeholders.",
        path: "#music-video-poster",
        accentColor: "red",
        dotClass: "bg-red-500",
        tagClass: "bg-red-500/10 border-red-500/40 text-red-500",
        borderHover: "hover:border-red-500/30",
        glowBar: "bg-red-500",
        icon: Users,
        themeStyles: "text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
      }
    ]
  },
];

const StationPreview = () => {
  const [toggleIndex, setToggleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setToggleIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

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
            TvUnit{" "}
            <span className="italic text-zinc-500 font-serif lowercase">Productions</span>
          </h2>
        </motion.div>

        {/* Breaking News TVs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
          {/* Unit 02 - Fixed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full"
          >
            <Link
              to={tvUnits[0].path}
              className={`group block h-full relative rounded-2xl border border-white/10 ${tvUnits[0].borderHover} bg-black overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.04)]`}
            >
              <div className="p-2 md:p-2.5 h-full">
                <div className="relative h-full rounded-xl border border-white/15 bg-[#0a0a0a] overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,1)] flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none z-30" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-30" />
                  
                  {/* Subtle Background Icon */}
                  {(() => {
                    const UnitIcon = tvUnits[0].icon;
                    return <UnitIcon className="absolute -right-8 -bottom-8 w-48 h-48 text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700 pointer-events-none z-0" />;
                  })()}

                  <div className="relative z-20 px-5 md:px-6 pt-12 pb-6 min-h-[300px] flex-1 flex flex-col">
                    {/* ═══ CLASSIFIED INTEL RED BAR ═══ */}
                    <div className="relative z-[40] bg-red-600 px-4 py-2 flex items-center gap-3 shadow-[0_2px_20px_rgba(220,38,38,0.4)]">
                      <span className="w-2 h-2 rounded-full bg-white animate-[pulse_0.8s_ease-in-out_infinite]" />
                      <span className="font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-white">
                        Classified Intel
                      </span>
                      <div className="ml-auto flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                        <span className="font-mono text-[8px] uppercase tracking-widest text-white/80 hidden sm:inline">
                          ENCRYPTED
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-1.5 h-1.5 rounded-full ${tvUnits[0].dotClass} animate-[pulse_1.5s_ease-in-out_infinite]`} />
                      <span className={`font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] border px-2.5 py-0.5 rounded ${tvUnits[0].tagClass}`}>
                        {tvUnits[0].label}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight leading-none uppercase">
                      {tvUnits[0].headline}
                    </h3>
                    <p className="font-body text-xs md:text-sm text-zinc-400 leading-relaxed mb-5 max-w-[90%]">
                      {tvUnits[0].subline}
                    </p>
                    <div className="mt-auto inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-md group-hover:bg-white/10 transition-colors w-fit">
                      <span className="font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                        SUBMIT RESUME — CLICK TO ENTER
                      </span>
                    </div>
                  </div>

                  <div className="relative z-20 bg-[#111] border-t border-white/10 overflow-hidden">
                    <div className="flex items-center">
                      <div className={`shrink-0 ${tvUnits[0].glowBar} px-3 py-2 z-10`}>
                        <span className="font-mono text-[8px] md:text-[9px] font-black uppercase tracking-widest text-black font-bold">TVS</span>
                      </div>
                      <div className="overflow-hidden flex-1">
                        <motion.div
                          animate={{ x: ["0%", "-50%"] }}
                          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                          className="flex w-fit whitespace-nowrap"
                        >
                          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-zinc-500 px-6 py-2">
                            {tvUnits[0].ticker} &nbsp;•&nbsp; {tvUnits[0].ticker}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Unit 03 - Toggled */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full"
          >
            <Link
              to={tvUnits[1].content[toggleIndex].path}
              onClick={(e) => handleLinkClick(e, tvUnits[1].content[toggleIndex].path)}
              className={`group block h-full relative rounded-2xl border ${tvUnits[1].content[toggleIndex].borderStyle || 'border-white/10'} ${tvUnits[1].content[toggleIndex].borderHover} bg-black overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.04)]`}
            >
              <div className="p-2 md:p-2.5 h-full">
                <div className="relative h-full rounded-xl border border-white/15 bg-[#0a0a0a] overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,1)] flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none z-30" />
                  
                  {/* Subtle Background Icon */}
                  {(() => {
                    const ContentIcon = tvUnits[1].content[toggleIndex].icon;
                    return <ContentIcon className="absolute -right-8 -bottom-8 w-48 h-48 text-white/[0.015] group-hover:text-white/[0.04] transition-colors duration-700 pointer-events-none z-0" />;
                  })()}

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
                  
                  {/* Flicker Overlay that triggers when content switches */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={toggleIndex}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-white z-[35] pointer-events-none"
                    />
                  </AnimatePresence>

                  <div className="relative z-20 px-5 md:px-6 pt-12 pb-6 min-h-[300px] flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-1.5 h-1.5 rounded-full ${tvUnits[1].content[toggleIndex].dotClass} animate-[pulse_1.5s_ease-in-out_infinite]`} />
                      <span className={`font-mono text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] border px-2.5 py-0.5 rounded ${tvUnits[1].content[toggleIndex].tagClass}`}>
                        {tvUnits[1].label}
                      </span>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={toggleIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex-1 flex flex-col"
                      >
                        <h3 className={`font-display text-3xl md:text-4xl lg:text-5xl font-black mb-3 tracking-tight leading-none uppercase ${tvUnits[1].content[toggleIndex].themeStyles || 'text-white'}`}>
                          {tvUnits[1].content[toggleIndex].headline}
                        </h3>
                        <p className="font-body text-xs md:text-sm text-zinc-400 leading-relaxed mb-5 max-w-[90%]">
                          {tvUnits[1].content[toggleIndex].subline}
                        </p>
                        <div className="mt-auto inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-md group-hover:bg-white/10 transition-colors w-fit">
                          <span className="font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/100 group-hover:text-white transition-colors">
                            ENTER UNIT — LIVE CASE STUDY
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="relative z-20 bg-[#111] border-t border-white/10 overflow-hidden">
                    <div className="flex items-center">
                      <div className={`shrink-0 ${tvUnits[1].content[toggleIndex].glowBar} px-3 py-2 z-10 shadow-[0_0_15px_rgba(255,0,0,0.3)]`}>
                        <span className="font-mono text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white font-bold">LIVE</span>
                      </div>
                      <div className="overflow-hidden flex-1">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={toggleIndex}
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                            className="flex w-fit whitespace-nowrap"
                          >
                            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-zinc-300 px-6 py-2">
                              {tvUnits[1].content[toggleIndex].ticker} &nbsp;•&nbsp; {tvUnits[1].content[toggleIndex].ticker}
                            </span>
                          </motion.div>
                        </AnimatePresence>
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
