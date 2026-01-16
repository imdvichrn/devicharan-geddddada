import { ProjectLayout } from '@/components/ProjectLayout';

export default function WebPortfolio() {
  return (
    <ProjectLayout
      title="Web Portfolio"
      description="A modern, responsive personal portfolio website showcasing my skills, projects, and professional journey. Built with a focus on clean design, smooth animations, and optimal user experience across all devices."
      year="2024"
      tools={[
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Vite",
        "Glassmorphism UI"
      ]}
      roles={[
        "UI/UX Design",
        "Frontend Development",
        "Responsive Design",
        "Performance Optimization"
      ]}
      process={[
        {
          title: "Research & Planning",
          description: "Analyzed modern portfolio trends and identified key features that would effectively showcase my skills. Created wireframes and established a cohesive visual identity inspired by macOS design language."
        },
        {
          title: "Design System Development",
          description: "Built a comprehensive design system with glassmorphism effects, custom animations, and a carefully curated color palette that works seamlessly in both light and dark modes."
        },
        {
          title: "Component Architecture",
          description: "Developed reusable React components with TypeScript for type safety. Implemented intersection observers for scroll animations and optimized performance with lazy loading."
        },
        {
          title: "Testing & Refinement",
          description: "Conducted thorough testing across devices and browsers. Fine-tuned animations, improved accessibility, and optimized loading performance for the best user experience."
        }
      ]}
      mediaPlaceholders={[
        { type: 'image', label: 'Homepage Hero Screenshot' },
        { type: 'image', label: 'Skills Section Preview' },
        { type: 'image', label: 'Mobile Responsive View' },
        { type: 'image', label: 'Dark Mode Showcase' }
      ]}
      metaDescription="Web Portfolio project by Geddada Devicharan - A modern React portfolio with glassmorphism design, smooth animations, and responsive layout."
    />
  );
}
