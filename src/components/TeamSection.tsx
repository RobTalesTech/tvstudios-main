import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const TeamSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] w-full bg-[#030303] py-24 md:py-32 overflow-hidden border-t border-white/5" id="team">
      
      {/* Absolute minimal background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[hsl(43_72%_55%)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 mx-auto max-w-5xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
        
        {/* Key Visual (Portrait) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-[45%] lg:w-[40%] shrink-0"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-white/10 shadow-2xl bg-white/5 group">
             <img src="/founder.jpg" alt="Rohit Badgujar" className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
             
             <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(43_72%_55%)] mb-2">Director</p>
                <h3 className="font-display text-2xl text-white tracking-wide">Rohit Badgujar</h3>
             </div>
          </div>
        </motion.div>

        {/* Minimal Text Presence */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-[55%] lg:w-[60%] flex flex-col items-start"
        >
           <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-8 leading-tight">
             Vision over <br className="hidden md:block" />
             <span className="italic text-white/40">Visibility.</span>
           </h2>
           
           <p className="font-body text-base md:text-lg text-white/60 leading-relaxed font-light mb-12 max-w-md">
             Built by independent filmmakers and technologists. We centralize creative power to architect unparalleled brand authority.
           </p>

           <Link 
             to="/services"
             className="group flex items-center gap-4 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
           >
             Explore Our Services
             <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-white/50 group-hover:bg-white/10 transition-all">
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
             </div>
           </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
