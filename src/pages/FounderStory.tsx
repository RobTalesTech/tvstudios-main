import { motion } from "framer-motion";
import { ArrowLeft, Edit3, Film, MapPin, Award, BookOpen, GraduationCap, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const FounderStory = () => {
  return (
    <div className="min-h-screen bg-background pt-24 font-body text-foreground">
      {/* Background aesthetics */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none z-[-1]" />
      <div className="fixed top-1/4 right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none opacity-40 z-[-1]" />

      <div className="container px-4 sm:px-8 mx-auto xl:max-w-[1200px] pb-24">
        
        {/* Navigation Return */}
        <div className="mb-10">
          <Link to="/team" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" /> Return to Team
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
            Founder & CEO, TV Studios | Filmmaker | Engineer
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
                  Before formally creating TV Studios, Badgujar was deeply connected to literature and writing. He served as an active member of the <strong>Vidarbha Hindi Sahitya Sammelan</strong> as a Poet. Beyond cinema, his independent writing career expanded into drafting Press Releases, local copywriting, and journalistic articles. 
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
                Chasing Mumbai
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-base md:text-lg">
                <p className="mb-4">
                  Trading the structural rigidity of Civil Engineering for the fluid uncertainty of cinema, he moved toward the relentless grind of the Mumbai film industry. Here, the raw theory of his self-taught roots met the unforgiving reality of on-ground execution.
                </p>
                <p>
                  This crucible forced an evolution: recognizing that brilliant art means little without aggressive business architecture. It was in Mumbai that the title of Filmmaker slowly expanded into the more demanding role of an <strong>Art Entrepreneur</strong>.
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
                The TV Studios Vision
              </h2>
              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-base md:text-lg">
                <p className="mb-4">
                  Founding TV Studios wasn't just about launching a production house; it was about building a framework for <em>channelising the creational art to the economy</em>. By utilizing his rare, naturally dominant writing skills, Badgujar positioned TVS precisely in a distinct niche: providing deep, authentic storytelling that connects the local to the globe.
                </p>
                <p>
                  Today, bringing years of hardened experience navigating both creative production and hard business scaling, he leads TV Studios as an Art Entrepreneur—where the ultimate goal is generating real organic value while allowing the truest art to finance its own future.
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
                      [Your Date or Year of Birth]<br/>
                      <span className="text-muted-foreground text-xs">[City, State, Country]</span>
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
                      Founder of TV Studios<br/>
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
      </div>
      <Footer />
    </div>
  );
};

export default FounderStory;
