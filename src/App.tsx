import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TeamContact from "./pages/TeamContact";
import Services from "./pages/Services";
import StudioWork from "./pages/StudioWork";
import FounderStory from "./pages/FounderStory";
import AdminVault from "./pages/AdminVault";
import LiveCampaign from "./pages/LiveCampaign";
import Unit01 from "./pages/Unit01";
import Unit02 from "./pages/Unit02";
import Station04 from "./pages/Station04";
import Station05 from "./pages/Station05";
import Station06 from "./pages/Station06";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/team" element={<TeamContact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/studio-work" element={<StudioWork />} />
          <Route path="/founder-story" element={<FounderStory />} />
          <Route path="/unit/01" element={<Unit01 />} />
          <Route path="/unit/02" element={<Unit02 />} />
          <Route path="/unit/03" element={<LiveCampaign />} />
          <Route path="/unit/04" element={<Station04 />} />
          <Route path="/unit/05" element={<Station05 />} />
          <Route path="/unit/06" element={<Station06 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
