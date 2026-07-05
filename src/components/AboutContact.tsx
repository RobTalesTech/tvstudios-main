import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

const AboutContact = () => {
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isMiddleActive, setIsMiddleActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          // Pause/stop all active playing states when off-screen
          setIsLeftActive(false);
          setIsMiddleActive(false);
          setIsRightActive(false);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#020202] py-32 overflow-hidden border-t border-white/5" id="about">
      
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[hsl(43_72%_55%)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: THE STORY ARCHITECTURE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="font-mono text-[9px] text-[hsl(43_72%_55%)] uppercase tracking-[0.5em] mb-6 block font-black">Architecture // 2024 - 2026</span>
            <h2 className="font-display text-5xl md:text-7xl text-white tracking-tighter mb-8 leading-none uppercase font-black">
              Art <br /> <span className="text-zinc-600 italic font-serif lowercase">Entrepreneur.</span>
            </h2>
            
             <div className="space-y-6 text-zinc-400 font-serif text-sm md:text-base leading-relaxed italic max-w-lg border-l-2 border-white/5 pl-8">
              <p>
                Following self-directed filmmaking and expanding our cinematic reach in Mumbai (2021-2024), the journey has been a creative evolution. Returning home in 2024 was about establishing our roots and centering the vision.
              </p>
              <p>
                Started on <span className="text-white font-bold">01 Jan 2026</span>, TV³ is the platform where filmmaking becomes a democratized art. We bridge the right talent with the right creator – prioritizing the artist who creates for joy over the businessman who creates for margin.
              </p>
              <p className="text-white font-bold not-italic font-mono text-xs uppercase tracking-widest mt-8 flex items-center gap-3">
                 <Sparkles className="w-3 h-3 text-[hsl(43_72%_55%)]" />
                 We are good with choosing the right artist or talent for the right job.
              </p>
            </div>
          </motion.div>

          {/* RIGHT: THE ROBTALES EXHIBIT (3 MOBILE PHONES) */}
          <div className="relative flex justify-center items-end gap-2 md:gap-4 pt-20">
             
             {/* Phone 1: Past Journey (Left) */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.1 }}
               onClick={() => {
                 if (!isLeftActive) {
                   setIsLeftActive(true);
                   setIsMiddleActive(false);
                   setIsRightActive(false);
                 }
               }}
               className={`w-1/3 max-w-[180px] aspect-[9/19] bg-zinc-900 rounded-[2rem] border-[4px] border-zinc-800 relative overflow-hidden shadow-2xl transition-all duration-500 ${!isLeftActive ? 'cursor-pointer hover:border-primary/50' : ''}`}
             >
                {isLeftActive && isVisible ? (
                  <div className="absolute inset-0 z-0">
                    <iframe
                      src="https://www.youtube.com/embed/2ccAgY4UoX4?autoplay=1&mute=0&loop=1&playlist=2ccAgY4UoX4&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
                      className="w-full h-full absolute inset-0 object-cover border-0"
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLeftActive(false);
                      }}
                      className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black text-white text-[8px] font-bold uppercase font-mono tracking-widest px-2 py-0.5 rounded-full border border-white/20 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 z-0">
                      {isVisible ? (
                        <iframe
                          src="https://www.youtube.com/embed/2ccAgY4UoX4?autoplay=1&mute=1&loop=1&playlist=2ccAgY4UoX4&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
                          className="w-[102%] h-[102%] absolute -top-[1%] -left-[1%] pointer-events-none object-cover border-0"
                          allow="autoplay; encrypted-media; fullscreen"
                        />
                      ) : (
                        <img 
                          src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400" 
                          className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity" 
                          alt="AI Styled Aesthetics Cover" 
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <div className="p-4 h-full flex flex-col justify-end relative z-20 pointer-events-none">
                       <Play className="w-4 h-4 text-[hsl(43_72%_55%)] mb-2 fill-current animate-pulse" />
                       <p className="font-mono text-[7px] text-[hsl(43_72%_55%)] uppercase tracking-[0.3em] mb-1 font-black">Cinematic Grade Loop</p>
                       <h4 className="text-white font-display text-[9px] uppercase tracking-widest mb-1">AI Styled Aesthetics</h4>
                       <div className="flex gap-3 items-center">
                          <div className="flex flex-col">
                             <span className="text-white font-mono text-[8px] font-black tracking-tighter">410K</span>
                             <span className="text-zinc-600 text-[5px] uppercase tracking-widest">Views</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-white font-mono text-[8px] font-black tracking-tighter">5.8K</span>
                             <span className="text-zinc-600 text-[5px] uppercase tracking-widest">Saves</span>
                          </div>
                       </div>
                    </div>
                  </>
                )}
             </motion.div>

             {/* Phone 2: Center - The Evolution (Primary) */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
               onClick={() => {
                 if (!isMiddleActive) {
                   setIsMiddleActive(true);
                   setIsLeftActive(false);
                   setIsRightActive(false);
                 }
               }}
               className={`w-[38%] max-w-[200px] aspect-[9/19] bg-zinc-950 rounded-[2.5rem] border-[6px] border-zinc-800 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20 -mb-8 scale-110 transition-all duration-500 ${!isMiddleActive ? 'cursor-pointer hover:border-primary/50' : ''}`}
             >
                {isMiddleActive && isVisible ? (
                  <div className="absolute inset-0 z-0">
                    <iframe
                      src="https://www.youtube.com/embed/kC9Fx8QEXpI?autoplay=1&mute=0&loop=1&playlist=kC9Fx8QEXpI&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
                      className="w-full h-full absolute inset-0 object-cover border-0"
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMiddleActive(false);
                      }}
                      className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black text-white text-[8px] font-bold uppercase font-mono tracking-widest px-2 py-0.5 rounded-full border border-white/20 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 z-0">
                      {isVisible ? (
                        <iframe
                          src="https://www.youtube.com/embed/kC9Fx8QEXpI?autoplay=1&mute=1&loop=1&playlist=kC9Fx8QEXpI&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
                          className="w-[102%] h-[102%] absolute -top-[1%] -left-[1%] pointer-events-none object-cover border-0"
                          allow="autoplay; encrypted-media; fullscreen"
                        />
                      ) : (
                        <img 
                          src="/character-rob.jpg" 
                          className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity" 
                          alt="Founder Story Short Cover" 
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <div className="p-5 h-full flex flex-col justify-end relative z-20 pointer-events-none">
                       <Play className="w-5 h-5 text-[hsl(43_72%_55%)] mb-3 fill-current animate-pulse" />
                       <p className="font-mono text-[8px] text-[hsl(43_72%_55%)] uppercase tracking-[0.3em] mb-1 font-black">Prestige Story Telling</p>
                       <h4 className="text-white font-display text-[10px] uppercase tracking-widest mb-1">Founder Story Short</h4>
                       <div className="flex gap-4 items-center">
                          <div className="flex flex-col">
                             <span className="text-white font-mono text-[9px] font-black tracking-tighter">1.08M</span>
                             <span className="text-zinc-600 text-[6px] uppercase tracking-widest">Views</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-white font-mono text-[9px] font-black tracking-tighter">10K</span>
                             <span className="text-zinc-600 text-[6px] uppercase tracking-widest">Saves</span>
                          </div>
                       </div>
                    </div>
                  </>
                )}
             </motion.div>

             {/* Phone 3: Future Vision (Right) */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
               onClick={() => {
                 if (!isRightActive) {
                   setIsRightActive(true);
                   setIsLeftActive(false);
                   setIsMiddleActive(false);
                 }
               }}
               className={`w-1/3 max-w-[180px] aspect-[9/19] bg-zinc-900 rounded-[2rem] border-[4px] border-zinc-800 relative overflow-hidden shadow-2xl transition-all duration-500 ${!isRightActive ? 'cursor-pointer hover:border-primary/50' : ''}`}
             >
                {isRightActive && isVisible ? (
                  <div className="absolute inset-0 z-0">
                    <iframe
                      src="https://www.youtube.com/embed/vqI3xYcFJFM?autoplay=1&mute=0&loop=1&playlist=vqI3xYcFJFM&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
                      className="w-full h-full absolute inset-0 object-cover border-0"
                      allow="autoplay; encrypted-media; fullscreen"
                      allowFullScreen
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsRightActive(false);
                      }}
                      className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black text-white text-[8px] font-bold uppercase font-mono tracking-widest px-2 py-0.5 rounded-full border border-white/20 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 z-0">
                      {isVisible ? (
                        <iframe
                          src="https://www.youtube.com/embed/vqI3xYcFJFM?autoplay=1&mute=1&loop=1&playlist=vqI3xYcFJFM&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
                          className="w-[102%] h-[102%] absolute -top-[1%] -left-[1%] pointer-events-none object-cover border-0"
                          allow="autoplay; encrypted-media; fullscreen"
                        />
                      ) : (
                        <img 
                          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" 
                          className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity" 
                          alt="Dynamic Product Demo Cover" 
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <div className="p-4 h-full flex flex-col justify-end relative z-20 pointer-events-none">
                       <Play className="w-4 h-4 text-[hsl(43_72%_55%)] mb-2 fill-current animate-pulse" />
                       <p className="font-mono text-[7px] text-[hsl(43_72%_55%)] uppercase tracking-[0.3em] mb-1 font-black">3D Overlay Mode</p>
                       <h4 className="text-white font-display text-[9px] uppercase tracking-widest mb-1">Dynamic Product Demo</h4>
                       <div className="flex gap-3 items-center">
                          <div className="flex flex-col">
                             <span className="text-white font-mono text-[8px] font-black tracking-tighter">320K</span>
                             <span className="text-zinc-600 text-[5px] uppercase tracking-widest">Views</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-white font-mono text-[8px] font-black tracking-tighter">4.5K</span>
                             <span className="text-zinc-600 text-[5px] uppercase tracking-widest">Saves</span>
                          </div>
                       </div>
                    </div>
                  </>
                )}
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutContact;
