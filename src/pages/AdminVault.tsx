import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Lock, ShieldAlert, Cpu, Database, Users, Banknote, Navigation, FileText, Trash2 } from "lucide-react";

const AdminVault = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("strategy");
  const [intakeApps, setIntakeApps] = useState<any[]>([]);

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
            return;
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

    loadApplications();
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

            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminVault;
