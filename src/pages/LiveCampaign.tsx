import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, Play, Target, Globe, Music2, BrainCircuit, Activity, MonitorPlay } from "lucide-react";
import laginBiginPoster from "@/assets/lagin-bigin-poster.jpg";

const LiveCampaign = () => {
  return (
    <div className="min-h-screen bg-background pt-32 selection:bg-blue-500/30 selection:text-white">
      <div className="container px-4 mx-auto max-w-5xl relative z-10">
        
        {/* Navigation / Exit */}
        <div className="mb-12">
          <Link to="/studio-work" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest bg-white/5 px-4 py-2 rounded-md border border-white/10 hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" /> Exit Station
          </Link>
        </div>

        {/* Header Intro */}
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/30 px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-[pulse_1s_ease-in-out_infinite]" />
            🔴 Live Campaign
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-6">
            The Branding <span className="text-blue-500 italic font-serif lowercase">Bomb Attack</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl mx-auto border-l-2 border-blue-500 pl-6">
            230 Million – 333 Million people in the direct impact zone. The first brand campaign of TV Studios targeting a specific cultural region with sure-shot results. This is just the beginning.
          </p>
        </div>

        {/* LAGIN BIGIN Poster & Showcase */}
        <div className="mb-24">
           {/* Old Poster Wrapper Deleted, Using TV Frame Design instead */}
           <div className="relative bg-[#020202] p-2 md:p-3 rounded-2xl border border-white/10 mb-8 max-w-4xl mx-auto shadow-[0_0_50px_rgba(59,130,246,0.1)]">
             <div className="relative rounded-xl border border-white/20 bg-black overflow-hidden aspect-[21/9]">
               {/* Scanline overlay */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none z-10" />
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-10" />
               {/* Poster */}
               <img
                 src={laginBiginPoster}
                 alt="LAGIN BIGIN - Khandeshi Musical Album Series"
                 className="w-full h-full object-cover"
               />
             </div>
             {/* TV Stand */}
             <div className="flex justify-center mt-2 gap-1.5">
               <div className="h-1 w-6 rounded-full bg-white/10" />
               <div className="h-1 w-6 rounded-full bg-blue-500/50" />
               <div className="h-1 w-6 rounded-full bg-white/10" />
             </div>
           </div>

           <div className="bg-card/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 mb-12">
             <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
               LAGIN BIGIN - Khandeshi Musical Album Series
             </h2>
             <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-500 mb-8 font-bold">First Brand Campaign by TV Studios</p>
             
             <p className="text-muted-foreground leading-relaxed md:text-lg">
               Station 03 is actively working on a New TV Channel tailored specifically for the audience of Khandesh. We are channelizing the upcoming social media market and establishing deep business associations in that area, directly serving what the culture needs.
             </p>
           </div>
        </div>

        {/* The Execution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
           
           {/* Talent Network */}
           <div className="border border-white/10 rounded-2xl p-8 bg-black/20">
              <div className="flex items-center gap-3 mb-8">
                 <Globe className="w-6 h-6 text-blue-500" />
                 <h3 className="text-xl font-display text-white uppercase tracking-wider">The Syndicate</h3>
              </div>
              <ul className="space-y-6 font-mono text-xs md:text-sm text-white/70 uppercase tracking-widest">
                 <li className="flex justify-between border-b border-white/5 pb-2">
                   <span>Music Producers</span> <span className="text-blue-400">Khandesh</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2">
                   <span>Mixing & Mastering</span> <span className="text-blue-400">Mumbai</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2">
                   <span>Studio Association</span> <span className="text-blue-400">Mumbai</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2">
                   <span>Marketing Team & EP</span> <span className="text-blue-400">Pune</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2">
                   <span>Releasing Team</span> <span className="text-blue-400">Pune / Jalgaon Shirpur</span>
                 </li>
                 <li className="flex justify-between border-b border-white/5 pb-2">
                   <span>Production Team</span> <span className="text-blue-400">Nagpur</span>
                 </li>
              </ul>
           </div>

           {/* Blinking Progress Timeline */}
           <div className="border border-white/10 rounded-2xl p-8 bg-black/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Activity className="w-32 h-32" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-display text-white uppercase tracking-wider inline-flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Production Status
                  </h3>
                  <span className="font-mono text-xl font-black text-green-500">18%</span>
                </div>
                
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-10">
                  Audio Production Initiated: <span className="text-white">14 March 2026</span>
                </p>

                <div className="space-y-6 font-mono text-xs tracking-widest">
                   
                   {/* Track 1 */}
                   <div>
                     <div className="flex justify-between mb-2 text-white/60">
                       <span>Song 01 [Title Track]</span>
                       <span className="text-green-400">18%</span>
                     </div>
                     <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden flex">
                       <span className="h-full bg-green-500 w-[18%] animate-pulse" />
                     </div>
                     <p className="text-[9px] text-white/30 mt-1 uppercase">Phase: Core Arrangement / Mix Block</p>
                   </div>

                   {/* Track 2 */}
                   <div>
                     <div className="flex justify-between mb-2 text-white/60">
                       <span>Song 02</span>
                       <span className="text-blue-400">9%</span>
                     </div>
                     <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden flex">
                       <span className="h-full bg-blue-500 w-[9%] animate-pulse" />
                     </div>
                     <p className="text-[9px] text-white/30 mt-1 uppercase">Phase: Scratch Vocals / Initial Composition</p>
                   </div>

                   {/* Track 3 */}
                   <div>
                     <div className="flex justify-between mb-2 text-white/60">
                       <span>Song 03</span>
                       <span className="text-yellow-500">12%</span>
                     </div>
                     <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden flex">
                       <span className="h-full bg-yellow-500 w-[12%] animate-pulse" />
                     </div>
                     <p className="text-[9px] text-white/30 mt-1 uppercase">Phase: Beat Programming Iteration</p>
                   </div>

                   {/* Track 4 */}
                   <div>
                     <div className="flex justify-between mb-2 text-white/60">
                       <span>Song 04</span>
                       <span className="text-white/40">4%</span>
                     </div>
                     <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden flex">
                       <span className="h-full bg-white/40 w-[4%] animate-pulse" />
                     </div>
                     <p className="text-[9px] text-white/30 mt-1 uppercase">Phase: Concept & Writing</p>
                   </div>

                </div>
              </div>
           </div>

        </div>

        {/* Why The Hit Is Sure */}
        <div className="mb-32">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">Why The Hit is <span className="text-blue-500 italic lowercase font-serif">Sure</span></h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature A: Audio Power */}
              <div className="border border-white/10 rounded-2xl p-8 md:p-12 bg-card/20 backdrop-blur-md">
                 <div className="flex items-end justify-center h-24 gap-1 mb-8 opacity-50">
                    <motion.div animate={{ height: ["20%", "70%", "30%", "100%", "40%"] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }} className="w-3 bg-blue-500 rounded-sm" />
                    <motion.div animate={{ height: ["60%", "20%", "100%", "50%", "80%"] }} transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror" }} className="w-3 bg-blue-400 rounded-sm" />
                    <motion.div animate={{ height: ["10%", "90%", "40%", "70%", "20%"] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }} className="w-3 bg-blue-600 rounded-sm" />
                    <motion.div animate={{ height: ["80%", "30%", "60%", "90%", "40%"] }} transition={{ duration: 1.7, repeat: Infinity, repeatType: "mirror" }} className="w-3 bg-white rounded-sm" />
                    <motion.div animate={{ height: ["40%", "100%", "20%", "80%", "50%"] }} transition={{ duration: 1.1, repeat: Infinity, repeatType: "mirror" }} className="w-3 bg-blue-500 rounded-sm" />
                 </div>
                 
                 <h3 className="text-2xl font-display text-white mb-4 flex items-center gap-3">
                   <Music2 className="text-blue-500 w-6 h-6" /> The Audio Evolution
                 </h3>
                 <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                   Before theaters and visual mediums, audio remains more powerful than visuals. It fuels the most independent industry globally. Over 3 years of deep research proves this region's talent is hitting the prime market in Maharashtrian viewership.
                 </p>
                 <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                   We are technically upgrading the Khandeshi beat. Bringing extreme newness. Everyone has a cell to make music; the youth can do magic. We are creating a drastic current by taking this raw power further forward into a monumental fusion.
                 </p>
              </div>

              {/* Feature B: AI Visual Power */}
              <div className="border border-white/10 rounded-2xl p-8 md:p-12 bg-card/20 backdrop-blur-md">
                 <div className="flex items-center justify-center h-24 mb-8">
                    <BrainCircuit className="w-16 h-16 text-purple-500/50 animate-[pulse_3s_ease-in-out_infinite]" />
                 </div>
                 
                 <h3 className="text-2xl font-display text-white mb-4 flex items-center gap-3">
                   <MonitorPlay className="text-purple-500 w-6 h-6" /> Synthetic Cinematic Execution
                 </h3>
                 <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                   Top production value generated through advanced AI. We are establishing a traditional, realistic representation of the people and culture wrapped in the absolute best cinematic experience available.
                 </p>
                 <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                   Due to our AI pipeline, this project draws direct visual comparisons to massive, crore-budget music videos built for viral dance entertainment. <strong>Virality has crossed language and cultural barriers.</strong> By utilizing the best regional slangs and native connectivity, the hit is mathematically inevitable.
                 </p>
              </div>
           </div>
        </div>

        {/* Sponsor / Climax Button */}
        <div className="text-center pb-32">
           <Target className="w-12 h-12 text-blue-500/30 mx-auto mb-6" />
           <p className="text-blue-500 font-mono text-[10px] uppercase font-bold tracking-[0.3em] mb-4">Direct Live Impact</p>
           <h2 className="text-3xl md:text-5xl font-display text-white mb-8">Fund and Sponsors Platform</h2>
           <Link to="/station/05" className="inline-flex items-center gap-3 bg-blue-500 text-black px-12 py-5 rounded-md font-mono text-xs uppercase font-bold tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
             Be the best brand of TV 
           </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default LiveCampaign;
