import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowRight, Check, Sparkles, Send, Eye, Calendar, ShieldCheck, Palette, RefreshCw, Zap } from "lucide-react";

export default function BrandedContent() {
  const [clickInterceptor, setClickInterceptor] = useState<{
    x: number;
    y: number;
    show: boolean;
  }>({ x: 0, y: 0, show: false });
  const [interceptionComplete, setInterceptionComplete] = useState(false);

  const isInteractive = (el: HTMLElement | null): boolean => {
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    if (["a", "button", "input", "select", "textarea"].includes(tag)) return true;
    if (el.getAttribute("role") === "button") return true;

    // Check if it has classes indicating pointer cursor
    const className = el.className || "";
    if (typeof className === "string" && (
      className.includes("cursor-pointer") || 
      className.includes("hover:") ||
      className.includes("btn")
    )) {
      return true;
    }

    // Bubble up to parent
    return isInteractive(el.parentElement);
  };

  const handlePageClickCapture = (e: React.MouseEvent) => {
    if (interceptionComplete) return;

    if (!clickInterceptor.show) {
      // Check if they clicked an interactive element
      if (isInteractive(e.target as HTMLElement)) {
        e.preventDefault();
        e.stopPropagation();

        setClickInterceptor({
          x: e.clientX,
          y: e.clientY,
          show: true
        });

        // Speak using web speech api
        try {
          const utterance = new SpeechSynthesisUtterance("Sorry, I'm Poster AI — coming soon to post for you!");
          utterance.rate = 1.0;
          utterance.pitch = 1.1;
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.error("SpeechSynthesis error:", err);
        }
      }
    } else {
      // Dismiss popup and let normal clicks pass through henceforth
      e.preventDefault();
      e.stopPropagation();
      setClickInterceptor({ x: 0, y: 0, show: false });
      setInterceptionComplete(true);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      for: "For one channel, getting consistent",
      price: "₹999",
      features: [
        "20 branded posts per month",
        "1 social platform connected",
        "Full review before any post goes live",
        "Delivered in batches weekly"
      ],
      featured: false
    },
    {
      id: "growth",
      name: "Growth",
      for: "For brands posting across channels",
      price: "₹19,999",
      features: [
        "60 branded posts per month",
        "Instagram + Facebook + LinkedIn",
        "Auto-scheduled after your approval",
        "Monthly custom content calendar"
      ],
      featured: true
    },
    {
      id: "agency",
      name: "Agency",
      for: "For teams managing several brands",
      price: "₹39,999",
      features: [
        "150+ branded posts per month",
        "All major social platforms",
        "Multiple distinct brand kits supported",
        "Priority project turnaround times",
        "Dedicated content calendar manager"
      ],
      featured: false
    }
  ];

  return (
    <div 
      onClickCapture={handlePageClickCapture}
      className="min-h-screen bg-[#050505] text-white font-body selection:bg-primary selection:text-black pt-28"
    >
      {/* Grid Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,255,255,0.02),_rgba(0,255,0,0.005),_rgba(0,0,255,0.02))] bg-[size:100%_4px,_6px_100%] pointer-events-none z-0" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        
        {/* HERO SECTION */}
        <section className="py-16 md:py-24 text-center max-w-4xl mx-auto space-y-8">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37] drop-shadow-[0_0_8px_hsla(43,72%,55%,0.3)]"
          >
            Branding, on autopilot
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight leading-none"
          >
            Your brand's next <span className="text-gradient-gold italic font-serif lowercase">100 posts</span>, made and published without you touching a design tool.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Upload your logo and colors once. Get on-brand posts every week, auto-scheduled to your channels — fully reviewed by you before anything goes live.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <button 
              onClick={() => scrollToSection("plans")}
              className="px-8 py-4 bg-white text-black font-mono text-xs uppercase font-black tracking-widest rounded-xl hover:bg-[#D4AF37] hover:scale-105 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.05)]"
            >
              View plans
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className="px-8 py-4 bg-transparent border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 font-mono text-xs uppercase font-bold tracking-widest rounded-xl transition-all"
            >
              How it works
            </button>
          </motion.div>

          {/* TRANSFORM DEMO */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 border border-white/5 bg-zinc-950/40 backdrop-blur-md rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-5 text-center space-y-4">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">What you send</span>
              <div className="h-40 rounded-xl bg-zinc-900/50 border border-white/5 flex flex-col items-center justify-center text-zinc-600 font-mono text-xs p-4 gap-2">
                <div className="p-3 bg-zinc-950/40 rounded-lg border border-white/5 border-dashed">
                  <Palette className="w-5 h-5 text-zinc-600" />
                </div>
                Plain Photo + Raw Logo File
              </div>
            </div>

            <div className="md:col-span-2 flex justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary animate-pulse">
                <ArrowRight className="w-5 h-5 rotate-90 md:rotate-0" />
              </div>
            </div>

            <div className="md:col-span-5 text-center space-y-4">
              <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest block font-bold">What you get</span>
              <div className="h-40 rounded-xl bg-gradient-to-br from-[#8C632C]/30 to-[#C98A3D]/40 border border-[#D4AF37]/30 flex flex-col items-center justify-center p-6 relative overflow-hidden group shadow-[inset_0_0_30px_rgba(212,175,55,0.1)]">
                <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-[#050505] text-[#D4AF37] flex items-center justify-center font-serif font-black text-xs border border-[#D4AF37]/20 shadow-md">
                  TV
                </div>
                <p className="font-serif text-lg font-bold text-white leading-tight mt-2 italic">
                  Quality that speaks<br />before you do.
                </p>
                <span className="mt-3 font-mono text-[8px] uppercase tracking-widest text-[#D4AF37] bg-black/60 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                  Ready to post
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 border-t border-white/5 space-y-16">
          <div className="text-center space-y-3">
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">The Protocol</span>
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight">How it works</h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto font-mono uppercase tracking-wider">Three steps. No complex software or schedulers to manage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-950/20 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-primary/20 transition-all">
              <span className="font-serif text-lg font-bold text-primary italic">01 //</span>
              <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" /> Setup Profile
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Send your brand assets once: logo, primary hex codes, and brief notes about your product and target audience.
              </p>
            </div>

            <div className="bg-zinc-950/20 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-primary/20 transition-all">
              <span className="font-serif text-lg font-bold text-primary italic">02 //</span>
              <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" /> Review Batches
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Our pipeline generates your posts in your custom brand layout. You review and approve the calendar before anything goes out.
              </p>
            </div>

            <div className="bg-zinc-950/20 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-primary/20 transition-all">
              <span className="font-serif text-lg font-bold text-primary italic">03 //</span>
              <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Auto Publish
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Connect your social accounts. Approved posts are published on schedule. We adjust designs dynamically based on performance signals.
              </p>
            </div>
          </div>
        </section>

        {/* PRICING PLANS */}
        <section id="plans" className="py-20 border-t border-white/5 space-y-16">
          <div className="text-center space-y-3">
            <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest font-bold drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]">Execution Tiers</span>
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight">Select Pricing Plan</h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto font-mono uppercase tracking-wider">Priced by the volume of content your brand scales each month.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-zinc-950/40 border p-8 rounded-3xl flex flex-col justify-between relative transition-all duration-300 ${
                  plan.featured 
                    ? "border-primary shadow-[0_0_40px_rgba(212,175,55,0.08)] scale-100 lg:scale-105 z-10" 
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-8 bg-primary text-black font-mono text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-black uppercase tracking-wider text-white">{plan.name}</h3>
                    <p className="text-xs text-zinc-500 font-mono mt-1 uppercase tracking-wide">{plan.for}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">/ month</span>
                  </div>

                  <div className="h-px bg-white/5" />

                  <ul className="space-y-3 text-sm text-zinc-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  <Link 
                    to={`/get-started?plan=${plan.id}`}
                    className={`w-full text-center py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2 hover:scale-[1.02] ${
                      plan.featured 
                        ? "bg-primary text-black hover:bg-white" 
                        : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    Get started
                    <Zap className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="py-16 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-2 border-t border-white/5 pt-6 md:border-0 md:pt-0">
              <h4 className="font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2 justify-center md:justify-start">
                <ShieldCheck className="w-4.5 h-4.5 text-[#D4AF37]" /> You stay in control
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed font-mono uppercase tracking-wide">
                Nothing posts without your final sign-off. You can pause, skip, or edit batches at any point.
              </p>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-6 md:border-0 md:pt-0">
              <h4 className="font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2 justify-center md:justify-start">
                <Palette className="w-4.5 h-4.5 text-[#D4AF37]" /> True Brand Assets
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed font-mono uppercase tracking-wide">
                Every asset compiles using your actual vectors, exact hex codes, and product photos — no generic templates.
              </p>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-6 md:border-0 md:pt-0">
              <h4 className="font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2 justify-center md:justify-start">
                <RefreshCw className="w-4.5 h-4.5 text-[#D4AF37]" /> Feedback Loop
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed font-mono uppercase tracking-wide">
                Submit updates directly in the calendar notes. The design model adapts and learns from your feedback weekly.
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING BANNER */}
        <section className="py-24 text-center space-y-8 border-t border-white/5">
          <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight max-w-2xl mx-auto leading-tight">
            Stop starting from a blank page every week.
          </h2>
          <button 
            onClick={() => scrollToSection("plans")}
            className="px-8 py-4 bg-primary text-black font-mono text-xs uppercase font-black tracking-widest rounded-xl hover:bg-white hover:scale-105 transition-all shadow-[0_4px_25px_rgba(212,175,55,0.2)]"
          >
            Choose your tier
          </button>
        </section>

      </div>
      <Footer />
      <PosterBoy />

      {/* 3D Intercept Mascot Overlay */}
      <AnimatePresence>
        {clickInterceptor.show && (
          <>
            {/* Clickable Backdrop to dismiss */}
            <div 
              className="fixed inset-0 z-[9998] cursor-default bg-black/10" 
              onClick={(e) => {
                e.stopPropagation();
                setClickInterceptor({ x: 0, y: 0, show: false });
                setInterceptionComplete(true);
              }}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0, rotateY: -45, rotateX: -30, y: 40 }}
              animate={{ opacity: 1, scale: 1.25, rotateY: 15, rotateX: 10, y: 0 }}
              exit={{ opacity: 0, scale: 0, rotateY: -45, rotateX: -30, y: 40 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              style={{
                position: 'fixed',
                left: `${clickInterceptor.x}px`,
                top: `${clickInterceptor.y - 80}px`, // Offset upwards so he sits above the finger/mouse pointer
                transform: 'translate(-50%, -100%)',
                perspective: 1200,
                transformStyle: "preserve-3d",
                zIndex: 9999,
                pointerEvents: 'none'
              }}
              className="flex flex-col items-center gap-3 select-none"
            >
              {/* Gold Speech Bubble */}
              <div 
                style={{ transform: "translateZ(30px)" }}
                className="bg-black border-2 border-[#D4AF37] text-[#D4AF37] font-mono text-[9px] uppercase font-black tracking-widest px-4 py-3 rounded-2xl shadow-[0_15px_40px_rgba(212,175,55,0.3)] text-center max-w-[200px] relative border-double border-4"
              >
                Sorry, I'm Poster AI — coming soon to post for you!
                {/* Speech Bubble Arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black border-r-2 border-b-2 border-[#D4AF37] transform rotate-45" />
              </div>

              {/* 3D-styled SVG Mascot */}
              <div 
                style={{ 
                  transform: "translateZ(10px)",
                  filter: "drop-shadow(0 25px 35px rgba(212,175,55,0.45)) drop-shadow(0 10px 15px rgba(0,0,0,0.8))"
                }}
                className="relative"
              >
                <svg width="70" height="70" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Antennas */}
                  <path d="M22 18L14 8" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="13" cy="7" r="3" fill="#D4AF37"/>
                  
                  <path d="M38 18L46 8" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="47" cy="7" r="3" fill="#D4AF37"/>

                  {/* TV Outer Shell with highlight gradients */}
                  <rect x="8" y="16" width="44" height="34" rx="8" fill="#1F1E24" stroke="#D4AF37" strokeWidth="3"/>
                  {/* Bevel highlight */}
                  <rect x="10" y="18" width="40" height="30" rx="6" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.1"/>
                  
                  {/* Screen Inner Shell */}
                  <rect x="13" y="21" width="30" height="24" rx="4" fill="#0C0B0E" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.5"/>
                  
                  {/* CRT Scanline Overlay */}
                  <line x1="13" y1="24" x2="43" y2="24" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.2"/>
                  <line x1="13" y1="28" x2="43" y2="28" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.2"/>
                  <line x1="13" y1="32" x2="43" y2="32" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.2"/>
                  <line x1="13" y1="36" x2="43" y2="36" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.2"/>
                  <line x1="13" y1="40" x2="43" y2="40" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.2"/>

                  {/* Dials (Right Side) */}
                  <circle cx="47" cy="24" r="2.5" fill="#D4AF37" />
                  <circle cx="47" cy="31" r="2.5" fill="#D4AF37" />
                  <rect x="45" y="38" width="4" height="2.5" rx="1" fill="#D4AF37" />

                  {/* Blink Eyes */}
                  <motion.ellipse 
                    animate={{ scaleY: [1, 1, 0, 1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                    cx="21" cy="30" rx="2.5" ry="3.5" fill="#D4AF37" 
                    style={{ originX: "21px", originY: "30px" }}
                  />
                  <motion.ellipse 
                    animate={{ scaleY: [1, 1, 0, 1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                    cx="31" cy="30" rx="2.5" ry="3.5" fill="#D4AF37"
                    style={{ originX: "31px", originY: "30px" }}
                  />

                  {/* Face Smile */}
                  <path d="M22 36Q26 40 30 36" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function PosterBoy() {
  const [activePhrase, setActivePhrase] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  const phrases = [
    "I make posters for brands like yours 📺",
    "Pick a plan and I'll get started for you!",
    "Every brand deserves to look this good. ✨",
    "On autopilot. No design tools needed!",
    "Approve everything before it goes live."
  ];

  const handleNextPhrase = () => {
    setActivePhrase((prev) => (prev + 1) % phrases.length);
    setShowBubble(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-mono">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-black border border-primary/40 text-primary text-[10px] tracking-wider uppercase font-bold p-3 rounded-2xl max-w-[200px] shadow-[0_0_20px_rgba(212,175,55,0.15)] text-center relative"
          >
            {phrases[activePhrase]}
            {/* Tiny indicator arrow */}
            <div className="absolute -bottom-1 right-6 w-2.5 h-2.5 bg-black border-r border-b border-primary/40 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot TV */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        onClick={handleNextPhrase}
        onMouseEnter={() => setShowBubble(true)}
        onMouseLeave={() => setShowBubble(false)}
        className="cursor-pointer"
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Antennas */}
          <path d="M22 18L14 8" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="13" cy="7" r="2.5" fill="#D4AF37"/>
          
          <path d="M38 18L46 8" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="47" cy="7" r="2.5" fill="#D4AF37"/>

          {/* TV Outer Shell */}
          <rect x="8" y="16" width="44" height="34" rx="8" fill="#1F1E24" stroke="#D4AF37" strokeWidth="2.5"/>
          
          {/* Screen Inner Shell */}
          <rect x="13" y="21" width="30" height="24" rx="4" fill="#0C0B0E" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4"/>
          
          {/* Static Scanline Overlay */}
          <line x1="13" y1="25" x2="43" y2="25" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15"/>
          <line x1="13" y1="29" x2="43" y2="29" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15"/>
          <line x1="13" y1="33" x2="43" y2="33" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15"/>
          <line x1="13" y1="37" x2="43" y2="37" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15"/>
          <line x1="13" y1="41" x2="43" y2="41" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.15"/>

          {/* Dials (Right Side) */}
          <circle cx="47" cy="24" r="2.5" fill="#D4AF37" fillOpacity="0.6"/>
          <circle cx="47" cy="31" r="2.5" fill="#D4AF37" fillOpacity="0.6"/>
          <rect x="45" y="38" width="4" height="2" rx="1" fill="#D4AF37" fillOpacity="0.6"/>

          {/* Cute Face: Eyes */}
          <motion.ellipse 
            animate={{ scaleY: [1, 1, 0, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
            cx="21" cy="30" rx="2" ry="3" fill="#D4AF37" 
            style={{ originX: "21px", originY: "30px" }}
          />
          <motion.ellipse 
            animate={{ scaleY: [1, 1, 0, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
            cx="31" cy="30" rx="2" ry="3" fill="#D4AF37"
            style={{ originX: "31px", originY: "30px" }}
          />

          {/* Smile */}
          <path d="M23 37Q26 40 29 37" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </div>
  );
}
