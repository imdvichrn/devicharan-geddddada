import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { ThemeProvider } from "@/hooks/useTheme";
import { PageTransition } from "@/components/PageTransition";
import { Navigation } from "@/components/Navigation";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Analytics } from '@vercel/analytics/react';
import { Chatbot } from "@/components/Chatbot";
import { Portfolio } from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

import VideoEditingPostProduction from "./pages/projects/VideoEditingPostProduction";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectPage from "./pages/ProjectPage";
import PerfectPackPage from "./pages/PerfectPackPage";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
          <Route path="/perfect-pack" element={<PageTransition><PerfectPackPage /></PageTransition>} />
          <Route path="/project/perfect-pack" element={<Navigate to="/perfect-pack" replace />} />
          <Route path="/project/:projectId" element={<PageTransition><ProjectPage /></PageTransition>} />
          <Route path="/projects/video-editing-post-production" element={<PageTransition><VideoEditingPostProduction /></PageTransition>} />
          {/* Legacy redirects for removed project pages */}
          <Route path="/projects/web-portfolio" element={<Navigate to="/#projects" replace />} />
          <Route path="/projects/scenesync-edits" element={<Navigate to="/#projects" replace />} />
          <Route path="/projects/visual-design" element={<Navigate to="/project/visual-design" replace />} />
          <Route path="/projects/growth-strategy" element={<Navigate to="/project/growth-strategy" replace />} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

const App = () => (
  <HelmetProvider>
    <Helmet defaultTitle="GEDDADA DEVICHARAN" />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <AnimatedRoutes />
            {/* Chatbot at root level - placed outside routes to avoid being clipped by overflow:hidden or transforms */}
            <Suspense fallback={null}>
              <Chatbot />
            </Suspense>
          </BrowserRouter>
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
