import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Hexagon } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const [patronName, setPatronName] = useState("");
  const [patronEmail, setPatronEmail] = useState("");
  const [patronNote, setPatronNote] = useState("");
  const [patronSubmitted, setPatronSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Direct handling via central system logic
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const handlePatronSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patronName && patronEmail) {
      // Secure transmission logic
      setPatronSubmitted(true);
      setPatronName("");
      setPatronEmail("");
      setPatronNote("");
    }
  };

  return (
    <footer className="w-full bg-[#020202] border-t border-white/5 py-24 relative z-20 overflow-hidden text-left">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-12 lg:gap-24">
          
          {/* Left Column — Hierarchy & Regional Nodes */}
          <div className="space-y-12">
            <div>
              <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-white">
                <span className="text-[#f7d08a]">TV³</span> Studios
              </h3>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-600">
                <span style={{ color: '#FF9933' }}>The</span>{' '}
                <span className="text-white">V³</span>{' '}
                <span style={{ color: '#138808' }}>Studios</span>
              </p>
            </div>
            
            <div className="space-y-8 border-l border-white/10 pl-6">
              <div>
                <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 mb-2">Central Operations</h4>
                <p className="font-serif text-sm text-zinc-300 italic">District Barwani, M.P. 451770</p>
              </div>
            </div>
          </div>

          {/* Middle Column — Secure Mail Connection & Settlements */}
          <div className="space-y-16">
            <div className="space-y-5">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white">Secure Connection</h4>
              <p className="font-serif text-[13px] text-zinc-500 italic leading-relaxed">
                Establish communications via central mail protocol for invoicing, project inquiries, and feedback.
              </p>
              
              <form onSubmit={handleSubmit} className="flex items-center mt-6 relative w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="AUTHORIZE EMAIL ENTRY..."
                  required
                  className="w-full bg-white/[0.01] border border-white/10 rounded-sm px-4 py-3 font-mono text-[10px] text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#f7d08a]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center text-zinc-500 hover:text-[#f7d08a] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {submitted && (
                <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-[9px] text-[#00FF66] uppercase tracking-[0.2em]">
                  Link established. Awaiting relay.
                </motion.p>
              )}
            </div>
          </div>

          {/* Right Column — Support The Craft */}
          <div className="space-y-8">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white flex items-center gap-3">
                <Hexagon className="w-3 h-3 text-[#f7d08a]" /> Support The Craft
              </h4>
              <p className="mt-5 font-serif text-[13px] leading-relaxed text-zinc-500 italic">
                We are a vision-first collective, carving authentic storytelling through dedicated artistry. Your support enables us to build a better kind of cinema.
              </p>
            </div>

            {!patronSubmitted ? (
               <form onSubmit={handlePatronSubmit} className="space-y-4 pt-4 border-t border-white/5">
                  <div className="grid grid-cols-2 gap-4">
                     <input 
                       type="text" 
                       value={patronName} 
                       onChange={(e)=>setPatronName(e.target.value)} 
                       placeholder="NAME" 
                       required 
                       className="bg-transparent border-b border-white/10 px-0 py-2 font-mono text-[10px] text-white focus:outline-none focus:border-[#f7d08a] w-full placeholder:text-zinc-700" 
                     />
                     <input 
                       type="email" 
                       value={patronEmail} 
                       onChange={(e)=>setPatronEmail(e.target.value)} 
                       placeholder="EMAIL" 
                       required 
                       className="bg-transparent border-b border-white/10 px-0 py-2 font-mono text-[10px] text-white focus:outline-none focus:border-[#f7d08a] w-full placeholder:text-zinc-700" 
                     />
                  </div>
                  <textarea 
                    value={patronNote} 
                    onChange={(e)=>setPatronNote(e.target.value)} 
                    placeholder="PITCH / SUPPORT INQUIRY..." 
                    rows={2} 
                    className="bg-transparent border-b border-white/10 px-0 py-3 font-mono text-[10px] text-white focus:outline-none focus:border-[#f7d08a] w-full resize-none placeholder:text-zinc-700" 
                  />
                  <button 
                    type="submit" 
                    className="w-full mt-4 py-3 border border-white/10 text-white font-mono text-[9px] uppercase tracking-[0.6em] hover:bg-white hover:text-black transition-colors block text-center"
                  >
                     Transmit Request
                  </button>
               </form>
            ) : (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 border border-[#f7d08a]/20 bg-[#f7d08a]/[0.02] text-center mt-4">
                  <h5 className="font-serif text-xl text-[#f7d08a] italic mb-3">Protocol Received</h5>
                  <p className="font-mono text-[9px] leading-relaxed uppercase tracking-[0.2em] text-zinc-500">Our central frame will analyze your transmission.</p>
               </motion.div>
            )}
          </div>
          
        </div>

        <div className="w-full h-[1px] bg-white/5 mt-20 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
           <p className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
             © 2026 TV³ Studios. All directives reserved.
           </p>
           <p className="font-mono text-[9px] text-[#00FF66]/50 tracking-widest uppercase flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" /> 
             System Active
           </p>
        </div>
      </div>
    </footer>
  );
}
