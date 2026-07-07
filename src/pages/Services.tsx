import { useState, useEffect } from "react";
import ServicesSection from "@/components/ServicesSection";
import CinematicReel from "@/components/CinematicReel";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Film, MonitorPlay, ArrowRight, Mic2 } from "lucide-react";
import { handleWhatsAppRedirect } from "@/utils/whatsapp";

type Category = "Visual Production" | "Video Production" | "Copywriting";

type ServiceFeature = {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

const servicesData: Record<Category, ServiceFeature[]> = {
  "Visual Production": [
    {
      name: "Brand Essentials",
      price: "$800",
      description: "Foundational visual identity for emerging brands.",
      features: ["Brand Typography & Colors", "Primary & Secondary Logos", "Basic Style Guide", "2 Social Media Layouts"]
    },
    {
      name: "Cinematic Overhaul",
      price: "$2,200",
      description: "A complete prestige visual system.",
      features: ["Comprehensive Brand Architecture", "Custom Graphic Assets", "Full Motion Graphics Kit", "Extensive Brand Bible"],
      featured: true
    },
    {
      name: "Retained Visuals",
      price: "Custom",
      description: "Ongoing production to maintain visual authority.",
      features: ["Unlimited Asset Variations", "Priority Artistic Direction", "Weekly Campaign Assets", "Dedicated Designer"]
    }
  ],
  "Video Production": [
    {
      name: "Social Amplifier",
      price: "$1,200",
      description: "Designed for algorithmic impact on mobile.",
      features: ["4 High-Retention Reels", "Trend & Audio Research", "Dynamic Subtitles", "Color Correction"]
    },
    {
      name: "The Prestige Film",
      price: "$4,500+",
      description: "High-end brand storytelling for web or broadcast.",
      features: ["Up to 90s Length", "Premium Color Grade (Film Emulation)", "Professional Voiceover & Soundscapes", "Cinematic Direction"],
      featured: true
    },
    {
      name: "Algorithmic Retainer",
      price: "Custom",
      description: "A constant flow of high-quality video content.",
      features: ["Weekly Content Pipeline", "A/B Hook Testing", "Full Analytics Integration", "Dedicated Editor"]
    }
  ],
  "Copywriting": [
    {
      name: "Direct Narrative",
      price: "$400",
      description: "High-converting ad copy and hooks.",
      features: ["5 Custom Ad Variations", "Hook & CTA focus", "Direct Response Tone"]
    },
    {
      name: "Brand Manifesto",
      price: "$1,200",
      description: "Establishing your brand's voice and core identity message.",
      features: ["Core Philosophy Document", "Taglines & Slogans", "Origin Story Copy", "Tone of Voice Guide"],
      featured: true
    },
    {
      name: "Scripted Authority",
      price: "$2,500",
      description: "Comprehensive scripts tailored for video production pipelines.",
      features: ["VSL Scripts", "Short-form hook scripts", "Storyboarding Notes", "Email sequences"]
    }
  ]
};

const RealProductionCalculator = () => {
  const [values, setValues] = useState<Record<string, number>>({
    "Pre-Pro": 1,
    "Crew": 1,
    "Talent": 1,
    "Equipment": 1,
    "Post": 1,
    "Distribution": 1
  });
  const [isFlashed, setIsFlashed] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [calculatorEmail, setCalculatorEmail] = useState("");
  const [calculatorNotes, setCalculatorNotes] = useState("");

  const categories = Object.keys(values);
  const score = Object.values(values).reduce((a, b) => a + b, 0);

  const getProductionType = (s: number) => {
    if (s <= 10) return { type: "Viral Social Ad", bars: 2, color: "bg-emerald-500", setup: "Mobile/Handheld Setup" };
    if (s <= 18) return { type: "Brand Showcase", bars: 5, color: "bg-yellow-500", setup: "Studio Lights/Backdrop" };
    if (s <= 24) return { type: "High-Impact TVC", bars: 8, color: "bg-[#D4AF37]", setup: "Camera Crane/Jib" };
    // Scores 25-30 trigger Magnum Opus
    return { type: "Global Magnum Opus", bars: 12, color: "bg-red-600", setup: "Massive Film Set" };
  };

  const prod = getProductionType(score);

  const handleAction = () => {
    setIsFlashed(true);
    setTimeout(() => {
      setIsFlashed(false);
      setShowBook(true);
    }, 500);
  };

  const getStepLabel = (cat: string, step: number) => {
    const labels: Record<string, string[]> = {
      "Pre-Pro": ["Concept", "Script", "PPM", "Full Deck", "Deep Strategy"],
      "Crew": ["Solo", "Duo", "Core Team", "Pro Crew", "100+ Network"],
      "Talent": ["Self", "Friend", "Local Pro", "Lead Face", "Global Celebrity"],
      "Equipment": ["Smartphone", "Basic Rig", "Cinema Tier", "High-End Bolt", "Full Rig / Anamorphic"],
      "Post": ["Quick Cut", "Pro Edit", "VFX/Color", "CGI Heavy", "Hollywood Grade"],
      "Distribution": ["Organic", "Boosted", "Regional", "National TV", "Global Premiere"]
    };
    return labels[cat][step - 1];
  };

  return (
    <section className="py-20 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Cinematic Flash Overlay */}
      <AnimatePresence>
        {isFlashed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-[100] bg-white"
          />
        )}
      </AnimatePresence>

      <div className="container px-4 mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[hsl(43_72%_55%)] mb-4">Experience With Play First</p>
          <h2 className="text-3xl md:text-4xl font-display text-white uppercase tracking-tight">Real Production <span className="text-white/50">Calculator</span></h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#1a1a1a] p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative">
          
          {/* Faders Console (Left/Center) */}
          <div className="lg:col-span-8 flex flex-wrap md:flex-nowrap gap-2 md:gap-6 justify-between">
            {categories.map((cat) => (
              <div key={cat} className="flex flex-col items-center gap-4 flex-1 min-w-[60px]">
                <div className="h-40 w-1 bg-zinc-800 rounded-full relative flex flex-col justify-end">
                   {/* Step Markers */}
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className="absolute left-[-4px] w-3 h-[1px] bg-white/10" style={{ bottom: `${(i + 1) * 20}%` }} />
                   ))}
                   {/* Active Track */}
                   <div 
                      className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-300" 
                      style={{ height: `${(values[cat] / 5) * 100}%`, backgroundColor: '#D4AF37' }} 
                   />
                   {/* Fader Head */}
                   <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      step="1"
                      value={values[cat]}
                      onChange={(e) => {
                        setValues(prev => ({ ...prev, [cat]: parseInt(e.target.value) }));
                        setShowBook(false);
                      }}
                      className="absolute inset-x-[-15px] top-0 bottom-0 opacity-0 cursor-pointer h-full z-20"
                      style={{ writingMode: 'vertical-rl' }}
                   />
                   <motion.div 
                     animate={{ bottom: `${(values[cat] / 5) * 100}%` }}
                     className="absolute left-[-11px] w-6 h-3 bg-[#D4AF37] border border-white/20 rounded-sm shadow-lg pointer-events-none z-10 flex items-center justify-center -translate-y-1/2"
                   >
                     <div className="w-[1px] h-1.5 bg-black/30" />
                   </motion.div>
                </div>
                <div className="text-center space-y-2">
                   <p className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">{cat}</p>
                   <p className="font-mono text-[8px] uppercase tracking-tighter text-white/40 h-8 flex items-center justify-center">{getStepLabel(cat, values[cat])}</p>
                </div>
              </div>
            ))}
          </div>

          {/* VU Meter & Results (Right) */}
          <div className="lg:col-span-4 bg-black/40 p-6 rounded-2xl border border-white/5 flex flex-col items-center">
             {/* VU Segments */}
             <div className="flex flex-col-reverse gap-[3px] h-48 mb-6">
               {[...Array(12)].map((_, i) => (
                 <div 
                   key={i} 
                   className={`w-10 h-2 rounded-[1px] transition-all duration-500 ${i < prod.bars ? prod.color : 'bg-zinc-900'}`} 
                 />
               ))}
             </div>

             <div className="text-center mb-6">
               <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Estimation Logic</p>
               <h4 className="text-xl md:text-2xl font-display text-white uppercase mb-2">{prod.type}</h4>
               <p className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest">{prod.setup}</p>
             </div>

             {!showBook ? (
               <button 
                  onClick={handleAction}
                  className="w-full py-4 bg-zinc-900 border border-white/10 text-white font-mono text-[10px] uppercase font-bold tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all group"
               >
                 <div className="relative w-4 h-4 overflow-hidden border border-current rounded-sm">
                    <motion.div 
                      animate={{ rotate: [0, -30, 0] }}
                      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute top-0 w-full h-[2px] bg-current origin-left" 
                    />
                 </div>
                 LIGHTS, CAMERA, ACTION
               </button>
             ) : (
                <div className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-1 text-left">
                    <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block">Your Email Address</label>
                    <input 
                      type="email"
                      value={calculatorEmail}
                      onChange={(e) => setCalculatorEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors placeholder:text-zinc-700"
                    />
                  </div>

                  {/* Additional Notes Input */}
                  <div className="space-y-1 text-left">
                    <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block">Project Location, Deadline, or Notes</label>
                    <textarea 
                      value={calculatorNotes}
                      onChange={(e) => setCalculatorNotes(e.target.value)}
                      placeholder="e.g. Shoot in Mumbai next month, launch by end of year..."
                      rows={2}
                      className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors placeholder:text-zinc-700 resize-none"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (!calculatorEmail || !calculatorEmail.includes('@') || !calculatorEmail.includes('.')) {
                        alert("Please enter a valid email address.");
                        return;
                      }

                      const emailSubject = `New Project Scale: ${prod.type}`;
                      const emailBody = `Production Score: ${score}/30\nCategory: ${prod.type}\nSetup: ${prod.setup}\nClient Email: ${calculatorEmail}\n\nProject Notes:\n${calculatorNotes}\n\nFader Breakdown:\n${categories.map(c => `${c}: ${getStepLabel(c, values[c])}`).join('\n')}`;
                      
                      const whatsappMessage = `Hi TV³ Studios,\n\nI want to book the *${prod.type}* scale.\n\n*Email:* ${calculatorEmail}\n*Setup:* ${prod.setup}\n*Notes:* ${calculatorNotes}\n\n*Fader Breakdown:*\n${categories.map(c => `- ${c}: ${getStepLabel(c, values[c])}`).join('\n')}`;

                      // 1. Mailto Link
                      const mailtoUrl = `mailto:tv3studios@proton.me?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                      window.location.href = mailtoUrl;

                      // 2. WhatsApp Link after delay
                      setTimeout(() => {
                        handleWhatsAppRedirect(whatsappMessage);
                      }, 800);
                    }}
                    className="w-full py-4 bg-[#D4AF37] text-black font-mono text-[10px] uppercase font-bold tracking-[0.3em] flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all font-black"
                  >
                    SUBMIT DUAL INTAKE PIPELINE
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Visual Production");
  const [showBrandStoryModal, setShowBrandStoryModal] = useState(false);
  const [brandStoryTier, setBrandStoryTier] = useState<"Standard" | "Premium" | "Consultation">("Consultation");
  const [brandStoryName, setBrandStoryName] = useState("");
  const [brandStoryCompany, setBrandStoryCompany] = useState("");
  const [brandStoryGoals, setBrandStoryGoals] = useState("");
  const [brandStoryEmail, setBrandStoryEmail] = useState("");

  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20 selection:bg-[hsl(43_72%_55%)] selection:text-black">
      <CinematicReel />
      <ServicesSection />
      
      {/* Master Directive: Real Production Calculator */}
      <RealProductionCalculator />

      {/* ── BRAND STORIES F2F ──────────────────────────────── */}
      <section className="py-24 bg-[#020202] border-t border-white/5">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl border border-[hsl(43_72%_55%)]/15 bg-gradient-to-br from-[#0a0800] via-[#050505] to-[#000] overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.04)]"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(43_72%_55%)]/[0.04] blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[hsl(43_72%_55%)]/[0.03] blur-[100px] pointer-events-none" />
            <div className="relative z-10 p-8 md:p-14">
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px flex-1 bg-[hsl(43_72%_55%)]/20" />
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[hsl(43_72%_55%)] font-black flex-shrink-0">
                  <span className="px-2 py-1 bg-[hsl(43_72%_55%)] text-black rounded-sm mr-3">CORE OPERATION</span>
                  F2F Service — Founder To Founder
                </span>
                <div className="h-px flex-1 bg-[hsl(43_72%_55%)]/20" />
              </div>
              <div className="mb-12">
                <h3 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4 leading-none">
                  Brand <span className="text-[hsl(43_72%_55%)] italic font-serif lowercase">Stories</span>
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(43_72%_55%)]/60 mb-8">Personalized Brand Narrative — Art Form Execution</p>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-3xl">
                  We are building a dedicated display-board channel on TV where brand narratives are told not as ads — but as art. Every company already has a USP. Most have simply never had someone sit across the table and ask the right questions. We listen, redefine, and reconstruct the original founder's story into a unique voice that elevates the company to a brand.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-[hsl(43_72%_55%)]/20 transition-all">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[hsl(43_72%_55%)] mb-4">The Process</p>
                  <ul className="space-y-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    <li className="flex items-start gap-2"><span className="text-[hsl(43_72%_55%)] mt-0.5">→</span> Deep listening session with the founder</li>
                    <li className="flex items-start gap-2"><span className="text-[hsl(43_72%_55%)] mt-0.5">→</span> USP discovery and narrative mapping</li>
                    <li className="flex items-start gap-2"><span className="text-[hsl(43_72%_55%)] mt-0.5">→</span> Cinematic script and story construction</li>
                    <li className="flex items-start gap-2"><span className="text-[hsl(43_72%_55%)] mt-0.5">→</span> TV & digital channel brand placement</li>
                    <li className="flex items-start gap-2"><span className="text-[hsl(43_72%_55%)] mt-0.5">→</span> Entrepreneurial spirit — not business-sheet templates</li>
                  </ul>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-[hsl(43_72%_55%)]/20 transition-all">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[hsl(43_72%_55%)] mb-4">The Truth</p>
                  <p className="font-serif italic text-zinc-300 text-sm leading-relaxed mb-4">
                    "Every company has a story worth telling. Most have just never had someone sit across the table and ask the right questions."
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">This is not a pitch deck service. This is legacy architecture.</p>
                </div>
              </div>
              {/* ── The F2F Podcast Table ── */}
              <div className="relative border border-[hsl(43_72%_55%)]/20 rounded-2xl bg-[#030303] p-8 md:p-14 mb-10 overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,1)]">
                
                {/* Podcast Studio Lighting & Mic Backdrop */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[hsl(43_72%_55%)]/20 to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-5 pointer-events-none">
                  <Mic2 className="w-64 h-64 text-[hsl(43_72%_55%)]" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_60%)] pointer-events-none" />
                
                <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-[hsl(43_72%_55%)]/30 absolute top-4 left-1/2 -translate-x-1/2 z-0 font-bold">Studio Audio Linked</p>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 mt-4">
                  
                  {/* Chair 1 - The Founder */}
                  <div className="flex flex-col items-center gap-4 flex-1">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-white/5 rounded-full blur-xl group-hover:bg-[hsl(43_72%_55%)]/10 transition-colors" />
                      <div className="w-20 h-20 border border-[hsl(43_72%_55%)]/40 rounded-full bg-[hsl(43_72%_55%)]/5 flex items-center justify-center relative shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                        <Film className="w-8 h-8 text-[hsl(43_72%_55%)]/80 drop-shadow-[0_0_8px_hsla(43,72%,55%,0.5)]" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[hsl(43_72%_55%)] drop-shadow-[0_0_5px_hsla(43,72%,55%,0.3)]">Your Brand</p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600 mt-1">The Story Untold</p>
                    </div>
                  </div>

                  {/* The Table Centerpiece */}
                  <div className="flex-shrink-0 flex flex-col items-center relative gap-6">
                    {/* Connecting line on desktop */}
                    <div className="hidden md:block absolute top-[40px] -left-12 -right-12 h-px bg-gradient-to-r from-transparent via-[hsl(43_72%_55%)]/40 to-transparent -z-10" />
                    
                    <button
                      onClick={() => {
                        setBrandStoryTier("Consultation");
                        setShowBrandStoryModal(true);
                      }}
                      className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-md font-mono text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all z-10"
                      style={{
                        background: "linear-gradient(to right, #000 0%, #000 15%, #fff 15%, #fff 17%, #000 17%, #000 32%, #fff 32%, #fff 34%, #000 34%, #000 49%, #fff 49%, #fff 51%, #000 51%, #000 66%, #fff 66%, #fff 68%, #000 68%, #000 83%, #fff 83%, #fff 85%, #000 85%, #000 100%)",
                        boxShadow: "0 0 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.1)"
                      }}
                    >
                      {/* Piano Key Overlay (Hover Effect) */}
                      <div className="absolute inset-0 bg-black/80 group-hover:bg-black/60 transition-colors" />
                      
                      {/* 3s Wave / 1s Pause Narrative Loop */}
                      <div className="absolute inset-0 flex items-center justify-around px-2 opacity-20 pointer-events-none">
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ 
                              height: ["10%", "80%", "10%"],
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity, 
                              repeatDelay: 1,
                              delay: i * 0.1,
                              ease: "easeInOut" 
                            }}
                            className="w-1 bg-[hsl(43_72%_55%)] rounded-full"
                          />
                        ))}
                      </div>

                      <span className="relative z-10 text-[hsl(43_72%_55%)] flex items-center gap-3 drop-shadow-[0_0_8px_rgba(0,0,0,1)]">
                        <Mic2 className="w-5 h-5 animate-pulse" />
                        START CALL
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>

                  {/* Chair 2 - TV³ Studios */}
                  <div className="flex flex-col items-center gap-4 flex-1">
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-[hsl(43_72%_55%)]/5 auto-blur-xl group-hover:bg-white/10 transition-colors" />
                      <div className="w-20 h-20 border border-white/20 rounded-full bg-white/[0.03] flex items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                        <MonitorPlay className="w-8 h-8 text-white/50" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">TV³ Studios</p>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600 mt-1">The Storytellers</p>
                    </div>
                  </div>

                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    setBrandStoryTier("Standard");
                    setShowBrandStoryModal(true);
                  }}
                  className="flex-1 sm:max-w-xs text-center border border-[hsl(43_72%_55%)]/30 bg-[hsl(43_72%_55%)]/5 text-[hsl(43_72%_55%)] px-8 py-4 rounded-xl font-mono text-[10px] font-black uppercase tracking-[0.25em] hover:bg-[hsl(43_72%_55%)]/10 transition-all"
                >
                  Standard
                </button>
                <button 
                  onClick={() => {
                    setBrandStoryTier("Premium");
                    setShowBrandStoryModal(true);
                  }}
                  className="flex-1 sm:max-w-xs text-center bg-[hsl(43_72%_55%)] text-black px-8 py-4 rounded-xl font-mono text-[10px] font-black uppercase tracking-[0.25em] hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                >
                  Premium
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW WE WORK (INFOMERCIAL PLATE) ──────────────────────── */}
      <section className="py-24 bg-[#020202] border-t border-white/5">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl border border-white/5 bg-[#060606] overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,1)]"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(43_72%_55%)]/[0.02] blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/[0.01] blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 p-8 md:p-14">
              {/* Header */}
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px flex-1 bg-white/5" />
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[hsl(43_72%_55%)] font-black flex-shrink-0">
                  HOW WE WORK • OPERATIONAL SYSTEM
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="mb-14 text-center max-w-3xl mx-auto">
                <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-none">
                  We Don't Sell <span className="text-zinc-500 italic font-serif lowercase">Packages.</span> <br/>
                  We Structure <span className="text-[hsl(43_72%_55%)]">Projects</span> to Channelise.
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                  Every project that enters TV³ Studios is treated as a channel — not a transaction. We map the creative, the operational, and the strategic into one unified execution. The discipline changes. The standard never does.
                </p>
              </div>

              {/* Three Disciplines Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                
                {/* Visual Production */}
                <div className="space-y-3 text-left">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[hsl(43_72%_55%)]/60">// 01 Visual Production</p>
                  <h4 className="text-lg font-display font-black text-white uppercase">Identity Architecture</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    From the first mark to the full visual system — we build brand identities that hold authority. Logo, typography, motion, color. Every element is a decision. We make them with intent, so your brand can hold space in any room it enters.
                  </p>
                </div>

                {/* Video Production */}
                <div className="space-y-3 text-left">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[hsl(43_72%_55%)]/60">// 02 Video Production</p>
                  <h4 className="text-lg font-display font-black text-white uppercase">Moving Picture Power</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    From viral social content to broadcast-grade films — we channel your story into motion. AI-enhanced, human-directed. We don't produce videos. We produce moments that change how your audience sees you. Every frame is working for you.
                  </p>
                </div>

                {/* Copywriting */}
                <div className="space-y-3 text-left">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[hsl(43_72%_55%)]/60">// 03 Copywriting & Narrative</p>
                  <h4 className="text-lg font-display font-black text-white uppercase">Words That Command</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Copy is not content. Copy is architecture. Every word in your brand's language is either working or working against you. We write the manifesto, the scripts, the hooks, and the voice — so that when your brand speaks, it's impossible to ignore.
                  </p>
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* ── BRAND STORY INTAKE MODAL ── */}
      <AnimatePresence>
        {showBrandStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBrandStoryModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] p-6 md:p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] z-10"
            >
              {/* Gold Top bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[hsl(43_72%_55%)] to-transparent" />

              <h3 className="font-display text-2xl font-black text-white uppercase tracking-tight mb-2">
                Brand Story Requirements
              </h3>
              <p className="font-mono text-[9px] uppercase tracking-widest text-[hsl(43_72%_55%)] mb-6 text-left">
                F2F Intake — {brandStoryTier} Package
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  
                  if (!brandStoryName || !brandStoryCompany || !brandStoryEmail || !brandStoryGoals) {
                    alert("Please fill in all requirements.");
                    return;
                  }

                  const emailSubject = `Brand Story F2F Intake: ${brandStoryCompany}`;
                  const emailBody = `Founder/Client: ${brandStoryName}\nCompany/Industry: ${brandStoryCompany}\nSelected Tier: ${brandStoryTier}\nClient Email: ${brandStoryEmail}\n\nGoals & Timeline:\n${brandStoryGoals}`;
                  
                  const whatsappMessage = `Hi TV³ Studios,\n\nI want to book a *Brand Story F2F* meeting.\n\n*Founder Name:* ${brandStoryName}\n*Company:* ${brandStoryCompany}\n*Email:* ${brandStoryEmail}\n*Tier:* ${brandStoryTier}\n\n*Goals & Timeline:*\n${brandStoryGoals}`;

                  // 1. Mailto Link
                  const mailtoUrl = `mailto:tv3studios@proton.me?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                  window.location.href = mailtoUrl;

                  // 2. WhatsApp Link after delay
                  setTimeout(() => {
                    handleWhatsAppRedirect(whatsappMessage);
                  }, 800);

                  setShowBrandStoryModal(false);
                  // Clear form
                  setBrandStoryName("");
                  setBrandStoryCompany("");
                  setBrandStoryGoals("");
                  setBrandStoryEmail("");
                }}
                className="space-y-4 text-left"
              >
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block mb-1">Founder / Client Name</label>
                  <input
                    type="text"
                    required
                    value={brandStoryName}
                    onChange={(e) => setBrandStoryName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block mb-1">Company Name / Industry</label>
                  <input
                    type="text"
                    required
                    value={brandStoryCompany}
                    onChange={(e) => setBrandStoryCompany(e.target.value)}
                    placeholder="e.g. TechCorp / FinTech"
                    className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block mb-1">Your Email Address</label>
                  <input
                    type="email"
                    required
                    value={brandStoryEmail}
                    onChange={(e) => setBrandStoryEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block mb-1">Story Goals & Timeline</label>
                  <textarea
                    required
                    value={brandStoryGoals}
                    onChange={(e) => setBrandStoryGoals(e.target.value)}
                    placeholder="Describe your brand narrative timeline, objectives..."
                    rows={3}
                    className="w-full bg-[#111] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBrandStoryModal(false)}
                    className="flex-1 py-3 border border-white/10 text-white font-mono text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-white/5 transition-all rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[hsl(43_72%_55%)] text-black font-mono text-[10px] uppercase font-bold tracking-[0.2em] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-white transition-all rounded-md font-black"
                  >
                    SUBMIT INTAKE
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
