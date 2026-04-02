import { motion } from "framer-motion";
import ShareButton from "./ShareButton";

const BrandJingleSection = () => (
  <section id="brand-jingle" className="px-4 py-12 md:px-6 md:py-16">
    <div className="mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-2 font-display text-2xl sm:text-3xl md:text-4xl">
          Make Your OG Brand{" "}
          <span className="text-gradient-gold">Zingle</span>
        </h2>
        <p className="mb-8 font-body text-sm text-muted-foreground">
          Listen to how we bring brands to life with sound
        </p>

        {/* Low-res radio-style player */}
        <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border bg-card p-4">
          <div className="yt-hide-branding aspect-video overflow-hidden rounded-lg">
            <iframe
              src="https://www.youtube.com/embed/TsrwETdXJ-0?controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&vq=small"
              title="Brand Jingle"
              className="h-full w-full"
              allow="encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <ShareButton anchor="brand-jingle" title="Brand Jingle" />
        </div>
      </motion.div>
    </div>
  </section>
);

export default BrandJingleSection;
