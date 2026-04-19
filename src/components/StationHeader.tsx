import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";

interface StationHeaderProps {
  unitNumber: string;
  unitTitle: string;
  status?: string;
  statusColor?: string;
  breadcrumbLink?: string;
  breadcrumbLabel?: string;
}

const StationHeader = ({
  unitNumber,
  unitTitle,
  status = "Active Protocol",
  statusColor = "#D4AF37",
  breadcrumbLink = "/studio-work",
  breadcrumbLabel = "Exit Unit Hub"
}: StationHeaderProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-20 border-b border-white/5 pb-8 gap-6">
      <Link 
        to={breadcrumbLink} 
        className="inline-flex items-center gap-3 text-zinc-500 hover:text-white transition-all font-mono text-[10px] uppercase tracking-[0.4em] group"
      >
        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> 
        {breadcrumbLabel}
      </Link>
      
      <div className="flex flex-wrap items-center gap-6">
         <div className="flex items-center gap-3 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-full">
           <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.5em] font-black">{unitNumber}</span>
           <div className="w-px h-3 bg-white/10" />
           <span className="font-mono text-[9px] text-white uppercase tracking-[0.3em] font-bold">{unitTitle}</span>
         </div>
         
         <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-white/10 rounded-full">
           <div 
             className="w-1.5 h-1.5 rounded-full animate-pulse" 
             style={{ backgroundColor: statusColor }}
           />
           <span 
             className="font-mono text-[8px] font-black uppercase tracking-[0.3em]"
             style={{ color: statusColor }}
           >
             {status}
           </span>
         </div>
         
         <div className="flex items-center gap-2 opacity-30">
            <ShieldCheck className="w-3 h-3 text-zinc-500" />
            <span className="font-mono text-[7px] text-zinc-500 uppercase tracking-widest font-black">Encrypted</span>
         </div>
      </div>
    </div>
  );
};

export default StationHeader;
