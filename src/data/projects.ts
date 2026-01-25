export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  challenge: string;
  outcome: string;
  youtubeEmbedId: string;
  year: string;
  tools: string[];
  roles: string[];
  technicalDetails: string[];
  category: 'video' | 'design' | 'strategy' | 'web';
}

export const projects: Project[] = [
  {
    id: 'video-production',
    title: 'Professional Video Production',
    shortDescription: 'Cinematic video editing with industry-standard color grading and VFX.',
    longDescription: 'A comprehensive video production workflow utilizing DaVinci Resolve Studio for professional-grade editing, color grading, and visual effects. This project showcases the complete post-production pipeline from raw footage to final delivery, demonstrating expertise in node-based color science, Fusion VFX compositing, and Fairlight audio mixing.',
    challenge: 'The primary challenge was managing 4K RAW footage from multiple cameras while maintaining consistent color science across different shooting conditions. Additionally, integrating complex VFX elements seamlessly required precise tracking and compositing work.',
    outcome: 'Delivered a polished final product with cinema-quality color grading, seamless VFX integration, and professional audio mixing. The project received positive feedback for its visual consistency and smooth pacing, demonstrating mastery of the DaVinci Resolve ecosystem.',
    youtubeEmbedId: 'xx0J30hHGUVaoY82',
    year: '2024',
    tools: ['DaVinci Resolve Studio', 'Fusion VFX', 'Fairlight Audio'],
    roles: ['Video Editor', 'Colorist', 'Motion Designer'],
    technicalDetails: ['4K Workflow', 'RAW Processing', 'Node-based Grading', 'HDR Mastering'],
    category: 'video'
  },
  {
    id: 'scenesync-edits',
    title: 'SceneSync Edits',
    shortDescription: 'Beat-synchronized video editing with dynamic transitions and audio-reactive visuals.',
    longDescription: 'SceneSync Edits is a specialized editing style that synchronizes visual cuts, transitions, and effects precisely with music beats and audio cues. This technique creates an immersive viewing experience where the visual rhythm perfectly complements the audio, commonly used in music videos, promotional content, and social media reels.',
    challenge: 'Achieving frame-perfect synchronization between audio peaks and visual transitions required meticulous timeline work and audio waveform analysis. Maintaining visual coherence while matching rapid beat changes demanded careful planning and execution.',
    outcome: 'Created a portfolio of beat-synced edits that demonstrate precise timing and creative transition design. These projects have been well-received for their rhythmic flow and engaging visual dynamics.',
    youtubeEmbedId: 'dQw4w9WgXcQ',
    year: '2024',
    tools: ['DaVinci Resolve', 'Fairlight Audio', 'Fusion'],
    roles: ['Video Editor', 'Sound Designer'],
    technicalDetails: ['Beat Mapping', 'Audio Waveform Analysis', 'Dynamic Transitions', 'VFX Sync'],
    category: 'video'
  },
  {
    id: 'visual-design',
    title: 'Visual Design Portfolio',
    shortDescription: 'Creative graphic design including brand materials, thumbnails, and digital assets.',
    longDescription: 'A collection of visual design work spanning brand identity, social media graphics, YouTube thumbnails, and promotional materials. Each project follows a structured design process from concept development through final delivery, ensuring consistent quality and brand alignment.',
    challenge: 'Balancing creative vision with client requirements while maintaining brand consistency across multiple deliverables. Each project required adapting the design approach to different platforms and use cases.',
    outcome: 'Delivered a diverse portfolio of design assets that effectively communicate brand messages and engage target audiences. Projects demonstrate proficiency in composition, typography, and color theory.',
    youtubeEmbedId: 'dQw4w9WgXcQ',
    year: '2024',
    tools: ['Adobe Photoshop', 'Canva', 'Figma'],
    roles: ['Graphic Designer', 'Brand Designer'],
    technicalDetails: ['Brand Identity', 'Print & Digital', 'Social Media Assets', 'Thumbnail Design'],
    category: 'design'
  },
  {
    id: 'growth-strategy',
    title: 'Growth Strategy & Digital Marketing',
    shortDescription: 'Data-driven digital marketing strategies from analysis through execution.',
    longDescription: 'Strategic digital marketing initiatives focused on audience growth, engagement optimization, and content strategy. This work involves comprehensive market analysis, competitor research, and implementation of data-driven growth tactics across multiple platforms.',
    challenge: 'Identifying effective growth levers in competitive markets required extensive research and A/B testing. Balancing organic growth strategies with limited resources demanded creative problem-solving.',
    outcome: 'Developed actionable growth frameworks that have been applied to various projects, resulting in measurable improvements in engagement and audience reach. Demonstrated ability to translate data insights into practical strategies.',
    youtubeEmbedId: 'dQw4w9WgXcQ',
    year: '2024',
    tools: ['Analytics Tools', 'Content Strategy', 'SEO'],
    roles: ['Growth Strategist', 'Content Planner'],
    technicalDetails: ['Market Analysis', 'KPI Tracking', 'A/B Testing', 'Audience Research'],
    category: 'strategy'
  },
  {
    id: 'data-research',
    title: 'Data Research & Analysis',
    shortDescription: 'Comprehensive research and data entry with attention to accuracy and detail.',
    longDescription: 'Professional data research and analysis services including market research, data compilation, and organized documentation. This work demonstrates strong analytical skills and attention to detail in handling large datasets and research materials.',
    challenge: 'Managing large volumes of data while maintaining accuracy and consistency. Organizing research findings in accessible formats for different stakeholders required clear communication skills.',
    outcome: 'Delivered well-organized research documents and data compilations that have been used for decision-making and project planning. Demonstrated reliability and precision in data handling.',
    youtubeEmbedId: 'dQw4w9WgXcQ',
    year: '2024',
    tools: ['Excel', 'Google Sheets', 'Research Tools'],
    roles: ['Data Researcher', 'Analyst'],
    technicalDetails: ['Data Entry', 'Market Research', 'Documentation', 'Quality Assurance'],
    category: 'strategy'
  },
  {
    id: 'video-editing-post-production',
    title: 'Video Editing & Post-Production',
    shortDescription: 'Professional post-production showcase featuring advanced editing techniques, color correction, and seamless transitions.',
    longDescription: 'A comprehensive post-production portfolio demonstrating professional video editing, advanced color grading techniques, and seamless transition design. This project showcases expertise in utilizing industry-standard tools for creating polished final deliverables with cinema-quality visuals and sound design.',
    challenge: 'Managing complex timelines with multiple video layers, achieving consistent color grading across diverse source material, and seamlessly integrating audio with visual elements while maintaining professional pacing and visual flow.',
    outcome: 'Created a portfolio of professionally edited videos with industry-standard color correction, smooth transitions, and synchronized audio design. The projects demonstrate technical proficiency in post-production workflows and creative visual storytelling.',
    youtubeEmbedId: 'N68iysGT2DU',
    year: '2025',
    tools: ['DaVinci Resolve', 'CapCut', 'Color Grading', 'Sound Design'],
    roles: ['Video Editor', 'Colorist', 'Audio Engineer'],
    technicalDetails: ['Color Correction', 'Transition Design', 'Audio Synchronization', 'Timeline Optimization'],
    category: 'video'
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter(project => project.category === category);
}
