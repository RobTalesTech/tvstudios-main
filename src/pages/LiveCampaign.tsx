import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft, Target, Globe, Music2, BrainCircuit, Activity, MonitorPlay, Mic2 } from "lucide-react";
import llbp2 from "@/assets/LLBP2.jpg";
import llbp1 from "@/assets/LLBP1.png";
import { useState } from "react";

/* ─── Audition Block ─────────────────────────────────────── */
const AuditionBlock = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "Singer", link: "", note: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `🎤 AUDITION — LAGIN BIGIN\n\nName: ${form.name}\nRole: ${form.role}\nProfile/Link: ${form.link}\nNote: ${form.note}`;
    window.open(`https://wa.me/918149981660?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <div className="mb-24">
      <div className="border border-white/10 rounded-2xl p-8 bg-black/20 text-center">
        <Mic2 className="w-8 h-8 text-blue-500/60 mx-auto mb-4" />
        <h3 className="text-xl font-black uppercase tracking-wider text-white mb-2">Open Auditions</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
          Singers, regional artists, and performers — if you feel the music, reach out. We want raw regional voices.
        </p>

        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-8 py-3 rounded-md font-mono text-xs uppercase tracking-widest hover:bg-blue-500/20 transition-all"
          >
            <Mic2 className="w-4 h-4" /> Submit Your Profile
          </button>
        ) : sent ? (
          <div className="text-green-400 font-mono text-sm uppercase tracking-widest">
            ✓ Received. We will be in touch.
          </div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-4 text-left"
          >
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">Your Name</label>
              <input
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">I Am A</label>
              <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
              >
                <option value="Singer" className="bg-black">Singer</option>
                <option value="Musician / Instrumentalist" className="bg-black">Musician / Instrumentalist</option>
                <option value="Visual Artist" className="bg-black">Visual Artist</option>
                <option value="Dancer / Performer" className="bg-black">Dancer / Performer</option>
                <option value="Other" className="bg-black">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">Profile / Work Link</label>
              <input
                required
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
                placeholder="Instagram, YouTube, SoundCloud, etc."
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">One Thing We Should Know</label>
              <textarea
                value={form.note}
                onChange={e => setForm({ ...form, note: e.target.value })}
                placeholder="Keep it real. What makes you different?"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-black font-mono text-xs uppercase font-bold tracking-widest py-3 rounded-md hover:bg-white transition-all"
              >
                Send via WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-3 border border-white/10 rounded-md text-white/30 hover:text-white hover:border-white/30 transition-all font-mono text-xs"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
};

const LiveCampaign = () => {
  return (
    <div className="min-h-screen bg-background pt-32 selection:bg-blue-500/30 selection:text-white">
      <div className="container px-4 mx-auto max-w-5xl relative z-10">

        {/* Navigation / Exit */}
        <div className="mb-12">
          <Link to="/studio-work" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest bg-white/5 px-4 py-2 rounded-md border border-white/10 hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" /> Exit TvUnit
          </Link>
        </div>

        {/* ─── 1. PROJECT HEADER ─────────────────────────────── */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[hsl(43_72%_55%)]/10 text-[hsl(43_72%_55%)] border border-[hsl(43_72%_55%)]/30 px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[hsl(43_72%_55%)] animate-pulse" />
            🔴 Digital Channel Live — TV KHANDESHI
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight mb-6">
            TV <span className="text-[hsl(43_72%_55%)] italic font-serif lowercase">Khandeshi</span>
          </h1>
          
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 border-l-2 border-[hsl(43_72%_55%)]/30 pl-6">
            Starting as a powerful YouTube node, <strong>TV Khandeshi</strong> is our dedicated regional broadcast channel. We are channelizing the growing market through dialectical data and cinematic authority.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://youtube.com/@TVKhandeshi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[hsl(43_72%_55%)] text-black px-8 py-4 rounded-xl font-mono text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <MonitorPlay className="w-4 h-4" />
              Open Digital Channel
            </a>
            <div className="font-mono text-[9px] uppercase tracking-widest text-white/30 italic">
              *Watch the creative world already running
            </div>
          </div>
        </div>

        {/* ─── 1.1 LAGIN BIGIN PROJECT ─────────────────────── */}
        <div className="text-center mb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-blue-500 mb-4">Flagship Series</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
            LAGIN BIGIN — <span className="text-blue-500 italic font-serif lowercase">Special Series</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Our upcoming musical album series dropped specifically to bring extreme newness to the Khandesh dialect market. This is the first "Branding Bomb" from TV Khandeshi.
          </p>
        </div>

        {/* ─── 2. LLBP2 — VERTICAL POSTER (FULL WIDTH) ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20 max-w-xl mx-auto"
          id="campaign-poster"
        >
          <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.12)] bg-black">
            <img
              src={llbp2}
              alt="LAGIN BIGIN — Official Poster"
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* ─── 3. BRANDING BOMB ─────────────────────────────── */}
        <div className="text-center mb-20 px-4 py-14 rounded-3xl bg-blue-500/[0.02] border border-blue-500/10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-red-400/5 text-red-400 border border-red-400/20 px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-[0.2em] mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Live Campaign Launch
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
            The Branding{" "}
            <span className="text-blue-500 italic font-serif lowercase">Bomb Attack</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            230 Million – 333 Million people in the direct impact zone. The first brand campaign of TV Studios targeting a specific cultural region with sure-shot results. This is just the beginning.
          </p>
        </div>

        {/* ─── 4. LLBP1 — HORIZONTAL POSTER (SINGLE) ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.1)] bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none z-10" />
            <img
              src={llbp1}
              alt="LAGIN BIGIN — Campaign Poster"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* ─── 4.1 CHANNEL AUTHORITY ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="border border-white/10 rounded-2xl p-8 bg-blue-500/[0.03] flex flex-col justify-center">
            <h3 className="text-xl font-display text-white uppercase tracking-wider mb-4 flex items-center gap-3">
              <BrainCircuit className="text-blue-500 w-5 h-5" /> Dialectical Data Strategy
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              We aren't just making content; we are mapping cultural resonance. Our research shows a massive void in high-production Khandeshi content. <strong>TV Khandeshi</strong> fills this gap using dialectical data to ensure every word, beat, and visual frame hits the native pulse of the region.
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              <div className="text-center flex-1">
                <p className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Market Size</p>
                <p className="text-xl font-display text-white mt-1">20M+</p>
              </div>
              <div className="w-px h-10 bg-white/5" />
              <div className="text-center flex-1">
                <p className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Direct Impact</p>
                <p className="text-xl font-display text-white mt-1">Sure-Shot</p>
              </div>
            </div>
          </div>
          
          <div className="border border-white/10 rounded-2xl p-8 bg-[hsl(43_72%_55%)]/[0.02] flex flex-col justify-center">
            <h3 className="text-xl font-display text-white uppercase tracking-wider mb-4 flex items-center gap-3">
              <MonitorPlay className="text-[hsl(43_72%_55%)] w-5 h-5" /> Digital-First Broadcasting
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Traditional TV is slow. YouTube is immediate. We are merging cinematic authority with digital speed to build a 24/7 cultural terminal. People don't just "follow" TV Khandeshi — they belong to it. We are just trying to serve the region with our creativity for the section of people of our region.
            </p>
            <div className="pt-4 border-t border-white/5">
              <p className="font-mono text-[9px] uppercase tracking-widest text-[hsl(43_72%_55%)] font-bold">
                *Establishing Trust through Creative Newness
              </p>
            </div>
          </div>
        </div>

        {/* ─── 5. UPDATES, MAKING & PROGRESS ──────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">
              Updates, Making <span className="text-blue-500">&</span> Progress
            </h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </div>

        {/* ─── 6. SYNDICATE + PRODUCTION STATUS ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32">

          {/* The Syndicate */}
          <div className="border border-white/10 rounded-2xl p-8 bg-black/20">
            <div className="flex items-center gap-3 mb-8">
              <Globe className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-display text-white uppercase tracking-wider">The Syndicate</h3>
            </div>
            <ul className="space-y-5 font-mono text-xs md:text-sm text-white/70 uppercase tracking-widest">
              <li className="flex justify-between border-b border-white/5 pb-3">
                <span>Music Producers</span> <span className="text-blue-400">Khandesh</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-3">
                <span>Mixing & Mastering</span> <span className="text-blue-400">Mumbai</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-3">
                <span>Studio Association</span> <span className="text-blue-400">Mumbai</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-3">
                <span>Marketing Team & EP</span> <span className="text-blue-400">Pune</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-3">
                <span>Releasing Team</span> <span className="text-blue-400">Pune / Jalgaon / Shirpur</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-3">
                <span>Production Team</span> <span className="text-blue-400">Nagpur , Indore</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-3">
                <span>Singers</span> <span className="text-blue-400">Regional Voices</span>
              </li>
            </ul>
          </div>

          {/* Production Status */}
          <div className="border border-white/10 rounded-2xl p-8 bg-black/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.06]">
              <Activity className="w-32 h-32" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-display text-white uppercase tracking-wider inline-flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Production Status
                </h3>
                <span className="font-mono text-xs font-black text-green-500 border border-green-500/30 px-2 py-1 rounded">LIVE</span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-8">
                Initiated: <span className="text-white/60">14 March 2026</span>
              </p>

              <div className="space-y-8 font-mono text-xs tracking-wide">

                {/* ── AUDIO UPDATE ── */}
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-blue-400/70 font-bold mb-4 border-b border-white/5 pb-2">🎵 Audio Update</p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1.5 text-white/60">
                        <span>Song 01 <span className="text-white/25">[Title Track]</span></span>
                        <span className="text-green-400 font-bold">09%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[9%] animate-pulse rounded-full" />
                      </div>
                      <p className="text-[9px] text-white/20 mt-1 uppercase">Core Arrangement / Mix Block</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5 text-white/60">
                        <span>Song 02</span>
                        <span className="text-blue-400 font-bold">18%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[18%] animate-pulse rounded-full" />
                      </div>
                      <p className="text-[9px] text-white/20 mt-1 uppercase">Scratch Vocals / Initial Composition</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5 text-white/60">
                        <span>Song 03</span>
                        <span className="text-yellow-400 font-bold">12%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 w-[12%] animate-pulse rounded-full" />
                      </div>
                      <p className="text-[9px] text-white/20 mt-1 uppercase">Beat Programming / Theme Draft</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5 text-white/60">
                        <span>Song 04</span>
                        <span className="text-orange-400 font-bold">6%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[6%] animate-pulse rounded-full" />
                      </div>
                      <p className="text-[9px] text-white/20 mt-1 uppercase">Concept Mapping / Lyric Block</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5 text-white/60">
                        <span>Song 05</span>
                        <span className="text-white/30 font-bold">3%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-white/20 w-[3%] animate-pulse rounded-full" />
                      </div>
                      <p className="text-[9px] text-white/20 mt-1 uppercase">Ideation / Pre-Writing Phase</p>
                    </div>
                  </div>
                </div>

                {/* ── VIDEO UPDATES ── */}
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-purple-400/70 font-bold mb-4 border-b border-white/5 pb-2">🎬 Video Updates</p>
                  <div className="flex justify-between mb-1.5 text-white/60">
                    <span>Visual Production</span>
                    <span className="text-purple-400 font-bold">50%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[50%] animate-pulse rounded-full" />
                  </div>
                  <p className="text-[9px] text-white/20 mt-1 uppercase">AI Visual Pipeline / Shot Planning</p>
                </div>

                {/* ── TECHNICAL COLLABORATIONS ── */}
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-yellow-400/70 font-bold mb-4 border-b border-white/5 pb-2">⚙️ Technical Collaborations</p>
                  <div className="flex justify-between mb-1.5 text-white/60">
                    <span>Studio & Mix Partnerships</span>
                    <span className="text-yellow-400 font-bold">30%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-[30%] animate-pulse rounded-full" />
                  </div>
                  <p className="text-[9px] text-white/20 mt-1 uppercase">Association Confirmed / Onboarding</p>
                </div>

                {/* ── PRE-PRODUCTION ── */}
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-bold mb-4 border-b border-white/5 pb-2">📋 Pre-Production</p>
                  <div className="flex justify-between mb-1.5 text-white/60">
                    <span>Overall Planning Load</span>
                    <span className="text-white/50 font-bold">30%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-white/30 w-[30%] animate-pulse rounded-full" />
                  </div>
                  <p className="text-[9px] text-white/20 mt-1 uppercase">Scripting / Scheduling / Logistics</p>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ─── AUDITION ─────────────────────────────────────── */}
        <AuditionBlock />

        {/* ─── 7. WHY THE HIT IS SURE ──────────────────────────── */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Why The Hit is{" "}
              <span className="text-blue-500 italic lowercase font-serif">Sure</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Audio Power */}
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
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                Before theaters and visual mediums, audio remains more powerful than visuals. It fuels the most independent industry globally. Over 3 years of deep research proves this region's talent is hitting the prime market in Maharashtrian viewership.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                We are technically upgrading the Khandeshi beat. Bringing extreme newness. Everyone has a cell to make music; the youth can do magic. We are creating a drastic current by taking this raw power further forward into a monumental fusion.
              </p>
            </div>

            {/* AI Visual Power */}
            <div className="border border-white/10 rounded-2xl p-8 md:p-12 bg-card/20 backdrop-blur-md">
              <div className="flex items-center justify-center h-24 mb-8">
                <BrainCircuit className="w-16 h-16 text-purple-500/50 animate-[pulse_3s_ease-in-out_infinite]" />
              </div>
              <h3 className="text-2xl font-display text-white mb-4 flex items-center gap-3">
                <MonitorPlay className="text-purple-500 w-6 h-6" /> Synthetic Cinematic Execution
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                Top production value generated through advanced AI. We are establishing a traditional, realistic representation of the people and culture wrapped in the absolute best cinematic experience available.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Due to our AI pipeline, this project draws direct visual comparisons to massive, crore-budget music videos built for viral dance entertainment. <strong>Virality has crossed language and cultural barriers.</strong> By utilizing the best regional slangs and native connectivity, the hit is mathematically inevitable.
              </p>
            </div>
          </div>
        </div>

        {/* ─── 8. COLLABORATE & SPONSORS ───────────────────────── */}
        <div className="text-center pb-32">
          <Target className="w-12 h-12 text-blue-500/30 mx-auto mb-6" />
          <p className="text-blue-500 font-mono text-[10px] uppercase font-bold tracking-[0.3em] mb-4">
            Direct Live Impact
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-white mb-3 font-black uppercase tracking-tight">
            Collaborate and Sponsors Platform
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-10 font-mono">
            Partner directly with a live production. Your brand, embedded in the cultural fabric of 230M+ people.
          </p>
          <Link
            to="/unit/05"
            className="inline-flex items-center gap-3 bg-blue-500 text-black px-12 py-5 rounded-md font-mono text-xs uppercase font-bold tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
          >
            Be the best brand of Channel
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default LiveCampaign;
