import { motion } from "framer-motion";
import dynamisityLogo from "@/assets/dynamisity-logo.png";
import hmbLogo from "@/assets/hmb-logo.png";
import ainxtLogo from "@/assets/ainxt-logo.jpeg";

const brands = [
  {
    logo: dynamisityLogo,
    name: "Dynamisity Pvt. Ltd.",
    tagline: "Global Business Consulting & Technology Partner",
    desc: "A global consulting powerhouse delivering Microsoft Dynamics 365, AI solutions, and enterprise transformation across continents. Dynamisity believed in the TV Studios roadmap from day one — providing strategic assistance and unwavering trust that fueled the studio's growth trajectory.",
    contribution: "Roadmap Assistance · Brand Growth Catalyst",
    url: "https://dynamisity.com",
  },
  {
    logo: hmbLogo,
    name: "Hidden Message Box",
    tagline: "Content Factory Lab for Originals",
    desc: "The foundational content lab that existed before 'OG' became a slang. HMB shaped the raw creative infrastructure that TV Studios was built upon — without Hidden Message Box, the originals pipeline simply wouldn't exist.",
    contribution: "Foundation Partner · Originals Pipeline",
  },
  {
    logo: ainxtLogo,
    name: "AINXT Tech",
    tagline: "Visual Technology & Innovation Partner",
    desc: "The tech brand that trusted our vision when visual technology was still being chased by everyone else. AINXT backed TV Studios as a trusted startup during the most crucial phase — when options were few and belief mattered most.",
    contribution: "Technology Trust · Crucial Phase Support",
  },
];

const BrandBuildBrands = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
          The Foundation
        </p>
        <h3 className="font-display text-2xl md:text-3xl">
          Brand Build <span className="text-gradient-gold">Brands</span>
        </h3>
        <p className="mt-3 font-body text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
          These are the brands that believed in the vision, funded the journey, and became part of the story.
          Every empire is built by those who show up first.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {brands.map((brand, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/30"
          >
            {/* TV Frame Logo Display */}
            <div className="relative bg-secondary p-1">
              {/* TV frame border */}
              <div className="relative rounded-lg border-2 border-muted bg-background overflow-hidden">
                {/* Screen scanline effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent pointer-events-none z-10" />
                {/* Logo container */}
                <div className="flex items-center justify-center p-6 h-32">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-20 max-w-[140px] object-contain"
                  />
                </div>
              </div>
              {/* TV stand indicator */}
              <div className="flex justify-center mt-1 gap-1">
                <div className="h-0.5 w-4 rounded-full bg-muted-foreground/30" />
                <div className="h-0.5 w-4 rounded-full bg-primary/40" />
                <div className="h-0.5 w-4 rounded-full bg-muted-foreground/30" />
              </div>
            </div>

            {/* Brand Info */}
            <div className="p-5">
              <h4 className="font-display text-base mb-0.5">{brand.name}</h4>
              <p className="font-body text-[10px] uppercase tracking-wider text-primary mb-3">
                {brand.tagline}
              </p>
              <p className="font-body text-xs leading-relaxed text-muted-foreground mb-4">
                {brand.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-body text-[10px] uppercase tracking-wider text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
                  {brand.contribution}
                </span>
                {brand.url && (
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[10px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    Visit ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BrandBuildBrands;
