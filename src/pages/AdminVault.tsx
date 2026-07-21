import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Lock, ShieldAlert, Cpu, Database, Users, Banknote, Navigation, FileText, Trash2, MessageSquare, Sparkles, Terminal, Globe, Server, Mail, ExternalLink, Share2 } from "lucide-react";

const AdminVault = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("strategy");
  const [intakeApps, setIntakeApps] = useState<any[]>([]);
  const [whatsappLeads, setWhatsappLeads] = useState<any[]>([]);
  const [brandingIntakes, setBrandingIntakes] = useState<any[]>([]);
  const [serviceLeads, setServiceLeads] = useState<any[]>([]);

  // PBI Lab Tester Panel States
  const [pbiSelectedBrand, setPbiSelectedBrand] = useState("");
  const [pbiUpdateText, setPbiUpdateText] = useState("");
  const [pbiContentType, setPbiContentType] = useState("Technical Share");
  const [pbiLanguage, setPbiLanguage] = useState("Hinglish");
  const [pbiResponse, setPbiResponse] = useState<any>(null);
  const [pbiLoading, setPbiLoading] = useState(false);
  const [pbiError, setPbiError] = useState("");

  // PBI Video Compiler Simulation States
  const [pbiCompiling, setPbiCompiling] = useState(false);
  const [pbiVideoUrl, setPbiVideoUrl] = useState("");
  const [pbiCompileStep, setPbiCompileStep] = useState("");
  const [reelPlaying, setReelPlaying] = useState(false);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  useEffect(() => {
    const loadApplications = async () => {
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('tv3_intake_applications')
            .select('*')
            .order('timestamp', { ascending: false });
          if (data) {
            setIntakeApps(data);
          }
        } catch (err) {
          console.error("Supabase select error:", err);
        }
      }

      const existing = localStorage.getItem("tv3_intake_applications");
      if (existing) {
        setIntakeApps(JSON.parse(existing));
      } else {
        setIntakeApps([]);
      }
    };

    const loadWhatsAppLeads = async () => {
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('tv3_whatsapp_leads')
            .select('*')
            .order('timestamp', { ascending: false });
          if (data) {
            setWhatsappLeads(data);
          }
        } catch (err) {
          console.error("Supabase leads select error:", err);
        }
      }

      const existing = localStorage.getItem("tv3_whatsapp_leads");
      if (existing) {
        setWhatsappLeads(JSON.parse(existing));
      } else {
        setWhatsappLeads([]);
      }
    };

    const loadBrandingIntakes = async () => {
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('tv3_branding_intake')
            .select('*')
            .order('timestamp', { ascending: false });
          if (data) {
            setBrandingIntakes(data);
          }
        } catch (err) {
          console.error("Supabase branding intakes select error:", err);
        }
      }

      const existing = localStorage.getItem("tv3_branding_intake");
      if (existing) {
        setBrandingIntakes(JSON.parse(existing));
      } else {
        setBrandingIntakes([]);
      }
    };

    const loadServiceLeads = async () => {
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('tv3_service_leads')
            .select('*')
            .order('timestamp', { ascending: false });
          if (data) {
            setServiceLeads(data);
          }
        } catch (err) {
          console.error("Supabase service leads select error:", err);
        }
      }

      const existing = localStorage.getItem("tv3_service_leads");
      if (existing) {
        setServiceLeads(JSON.parse(existing));
      } else {
        setServiceLeads([]);
      }
    };

    loadApplications();
    loadWhatsAppLeads();
    loadBrandingIntakes();
    loadServiceLeads();
  }, [activeTab]);

  const clearApplications = async () => {
    localStorage.removeItem("tv3_intake_applications");
    setIntakeApps([]);

    if (supabase) {
      try {
        await supabase.from('tv3_intake_applications').delete().neq('id', '');
      } catch (err) {
        console.error("Supabase delete error:", err);
      }
    }
  };

  const clearLeads = async () => {
    localStorage.removeItem("tv3_whatsapp_leads");
    setWhatsappLeads([]);

    if (supabase) {
      try {
        await supabase.from('tv3_whatsapp_leads').delete().neq('id', '');
      } catch (err) {
        console.error("Supabase leads delete error:", err);
      }
    }
  };

  const handleRunPbiAgent = async () => {
    if (!pbiSelectedBrand) {
      alert("Please select a brand profile first.");
      return;
    }
    setPbiLoading(true);
    setPbiError("");
    setPbiResponse(null);
    setPbiVideoUrl("");
    setPbiCompiling(false);
    setReelPlaying(false);
    setCurrentReelIndex(0);

    try {
      const res = await fetch('/api/pbi/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandId: pbiSelectedBrand,
          updateText: pbiUpdateText,
          contentType: pbiContentType,
          language: pbiLanguage
        })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to trigger PBI agent.");
      }

      const result = await res.json();
      if (result.success) {
        setPbiResponse(result.data);
      } else {
        throw new Error(result.error || "PBI Agent returned an error.");
      }
    } catch (err: any) {
      console.error(err);
      setPbiError(err.message || "An unexpected error occurred during execution.");
    } finally {
      setPbiLoading(false);
    }
  };

  const handleCompileVideo = async () => {
    if (!pbiResponse) return;
    
    setPbiCompiling(true);
    setPbiVideoUrl("");
    setPbiCompileStep("[1/4] Triggering Cloud Compiler...");

    try {
      const res = await fetch('/api/pbi/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: brandingIntakes.find(i => i.id === pbiSelectedBrand)?.business_name || "TV³ Studios Pilot Node",
          conversation: pbiResponse.conversation,
          caption: pbiResponse.caption
        })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Compilation trigger failed.");
      }

      const result = await res.json();
      
      if (result.success) {
        if (result.simulation) {
          setPbiCompileStep("[2/4] Synthesizing Google Neural Host Voices (A: en-IN, B: hi-IN)...");
          await new Promise(r => setTimeout(r, 2000));
          setPbiCompileStep("[3/4] Muxing audio track and rendering background visual timeline...");
          await new Promise(r => setTimeout(r, 2000));
          setPbiCompileStep("[4/4] Compiling master vertical MP4 file...");
          await new Promise(r => setTimeout(r, 2000));
          setPbiVideoUrl("interactive");
        } else {
          setPbiCompileStep("Reel compiling in GitHub Actions... Check your Discord channel in ~30s!");
          await new Promise(r => setTimeout(r, 4000));
        }
      } else {
        throw new Error(result.error || "Failed to trigger PBI compile.");
      }
    } catch (err: any) {
      console.error(err);
      alert("Video Compiler Error: " + (err.message || "Failed to contact video node."));
    } finally {
      setPbiCompiling(false);
    }
  };

  const handleDownloadBrandedPhoto = () => {
    if (!pbiResponse) return;
    
    const activeBrandObj = brandingIntakes.find(i => i.id === pbiSelectedBrand) || { 
      business_name: "TV³ Studios" 
    };

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = pbiResponse.imageUrl;
    
    // Show download indicator on console/alert
    console.log("Compiling high-resolution branded poster canvas...");

    img.onload = () => {
      // Draw graphic background
      ctx.drawImage(img, 0, 0, 1080, 1080);

      // Gradient overlay footer
      const gradient = ctx.createLinearGradient(0, 680, 0, 1080);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.3, "rgba(0, 0, 0, 0.7)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 680, 1080, 400);

      // Draw active brand accent line
      const brandColors = activeBrandObj.brand_colors || "#D4AF37";
      const primaryColor = brandColors.split(",")[0].trim() || "#D4AF37";
      ctx.fillStyle = primaryColor;
      ctx.fillRect(60, 830, 200, 6);

      // Draw Brand text
      ctx.fillStyle = primaryColor;
      ctx.font = "bold 28px monospace";
      ctx.fillText(activeBrandObj.business_name.toUpperCase(), 60, 890);

      // Title header
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "950 56px sans-serif";
      ctx.fillText((pbiResponse.title || "NEWS UPDATE").toUpperCase(), 60, 965);

      // Tagline subheader
      ctx.fillStyle = "#A1A1AA";
      ctx.font = "300 28px sans-serif";
      ctx.fillText(pbiResponse.tagline || "Powered by TV³ Studios Autopilot", 60, 1015);

      // Trigger instant anchor click download
      const link = document.createElement("a");
      link.download = `${activeBrandObj.business_name.replace(/\s+/g, "_")}_branded_post.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  const handleDownloadCaptionTxt = () => {
    if (!pbiResponse) return;
    const activeBrandObj = brandingIntakes.find(i => i.id === pbiSelectedBrand) || { 
      business_name: "TV³ Studios" 
    };

    const textContent = `BRAND POST PACKAGE: ${activeBrandObj.business_name.toUpperCase()}
==================================================
TITLE: ${pbiResponse.title || "N/A"}
TAGLINE: ${pbiResponse.tagline || "N/A"}
SCENE STYLE: ${pbiResponse.sceneType || "Custom AI Render"}
CONTENT FORMAT: ${pbiResponse.contentType || "Branded Photo Post"}

CAPTION & HASHTAGS:
--------------------------------------------------
${pbiResponse.caption}

--------------------------------------------------
DECISION STRATEGY:
${pbiResponse.decisionLogic}

Generated by TV³ Studios Poster Boy AI Engine (PBI).
`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.download = `${activeBrandObj.business_name.replace(/\s+/g, "_")}_caption_pack.txt`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const handleDownloadClientPack = () => {
    handleDownloadBrandedPhoto();
    setTimeout(() => {
      handleDownloadCaptionTxt();
    }, 600);
  };

  const clearBranding = async () => {
    localStorage.removeItem("tv3_branding_intake");
    setBrandingIntakes([]);

    if (supabase) {
      try {
        await supabase.from('tv3_branding_intake').delete().neq('id', '');
      } catch (err) {
        console.error("Supabase branding delete error:", err);
      }
    }
  };

  const clearServiceLeads = async () => {
    localStorage.removeItem("tv3_service_leads");
    setServiceLeads([]);

    if (supabase) {
      try {
        await supabase.from('tv3_service_leads').delete().neq('id', '');
      } catch (err) {
        console.error("Supabase service leads delete error:", err);
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "tvs2026") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Hacker grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 backdrop-blur-2xl border border-red-500/20 p-8 md:p-12 rounded-2xl w-full max-w-md relative z-10 shadow-[0_0_50px_rgba(255,0,0,0.1)]"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/30">
              <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-white text-center tracking-widest uppercase mb-2">Vault Access</h1>
          <p className="text-center text-muted-foreground text-xs uppercase tracking-[0.2em] mb-8">Level 4 Clearance Required</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Secure Key"
                className={`w-full bg-transparent border-b-2 ${error ? 'border-red-500' : 'border-white/20'} px-2 py-3 text-center text-white text-xl tracking-widest placeholder:text-white/20 placeholder:text-sm focus:outline-none focus:border-red-500 transition-colors`}
              />
              {error && <p className="text-red-500 text-xs text-center mt-3 uppercase tracking-widest font-bold">Access Denied</p>}
            </div>
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.3em] py-4 rounded transition-all shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)]">
              Initialize
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-body pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-black tracking-widest uppercase flex items-center gap-3">
               <Database className="text-primary w-8 h-8" />
               Executive Terminal
             </h1>
             <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-2">Classified Operations • Internal Network</p>
          </div>
          <div className="flex gap-4 items-center">
             <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-bold uppercase tracking-widest rounded">Network Secure</div>
             <button onClick={() => setIsAuthenticated(false)} className="text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-widest">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Menu */}
          <div className="lg:col-span-3 space-y-2">
            <button 
              onClick={() => setActiveTab("strategy")}
              className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "strategy" ? "bg-primary text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
            >
              <Navigation className="w-5 h-5" /> TV³ Vision Board
            </button>
            <button 
              onClick={() => setActiveTab("finance")}
              className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "finance" ? "bg-primary text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
            >
              <Banknote className="w-5 h-5" /> Financial & Deals
            </button>
            <button 
              onClick={() => setActiveTab("communications")}
              className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "communications" ? "bg-primary text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
            >
              <Users className="w-5 h-5" /> Client Network
            </button>
            <button 
              onClick={() => setActiveTab("tech")}
              className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "tech" ? "bg-primary text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
            >
              <Cpu className="w-5 h-5" /> Tales Tech Pipeline
            </button>
            <button 
              onClick={() => setActiveTab("intake")}
              className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "intake" ? "bg-[hsl(43_72%_55%)] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
            >
              <FileText className="w-5 h-5" /> Scout Intake ({intakeApps.length})
            </button>
            <button 
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "leads" ? "bg-[hsl(43_72%_55%)] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
            >
              <MessageSquare className="w-5 h-5" /> WhatsApp Leads ({whatsappLeads.length})
            </button>
            <button 
              onClick={() => setActiveTab("branding")}
              className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "branding" ? "bg-[hsl(43_72%_55%)] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
            >
              <Sparkles className="w-5 h-5" /> Branding Intakes ({brandingIntakes.length})
            </button>
            <button 
              onClick={() => setActiveTab("service_leads")}
              className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "service_leads" ? "bg-[hsl(43_72%_55%)] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
            >
              <Database className="w-5 h-5" /> Service Leads ({serviceLeads.length})
            </button>
              <button 
                onClick={() => setActiveTab("pbi_lab")}
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "pbi_lab" ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]" : "bg-white/5 text-amber-500 border border-amber-500/20 hover:bg-white/10"}`}
              >
                <Cpu className="w-5 h-5 animate-pulse" /> PBI Lab (Autopilot)
              </button>
              <button 
                onClick={() => setActiveTab("dev_logs")}
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === "dev_logs" ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "bg-white/5 text-emerald-500 border border-emerald-500/20 hover:bg-white/10"}`}
              >
                <Terminal className="w-5 h-5" /> Development Logs
              </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
                          {activeTab === "strategy" && (
                <motion.div 
                   key="strategy"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="bg-[#0b0b0e] border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl min-h-[500px]"
                >
                  {/* Dot Grid Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                  <div className="border-b border-white/10 pb-4 mb-8 flex justify-between items-center relative z-10 text-left">
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-widest text-white">TV³ Master Planning Board</h2>
                      <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-1">Creative Pinned Whiteboard & Vision Board</p>
                    </div>
                    <span className="text-[10px] font-mono bg-red-500/10 border border-red-500/30 text-red-500 px-3 py-1 rounded font-bold uppercase tracking-wider animate-pulse">
                      Top Secret Vault
                    </span>
                  </div>

                  {/* Visual Sticky Notes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 text-left">
                    
                    {/* Note 1: Yellow - The Vision */}
                    <motion.div 
                      whileHover={{ scale: 1.02, rotate: -1 }}
                      className="bg-amber-100/90 text-zinc-950 p-6 rounded-xl shadow-2xl transform rotate-[-2deg] flex flex-col justify-between min-h-[220px] relative border-l-4 border-amber-400"
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-zinc-900/10 backdrop-blur-sm rounded" />
                      <div>
                        <h3 className="font-sans font-black uppercase tracking-wider text-sm border-b border-zinc-950/10 pb-2 mb-3 mt-1">// THE VISION (PBI & BEYOND)</h3>
                        <p className="font-sans text-xs leading-relaxed font-semibold">
                          Infinite content generation engine. Passive algorithmic digital income. PBI (Poster Boy AI) hamara pehla SaaS product hai jo studios ko independent funding dega!
                        </p>
                      </div>
                      <span className="text-[8px] font-mono text-zinc-600 block text-right mt-4 font-bold">Priority: HIGH • Status: ACTIVE</span>
                    </motion.div>

                    {/* Note 2: Cyan - Rohit */}
                    <motion.div 
                      whileHover={{ scale: 1.02, rotate: 2 }}
                      className="bg-cyan-100/90 text-zinc-950 p-6 rounded-xl shadow-2xl transform rotate-[1deg] flex flex-col justify-between min-h-[220px] relative border-l-4 border-cyan-400"
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-zinc-900/10 backdrop-blur-sm rounded" />
                      <div>
                        <h3 className="font-sans font-black uppercase tracking-wider text-sm border-b border-zinc-950/10 pb-2 mb-3 mt-1">// CREATIVE DIRECTIVES (ROHIT)</h3>
                        <p className="font-sans text-xs leading-relaxed font-semibold">
                          Story scaling, brand aesthetics, aur narrative-driven algorithm manipulation. 
                          Remember: Hamara kaam humesha dynamic aur premium hona chahiye, no cheap wraps. Output quality ensures high ticket sales!
                        </p>
                      </div>
                      <span className="text-[8px] font-mono text-zinc-600 block text-right mt-4 font-bold">Owner: Rohit • Creative Core</span>
                    </motion.div>

                    {/* Note 3: Pink - Operations */}
                    <motion.div 
                      whileHover={{ scale: 1.02, rotate: -2 }}
                      className="bg-rose-100/90 text-zinc-950 p-6 rounded-xl shadow-2xl transform rotate-[-1deg] flex flex-col justify-between min-h-[220px] relative border-l-4 border-rose-400"
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-zinc-900/10 backdrop-blur-sm rounded" />
                      <div>
                        <h3 className="font-sans font-black uppercase tracking-wider text-sm border-b border-zinc-950/10 pb-2 mb-3 mt-1">// CORPORATE BACKBONE (ROOPESH)</h3>
                        <p className="font-sans text-xs leading-relaxed font-semibold">
                          Compliance protocols, heavy-lifting financial closes, and invoicing structures.
                          Keep cashflow verified, retainers monitored, and local business deals locked in with clear UPI logs.
                        </p>
                      </div>
                      <span className="text-[8px] font-mono text-zinc-600 block text-right mt-4 font-bold">Owner: Roopesh • Ops Admin</span>
                    </motion.div>

                    {/* Note 4: Purple - Tech Setup */}
                    <motion.div 
                      whileHover={{ scale: 1.02, rotate: 1 }}
                      className="bg-purple-100/90 text-zinc-950 p-6 rounded-xl shadow-2xl transform rotate-[2deg] flex flex-col justify-between min-h-[220px] relative border-l-4 border-purple-400"
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-zinc-900/10 backdrop-blur-sm rounded" />
                      <div>
                        <h3 className="font-sans font-black uppercase tracking-wider text-sm border-b border-zinc-950/10 pb-2 mb-3 mt-1">// TECH ARCHITECTURE (PIYUSH)</h3>
                        <p className="font-sans text-xs leading-relaxed font-semibold">
                          Generative video integrations, prompt chains, database triggers.
                          Current: PBI backend flows (Script Agent, Speech Synthesis, Video Compiler) running in standard sandbox/lab.
                        </p>
                      </div>
                      <span className="text-[8px] font-mono text-zinc-600 block text-right mt-4 font-bold">Owner: Piyush • Tech Node</span>
                    </motion.div>

                  </div>
                </motion.div>
              )}

              {activeTab === "finance" && (
                <motion.div 
                   key="finance"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="bg-card/20 border border-white/10 rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-black uppercase tracking-widest mb-2">Finance & Billing Module</h2>
                  <p className="text-muted-foreground text-sm mb-8 border-b border-white/10 pb-4">Regulated by: Roopesh (Managing Director / CEO)</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
                       <span className="text-4xl font-black font-mono text-primary mb-2">₹--,---</span>
                       <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Monthly Recurring</span>
                    </div>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center">
                       <span className="text-4xl font-black font-mono text-white mb-2">--</span>
                       <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Active Retainers</span>
                    </div>
                  </div>

                  <div className="bg-black/30 p-6 rounded-xl border border-white/5 shadow-inner">
                    <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-white/50">Deal Flow Dashboard</h3>
                    <p className="text-xs text-muted-foreground italic">Connect payment gateway API / Invoicing software here to track live client billings.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "communications" && (
                <motion.div 
                   key="communications"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="bg-card/20 border border-white/10 rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-black uppercase tracking-widest mb-2">Client Networking & Ops</h2>
                  <p className="text-muted-foreground text-sm mb-8 border-b border-white/10 pb-4">Managed across Roopesh & Piyush parameters</p>
                  
                  <div className="space-y-4">
                     {/* Mock Client Lists */}
                     <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div>
                          <p className="font-bold text-white">HKD Network Webshow</p>
                          <p className="text-xs text-muted-foreground">In Production • Status: Greenlit</p>
                        </div>
                        <div className="text-xs font-bold uppercase tracking-widest text-green-500 bg-green-500/10 px-3 py-1 rounded">Active</div>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div>
                          <p className="font-bold text-white">Local Brand Retainers</p>
                          <p className="text-xs text-muted-foreground">TV³ Ads • Pitching Phase</p>
                        </div>
                        <div className="text-xs font-bold uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded">Negotiating</div>
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "tech" && (
                <motion.div 
                   key="tech"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="bg-card/20 border border-white/10 rounded-2xl p-8 space-y-6 text-left"
                >
                  <div className="border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-black uppercase tracking-widest text-primary">TV³ Infrastructure Pipeline</h2>
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-1">Live Connected Systems & Node Gateways</p>
                  </div>

                  {/* Flow Map Visualisation Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Node 1: Hostinger */}
                    <div className="bg-black/40 border border-white/5 hover:border-primary/20 p-5 rounded-2xl relative overflow-hidden group transition-all space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                            <Globe className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white">Hostinger Node</h4>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Domain & DNS Control</span>
                          </div>
                        </div>
                        <a 
                          href="https://hpanel.hostinger.com" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-primary transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <div className="space-y-2.5 text-xs border-t border-white/5 pt-3 font-mono">
                        <div>
                          <span className="text-[8px] text-indigo-400 uppercase tracking-widest block font-bold">// Abhi kya hua</span>
                          <p className="text-zinc-300 text-[11px] leading-relaxed">tvstudios.site Domain verification stable aur SSL active set up ho chuka hai.</p>
                        </div>
                        <div>
                          <span className="text-[8px] text-zinc-500 uppercase tracking-widest block font-bold">// Aage kya target</span>
                          <p className="text-zinc-400 text-[10px] leading-relaxed">PBI functions ke liye automated subdomain routing dynamic banana.</p>
                        </div>
                      </div>
                    </div>

                    {/* Node 2: Vercel */}
                    <div className="bg-black/40 border border-white/5 hover:border-primary/20 p-5 rounded-2xl relative overflow-hidden group transition-all space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-zinc-100/10 border border-zinc-100/30 flex items-center justify-center text-white font-bold">
                            <Server className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white">Vercel Production</h4>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Hosting & Serverless APIs</span>
                          </div>
                        </div>
                        <a 
                          href="https://vercel.com" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-primary transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <div className="space-y-2.5 text-xs border-t border-white/5 pt-3 font-mono">
                        <div>
                          <span className="text-[8px] text-zinc-300 uppercase tracking-widest block font-bold">// Abhi kya hua</span>
                          <p className="text-zinc-300 text-[11px] leading-relaxed">Auto git pipeline set hai, push hotey hi changes live ho jate hain.</p>
                        </div>
                        <div>
                          <span className="text-[8px] text-zinc-500 uppercase tracking-widest block font-bold">// Aage kya target</span>
                          <p className="text-zinc-400 text-[10px] leading-relaxed">PBI script compiler aur dynamic voice synthesis APIs stabilize karna.</p>
                        </div>
                      </div>
                    </div>

                    {/* Node 3: Supabase */}
                    <div className="bg-black/40 border border-white/5 hover:border-primary/20 p-5 rounded-2xl relative overflow-hidden group transition-all space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                            <Database className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white">Supabase Cloud</h4>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">DB & Asset Storage</span>
                          </div>
                        </div>
                        <a 
                          href="https://supabase.com/dashboard" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-primary transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <div className="space-y-2.5 text-xs border-t border-white/5 pt-3 font-mono">
                        <div>
                          <span className="text-[8px] text-emerald-400 uppercase tracking-widest block font-bold">// Abhi kya hua</span>
                          <p className="text-zinc-300 text-[11px] leading-relaxed">Intake और leads database active hain. PBI Waitlist tag mapping configure kar di hai.</p>
                        </div>
                        <div>
                          <span className="text-[8px] text-zinc-500 uppercase tracking-widest block font-bold">// Aage kya target</span>
                          <p className="text-zinc-400 text-[10px] leading-relaxed">PBI generated videos storage bucket create karna aur policy lagana.</p>
                        </div>
                      </div>
                    </div>

                    {/* Node 4: Resend */}
                    <div className="bg-black/40 border border-white/5 hover:border-primary/20 p-5 rounded-2xl relative overflow-hidden group transition-all space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white">Resend Email Gateway</h4>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Email System</span>
                          </div>
                        </div>
                        <a 
                          href="https://resend.com" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-primary transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <div className="space-y-2.5 text-xs border-t border-white/5 pt-3 font-mono">
                        <div>
                          <span className="text-[8px] text-rose-400 uppercase tracking-widest block font-bold">// Abhi kya hua</span>
                          <p className="text-zinc-300 text-[11px] leading-relaxed">Admin dual alerts chal rahe hain. Sandbox check mode fully functional hai.</p>
                        </div>
                        <div>
                          <span className="text-[8px] text-zinc-500 uppercase tracking-widest block font-bold">// Aage kya target</span>
                          <p className="text-zinc-400 text-[10px] leading-relaxed">Custom professional domain verified emails bypass enable karna.</p>
                        </div>
                      </div>
                    </div>

                    {/* Node 5: Instagram Target */}
                    <div className="bg-black/40 border border-white/5 hover:border-primary/20 p-5 rounded-2xl relative overflow-hidden group transition-all space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 font-bold">
                            <Share2 className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white">Meta API Node</h4>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">PBI Instagram Publisher</span>
                          </div>
                        </div>
                        <a 
                          href="https://developers.facebook.com" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-primary transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <div className="space-y-2.5 text-xs border-t border-white/5 pt-3 font-mono">
                        <div>
                          <span className="text-[8px] text-pink-400 uppercase tracking-widest block font-bold">// Abhi kya hua</span>
                          <p className="text-zinc-300 text-[11px] leading-relaxed">Graph API console setups linked aur mock test accounts generate kar diye hain.</p>
                        </div>
                        <div>
                          <span className="text-[8px] text-zinc-500 uppercase tracking-widest block font-bold">// Aage kya target</span>
                          <p className="text-zinc-400 text-[10px] leading-relaxed">Auto reels validation and long-term user token generation scripts implement karna.</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {activeTab === "intake" && (
                <motion.div 
                   key="intake"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="bg-card/20 border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 mb-6 gap-3">
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-widest text-white">Scout Intake Portal</h2>
                      <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-1">Screened Operative Applicants</p>
                    </div>
                    {intakeApps.length > 0 && (
                      <button 
                        onClick={clearApplications}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-950/40 hover:bg-red-900 border border-red-500/30 text-red-500 rounded-lg text-xs uppercase font-bold tracking-widest transition-all font-mono"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Clear Records
                      </button>
                    )}
                  </div>

                  {intakeApps.length === 0 ? (
                    <div className="py-12 text-center text-zinc-600 font-mono text-xs uppercase tracking-widest border border-white/5 rounded-xl bg-black/20">
                      [ NO OPERATIVE APPLICATIONS ON REGISTRY ]
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                      {intakeApps.map((app, idx) => (
                        <div key={app.id || idx} className="border border-white/10 bg-black/40 p-6 rounded-2xl relative overflow-hidden font-mono text-left">
                          <div className="absolute top-4 right-4 text-[9px] text-zinc-600">
                            {app.timestamp}
                          </div>

                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Applicant Profile #{idx + 1}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">Name</span>
                              <span className="text-white font-bold">{app.name}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">Contact</span>
                              <span className="text-white font-bold">{app.contact}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">Target Role</span>
                              <span className="text-[hsl(43_72%_55%)] font-black uppercase">{app.primaryRole}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">Experience Level</span>
                              <span className="text-zinc-300 font-bold uppercase">{app.experience || "None specified"}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">Portfolio / Reel Link</span>
                              {app.portfolio ? (
                                <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
                                  {app.portfolio}
                                </a>
                              ) : (
                                <span className="text-zinc-600">N/A</span>
                              )}
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">Resume File</span>
                              {app.resumeData ? (
                                <a 
                                  href={app.resumeData.dataUrl} 
                                  download={app.resumeData.name}
                                  className="text-[hsl(43_72%_55%)] hover:underline flex items-center gap-1 font-bold"
                                >
                                  Download {app.resumeData.name}
                                </a>
                              ) : (
                                <span className="text-zinc-600">No upload</span>
                              )}
                            </div>
                          </div>

                          <div className="border-t border-white/5 pt-4 mt-4 text-xs space-y-2">
                            {app.primaryRole === "editor" && (
                              <>
                                <div>
                                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">Software Mastery</span>
                                  <span className="text-zinc-300">{app.software && app.software.length > 0 ? app.software.join(", ") : "None specified"}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">Turnaround Time</span>
                                  <span className="text-zinc-300">{app.speed || "None specified"}</span>
                                </div>
                              </>
                            )}

                            {(app.primaryRole === "editor" || app.primaryRole === "director") && (
                              <div>
                                <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">Speciality Style</span>
                                <span className="text-zinc-300">{app.style || "None specified"}</span>
                              </div>
                            )}

                            {app.customAnswer1 && (
                              <div>
                                <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">
                                  {app.primaryRole === "director" ? "Staging & Pre-Production Focus" :
                                   app.primaryRole === "production" ? "Management Platform Mastery" :
                                   app.primaryRole === "cinematographer" ? "Camera Rig Mastery" :
                                   app.primaryRole === "music" ? "Primary DAW" :
                                   app.primaryRole === "dj" ? "Live Performance Focus" :
                                   app.primaryRole === "actor" || app.primaryRole === "singer" ? "Style & Range" : "Technical Parameter"}
                                </span>
                                <span className="text-zinc-300">{app.customAnswer1}</span>
                              </div>
                            )}

                            {app.customAnswer2 && (
                              <div>
                                <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">Technical Metric</span>
                                <span className="text-zinc-300">{app.customAnswer2}</span>
                              </div>
                            )}
                          </div>

                          {/* Aspiration Screening answers */}
                          <div className="border-t border-white/5 pt-4 mt-4 text-xs space-y-3 text-left">
                            <h5 className="text-[10px] text-[hsl(43_72%_55%)] font-black uppercase tracking-widest">// ASPIRATION & ALIGNMENT CASE FILE</h5>
                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">1. Why this creative field?</span>
                              <p className="text-zinc-300 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">{app.whyThisField || "N/A"}</p>
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">2. Ultimate creative goal?</span>
                              <p className="text-zinc-300 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">{app.ultimateGoal || "N/A"}</p>
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-0.5">3. Why TV³ Studios specifically?</span>
                              <p className="text-zinc-300 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">{app.whyTv3 || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "leads" && (
                <motion.div 
                   key="leads"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="bg-card/20 border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-black uppercase tracking-widest">WhatsApp Lead Logs</h2>
                    {whatsappLeads.length > 0 && (
                      <button
                        onClick={clearLeads}
                        className="flex items-center gap-2 bg-red-950/40 border border-red-800/30 hover:bg-red-900/40 text-red-400 font-mono text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Clear All Logs
                      </button>
                    )}
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {whatsappLeads.map((lead) => (
                      <div key={lead.id} className="bg-zinc-950/40 border border-white/5 p-5 rounded-xl space-y-3 relative overflow-hidden group hover:border-primary/20 transition-all text-left">
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                            Lead ID: {lead.id}
                          </span>
                          <span className="text-[8px] font-mono text-primary uppercase tracking-widest font-bold">
                            {new Date(lead.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="h-px bg-white/5 w-full" />
                        <div>
                          <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest block mb-1">Inquiry Content</span>
                          <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed font-mono bg-black/40 border border-white/5 p-4 rounded-lg text-justify">
                            {lead.message}
                          </p>
                        </div>
                        <div className="flex justify-between items-center text-[7px] font-mono text-zinc-500 uppercase tracking-widest pt-2">
                          <span>Routed To: {lead.target_number} (Manager)</span>
                          <span>Bypassed Status: CC Owner Verified</span>
                        </div>
                      </div>
                    ))}

                    {whatsappLeads.length === 0 && (
                      <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl">
                        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">No WhatsApp lead logs available</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "branding" && (
                <motion.div 
                   key="branding"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="bg-card/20 border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-black uppercase tracking-widest">Branding Profile Submissions</h2>
                    {brandingIntakes.length > 0 && (
                      <button
                        onClick={clearBranding}
                        className="flex items-center gap-2 bg-red-950/40 border border-red-800/30 hover:bg-red-900/40 text-red-400 font-mono text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Clear All Submissions
                      </button>
                    )}
                  </div>

                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {brandingIntakes.map((intake) => (
                      <div key={intake.id} className="bg-zinc-950/40 border border-white/5 p-6 rounded-xl space-y-4 relative overflow-hidden group hover:border-primary/20 transition-all text-left">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold block">
                              {intake.business_name}
                            </span>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5 block">
                              Ingest ID: {intake.id} • {intake.plan}
                            </span>
                          </div>
                          <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">
                            {new Date(intake.timestamp).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="h-px bg-white/5 w-full" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest block mb-0.5">Contact Email</span>
                            <span className="text-zinc-300 font-mono">{intake.contact_email}</span>
                          </div>
                          <div>
                            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest block mb-0.5">Brand Colors</span>
                            <span className="text-zinc-300 font-mono">{intake.brand_colors || "None specified"}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest block mb-0.5">Logo Specifications</span>
                            <p className="text-zinc-300 bg-white/[0.01] p-3 rounded-lg border border-white/5 whitespace-pre-line font-mono">{intake.logo_details || "N/A"}</p>
                          </div>
                          <div>
                            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest block mb-0.5">Core Product / What they sell</span>
                            <p className="text-zinc-300 bg-white/[0.01] p-3 rounded-lg border border-white/5 whitespace-pre-line font-mono">{intake.product_details || "N/A"}</p>
                          </div>
                          <div>
                            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest block mb-0.5">Target Audience</span>
                            <p className="text-zinc-300 bg-white/[0.01] p-3 rounded-lg border border-white/5 whitespace-pre-line font-mono">{intake.audience_details || "N/A"}</p>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-3 mt-3 flex justify-between items-center text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                          <span className="text-primary font-bold">UPI Note Reference: {intake.payment_ref}</span>
                          <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold uppercase tracking-wider">
                            PBI: {intake.campaign_status || "BETA QUEUE"}
                          </span>
                        </div>
                      </div>
                    ))}

                    {brandingIntakes.length === 0 && (
                      <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl">
                        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">No brand profile submissions available</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "service_leads" && (
                <motion.div 
                   key="service_leads"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="bg-card/20 border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-black uppercase tracking-widest">Service Leads Submissions</h2>
                    {serviceLeads.length > 0 && (
                      <button
                        onClick={clearServiceLeads}
                        className="flex items-center gap-2 bg-red-950/40 border border-red-800/30 hover:bg-red-900/40 text-red-400 font-mono text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Clear All Service Leads
                      </button>
                    )}
                  </div>

                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {serviceLeads.map((lead) => (
                      <div key={lead.id} className="bg-zinc-950/40 border border-white/5 p-6 rounded-xl space-y-4 relative overflow-hidden group hover:border-primary/20 transition-all text-left">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold block">
                              {lead.category}
                            </span>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5 block">
                              Lead ID: {lead.id} • Score: {lead.score}
                            </span>
                          </div>
                          <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">
                            {new Date(lead.timestamp).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="h-px bg-white/5 w-full" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                          <div>
                            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest block mb-0.5">Client Email</span>
                            <span className="text-zinc-300">{lead.email}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest block mb-0.5">Project Notes</span>
                            <p className="text-zinc-300 bg-white/[0.01] p-3 rounded-lg border border-white/5 whitespace-pre-line font-mono">{lead.notes || "None specified"}</p>
                          </div>
                          <div>
                            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest block mb-0.5">Parameters Breakdown</span>
                            <p className="text-zinc-300 bg-white/[0.01] p-3 rounded-lg border border-white/5 whitespace-pre-line font-mono">{lead.fader_breakdown || "N/A"}</p>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-3 mt-3 flex justify-between items-center text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                          <span className="text-[#D4AF37]">Lead Registered Successfully</span>
                          <span>Autopilot Ingestion Buffer</span>
                        </div>
                      </div>
                    ))}

                    {serviceLeads.length === 0 && (
                      <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl">
                        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">No service leads available</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "pbi_lab" && (
                <motion.div 
                   key="pbi_lab"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="bg-card/20 border border-white/10 rounded-2xl p-8 space-y-6"
                >
                  <div className="border-b border-white/10 pb-4 text-left">
                    <h2 className="text-2xl font-black uppercase tracking-widest text-amber-500">PBI Lab Terminal</h2>
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-1">Autonomous Content Simulation & Pilot Engine</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Panel: Configuration Form */}
                    <div className="lg:col-span-5 space-y-4 text-left">
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Select Active Brand Profile</label>
                        <select
                          value={pbiSelectedBrand}
                          onChange={(e) => setPbiSelectedBrand(e.target.value)}
                          className="w-full bg-[#111114] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors font-mono"
                        >
                          <option value="">-- CHOOSE BRAND --</option>
                          <option value="MOCK-PILOT-99">TV³ Studios (Internal Pilot Node)</option>
                          {brandingIntakes.map((intake) => (
                            <option key={intake.id} value={intake.id}>
                              {intake.business_name} ({intake.plan})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Content Format</label>
                          <select
                            value={pbiContentType}
                            onChange={(e) => setPbiContentType(e.target.value)}
                            className="w-full bg-[#111114] border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 transition-colors font-mono"
                          >
                            <option value="Podcast Reel (Video)">Podcast Reel (Video)</option>
                            <option value="Branded Photo Post">Branded Photo Post</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Output Language</label>
                          <select
                            value={pbiLanguage}
                            onChange={(e) => setPbiLanguage(e.target.value)}
                            className="w-full bg-[#111114] border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 transition-colors font-mono"
                          >
                            <option value="Hinglish">Hinglish (HIN+ENG)</option>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi (हिंदी)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Latest Company News / Update (Input Source)</label>
                        <textarea
                          rows={4}
                          value={pbiUpdateText}
                          onChange={(e) => setPbiUpdateText(e.target.value)}
                          placeholder="What did the brand achieve or update? e.g. We just crossed 500 sales, or here is our website link Acme.com, or our founder just wrote a new book."
                          className="w-full bg-[#111114] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors font-mono resize-none"
                        />
                      </div>

                      <button
                        onClick={handleRunPbiAgent}
                        disabled={pbiLoading}
                        className="w-full py-4 rounded-xl bg-amber-500 hover:bg-white text-black font-mono text-xs font-black uppercase tracking-widest transition-all shadow-[0_4px_25px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
                      >
                        {pbiLoading ? "Executing PBI Agent..." : "Run PBI Scriptwriter"}
                        <Cpu className="w-4 h-4 animate-pulse" />
                      </button>

                      {pbiError && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl p-4 text-xs font-mono text-center">
                          {pbiError}
                        </div>
                      )}
                    </div>

                    {/* Right Panel: Output Generation Viewer */}
                    <div className="lg:col-span-7 border border-white/5 bg-black/40 rounded-3xl p-6 flex flex-col justify-start space-y-6 min-h-[400px]">
                      {pbiLoading ? (
                        <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                          <Cpu className="w-10 h-10 text-amber-500 animate-spin" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 animate-pulse">Processing brand matrix dialogue...</span>
                        </div>
                      ) : pbiResponse ? (
                        <div className="space-y-6 text-left overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                          {/* Reasoning Strategy */}
                          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 space-y-2">
                            <span className="font-mono text-[8px] uppercase tracking-widest text-amber-500 font-bold block">// Agentic Reasoning Decision</span>
                            <p className="text-[11px] text-zinc-300 leading-relaxed font-mono">{pbiResponse.decisionLogic}</p>
                          </div>

                          {/* Interactive Conversation Transcript */}
                          {pbiResponse.contentType !== "Branded Photo Post" && (
                            <div className="space-y-4">
                              <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block font-bold">// Simulated Podcast Dialogue</span>
                              
                              {pbiResponse.conversation && pbiResponse.conversation.map((line: any, idx: number) => {
                                const isHostA = line.host === "A";
                                return (
                                  <div key={idx} className="space-y-2 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                    <div className={`flex items-start gap-2 ${isHostA ? '' : 'flex-row-reverse'}`}>
                                      {/* Profile Icon */}
                                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${isHostA ? 'border-amber-500/30 bg-amber-500/10 text-amber-500' : 'border-zinc-500/30 bg-zinc-800 text-white'}`}>
                                        {line.host}
                                      </div>
                                      {/* Text Balloon */}
                                      <div className={`p-3 rounded-2xl text-xs max-w-[80%] font-body ${isHostA ? 'bg-amber-500/10 border border-amber-500/20 text-zinc-100 rounded-tl-none' : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tr-none'}`}>
                                        {line.dialogue}
                                      </div>
                                    </div>
                                    
                                    {/* Dynamic visual + audio asset generator inline previews */}
                                    <div className={`flex items-start gap-3 ${isHostA ? 'pl-8' : 'pr-8 flex-row-reverse text-right'}`}>
                                      {line.imageUrl && (
                                        <a href={line.imageUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 relative group block overflow-hidden rounded-lg">
                                          <img 
                                            src={line.imageUrl} 
                                            alt="Visual Frame SDXL" 
                                            className="w-14 h-24 object-cover rounded-lg border border-white/10 hover:border-amber-500/50 transition-all group-hover:scale-105 duration-300"
                                          />
                                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-[7px] font-mono text-white font-bold uppercase tracking-wider">HD</span>
                                          </div>
                                        </a>
                                      )}
                                      
                                      <div className="space-y-2 max-w-[70%]">
                                        <div className="text-[8px] text-zinc-500 font-mono italic">
                                          <span className="font-bold uppercase tracking-wider text-[7px] text-zinc-600 block not-italic">// Visual Frame SDXL Prompt</span>
                                          "{line.imagePrompt}"
                                        </div>
                                        
                                        {line.audioUrl && (
                                          <audio 
                                            src={line.audioUrl} 
                                            controls 
                                            className="w-full max-w-[200px] h-6 rounded bg-[#111114] border border-white/5 opacity-70 hover:opacity-100 transition-opacity block"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Social media caption */}
                          <div className="space-y-2 border-t border-white/5 pt-4">
                            <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block font-bold">// Caption & Hashtags</span>
                            <textarea
                              readOnly
                              rows={3}
                              value={pbiResponse.caption}
                              className="w-full bg-[#111114] border border-white/5 rounded-xl p-3 text-xs text-zinc-300 font-mono resize-none focus:outline-none"
                            />

                            {/* Video Compiler Simulation */}
                            {pbiResponse.contentType !== "Branded Photo Post" && (
                              <div className="space-y-4 border-t border-white/5 pt-4">
                                <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block font-bold">// PBI Video Compiler Engine</span>
                                
                                {!pbiCompiling && !pbiVideoUrl && (
                                  <button
                                    onClick={handleCompileVideo}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-mono text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-amber-500/20"
                                  >
                                    Compile Reel Video (Beta)
                                  </button>
                                )}

                                {pbiCompiling && (
                                  <div className="bg-[#111114] border border-white/5 p-4 rounded-xl space-y-3 font-mono">
                                    <div className="flex justify-between items-center text-[10px]">
                                      <span className="text-amber-500 font-bold animate-pulse">{pbiCompileStep}</span>
                                      <span className="text-zinc-500">Processing...</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                      <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full animate-pulse w-3/4" />
                                    </div>
                                  </div>
                                )}

                                {pbiVideoUrl && (
                                  <div className="bg-black/50 border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-center w-full">
                                    
                                    {/* 9:16 Vertical Interactive Reel Simulator Screen */}
                                    <div className="w-52 h-88 bg-zinc-950 border-2 border-white/20 rounded-[24px] overflow-hidden relative shadow-2xl shrink-0 flex flex-col justify-between group">
                                      {/* Background Image of the active conversation turn */}
                                      <img 
                                        src={pbiResponse.conversation[currentReelIndex]?.imageUrl} 
                                        alt="Reel active visual frame" 
                                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

                                      {/* Top Row: Brand Info & Active Host Badge */}
                                      <div className="relative z-10 p-3 flex justify-between items-center w-full">
                                        <span className="text-[7px] font-mono bg-black/60 text-amber-500 font-bold px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest">
                                          PBI Simulator
                                        </span>
                                        <span className={`text-[7px] font-mono font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${pbiResponse.conversation[currentReelIndex]?.host === "A" ? 'bg-amber-500 text-black' : 'bg-white text-black'}`}>
                                          Host {pbiResponse.conversation[currentReelIndex]?.host}
                                        </span>
                                      </div>

                                      {/* Audio playback engine speeded up to 1.2x for natural fast pacing */}
                                      <audio 
                                        src={pbiResponse.conversation[currentReelIndex]?.audioUrl} 
                                        autoPlay={reelPlaying}
                                        ref={(el) => {
                                          if (el) {
                                            el.playbackRate = 1.2; // Speed up Google Translate voice by 20% to sound natural
                                            if (reelPlaying) {
                                              el.play().catch(() => {});
                                            } else {
                                              el.pause();
                                            }
                                          }
                                        }}
                                        onEnded={() => {
                                          if (currentReelIndex < pbiResponse.conversation.length - 1) {
                                            setCurrentReelIndex(prev => prev + 1);
                                          } else {
                                            setCurrentReelIndex(0);
                                            setReelPlaying(false);
                                          }
                                        }}
                                      />

                                      {/* Center: Play/Pause Big overlay state button */}
                                      <button 
                                        onClick={() => setReelPlaying(!reelPlaying)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                      >
                                        <div className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-black transition-colors cursor-pointer">
                                          {reelPlaying ? "Pause" : "Play"}
                                        </div>
                                      </button>

                                      {/* Bottom Overlay Subtitles (captions) */}
                                      <div className="relative z-10 p-3 mb-3 w-full text-center">
                                        <div className="bg-black/60 backdrop-blur-md border border-white/5 p-2 rounded-xl text-center shadow-lg">
                                          <p className="text-[9px] text-white font-extrabold font-sans leading-relaxed tracking-wide">
                                            {pbiResponse.conversation[currentReelIndex]?.dialogue}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Audio progress segment indicators */}
                                      <div className="absolute top-1 inset-x-2 flex gap-1 z-20">
                                        {pbiResponse.conversation.map((_: any, idx: number) => (
                                          <div 
                                            key={idx} 
                                            className={`h-0.5 rounded-full flex-grow transition-all duration-300 ${idx === currentReelIndex ? 'bg-amber-500' : idx < currentReelIndex ? 'bg-zinc-400' : 'bg-zinc-800'}`}
                                          />
                                        ))}
                                      </div>
                                    </div>

                                    {/* Sidebar: Details & Webhook trigger control */}
                                    <div className="space-y-4 text-left flex-grow">
                                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[8px] font-bold uppercase tracking-wider block w-fit">
                                        Status: SIMULATOR ACTIVE 🎥
                                      </span>
                                      <h5 className="font-bold text-sm text-white">Reel Timeline Compiled</h5>
                                      <p className="text-[10px] text-zinc-400 leading-relaxed font-mono">
                                        * **Visual Generation**: Flux model square-vertical ratio.<br/>
                                        * **Speech Pace**: Accelerated by 1.20x to sound natural.<br/>
                                        * **Overlay subtitles**: Synced dialogue captions.
                                      </p>
                                      
                                      <div className="flex flex-col gap-2 pt-2">
                                        <button 
                                          onClick={() => setReelPlaying(!reelPlaying)}
                                          className="py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-widest text-center hover:bg-white/10 transition-colors cursor-pointer"
                                        >
                                          {reelPlaying ? "Pause Playback" : "Play Reel (Simulate)"}
                                        </button>
                                        <button 
                                          onClick={() => alert("Reel sent to Discord Approval Webhook!")}
                                          className="py-2.5 px-4 rounded-lg bg-amber-500 text-black font-mono text-[10px] font-black uppercase tracking-widest text-center hover:bg-white transition-colors cursor-pointer"
                                        >
                                          Dispatch to Discord
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Branded Graphic Poster Preview */}
                            {pbiResponse.contentType === "Branded Photo Post" && (
                              <div className="space-y-4 border-t border-white/5 pt-4">
                                <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block font-bold">// Branded Graphic Post Preview</span>
                                
                                {/* 1:1 Aspect Ratio Card Preview */}
                                <div className="w-full max-w-sm mx-auto aspect-square bg-[#111114] border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl group">
                                  <img 
                                    src={pbiResponse.imageUrl} 
                                    alt="AI Branded Post Graphic" 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                  
                                  {/* Overlay Bottom Banner */}
                                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-6 text-left flex flex-col justify-end">
                                    {/* Brand Accent Bar */}
                                    <div className="w-16 h-1 bg-amber-500 rounded mb-2" style={{
                                      backgroundColor: (brandingIntakes.find(i => i.id === pbiSelectedBrand)?.brand_colors?.split(",")[0]?.trim() || "#D4AF37")
                                    }} />
                                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase mb-1" style={{
                                      color: (brandingIntakes.find(i => i.id === pbiSelectedBrand)?.brand_colors?.split(",")[0]?.trim() || "#D4AF37")
                                    }}>
                                      {brandingIntakes.find(i => i.id === pbiSelectedBrand)?.business_name || "TV³ Studios"}
                                    </span>
                                    <h4 className="text-xl font-black text-white uppercase tracking-wide leading-tight mb-1">
                                      {pbiResponse.title || "ANNOUNCEMENT"}
                                    </h4>
                                    <p className="text-[10px] text-zinc-400 font-mono italic">
                                      {pbiResponse.tagline || "Powered by TV³ Studios"}
                                    </p>
                                  </div>
                                </div>

                                {/* Client Download Pack Actions */}
                                <div className="space-y-2 pt-2">
                                  {pbiResponse.sceneType && (
                                    <div className="flex justify-between items-center text-[9px] font-mono px-1">
                                      <span className="text-zinc-500">SCENE TYPE:</span>
                                      <span className="text-amber-400 font-bold uppercase">{pbiResponse.sceneType}</span>
                                    </div>
                                  )}

                                  <button
                                    onClick={handleDownloadClientPack}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-black font-mono text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_25px_rgba(245,158,11,0.25)] hover:scale-[1.01]"
                                  >
                                    Download Complete Client Pack (.PNG + .TXT)
                                  </button>

                                  <div className="grid grid-cols-2 gap-2">
                                    <button
                                      onClick={handleDownloadBrandedPhoto}
                                      className="py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                    >
                                      Download PNG Only
                                    </button>
                                    <button
                                      onClick={handleDownloadCaptionTxt}
                                      className="py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                    >
                                      Download Caption (.TXT)
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center space-y-2">
                          <Cpu className="w-8 h-8 text-zinc-700 animate-pulse" />
                          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">PBI Agent Inactive</span>
                          <p className="text-[10px] text-zinc-500 max-w-[200px] leading-relaxed">Select a brand, configure variables, and run the simulator to preview output.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "dev_logs" && (
                <motion.div 
                   key="dev_logs"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="bg-card/20 border border-white/10 rounded-2xl p-8 space-y-6 text-left"
                >
                  <div className="border-b border-white/10 pb-4 flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-widest text-emerald-500">Development Logs</h2>
                      <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mt-1">Workspace Status & System Deployment Log</p>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded font-bold uppercase tracking-wider">
                      Active: PBI Engine Build
                    </span>
                  </div>

                  {/* Terminal Screen */}
                  <div className="bg-[#050508] border border-white/5 rounded-2xl p-6 font-mono text-xs space-y-6 text-zinc-300 shadow-inner">
                    
                    {/* Workspace Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-white/5 pb-4">
                      <div>
                        <span className="text-zinc-600 uppercase text-[9px] tracking-wider block font-bold">Node Version</span>
                        <span className="text-emerald-400 font-bold">v24.14.1</span>
                      </div>
                      <div>
                        <span className="text-zinc-600 uppercase text-[9px] tracking-wider block font-bold">Deployment Platform</span>
                        <span className="text-white">Vercel Production</span>
                      </div>
                      <div>
                        <span className="text-zinc-600 uppercase text-[9px] tracking-wider block font-bold">Active Branch</span>
                        <span className="text-white">origin/main (Synced)</span>
                      </div>
                    </div>

                    {/* Milestones Checklist */}
                    <div className="space-y-3">
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">// FEATURE DEPLOYMENT ROADMAP</span>
                      
                      <div className="space-y-2">
                        {/* Completed */}
                        <div className="flex items-start gap-2.5">
                          <span className="text-emerald-500 font-bold shrink-0">[✔]</span>
                          <div>
                            <span className="text-white font-bold">Gated Founder Wiki Consolidation</span>
                            <span className="text-[10px] text-zinc-500 block">Moved wiki inline on /team page with local storage persistence.</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-emerald-500 font-bold shrink-0">[✔]</span>
                          <div>
                            <span className="text-white font-bold">Disposable Email Blocker</span>
                            <span className="text-[10px] text-zinc-500 block">Rejects temporary/burner email inputs to preserve intake database health.</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-emerald-500 font-bold shrink-0">[✔]</span>
                          <div>
                            <span className="text-white font-bold">PBI Waitlist DB Schema Tagging</span>
                            <span className="text-[10px] text-zinc-500 block">Marks new intakes with status="BETA QUEUE" and displays colored waitlist badges.</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-emerald-500 font-bold shrink-0">[✔]</span>
                          <div>
                            <span className="text-white font-bold">PBI Scriptwriter Engine (Phase 1)</span>
                            <span className="text-[10px] text-zinc-500 block">Developed /api/pbi/agent to generate double-host podcast dialogues in Hinglish.</span>
                          </div>
                        </div>

                        {/* In Progress / Next */}
                        <div className="flex items-start gap-2.5 pt-2 border-t border-white/5">
                          <span className="text-amber-500 font-bold shrink-0">[/]</span>
                          <div>
                            <span className="text-white font-bold">Dual-Voice Audio Synthesizer (Phase 2)</span>
                            <span className="text-[10px] text-zinc-500 block">Pitch/rate shifting to distinguish Host A and Host B audio generation.</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-zinc-600 font-bold shrink-0">[ ]</span>
                          <div>
                            <span className="text-zinc-400 font-bold">FFmpeg Serverless Reel Compiler (Phase 3)</span>
                            <span className="text-[10px] text-zinc-500 block">Merging SDXL background visuals with podcast audio into vertical video.</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <span className="text-zinc-600 font-bold shrink-0">[ ]</span>
                          <div>
                            <span className="text-zinc-400 font-bold">Discord Callback Approval Webhooks (Phase 4)</span>
                            <span className="text-[10px] text-zinc-500 block">Enables draft publishing approvals with a single button click.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Git Commit Log Timeline */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">// RECENT ENVIRONMENT SHIPPINGS</span>
                      
                      <div className="space-y-2 text-[10px] font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">[fe7a96a]</span>
                          <span className="text-zinc-500">2026-07-18</span>
                          <span className="text-zinc-300">feat: implement private PBI Lab simulation tab inside AdminVault dashboard</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">[3b23511]</span>
                          <span className="text-zinc-500">2026-07-18</span>
                          <span className="text-zinc-300">feat: implement first backend agent module for PBI conversational scripting</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">[353f807]</span>
                          <span className="text-zinc-500">2026-07-17</span>
                          <span className="text-zinc-300">feat: track PBI queue onboarding status in Supabase and render beta badges</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVault;
