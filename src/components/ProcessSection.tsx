import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Inquiry", desc: "Reach out via WhatsApp or the site. Tell us your vision." },
  { num: "02", title: "Payment", desc: "Choose a plan, confirm via invoice. Simple & transparent." },
  { num: "03", title: "Production", desc: "We craft your content with precision and creativity." },
  { num: "04", title: "Review", desc: "Review, request revisions, and approve the final cut." },
];

const ProcessSection = () => (
  <section id="process" className="px-4 py-16 md:px-6 md:py-24">
    <div className="mx-auto max-w-4xl">
      <div className="mb-14 text-center">
        <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">How It Works</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
          Our <span className="text-gradient-gold">Process</span>
        </h2>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[20px] top-0 h-full w-px bg-border md:left-1/2" />

        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex items-start flex-row md:justify-center md:items-center gap-6 md:gap-0"
            >
              {/* Left element on Desktop / Content on Mobile */}
              <div className={`flex-1 md:pr-12 ${i % 2 === 0 ? "order-2 md:order-1 md:text-right" : "order-2 md:order-3 md:text-left"}`}>
                <span className="font-body text-xs text-primary">{step.num}</span>
                <h3 className="font-display text-xl">{step.title}</h3>
                <p className="mt-1 font-body text-sm text-muted-foreground">{step.desc}</p>
              </div>

              {/* Center dot */}
              <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary mt-1 md:mt-0 order-1 md:order-2" />

              {/* Right element on Desktop (empty spacer for alternating design) */}
              <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "order-3" : "order-1"}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProcessSection;
