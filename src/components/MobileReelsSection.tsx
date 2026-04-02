import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import WhatsAppButton from "./WhatsAppButton";
import ShareButton from "./ShareButton";

const leftReels = [
  { id: "2ccAgY4UoX4", label: "Our Latest Reel", anchor: "latest-reel" },
  { id: "kC9Fx8QEXpI", label: "Brand Showcase", anchor: "brand-showcase-reel" },
];

const rightReels = [
  {
    id: "Jn94dBgZ2xY",
    label: "Pest Control Ad Template",
    description: "Ready-made creative template for Pest Control brands",
    anchor: "pest-control-template",
    whatsappMsg: "Hi! I'd like you to make this ad for my brand and take the full copyright of this ad for my brand.",
    cta: "Buy This Template",
  },
  {
    id: "vqI3xYcFJFM",
    label: "Brand Ad Template",
    description: "Premium ad template for your brand",
    anchor: "brand-ad-template",
    whatsappMsg: "Hi! I'm interested in this brand ad template from TV Studios.",
    cta: "Get This Template",
  },
];


const MobileReelsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentLeftReel, setCurrentLeftReel] = useState(0);
  const [currentRightReel, setCurrentRightReel] = useState(0);
  // "left" or "right" — only one plays at a time
  const [activePhone, setActivePhone] = useState<"left" | "right">("left");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // No auto-advance — user must manually tap to switch reels

  // Deep link: scroll and select correct reel on load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const leftIdx = leftReels.findIndex((r) => r.anchor === hash);
    const rightIdx = rightReels.findIndex((r) => r.anchor === hash);
    if (leftIdx >= 0) {
      setCurrentLeftReel(leftIdx);
      setActivePhone("left");
      setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    } else if (rightIdx >= 0) {
      setCurrentRightReel(rightIdx);
      setActivePhone("right");
      setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, []);

  const handleLeftSelect = useCallback((i: number) => {
    setCurrentLeftReel(i);
    setActivePhone("left");
  }, []);

  const handleRightSelect = useCallback((i: number) => {
    setCurrentRightReel(i);
    setActivePhone("right");
  }, []);

  const leftReel = leftReels[currentLeftReel];
  const rightReel = rightReels[currentRightReel];
  const isLeftActive = activePhone === "left";
  const isRightActive = activePhone === "right";

  return (
    <section id="reels" className="px-4 py-16 md:px-6 md:py-24" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Short-Form Content
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
            Vertical <span className="text-gradient-gold">Reels</span>
          </h2>
          <p className="mt-3 font-body text-sm text-muted-foreground">
            Crafting Brand By Brand as <span className="text-gradient-gold font-medium">BR</span> — Brand Representative
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-16">
          {/* Left Phone */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div
              id={leftReel.anchor}
              className={`phone-frame relative h-[500px] w-[260px] sm:h-[560px] sm:w-[280px] overflow-hidden rounded-[2.5rem] border-[3px] border-border bg-card shadow-2xl transition-all duration-500 ${isLeftActive ? "glow-gold scale-100" : "opacity-60 scale-95"}`}
              onClick={() => setActivePhone("left")}
            >
              <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-background" />
              {isVisible && isLeftActive && (
                <motion.div
                  key={leftReel.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5 }}
                  className="yt-hide-branding h-full w-full"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${leftReel.id}?autoplay=1&mute=0&loop=1&playlist=${leftReel.id}&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1`}
                    title="Brand Reel"
                    className="h-full w-full"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                  />
                </motion.div>
              )}
              {(!isLeftActive || !isVisible) && (
                <div className="flex h-full w-full items-center justify-center bg-card">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-border">
                      <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <p className="font-body text-xs text-muted-foreground">Tap to play</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2">
              {leftReels.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleLeftSelect(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === currentLeftReel ? "bg-primary w-4" : "bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 font-body text-sm text-muted-foreground">{leftReel.label}</p>
            <div className="mt-2">
              <ShareButton anchor={leftReel.anchor} title={leftReel.label} />
            </div>
          </motion.div>

          {/* Right Phone – Template reels */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div
              id={rightReel.anchor}
              className={`phone-frame relative h-[500px] w-[260px] sm:h-[560px] sm:w-[280px] overflow-hidden rounded-[2.5rem] border-[3px] border-border bg-card shadow-2xl transition-all duration-500 ${isRightActive ? "glow-gold scale-100" : "opacity-60 scale-95"}`}
              onClick={() => setActivePhone("right")}
            >
              <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-background" />
              {isVisible && isRightActive && (
                <motion.div
                  key={rightReel.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5 }}
                  className="yt-hide-branding h-full w-full"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${rightReel.id}?autoplay=1&mute=0&loop=1&playlist=${rightReel.id}&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1`}
                    title={rightReel.label}
                    className="h-full w-full"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                  />
                </motion.div>
              )}
              {(!isRightActive || !isVisible) && (
                <div className="flex h-full w-full items-center justify-center bg-card">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-border">
                      <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <p className="font-body text-xs text-muted-foreground">Tap to play</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2">
              {rightReels.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleRightSelect(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === currentRightReel ? "bg-primary w-4" : "bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="mb-1 font-display text-lg text-foreground">{rightReel.label}</p>
              <p className="mb-3 font-body text-xs text-muted-foreground">
                {rightReel.description}
              </p>
              <div className="flex items-center justify-center gap-3">
                <ShareButton anchor={rightReel.anchor} title={rightReel.label} />
                <WhatsAppButton label={rightReel.cta} message={rightReel.whatsappMsg} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileReelsSection;
