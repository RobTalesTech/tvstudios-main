import { motion } from "framer-motion";
import TeamSection from "@/components/TeamSection";
import AboutContact from "@/components/AboutContact";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Sparkles, User } from "lucide-react";
import FounderStory from "./FounderStory";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const TeamContact = () => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem("tv3_founder_unlocked") === "true";
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const blockedDomains = [
    'tempmail', '10minutemail', 'mailinator', 'yopmail', 'dispostable', 
    'sharklasers', 'guerrillamail', 'getairmail', 'burnermail', 'trashmail', 
    'fakeinbox', 'temp-mail', 'tempmailaddress', 'fake', 'mailnesia', 
    'maildrop', 'mintemail', 'discardmail', 'spambox'
  ];

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      alert("Please enter a valid name and email address.");
      return;
    }

    const emailDomain = email.split('@')[1]?.toLowerCase() || '';
    const isDisposable = blockedDomains.some(domain => emailDomain.includes(domain));
    if (isDisposable) {
      alert("Temporary or disposable email addresses are not allowed. Please enter your real work or personal email address.");
      return;
    }

    setIsSubmitting(true);

    const leadId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const payload = {
      id: leadId,
      category: "Founder Wiki Access",
      email: email,
      score: "Wiki",
      notes: `Unlocked Founder Story. Client Name: ${name}`,
      fader_breakdown: `Name: ${name} | Email: ${email}`,
      timestamp: new Date().toISOString()
    };

    try {
      if (supabase) {
        await supabase.from('tv3_service_leads').insert([payload]);
      }
    } catch (err) {
      console.error("Supabase insert lead error:", err);
    }

    // LocalStorage fallback
    try {
      const existing = localStorage.getItem("tv3_service_leads");
      const list = existing ? JSON.parse(existing) : [];
      list.push(payload);
      localStorage.setItem("tv3_service_leads", JSON.stringify(list));
    } catch (err) {
      console.error("Localstorage lead write error:", err);
    }

    // Trigger a silent admin notification email
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'tv3studios@gmail.com',
          replyTo: email,
          subject: `[Lead Alert] Founder Story Unlocked by ${name}`,
          body: `Founder Story Wiki Access Granted\n---------------------\nName: ${name}\nEmail: ${email}\nLead ID: ${leadId}\nTimestamp: ${new Date().toISOString()}\n---------------------\nRegistered in TV³ database.`
        })
      });
    } catch (emailErr) {
      console.error("Email alert failed:", emailErr);
    }

    localStorage.setItem("tv3_founder_unlocked", "true");
    setIsUnlocked(true);
    setIsSubmitting(false);
  };
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Background aesthetics */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none -z-10" />

      {/* Founder Story & Profile */}
      <AboutContact />
      
      {/* Embedded Team Section from earlier */}
      <TeamSection />

      <div className="line-thin mx-auto max-w-4xl" />

      {/* Founder Story Wiki Gated Section */}
      <section className="py-16 relative">
        <div className="container px-4 mx-auto max-w-6xl">
          {isUnlocked ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <FounderStory />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/25 backdrop-blur-md border border-white/5 rounded-3xl p-8 max-w-md mx-auto text-center space-y-6 shadow-2xl relative"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[hsl(43_72%_55%)] font-bold">
                  Exclusive Access
                </span>
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white">
                  Unlock Founder Wiki
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed max-w-md font-light">
                  Sign up to join our community. Instantly unlock full access to the Founder's wiki, filmography, design ethos, and private case studies.
                </p>
              </div>

              {/* Simple Signup Form */}
              <form onSubmit={handleUnlockSubmit} className="space-y-4 text-left max-w-sm mx-auto">
                <div className="space-y-2">
                  <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rohit Badgujar"
                      className="w-full bg-black/50 border border-white/10 focus:border-[hsl(43_72%_55%)] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[hsl(43_72%_55%)]/20 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block">
                    Work / Personal Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. brand@tvstudios.site"
                      className="w-full bg-black/50 border border-white/10 focus:border-[hsl(43_72%_55%)] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[hsl(43_72%_55%)]/20 transition-all font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 rounded-xl bg-[hsl(43_72%_55%)] hover:bg-white text-black font-mono text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
                >
                  {isSubmitting ? "Unlocking Access..." : "Sign Up & Unlock Wiki"}
                </button>
              </form>

              {/* No Disposable Mails Notice */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[hsl(43_72%_55%)]/60" />
                <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-wide">
                  Real emails only. Temporary domains are blocked.
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <div className="line-thin mx-auto max-w-4xl" />

      {/* Contact Section dedicated to the new page */}
      <section className="py-24 relative" id="contact">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight"
            >
              Get In <span className="text-primary">Touch</span>
            </motion.h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to broadcast your brand? Connect with us today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 text-center hover:bg-white/5 transition-all"
            >
               <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center text-primary">
                 <Mail className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Email Us</h3>
               <p className="text-muted-foreground mb-4">For all project inquiries</p>
               <a href="mailto:tv3studios@gmail.com" className="text-lg font-semibold hover:text-primary transition-colors">
                 tv3studios@gmail.com
               </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 text-center hover:bg-white/5 transition-all"
            >
               <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center text-primary">
                 <Phone className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Call Us</h3>
               <p className="text-muted-foreground mb-4">Mon-Fri, 11am to 6pm</p>
              <a href="https://wa.me/919588627190" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-[hsl(43_72%_55%)] transition-colors inline-flex items-center gap-2">
                MESSAGE TV³
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 text-center hover:bg-white/5 transition-all"
            >
               <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center text-primary">
                 <MapPin className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Our Base</h3>
               <p className="text-muted-foreground mb-4">Operations & Leads</p>
               <p className="text-lg font-semibold">
                 Vashi Mumbai, India
               </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamContact;
