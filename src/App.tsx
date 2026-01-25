import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/hooks/useTheme";
import { PageTransition } from "@/components/PageTransition";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Portfolio } from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import WebPortfolio from "./pages/projects/WebPortfolio";
import SceneSyncEdits from "./pages/projects/SceneSyncEdits";
import VisualDesign from "./pages/projects/VisualDesign";
import GrowthStrategy from "./pages/projects/GrowthStrategy";
import VideoEditingPostProduction from "./pages/projects/VideoEditingPostProduction";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectPage from "./pages/ProjectPage";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/project/:projectId" element={<PageTransition><ProjectPage /></PageTransition>} />
          <Route path="/projects/web-portfolio" element={<PageTransition><WebPortfolio /></PageTransition>} />
          <Route path="/projects/scenesync-edits" element={<PageTransition><SceneSyncEdits /></PageTransition>} />
          <Route path="/projects/visual-design" element={<PageTransition><VisualDesign /></PageTransition>} />
          <Route path="/projects/growth-strategy" element={<PageTransition><GrowthStrategy /></PageTransition>} />
          <Route path="/projects/video-editing-post-production" element={<PageTransition><VideoEditingPostProduction /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
