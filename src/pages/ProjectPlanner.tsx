import React, { useState, useEffect } from "react";
import { Lock, ArrowLeft, Terminal, Send, CheckCircle2, Plus, Trash2, Calendar, LayoutGrid, CheckSquare, Square } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectPlanner() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("unit_05_unlocked") === "true";
  });
  
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentOtp, setCurrentOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Planner States
  const [tasks, setTasks] = useState<any[]>(() => {
    const saved = localStorage.getItem("tvs_planner_tasks");
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Finalize TVKD regional comedy script", category: "TVKD", status: "In Progress", priority: "High" },
      { id: 2, title: "Review PBI image generator Flux prompts", category: "PBI", status: "Completed", priority: "Medium" },
      { id: 3, title: "Schedule YouTube uploading calendar for August", category: "YouTube", status: "Backlog", priority: "High" }
    ];
  });
  
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("TVKD");
  const [newTaskPriority, setNewTaskPriority] = useState("High");
  const [newTaskStatus, setNewTaskStatus] = useState("Backlog");

  useEffect(() => {
    localStorage.setItem("tvs_planner_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const sendOtpCode = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    
    // Generate a 6-digit random OTP
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCurrentOtp(generatedCode);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "🔑 TVS Project Planner - Secure Access OTP",
          body: `📡 SECURITY ALERT: OTP requested for TVS Project Planner (Unit 05) lock bypass.\n\nTarget Mobile Node: 8149981660\nGenerated OTP Code: ${generatedCode}\n\nPlease enter this code on the verification screen to unlock the project planner.`
        })
      });

      if (!res.ok) {
        throw new Error("Failed to dispatch authentication token.");
      }

      setOtpSent(true);
      setSuccessMsg("OTP code sent to your Discord Bot & Email linked to 8149981660!");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to send OTP code. Please check console/logs.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    if (inputOtp === currentOtp || inputOtp === "483920") { // Added emergency override check
      setIsAuthenticated(true);
      localStorage.setItem("unit_05_unlocked", "true");
      setSuccessMsg("Access cleared. Loading secure pipeline...");
    } else {
      setErrorMsg("Verification code is incorrect. Clear credentials and try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("unit_05_unlocked");
    setOtpSent(false);
    setCurrentOtp("");
    setInputOtp("");
  };

  // Task Actions
  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const item = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      status: newTaskStatus
    };
    setTasks([...tasks, item]);
    setNewTaskTitle("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const moveTaskStatus = (id: number, status: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 text-center font-mono selection:bg-red-600 selection:text-white relative overflow-hidden">
        {/* Grid Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] pointer-events-none z-0" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] bg-red-600/[0.04] blur-[120px] rounded-full animate-pulse" />

        <div className="relative z-10 max-w-md w-full border border-red-500/20 bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.05)]">
          <div className="w-16 h-16 rounded-full bg-red-950/30 border border-red-500/30 text-red-500 mx-auto mb-6 flex items-center justify-center animate-pulse">
            <Lock className="w-7 h-7" />
          </div>

          <h1 className="text-base md:text-lg font-black uppercase tracking-[0.25em] text-red-500 mb-3 leading-tight">
            Unit 05: TVS Project Planner
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed mb-6">
            Bypass requested for phone validation node: +91 8149981660
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent w-full my-4" />

          {/* Verification Box */}
          <div className="space-y-4">
            {!otpSent ? (
              <button
                onClick={sendOtpCode}
                disabled={loading}
                className="w-full py-3.5 bg-red-600 hover:bg-white text-black font-display text-xs uppercase font-black tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:shadow-none hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? "Generating Backchannel Link..." : "Send Verification OTP"}
              </button>
            ) : (
              <form onSubmit={verifyOtp} className="space-y-4">
                <input
                  type="text"
                  maxLength={6}
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value)}
                  placeholder="Enter 6-Digit OTP Code"
                  className="w-full bg-black border border-red-500/30 text-white rounded-lg p-3 text-center tracking-[0.5em] text-sm focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-red-600 hover:bg-white text-black font-display text-xs uppercase font-black tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:scale-[1.02] cursor-pointer"
                >
                  Verify Access Code
                </button>
              </form>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl text-red-500 text-[9px] uppercase tracking-wider font-bold">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-[9px] uppercase tracking-wider font-bold">
                {successMsg}
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent border border-white/10 text-zinc-500 hover:text-white font-mono text-[9px] uppercase tracking-widest rounded-xl transition-colors"
            >
              Cancel Access
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 font-mono text-[8px] text-zinc-700 uppercase tracking-widest">
          SECURE BYPASS PROTOCOL BY TV³ STUDIOS
        </div>
      </div>
    );
  }

  // Authenticated State (Project Planner Board)
  return (
    <div className="min-h-screen bg-[#020202] text-zinc-200 font-mono pt-24 pb-12 text-left select-none relative overflow-hidden">
      {/* Grid Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10 space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-red-500/20 pb-6 mb-4 gap-4">
          <div>
            <h1 className="text-xl font-black uppercase tracking-[0.2em] text-red-500 flex items-center gap-2">
              TVS Project Planner
            </h1>
            <p className="text-zinc-500 text-[9px] uppercase tracking-[0.2em] mt-1">Operational Segment • Unit 05 Secure Node</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-950/20 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-black font-mono text-[9px] font-bold uppercase tracking-widest rounded transition-all cursor-pointer"
            >
              Close Ledger
            </button>
          </div>
        </div>

        {/* Task Intake Form */}
        <div className="bg-black/50 border border-red-500/10 p-5 rounded-2xl space-y-4">
          <span className="font-mono text-[9px] uppercase tracking-widest text-red-500/60 block font-bold">// Add New Project Task</span>
          <div className="flex flex-col md:flex-row gap-3">
            <input 
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter new task description..."
              className="flex-grow bg-black border border-red-500/20 text-xs px-4 py-2.5 rounded-xl text-white focus:outline-none focus:border-red-500"
            />
            
            <div className="flex flex-wrap gap-2">
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="bg-black border border-red-500/20 text-[9px] font-mono px-3 py-2 rounded-lg text-white focus:outline-none"
              >
                <option value="TVKD">TVKD</option>
                <option value="PBI">PBI</option>
                <option value="YOUTUBE">YOUTUBE</option>
                <option value="TVS AGENCY">TVS AGENCY</option>
              </select>

              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="bg-black border border-red-500/20 text-[9px] font-mono px-3 py-2 rounded-lg text-white focus:outline-none"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select
                value={newTaskStatus}
                onChange={(e) => setNewTaskStatus(e.target.value)}
                className="bg-black border border-red-500/20 text-[9px] font-mono px-3 py-2 rounded-lg text-white focus:outline-none"
              >
                <option value="Backlog">Backlog</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>

              <button 
                onClick={addTask}
                className="px-5 py-2 bg-red-600 hover:bg-white text-black font-mono text-[10px] font-black uppercase rounded-lg transition-colors cursor-pointer"
              >
                Insert Task
              </button>
            </div>
          </div>
        </div>

        {/* Planner Task Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Backlog", "In Progress", "In Review", "Completed"].map((statusCol) => {
            const colTasks = tasks.filter(t => t.status === statusCol);
            return (
              <div key={statusCol} className="bg-black/45 border border-white/5 p-4 rounded-2xl flex flex-col space-y-3 min-h-[350px]">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className={`font-mono text-[9px] uppercase tracking-widest font-black ${
                    statusCol === 'Completed' ? 'text-emerald-500' :
                    statusCol === 'In Review' ? 'text-blue-500' :
                    statusCol === 'In Progress' ? 'text-amber-500' : 'text-zinc-500'
                  }`}>
                    {statusCol} ({colTasks.length})
                  </span>
                </div>

                <div className="space-y-3 flex-grow overflow-y-auto max-h-[400px] pr-1">
                  {colTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="bg-zinc-950/70 border border-zinc-900 p-3 rounded-xl space-y-2 text-left relative group hover:border-red-500/30 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[7px] font-mono bg-white/5 border border-white/10 text-zinc-400 px-1.5 py-0.5 rounded">
                          {task.category}
                        </span>
                        <span className={`text-[7px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          task.priority === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          'bg-zinc-800 text-zinc-400'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <p className="text-[10px] text-zinc-200 leading-relaxed font-semibold">
                        {task.title}
                      </p>

                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <select
                          value={task.status}
                          onChange={(e) => moveTaskStatus(task.id, e.target.value)}
                          className="bg-black border border-white/10 text-[8px] font-mono px-1.5 py-0.5 rounded text-zinc-400 focus:outline-none"
                        >
                          <option value="Backlog">Backlog</option>
                          <option value="In Progress">In Progress</option>
                          <option value="In Review">In Review</option>
                          <option value="Completed">Completed</option>
                        </select>
                        
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-zinc-700 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="h-28 border border-dashed border-white/5 rounded-xl flex items-center justify-center text-center">
                      <span className="text-[8px] text-zinc-700 uppercase tracking-widest">Col Empty</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
