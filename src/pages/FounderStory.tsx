import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Edit3, Film, MapPin, Award, BookOpen, GraduationCap, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const filmographyData = [
  { 
    year: "2023-2024", 
    title: "Freelance Copywriting & Editing", 
    type: "Ad Writing", 
    role: "Creator", 
    achievement: "Social Media & independent clients - Positive feedback." 
  },
  { 
    year: "2023", 
    title: "AMIR AL-MUMININ", 
    type: "Song", 
    role: "Song Writer", 
    achievement: "Upcoming Bollywood Movie - written the only song flowing throughout screenplay, Sufi Genre with Urdu/Arabic/Persian background." 
  },
  { 
    year: "2021", 
    title: "JAYANTI", 
    type: "Feature Film", 
    role: "Production Manager", 
    achievement: "Filmfare award & State Govt Award. Available on Amazon Prime." 
  },
  { 
    year: "2020", 
    title: "SPECIAL 19", 
    type: "Documentary", 
    role: "Producer / Creator / Editor", 
    achievement: "Nagpur Police COVID-19 initiative 'My Family, My Responsibility'", 
    link: "https://drive.google.com/file/d/13NLDaOngekg6P45uWLfcVCtUCCe21w80/view?usp=sharing" 
  },
  { 
    year: "2019", 
    title: "AALAM", 
    type: "Music Video", 
    role: "Visual Writer / Director / Editor", 
    achievement: "1.085 Million Views - Next Volume Production", 
    link: "https://www.youtube.com/watch?v=kC9Fx8QEXpI" 
  },
  { 
    year: "2019", 
    title: "MASEEHA", 
    type: "Play", 
    role: "Songwriter", 
    achievement: "11 successful shows, Bookmyshow - Selected in IPTAA" 
  },
  { 
    year: "2019", 
    title: "MOTHER INDIA", 
    type: "Play", 
    role: "Playwright / Director / Producer", 
    achievement: "Shows in the city" 
  },
  { 
    year: "2019", 
    title: "SUPER DISTANCE", 
    type: "Short Film", 
    role: "Writer / Director / Editor", 
    achievement: "Nagpur City Police - Awareness & Service", 
    link: "https://www.youtube.com/watch?v=4d14MySuaxA" 
  },
  { 
    year: "2019", 
    title: "SHELTERS OF LOCKDOWN", 
    type: "Documentary", 
    role: "Writer / Director / Editor", 
    achievement: "Nagpur City Police - perspective of migrants and laborers", 
    link: "https://www.youtube.com/watch?v=QuLNfAOsksg" 
  },
  { 
    year: "2019", 
    title: "SUKOON", 
    type: "Music Video", 
    role: "Visual Writer / Director / Editor", 
    achievement: "3 Million Views - Next Volume Production", 
    link: "https://www.youtube.com/watch?v=MtloyRoZ6eM" 
  },
  { 
    year: "2019", 
    title: "BAARISH", 
    type: "Music Video", 
    role: "Visual Writer / Director / Editor", 
    achievement: "Romantic Music video - benchmark in vidarbha", 
    link: "https://www.youtube.com/watch?v=MtloyRoZ6eM" 
  },
  { 
    year: "2018", 
    title: "ROOMMATES", 
    type: "Feature Film", 
    role: "Chief Assistant Director / Associate Editor / Supporting Producer", 
    achievement: "Marathi Feature Crime Thriller - Selected for NFDC Bazar screening." 
  },
  { 
    year: "2015", 
    title: "WANYAMANUS", 
    type: "Short Film", 
    role: "Writer / Director / Actor", 
    achievement: "Won NIFF Best Film Jury Mention Award", 
    link: "https://www.youtube.com/watch?v=uq-vQU2H8Og" 
  },
  { 
    year: "2017", 
    title: "PARAMPARA TVC", 
    type: "Advertisement", 
    role: "Visual Writer / Director", 
    achievement: "Karan Kothari Jewellers Commercial", 
    link: "https://www.youtube.com/watch?v=fMQt8CBAWO4" 
  },
  { 
    year: "2017", 
    title: "STRINGS", 
    type: "Short Film", 
    role: "Writer / Director / Editor", 
    achievement: "India Film Project 50Hrs Challenge", 
    link: "https://www.youtube.com/watch?v=t1Kyg-1Y4GM" 
  },
  { 
    year: "2016", 
    title: "PAWAN JI SAB SAMBHAL LENGE (PSSL)", 
    type: "Web Series", 
    role: "Screenwriter / Director / Editor", 
    achievement: "Client Based Mini Web Series - screened for 2,500 in Shirdi." 
  },
  { 
    year: "2014", 
    title: "LASTBENCHERS", 
    type: "Feature Film", 
    role: "the Making Team as Crew Cast", 
    achievement: "Independent Feature - trained a group of youngsters to make film." 
  },
  { 
    year: "2014", 
    title: "AAYUHEEN", 
    type: "Short Film", 
    role: "Writer / Director / Editor", 
    achievement: "Won In the Directors cut a local Fest.", 
    link: "https://www.youtube.com/watch?v=grhi1pAJ2Pw" 
  },
  { 
    year: "2013", 
    title: "THE NIGHT LAMP", 
    type: "Advertisement", 
    role: "Writer / Director / Editor", 
    achievement: "Infomercial produced on YouTube", 
    link: "https://www.youtube.com/watch?v=8s-BWZqBrwA" 
  }
];

const getVideoEmbedUrl = (url: string) => {
  if (!url) return null;
  
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com")) {
      const v = urlObj.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`;
    } else if (urlObj.hostname.includes("youtu.be")) {
      const id = urlObj.pathname.substring(1);
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`;
    }
  } catch (e) {
    const match = url.match(/[?&]v=([^&#]*)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`;
    }
  }
  return null;
};

const FounderStory = () => {
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const filteredProjects = filmographyData.filter((project) => {
    const matchesYear = selectedYear === "All" || project.year.toString() === selectedYear;
    const matchesType = selectedType === "All" || project.type === selectedType;
    return matchesYear && matchesType;
  });

  const activeProject = filmographyData.find(p => p.link && getVideoEmbedUrl(p.link) === activeVideo);

  const years = ["All", ...Array.from(new Set(filmographyData.map(p => p.year.toString())))].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return b.localeCompare(a); // Sort descending
  });

  const types = ["All", ...Array.from(new Set(filmographyData.map(p => p.type)))].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return a.localeCompare(b);
  });
  return (
    <div className="min-h-screen bg-background pt-24 font-body text-foreground">
      {/* Background aesthetics */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none z-[-1]" />
      <div className="fixed top-1/4 right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none opacity-40 z-[-1]" />

      <div className="container px-4 sm:px-8 mx-auto xl:max-w-[1200px] pb-24">
        
        {/* Navigation Return */}
        <div className="mb-10">
          <Link to="/team" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" /> Return to About & Contact
          </Link>
        </div>

        {/* Page Title Header */}
        <div className="border-b border-white/10 pb-8 mb-10 text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-3 tracking-tight text-white"
          >
            Rohit Badgujar
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary font-bold uppercase tracking-widest text-sm md:text-base border-b-2 border-primary/30 inline-block pb-1"
          >
            Founder & CEO, TV³ Studios | Filmmaker | Engineer
          </motion.p>
        </div>

        {/* The Wikipedia Layout: Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Content (The Story) - Col Span 8 */}
          <div className="lg:col-span-8 order-2 lg:order-1 space-y-12">
            
            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white border-b border-white/10 pb-4 inline-flex items-center gap-3">
                <GraduationCap className="text-primary w-6 h-6" />
                Education & Early Life
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-base md:text-lg">
                <p className="mb-4">
                  Rooted in a culturally immersed and disciplined environment, Badgujar completed his Higher Secondary Education at <strong>Jawahar Navodaya Vidyalaya</strong> in Jinapani Sanawad, Dist. Khargone (M.P.). Experiencing this nationally renowned educational model heavily emphasized his holistic development, where he was an active participant in interschool and interstate cultural competitions.
                </p>
                <p>
                  He later achieved a <strong>Bachelor of Engineering in Civil Engineering</strong> from Yashwantrao Chavan College of Engineering (YCCE), Nagpur, a highly prestigious autonomous institute in Maharashtra known for being the Alma Mater of leading industry figures like Mr. Sonu Sood.
                </p>
              </div>
            </motion.section>

            <motion.section 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white border-b border-white/10 pb-4 inline-flex items-center gap-3">
                <BookOpen className="text-primary w-6 h-6" />
                Writing & Filmmaking Origins
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-base md:text-lg">
                <p className="mb-4">
                  Following a raw passion for filmmaking ultimately brought him closer to screenwriting. That magnetic pull led him to produce and script multiple short films, advertisements, plays, and original songs. Sharing his craft early on, he conducted a screenwriting workshop with the 'FADE IN' organization in Nagpur.
                </p>
                <p className="mb-4">
                  Before formally creating TV³ Studios, Badgujar was deeply connected to literature and writing. He served as an active member of the <strong>Vidarbha Hindi Sahitya Sammelan</strong> as a Poet. Beyond cinema, his independent writing career expanded into drafting Press Releases, local copywriting, and journalistic articles. 
                </p>
                <p>
                  Today, he is an official member of the Screenwriters Association (SWA) holding multiple registered projects, songs, and scripts ready for execution.
                </p>
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white border-b border-white/10 pb-4 inline-flex items-center gap-3">
                <MapPin className="text-primary w-6 h-6" />
                The Mumbai Phase
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-base md:text-lg">
                <p className="mb-4">
                  Trading the structural framework of Civil Engineering for the creative landscape of cinema, he aligned with the Mumbai film industry. Here, self-taught principles met the practical insights of on-ground production.
                </p>
                <p>
                  This experience brought a natural evolution: recognizing that cinematic art thrives when supported by structured execution. In Mumbai, the title of Filmmaker expanded into the role of an <strong>Art Entrepreneur</strong>.
                </p>
              </div>
            </motion.section>

            <motion.section 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white border-b border-white/10 pb-4 inline-flex items-center gap-3">
                <Film className="text-primary w-6 h-6" />
                The TV³ Studios Vision
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-base md:text-lg">
                <p className="mb-4">
                  Founding TV³ Studios was about establishing a workspace where creative art directly connects with the local economy. By focusing on authentic, narrative-driven content, the studio bridges regional voices with wider audiences, creating a meaningful connection between localized stories and the digital space.
                </p>
                <p>
                  Today, leveraging balanced experience in both creative direction and project planning, he leads TV³ Studios to generate genuine organic value—ensuring that localized storytelling has the foundation to thrive and build its own sustainable future.
                </p>
              </div>
            </motion.section>

          </div>

          {/* Sidebar (The "InfoBox" Wiki Panel) - Col Span 4 */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3 }}
               className="sticky top-28 bg-card/20 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden"
            >
              {/* Infobox Header */}
              <div className="bg-white/5 p-4 text-center border-b border-white/10">
                <h3 className="font-display text-xl font-bold tracking-wider uppercase">Rohit Badgujar</h3>
              </div>

              {/* Founder Image */}
              <div className="w-full aspect-[3/4] overflow-hidden bg-black/50 border-b border-white/10 relative group">
                 <img src="/founder.jpg" alt="Rohit Badgujar" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
              </div>

              {/* Bio Data Rows */}
              <div className="p-6 space-y-4">
                 <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-4">
                   <div className="col-span-1 text-xs text-muted-foreground font-bold uppercase tracking-widest">Born</div>
                   <div className="col-span-2 text-sm text-white">
                      23 December<br/>
                      <span className="text-muted-foreground text-xs">Indore, M.P., India</span>
                   </div>
                 </div>

                 <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-4">
                   <div className="col-span-1 text-xs text-muted-foreground font-bold uppercase tracking-widest">Education</div>
                   <div className="col-span-2 text-sm text-white space-y-2">
                      <div>
                        <span className="font-semibold block">B.E. Civil Engineering</span>
                        <span className="text-muted-foreground text-xs leading-tight block">Yashwantrao Chavan College of Engineering</span>
                      </div>
                      <div>
                        <span className="font-semibold block">Higher Secondary</span>
                        <span className="text-muted-foreground text-xs leading-tight block">Jawahar Navodaya Vidyalaya, M.P.</span>
                      </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-4">
                   <div className="col-span-1 text-xs text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1">
                      <Languages className="w-3 h-3"/> Languages
                   </div>
                   <div className="col-span-2 text-xs text-white">
                      <span className="font-bold">Fluent:</span> Hindi, English<br/>
                      <span className="font-bold">Background:</span> Marathi, Gujarati<br/>
                      <span className="font-bold">Flexible:</span> Urdu, Kannada
                   </div>
                 </div>

                 <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-4">
                   <div className="col-span-1 text-xs text-muted-foreground font-bold uppercase tracking-widest">Occupation</div>
                   <div className="col-span-2 text-sm text-white space-y-1">
                      <div className="flex items-center gap-2"><Edit3 className="w-3 h-3 text-primary"/> Filmmaker</div>
                      <div className="flex items-center gap-2"><Edit3 className="w-3 h-3 text-primary"/> Engineer</div>
                      <div className="flex items-center gap-2"><Edit3 className="w-3 h-3 text-primary"/> Art Entrepreneur</div>
                      <div className="flex items-center gap-2"><Edit3 className="w-3 h-3 text-primary"/> Screenwriter</div>
                   </div>
                 </div>

                 <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-4">
                   <div className="col-span-1 text-xs text-muted-foreground font-bold uppercase tracking-widest">Years Active</div>
                   <div className="col-span-2 text-sm text-white">
                      2013 - Present
                   </div>
                 </div>

                 <div className="grid grid-cols-3 gap-2 pb-2">
                   <div className="col-span-1 text-xs text-muted-foreground font-bold uppercase tracking-widest">Known For</div>
                   <div className="col-span-2 text-sm text-white font-semibold">
                      Founder of TV³ Studios<br/>
                      <span className="text-muted-foreground font-normal text-xs leading-relaxed inline-block mt-1">
                        Channelising the Creational Art to the Economy.
                      </span>
                   </div>
                 </div>


                 {/* Custom Wiki Metrics (Analytics hook placeholder) */}
                 <div className="mt-6 pt-4 border-t border-dashed border-primary/30 flex items-center justify-between text-xs text-primary/70">
                    <span className="uppercase tracking-widest font-bold flex items-center gap-1">
                      <Award className="w-3 h-3"/> Active Wiki
                    </span>
                    <span className="font-mono bg-primary/10 px-2 py-1 rounded">
                       Page Views: Since 2026
                    </span>
                 </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Filmography Showcase Section */}
        <div className="mt-20 pt-16 border-t border-white/10 relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight flex items-center gap-3">
              <Film className="text-primary w-8 h-8" />
              Filmography
            </h2>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">
              Directorial register & creative production timeline
            </p>
          </div>

          {/* VINTAGE CRT TELEVISION CABINET FRAME */}
          <div className="w-full bg-[#0c0c0e] border border-white/10 rounded-[2.5rem] p-4 md:p-8 shadow-2xl relative flex flex-col xl:flex-row gap-6 items-stretch">
            
            {/* Horizontal Speaker Grille slots on the left */}
            <div className="hidden xl:flex flex-col gap-2 justify-center w-6 shrink-0 border-r border-white/5 pr-4 opacity-30">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-[3px] w-full bg-zinc-700 rounded-full" />
              ))}
            </div>

            {/* TV SCREEN AREA (Inside Bezel) */}
            <div className="flex-1 bg-[#050505] rounded-[1.5rem] p-4 md:p-6 border border-zinc-900 shadow-[inset_0_0_40px_rgba(212,175,55,0.07)] relative overflow-hidden flex flex-col justify-between">
              
              {/* CRT Scanline Screen Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] opacity-20 z-20" />
                      {activeVideo ? (
                <div className="w-full flex-1 flex flex-col min-h-[400px] relative z-10">
                  {/* Top nav inside bezel */}
                  <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setActiveVideo(null)}
                        className="text-zinc-500 hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> [ Back to Films ]
                      </button>
                      
                      {activeProject?.link?.includes("drive.google.com") && (
                        <a
                          href={activeProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors border border-primary/20 px-2.5 py-1 rounded bg-primary/5 hover:bg-primary/20"
                        >
                          [ Open in Google Drive ↗ ]
                        </a>
                      )}
                    </div>
                    <span className="font-mono text-[8px] text-zinc-600 tracking-widest animate-pulse">
                      // TRANSMISSION ACTIVE
                    </span>
                  </div>

                  {/* Fullscreen Video Iframe wrapper */}
                  <div className="flex-1 rounded-xl overflow-hidden bg-black border border-white/5 relative aspect-video">
                    {activeVideo.includes("youtube.com") ? (
                      <div className="absolute inset-0 overflow-hidden">
                        <iframe
                          src={activeVideo}
                          className="w-full absolute left-0"
                          style={{ top: "-45px", height: "calc(100% + 45px)" }}
                          allow="autoplay; encrypted-media; fullscreen"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <>
                        <iframe
                          src={activeVideo}
                          className="w-full h-full absolute inset-0"
                          allow="autoplay; encrypted-media; fullscreen"
                          allowFullScreen
                        />
                        {activeVideo.includes("drive.google.com") && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-black/85 backdrop-blur border border-white/10 px-4 py-2 rounded-full text-center max-w-[90%] shadow-2xl">
                            <p className="font-mono text-[9px] text-zinc-300 uppercase tracking-widest">
                              Google Drive video not loading?{" "}
                              <a 
                                href={activeProject?.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-primary underline font-bold hover:text-white transition-colors ml-1"
                              >
                                Open in New Tab ↗
                              </a>
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {/* Cards Scroll Container */}
                  <div className="flex-1 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
                    <motion.div 
                      layout
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                          <motion.div
                            key={`${project.title}-${project.year}`}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative bg-zinc-950/60 border border-white/5 hover:border-primary/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between min-h-[260px] group transition-colors overflow-hidden"
                          >
                            {/* CRT Scanline Overlay Effect */}
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] opacity-15" />
                            
                            <div>
                              {/* Top tags */}
                              <div className="flex justify-between items-start gap-2 mb-4 relative z-10">
                                <span className="bg-zinc-900 border border-white/5 text-zinc-500 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded">
                                  {project.type}
                                </span>
                                <span className="bg-primary/10 border border-primary/20 text-primary font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-bold">
                                  {project.year}
                                </span>
                              </div>

                              {/* Project Title */}
                              <h3 className="text-xl font-display font-black text-white group-hover:text-primary transition-colors tracking-tight uppercase relative z-10">
                                {project.title}
                              </h3>

                              {/* Role */}
                              <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider mt-2.5 relative z-10">
                                {project.role}
                              </p>

                              {/* Project Description */}
                              {project.description && (
                                <p className="text-zinc-400 text-xs mt-3 leading-relaxed relative z-10">
                                  {project.description}
                                </p>
                              )}

                              {/* Achievement Details */}
                              {project.achievement && (
                                <div className="mt-4 border-l border-primary/40 bg-primary/5 px-3 py-1.5 rounded-r relative z-10">
                                  <span className="text-[8px] font-mono text-primary font-bold uppercase tracking-widest block">Featured Info //</span>
                                  <span className="text-[11px] text-zinc-300 leading-snug block mt-0.5">{project.achievement}</span>
                                </div>
                              )}
                            </div>

                            {/* Conditional Watch button */}
                            {project.link && getVideoEmbedUrl(project.link) && (
                              <div className="mt-6 flex justify-end relative z-10">
                                <button 
                                  onClick={() => {
                                    const embedUrl = getVideoEmbedUrl(project.link);
                                    if (embedUrl) setActiveVideo(embedUrl);
                                  }}
                                  className="inline-flex items-center gap-1 bg-primary hover:bg-white text-black font-mono text-[9px] uppercase font-bold tracking-widest px-4 py-2 rounded-full transition-all shadow-[0_0_10px_rgba(212,175,55,0.15)] hover:shadow-none"
                                >
                                  Watch
                                  <ArrowLeft className="w-3 h-3 rotate-180" />
                                </button>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  
                  {filteredProjects.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl relative z-10">
                      <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">No matching projects found for selected filters</p>
                    </div>
                  )}
                </>
              )}

              {/* BOTTOM OF TV: Information Strip inside the bezel */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[8px] text-zinc-500 tracking-widest relative z-10">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                  TV³ STUDIOS // FILMMAKER ARCHIVE
                </span>
                <span className="text-primary font-bold flex items-center gap-2">
                  {filteredProjects.length} TITLES
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </span>
              </div>
            </div>

            {/* RIGHT SIDE CONTROL PANEL */}
            <div className="w-full xl:w-64 bg-[#111114] border border-white/5 p-6 rounded-2xl flex flex-col justify-between gap-6 shrink-0 relative">
              <div>
                {/* Channel Select header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">Channel Select</span>
                  {/* Glowing pulses */}
                  <div className="flex items-center gap-1.5">
                    <motion.div 
                      animate={(activeVideo || selectedYear !== "All" || selectedType !== "All") ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.3 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className={`w-2 h-2 rounded-full ${(activeVideo || selectedYear !== "All" || selectedType !== "All") ? 'bg-primary shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'bg-zinc-700'}`}
                    />
                    <span className="font-mono text-[7px] text-zinc-500 uppercase tracking-wider font-bold">Signal</span>
                  </div>
                </div>

                {/* Playing Project Status Widget */}
                {activeVideo && activeProject && (
                  <div className="bg-zinc-950 border border-primary/20 p-4 rounded-xl mb-4 space-y-3 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(212,175,55,0.03)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] opacity-20" />
                    <div>
                      <span className="text-[7px] font-mono text-primary font-bold uppercase tracking-widest block">// Now Playing</span>
                      <span className="text-xs font-bold text-primary block mt-1 uppercase tracking-wider truncate">{activeProject.title}</span>
                    </div>
                    <button
                      onClick={() => setActiveVideo(null)}
                      className="w-full flex items-center justify-center gap-1.5 bg-red-950/40 border border-red-800/30 hover:bg-red-900/40 text-red-400 font-mono text-[9px] uppercase font-bold tracking-widest py-2 rounded-lg transition-all"
                    >
                      <span>⏹ Stop Video</span>
                    </button>
                  </div>
                )}

                {/* Controls container (dimmed if playing) */}
                <div className={activeVideo ? "opacity-30 pointer-events-none transition-opacity duration-300" : "transition-opacity duration-300"}>
                  {/* Type filters styled as physical selector buttons */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 block mb-2 font-bold">// Format Band</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {types.map((tp) => {
                        const isActive = selectedType === tp;
                        return (
                          <button
                            key={tp}
                            onClick={() => setSelectedType(tp)}
                            className={`text-left px-2.5 py-2 text-[9px] font-mono rounded-lg uppercase tracking-wider transition-all border ${
                              isActive
                                ? "bg-zinc-950 border-primary/50 text-primary font-bold shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                                : "bg-[#18181c] border-white/5 text-zinc-400 hover:bg-[#202026] hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-primary' : 'bg-zinc-700'}`} />
                              <span className="truncate">{tp.replace(" Film", "")}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Year filter styled as a rotary/select widget */}
                  <div className="space-y-2">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 block mb-2 font-bold">// Chrono Dial</span>
                    <div className="relative">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full bg-[#18181c] border border-white/5 text-primary hover:border-primary/30 font-mono text-[10px] uppercase font-bold tracking-widest rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:border-primary/50 cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                      >
                        {years.map((yr) => (
                          <option key={yr} value={yr} className="bg-zinc-950 text-white font-mono">
                            {yr === "All" ? "ALL YEARS" : `YEAR: ${yr}`}
                          </option>
                        ))}
                      </select>
                      {/* Rotary arrow indicator */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 rounded-full border border-primary/20 flex items-center justify-center bg-zinc-900">
                        <div className="w-[2px] h-2.5 bg-primary rounded-full transform rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative brand marks at the bottom of the panel */}
              <div className="border-t border-white/5 pt-4 flex flex-col gap-1 text-[7px] font-mono text-zinc-600 tracking-widest uppercase">
                <span>SYSTEM REGISTRY // 28-98</span>
                <span>TUNING STATE: SECURE</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default FounderStory;
