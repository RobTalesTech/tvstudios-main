import { useState } from "react";
import { motion } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";
import { Send, Heart, Sparkles } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [patronName, setPatronName] = useState("");
  const [patronEmail, setPatronEmail] = useState("");
  const [patronNote, setPatronNote] = useState("");
  const [patronSubmitted, setPatronSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const msg = `Hi, I'd like to stay connected with TV Studios. My email: ${email}`;
      window.open(`https://wa.me/918149981660?text=${encodeURIComponent(msg)}`, "_blank");
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handlePatronSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patronName && patronEmail) {
      const msg = `Hi TV Studios! I'd like to pre-book a creation.\n\nName: ${patronName}\nEmail: ${patronEmail}${patronNote ? `\nNote: ${patronNote}` : ""}`;
      window.open(`https://wa.me/918149981660?text=${encodeURIComponent(msg)}`, "_blank");
      setPatronSubmitted(true);
      setPatronName("");
      setPatronEmail("");
      setPatronNote("");
    }
  };

  return (
    <footer className="border-t border-border px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Left — Brand */}
          <div>
            <h3 className="font-display text-2xl">
              <span className="text-gradient-gold">TV</span> Studios
            </h3>
            <p className="mt-1 font-body text-[10px] font-light tracking-[0.2em] uppercase text-muted-foreground">
              <span style={{ color: '#FF9933' }}>The</span>{' '}
              <span className="text-foreground">Village</span>{' '}
              <span style={{ color: '#138808' }}>Studios</span>
            </p>
            <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground">
              <strong>Head Office:</strong><br />
              Main Road Pansemal, Dist Barwani, MP, Pin Code: 451770
            </p>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-muted-foreground border-l-2 border-primary/30 pl-3">
              <div>
                 <span className="font-bold text-white/80 block">Indore Region</span>
                 Piyush (Tech Ops)
              </div>
              <div>
                 <span className="font-bold text-white/80 block">Pune Region</span>
                 Roopesh (Finance)
              </div>
            </div>

            <p className="mt-6 font-body text-xs font-bold text-white uppercase tracking-widest bg-white/5 inline-block px-3 py-1.5 rounded border border-white/10">
              <span className="text-primary mr-2">Unified Representative:</span> <a href="https://wa.me/918149981660" target="_blank" className="hover:text-primary transition-colors underline">Initiate Channel</a>
            </p>
            <p className="mt-1 font-body text-[10px] text-muted-foreground italic">
              Operated exclusively by our central system
            </p>
            <div className="mt-6">
              <WhatsAppButton />
            </div>
          </div>

          {/* Middle — Stay Connected */}
          <div>
            <h4 className="font-display text-lg">Stay Connected</h4>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Drop your email for invoicing, updates, and feedback.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-full border border-border bg-secondary px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-2.5 font-body text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 font-body text-xs text-primary"
              >
                Thanks! We'll be in touch.
              </motion.p>
            )}

            {/* Easy Transfer */}
            <div className="mt-8 rounded-xl border border-border bg-card p-4">
              <h5 className="font-display text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Quick Settlement
              </h5>
              <p className="mt-1 font-body text-xs text-muted-foreground">
                For seamless project settlements & pre-bookings
              </p>
              <div className="mt-3 space-y-1.5 font-body text-xs text-secondary-foreground">
                <p><span className="text-muted-foreground">UPI:</span> TVstudios@upi</p>
                <p><span className="text-muted-foreground">WhatsApp Pay:</span> Request via DM</p>
              </div>
              <p className="mt-2 font-body text-[10px] text-muted-foreground italic">
                Share screenshot on WhatsApp after transfer
              </p>
            </div>
          </div>

          {/* Right — Patronize the Studio */}
          <div>
            <h4 className="font-display text-lg flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              Patronize the Studio
            </h4>
            <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">
              We're a vision-first studio — carving authentic storytelling through art using the finest tools. Every creation is a commitment to excellence.
            </p>

            {!patronSubmitted ? (
              <form onSubmit={handlePatronSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  value={patronName}
                  onChange={(e) => setPatronName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <input
                  type="email"
                  value={patronEmail}
                  onChange={(e) => setPatronEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
                <textarea
                  value={patronNote}
                  onChange={(e) => setPatronNote(e.target.value)}
                  placeholder="Your note or project idea..."
                  rows={2}
                  className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary px-5 py-2.5 font-body text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
                >
                  Pre-book Your Creation
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl border border-primary/30 bg-card p-5"
              >
                <p className="font-display text-sm text-primary mb-3">Welcome to the journey ✦</p>
                <p className="font-body text-xs text-muted-foreground mb-4">
                  Here's a glimpse of brands investing in authentic storytelling:
                </p>
                <div className="space-y-2">
                  {[
                    { brand: "Dynamisity", type: "Brand Strategy & Film" },
                    { brand: "Regional Cinema Project", type: "Trailer & Distribution" },
                    { brand: "Pest Control Brand", type: "Ad Template & Copyright" },
                  ].map((b) => (
                    <div key={b.brand} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
                      <span className="font-body text-xs text-foreground">{b.brand}</span>
                      <span className="font-body text-[10px] text-muted-foreground">{b.type}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 font-body text-[10px] text-muted-foreground italic">
                  Your creation journey begins now. We'll reach out shortly.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="line-thin mt-12" />
        <p className="mt-6 text-center font-body text-xs text-muted-foreground">
          © 2026 TV Studios. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
