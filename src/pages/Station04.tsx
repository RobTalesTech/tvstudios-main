import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, Film, Music, Tv, BookOpen } from "lucide-react";

const sponsorships = [
  {
    icon: Music,
    title: "Music Video Sponsorship",
    desc: "Fund upcoming rare-niche music videos from our independent label. Your brand logo placed in production — directly in the brand list of a global-standard release.",
    tag: "Now Accepting",
  },
  {
    icon: BookOpen,
    title: "Documentary Funding",
    desc: "Back documentaries that tell real stories. Your brand becomes a patron of authentic narratives — not ads, but cultural artifacts with your name on them.",
    tag: "Open for Partners",
  },
  {
    icon: Tv,
    title: "Show Sponsorship",
    desc: "Be the presenting sponsor of original shows we're producing. Support stories you believe in, show the right CRs, and let your brand stand for something meaningful.",
    tag: "Limited Slots",
  },
  {
    icon: Film,
    title: "Brand Film Collaboration",
    desc: "Commission a cinematic brand film — not a marketing video, but a piece of art that represents your brand's philosophy and vision to the world.",
    tag: "Always Open",
  },
];

const Station04 = () => {
  return (
    <div className="min-h-screen bg-background pt-32 selection:bg-purple-500/30 selection:text-white">
      <div className="container px-4 mx-auto max-w-5xl relative z-10">
        
        {/* Navigation / Exit */}
        <div className="mb-12">
          <Link to="/studio-work" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest bg-white/5 px-4 py-2 rounded-md border border-white/10 hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" /> Exit TvUnit
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/30 px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
            Active Pipeline Showcase
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-8 text-white">
            Branding & <span className="text-purple-400 italic font-serif lowercase">Advertisements</span>
          </h1>
          <p className="mb-6 font-body text-xs md:text-sm uppercase tracking-[0.2em] text-purple-400 border-l border-purple-500 pl-4 mx-auto max-w-max">Fund · Sponsor · Become Part of the Story</p>
        </div>

        {/* Sponsorship Opportunities (Directly From Empire Section) */}
        <div className="mb-32">
          <div className="grid gap-6 md:grid-cols-2">
            {sponsorships.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-white/10 bg-card/20 backdrop-blur-md p-8 md:p-10 transition-all hover:border-purple-500/30 hover:bg-purple-500/5 shadow-[0_0_30px_rgba(168,85,247,0)] hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <s.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                    {s.tag}
                  </span>
                </div>
                <h4 className="font-display text-2xl mb-4 text-white">{s.title}</h4>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Station04;
