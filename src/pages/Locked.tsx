import { Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Locked() {
  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 text-center font-mono selection:bg-red-600 selection:text-white relative overflow-hidden">
      {/* Grid Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] pointer-events-none z-0" />
      
      {/* Ambient background red glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] bg-red-600/[0.04] blur-[100px] rounded-full" />
      
      <div className="relative z-10 max-w-md w-full border border-red-500/20 bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.05)]">
        <div className="w-16 h-16 rounded-full bg-red-950/30 border border-red-500/30 text-red-500 mx-auto mb-6 flex items-center justify-center animate-pulse">
          <Lock className="w-7 h-7" />
        </div>
        
        <h1 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-red-500 mb-3">
          Pipeline Locked
        </h1>
        
        <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent w-full my-4" />
        
        <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest leading-relaxed mb-8">
          System upgrades are actively running on the production servers. Central operations have bypassed access to this TvUnit parameter.
        </p>

        <div className="flex flex-col gap-3">
          <Link 
            to="/" 
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-white text-black font-display text-xs uppercase font-black tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:shadow-none hover:scale-[1.02]"
          >
            Central Operations
          </Link>
          
          <Link 
            to="/services" 
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white/15 text-zinc-400 hover:text-white hover:bg-white/5 font-display text-xs uppercase font-bold tracking-widest rounded-xl transition-all duration-300"
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
