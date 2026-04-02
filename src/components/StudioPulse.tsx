import { motion } from "framer-motion";
import { Play } from "lucide-react";

// Massive data array combining posts, cinematic frames, and reels
const FILM_STRIP_DATA = [
  { id: 1, type: "post", url: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800", title: "Cinematography Pre-Prod", copy: "Chasing the ultimate golden hour for the upcoming automotive spot." },
  { id: 2, type: "reel", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800", title: "Audio Architecture", copy: "The sound division locking in spatial frequencies." },
  { id: 3, type: "tv", url: "https://images.unsplash.com/photo-1600155018318-de90d34633d3?w=800", title: "Pipeline Render", copy: "Final passes on the AI generation matrix." },
  { id: 4, type: "post", url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800", title: "Studio Manifesto", copy: "We don't follow trends. We establish the baseline." },
  { id: 5, type: "reel", url: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800", title: "Location Scout", copy: "Mapping the physical set against the neural network." },
  { id: 6, type: "tv", url: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=800", title: "Color Grading", copy: "Applying the original HMF aesthetic." },
];

const FilmStripRow = ({ items, direction, tintClass, speed }: { items: any[], direction: "left" | "right", tintClass: string, speed: number }) => {
  return (
    <div className="flex w-full overflow-hidden group mb-4">
      <motion.div
        className="flex gap-4 w-fit"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {/* We double the array to ensure perfect seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <div 
            key={`${item.id}-${idx}`}
            className="group/card relative w-[250px] md:w-[320px] shrink-0 overflow-hidden rounded-md border border-white/10 bg-black transition-all duration-700 hover:z-20 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            style={{ animationPlayState: 'paused' }} /* Controlled by parent group hover below using pure css */
          >
            {/* The Aspect Frame */}
            <div className={`relative ${item.type === "reel" ? "aspect-[9/16]" : "aspect-[16/9]"} w-full overflow-hidden`}>
              <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover/card:opacity-0" />
              <img 
                src={item.url} 
                alt={item.title} 
                className={`h-full w-full object-cover transition-all duration-700 ${tintClass} group-hover/card:!sepia-0 group-hover/card:!grayscale-0 group-hover/card:!opacity-100`}
              />
              
              {/* Type Indicator */}
              <div className="absolute top-2 right-2 z-20">
                {item.type === "reel" && <Play className="w-4 h-4 text-white drop-shadow-md" />}
                {item.type === "tv" && <div className="px-2 border border-white/50 bg-black/50 text-[8px] font-mono text-white rounded">TV FRAME</div>}
              </div>
            </div>

            {/* Hidden Info that appears on hover */}
            <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100 z-30">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFF] mb-1 block">TVS // {item.title}</span>
              <p className="font-body text-xs text-white/80 leading-snug">
                {item.copy}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const StudioPulse = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#020202] py-24 md:py-32 border-t border-white/5 shadow-[inset_0_50px_100px_rgba(0,0,0,1)]">
       {/* Cinematic Projector Glow */}
       <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50%] w-[100%] bg-[hsl(43_72%_55%)]/5 blur-[150px] z-0" />
       
       <div className="relative z-10 mx-auto w-full px-4 md:px-8 max-w-[1600px]">
         <div className="mb-16 flex flex-col items-center justify-center text-center">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
             <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
               Studio <span className="text-zinc-600 italic font-serif">Motion</span>
             </h2>
             <p className="mt-4 max-w-xl font-body text-[10px] sm:text-xs text-white/50 tracking-[0.3em] uppercase border-b border-white/10 pb-4">
               SILENT PROJECTION. HOVER TO ILLUMINATE.
             </p>
           </motion.div>
         </div>

         {/* The 3 Film Strips */}
         <style dangerouslySetInnerHTML={{__html: `
           .group:hover .flex > div { animation-play-state: paused !important; }
         `}} />
         
         <div className="flex flex-col gap-2 md:gap-4 relative group">
           {/* Strip 1: Saffron Tint */}
           <FilmStripRow 
             items={FILM_STRIP_DATA} 
             direction="left" 
             tintClass="sepia-[.8] hue-rotate-[-30deg] saturate-150 mix-blend-luminosity opacity-40" 
             speed={45} 
           />
           
           {/* Strip 2: Blue/Cyan Tint */}
           <FilmStripRow 
             items={[...FILM_STRIP_DATA].reverse()} 
             direction="right" 
             tintClass="sepia-[.5] hue-rotate-[180deg] saturate-[2] mix-blend-color opacity-40" 
             speed={55} 
           />

           {/* Strip 3: Emerald Tint */}
           <FilmStripRow 
             items={[...FILM_STRIP_DATA.slice(2), ...FILM_STRIP_DATA.slice(0, 2)]} 
             direction="left" 
             tintClass="sepia-[.5] hue-rotate-[90deg] saturate-[1.5] mix-blend-luminosity opacity-40" 
             speed={40} 
           />

           {/* Central Overlay for depth (vignette) */}
           <div className="pointer-events-none absolute inset-0 shadow-[inset_100px_0_100px_#020202,inset_-100px_0_100px_#020202]" />
         </div>
       </div>
    </section>
  );
};

export default StudioPulse;
