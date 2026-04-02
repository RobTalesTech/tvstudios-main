import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, Send } from "lucide-react";

const Station05 = () => {
  return (
    <div className="min-h-screen bg-background pt-32 selection:bg-[hsl(43_72%_55%)] selection:text-black">
      <div className="container px-4 mx-auto max-w-4xl relative z-10">
        
        {/* Navigation / Exit */}
        <div className="mb-12">
          <Link to="/studio-work" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest bg-white/5 px-4 py-2 rounded-md border border-white/10 hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" /> Exit Station
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-20 text-balance">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 bg-[hsl(43_72%_55%)]/10 text-[hsl(43_72%_55%)] border border-[hsl(43_72%_55%)]/30 px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[hsl(43_72%_55%)] animate-[pulse_1.5s_ease-in-out_infinite]" />
            Elite Intake
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-8 text-white">
            Partner with the <span className="text-[hsl(43_72%_55%)] italic font-serif lowercase">Empire</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We're not here for clients — we're creating unique concepts with high technical knowledge and powerful media research. Fill this form and we'll discuss your funding, timeline, and vision over email.
          </p>
        </div>

        {/* The Partnership Form */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-card/30 border border-[hsl(43_72%_55%)]/20 p-8 md:p-12 text-left rounded-3xl backdrop-blur-md relative overflow-hidden mb-32"
        >
          <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          
          <form className="relative z-10 flex flex-col gap-6" onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const fd = new FormData(form);
            const name = fd.get("name") as string || "";
            const email = fd.get("email") as string || "";
            const brand = fd.get("brand") as string || "";
            const interest = fd.get("interest") as string || "";
            const funding = fd.get("funding") as string || "";
            const vision = fd.get("vision") as string || "";
            const parts = ["Partnership Inquiry — TV Studios Station 05", "", "Name: " + name, "Email: " + email];
            if (brand) parts.push("Brand: " + brand);
            if (interest) parts.push("Interest: " + interest);
            if (funding) parts.push("Funding: " + funding);
            if (vision) parts.push("Vision: " + vision);
            window.open("https://wa.me/918149981660?text=" + encodeURIComponent(parts.join("\n")), "_blank");
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-mono uppercase tracking-[0.2em] text-[hsl(43_72%_55%)] font-bold">Your name *</label>
                 <input name="name" type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-4 text-white focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors" placeholder="John Doe" required />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-mono uppercase tracking-[0.2em] text-[hsl(43_72%_55%)] font-bold">Your email *</label>
                 <input name="email" type="email" className="w-full bg-black/50 border border-white/10 rounded-md p-4 text-white focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors" placeholder="john@brand.com" required />
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/60">Brand / Organization name</label>
               <input name="brand" type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-4 text-white focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors" placeholder="Global Corp Ltd." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-mono uppercase tracking-[0.2em] text-[hsl(43_72%_55%)] font-bold">What interests you? *</label>
                 <select name="interest" className="w-full bg-black/50 border border-white/10 rounded-md p-4 text-white focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors appearance-none" required>
                    <option value="" disabled selected>Select an option...</option>
                    <option value="webshow">High-End Webshows</option>
                    <option value="music_video">Viral Music Videos</option>
                    <option value="branding">Complete Branding / Advertisements</option>
                    <option value="ai_production">AI Audio/Visual Synthesis</option>
                 </select>
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/60">Approximate funding range (optional)</label>
                 <input name="funding" type="text" className="w-full bg-black/50 border border-white/10 rounded-md p-4 text-white focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors" placeholder="e.g. $10,000 - $50,000" />
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/60">Tell us about your vision...</label>
               <textarea name="vision" className="w-full bg-black/50 border border-white/10 rounded-md p-4 text-white focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors min-h-[150px] resize-y" placeholder="What are you trying to build or support?" />
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-6">
               <button type="submit" className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[hsl(43_72%_55%)] text-black px-12 py-5 rounded-sm font-mono text-xs uppercase font-bold tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_30px_rgba(255,180,0,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                 <Send className="w-4 h-4" /> Submit Partnership Inquiry
               </button>
               <p className="text-xs font-mono text-white/40 uppercase tracking-widest text-center">
                 We'll respond via email within 48 hours to discuss production timelines and funding details.
               </p>
            </div>
          </form>

        </motion.div>

      </div>

      <Footer />
    </div>
  );
};

export default Station05;
