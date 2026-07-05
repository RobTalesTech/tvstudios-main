import { motion } from "framer-motion";
import { Play, Heart, Repeat2 } from "lucide-react";

// Massive data array combining posts, cinematic frames, and reels
const FILM_STRIP_DATA = [
  { id: 1, type: "post", url: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800", title: "Cinematography Pre-Prod", copy: "Chasing the ultimate golden hour for the upcoming automotive spot." },
  { id: 2, type: "reel", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800", title: "", copy: "" },
  { id: 4, type: "post", url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800", title: "Studio Manifesto", copy: "We don't follow trends. We establish the baseline." },
  { id: 5, type: "reel", url: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800", title: "Location Scout", copy: "Mapping the physical set against the neural network." },
  { id: 6, type: "tv", url: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=800", title: "Color Grading", copy: "Applying the original HMF aesthetic." },
];

const TWEETS_DATA = [
  { 
    id: 1, 
    text: "The transition from raw cinema to neural rendering isn't about replacing the camera—it's about expanding the canvas. Locking in the pipeline for Station 05. #ArtTechEconomy", 
    date: "Jun 13", 
    likes: "142", 
    reposts: "28",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600"
  },
  { 
    id: 2, 
    text: "Spatial frequencies locked. Our sound division is finalizing the custom audio signature for the upcoming brand showcase. Deep frequencies, pristine resolution. 🎧", 
    date: "Jun 12", 
    likes: "98", 
    reposts: "15",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600"
  },
  { 
    id: 3, 
    text: "Drafting the narrative architecture for the youth drama series. When you establish the baseline, you don't follow trends. We create stories that survive. #Filmmaking", 
    date: "Jun 10", 
    likes: "215", 
    reposts: "45",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600"
  },
  { 
    id: 4, 
    text: "Station 03 campaign metrics are live in the dashboard. Unified representation is driving massive engagement. Creation is economy. 📈", 
    date: "Jun 08", 
    likes: "84", 
    reposts: "12",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"
  },
  { 
    id: 5, 
    text: "Automotive spot color grading passes are complete. Using our signature gold-chrome HMF aesthetic. Trailer dropping soon on our broadcast hub. #ColorGrading", 
    date: "Jun 05", 
    likes: "176", 
    reposts: "39",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600"
  }
];

const FilmStripRow = ({ items, direction, tintClass, speed }: { items: any[], direction: "left" | "right", tintClass: string, speed: number }) => {
  return (
    <div className="flex w-full overflow-hidden mb-4">
      <div
        className={direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        {/* We double the array to ensure perfect seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <div 
            key={`${item.id}-${idx}`}
            className="group/card relative w-[250px] md:w-[320px] shrink-0 overflow-hidden rounded-md border border-white/10 bg-black transition-all duration-700 hover:z-20 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] mr-4"
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
            {item.title && (
              <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100 z-30">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#FFF] mb-1 block">TV³ // {item.title}</span>
                <p className="font-body text-xs text-white/80 leading-snug">
                  {item.copy}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TweetStripRow = ({ items, direction, speed }: { items: any[], direction: "left" | "right", speed: number }) => {
  return (
    <div className="flex w-full overflow-hidden mb-4">
      <div
        className={direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
      >
        {/* Double the array for seamless loops */}
        {[...items, ...items].map((tweet, idx) => (
          <a
            key={`${tweet.id}-${idx}`}
            href="https://x.com/Tv3StudiosX"
            target="_blank"
            rel="noopener noreferrer"
            className="group/card relative w-[280px] md:w-[360px] shrink-0 p-6 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md transition-all duration-700 hover:scale-105 hover:border-[hsl(43_72%_55%)]/40 hover:shadow-[0_0_30px_rgba(247,208,138,0.05)] flex flex-col justify-between"
          >
            {/* Header: User Profile Info */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[hsl(43_72%_55%)] to-[#ff2e63]/50 p-[1px]">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center font-display text-[9px] font-black text-white">
                    TV
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-xs text-white tracking-wide font-bold">TV³ Studios</span>
                    <div className="w-2.5 h-2.5 bg-[hsl(43_72%_55%)] rounded-full flex items-center justify-center">
                      <span className="text-[6px] text-black font-bold">✓</span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500 block">@Tv3StudiosX</span>
                </div>
              </div>
              
              <svg className="w-3.5 h-3.5 text-zinc-600 group-hover/card:text-[hsl(43_72%_55%)] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>

            {/* Tweet Content */}
            <p className="font-body text-xs text-zinc-300 leading-relaxed mb-4 flex-1">
              {tweet.text.split(" ").map((word: string, i: number) => {
                if (word.startsWith("#") || word.startsWith("@")) {
                  return (
                    <span key={i} className="text-[hsl(43_72%_55%)] font-semibold mr-1">
                      {word}{" "}
                    </span>
                  );
                }
                return word + " ";
              })}
            </p>

            {/* Tweet Image Attachment (Optional) */}
            {tweet.image && (
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 border border-white/5 bg-zinc-900/10">
                <img 
                  src={tweet.image} 
                  alt="Tweet Attachment" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-700"
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-white/5 pt-3 font-mono text-[9px] text-zinc-600">
              <span>{tweet.date}</span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1 hover:text-[#ff2e63] transition-colors">
                  <Heart className="w-3 h-3" /> {tweet.likes}
                </span>
                <span className="flex items-center gap-1 hover:text-[hsl(43_72%_55%)] transition-colors">
                  <Repeat2 className="w-3.5 h-3.5 animate-pulse" /> {tweet.reposts}
                </span>
              </div>
            </div>
          </a>
        ))}
       </div>
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
           <div>
             <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
               Studio <span className="text-zinc-600 italic font-serif">Motion</span>
             </h2>
            <p className="mt-4 max-w-xl font-body text-[10px] sm:text-xs text-white/50 tracking-[0.3em] uppercase border-b border-white/10 pb-4">
              SILENT PROJECTION. HOVERING ILLUMINATION.
            </p>
            <p className="mt-2 font-mono text-[8px] text-[hsl(43_72%_55%)] uppercase tracking-[0.5em]">
              ART. TECH. ECONOMY.
            </p>
           </div>
         </div>

         {/* The 3 Film Strips */}
         <style dangerouslySetInnerHTML={{__html: `
           .pause-marquee:hover .animate-marquee-left, .pause-marquee:hover .animate-marquee-right { animation-play-state: paused !important; }
         `}} />
         
          <div className="flex flex-col gap-2 md:gap-4 relative group pause-marquee">
            {/* Single Floating Reel: SILENT PROJECTION */}
            <FilmStripRow 
              items={[...FILM_STRIP_DATA, ...FILM_STRIP_DATA]} 
              direction="left" 
              tintClass="sepia-[.2] saturate-150 opacity-60" 
              speed={60} 
            />

            {/* Live Broadcast Feed: X Posts (@Tv3StudiosX) */}
            <TweetStripRow 
              items={TWEETS_DATA} 
              direction="right" 
              speed={50} 
            />

            {/* Central Overlay for depth (vignette) */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_100px_0_100px_#020202,inset_-100px_0_100px_#020202]" />
          </div>
       </div>
    </section>
  );
};

export default StudioPulse;
