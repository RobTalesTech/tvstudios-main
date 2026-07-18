import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TeamContact from "./pages/TeamContact";
import Services from "./pages/Services";
import BrandedContent from "./pages/BrandedContent";
import GetStarted from "./pages/GetStarted";
import StudioWork from "./pages/StudioWork";
import AdminVault from "./pages/AdminVault";
import CreatorStudio from "./pages/CreatorStudio";
import Locked from "./pages/Locked";
import Navbar from "./components/Navbar";
import TVIntro from "./components/TVIntro";
import { useState } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const [hasEntered, setHasEntered] = useState(() => {
    return sessionStorage.getItem("hasEnteredTV") === "true";
  });

  if (!hasEntered) {
    return (
      <TVIntro 
        onEnter={() => {
          sessionStorage.setItem("hasEnteredTV", "true");
          setHasEntered(true);
        }} 
      />
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/team" element={<TeamContact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/branded-content" element={<BrandedContent />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/studio-work" element={<StudioWork />} />
        <Route path="/admin-vault" element={<AdminVault />} />
        <Route path="/creator-studio" element={<CreatorStudio />} />
        <Route path="/unit/01" element={<Locked />} />
        <Route path="/unit/02" element={<Locked />} />
        <Route path="/unit/03" element={<Locked />} />
        <Route path="/unit/04" element={<Locked />} />
        <Route path="/unit/05" element={<Locked />} />
        <Route path="/unit/06" element={<Locked />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
