import HeroSection from "@/components/HeroSection";
import MovementSection from "@/components/MovementSection";
import StationPreview from "@/components/StationPreview";
import StudioPulse from "@/components/StudioPulse";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-[hsl(43_72%_55%)] selection:text-black">
      {/* Floating WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppButton label="" className="h-14 w-14 justify-center rounded-full p-0 shadow-lg" />
      </div>

      <HeroSection />          {/* Intro & Foundation */}
      <StationPreview />        {/* Two TV cards — Station 02 & 03 */}
      <StudioPulse />           {/* Film-strip scrolling feed */}
      <MovementSection />       {/* Brand manifesto */}

      <Footer />
    </div>
  );
};

export default Index;
