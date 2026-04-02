import { motion } from "framer-motion";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

const TeamContact = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Background aesthetics */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none -z-10" />

      {/* Embedded Team Section from earlier */}
      <TeamSection />

      <div className="line-thin mx-auto max-w-4xl" />

      {/* Contact Section dedicated to the new page */}
      <section className="py-24 relative" id="contact">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight"
            >
              Get In <span className="text-primary">Touch</span>
            </motion.h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to broadcast your brand? Connect with the team today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 text-center hover:bg-white/5 transition-all"
            >
               <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center text-primary">
                 <Mail className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Email Us</h3>
               <p className="text-muted-foreground mb-4">For all project inquiries</p>
               <a href="mailto:hello@tvstudios.site" className="text-lg font-semibold hover:text-primary transition-colors">
                 hello@tvstudios.site
               </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 text-center hover:bg-white/5 transition-all"
            >
               <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center text-primary">
                 <Phone className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Call Us</h3>
               <p className="text-muted-foreground mb-4">Mon-Fri, 9am to 6pm</p>
              <a href="https://wa.me/918149981660" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-[hsl(43_72%_55%)] transition-colors inline-flex items-center gap-2">
                MESSAGE TVSSSMETRIX
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 text-center hover:bg-white/5 transition-all"
            >
               <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center text-primary">
                 <MapPin className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold mb-2">Our Base</h3>
               <p className="text-muted-foreground mb-4">Operations & Creative</p>
               <p className="text-lg font-semibold">
                 Mumbai, India
               </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamContact;
