import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Lock, ShieldAlert, Cpu, Database, Users, Banknote, Navigation, FileText, Trash2, MessageSquare, Sparkles, Terminal } from "lucide-react";

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
                   className="bg-card/20 border border-white/10 rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Internal Master Strategy</h2>
                  
                  <div className="space-y-8">
                    <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500 border border-red-500/50 px-2 py-1 rounded">Top Secret</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">Project: AI Automated Channels</h3>
                      <p className="text-primary font-mono text-xs mb-4">Status: IN DEVELOPMENT • Coming Soon</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        The ultimate incomeization strategy. Rather than purely serving external clients, TV³ Studios is secretly building pipelines for fully automated, AI-driven digital entertainment channels. 
                      </p>
                      <ul className="text-sm text-white/80 space-y-2 list-disc list-inside">
                        <li>Infinite content generation engine.</li>
                        <li>Passive algorithmic digital income.</li>
                        <li>Circumvents traditional human resource bottlenecks.</li>
                      </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-2">Architectural Divisions</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>Artistic Directives (Rohit):</strong> Story scaling, brand aesthetics, algorithm manipulation via narrative.<br/><br/>
                        <strong>Corporate Backbone (Roopesh):</strong> Structural compliance, heavy-lifting financial closing, operations.<br/><br/>
                        <strong>Tech Infrastructure (Piyush):</strong> Prompt chaining pipelines, generative video integrations, TALES TECH MSME ops.
                      </p>
                    </div>
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
                   className="bg-card/20 border border-white/10 rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-black uppercase tracking-widest mb-2">Tales Tech Company</h2>
                  <p className="text-muted-foreground text-sm mb-8 border-b border-white/10 pb-4">MSME Platform Regulated by: Piyush (Tech Gig)</p>
                  
                  <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold mb-2">MBBSEEE Organization Backend</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Pansemal, MP Division. Managing local talent hunts, rapid app building pipelines, and scaling webspaces tailored for fast-growth markets.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center text-sm font-bold text-white/70">
                      App Development Pipeline
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center text-sm font-bold text-white/70">
                      Webspace CMS
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
                          <label className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Content Angle</label>
                          <select
                            value={pbiContentType}
                            onChange={(e) => setPbiContentType(e.target.value)}
                            className="w-full bg-[#111114] border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 transition-colors font-mono"
                          >
                            <option value="Technical Share">Technical Share</option>
                            <option value="News">News & Updates</option>
                            <option value="Achievement">Achievement</option>
                            <option value="Q&A">Q&A Dialogue</option>
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
                          <div className="space-y-4">
                            <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block font-bold">// Simulated Podcast Dialogue</span>
                            
                            {pbiResponse.conversation && pbiResponse.conversation.map((line: any, idx: number) => {
                              const isHostA = line.host === "A";
                              return (
                                <div key={idx} className="space-y-1.5">
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
                                  
                                  {/* Stable Diffusion Visual prompt matching this line */}
                                  <div className={`text-[8px] text-zinc-500 font-mono italic max-w-[80%] ${isHostA ? 'pl-8' : 'pr-8 text-right ml-auto'}`}>
                                    <span className="font-bold uppercase tracking-wider text-[7px] text-zinc-600 block not-italic">// Visual Frame SDXL Prompts</span>
                                    "{line.imagePrompt}"
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Social media caption */}
                          <div className="space-y-2 border-t border-white/5 pt-4">
                            <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block font-bold">// Caption & Hashtags</span>
                            <textarea
                              readOnly
                              rows={3}
                              value={pbiResponse.caption}
                              className="w-full bg-[#111114] border border-white/5 rounded-xl p-3 text-xs text-zinc-300 font-mono resize-none focus:outline-none"
                            />
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
