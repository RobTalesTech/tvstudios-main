import { motion } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";
import { Check, Sparkles } from "lucide-react";

const tiers = [
{
  name: "Visual Production",
  price: "₹10,000",
  description: "High-end cinematic framing",
  features: ["Algorithmic formatting", "Concept & scripting", "Master color grading", "Direct WhatsApp sync"],
  highlighted: false
},
{
  name: "Audio Production",
  price: "₹8,500",
  description: "The architecture of sound",
  features: ["Custom brand jingles", "Audio mix & master", "Algorithmic hooks", "Priority delivery"],
  highlighted: true
},
{
  name: "Copywriting",
  price: "₹5,000",
  description: "Artistic brand narratives",
  features: ["Full brand copy suite", "Social media structuring", "Campaign scripts", "1-on-1 ideation"],
  highlighted: false
}];


const PricingSection = () =>
<section id="pricing" className="px-4 py-16 md:px-6 md:py-24">
    <div className="mx-auto max-w-5xl">
      <div className="mb-14 text-center">
        <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">VALUE PRICING</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
          Tailored <span className="text-gradient-gold">Collaboration</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier, i) =>
      <motion.div
        key={tier.name}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.15 }}
        className={`relative flex flex-col justify-between rounded-none border-2 p-8 transition-all duration-300 ${
        tier.highlighted ?
        "border-red-600 bg-black/40 shadow-[0_0_40px_rgba(220,38,38,0.15)]" :
        "border-white/10 bg-black/40 hover:border-white/40"}`
        }>
        
            {tier.highlighted &&
        <span className="absolute -top-3 left-8 bg-red-600 px-4 py-1 font-body text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                Highest Demand
              </span>
        }
            <div>
              <h3 className="font-display text-2xl uppercase tracking-widest">{tier.name}</h3>
              <p className="mt-2 font-body text-xs uppercase tracking-widest text-muted-foreground">{tier.description}</p>
              <p className="mt-8 font-display text-5xl font-black text-white">{tier.price}</p>
              <ul className="mt-8 space-y-4">
                {tier.features.map((f) =>
            <li key={f} className="flex items-center gap-3 font-body text-sm text-white/70">
                    <Check className={`h-4 w-4 ${tier.highlighted ? "text-red-500" : "text-white/40"}`} />
                    {f}
                  </li>
            )}
              </ul>
            </div>
            <div className="mt-12">
              <WhatsAppButton 
                label="Book Sequence" 
                message={`Hi! I'm interested in the ${tier.name} package.`}
                className="w-full justify-center bg-white text-black hover:bg-red-600 hover:text-white" 
              />
            </div>
          </motion.div>
      )}
      </div>

      {/* Easy Settlement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 mx-auto w-full max-w-md rounded-xl border border-primary/20 bg-card p-4 sm:p-6 text-center"
      >
        <p className="font-display text-lg">Seamless <span className="text-gradient-gold">Settlement</span></p>
        <p className="mt-2 font-body text-xs text-muted-foreground">
          Direct transfer for quick project kickoff & pre-bookings
        </p>
        <div className="mt-6">
          <a
            href="https://wa.me/918149981660?text=Hi!%20I'd%20like%20to%20settle%20payment%20for%20my%20project%20with%20TV%20Studios."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary bg-card px-6 py-3 font-body text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            Settle Instantly
          </a>
        </div>
        <p className="mt-3 font-body text-[10px] text-muted-foreground italic">
          Secure & direct — powered by trust
        </p>
      </motion.div>
    </div>
  </section>;


export default PricingSection;