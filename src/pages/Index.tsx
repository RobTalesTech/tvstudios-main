import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import CreativeShowcase from "@/components/CreativeShowcase";
import DirectorTalk from "@/components/DirectorTalk";
import MovementSection from "@/components/MovementSection";
import StationPreview from "@/components/StationPreview";
import StudioPulse from "@/components/StudioPulse";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-[hsl(43_72%_55%)] selection:text-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating WhatsApp */}
        <div className="fixed bottom-6 right-6 z-50">
          <WhatsAppButton label="" className="h-14 w-14 justify-center rounded-full p-0 shadow-lg" />
        </div>

        <HeroSection />          {/* Intro & Foundation */}
        <CreativeShowcase />     {/* Cinematic Text Showcases */}
        <StationPreview />        {/* TV cards — Station 02, 03 */}
        <StudioPulse />           {/* Film-strip scrolling feed */}
        <MovementSection />       {/* Brand manifesto (Art. Tech. Economy.) */}
        <DirectorTalk />          {/* Founder Brief sitting below Art. Tech. Economy. */}

        <Footer />
      </motion.div>
    </div>
  );
};

export default Index;
