import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Chatbot } from '@/components/Chatbot';
import { WindowChrome } from '@/components/WindowChrome';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Film, Zap, Code, Sparkles, Palette, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MagneticButton from '@/components/MagneticButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const Index = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 500], [0, 100]);

  const faqItems = [
    {
      question: 'What is your editing specialty?',
      answer: 'I specialize in advanced video editing with DaVinci Resolve Studio, Adobe Premiere Pro, and professional sound design. My expertise spans 4K workflows, color grading, VFX compositing, and complete post-production pipelines.',
    },
    {
      question: 'How do you approach post-production?',
      answer: 'I follow a structured process: footage organization, rough assembly, detailed editing with beat-sync precision, color grading with consistent color science, VFX integration, and professional audio mixing. Every project receives meticulous attention to detail.',
    },
    {
      question: 'Can you handle motion graphics?',
      answer: 'Yes! I create 3D motion graphics using Fusion and integrate complex animations seamlessly into edited content. From title sequences to kinetic typography, I bring visual impact to your projects.',
    },
    {
      question: 'What\'s your turnaround time?',
      answer: 'Project timelines depend on scope and complexity. A typical video edit takes 2-4 weeks. Rush deliveries are available upon request with additional investment.',
    },
    {
      question: 'Do you offer color grading services?',
      answer: 'Absolutely. I specialize in professional color grading with node-based color science in DaVinci Resolve, including HDR mastering, film emulation, and consistent color storytelling across multi-camera shoots.',
    },
  ];

  const projects = [
    {
      id: 'video-production',
      title: 'Professional Video Production',
      description: 'Cinematic 4K editing with industry-standard color grading and VFX',
      tags: ['DaVinci Resolve', 'Color Grading', 'VFX'],
      icon: <Film className="w-5 h-5" />,
    },
    {
      id: 'scenesync-edits',
      title: 'SceneSync Edits',
      description: 'Beat-synchronized editing with dynamic transitions and audio-reactive visuals',
      tags: ['Audio Sync', 'Motion Design', 'Transitions'],
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: 'visual-design',
      title: 'Visual Design Portfolio',
      description: 'Creative graphics, branding, and digital assets across platforms',
      tags: ['Graphic Design', 'Branding', 'UI/UX'],
      icon: <Palette className="w-5 h-5" />,
    },
    {
      id: 'growth-strategy',
      title: 'Growth Strategy',
      description: 'Data-driven digital marketing and audience growth strategies',
      tags: ['Analytics', 'Strategy', 'Growth'],
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  const skills = [
    {
      category: 'Video Editing',
      items: ['DaVinci Resolve Studio', 'Adobe Premiere Pro', 'Advanced Color Grading', 'Fusion VFX'],
    },
    {
      category: 'Audio Engineering',
      items: ['Fairlight Audio Mixing', 'Sound Design', 'Audio Restoration', 'Spatial Audio'],
    },
    {
      category: '3D & Motion',
      items: ['Fusion 3D Compositing', 'Motion Graphics', 'Kinetic Typography', 'VFX Integration'],
    },
    {
      category: 'Post-Production',
      items: ['4K Workflow', 'RAW Processing', 'HDR Mastering', 'Delivery Optimization'],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Geddada Devicharan | Lead Video Editor & Post-Production Specialist</title>
        <meta
          name="description"
          content="Specialized video editor and post-production specialist. Advanced editing, color grading, VFX, and audio engineering. Based in Visakhapatnam. Ready for your next project."
        />
        <meta name="keywords" content="video editing, post-production, DaVinci Resolve, color grading, VFX, audio engineering, Visakhapatnam" />
        <meta property="og:title" content="Geddada Devicharan | Lead Video Editor & Post-Production Specialist" />
        <meta property="og:description" content="Premium post-production services. Advanced editing, color grading, VFX integration, and sound design." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navigation />

      {/* Hero Section - Split Screen */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#020617] via-[#020617] to-[#0d1b3d]"
        style={{ y: parallax }}
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 md:px-8 min-h-screen">
          {/* Left Side - Typography Heavy Introduction */}
          <motion.div
            className="space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-4 py-2 text-sm font-medium"
              >
                <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse" />
                Available for Freelance Projects
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-indigo-200 via-white to-indigo-100 bg-clip-text text-transparent">
                  Cinematic
                </span>
                <br />
                <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  Post-Production
                </span>
                <br />
                <span className="text-indigo-300">Mastery</span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-indigo-100/80 leading-relaxed max-w-lg"
            >
              Lead Video Editor, Sound Engineer, and Post-Production Specialist. Transforming raw footage into cinema-quality productions with advanced color grading, VFX integration, and professional audio engineering.
            </motion.p>

            {/* Key Services */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              {[
                { icon: <Film className="w-5 h-5" />, text: 'Advanced Editing' },
                { icon: <Palette className="w-5 h-5" />, text: 'Color Grading' },
                { icon: <Sparkles className="w-5 h-5" />, text: 'VFX & Motion' },
                { icon: <Volume2 className="w-5 h-5" />, text: 'Audio Design' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-indigo-200/90"
                >
                  <span className="text-indigo-400">{item.icon}</span>
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/projects/scene-sync">
                <MagneticButton
                  className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  <Play className="w-4 h-4 mr-2 inline" />
                  View Showreel
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </MagneticButton>
              </Link>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-indigo-400/30 text-indigo-200 hover:bg-indigo-500/10 px-8 py-3 rounded-lg font-semibold"
                asChild
              >
                <a href="/cv.pdf" download>
                  Download CV
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-indigo-500/20"
            >
              {[
                { number: '50+', label: 'Projects Completed' },
                { number: '8+', label: 'Years Experience' },
                { number: '100%', label: 'Client Satisfaction' },
              ].map((stat, idx) => (
                <motion.div key={idx} variants={itemVariants} className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-indigo-300">{stat.number}</div>
                  <div className="text-xs md:text-sm text-indigo-200/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Auto-playing Showreel Window */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex justify-center items-center"
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
          >
            <motion.div
              className="relative w-full max-w-md h-96 rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Window Chrome */}
              <div className="absolute top-0 left-0 right-0 z-20 p-3 bg-gradient-to-b from-black/40 to-transparent">
                <WindowChrome className="ml-0" />
              </div>

              {/* Glassmorphic Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent backdrop-blur-xl border border-indigo-400/30" />

              {/* Video Content */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster="/showreel-poster.png"
              >
                <source src="/showreel.webm" type="video/webm" />
                <source src="/showreel.mp4" type="video/mp4" />
              </video>

              {/* Play Overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-indigo-500/80 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                </motion.div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-3 border border-indigo-500/20"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-white text-sm font-medium">↓ Scroll to explore my work</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-indigo-400/60 text-sm font-medium">Scroll to explore</div>
        </motion.div>
      </motion.section>

      {/* About Section - Scrollytelling */}
      <motion.section
        id="about"
        className="relative py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-[#0d1b3d] to-[#020617]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="space-y-4 text-center">
              <Badge className="mx-auto bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                About My Craft
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent">
                  Premium Post-Production Excellence
                </span>
              </h2>
              <p className="text-indigo-200/70 text-lg max-w-2xl mx-auto">
                Every project I touch receives meticulous attention to detail, cutting-edge techniques, and creative problem-solving to deliver cinema-quality results.
              </p>
            </motion.div>

            {/* Skills Grid */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skillGroup, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="glass-panel rounded-xl p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 group"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((item, jdx) => (
                      <li key={jdx} className="text-indigo-200/80 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Carousel Section */}
      <motion.section
        id="projects"
        className="relative py-20 md:py-32 px-4 md:px-8 bg-[#020617]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-12"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-4">
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                Portfolio
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
            </motion.div>

            {/* Carousel */}
            <Carousel className="w-full">
              <CarouselContent>
                {projects.map((project, idx) => (
                  <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                    <Link to={`/projects/${project.id}`}>
                      <motion.div
                        variants={itemVariants}
                        className="h-full"
                        whileHover={{ y: -8 }}
                      >
                        <Card className="glass-panel h-full cursor-pointer border-indigo-500/20 hover:border-indigo-500/40 group overflow-hidden transition-all duration-300">
                          <CardContent className="p-6 h-full flex flex-col justify-between">
                            <div className="space-y-4">
                              <div className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                {project.icon}
                              </div>
                              <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-indigo-200/70 text-sm">
                                {project.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4">
                              {project.tags.map((tag, tdx) => (
                                <Badge
                                  key={tdx}
                                  variant="secondary"
                                  className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20" />
              <CarouselNext className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20" />
            </Carousel>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section - Accordion */}
      <motion.section
        className="relative py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-[#020617] to-[#0d1b3d]"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-12"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-4 text-center">
              <Badge className="mx-auto bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent">
                  Common Questions
                </span>
              </h2>
            </motion.div>

            {/* Accordion */}
            <motion.div variants={itemVariants}>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqItems.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="glass-panel rounded-lg border-indigo-500/20 px-6 data-[state=open]:bg-indigo-500/10"
                  >
                    <AccordionTrigger className="text-lg font-semibold text-indigo-100 hover:text-indigo-300 transition-colors py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-indigo-200/80 text-base pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="relative py-20 md:py-32 px-4 md:px-8 bg-[#020617]"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            className="space-y-8 text-center glass-panel rounded-2xl p-8 md:p-12 border-indigo-500/30 relative overflow-hidden"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
            </div>

            <div className="relative z-10 space-y-6">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent">
                  Ready to Elevate Your Project?
                </span>
              </motion.h2>

              <motion.p variants={itemVariants} className="text-indigo-200/80 text-lg max-w-2xl mx-auto">
                Let's collaborate on your next video project. Whether you need full post-production or specialized services, I'm here to deliver exceptional results.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <MagneticButton
                  className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all"
                  asChild
                >
                  <a href="mailto:devicharangeddada@gmail.com">
                    Get In Touch
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </a>
                </MagneticButton>
                <Button
                  variant="outline"
                  className="px-8 py-3 border-indigo-400/30 text-indigo-200 hover:bg-indigo-500/10 rounded-lg font-semibold"
                  asChild
                >
                  <a href="https://wa.me/916303468707" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Chatbot */}
      <Chatbot ref={undefined} />
    </>
  );
};

export default Index;
