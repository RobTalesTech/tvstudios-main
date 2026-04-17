import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, Sparkles, Clock, Play, Camera, PenTool, Layout, Zap, MessageSquare, Star, CheckCircle2, Calendar } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Unit01 = () => {
  const [isInView, setIsInView] = useState(false);
  const reelRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (reelRef.current) observer.observe(reelRef.current);
    return () => observer.disconnect();
  }, []);

  const videoExhibits = [
    { title: "Exhibit Alpha", id: "4kCTTmLcVWo" },
    { title: "Exhibit Beta", id: "0eg7vfJuJ-Q" },
    { title: "Exhibit Gamma", id: "UhlUPClkjwI" },
    { title: "Exhibit Delta", id: "r201h-bfchQ" }
  ];

  return (
    <div className="min-h-screen bg-[#030303] pt-32 selection:bg-[#D4AF37]/20 selection:text-white pb-0">
      
      {/* LUXURY AMBIENT LAYER & CREATIVE GLARE */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[5%] right-[15%] w-[40%] h-[40%] bg-[#D4AF37] blur-[200px] rounded-full opacity-[0.03]" />
         <div className="absolute bottom-[20%] left-[5%] w-[30%] h-[30%] bg-cyan-500 blur-[150px] rounded-full opacity-[0.02]" />
      </div>

      <div className="container px-6 mx-auto max-w-6xl relative z-10 pb-20">
        
        {/* Navigation / Minimalist Return */}
        <div className="flex justify-between items-center mb-20 border-b border-white/5 pb-8">
          <Link to="/studio-work" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#D4AF37] transition-all font-mono text-[9px] uppercase tracking-[0.4em] group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> 
            Exit Unit 01
          </Link>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-mono text-[8px] text-[#D4AF37] uppercase tracking-widest font-black">Golden TV Branch</span>
          </div>
        </div>

        {/* HEADER: PREMIUM IDENTITY WITH KIDS FOCUS */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-3 text-[#D4AF37] opacity-80 mb-6"
            >
              <Star className="w-3 h-3 fill-current" />
              <span className="font-mono text-[8px] font-black uppercase tracking-[0.6em]">Premium Vertical // Unit 01</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-black italic text-white tracking-tighter uppercase leading-[0.9] mb-8">
               Kids Content <br/><span className="text-[#D4AF37]">Services.</span>
            </h1>
            
            <p className="font-serif text-zinc-300 text-lg md:text-xl font-bold italic leading-relaxed border-l-2 border-[#D4AF37]/40 pl-6 mb-8">
               "Unit One is really excited about creating content for children as it's fun and creative exploration... we believe in the better creations for the stories."
            </p>
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/5 group hover:border-[#D4AF37]/30 transition-all duration-700">
             <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-black block">Production Directive</span>
                <Sparkles className="w-4 h-4 text-[#D4AF37] opacity-50" />
             </div>
             <p className="text-zinc-400 font-serif text-sm leading-[1.8] italic mb-6 text-justify">
               This unit operates under the <span className="text-white font-bold">Golden TV</span> umbrella. We specialize in dynamic digital creative content with a 1-to-3 day aggressive production cycle. We leverage standard digital capture devices optimized with highly innovative, creative execution to generate maximum-quality viewing experiences for children. 
             </p>
             
             {/* DYNAMIC SCARCITY & SLOTS (VISUAL TIER) */}
             <div className="mt-8 bg-black/50 p-6 border border-[#D4AF37]/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/10 blur-[20px]" />
                <div className="flex justify-between items-center mb-4 relative z-10">
                   <span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37]">Availability Radar</span>
                   <Calendar className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="space-y-2 relative z-10">
                   <div className="flex justify-between items-center border-b border-white/5 pb-2">
                     <span className="font-mono text-xs text-white uppercase tracking-widest">Active Till June</span>
                     <span className="font-mono text-[9px] text-red-400 font-bold uppercase">Fully Booked</span>
                   </div>
                   <div className="flex justify-between items-center pt-2">
                     <span className="font-mono text-xs text-white uppercase tracking-widest">July Allocation</span>
                     <span className="font-mono text-[9px] text-[#00FF66] font-black uppercase">3 Slots Available</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* VISUAL PIPELINE PROCESS */}
        <div className="mb-32 relative">
           <div className="text-center mb-16">
              <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">The Creative Pipeline</h3>
              <p className="font-mono text-[10px] text-zinc-500 tracking-[0.4em] uppercase">From initial spark to final delivery, operating on an aggressive 1-3 day signal.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              {/* Box 1 */}
              <div className="p-8 border border-white/5 bg-black/50 hover:bg-[#050505] transition-colors relative group">
                 <span className="absolute top-4 right-4 font-mono text-[80px] font-black text-white/[0.02] group-hover:text-[#D4AF37]/10 transition-colors pointer-events-none">1</span>
                 <MessageSquare className="w-6 h-6 text-[#D4AF37] mb-6" />
                 <h4 className="font-serif text-lg font-black text-white italic mb-2">Idea Exchange</h4>
                 <p className="font-mono text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest mb-4">Initial Contact</p>
                 <p className="text-sm text-zinc-400 leading-relaxed font-serif">
                   Book a slot. We initiate a deep-dive conversation to align vision with kids-centric creative direction.
                 </p>
              </div>
              {/* Box 2 */}
              <div className="p-8 border border-white/5 bg-black/50 hover:bg-[#050505] transition-colors relative group">
                 <span className="absolute top-4 right-4 font-mono text-[80px] font-black text-white/[0.02] group-hover:text-[#D4AF37]/10 transition-colors pointer-events-none">2</span>
                 <PenTool className="w-6 h-6 text-[#D4AF37] mb-6" />
                 <h4 className="font-serif text-lg font-black text-white italic mb-2">Pre-Production</h4>
                 <p className="font-mono text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest mb-4">The Blueprint</p>
                 <p className="text-sm text-zinc-400 leading-relaxed font-serif">
                   Structuring the shoot plan. Scripting, storyboarding, and equipment architecture.
                 </p>
              </div>
              {/* Box 3 */}
              <div className="p-8 border border-[#D4AF37]/10 bg-[#D4AF37]/[0.02] hover:bg-[#D4AF37]/[0.05] transition-colors relative group">
                 <span className="absolute top-4 right-4 font-mono text-[80px] font-black text-[#D4AF37]/[0.05] group-hover:text-[#D4AF37]/20 transition-colors pointer-events-none">3</span>
                 <Camera className="w-6 h-6 text-[#D4AF37] mb-6 animate-pulse" />
                 <h4 className="font-serif text-lg font-black text-[#D4AF37] italic mb-2">The Shoot</h4>
                 <p className="font-mono text-[10px] text-[#D4AF37]/60 leading-relaxed uppercase tracking-widest mb-4">Execution Phase</p>
                 <p className="text-sm text-zinc-300 leading-relaxed font-serif">
                    1-day principal photography lock. Maintaining agility without sacrificing premium rendering.
                 </p>
              </div>
              {/* Box 4 */}
              <div className="p-8 border border-white/5 bg-black/50 hover:bg-[#050505] transition-colors relative group">
                 <span className="absolute top-4 right-4 font-mono text-[80px] font-black text-white/[0.02] group-hover:text-[#D4AF37]/10 transition-colors pointer-events-none">4</span>
                 <Zap className="w-6 h-6 text-[#D4AF37] mb-6" />
                 <h4 className="font-serif text-lg font-black text-white italic mb-2">Post & Deliver</h4>
                 <p className="font-mono text-[10px] text-zinc-500 leading-relaxed uppercase tracking-widest mb-4">Final Polish</p>
                 <p className="text-sm text-zinc-400 leading-relaxed font-serif">
                   Expedited delivery signal (1-3 days). Color grading, visual effects, and final export.
                 </p>
              </div>
           </div>
        </div>

        {/* FINANCIALS & BASE PACKAGE */}
        <div className="mb-32">
           <div className="w-full bg-[#050505] border border-zinc-800 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 group hover:border-[#D4AF37]/30 transition-all duration-700 rounded-[3rem]">
              <div className="space-y-6 flex-1">
                 <h3 className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.5em]">Base Production Engagement</h3>
                 <p className="font-serif text-2xl md:text-3xl font-black text-white italic leading-snug">
                   Professional planning, pristine shooting, and dynamic delivery.
                 </p>
              </div>
              <div className="relative shrink-0 flex flex-col items-center justify-center p-8 border border-[#D4AF37]/20 bg-black min-w-[300px] rounded-3xl">
                 <h4 className="relative z-10 font-display text-5xl md:text-7xl font-black text-white tracking-tighter italic">₹11,000/-</h4>
                 <ul className="relative z-10 space-y-3 w-full mt-6">
                    <li className="flex items-center gap-3">
                       <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                       <span className="font-mono text-[9px] text-white uppercase tracking-widest">Pre-Production Prep</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                       <span className="font-mono text-[9px] text-white uppercase tracking-widest">1-Day Digital Shoot</span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>

        {/* WORKS GALLERY */}
        <div className="mb-32">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {videoExhibits.map((video, i) => (
                 <motion.div key={i} className="group relative">
                    <div className="aspect-video bg-[#050505] border border-white/5 group-hover:border-[#D4AF37]/30 transition-all overflow-hidden relative rounded-xl">
                       <iframe 
                          className="w-full h-full grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                          src={`https://www.youtube.com/embed/${video.id}?modestbranding=1&rel=0`}
                          title={video.title}
                          allowFullScreen
                       />
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* HIRING MODULE: THE REMOTE TALENT BRIDGE */}
        <div className="mb-32 mt-20 p-10 md:p-20 border border-[#D4AF37]/20 bg-[#050505] relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors duration-700 shadow-2xl rounded-[4rem]">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
              <div className="lg:col-span-7 space-y-10">
                 <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-[1em] mb-4 block animate-pulse font-black">Expansion Protocol // Operative Hunt</span>
                 <h3 className="font-serif text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none">The Talent <br/> <span className="text-[#D4AF37]">Bridge.</span></h3>
                 <div className="space-y-8 font-serif text-zinc-400 text-lg leading-relaxed italic border-l-2 border-white/10 pl-10 max-w-3xl">
                    <p>Collecting creative energy from remote areas. Artists from the villages are the true pulse of creative joy.</p>
                    <p className="text-white">Learn and then Earn. Building a powerhouse post-production team.</p>
                 </div>
              </div>
              
              <div className="lg:col-span-5 flex flex-col justify-between items-center lg:items-end">
                 {/* SMALL B&W MOBILE REEL ASSET - VIEWPORT TRIGGERED */}
                 <div ref={reelRef} className="relative w-full max-w-[280px] aspect-[9/16] bg-black border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                    <div className="absolute inset-0 z-20 pointer-events-none border-[12px] border-black rounded-[2.5rem]" />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-30" />
                    <div className="w-full h-full relative z-10 bg-zinc-900 grayscale brightness-90 contrast-110 overflow-hidden">
                       {isInView && (
                          <iframe 
                             className="absolute inset-0 w-full h-full scale-[1.3] pointer-events-none"
                             src="https://www.youtube.com/embed/J7frG5iJqzc?autoplay=1&loop=1&playlist=J7frG5iJqzc&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0"
                             title="TVS Recruitment Signal"
                             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          />
                       )}
                       <div className="absolute top-8 left-8 z-30 flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${isInView ? 'bg-red-600 animate-pulse' : 'bg-zinc-800'}`} />
                          <span className="font-mono text-[7px] text-white tracking-[0.4em] uppercase font-black">{isInView ? 'Live_Signal' : 'Signal_Lost'}</span>
                       </div>
                    </div>
                    <div className="absolute bottom-10 left-0 w-full px-6 z-30 text-center">
                       <p className="font-mono text-[8px] text-[#f7d08a] uppercase tracking-widest font-black mb-2 shadow-2xl">Operative Recruitment</p>
                       <span className="font-mono text-[6px] text-white/30 uppercase tracking-[0.3em]">No credits // Talent Exploration</span>
                    </div>
                 </div>

                 <div className="mt-12 w-full max-w-[280px]">
                    <a href="https://wa.me/918149981660" target="_blank" rel="noreferrer" className="flex items-center justify-between p-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] w-full hover:bg-[#D4AF37] transition-all shadow-2xl rounded-full">
                       <span>Transmit Radar</span>
                       <Zap className="w-4 h-4" />
                    </a>
                 </div>
              </div>
           </div>
        </div>

        {/* BOOKING MODULE */}
        <div className="border-t border-white/10 pt-16 flex justify-center">
           <div className="flex flex-col items-center text-center space-y-6 max-w-lg">
              <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.5em] uppercase font-black">Ready to Execute?</span>
              <a href="https://wa.me/918149981660" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-4 border border-zinc-800 hover:border-[#D4AF37] bg-white/[0.01] hover:bg-[#D4AF37]/5 transition-all rounded-full overflow-hidden">
                 <div className="p-3 bg-white text-black rounded-full group-hover:bg-[#D4AF37] transition-colors"><MessageSquare className="w-4 h-4" /></div>
                 <span className="font-serif text-sm font-black italic uppercase text-white group-hover:text-[#D4AF37] tracking-widest transition-colors">Book via WhatsApp</span>
              </a>
           </div>
        </div>

      </div>
      <Footer />
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap'); .font-serif { font-family: 'Libre Baskerville', serif; }` }} />
    </div>
  );
};

export default Unit01;
