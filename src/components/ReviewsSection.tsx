import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Film, Music, Tv, BookOpen, ArrowRight, Send, Shield, GraduationCap, Globe } from "lucide-react";
import BrandBuildBrands from "./BrandBuildBrands";
import laginBiginPoster from "@/assets/lagin-bigin-poster.jpg";

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

const studioUpdates = [
  "🎵 Independent music label in development — global-first, emotion-driven releases",
  "🎬 Documentary series under pre-production — seeking funding partners",
  "📡 Technical infrastructure upgrade — academic-grade production pipeline",
  "🌍 Music video under production — brand sponsorship slots now open",
];

const BrandEmpireSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", org: "", interest: "", budget: "", note: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.interest) {
      setSubmitted(true);
    }
  };

  return (
    <section id="brand-empire" className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">

        {/* Header — Manifesto */}
        <div className="mb-16 text-center">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">The Floor Plan</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
            The Branding <span className="text-gradient-gold">Empire (AI)</span>
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            Founded by an engineer with 14 years of cinematic filmmaking experience, TV³ Studios is built for the coming era of digital content. We are pioneering a new global standard: authentic AI Filmmaking. When the world looks for the absolute best in AI video production, our deep roots in real filmmaking make us the unquestionable authority in this category. We leverage this technology to fund, scale, and execute epic, high-budget productions—partnering with visionary brands to treat content not as mere marketing, but as a monumental cultural investment.
          </p>
        </div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 rounded-2xl border border-primary/20 bg-card p-6 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative">
            <Sparkles className="h-5 w-5 text-primary mx-auto mb-4" />
            <p className="font-display text-lg md:text-xl italic leading-relaxed text-foreground max-w-3xl mx-auto">
              "Companies invest daily money on marketing material — but a brand doesn't need marketing.
              A brand shows its interest in Art and enjoys the process of creation.
              They serve delight."
            </p>
            <p className="mt-4 font-body text-xs uppercase tracking-[0.2em] text-primary">— TV³ Studios Philosophy</p>
          </div>
        </motion.div>

        {/* What We Stand For */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: "Academic Foundation", desc: "High technical knowledge from academic backgrounds that the industry and art institutions lack — not surface-level social media wisdom." },
            { icon: Shield, title: "Powerful Media Research", desc: "Every decision backed by real media research — not fake social media metrics, but deep understanding of audience, culture, and communication." },
            { icon: Globe, title: "Global-First Vision", desc: "Building a music label not just for India but for the globe — where people's emotions make the decision, powered by the coming technical shift." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <item.icon className="h-5 w-5 text-primary mb-3" />
              <h4 className="font-display text-base mb-2">{item.title}</h4>
              <p className="font-body text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Branding Bomb Attack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <p className="mb-2 font-body text-[10px] uppercase tracking-[0.3em] text-primary animate-pulse">
              🔴 Live Campaign
            </p>
            <h3 className="font-display text-2xl md:text-4xl">
              The Branding <span className="text-gradient-gold">Bomb Attack</span>
            </h3>
            <p className="mt-3 font-body text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              230 Million – 333 Million people in the direct impact zone. The first brand campaign of TV³ Studios
              targeting a specific cultural region with sure-shot results. This is just the beginning.
            </p>
          </div>

          {/* Big Horizontal TV Frame */}
          <div className="relative bg-secondary p-2 md:p-3 rounded-2xl border border-border">
            <div className="relative rounded-xl border-2 border-muted bg-background overflow-hidden">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent pointer-events-none z-10" />
              {/* Corner reflections */}
              <div className="absolute top-0 left-0 w-1/3 h-1/4 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none z-10" />
              {/* Poster */}
              <img
                src={laginBiginPoster}
                alt="LAGIN BIGIN - Khandeshi Musical Album Series | First Brand Campaign by TV³ Studios"
                className="w-full object-cover"
              />
            </div>
            {/* TV Stand */}
            <div className="flex justify-center mt-2 gap-1.5">
              <div className="h-1 w-6 rounded-full bg-muted-foreground/30" />
              <div className="h-1 w-6 rounded-full bg-primary/50" />
              <div className="h-1 w-6 rounded-full bg-muted-foreground/30" />
            </div>
          </div>

          {/* Campaign Stats */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 text-center">
            {[
              { stat: "230M – 333M", label: "Potential Reach" },
              { stat: "Project LAGIN BIGIN", label: "First Campaign" },
              { stat: "Khandesh · Gujarat · MP", label: "Cultural Impact Zone" },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4">
                <p className="font-display text-sm md:text-base text-primary">{item.stat}</p>
                <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <a
              href="#brand-empire-form"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-body text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              <Tv className="h-4 w-4" />
              Be the Best Brand of TV
            </a>
            <p className="mt-3 font-body text-[10px] text-muted-foreground">
              Title Sponsor slots open — your logo on the biggest cultural campaign of the year
            </p>
          </div>
        </motion.div>

        {/* Sponsorship Opportunities */}
        <div className="mb-16">
          <p className="mb-6 font-body text-xs uppercase tracking-[0.2em] text-primary">Fund · Sponsor · Become Part of the Story</p>
          <div className="grid gap-6 md:grid-cols-2">
            {sponsorships.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <s.icon className="h-5 w-5 text-primary" />
                  <span className="font-body text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {s.tag}
                  </span>
                </div>
                <h4 className="font-display text-lg mb-2">{s.title}</h4>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Brand Build Brands */}
        <BrandBuildBrands />

        {/* Studio Updates Ticker */}
        <div className="mb-16 rounded-xl border border-border bg-card p-6">
          <h4 className="font-display text-sm mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Studio Updates
          </h4>
          <div className="space-y-3">
            {studioUpdates.map((update, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-3"
              >
                <ArrowRight className="h-3 w-3 text-primary flex-shrink-0" />
                <p className="font-body text-xs text-secondary-foreground">{update}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partnership Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="brand-empire-form"
          className="rounded-2xl border border-border bg-card p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl md:text-3xl">
              Partner with the <span className="text-gradient-gold">Empire</span>
            </h3>
            <p className="mt-2 font-body text-sm text-muted-foreground max-w-xl mx-auto">
              We're not here for clients — we're creating unique concepts with high technical knowledge
              and powerful media research. Fill this form and we'll discuss your funding, timeline, and vision over email.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name *"
                  required
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your email *"
                  required
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <input
                type="text"
                value={formData.org}
                onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                placeholder="Brand / Organization name"
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <select
                value={formData.interest}
                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                required
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 font-body text-sm text-foreground focus:border-primary focus:outline-none appearance-none"
              >
                <option value="" disabled>What interests you? *</option>
                <option value="music-video">Music Video Sponsorship</option>
                <option value="documentary">Documentary Funding</option>
                <option value="show-sponsor">Show Sponsorship</option>
                <option value="brand-film">Brand Film Collaboration</option>
                <option value="general">General Partnership</option>
              </select>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="Approximate funding range (optional)"
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Tell us about your vision or what you'd like to support..."
                rows={3}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-medium text-primary-foreground transition-all hover:brightness-110 flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Submit Partnership Inquiry
              </button>
              <p className="text-center font-body text-[10px] text-muted-foreground">
                We'll respond via email within 48 hours to discuss production timelines and funding details.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-8"
            >
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-display text-xl mb-2">Welcome to the Vision</h4>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Your inquiry has been received. We'll be reaching out via email to discuss
                your interest, funding scope, and how we can build something extraordinary together.
              </p>
              <p className="mt-4 font-body text-xs text-primary italic">
                "The best brands don't market — they create."
              </p>
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default BrandEmpireSection;
