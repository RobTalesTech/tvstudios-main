import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Twitter, ArrowUpRight, ShieldAlert } from "lucide-react";

interface TwitterFeedProps {
  defaultUsername?: string;
}

export default function TwitterFeed({ defaultUsername = "RobTalesTech" }: TwitterFeedProps) {
  const [username, setUsername] = useState(defaultUsername);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if script already exists in the document
    const existingScript = document.getElementById("twitter-wjs");
    if (existingScript) {
      setIsScriptLoaded(true);
      // Re-initialize widgets to render the newly injected tag
      if ((window as any).twttr && (window as any).twttr.widgets) {
        (window as any).twttr.widgets.load();
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "twitter-wjs";
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => {
      setIsScriptLoaded(true);
      if ((window as any).twttr && (window as any).twttr.widgets) {
        (window as any).twttr.widgets.load();
      }
    };
    document.body.appendChild(script);
  }, [username]);

  return (
    <section className="relative w-full overflow-hidden bg-[#020202] py-24 md:py-32 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50%] w-[100%] bg-white/[0.01] blur-[150px] z-0" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="mb-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5 pb-8">
          <div>
            <span className="font-mono text-[9px] text-[hsl(43_72%_55%)] uppercase tracking-[0.5em] block mb-2">
              Sync Broadcast // X Transmission
            </span>
            <h3 className="font-display text-3xl md:text-4xl text-white uppercase tracking-tight">
              Studio Feed
            </h3>
          </div>
          <a
            href={`https://x.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:border-white/30 text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-all bg-white/[0.01]"
          >
            <Twitter className="w-4 h-4 text-[hsl(43_72%_55%)]" />
            Follow @{username}
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
          </a>
        </div>

        {/* Outer Frame */}
        <div className="relative w-full rounded-[2.5rem] border border-white/5 bg-black/40 backdrop-blur-xl p-8 min-h-[500px] flex flex-col shadow-2xl">
          {/* Subtle overlay grid */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none rounded-[2.5rem]" 
            style={{ 
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", 
              backgroundSize: "24px 24px" 
            }} 
          />

          {/* Underlay / Loader State */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none z-0">
            <Twitter className="w-10 h-10 text-zinc-800 mb-4 animate-pulse" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Connecting X Node...
            </p>
            <p className="font-sans text-[11px] text-zinc-700 mt-2 max-w-xs leading-relaxed">
              If the timeline remains empty, please check your network connection or disable ad-blockers for this domain.
            </p>
          </div>

          {/* Embedded widget */}
          <div className="relative z-10 w-full max-h-[500px] overflow-y-auto custom-scrollbar">
            <a
              className="twitter-timeline"
              data-theme="dark"
              data-chrome="noheader nofooter noborders transparent"
              data-height="500"
              href={`https://twitter.com/${username}?ref_src=twsrc%5Etfw`}
            >
              {/* Fallback link if Twitter script is completely blocked */}
              <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-950/50">
                <ShieldAlert className="w-8 h-8 text-[hsl(43_72%_55%)] mb-3 opacity-60" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Timeline Offline
                </p>
                <p className="text-zinc-600 text-xs mt-2 mb-4">
                  The X widget script was prevented from loading by browser privacy shields or ad-blockers.
                </p>
                <span className="text-xs font-mono text-[hsl(43_72%_55%)] hover:underline">
                  Open X Account Directly →
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
