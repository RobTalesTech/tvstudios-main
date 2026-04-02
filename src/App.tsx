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
import Station04 from "./pages/Station04";
import Station05 from "./pages/Station05";
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
          <Route path="/admin-vault" element={<AdminVault />} />
          <Route path="/station/03" element={<LiveCampaign />} />
          <Route path="/station/04" element={<Station04 />} />
          <Route path="/station/05" element={<Station05 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
