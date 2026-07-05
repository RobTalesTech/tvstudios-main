import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Compass, Film, Palette, Music, Mic, Settings, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import postProductionCover from "../assets/post_production_cover.jpg";

interface Step {
  id: string;
  name: string;
  category: 'video' | 'audio';
  icon: React.ComponentType<any>;
  desc: string;
  price: number;
  complexityLabel: string;
}

// Updated standard rates to hit target: Base Setup = 1500, Edit Track = 1500.
// At 15s (multiplier 0.6), Base + Edit = (1500 + 1500) * 0.6 = ₹1,800.
const pipelineSteps: Step[] = [
  { id: 'script', name: 'Script', category: 'video', icon: FileText, desc: 'Conceptual blueprint & narrative structure.', price: 800, complexityLabel: 'Complexity' },
  { id: 'direction', name: 'Direction', category: 'video', icon: Compass, desc: 'Visual staging, pace & shot design.', price: 1000, complexityLabel: 'Direction Detail' },
  { id: 'editing', name: 'Editing', category: 'video', icon: Film, desc: 'Frame-accurate pacing, cuts & assembly.', price: 1500, complexityLabel: 'Cuts Density' },
  { id: 'grading', name: 'Colour Grading', category: 'video', icon: Palette, desc: 'LUT rendering, skin tones & mood styling.', price: 800, complexityLabel: 'Color Precision' },
  { id: 'sound', name: 'Sound Mix / SFX', category: 'audio', icon: Music, desc: 'Foley, soundscapes & levels mastering.', price: 800, complexityLabel: 'Layer Depth' },
  { id: 'voiceover', name: 'Voiceover', category: 'audio', icon: Mic, desc: 'Voice talent, cleanup & vocal presence.', price: 600, complexityLabel: 'Vocal Presence' }
];

// Snapping presets: 15s to 1m, then every minute to 15m.
// Time multipliers represent baseline of 3,000Rs/min, scaling down slightly for relaxation.
const durationPresets = [
  { id: '15s', label: '15s', seconds: 15, multiplier: 0.6, text: '15 Seconds' },
  { id: '20s', label: '20s', seconds: 20, multiplier: 0.7, text: '20 Seconds' },
  { id: '30s', label: '30s', seconds: 30, multiplier: 0.8, text: '30 Seconds' },
  { id: '40s', label: '40s', seconds: 40, multiplier: 0.85, text: '40 Seconds' },
  { id: '50s', label: '50s', seconds: 50, multiplier: 0.9, text: '50 Seconds' },
  { id: '1m', label: '1m', seconds: 60, multiplier: 1.0, text: '1 Minute' },
  { id: '2m', label: '2m', seconds: 120, multiplier: 1.9, text: '2 Minutes' },
  { id: '3m', label: '3m', seconds: 180, multiplier: 2.8, text: '3 Minutes' },
  { id: '4m', label: '4m', seconds: 240, multiplier: 3.7, text: '4 Minutes' },
  { id: '5m', label: '5m', seconds: 300, multiplier: 4.5, text: '5 Minutes' },
  { id: '6m', label: '6m', seconds: 360, multiplier: 5.3, text: '6 Minutes' },
  { id: '7m', label: '7m', seconds: 420, multiplier: 6.1, text: '7 Minutes' },
  { id: '8m', label: '8m', seconds: 480, multiplier: 6.9, text: '8 Minutes' },
  { id: '9m', label: '9m', seconds: 540, multiplier: 7.7, text: '9 Minutes' },
  { id: '10m', label: '10m', seconds: 600, multiplier: 8.5, text: '10 Minutes' },
  { id: '11m', label: '11m', seconds: 660, multiplier: 9.3, text: '11 Minutes' },
  { id: '12m', label: '12m', seconds: 720, multiplier: 10.1, text: '12 Minutes' },
  { id: '13m', label: '13m', seconds: 780, multiplier: 10.9, text: '13 Minutes' },
  { id: '14m', label: '14m', seconds: 840, multiplier: 11.7, text: '14 Minutes' },
  { id: '15m', label: '15m', seconds: 900, multiplier: 12.5, text: '15 Minutes' }
];

export default function PostProductionSelector() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['editing']);
  const [isPlaying, setIsPlaying] = useState(true);
  const [durationIndex, setDurationIndex] = useState<number>(0); // Default to 15s (index 0) on first load
  const [isTimelineLocked, setIsTimelineLocked] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("15"); // Match default starting value
  const [inputUnit, setInputUnit] = useState<"sec" | "min">("sec");
  const [customRates, setCustomRates] = useState<Record<string, number>>({
    script: 50,
    direction: 50,
    editing: 50,
    grading: 50,
    sound: 50,
    voiceover: 50
  });

  const toggleStep = (id: string) => {
    if (!isTimelineLocked) return;
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleRateChange = (id: string, val: number) => {
    setCustomRates(prev => ({ ...prev, [id]: val }));
  };

  // Adjust playhead movement: auto-unlocks timeline sequence
  const handlePlayheadMove = (newIndex: number) => {
    setDurationIndex(newIndex);
    setIsTimelineLocked(false);
  };

  const handleApplyInput = () => {
    if (isTimelineLocked) return;
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) return;
    
    const targetSeconds = inputUnit === "min" ? val * 60 : val;
    
    let closestIdx = 0;
    let minDiff = Math.abs(durationPresets[0].seconds - targetSeconds);
    
    for (let i = 1; i < durationPresets.length; i++) {
      const diff = Math.abs(durationPresets[i].seconds - targetSeconds);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    
    setDurationIndex(closestIdx);
    setIsTimelineLocked(false); // Auto-unlock on manual input jump
  };

  const basePrice = 1500;
  const activeDuration = durationPresets[durationIndex];
  const timeMultiplier = activeDuration.multiplier;

  const calculateTotal = () => {
    let total = basePrice;
    selectedIds.forEach(id => {
      const step = pipelineSteps.find(s => s.id === id);
      if (step) {
        const multiplier = 0.5 + (customRates[id] / 100);
        total += Math.round(step.price * multiplier);
      }
    });
    return Math.round(total * timeMultiplier);
  };

  const currentTotal = calculateTotal();

  const getWhatsAppLink = () => {
    const selectedSteps = pipelineSteps.filter(s => selectedIds.includes(s.id));
    const stepLines = selectedSteps.map(s => {
      const complexity = customRates[s.id] < 35 ? 'Standard' : customRates[s.id] < 75 ? 'Premium' : 'Ultra';
      return `- ${s.name} (${complexity} Level)`;
    }).join('\n');
    
    const message = `Hi TV³ Studios,\n\nI want to place a Post-Production Pipeline Order with these specifications:\n\nProject Duration: ${activeDuration.text}\n\nSelected Modules:\n${stepLines}\n\nEstimated Cost: ₹${currentTotal.toLocaleString('en-IN')}\n\nLet's discuss and book the service!`;
    return `https://wa.me/918149981660?text=${encodeURIComponent(message)}`;
  };

  return (
    <div id="post-production" className="w-full max-w-5xl mx-auto rounded-[2rem] border border-white/5 bg-[#070707] p-8 md:p-12 relative overflow-hidden mb-24 shadow-[0_30px_60px_rgba(0,0,0,0.8)] font-mono">
      {/* Top interface bars */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6 text-xs text-zinc-500">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600/60 animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-600/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-600/60" />
          </div>
          <span className="tracking-widest text-[9px] md:text-xs uppercase">Console // Post-Pipeline v1.3</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-2 py-0.5 border border-zinc-800 rounded text-[9px] uppercase bg-zinc-900 text-zinc-400 hidden sm:inline">Timecode: 00:14:32:08</span>
          <span className="px-2 py-0.5 border border-zinc-800 rounded text-[9px] uppercase bg-zinc-900 text-[hsl(43_72%_55%)]">Active Mode</span>
        </div>
      </div>

      {/* Main Service Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl md:text-5xl font-display font-black tracking-widest uppercase text-white leading-none">
          POST PRODUCTION SERVICES
        </h3>
        <p className="text-[11px] text-zinc-400 uppercase tracking-[0.3em] mt-3">Custom Workflow Architecture</p>
      </div>

      {/* Interactive Preview Monitor */}
      <div className="relative w-full h-[250px] md:h-[420px] rounded-2xl overflow-hidden border border-white/10 mb-8 group bg-black shadow-[0_0_30px_rgba(0,0,0,0.9)]">
        <img 
          src={postProductionCover} 
          alt="Post Production Workstation" 
          className="w-full h-full object-cover opacity-85 group-hover:scale-[1.01] transition-transform duration-700 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
        
        {/* Interactive Playback HUD Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none font-mono">
          <div className="flex justify-between items-start">
            <div className="px-2.5 py-1 bg-red-600 text-white text-[8px] md:text-[9px] font-black tracking-widest uppercase rounded flex items-center gap-1.5 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]">
              <span className="w-1.5 h-1.5 rounded-full bg-white" /> LIVE MONITOR
            </div>
            <span className="text-[8px] text-zinc-400 bg-black/70 px-2 py-0.5 rounded border border-white/5">LUT: TV3_GOLD_REC709</span>
          </div>

          <div className="flex justify-between items-end gap-4">
            <div className="text-left space-y-1">
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest block font-bold">Selected Pipeline Tracks</span>
              <div className="flex flex-wrap gap-1.5 max-w-[280px] md:max-w-md">
                {selectedIds.length === 0 ? (
                  <span className="text-[9px] text-red-500 uppercase tracking-widest font-black">[ BYPASS MODE ]</span>
                ) : (
                  selectedIds.map(id => {
                    const step = pipelineSteps.find(s => s.id === id);
                    return step ? (
                      <span key={id} className="px-2 py-0.5 bg-[hsl(43_72%_55%)]/20 border border-[hsl(43_72%_55%)]/40 text-[hsl(43_72%_55%)] text-[8px] uppercase font-black tracking-widest rounded-md">
                        {step.name}
                      </span>
                    ) : null;
                  })
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest block font-bold">Est. Pipeline Total</span>
              <span className="text-xl md:text-3xl font-black text-[hsl(43_72%_55%)]">
                {isTimelineLocked ? `₹${currentTotal.toLocaleString('en-IN')}` : '[ LOCKED ]'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Video Duration REDESIGNED AS EDITING TIMELINE */}
      <div className="p-6 bg-zinc-950/60 border border-white/5 rounded-2xl text-left mb-8 space-y-6 relative z-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <span className="text-[10px] text-[hsl(43_72%_55%)] uppercase tracking-[0.2em] block mb-1 font-bold">NLE TIMELINE DURATION EDITOR</span>
            <span className="text-xs text-zinc-400 font-serif italic">Drag playhead to select target video duration, then lock sequence.</span>
          </div>
          
          <button
            onClick={() => setIsTimelineLocked(!isTimelineLocked)}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all ${
              isTimelineLocked 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20' 
                : 'bg-[hsl(43_72%_55%)] border-transparent text-black hover:bg-white'
            }`}
          >
            {isTimelineLocked ? '🔓 UNLOCK TIMELINE' : '🔒 LOCK TIMELINE'}
          </button>
        </div>

        {/* Dynamic NLE clip blocks with cuts */}
        <div className={`relative bg-zinc-900 border border-zinc-800/80 rounded-xl p-4 transition-all duration-300 ${isTimelineLocked ? 'opacity-70' : 'opacity-100'}`}>
          {/* Ticks timeline ruler */}
          <div className="relative h-6 flex justify-between text-[8px] text-zinc-500 font-mono select-none px-2 border-b border-zinc-800/50 mb-2">
            {durationPresets.map((m) => {
              // Only render label for key steps to avoid overcrowding
              const showLabel = ['15s', '30s', '1m', '3m', '5m', '10m', '15m'].includes(m.label);
              return (
                <span key={m.id} className="relative flex flex-col items-center flex-1">
                  {showLabel ? <span className="absolute -top-1">{m.label}</span> : <span className="h-2" />}
                  <span className={`w-[1px] ${showLabel ? 'h-2 bg-zinc-600' : 'h-1 bg-zinc-800'} mt-auto`} />
                </span>
              );
            })}
          </div>

          {/* Color footage blocks representing clip cuts of different sizes */}
          <div className="relative h-12 rounded-md overflow-hidden bg-black/50 border border-white/5 flex items-stretch">
            <div className="w-[12%] bg-blue-600/20 border-r border-black/40 flex items-center justify-center"><span className="text-[7px] text-blue-400/60 uppercase font-black truncate px-1">A01_ROLL</span></div>
            <div className="w-[8%] bg-yellow-600/20 border-r border-black/40 flex items-center justify-center"><span className="text-[7px] text-yellow-400/60 uppercase font-black truncate px-1">B_CUT</span></div>
            <div className="w-[15%] bg-green-600/20 border-r border-black/40 flex items-center justify-center"><span className="text-[7px] text-green-400/60 uppercase font-black truncate px-1">WIDE_03</span></div>
            <div className="w-[6%] bg-rose-600/20 border-r border-black/40 flex items-center justify-center"><span className="text-[7px] text-rose-400/60 uppercase font-black truncate px-1">MCU_04</span></div>
            <div className="w-[18%] bg-purple-600/20 border-r border-black/40 flex items-center justify-center"><span className="text-[7px] text-purple-400/60 uppercase font-black truncate px-1">B_CROWD</span></div>
            <div className="w-[22%] bg-teal-600/20 border-r border-black/40 flex items-center justify-center"><span className="text-[7px] text-teal-400/60 uppercase font-black truncate px-1">A02_TALENT</span></div>
            <div className="w-[19%] bg-indigo-600/20 flex items-center justify-center"><span className="text-[7px] text-indigo-400/60 uppercase font-black truncate px-1">DRONE_PAN</span></div>

            {/* Red playhead vertical line */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-red-500 shadow-[0_0_12px_#ef4444] z-10 pointer-events-none"
              style={{ left: `${(durationIndex / (durationPresets.length - 1)) * 96 + 2}%` }}
            />
            {/* Playhead handle head */}
            <div 
              className="absolute -top-1 w-3 h-3 bg-red-500 border border-white rotate-45 z-10 pointer-events-none"
              style={{ left: `${(durationIndex / (durationPresets.length - 1)) * 96 + 1.4}%` }}
            />
          </div>

          {/* Hidden range slider over tracks */}
          {!isTimelineLocked && (
            <input 
              type="range"
              min="0"
              max={durationPresets.length - 1}
              step="1"
              value={durationIndex}
              onChange={(e) => handlePlayheadMove(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-20"
            />
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-mono pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 uppercase tracking-widest text-[9px]">// Selected Segment:</span>
            <span className="text-[hsl(43_72%_55%)] font-black uppercase tracking-widest bg-[hsl(43_72%_55%)]/10 px-3 py-1 rounded border border-[hsl(43_72%_55%)]/20">
              {activeDuration.text} (x{timeMultiplier.toFixed(2)})
            </span>
          </div>

          {/* Digit type input */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">Quick Jump:</span>
            <input 
              type="text" 
              value={inputValue}
              disabled={isTimelineLocked}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. 45"
              className="w-16 bg-black/60 border border-zinc-800 rounded px-2 py-1 text-[10px] text-white focus:outline-none focus:border-[hsl(43_72%_55%)] transition-colors text-center disabled:opacity-50"
            />
            <select
              value={inputUnit}
              disabled={isTimelineLocked}
              onChange={(e) => setInputUnit(e.target.value as "sec" | "min")}
              className="bg-black/60 border border-zinc-800 rounded px-2 py-1 text-[10px] text-zinc-400 focus:outline-none focus:border-[hsl(43_72%_55%)] select-none disabled:opacity-50"
            >
              <option value="sec">Sec</option>
              <option value="min">Min</option>
            </select>
            <button
              onClick={handleApplyInput}
              disabled={isTimelineLocked}
              className="px-3 py-1 border border-white/10 hover:border-white/30 text-white rounded text-[10px] uppercase font-bold tracking-widest transition-all disabled:opacity-50"
            >
              Jump
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline Controls & Master Out Card */}
      <div className="relative">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-500 ${!isTimelineLocked ? 'opacity-30 pointer-events-none blur-[1px]' : 'opacity-100'}`}>
          {/* Left Side: Timeline / Track Layout */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center text-zinc-400 text-xs tracking-wider uppercase mb-2 font-bold">
              <span>Production Timeline Tracks</span>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-md border border-white/5 transition-all text-[10px]"
              >
                <Play className={`w-3 h-3 ${isPlaying ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                {isPlaying ? 'PLAYHEAD LIVE' : 'PLAYHEAD PAUSED'}
              </button>
            </div>

            <div className="space-y-3 relative">
              {/* Horizontal Timeline Ruler */}
              <div className="h-6 border-b border-white/5 flex text-[8px] text-zinc-600 justify-between px-4 select-none mb-1">
                <span>00:00</span>
                <span>01:00</span>
                <span>02:00</span>
                <span>03:00</span>
                <span>04:00</span>
                <span>05:00</span>
              </div>

              {/* Red Playhead line animating across */}
              {isPlaying && (
                <motion.div 
                  animate={{ left: ['5%', '95%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-6 bottom-0 w-[1px] bg-red-600 shadow-[0_0_10px_#ef4444] z-20 pointer-events-none"
                />
              )}

              {pipelineSteps.map((step, idx) => {
                const isSelected = selectedIds.includes(step.id);
                const StepIcon = step.icon;
                return (
                  <div 
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`w-full rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden relative flex flex-col md:flex-row items-stretch ${
                      isSelected 
                        ? 'border-[hsl(43_72%_55%)]/40 bg-gradient-to-r from-[hsl(43_72%_55%)]/[0.03] to-[#0d0d0d]' 
                        : 'border-white/5 bg-[#0a0a0a] opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* Left Track Control Panel */}
                    <div className="md:w-48 shrink-0 bg-black/40 border-r border-white/5 p-4 flex flex-col justify-between gap-3 text-left">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-md ${isSelected ? 'bg-[hsl(43_72%_55%)]/10 text-[hsl(43_72%_55%)]' : 'bg-zinc-900 text-zinc-500'}`}>
                            <StepIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-[hsl(43_72%_55%)]' : 'text-zinc-400'}`}>
                              {step.name}
                            </p>
                            <span className="text-[8px] text-zinc-600 font-mono tracking-widest block uppercase">
                              Track {idx + 1} // {step.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? 'border-[hsl(43_72%_55%)] bg-[hsl(43_72%_55%)] text-black' : 'border-zinc-800 bg-transparent'
                          }`}>
                            {isSelected && <span className="text-[8px] font-black">✓</span>}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-zinc-500 leading-snug font-serif italic">
                        {step.desc}
                      </p>
                    </div>

                    {/* Right Track Timeline Block */}
                    <div className="flex-1 p-4 flex flex-col justify-center gap-4 min-h-[70px]">
                      {isSelected ? (
                        <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-zinc-500 uppercase tracking-widest font-bold">{step.complexityLabel}</span>
                            <span className="text-[hsl(43_72%_55%)] font-black">
                              {customRates[step.id] < 35 ? 'Standard Mode' : customRates[step.id] < 75 ? 'Premium Cut' : 'Director Masterpiece'}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={customRates[step.id]}
                              onChange={(e) => handleRateChange(step.id, parseInt(e.target.value))}
                              className="flex-1 h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[hsl(43_72%_55%)]"
                            />
                            <span className="text-[10px] text-zinc-400 w-8 text-right font-mono">
                              +{Math.round(step.price * (0.5 + customRates[step.id]/100) * timeMultiplier).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-zinc-700 text-[10px] tracking-widest uppercase select-none font-bold">
                          [ TRACK BYPASS ACTIVE ]
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Inspector / Master Out Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 pb-3 border-b border-white/5 flex items-center gap-2 text-left font-bold">
                <Settings className="w-3.5 h-3.5 text-[hsl(43_72%_55%)]" />
                Inspector Panel
              </h4>

              {/* Selected Tracks Summary */}
              <div className="rounded-xl border border-white/5 bg-[#090909] p-5 space-y-4 text-left">
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">Active Pipelines</span>
                {selectedIds.length === 0 ? (
                  <p className="text-xs text-zinc-600 italic">No modules selected. Select tracks on the left timeline to customize.</p>
                ) : (
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                    {pipelineSteps.filter(s => selectedIds.includes(s.id)).map(step => (
                      <div key={step.id} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-[hsl(43_72%_55%)]" />
                          <span className="text-zinc-300">{step.name}</span>
                        </div>
                        <span className="text-zinc-500">
                          {isTimelineLocked ? `₹${Math.round(step.price * (0.5 + customRates[step.id]/100) * timeMultiplier).toLocaleString('en-IN')}` : '[ LOCKED ]'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Base Setup Rate ({activeDuration.label})</span>
                  <span className="text-zinc-300">
                    {isTimelineLocked ? `₹${Math.round(basePrice * timeMultiplier).toLocaleString('en-IN')}` : '[ LOCKED ]'}
                  </span>
                </div>
              </div>

              {/* VU Levels Meter Animation */}
              <div className="rounded-xl border border-white/5 bg-[#090909] p-5 space-y-3 text-left">
                <div className="flex justify-between text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                  <span>Output Levels (L/R)</span>
                  <span>Active</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  {[...Array(2)].map((_, channelIdx) => (
                    <div key={channelIdx} className="h-2 bg-zinc-950 rounded overflow-hidden flex gap-[1px]">
                      {[...Array(20)].map((_, barIdx) => {
                        const level = barIdx / 20;
                        let color = 'bg-emerald-600/30';
                        if (level > 0.8) color = 'bg-red-500/30';
                        else if (level > 0.6) color = 'bg-yellow-500/30';

                        return (
                          <motion.div 
                            key={barIdx}
                            animate={isPlaying ? {
                              opacity: [0.1, Math.random() * 0.9 + 0.1, 0.1]
                            } : { opacity: level < 0.4 ? 0.3 : 0.05 }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 0.3 + Math.random() * 0.4,
                              delay: barIdx * 0.02 
                            }}
                            className={`flex-1 h-full ${color}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 mt-6 lg:mt-0 space-y-4 text-left">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">EST. PIPELINE RATE</span>
                <div className="text-right">
                  <p className="text-3xl font-display font-black text-[hsl(43_72%_55%)] shadow-sm">
                    {isTimelineLocked ? `₹${currentTotal.toLocaleString('en-IN')}` : '₹--,---'}
                  </p>
                  <span className="text-[8px] text-zinc-600 font-mono tracking-widest block uppercase mt-0.5 font-bold">
                    {isTimelineLocked ? 'Sequence Configured' : 'LOCK TIMELINE TO CALCULATE'}
                  </span>
                </div>
              </div>

              {isTimelineLocked ? (
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[hsl(43_72%_55%)] hover:bg-white text-black font-display text-xs uppercase font-black tracking-widest py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_30px_rgba(255,255,255,0.3)] hover:scale-[1.02]"
                >
                  discuss and book the service
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <div className="w-full text-center bg-zinc-900 border border-white/5 text-zinc-600 font-display text-xs uppercase font-black tracking-widest py-4 px-6 rounded-xl cursor-not-allowed">
                  🔒 LOCK SEQUENCE TO BOOK
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lock Sequence overlay alert for gamification */}
        {!isTimelineLocked && (
          <div className="absolute inset-x-0 bottom-12 z-30 flex items-center justify-center p-8 pointer-events-none">
            <div className="bg-zinc-950 border border-[hsl(43_72%_55%)]/30 px-6 py-4 rounded-xl text-center shadow-[0_20px_40px_rgba(0,0,0,0.8)] max-w-sm pointer-events-auto">
              <p className="font-mono text-xs uppercase tracking-widest text-[hsl(43_72%_55%)] font-black mb-2">⚡ PIPELINE SEQUENCE UNLOCKED</p>
              <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider leading-relaxed">
                Configure your target duration and click <strong className="text-white">🔒 LOCK TIMELINE</strong> to begin editing sequence tracks and complexity values.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
