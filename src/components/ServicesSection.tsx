import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Play, Disc3, MonitorPlay, Film, ArrowRight, Flame, CheckCircle2 } from "lucide-react";
import PostProductionSelector from "./PostProductionSelector";
import { handleWhatsAppRedirect } from "@/utils/whatsapp";

// --- Data Models ---
const AI_SONGS = [
  { id: "s1", title: "Brand Zingles", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "s2", title: "Corporate Songs", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "s3", title: "Personal Songs", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "s4", title: "Songs for Entrepreneurs", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
];

const DJ_SERVICES = [
  { id: "d1", title: "Corporate DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", color: "blue", speed: 0.6 },
  { id: "d2", title: "Residential DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", color: "emerald", speed: 0.8 },
  { id: "d3", title: "Event DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", color: "purple", speed: 1 },
  { id: "d4", title: "Personal Party DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", color: "rose", speed: 1.2 },
  { id: "d5", title: "Festive DJ", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", color: "orange", speed: 1.5 },
];

const PACKAGES = [
  {
    title: "Foundational",
    desc: "Visual identity for emerging brands.",
    price: "$800",
    features: ["Brand Typography & Colors", "Primary & Secondary Logos", "Basic Style Guide", "2 Social Media Layouts"],
  },
  {
    title: "Cinematic Overhaul",
    desc: "A complete prestige visual system.",
    price: "$2,200",
    features: ["Comprehensive Brand Architecture", "Custom Graphic Assets", "Full Motion Graphics Kit", "Extensive Brand Bible"],
  },
  {
    title: "Retained Visuals",
    desc: "Ongoing production to maintain visual authority.",
    price: "Custom",
    features: ["Unlimited Asset Variations", "Priority Artistic Direction", "Weekly Campaign Assets", "Dedicated Designer"],
  }
];

const REELS_DATA = [
  { id: 1, title: "Lagin Bigin - Brand Track", youtubeId: "2ccAgY4UoX4", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400" },
  { id: 2, title: "Brand Showcase", youtubeId: "kC9Fx8QEXpI", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400" },
  { id: 3, title: "Pest Control Template", youtubeId: "Jn94dBgZ2xY", image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=400" },
  { id: 4, title: "Brand Ad Template", youtubeId: "vqI3xYcFJFM", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400" },
];

const UGC_REELS_DATA = [
  { id: 1, title: "AI Character Swap // Streetwear Campaign", localVideo: "/assets/ai_character_replace.mp4", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400", style: "Avatar Swap Mode" },
  { id: 2, title: "Kinetic Hooks // SaaS Product Reveal", youtubeId: "NXpdyAWLDas", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400", style: "Typography Hook" },
  { id: 3, title: "AI Styled Aesthetics // Luxury Beverage", youtubeId: "2ccAgY4UoX4", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400", style: "Cinematic Grade Loop" },
  { id: 4, title: "Character Conversion // Tech Showcase", youtubeId: "Jn94dBgZ2xY", image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=400", style: "Interactive Render" },
  { id: 5, title: "Dynamic Product Demo // Gadget Unboxing", youtubeId: "vqI3xYcFJFM", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", style: "3D Overlay Mode" },
  { id: 6, title: "Narrative Hook // Founder Story Short", youtubeId: "kC9Fx8QEXpI", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=400", style: "Prestige Story Telling" }
];

const ServicesSection = () => {
  // Tactile low-latency analog studio switch click synthesizer
  const playConsoleClick = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sine";
      // High-frequency tactile mechanical switch click frequency
      osc.frequency.setValueAtTime(1000, audioCtx.currentTime); 
      
      // Decay envelope for subtle tactile feel
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio Context beep blocked:", e);
    }
  };

  // Audio State (Unified Singleton Logic)
  const [activeAudioUri, setActiveAudioUri] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [audioTab, setAudioTab] = useState<"ai" | "original">("ai");

  useEffect(() => {
    const handleStop = () => {
      setActiveId(null);
      setActiveAudioUri(null);
      setIsOriginalRecording(false);
      setIsOriginalPaused(false);
    };
    window.addEventListener('stop-all-audio', handleStop);
    return () => window.removeEventListener('stop-all-audio', handleStop);
  }, []);

  const toggleAudio = (id: string, url: string) => {
    if (activeId === id) {
      setActiveId(null);
      setActiveAudioUri(null);
    } else {
      // Notify all other components to stop audio
      window.dispatchEvent(new CustomEvent('stop-all-audio'));
      setActiveId(id);
      setActiveAudioUri(url);
    }
  };

  const isAudioPlaying = (id: string) => activeId === id;
  const isDjPlaying = activeId?.startsWith("d");
  const isAudioProdPlaying = activeId?.startsWith("s");
  
  const activeDjObj = DJ_SERVICES.find(d => d.id === activeId);
  
  const getColorHex = (color?: string) => {
    switch(color) {
      case 'blue': return '#3b82f6';
      case 'emerald': return '#10b981';
      case 'purple': return '#a855f7';
      case 'rose': return '#f43f5e';
      case 'orange': return '#f97316';
      default: return '#71717a';
    }
  };

  // AI Video State
  const [activeReel, setActiveReel] = useState<number | null>(null);
  const [activeUgcReel, setActiveUgcReel] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ugcContainerRef = useRef<HTMLDivElement>(null);
  const aiVideoContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Audio Intake Form State
  const [audioBrandName, setAudioBrandName] = useState("");
  const [audioGenre, setAudioGenre] = useState("Cinematic Anthem");
  const [audioScope, setAudioScope] = useState("Full Song Production");
  const [audioEmail, setAudioEmail] = useState("");
  const [audioWhatToMake, setAudioWhatToMake] = useState("");
  const [audioPurpose, setAudioPurpose] = useState("");

  // Modal Intake Gateway State
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [intakeServiceName, setIntakeServiceName] = useState("");
  const [intakeEmail, setIntakeEmail] = useState("");
  const [intakeDetails, setIntakeDetails] = useState("");
  const [intakePlaceholder, setIntakePlaceholder] = useState("");
  const [intakeLabel, setIntakeLabel] = useState("");

  // Originals Detailed Intake State
  const [isOriginalIntake, setIsOriginalIntake] = useState(false);
  const [originalGenre, setOriginalGenre] = useState("Bollywood");
  const [originalMood, setOriginalMood] = useState("Love");
  const [originalLength, setOriginalLength] = useState("Standard (3-4 mins)");
  const [originalBudget, setOriginalBudget] = useState("Medium (Premium Production)");
  const [isOriginalRecording, setIsOriginalRecording] = useState(false);
  const [isOriginalPaused, setIsOriginalPaused] = useState(false);

  // DJ Detailed Intake State
  const [isDjIntake, setIsDjIntake] = useState(false);
  const [djDate, setDjDate] = useState("");
  const [djLocation, setDjLocation] = useState("");

  // Refs to manage recording audio playback
  const recordingAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (recordingAudioRef.current) {
      if (isOriginalRecording) {
        if (isOriginalPaused) {
          recordingAudioRef.current.pause();
        } else {
          recordingAudioRef.current.play().catch((err) => {
            console.warn("Autoplay blocked by browser policy:", err);
          });
        }
      } else {
        recordingAudioRef.current.pause();
        recordingAudioRef.current.currentTime = 0;
      }
    }
  }, [isOriginalRecording, isOriginalPaused]);

  const handleIntakeSubmit = async (
    serviceName: string, 
    email: string, 
    details: string, 
    additionalData: string = ""
  ) => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      alert("Please enter a valid email address.");
      return;
    }

    const emailSubject = `Welcome to TV³ Studios! Service Booking Request: ${serviceName}`;
    const emailBody = `Hi,\n\nThank you for your service inquiry at TV³ Studios! We have received your booking request for the "${serviceName}" package.\n\nHere are the details you provided:\n---------------------\nSelected Service: ${serviceName}\nClient Contact Email: ${email}\n\nProject Brief & Intake Details:\n${details}\n\n${additionalData ? `Additional Specifications:\n${additionalData}\n` : ""}---------------------\n\nWhat happens next:\nOur production leads will review your project brief and reference samples. Within 24 hours, we will reach out to you via email or WhatsApp to schedule a brief kick-off call and align our timelines.\n\nWe are looking forward to bringing your project to life! If you have any questions, feel free to reply directly to this email or reach out on WhatsApp.\n\nBest regards,\nTV³ Studios Team`;
    
    const whatsappMessage = `Hi TV³ Studios,\n\nI want to book the *${serviceName}* service.\n\n*My Email:* ${email}\n*Project Details:* ${details}\n\n${additionalData}`;

    // 1. Trigger WhatsApp redirect immediately (synchronous to click event to prevent Safari popup block)
    handleWhatsAppRedirect(whatsappMessage);

    // 2. Send email via serverless function silently in the background
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: 'tv3studios@gmail.com',
          replyTo: email,
          subject: emailSubject,
          body: emailBody
        })
      });
    } catch (err) {
      console.error("Direct email dispatch failed:", err);
    }
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          // Pause/stop all active videos when section is scrolled out of view
          setActiveReel(null);
          setActiveUgcReel(null);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ugcEl = ugcContainerRef.current;
    const aiEl = aiVideoContainerRef.current;

    const ugcObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setActiveUgcReel(curr => curr !== null ? null : curr);
        }
      },
      { threshold: 0.05 }
    );

    const aiObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setActiveReel(curr => curr !== null ? null : curr);
        }
      },
      { threshold: 0.05 }
    );

    if (ugcEl) ugcObserver.observe(ugcEl);
    if (aiEl) aiObserver.observe(aiEl);

    return () => {
      ugcObserver.disconnect();
      aiObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="px-4 py-24 md:px-6 md:py-32 bg-[#020202] text-white selection:bg-[hsl(43_72%_55%)] selection:text-black">
      <div className="mx-auto max-w-7xl">
        
        {/* UGC AD REELS - SPOTLIGHT HIGHLIGHT */}
        <motion.div
          ref={ugcContainerRef}
          id="ugc-ad-reels"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl mx-auto rounded-[2rem] border border-[hsl(43_72%_55%)]/30 bg-gradient-to-b from-zinc-950 via-[#030303] to-[#010101] p-8 md:p-14 relative overflow-hidden mb-24 shadow-[0_0_50px_rgba(212,175,55,0.06)] text-left"
        >
          {/* Top ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[hsl(43_72%_55%)] to-transparent" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-[hsl(43_72%_55%)]/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Header & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[hsl(43_72%_55%)]/10 border border-[hsl(43_72%_55%)]/20 rounded-full">
                <Flame className="w-3.5 h-3.5 text-[hsl(43_72%_55%)] animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[hsl(43_72%_55%)] font-black">Spotlight Service // User-Generated Content</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white leading-none">
                UGC Ad Reels
              </h2>
              <p className="font-serif text-lg md:text-xl text-[hsl(43_72%_55%)] italic leading-snug">
                "We don't sell cookie-cutter templates. We deliver custom UGC campaigns powered by advanced AI."
              </p>
            </div>
            
            <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-black">// What is UGC?</p>
              <p className="text-zinc-400 text-xs leading-relaxed">
                User-Generated Content (UGC) is the highest-converting ad format on modern networks. But we elevate it: we fuse organic creator footage with custom generative AI character-swaps, prestige motion graphics, and high-retention editing pipelines. Your audience stops scrolling because they see something entirely surreal, yet natively human.
              </p>
            </div>
          </div>

          {/* Interactive Phone Layout Grid - 6 Phones (3x2 on desktop, 1 on mobile) */}
          <div className="mb-16 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-8 font-black">
              [ Tap any device to watch our high-converting ad formats ]
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center relative z-10 max-w-5xl mx-auto">
              {UGC_REELS_DATA.map((reel) => {
                const isSelected = activeUgcReel === reel.id;
                return (
                  <div 
                    key={reel.id}
                    onClick={() => setActiveUgcReel(isSelected ? null : reel.id)}
                    className={`relative w-full max-w-[260px] mx-auto aspect-[9/16] rounded-[2.5rem] p-3 bg-[#0d0d0d] border-4 transition-all duration-500 cursor-pointer group ${
                      isSelected ? 'border-[hsl(43_72%_55%)] shadow-[0_0_40px_rgba(212,175,55,0.25)]' : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {/* Phone Notch */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-40 flex items-center justify-center border border-white/5">
                      <span className="w-2 h-2 rounded-full bg-zinc-900 mr-2" />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                    </div>
                    
                    {/* Inner Display Screen */}
                    <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-black shadow-inner border border-white/5">
                      {isSelected ? (
                        <div className="w-full h-full pointer-events-none relative z-20">
                          {reel.localVideo ? (
                            <video 
                              src={reel.localVideo} 
                              autoPlay 
                              loop 
                              playsInline 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <iframe
                              src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=0&loop=1&playlist=${reel.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                              className="w-full h-full scale-[1.03] origin-center"
                              allow="autoplay; encrypted-media; fullscreen"
                              allowFullScreen
                            />
                          )}
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <img 
                            src={reel.image} 
                            alt={reel.title} 
                            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                          
                          {/* Glowing Play Circle Button */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/85 border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-[hsl(43_72%_55%)]/40 transition-colors">
                            <Play className="w-5 h-5 text-white group-hover:text-[hsl(43_72%_55%)] fill-current transition-colors ml-0.5" />
                          </div>
                          
                          {/* Title text */}
                          <div className="absolute bottom-5 inset-x-4 text-center">
                            <p className="text-[10px] text-[hsl(43_72%_55%)] font-mono uppercase tracking-[0.25em] font-black mb-1 animate-pulse">
                              {reel.style}
                            </p>
                            <p className="text-[11px] text-white uppercase font-bold tracking-wider leading-snug">{reel.title}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing, Packages details & Inclusions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-white/5 relative z-10 items-stretch">
            {/* Supporting Services Inclusions */}
            <div className="lg:col-span-6 bg-black/40 border border-white/5 p-6 rounded-2xl text-left flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold mb-4">// Custom Production Pipeline Services Included</span>
                <div className="space-y-4 text-xs font-mono">
                  <div className="flex gap-3">
                    <span className="text-[hsl(43_72%_55%)] mt-0.5">✔</span>
                    <div>
                      <span className="text-white font-bold block uppercase tracking-wider text-[10px]">Creative Script Drafting</span>
                      <span className="text-zinc-500 text-[10px]">We map your core hooks and draft copy tailored for high retention.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[hsl(43_72%_55%)] mt-0.5">✔</span>
                    <div>
                      <span className="text-white font-bold block uppercase tracking-wider text-[10px]">AI Character Replacements</span>
                      <span className="text-zinc-500 text-[10px]">Turn yourself or your actor into custom photorealistic models or futuristic avatars.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[hsl(43_72%_55%)] mt-0.5">✔</span>
                    <div>
                      <span className="text-white font-bold block uppercase tracking-wider text-[10px]">Sound FX Mastering & Audio</span>
                      <span className="text-zinc-500 text-[10px]">Premium soundscapes, beat drops, and clean voiceover synthesis.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[hsl(43_72%_55%)] mt-0.5">✔</span>
                    <div>
                      <span className="text-white font-bold block uppercase tracking-wider text-[10px]">Prestige Color Grading</span>
                      <span className="text-zinc-500 text-[10px]">Custom-tailored color profiles matching top-tier digital campaigns.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Two Booking Packages Panel - 40% Off Offer */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Single UGC Ad */}
              <div className="bg-zinc-950/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-between gap-6 text-left relative overflow-hidden group hover:border-zinc-800 transition-all">
                <div className="absolute top-0 right-0 px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[7px] font-black uppercase tracking-widest rounded-bl-lg font-mono">
                  Standard Rate
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Standard Single</span>
                  <h3 className="text-xl font-display font-black text-white mt-1">UGC Hero Reel</h3>
                  <p className="text-[10px] text-zinc-500 mt-2 font-mono uppercase tracking-wider leading-relaxed">
                    1 customized high-converting ad, ideal for testing your first concept swap.
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-display font-black text-white">₹5,000</span>
                    <span className="text-[9px] text-zinc-500 block font-mono">fixed price</span>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleWhatsAppRedirect("Hi TV³ Studios,\n\nI want to book the Standard Single UGC Hero Reel (₹5,000). Please share details!");
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-mono text-[9px] uppercase font-bold tracking-widest py-3 px-4 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.05)] hover:shadow-none"
                  >
                    Book Single
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Option 2: 5x UGC growth pack */}
              <div className="bg-zinc-950/60 border border-white/5 p-6 rounded-2xl flex flex-col justify-between gap-6 text-left relative overflow-hidden group hover:border-[hsl(43_72%_55%)]/30 transition-all shadow-[0_0_20px_rgba(212,175,55,0.05)]">
                <div className="absolute top-0 right-0 px-2 py-0.5 bg-emerald-500 text-black text-[7px] font-black uppercase tracking-widest rounded-bl-lg font-mono">
                  BEST VALUE // 40% OFF
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[hsl(43_72%_55%)] block font-bold">Growth Pack</span>
                  <h3 className="text-xl font-display font-black text-white mt-1">5x Scale Campaign</h3>
                  <p className="text-[10px] text-zinc-500 mt-2 font-mono uppercase tracking-wider leading-relaxed">
                    5 dynamic ads with unique hook variations, built to dominate algorithm tests.
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-display font-black text-[hsl(43_72%_55%)]">₹15,000</span>
                    <span className="text-[9px] text-zinc-500 line-through font-mono">₹25,000</span>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleWhatsAppRedirect("Hi TV³ Studios,\n\nI want to book the 5x Scale UGC Campaign Package at the introductory 40% off rate (₹15,000 total / ₹3,000 per reel). Please share details!");
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[hsl(43_72%_55%)] hover:bg-white text-black font-mono text-[9px] uppercase font-bold tracking-widest py-3 px-4 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.15)] hover:shadow-none"
                  >
                    Book Scale Pack
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* POST PRODUCTION SERVICES */}
        <PostProductionSelector />

        <div className="grid gap-12 lg:grid-cols-2 mb-20">

          {/* 1. AUDIO PRODUCTION: THE PIANO UI */}
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative rounded-3xl border border-[hsl(43_72%_55%)]/20 bg-black/50 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_30px_hsla(43,72%,55%,0.05)] overflow-hidden flex flex-col"
          >
            {/* Fluid Waveform Dot Background & Staggered Timing (2s Fade / 3s Appear) */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,20,1)_0%,_rgba(10,10,10,0)_100%)] blur-[40px] opacity-60" />
            <motion.div 
              animate={isAudioProdPlaying ? {
                backgroundPosition: ["0px 0px", "40px 40px", "0px 80px", "0px 0px"],
                opacity: [0, 0, 0.3, 0.3, 0]
              } : { opacity: 0.1 }}
              transition={isAudioProdPlaying ? { 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear",
                times: [0, 0.4, 0.6, 0.9, 1] // 0-2s (40%) is 0, 2-5s (60%) appears
              } : { duration: 1 }}
              className="absolute inset-0 z-0" 
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px'
              }}
            />
            
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] pointer-events-none z-0 transition-colors duration-1000 ${isAudioProdPlaying ? "bg-[hsl(43_72%_55%)]/30" : "bg-[hsl(43_72%_55%)]/10"}`} />
            
            <div className="relative border-4 border-[#111] rounded-2xl bg-[#090909] overflow-hidden mb-6 aspect-[4/3] flex flex-col shadow-[inset_0_0_60px_rgba(0,0,0,1)] z-10">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(43_72%_55%)]/[0.04] to-transparent pointer-events-none z-10" />
               
               <div className="flex-1 flex flex-col p-6 z-20 relative">
                  {/* Playlist Tabs */}
                  <div className="flex gap-4 mb-6 border-b border-white/5 pb-4">
                    <button 
                      onClick={() => { 
                        playConsoleClick();
                        setAudioTab("ai"); 
                        setIsOriginalRecording(false); 
                        setIsOriginalPaused(false);
                      }} 
                      className={`font-mono text-xs uppercase tracking-widest transition-all ${audioTab === "ai" ? "text-[hsl(43_72%_55%)] drop-shadow-[0_0_8px_hsla(43,72%,55%,0.8)]" : "text-zinc-600 hover:text-zinc-400"}`}
                    >
                      AI Songs
                    </button>
                    <button 
                      onClick={() => { 
                        playConsoleClick();
                        setAudioTab("original"); 
                        setIsOriginalPaused(false);
                        if (activeAudioUri) { 
                          window.dispatchEvent(new CustomEvent('stop-all-audio'));
                          setActiveReel(null); 
                          setActiveUgcReel(null); 
                        } 
                      }} 
                      className={`font-mono text-xs uppercase tracking-widest transition-all ${audioTab === "original" ? "text-[hsl(43_72%_55%)] drop-shadow-[0_0_8px_hsla(43_72%_55%,0.8)]" : "text-zinc-600 hover:text-zinc-400"}`}
                    >
                      Originals
                    </button>
                  </div>

                  {/* Playlist Content */}
                  <div className="flex-1 overflow-y-auto pr-1">
                      {audioTab === "original" ? (
                        <div className="flex flex-col h-full items-center justify-center p-6 text-center relative overflow-hidden group">
                          {/* Recording glass refraction aesthetic background */}
                          <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-500 ${isOriginalRecording ? "from-red-500/20" : "from-red-500/5"} via-transparent to-transparent opacity-60 z-0`} />
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent z-0" />
                          
                          {/* Inner reflection glass border */}
                          <div className="absolute inset-4 rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-[2px] pointer-events-none z-10" />

                          <div className="relative z-20 space-y-4">
                            {/* Glowing Red Record Light */}
                            <div className="flex items-center justify-center gap-2">
                              {isOriginalRecording ? (
                                <>
                                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping absolute" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 relative" />
                                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-red-500 font-black animate-pulse">RECORDING ACTIVE</span>
                                </>
                              ) : (
                                <>
                                  <span className="w-2.5 h-2.5 rounded-full bg-red-800/40 relative" />
                                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-655 font-bold">READY TO RECORD</span>
                                </>
                              )}
                            </div>

                            <p className="font-mono text-[10px] uppercase tracking-widest text-[hsl(43_72%_55%)] font-black">
                              Create an Original Song for Yourself
                            </p>

                            <p className="text-zinc-550 font-mono text-[8px] uppercase tracking-widest max-w-[200px] leading-relaxed mx-auto">
                              {isOriginalRecording 
                                ? (isOriginalPaused ? "[ Playback paused. Click PLAY to resume ]" : "[ Recording active. Click PRODUCE below to complete ]")
                                : "[ Premium analog studio pipeline, direct creator alignment ]"
                              }
                            </p>

                            <div className="flex items-center justify-center gap-3 relative z-30">
                              {/* Main Control button (RECORD / PAUSE / PLAY) */}
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  playConsoleClick();
                                  if (!isOriginalRecording) {
                                    // Start session
                                    window.dispatchEvent(new CustomEvent('stop-all-audio'));
                                    setIsOriginalRecording(true);
                                    setIsOriginalPaused(false);
                                  } else {
                                    // Toggle pause/play
                                    setIsOriginalPaused(!isOriginalPaused);
                                  }
                                }}
                                className={`px-8 py-3 font-mono text-[10px] uppercase font-black tracking-[0.3em] rounded-full transition-all duration-300 relative overflow-hidden group-hover:scale-105 ${
                                  isOriginalRecording 
                                    ? "bg-zinc-850 text-red-500 border border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.15)] hover:bg-zinc-800" 
                                    : "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] hover:bg-white hover:text-black hover:shadow-none"
                                }`}
                              >
                                {!isOriginalRecording ? "RECORD" : (isOriginalPaused ? "PLAY" : "PAUSE")}
                              </button>

                              {/* Stop/Reset Session button */}
                              {isOriginalRecording && (
                                <button 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    playConsoleClick();
                                    setIsOriginalRecording(false);
                                    setIsOriginalPaused(false);
                                  }}
                                  className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-white/10 hover:bg-white hover:text-black text-zinc-400 rounded-full transition-colors"
                                  title="Reset Session"
                                >
                                  <div className="w-3.5 h-3.5 bg-current rounded-sm" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                       <div className="space-y-2">
                         {AI_SONGS.map((song) => (
                           <button 
                             key={song.id}
                             onClick={() => {
                               playConsoleClick();
                               toggleAudio(song.id, song.url);
                             }}
                             className={`w-full text-left px-4 py-3 font-mono text-xs uppercase tracking-widest rounded border transition-all flex justify-between items-center ${isAudioPlaying(song.id) ? "bg-[hsl(43_72%_55%)]/10 border-[hsl(43_72%_55%)]/30 text-[hsl(43_72%_55%)]" : "bg-transparent border-transparent text-zinc-500 hover:bg-white/5 hover:text-zinc-300"}`}
                           >
                             <div className="flex items-center gap-3">
                               <Play className={`w-3 h-3 ${isAudioPlaying(song.id) ? "fill-[hsl(43_72%_55%)]" : ""}`} />
                               {song.title}
                             </div>
                             {isAudioPlaying(song.id) && (
                               <div className="flex items-end gap-[2px] h-3">
                                 <motion.div animate={{ height: ["20%", "100%", "40%", "80%"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-[hsl(43_72%_55%)]" />
                                 <motion.div animate={{ height: ["60%", "30%", "100%", "50%"] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-[hsl(43_72%_55%)]" />
                                 <motion.div animate={{ height: ["100%", "20%", "60%", "90%"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-[hsl(43_72%_55%)]" />
                               </div>
                             )}
                           </button>
                         ))}
                       </div>
                     )}
                  </div>
               </div>
            </div>

            {/* FULL WIDTH PIANO KEYBOARD (Bottom Anchored) */}
            <div className="absolute left-0 right-0 bottom-0 h-24 opacity-5 pointer-events-none z-0 flex items-end">
               <div className="flex w-full h-full border-t border-white/20">
                  {[...Array(24)].map((_, i) => (
                     <div key={i} className="flex-1 h-full border-r border-white/20 bg-white/5 relative">
                        {/* Black Keys */}
                        {[1, 2, 4, 5, 6].includes(i % 7) && (
                           <div className="absolute top-0 right-[-25%] w-1/2 h-[60%] bg-zinc-900 border border-white/10 rounded-b-sm z-10" />
                        )}
                     </div>
                  ))}
               </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <h3 className="font-display text-2xl font-bold mb-1">Audio Production</h3>
                <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest leading-0 mb-0">Industry Standard Rendering</p>
                {/* Discrete Production Contact */}
                <a href="tel:+9167467145" className="text-[hsl(43_72%_55%)] font-mono text-[8px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Production Direct Access // Engagement Line</a>
              </div>
              <div className="flex items-center gap-4">
                {/* Recording Indicator */}
                <div className="flex items-center gap-2">
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                  />
                  <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 font-bold">Live</span>
                </div>
                
                <div className="flex gap-2">
                  <a href="tel:+9167467145" className="bg-zinc-900 border border-white/10 text-white p-2 rounded hover:bg-white hover:text-black transition-all">
                    <Play className="w-3 h-3 fill-current rotate-90" />
                  </a>
                  <button 
                    disabled={!(audioTab === "ai" ? (activeAudioUri !== null) : isOriginalRecording)}
                    onClick={(e) => {
                      e.preventDefault();
                      playConsoleClick();
                      if (audioTab === "ai") {
                        setIntakeServiceName("AI Song Production");
                        setIntakeLabel("What style, reference song, or lyrics do you want to use for the AI song?");
                        setIntakePlaceholder("e.g. Synthwave track about digital revolution with melodic vocals...");
                        setIntakeDetails("");
                        setIsOriginalIntake(false);
                        setIsDjIntake(false);
                      } else {
                        setIntakeServiceName("Original Song Production");
                        setIntakeLabel("Song Description (Describe the song theme, message, or reference vibes)");
                        setIntakePlaceholder("e.g. A soulful melody about digital nomads...");
                        setIntakeDetails("");
                        setIsOriginalIntake(true);
                        setIsDjIntake(false);
                      }
                      setShowIntakeModal(true);
                    }}
                    className={
                      (audioTab === "ai" ? (activeAudioUri !== null) : isOriginalRecording)
                        ? "bg-white text-black px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-[hsl(43_72%_55%)] transition-colors inline-block text-center select-none min-w-[100px] shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer"
                        : "bg-zinc-800 text-zinc-500 border border-white/5 opacity-40 px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest inline-block text-center select-none min-w-[100px] cursor-not-allowed"
                    }
                  >
                    PRODUCE
                  </button>
                </div>
              </div>
            </div>
          </motion.div>


          {/* 2. DJ SERVICES: AUTHENTIC GENRE LOGIC */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             whileHover="hover"
             className={`relative rounded-3xl border transition-all duration-700 p-6 md:p-8 overflow-hidden flex flex-col shadow-2xl group ${isDjPlaying ? "bg-[#050510]" : "border-white/5 bg-black"}`}
             style={isDjPlaying ? { borderColor: `${getColorHex(activeDjObj?.color)}80`, boxShadow: `0 0 50px ${getColorHex(activeDjObj?.color)}1a` } : {}}
          >
            {/* Background Piano Key depiction (Architectural fade) */}
            <div className="absolute inset-x-0 bottom-0 h-40 opacity-[0.02] pointer-events-none z-0 flex items-end justify-center px-4">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="flex-1 h-full border-r border-white/20" />
              ))}
            </div>

            {/* The Console Dotted Background - Fades on hover */}
            <motion.div 
              variants={{
                hover: { opacity: 0.08, scale: 1.05 }
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-0 opacity-[0.03]" 
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
                backgroundSize: '20px 20px'
              }}
            />
            
            <div className={`relative border rounded-2xl overflow-hidden mb-6 flex-1 z-10 flex flex-col transition-all duration-700 ${isDjPlaying ? "bg-[#08080f]" : "border-[#222] bg-[#0a0a0a]"}`} 
              style={isDjPlaying ? { borderColor: `${getColorHex(activeDjObj?.color)}4d` } : {}}
            >
              
              {/* Visualizer Display */}
              <div className="h-40 w-full bg-[#050505] border-b border-[#222] flex flex-col items-center justify-center relative shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                 {isDjPlaying && (
                   <motion.div 
                     animate={{ opacity: [0.1, 0.2, 0.1] }} 
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 blur-[60px]" 
                     style={{ backgroundColor: getColorHex(activeDjObj?.color) }} 
                   />
                 )}
                 
                 {/* The Disc */}
                 <motion.div 
                    animate={isDjPlaying ? { rotate: 360, scale: [1, 1.05, 1] } : { rotate: 0 }}
                    transition={isDjPlaying ? { rotate: { duration: 2 / (activeDjObj?.speed || 1), repeat: Infinity, ease: "linear" }, scale: { duration: 0.5 / (activeDjObj?.speed || 1), repeat: Infinity } } : {}}
                    className="relative z-20 mb-4"
                 >
                    <Disc3 className={`w-16 h-16 transition-colors duration-700 ${isDjPlaying ? '' : 'text-zinc-800'}`} 
                      style={isDjPlaying ? { color: getColorHex(activeDjObj?.color), filter: `drop-shadow(0 0 15px ${getColorHex(activeDjObj?.color)}cc)` } : {}}
                    />
                 </motion.div>

                 {/* Digital Frequency Bars - Speed controlled by genre */}
                 <div className="relative z-10 flex gap-[3px] items-end h-8 overflow-hidden">
                   {[...Array(20)].map((_, i) => (
                     <motion.div 
                        key={i} 
                        animate={isDjPlaying ? { 
                          height: [Math.random() * 20 + 20 + "%", Math.random() * 100 + "%", Math.random() * 40 + "%"],
                          opacity: [0.6, 1, 0.8]
                        } : { height: "10%", opacity: 0.2 }} 
                        transition={{ duration: (Math.random() * 0.3 + 0.2) / (activeDjObj?.speed || 1), repeat: Infinity, repeatType: "mirror" }} 
                        className={`w-1.5 rounded-t-sm transition-colors duration-700 ${isDjPlaying ? "" : "bg-zinc-700"}`}
                        style={isDjPlaying ? { backgroundColor: getColorHex(activeDjObj?.color), boxShadow: `0 0 8px ${getColorHex(activeDjObj?.color)}80` } : {}}
                      />
                   ))}
                 </div>
              </div>

              {/* Console Tracks */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#0a0a0a]">
                {DJ_SERVICES.map((dj) => (
                  <button
                    key={dj.id}
                    onClick={() => toggleAudio(dj.id, dj.url)}
                    className={`font-mono text-[10px] uppercase font-bold tracking-widest py-3 px-4 rounded border transition-all text-left flex justify-between items-center ${isAudioPlaying(dj.id) ? "text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "bg-[#111] text-zinc-600 border-[#222] hover:border-[#333] hover:text-zinc-400"}`}
                    style={isAudioPlaying(dj.id) ? { backgroundColor: getColorHex(dj.color), borderColor: '#fff' } : {}}
                  >
                    <div className="flex items-center gap-2">
                       <span className={`w-1 h-1 rounded-full ${isAudioPlaying(dj.id) ? 'bg-white' : 'bg-white/10'}`} />
                       {dj.title}
                    </div>
                    {isAudioPlaying(dj.id) && <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping shadow-[0_0_5px_rgba(255,255,255,1)]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <h3 className={`font-display text-2xl font-bold mb-1 transition-colors duration-700 ${isDjPlaying ? '' : 'text-white'}`}
                  style={isDjPlaying ? { color: getColorHex(activeDjObj?.color) } : {}}
                >
                  DJ Services
                </h3>
                <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest">Active Console State</p>
                <a href="tel:+9167467145" className="text-white/20 font-mono text-[8px] uppercase tracking-widest hover:text-white/50 transition-colors">Production Registry Line</a>
              </div>
              <AnimatePresence>
                {isDjPlaying ? (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      playConsoleClick();
                      setIntakeServiceName(`DJ Service - ${activeDjObj?.title}`);
                      setIntakeLabel("What vibe, energy, or duration are you planning for this DJ set?");
                      setIntakePlaceholder("e.g. 2-hour corporate tech house set, dynamic mixing...");
                      setIntakeDetails("");
                      setIsOriginalIntake(false);
                      setIsDjIntake(true);
                      setShowIntakeModal(true);
                    }}
                    className="text-white px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex-shrink-0 ml-2"
                    style={{ backgroundColor: getColorHex(activeDjObj?.color), border: `1px solid ${getColorHex(activeDjObj?.color)}` }}
                  >
                    Book {activeDjObj?.title.split(' ')[0]}
                  </motion.button>
                ) : (
                  <div className="bg-white/5 border border-white/10 text-zinc-600 px-6 py-2 rounded font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest cursor-not-allowed">
                    Select Genre
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 3. AI VIDEO PRODUCTION: Mobile Reel Format embedded */}
          <motion.div 
             ref={aiVideoContainerRef}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="relative rounded-3xl border border-purple-500/20 bg-[#07050a] p-6 md:p-8 shadow-[0_0_30px_rgba(168,85,247,0.05)] overflow-hidden"
          >
            <div className="flex flex-col mb-6">
              <h3 className="font-display text-2xl font-bold mb-1 text-white">AI Video Production</h3>
              <p className="text-zinc-400 font-body text-[11px] leading-relaxed mb-4">
                This unit is completely dedicated to new creation. Generating the exact art required to serve brands and build digital presence.
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-[9px] font-bold text-purple-400">
                <span className="border border-purple-500/30 bg-purple-500/10 px-2 py-1 rounded">₹500 / Sec Base Rate</span>
                <span className="border border-white/10 bg-white/5 px-2 py-1 rounded text-white">₹3.5K Pack</span>
                <span className="border border-white/10 bg-white/5 px-2 py-1 rounded text-white">₹10K Pack</span>
                <span className="border border-white/10 bg-white/5 px-2 py-1 rounded text-white">₹25K Pack</span>
              </div>
            </div>

            {/* The Integrated Reels Display Gallery */}
            <div className="relative border border-zinc-800 rounded-xl bg-black overflow-hidden mb-6 w-full p-4 flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory min-h-[260px]">
              {REELS_DATA.map((reel) => (
                <div 
                  key={reel.id} 
                  onClick={() => setActiveReel(activeReel === reel.id ? null : reel.id)}
                  className={`relative shrink-0 w-[140px] aspect-[9/16] rounded-md overflow-hidden bg-zinc-900 border transition-all cursor-pointer snap-center group ${activeReel === reel.id ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-white/10 hover:border-white/30'}`}
                >
                   {activeReel === reel.id ? (
                      <div className="w-full h-full pointer-events-none yt-hide-branding">
                         <iframe
                           src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=0&loop=1&playlist=${reel.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                           className="w-full h-full scale-105"
                           allow="autoplay; encrypted-media; fullscreen"
                           allowFullScreen
                         />
                      </div>
                   ) : (
                      <>
                        <img src={reel.image} alt="Reel" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white drop-shadow-md opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all" />
                        <p className="absolute bottom-3 left-3 right-3 font-mono text-[8px] text-white uppercase font-bold tracking-widest truncate">{reel.title}</p>
                      </>
                   )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                 <MonitorPlay className="w-4 h-4 text-purple-400" />
                 <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">Generative Space</span>
              </div>
              <button 
                 onClick={(e) => {
                   e.preventDefault();
                   playConsoleClick();
                   setIntakeServiceName("AI Video Production");
                   setIntakeLabel("Describe the video concept, style, or visual theme you want to create.");
                   setIntakePlaceholder("e.g. Cinematic product showcase with cyber actor swap...");
                   setIntakeDetails("");
                   setIsOriginalIntake(false);
                   setIsDjIntake(false);
                   setShowIntakeModal(true);
                 }}
                 className="text-white hover:text-purple-400 font-mono text-xs uppercase tracking-widest underline underline-offset-4 transition-colors"
               >
                 Book AI Team
               </button>
            </div>
          </motion.div>


          {/* 4. REAL PRODUCTION & OG WRITING (Simplified wrappers for speed) */}
          <div className="lg:col-span-1 space-y-12">
            {/* Real Production */}
            <div className="relative rounded-3xl border border-zinc-800 bg-[#0a0a0a] p-6 md:p-8 overflow-hidden">
              <h3 className="font-display text-2xl font-bold mb-1 text-white">Real Production</h3>
              <p className="text-zinc-400 font-body text-[11px] leading-relaxed mb-6">
                Physical camera, lighting rigs, and crew. Scale depends on product requirements.
              </p>
              <div className="space-y-3 font-mono text-[9px] text-white/40 uppercase tracking-widest">
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Status</span> <span className="text-emerald-400">Active Pipeline</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Niche</span> <span className="text-white">High Budget MV</span></div>
              </div>
            </div>

            {/* OG Writing */}
            <div className="relative rounded-3xl border border-red-500/20 bg-[#0d0707] p-6 md:p-8 overflow-hidden">
              {/* Status indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-red-950/50 border border-red-800/30 px-2 py-0.5 rounded font-mono text-[7px] uppercase tracking-widest text-red-500 font-bold">
                [ Offline ]
              </div>
              
              <h3 className="font-serif italic text-2xl text-zinc-300 mb-4">OG Writer's Room</h3>
              <p className="font-serif text-xs md:text-sm leading-relaxed text-zinc-400 mb-6">
                  Complete Brand Building: A premium multilingual copywriting service specialized in professional English and Hindi narrative architecture. 
              </p>
              <button 
                disabled
                className="bg-zinc-900/50 border border-white/5 px-4 py-3 rounded-lg text-zinc-600 font-mono text-[10px] uppercase font-bold tracking-widest block w-full text-center cursor-not-allowed select-none"
              >
                Unavailable Right Now
              </button>
            </div>
          </div>
        </div>

        {/* Global Hidden Audio Controller */}
        {activeAudioUri && <audio src={activeAudioUri} autoPlay loop className="hidden" />}

        {/* Originals Recording Booth Interactive Audio Zone */}
        <audio 
          ref={recordingAudioRef} 
          src="/assets/original_intake_zone.mp3" 
          loop 
          className="hidden" 
        />

      </div>

      {/* ── SECURE INTAKE GATEWAY MODAL ── */}
      <AnimatePresence>
        {showIntakeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0a0a0a] border border-[hsl(43_72%_55%)]/20 p-6 md:p-8 rounded-2xl relative shadow-2xl text-left"
            >
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => { 
                    setShowIntakeModal(false); 
                    setIsOriginalIntake(false); 
                    setIsOriginalRecording(false); 
                    setIsOriginalPaused(false); 
                    setIsDjIntake(false);
                  }}
                  className="text-zinc-500 hover:text-white transition-colors text-xs font-mono"
                >
                  [ CLOSE ]
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[hsl(43_72%_55%)] block font-bold mb-1">// Intake Verification Gateway</span>
                  <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">{intakeServiceName}</h3>
                  <p className="text-zinc-500 text-[10px] font-mono leading-relaxed mt-1">
                    Please submit your email to authorize SMTP project ticket sync and initiate dual-channel dispatch (Email + WhatsApp).
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 block font-bold">Email Address</label>
                    <input 
                      type="email"
                      value={intakeEmail}
                      onChange={(e) => setIntakeEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors"
                    />
                  </div>

                  {isDjIntake ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {/* Event Date */}
                        <div className="space-y-1">
                          <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 block font-bold">Event Date</label>
                          <input 
                            type="date"
                            value={djDate}
                            onChange={(e) => setDjDate(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-[10px] font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors"
                          />
                        </div>

                        {/* Event Location */}
                        <div className="space-y-1">
                          <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 block font-bold">Event Location</label>
                          <input 
                            type="text"
                            value={djLocation}
                            onChange={(e) => setDjLocation(e.target.value)}
                            placeholder="e.g. Mumbai, Goa..."
                            className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-[10px] font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Detail Input */}
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 block font-bold">{intakeLabel}</label>
                        <textarea 
                          value={intakeDetails}
                          onChange={(e) => setIntakeDetails(e.target.value)}
                          placeholder={intakePlaceholder}
                          rows={3}
                          className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors placeholder:text-zinc-700 resize-none"
                        />
                      </div>
                    </div>
                  ) : isOriginalIntake ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {/* Genre */}
                        <div className="space-y-1">
                          <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 block font-bold">Genre</label>
                          <select 
                            value={originalGenre}
                            onChange={(e) => setOriginalGenre(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-[10px] font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors"
                          >
                            <option value="Bollywood">Bollywood</option>
                            <option value="Pop">Pop</option>
                            <option value="Jazz">Jazz</option>
                            <option value="Qawwali">Qawwali</option>
                            <option value="South Indian">South Indian</option>
                            <option value="Marathi">Marathi</option>
                            <option value="Folk">Folk</option>
                            <option value="Hip-Hop">Hip-Hop</option>
                          </select>
                        </div>

                        {/* Mood */}
                        <div className="space-y-1">
                          <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 block font-bold">Mood / Theme</label>
                          <select 
                            value={originalMood}
                            onChange={(e) => setOriginalMood(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-[10px] font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors"
                          >
                            <option value="Love">Love</option>
                            <option value="Sad">Sad</option>
                            <option value="Fun">Fun</option>
                            <option value="Devotional">Devotional</option>
                            <option value="Energetic">Energetic</option>
                            <option value="Motivational">Motivational</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Song Length */}
                        <div className="space-y-1">
                          <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 block font-bold">Song Length</label>
                          <select 
                            value={originalLength}
                            onChange={(e) => setOriginalLength(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-[10px] font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors"
                          >
                            <option value="Standard (3-4 mins)">Standard (3-4 mins)</option>
                            <option value="Short Jingle (1-2 mins)">Short Jingle (1-2 mins)</option>
                            <option value="Epic Length (5+ mins)">Epic Length (5+ mins)</option>
                          </select>
                        </div>

                        {/* Budget */}
                        <div className="space-y-1">
                          <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 block font-bold">Budget Tier</label>
                          <select 
                            value={originalBudget}
                            onChange={(e) => setOriginalBudget(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-[10px] font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors"
                          >
                            <option value="Minimum (Base Project)">Minimum (Base)</option>
                            <option value="Medium (Premium Production)">Medium (Premium)</option>
                            <option value="Classic Pure Creation">Classic Pure Creation</option>
                          </select>
                        </div>
                      </div>

                      {/* Specific details */}
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 block font-bold">Describe the song & purpose</label>
                        <textarea 
                          value={intakeDetails}
                          onChange={(e) => setIntakeDetails(e.target.value)}
                          placeholder="What do you want to make and why are you making this song?"
                          rows={3}
                          className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors placeholder:text-zinc-700 resize-none"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Detail Input */
                    <div className="space-y-1">
                      <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 block font-bold">{intakeLabel}</label>
                      <textarea 
                        value={intakeDetails}
                        onChange={(e) => setIntakeDetails(e.target.value)}
                        placeholder={intakePlaceholder}
                        rows={4}
                        className="w-full bg-zinc-950 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[hsl(43_72%_55%)]/50 transition-colors placeholder:text-zinc-700 resize-none"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <button 
                    onClick={() => {
                      if (!intakeEmail || !intakeEmail.includes('@') || !intakeEmail.includes('.')) {
                        alert("Please enter a valid email address.");
                        return;
                      }

                      if (isDjIntake && (!djDate || !djLocation)) {
                        alert("Please select a date and location for your event.");
                        return;
                      }

                      let additionalData = "";
                      let isDateUnavailable = false;

                      if (isDjIntake) {
                        additionalData = `\n*DJ Booking Request:*\n- Requested Date: ${djDate}\n- Location: ${djLocation}`;
                        
                        // Parse date to check if it's before August 2026
                        const selectedDate = new Date(djDate);
                        const targetMonth = selectedDate.getMonth(); // 0-indexed (7 = August)
                        const targetYear = selectedDate.getFullYear();
                        
                        // Check if the year is 2026 and month is before August (7), or year is before 2026
                        if (targetYear < 2026 || (targetYear === 2026 && targetMonth < 7)) {
                          isDateUnavailable = true;
                        }
                      } else if (isOriginalIntake) {
                        additionalData = `\n*Audio Originals Options:*\n- Genre: ${originalGenre}\n- Mood/Theme: ${originalMood}\n- Length: ${originalLength}\n- Budget: ${originalBudget}`;
                      }

                      // Dispatch the lead inquiry anyway
                      handleIntakeSubmit(intakeServiceName, intakeEmail, intakeDetails, additionalData);

                      setShowIntakeModal(false);
                      setIsOriginalIntake(false);
                      setIsOriginalRecording(false);
                      setIsOriginalPaused(false);
                      setIsDjIntake(false);

                      if (isDateUnavailable) {
                        setTimeout(() => {
                          alert("Notice: We are currently fully booked for the selected date. Booking queue is only open from August 2026 onwards. However, we have received your inquiry and will reach out if a slot opens up!");
                        }, 1200);
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[hsl(43_72%_55%)] hover:bg-white text-black font-mono text-[9px] uppercase font-bold tracking-widest py-4 px-6 rounded-xl transition-all duration-300"
                  >
                    Authorize Direct Dispatch
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
