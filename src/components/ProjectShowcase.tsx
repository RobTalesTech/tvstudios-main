import { motion } from "framer-motion";
import { Play, Clapperboard, FolderOpen, Film } from "lucide-react";

const ProjectShowcase = () => {
  const works = [
    {
      title: "Children Web Show",
      status: "In Making",
      icon: <Clapperboard className="w-4 h-4 text-[hsl(43_72%_55%)]" />,
      description: "A brand-new format bridging entertainment and education for the next generation."
    },
    {
      title: "HKD",
      status: "Pre-Production",
      icon: <FolderOpen className="w-4 h-4 text-[hsl(43_72%_55%)]" />,
      description: "Shrouded in secrecy, this upcoming project sets a new benchmark in narrative styling."
    },
    {
      title: "Project LLB Webseries",
      status: "Scripting Phase",
      icon: <Film className="w-4 h-4 text-[hsl(43_72%_55%)]" />,
      description: "A tense, grounded look into the legal drama genre, pushing the boundaries of realism."
    }
  ];

  return (
    <section id="showcase" className="px-4 py-24 md:px-8 md:py-32 bg-[#020202] border-t border-white/5 relative overflow-hidden">
      {/* Background Grid Pattern for behind the scenes feel */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      
      <div className="mx-auto max-w-5xl relative z-10">
        <div className="mb-16 md:mb-20 flex flex-col items-center text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-[hsl(43_72%_55%)] flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(43_72%_55%)] animate-pulse" />
            Studio Work
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Ongoing <span className="italic text-white/50">Projects</span>
          </h2>
        </div>

        {/* TV Block for Studio Work */}
        <div className="mb-16">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#050505] shadow-2xl group flex items-center justify-center">
            <iframe
              src="https://www.youtube.com/embed/E2_tZlxc2aI?controls=1&showinfo=0&rel=0&modestbranding=1"
              title="Studio Work Updates"
              className="absolute inset-0 w-full h-full opacity-50 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <Play className="w-16 h-16 text-white/20 group-hover:text-white/60 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="absolute top-4 left-4 pointer-events-none">
               <span className="bg-black/80 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-red-500 border border-red-500/30 rounded-sm flex items-center gap-2 uppercase tracking-widest">
                 <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
                 LIVE STUDIO FEED
               </span>
            </div>
          </div>
        </div>

        {/* The 3 Projects Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {works.map((work, idx) => (
            <div 
              key={idx}
              className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg p-8 transition-transform duration-500 hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                {work.icon}
                <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm border border-white/20 text-white/60">
                  {work.status}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl text-white mb-4">
                {work.title}
              </h3>
              <p className="font-body text-xs md:text-sm text-white/50 leading-relaxed">
                {work.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
