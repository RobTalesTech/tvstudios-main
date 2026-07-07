import { Lock, ArrowLeft, Terminal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Locked() {
  const location = useLocation();
  const path = location.pathname;

  const getUnitInfo = () => {
    switch (path) {
      case "/unit/01":
        return {
          title: "Unit 01: Generative Rendering Pipeline",
          desc: "Multi-node client rendering arrays are processing visual compute passes. Access is restricted during render blocks.",
          logs: [
            "CONNECTING TO GENERATIVE NODE 4A...",
            "AUTHENTICATING SECURE CLIENT TUNNEL...",
            "GRADING NODES: ACTIVE (30/30 COMPLETED)",
            "COMPUTING VOLUMETRIC RAY SCANS...",
            "STATUS: SHADER COMPILATION IN PROGRESS",
            "SECURE CLEARANCE LEVEL 4 REQUIRED."
          ]
        };
      case "/unit/02":
        return {
          title: "Unit 02: Audio Synthesis & Mastering Node",
          desc: "Custom brand audio synthesizers and mixing arrays are compiling sound profiles. Node is active and muted.",
          logs: [
            "INITIALIZING BRAND AUDIO SEED...",
            "SYNCHRONIZING DAW HOST CONTROLLERS...",
            "LATENCY CALIBRATED: 0.012MS STATUS OK",
            "INJECTING ALGORITHMIC HOOK FREQUENCY...",
            "STATUS: MIX MASTER BUFFER SECURED",
            "SECURE CLEARANCE LEVEL 4 REQUIRED."
          ]
        };
      case "/unit/03":
        return {
          title: "Unit 03: Broadcast Delivery Network",
          desc: "Multi-regional caching channels are linking satellite nodes across the active division footprint.",
          logs: [
            "LINKING PANSEMAL BASE BASE-00...",
            "MAPPING OUTBOUND ROUTING TO MH/GJ/MP...",
            "VASHI & NAGPUR SYNC: VERIFIED",
            "CACHING REGION-SPECIFIC CAMPAIGN INDEX...",
            "STATUS: BROADCAST BEACON TRANSMITTING",
            "SECURE CLEARANCE LEVEL 4 REQUIRED."
          ]
        };
      case "/unit/04":
        return {
          title: "Unit 04: Brand Narrative Suite",
          desc: "High-security copy suites and script archives are processing active client briefs under non-disclosure locks.",
          logs: [
            "COMPILING BRAND STORY ARCHIVE...",
            "CLIENT NDA DETECTOR: ENGAGED",
            "ENCRYPTING INTAKE VALUE PROPOSITIONS...",
            "DECRYPT KEY CHECK: FAILED [ATTEMPT RETRY]",
            "STATUS: ACCESS RESTRICTED BY NDA",
            "SECURE CLEARANCE LEVEL 4 REQUIRED."
          ]
        };
      case "/unit/05":
        return {
          title: "Unit 05: Talents Intake & Auditions Database",
          desc: "Encrypted actor/singer intake records and video audition pipelines are performing security indexing.",
          logs: [
            "SCANNING SECURE PORTFOLIO INGEST...",
            "UPLOADING VIDEO RESUMES TO SUPABASE...",
            "INDEXING TALENT CLASSIFICATIONS...",
            "STATUS: INDEX COMPLETED, PORTALS LOCKED",
            "SECURE CLEARANCE LEVEL 4 REQUIRED."
          ]
        };
      case "/unit/06":
        return {
          title: "Unit 06: Sovereign Finance Ledger",
          desc: "Sovereign operations ledger, digital pre-bookings, and escrow ledgers are locked behind clearing key protocols.",
          logs: [
            "CONNECTING SECURE BANKING ENDPOINT...",
            "VERIFYING DOUBLE-ENTRY ACCRUAL BALANCE...",
            "PRE-BOOKING INVOICES GENERATED: ACTIVE",
            "LEDGER RECONCILIATION: COMPLETED",
            "STATUS: ESCROW CLEARING PROTOCOLS ONLINE",
            "SECURE CLEARANCE LEVEL 4 REQUIRED."
          ]
        };
      default:
        return {
          title: "Unit Secure Pipeline",
          desc: "System upgrades are actively running on the production servers. Central operations have bypassed access.",
          logs: [
            "INITIALIZING SECURE PORT ROUTING...",
            "VERIFYING HANDSHAKE PROTOCOLS...",
            "STATUS: ENCRYPTED GATEWAY ONLINE",
            "SECURE CLEARANCE LEVEL 4 REQUIRED."
          ]
        };
    }
  };

  const unit = getUnitInfo();

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 text-center font-mono selection:bg-red-600 selection:text-white relative overflow-hidden">
      {/* Grid Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] pointer-events-none z-0" />
      
      {/* Ambient background red glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] bg-red-600/[0.04] blur-[120px] rounded-full animate-pulse" />
      
      <div className="relative z-10 max-w-xl w-full border border-red-500/20 bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.05)]">
        <div className="w-16 h-16 rounded-full bg-red-950/30 border border-red-500/30 text-red-500 mx-auto mb-6 flex items-center justify-center animate-pulse">
          <Lock className="w-7 h-7" />
        </div>
        
        <h1 className="text-lg md:text-xl font-black uppercase tracking-[0.25em] text-red-500 mb-3 leading-tight">
          {unit.title}
        </h1>
        
        <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent w-full my-4" />
        
        <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest leading-relaxed mb-6 text-justify">
          {unit.desc}
        </p>

        {/* SECURE HUD TERMINAL LOGS */}
        <div className="bg-black/60 border border-red-500/10 p-5 rounded-2xl mb-8 text-left space-y-2 relative overflow-hidden group">
          <div className="absolute top-3 right-3 flex items-center gap-1.5 text-red-500/40">
            <Terminal className="w-3.5 h-3.5" />
            <span className="text-[7px] font-bold tracking-widest">HUD_LOG</span>
          </div>
          {unit.logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className={`text-[8px] font-mono tracking-widest leading-relaxed flex items-center gap-2 ${
                log.includes("REQUIRED") ? "text-red-500 font-bold" :
                log.includes("ACTIVE") || log.includes("OK") ? "text-emerald-500" : "text-zinc-500"
              }`}
            >
              <span className="text-red-500/30">&gt;</span>
              {log}
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            to="/" 
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-white text-black font-display text-xs uppercase font-black tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:shadow-none hover:scale-[1.02]"
          >
            Central Operations
          </Link>
          
          <Link 
            to="/services" 
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border border-white/15 text-zinc-400 hover:text-white hover:bg-white/5 font-display text-xs uppercase font-bold tracking-widest rounded-xl transition-all duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Active Services
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-6 font-mono text-[8px] text-zinc-700 uppercase tracking-widest">
        SECURE BYPASS BY ORDER // TV³ STUDIOS
      </div>
    </div>
  );
}
