import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";
import { ArrowLeft, Check, Copy, Sparkles, Send, ShieldAlert, Cpu, Terminal, CheckCircle2, Clock } from "lucide-react";

type PlanId = "starter" | "growth" | "agency";

interface PlanDetails {
  name: string;
  price: string;
  desc: string;
}

const planDetails: Record<PlanId, PlanDetails> = {
  starter: {
    name: "Starter Plan",
    price: "₹999",
    desc: "For one channel, getting consistent"
  },
  growth: {
    name: "Growth Plan",
    price: "₹19,999",
    desc: "For brands posting across channels"
  },
  agency: {
    name: "Agency Plan",
    price: "₹39,999",
    desc: "For teams managing several brands"
  }
};

export default function GetStarted() {
  const [searchParams] = useSearchParams();
  const rawPlan = searchParams.get("plan")?.toLowerCase();
  const planId: PlanId = (rawPlan === "starter" || rawPlan === "growth" || rawPlan === "agency") 
    ? rawPlan 
    : "growth";

  const activePlan = planDetails[planId];

  // Form states
  const [businessName, setBusinessName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [logoDetails, setLogoDetails] = useState("");
  const [brandColors, setBrandColors] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [audienceDetails, setAudienceDetails] = useState("");
  const [paymentRef, setPaymentRef] = useState("");

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("openhmb@okhdfcbank");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !contactEmail || !paymentRef) {
      alert("Please fill in the required fields (Business Name, Email, and Payment Note).");
      return;
    }

    setIsSubmitting(true);
    const subId = Math.random().toString(36).substr(2, 9).toUpperCase();

    const payload = {
      id: subId,
      plan: activePlan.name,
      business_name: businessName,
      contact_email: contactEmail,
      logo_details: logoDetails,
      brand_colors: brandColors,
      product_details: productDetails,
      audience_details: audienceDetails,
      payment_ref: paymentRef,
      timestamp: new Date().toISOString()
    };

    // 1. Try to save to Supabase
    if (supabase) {
      try {
        const { error } = await supabase
          .from("tv3_branding_intake")
          .insert([payload]);
        
        if (error) throw error;
      } catch (err) {
        console.error("Supabase insert error, saving to localStorage:", err);
      }
    }

    // 2. Always fallback/save copy to localStorage
    try {
      const existing = localStorage.getItem("tv3_branding_intake");
      const list = existing ? JSON.parse(existing) : [];
      list.push(payload);
      localStorage.setItem("tv3_branding_intake", JSON.stringify(list));
    } catch (err) {
      console.error("LocalStorage write error:", err);
    }

    // 3. Send email details via serverless function (dual-email configuration)
    const emailSubject = `[New Lead] Branded Content Intake: ${businessName} (${activePlan.name})`;
    const emailBody = `New Branded Content Intake Submission\n---------------------\nIngest ID: ${subId}\nPlan: ${activePlan.name}\nBusiness Name: ${businessName}\nContact Email: ${contactEmail}\n\nBrand Colors:\n${brandColors || "Not specified"}\n\nLogo Details:\n${logoDetails || "Not specified"}\n\nProduct Details:\n${productDetails || "Not specified"}\n\nAudience Details:\n${audienceDetails || "Not specified"}\n\nUPI Payment Reference:\n${paymentRef}\n---------------------\nSubmitted via TV³ Studios Onboarding Portal.`;

    const clientSubject = `Welcome to TV³ Studios! Brand Intake Received: ${businessName}`;
    const clientBody = `Hi ${businessName},\n\nThank you for choosing TV³ Studios! Your brand profile and onboarding intake for the ${activePlan.name} plan have been successfully received.\n\nHere is a summary of what you pitched:\n---------------------\nPlan Tier: ${activePlan.name}\nClient Contact Email: ${contactEmail}\n\n1. Brand Colors:\n${brandColors || "Not specified"}\n\n2. Logo & Visual Details:\n${logoDetails || "Not specified"}\n\n3. Product/Service Description:\n${productDetails || "Not specified"}\n\n4. Target Audience:\n${audienceDetails || "Not specified"}\n\n5. UPI Subscription Payment Reference:\n${paymentRef}\n---------------------\n\nWhat happens next:\n1. Escrow Verification: Our operations team will verify your UPI transaction reference note.\n2. Design System Alignment: We will configure our custom creative models to match your logo, brand colors, and aesthetic notes.\n3. First Calendar Release: Within 24 to 48 hours, you will receive your first draft content calendar for review. No posts will go live on your socials without your explicit sign-off.\n\nWe are excited to build your brand's digital presence on autopilot! If you have any questions, feel free to reply directly to this email or reach out on WhatsApp.\n\nBest regards,\nTV³ Studios Team`;

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: 'tv3studios@gmail.com',
          replyTo: contactEmail,
          subject: emailSubject,
          body: emailBody,
          clientEmail: contactEmail,
          clientSubject: clientSubject,
          clientBody: clientBody
        })
      });
    } catch (err) {
      console.error("Direct email dispatch failed:", err);
    }

    setSubmissionId(subId);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-body selection:bg-primary selection:text-black pt-28 pb-12">
      {/* Grid Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,255,255,0.02),_rgba(0,255,0,0.005),_rgba(0,0,255,0.02))] bg-[size:100%_4px,_6px_100%] pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        
        <div className="mb-8">
          <Link 
            to="/branded-content" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to plans
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="intake-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded bg-[#D4AF37]/5 max-w-fit block">
                  {activePlan.name} • {activePlan.price}
                </span>
                <h1 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight">
                  Three steps, then you're live.
                </h1>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                  No accounts to manage, no complex setups. We configure your design model, synchronize UPI references, and release your first content calendar within a day.
                </p>
              </div>

              {/* Beta Benefits Explanation */}
              <div className="border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-2xl p-6 md:p-8 space-y-4 text-left">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
                  <h3 className="font-mono text-xs uppercase font-bold text-[#D4AF37] tracking-wider">
                    Why are we in Private Beta?
                  </h3>
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  <strong>Poster Boy AI</strong> is currently running in a controlled <strong>Private Beta</strong> release. We are restricting intake access to a limited group of brands to calibrate our custom design models. By joining the beta, you receive:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-1">
                    <span className="text-[#D4AF37] font-mono text-[9px] uppercase tracking-wider block font-bold">1. Beta Pricing</span>
                    <p className="text-[10px] text-zinc-400 leading-normal">
                      Secure our introductory launch pricing (50% off) locked in forever.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#D4AF37] font-mono text-[9px] uppercase tracking-wider block font-bold">2. Co-Create Style</span>
                    <p className="text-[10px] text-zinc-400 leading-normal">
                      Directly shape how our generative engines render assets for your brand.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#D4AF37] font-mono text-[9px] uppercase tracking-wider block font-bold">3. Early Access</span>
                    <p className="text-[10px] text-zinc-400 leading-normal">
                      Get your custom-branded posts designed and scheduled before the public release.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 1: PAY VIA UPI */}
              <div className="border border-white/5 bg-zinc-950/20 rounded-2xl p-6 md:p-8 space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="font-serif text-lg font-bold text-primary italic shrink-0">01 //</span>
                  <div className="space-y-2 flex-1 text-left">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                      Pay <span className="text-primary">{activePlan.price}</span> via UPI
                    </h2>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Transfer the fee from GPay, PhonePe, Paytm, or any UPI app to the studio escrow registry.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-black border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="font-mono text-xs">
                    <span className="text-zinc-500 block text-[9px] uppercase tracking-widest mb-0.5">UPI ID (Escrow Address)</span>
                    <strong className="text-white select-all">openhmb@okhdfcbank</strong>
                  </div>
                  <button 
                    onClick={handleCopyUPI}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/5 text-zinc-400 hover:text-primary transition-all font-mono text-[9px] uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy Address"}
                  </button>
                </div>
                <div className="p-3 bg-red-900/10 border border-red-500/20 text-red-400 text-[10px] uppercase font-mono tracking-wider rounded-lg flex items-center gap-3">
                  <ShieldAlert className="w-4.5 h-4.5 shrink-0" />
                  <span>Important: Enter "{activePlan.name} — [Your Business Name]" as the payment note.</span>
                </div>
              </div>

              {/* STEP 2: BRAND INTAKE FORM */}
              <div className="border border-white/5 bg-zinc-950/20 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="flex gap-4 items-start border-b border-white/5 pb-4">
                  <span className="font-serif text-lg font-bold text-primary italic shrink-0">02 //</span>
                  <div className="space-y-1 text-left">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                      Tell us about your brand
                    </h2>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      This information builds your dedicated design matrix. Complete the credentials below.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Business Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Acme Corp" 
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Contact Email *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g. founder@acme.com" 
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Brand Colors / Primary Hex Codes</label>
                    <input 
                      type="text" 
                      placeholder="e.g. #000000, #ff0055, #ffffff" 
                      value={brandColors}
                      onChange={(e) => setBrandColors(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Logo Assets Description & Link</label>
                    <textarea 
                      rows={3}
                      placeholder="Describe your logo or paste a public link to your logo vectors (Drive, Dropbox, etc.)"
                      value={logoDetails}
                      onChange={(e) => setLogoDetails(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">What do you sell / What is your product?</label>
                    <textarea 
                      rows={3}
                      placeholder="Explain your core product or service in a few simple sentences."
                      value={productDetails}
                      onChange={(e) => setProductDetails(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Who is your target audience?</label>
                    <textarea 
                      rows={3}
                      placeholder="Who is the primary buyer? e.g. B2B founders, Gen Z fashion enthusiasts"
                      value={audienceDetails}
                      onChange={(e) => setAudienceDetails(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-primary transition-colors font-mono resize-none"
                    />
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-6 mt-6">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-primary block font-bold">UPI Payment Reference / Note Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Transaction Ref or the name used in your payment note" 
                      value={paymentRef}
                      onChange={(e) => setPaymentRef(e.target.value)}
                      className="w-full bg-black/40 border border-primary/30 focus:border-primary rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-white text-black font-mono text-xs uppercase font-black tracking-widest py-4 rounded-xl transition-all shadow-[0_4px_25px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    {isSubmitting ? "Transmitting..." : "Submit Brand Profile"}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              {/* STEP 3: REVIEW THE BATCH */}
              <div className="border border-white/5 bg-zinc-950/20 rounded-2xl p-6 md:p-8">
                <div className="flex gap-4 items-start">
                  <span className="font-serif text-lg font-bold text-primary italic shrink-0">03 //</span>
                  <div className="space-y-1 text-left">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                      Review your first batch
                    </h2>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Within 24–48 hours, you'll receive a draft content calendar containing your first set of custom posts. Nothing goes live without your explicit approval.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto border border-[#D4AF37]/20 bg-[#070708] p-8 md:p-10 rounded-3xl space-y-6 shadow-[0_0_50px_rgba(212,175,55,0.08)]"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="text-center space-y-2">
                <h1 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
                  Welcome to TV³ Studios!
                </h1>
                <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.2em]">{activePlan.name} Subscription Intake Complete</p>
              </div>

              <div className="h-px bg-white/5 w-full" />

              {/* Pitch Summary Receipt */}
              <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-2xl text-left space-y-4">
                <h3 className="font-mono text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider border-b border-white/5 pb-2">
                  Brand Pitch Receipt
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 block uppercase text-[8px] tracking-wider">Business Name</span>
                    <span className="text-white font-bold">{businessName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase text-[8px] tracking-wider">Contact Email</span>
                    <span className="text-white font-bold truncate block">{contactEmail}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase text-[8px] tracking-wider">Onboarding Plan</span>
                    <span className="text-[#D4AF37] font-bold">{activePlan.name}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase text-[8px] tracking-wider">UPI Payment Ref</span>
                    <span className="text-white font-bold">{paymentRef}</span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Onboarding Process Flow */}
              <div className="space-y-4 text-left">
                <h3 className="font-mono text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  What Happens Next
                </h3>
                
                <div className="space-y-3">
                  <div className="flex gap-4 items-start p-3 bg-zinc-900/20 rounded-xl border border-white/5">
                    <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
                      1
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Escrow Verification</h4>
                      <p className="text-[10px] text-zinc-400 leading-normal">
                        Our operations team will verify your UPI transaction reference note.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-3 bg-zinc-900/20 rounded-xl border border-white/5">
                    <div className="w-6 h-6 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 font-bold text-xs">
                      2
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Creative Calibration</h4>
                      <p className="text-[10px] text-zinc-400 leading-normal">
                        We will calibrate our generative engines to align with your logo, brand colors, and aesthetic notes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-3 bg-zinc-900/20 rounded-xl border border-white/5">
                    <div className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">
                      3
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">First Content Release</h4>
                      <p className="text-[10px] text-zinc-400 leading-normal">
                        Within 24 to 48 hours, you will receive your first week of custom-branded posts for review.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/5 w-full" />

              <p className="text-zinc-500 text-[10px] font-mono leading-relaxed text-center italic">
                Note: No posts will go live on your socials without your explicit sign-off.
              </p>

              <div className="pt-2 flex gap-4">
                <Link 
                  to="/" 
                  className="w-full text-center py-3.5 bg-primary hover:bg-white text-black font-mono text-xs uppercase font-black tracking-widest rounded-xl transition-all shadow-[0_4px_15px_rgba(212,175,55,0.15)]"
                >
                  Return to command deck
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
