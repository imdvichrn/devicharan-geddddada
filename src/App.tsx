import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/hooks/useTheme";
import { PageTransition } from "@/components/PageTransition";
import { Navigation } from "@/components/Navigation";
import { BackgroundLoop } from "@/components/BackgroundLoop";
import { Chatbot } from "@/components/Chatbot";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageContainer } from "@/components/PageContainer";
import { Analytics } from '@vercel/analytics/react';
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Portfolio } from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

import VideoEditingPostProduction from "./pages/projects/VideoEditingPostProduction";
import AnnapurnaFoundationPage from "./pages/projects/AnnapurnaFoundationPage";
import ExamFlowOSPage from "./pages/projects/ExamFlowOSPage";
import ProjectPage from "./pages/ProjectPage";
import PerfectPackPage from "./pages/PerfectPackPage";
import WorkPage from "./pages/WorkPage";
import SoftwarePage from "./pages/SoftwarePage";
import VideoPage from "./pages/VideoPage";
import WebPage from "./pages/WebPage";
import SystemsPage from "./pages/SystemsPage";
import WritingPage from "./pages/WritingPage";
import ExperimentsPage from "./pages/ExperimentsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SkillsPage from "./pages/SkillsPage";
import ExamFlowOSJourney from "./pages/blog/ExamFlowOSJourney";
import ExamFlowOSGuide from "./pages/blog/ExamFlowOSGuide";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><PageContainer maxWidth="wide"><Portfolio /></PageContainer></PageTransition>} />
          
          {/* Work Hub */}
          <Route path="/work" element={<PageTransition><PageContainer maxWidth="wide"><WorkPage /></PageContainer></PageTransition>} />
          
          {/* 4 Dedicated Work Disciplines */}
          <Route path="/software" element={<PageTransition><PageContainer maxWidth="wide"><SoftwarePage /></PageContainer></PageTransition>} />
          <Route path="/work/software" element={<Navigate to="/software" replace />} />
          <Route path="/products" element={<Navigate to="/software" replace />} />
          <Route path="/work/products" element={<Navigate to="/software" replace />} />

          <Route path="/video" element={<PageTransition><PageContainer maxWidth="wide"><VideoPage /></PageContainer></PageTransition>} />
          <Route path="/work/video" element={<Navigate to="/video" replace />} />
          <Route path="/video-editing" element={<Navigate to="/video" replace />} />
          
          <Route path="/web" element={<PageTransition><PageContainer maxWidth="wide"><WebPage /></PageContainer></PageTransition>} />
          <Route path="/work/web" element={<Navigate to="/web" replace />} />
          <Route path="/websites" element={<Navigate to="/web" replace />} />
          <Route path="/work/websites" element={<Navigate to="/web" replace />} />

          <Route path="/systems" element={<PageTransition><PageContainer maxWidth="wide"><SystemsPage /></PageContainer></PageTransition>} />
          <Route path="/work/systems" element={<Navigate to="/systems" replace />} />
          
          {/* Content & Digital Home */}
          <Route path="/writing" element={<PageTransition><PageContainer maxWidth="default"><WritingPage /></PageContainer></PageTransition>} />
          <Route path="/experiments" element={<PageTransition><PageContainer maxWidth="default"><ExperimentsPage /></PageContainer></PageTransition>} />
          <Route path="/skills" element={<PageTransition><PageContainer maxWidth="wide"><SkillsPage /></PageContainer></PageTransition>} />
          <Route path="/about" element={<PageTransition><PageContainer maxWidth="default"><AboutPage /></PageContainer></PageTransition>} />
          <Route path="/contact" element={<PageTransition><PageContainer maxWidth="default"><ContactPage /></PageContainer></PageTransition>} />
          
          {/* Detail pages & case studies */}
          <Route path="/perfect-pack" element={<PageTransition><PageContainer maxWidth="default"><PerfectPackPage /></PageContainer></PageTransition>} />
          <Route path="/project/perfect-pack" element={<Navigate to="/perfect-pack" replace />} />
          <Route path="/project/annapurna-foundation" element={<PageTransition><PageContainer maxWidth="wide"><AnnapurnaFoundationPage /></PageContainer></PageTransition>} />
          <Route path="/projects/annapurna-foundation" element={<Navigate to="/project/annapurna-foundation" replace />} />
          <Route path="/work/annapurna-foundation" element={<Navigate to="/project/annapurna-foundation" replace />} />
          <Route path="/project/examflow-os" element={<PageTransition><PageContainer maxWidth="wide"><ExamFlowOSPage /></PageContainer></PageTransition>} />
          <Route path="/projects/examflow-os" element={<Navigate to="/project/examflow-os" replace />} />
          <Route path="/work/examflow-os" element={<Navigate to="/project/examflow-os" replace />} />
          <Route path="/examflow-os" element={<Navigate to="/project/examflow-os" replace />} />
          <Route path="/project/examflow-os/blog/examflowos-journey" element={<PageTransition><PageContainer maxWidth="default"><ExamFlowOSJourney /></PageContainer></PageTransition>} />
          <Route path="/project/examflow-os/blog/examflowos-all-in-one-exam-prep-app-ap-tg-ecet-icet-polycet" element={<PageTransition><PageContainer maxWidth="default"><ExamFlowOSGuide /></PageContainer></PageTransition>} />
          <Route path="/project/:projectId" element={<PageTransition><PageContainer maxWidth="wide"><ProjectPage /></PageContainer></PageTransition>} />
          <Route path="/projects/video-editing-post-production" element={<PageTransition><PageContainer maxWidth="default"><VideoEditingPostProduction /></PageContainer></PageTransition>} />
          
          {/* Legacy redirects */}
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="/projects" element={<Navigate to="/work" replace />} />
          <Route path="/projects/web-portfolio" element={<Navigate to="/web" replace />} />
          <Route path="/projects/scenesync-edits" element={<Navigate to="/video" replace />} />
          <Route path="/projects/visual-design" element={<Navigate to="/project/visual-design" replace />} />
          <Route path="/projects/growth-strategy" element={<Navigate to="/project/growth-strategy" replace />} />
          <Route path="*" element={<PageTransition><PageContainer maxWidth="narrow"><NotFound /></PageContainer></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

const App = () => (
  <HelmetProvider>
    <Helmet defaultTitle="Geddada Devicharan — Personal Digital Space" />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <BackgroundLoop />
            <Navigation />
            <main className="relative z-10">
              <ErrorBoundary>
                <AnimatedRoutes />
              </ErrorBoundary>
            </main>
            <Chatbot />
          </BrowserRouter>
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
