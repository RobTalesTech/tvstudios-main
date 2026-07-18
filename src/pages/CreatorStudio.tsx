import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square, 
  ChevronRight, 
  Calendar, 
  Youtube, 
  Music, 
  Briefcase, 
  FileText, 
  AlertCircle 
} from "lucide-react";

export default function CreatorStudio() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("creator_studio_auth") === "true";
  });
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("tvkd");

  // TVKD States
  const [tvkdIdeas, setTvkdIdeas] = useState<string[]>(() => {
    const saved = localStorage.getItem("tvkd_ideas");
    return saved ? JSON.parse(saved) : [
      "Khandeshi Village Comedy Sketch",
      "Local slang challenge video",
      "Traditional Khandeshi food vlog",
      "Folk story narration with music"
    ];
  });
  const [newIdea, setNewIdea] = useState("");

  const [tvkdPipeline, setTvkdPipeline] = useState<any[]>(() => {
    const saved = localStorage.getItem("tvkd_pipeline");
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Mama Purnachya Comedy", status: "Scripting" },
      { id: 2, title: "Khandeshi Katta Vlog", status: "Filming" },
      { id: 3, title: "Village Music Video Track", status: "Editing" },
      { id: 4, title: "Regional Comedy Special 01", status: "Ready" }
    ];
  });
  const [newPipelineTitle, setNewPipelineTitle] = useState("");
  const [newPipelineStatus, setNewPipelineStatus] = useState("Scripting");

  const [tvkdNotes, setTvkdNotes] = useState(() => {
    return localStorage.getItem("tvkd_notes") || "Write down Khandeshi slangs, dialect script outlines, and comedy notes here...";
  });

  // Creatorrrob States
  const [businessTasks, setBusinessTasks] = useState<any[]>(() => {
    const saved = localStorage.getItem("rob_business_tasks");
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Verify TV3 Client Retainers", completed: false },
      { id: 2, text: "Design custom visual system for PBI landing page", completed: false },
      { id: 3, text: "Update Vercel and Resend production domains", completed: true }
    ];
  });
  const [newBusinessTask, setNewBusinessTask] = useState("");

  const [musicReleases, setMusicReleases] = useState<any[]>(() => {
    const saved = localStorage.getItem("rob_music_releases");
    return saved ? JSON.parse(saved) : [
      { id: 1, track: "Khandesh Electronic Beats", status: "Recording" },
      { id: 2, track: "Ambient Focus Track 04", status: "Mastering" },
      { id: 3, track: "Independent Synth Wave EP", status: "Scheduled" }
    ];
  });
  const [newTrackName, setNewTrackName] = useState("");
  const [newTrackStatus, setNewTrackStatus] = useState("Writing");

  // Persistence hooks
  useEffect(() => {
    localStorage.setItem("tvkd_ideas", JSON.stringify(tvkdIdeas));
  }, [tvkdIdeas]);

  useEffect(() => {
    localStorage.setItem("tvkd_pipeline", JSON.stringify(tvkdPipeline));
  }, [tvkdPipeline]);

  useEffect(() => {
    localStorage.setItem("tvkd_notes", tvkdNotes);
  }, [tvkdNotes]);

  useEffect(() => {
    localStorage.setItem("rob_business_tasks", JSON.stringify(businessTasks));
  }, [businessTasks]);

  useEffect(() => {
    localStorage.setItem("rob_music_releases", JSON.stringify(musicReleases));
  }, [musicReleases]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Gobroblive1") {
      setIsAuthenticated(true);
      localStorage.setItem("creator_studio_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Incorrect password clearance.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("creator_studio_auth");
  };

  // TVKD Handlers
  const addIdea = () => {
    if (!newIdea.trim()) return;
    setTvkdIdeas([...tvkdIdeas, newIdea.trim()]);
    setNewIdea("");
  };

  const removeIdea = (index: number) => {
    setTvkdIdeas(tvkdIdeas.filter((_, idx) => idx !== index));
  };

  const addPipelineItem = () => {
    if (!newPipelineTitle.trim()) return;
    const newItem = {
      id: Date.now(),
      title: newPipelineTitle.trim(),
      status: newPipelineStatus
    };
    setTvkdPipeline([...tvkdPipeline, newItem]);
    setNewPipelineTitle("");
  };

  const updatePipelineStatus = (id: number, nextStatus: string) => {
    setTvkdPipeline(tvkdPipeline.map(item => 
      item.id === id ? { ...item, status: nextStatus } : item
    ));
  };

  const removePipelineItem = (id: number) => {
    setTvkdPipeline(tvkdPipeline.filter(item => item.id !== id));
  };

  // Creatorrrob Handlers
  const toggleBusinessTask = (id: number) => {
    setBusinessTasks(businessTasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const addBusinessTask = () => {
    if (!newBusinessTask.trim()) return;
    setBusinessTasks([...businessTasks, { id: Date.now(), text: newBusinessTask.trim(), completed: false }]);
    setNewBusinessTask("");
  };

  const removeBusinessTask = (id: number) => {
    setBusinessTasks(businessTasks.filter(t => t.id !== id));
  };

  const addMusicRelease = () => {
    if (!newTrackName.trim()) return;
    const newRelease = {
      id: Date.now(),
      track: newTrackName.trim(),
      status: newTrackStatus
    };
    setMusicReleases([...musicReleases, newRelease]);
    setNewTrackName("");
  };

  const removeMusicRelease = (id: number) => {
    setMusicReleases(musicReleases.filter(r => r.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 p-8 rounded-xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-zinc-400" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-center uppercase tracking-widest text-white mb-2">Creator Studio</h2>
          <p className="text-center text-zinc-500 text-xs uppercase tracking-wider mb-6">Authorized clearance only</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Clearance Key"
                className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg p-3 text-center tracking-widest text-sm focus:outline-none focus:border-zinc-500"
              />
              {authError && (
                <p className="text-red-500 text-[10px] text-center mt-2 uppercase tracking-wider font-bold">
                  {authError}
                </p>
              )}
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-white text-black font-mono text-xs font-black uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Verify System
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Navigation & Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-6 mb-8 gap-4 text-left">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-widest text-white flex items-center gap-2">
              TV³ Creator Studio
            </h1>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mt-1">Clean Work Environment • No Animations</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors"
          >
            Lock Studio
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-zinc-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("tvkd")}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest rounded-lg border transition-all ${activeTab === "tvkd" ? "bg-white text-black border-white" : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}
          >
            TVKD (Khandeshi Youtube)
          </button>
          <button
            onClick={() => setActiveTab("rob")}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest rounded-lg border transition-all ${activeTab === "rob" ? "bg-white text-black border-white" : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}
          >
            Creatorrrob Profile
          </button>
        </div>

        {/* Work Area */}
        <div className="space-y-8">
          
          {/* Tab 1: TVKD Panel */}
          {activeTab === "tvkd" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
              
              {/* Left Column: Ideas and Dialect Notes */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Dialect Notes */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">// Regional Comedy & Dialect Notebook</span>
                  <textarea
                    rows={8}
                    value={tvkdNotes}
                    onChange={(e) => setTvkdNotes(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs p-3 rounded-lg focus:outline-none focus:border-zinc-600 font-mono resize-none"
                  />
                </div>

                {/* Video Ideas */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl space-y-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">// Brainstorm Ideas</span>
                  
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={newIdea}
                      onChange={(e) => setNewIdea(e.target.value)}
                      placeholder="Add sketch idea"
                      className="flex-grow bg-zinc-950 border border-zinc-800 text-xs px-3 py-2 rounded-lg text-white focus:outline-none"
                    />
                    <button 
                      onClick={addIdea}
                      className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {tvkdIdeas.map((idea, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-900 text-xs">
                        <span className="text-zinc-300 font-medium truncate pr-2">{idea}</span>
                        <button 
                          onClick={() => removeIdea(idx)}
                          className="text-zinc-600 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Video Production Pipeline */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Pipeline Dashboard */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">// Video Production Pipeline</span>
                    <span className="text-[8px] font-mono bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20">Target: Khandesh Regional</span>
                  </div>

                  {/* Add Pipeline item */}
                  <div className="flex flex-col sm:flex-row gap-3 bg-zinc-950/60 p-3 rounded-lg border border-zinc-900">
                    <input 
                      type="text"
                      value={newPipelineTitle}
                      onChange={(e) => setNewPipelineTitle(e.target.value)}
                      placeholder="Enter new video project title..."
                      className="flex-grow bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 rounded-lg text-white focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <select
                        value={newPipelineStatus}
                        onChange={(e) => setNewPipelineStatus(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 text-[10px] font-mono px-3 py-2 rounded-lg text-white focus:outline-none"
                      >
                        <option value="Scripting">Scripting</option>
                        <option value="Filming">Filming</option>
                        <option value="Editing">Editing</option>
                        <option value="Ready">Ready</option>
                        <option value="Published">Published</option>
                      </select>
                      <button 
                        onClick={addPipelineItem}
                        className="px-4 py-2 bg-white text-black font-mono text-[10px] font-bold uppercase rounded-lg hover:bg-zinc-200"
                      >
                        Add Video
                      </button>
                    </div>
                  </div>

                  {/* Pipeline Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-zinc-800 text-zinc-500">
                          <th className="py-2.5 font-mono text-[9px] uppercase tracking-wider font-bold">Video Title</th>
                          <th className="py-2.5 font-mono text-[9px] uppercase tracking-wider font-bold">Current Stage</th>
                          <th className="py-2.5 font-mono text-[9px] uppercase tracking-wider font-bold">Progress Action</th>
                          <th className="py-2.5 text-right font-mono text-[9px] uppercase tracking-wider font-bold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tvkdPipeline.map((item) => (
                          <tr key={item.id} className="border-b border-zinc-900/60 hover:bg-zinc-900/20">
                            <td className="py-3 font-semibold text-white">{item.title}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                                item.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                item.status === 'Ready' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                'bg-zinc-800 text-zinc-400'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="py-3">
                              <select
                                value={item.status}
                                onChange={(e) => updatePipelineStatus(item.id, e.target.value)}
                                className="bg-zinc-900 border border-zinc-800 text-[10px] font-mono px-2 py-1 rounded text-zinc-300 focus:outline-none"
                              >
                                <option value="Scripting">Move to Scripting</option>
                                <option value="Filming">Move to Filming</option>
                                <option value="Editing">Move to Editing</option>
                                <option value="Ready">Move to Ready</option>
                                <option value="Published">Move to Published</option>
                              </select>
                            </td>
                            <td className="py-3 text-right">
                              <button 
                                onClick={() => removePipelineItem(item.id)}
                                className="text-zinc-600 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Creatorrrob Profile */}
          {activeTab === "rob" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
              
              {/* Column A: Art Entrepreneur (TV3 Studios & Business) */}
              <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> Art Entrepreneur Workspace
                  </span>
                  <span className="text-[8px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">TV³ Studios & Ops</span>
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={newBusinessTask}
                    onChange={(e) => setNewBusinessTask(e.target.value)}
                    placeholder="Add studio/ops check item"
                    className="flex-grow bg-zinc-950 border border-zinc-800 text-xs px-3 py-2 rounded-lg text-white focus:outline-none"
                  />
                  <button 
                    onClick={addBusinessTask}
                    className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {businessTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`flex justify-between items-center bg-zinc-950/60 p-3 rounded-lg border border-zinc-900 transition-opacity ${task.completed ? 'opacity-50' : 'opacity-100'}`}
                    >
                      <button 
                        onClick={() => toggleBusinessTask(task.id)}
                        className="flex items-center gap-3 text-left flex-grow cursor-pointer"
                      >
                        {task.completed ? (
                          <CheckSquare className="w-4 h-4 text-zinc-400 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-zinc-600 shrink-0" />
                        )}
                        <span className={`text-xs ${task.completed ? 'line-through text-zinc-500' : 'text-zinc-200 font-medium'}`}>
                          {task.text}
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => removeBusinessTask(task.id)}
                        className="text-zinc-700 hover:text-red-400 transition-colors ml-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column B: Musician / Artist profile */}
              <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5" /> Music Release Tracker
                  </span>
                  <span className="text-[8px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">Independent Artist</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 bg-zinc-950/60 p-3 rounded-lg border border-zinc-900">
                  <input 
                    type="text"
                    value={newTrackName}
                    onChange={(e) => setNewTrackName(e.target.value)}
                    placeholder="Enter track name..."
                    className="flex-grow bg-zinc-900 border border-zinc-800 text-xs px-3 py-2 rounded-lg text-white focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <select
                      value={newTrackStatus}
                      onChange={(e) => setNewTrackStatus(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-[10px] font-mono px-2 py-2 rounded-lg text-white focus:outline-none"
                    >
                      <option value="Writing">Writing</option>
                      <option value="Recording">Recording</option>
                      <option value="Mastering">Mastering</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Released">Released</option>
                    </select>
                    <button 
                      onClick={addMusicRelease}
                      className="px-3 py-2 bg-white text-black font-mono text-[10px] font-bold uppercase rounded-lg hover:bg-zinc-200"
                    >
                      Add Track
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {musicReleases.map((release) => (
                    <div 
                      key={release.id} 
                      className="flex justify-between items-center bg-zinc-950/60 p-3 rounded-lg border border-zinc-900"
                    >
                      <div>
                        <span className="text-xs font-semibold text-white block">{release.track}</span>
                        <span className={`text-[8px] font-mono font-bold uppercase tracking-wider block mt-1 ${
                          release.status === 'Released' ? 'text-emerald-400' :
                          release.status === 'Scheduled' ? 'text-blue-400' :
                          'text-zinc-500'
                        }`}>
                          Stage: {release.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <select
                          value={release.status}
                          onChange={(e) => {
                            setMusicReleases(musicReleases.map(r => 
                              r.id === release.id ? { ...r, status: e.target.value } : r
                            ));
                          }}
                          className="bg-zinc-900 border border-zinc-800 text-[9px] font-mono px-1.5 py-0.5 rounded text-zinc-400 focus:outline-none"
                        >
                          <option value="Writing">Writing</option>
                          <option value="Recording">Recording</option>
                          <option value="Mastering">Mastering</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Released">Released</option>
                        </select>
                        <button 
                          onClick={() => removeMusicRelease(release.id)}
                          className="text-zinc-700 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
