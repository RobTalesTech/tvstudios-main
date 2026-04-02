import { useState } from "react";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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
      description: "Establishing your brand's voice and core ideological message.",
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

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Visual Production");

  return (
    <div className="min-h-screen bg-background pt-20 selection:bg-[hsl(43_72%_55%)] selection:text-black">
      <ServicesSection />

      <section className="py-24 md:py-32 bg-[#020202] relative border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "48px 48px" }} />
        
        <div className="container px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[hsl(43_72%_55%)] mb-4">Service Tiers</p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display text-white tracking-tight mb-6">
              Structured <span className="italic text-white/50">Packages</span>
            </h2>
            <p className="font-body text-xs md:text-sm uppercase tracking-widest text-white/40 max-w-md mx-auto">
              Select a discipline below to view our systematic approaches to creative monopoly.
            </p>
          </div>
          
          {/* Categories Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {(["Visual Production", "Video Production", "Copywriting"] as Category[]).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full sm:w-auto px-8 py-4 rounded-md text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] transition-all duration-500 border ${
                  activeCategory === cat 
                    ? 'text-black bg-white border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'text-white/50 bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Packages Grid display */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
            >
              {servicesData[activeCategory].map((pkg, i) => (
                <div key={i} className={`relative flex flex-col p-8 md:p-10 rounded-xl border transition-all duration-500 hover:-translate-y-1 ${
                  pkg.featured 
                    ? 'border-[hsl(43_72%_55%)]/40 bg-[hsl(43_72%_55%)]/5 shadow-[0_0_40px_rgba(255,180,0,0.05)]' 
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                } backdrop-blur-md`}>
                  {pkg.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[hsl(43_72%_55%)] text-black text-[9px] uppercase font-bold tracking-[0.2em] rounded-sm">
                        Recommended
                    </div>
                  )}
                  
                  <h3 className="text-2xl lg:text-3xl font-display text-white mb-4 tracking-wide">{pkg.name}</h3>
                  <p className="text-sm text-white/50 mb-8 font-body leading-relaxed h-[60px]">{pkg.description}</p>
                  
                  <div className="mb-10 flex items-baseline gap-2">
                      <span className="text-4xl lg:text-5xl font-display text-white">{pkg.price}</span>
                      {pkg.price !== "Custom" && <span className="text-xs uppercase font-mono tracking-widest text-white/40">/ Starting</span>}
                  </div>

                  <div className="flex-1 flex flex-col gap-5 mb-10">
                    {pkg.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-4">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.featured ? 'text-[hsl(43_72%_55%)]' : 'text-white/30'}`} />
                          <span className="text-sm font-body text-white/80 leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/918149981660?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.name} package (${pkg.price}). Let's discuss.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-4 rounded-sm font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-300 text-center ${
                    pkg.featured 
                      ? 'bg-[hsl(43_72%_55%)] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                      : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white hover:text-black hover:border-white'
                  }`}>
                    Select {pkg.name.split(' ')[0]}
                  </a>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
