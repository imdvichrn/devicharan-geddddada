import { ProjectLayout } from '@/components/ProjectLayout';

export default function VisualDesign() {
  return (
    <ProjectLayout
      title="Visual Design"
      description="A collection of visual design work including posters, infographics, social media graphics, and brand materials. Combining creativity with strategic thinking to create impactful visual communications."
      year="2024"
      tools={[
        "Adobe Photoshop",
        "Canva",
        "Figma",
        "Adobe Illustrator",
        "AI Image Tools",
        "Midjourney"
      ]}
      roles={[
        "Graphic Designer",
        "Visual Communication",
        "Brand Identity",
        "Social Media Design",
        "Layout Design"
      ]}
      process={[
        {
          title: "Brief & Research",
          description: "Understanding the project requirements, target audience, and brand guidelines. I research competitors and current design trends to inform creative direction while maintaining originality."
        },
        {
          title: "Concept Development",
          description: "Sketching initial ideas and exploring multiple visual directions. This phase involves experimenting with typography, color palettes, and compositional approaches to find the strongest concept."
        },
        {
          title: "Design Execution",
          description: "Bringing the chosen concept to life with attention to detail. I focus on visual hierarchy, balance, and ensuring the design effectively communicates the intended message."
        },
        {
          title: "Iteration & Delivery",
          description: "Refining designs based on feedback, preparing multiple formats for different platforms, and delivering optimized files ready for print or digital use."
        }
      ]}
      mediaPlaceholders={[
        { type: 'image', label: 'Poster Design Sample' },
        { type: 'image', label: 'Social Media Graphics' },
        { type: 'image', label: 'Infographic Example' },
        { type: 'image', label: 'Brand Materials' }
      ]}
      metaDescription="Visual Design portfolio by Geddada Devicharan - Creative graphic design including posters, infographics, and brand materials using Photoshop and Canva."
    />
  );
}
