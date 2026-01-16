import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/hooks/useTheme";
import { Portfolio } from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import WebPortfolio from "./pages/projects/WebPortfolio";
import SceneSyncEdits from "./pages/projects/SceneSyncEdits";
import VisualDesign from "./pages/projects/VisualDesign";
import GrowthStrategy from "./pages/projects/GrowthStrategy";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/projects/web-portfolio" element={<WebPortfolio />} />
              <Route path="/projects/scenesync-edits" element={<SceneSyncEdits />} />
              <Route path="/projects/visual-design" element={<VisualDesign />} />
              <Route path="/projects/growth-strategy" element={<GrowthStrategy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
