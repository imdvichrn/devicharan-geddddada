import { ProjectLayout } from '@/components/ProjectLayout';

export default function SceneSyncEdits() {
  return (
    <ProjectLayout
      title="SceneSync Edits"
      description="Professional video editing portfolio showcasing creative storytelling through dynamic transitions, synchronized audio, and cinematic effects. Specialized in social media content, short-form videos, and engaging visual narratives."
      year="2024"
      tools={[
        "CapCut",
        "DaVinci Resolve",
        "Adobe Premiere Pro",
        "After Effects",
        "Audacity",
        "Canva"
      ]}
      roles={[
        "Video Editor",
        "Motion Graphics",
        "Color Grading",
        "Audio Synchronization",
        "Content Creator"
      ]}
      process={[
        {
          title: "Concept & Storyboarding",
          description: "Each project begins with understanding the narrative goal. I create rough storyboards and shot lists to ensure the final edit tells a compelling story with proper pacing and visual flow."
        },
        {
          title: "Footage Organization",
          description: "Organized workflow is key to efficient editing. I categorize clips by scene, quality, and purpose, making the assembly process smooth and allowing for quick creative decisions."
        },
        {
          title: "Editing & Transitions",
          description: "The core editing phase involves cutting to the beat, applying seamless transitions, and layering effects. I focus on maintaining viewer engagement through dynamic pacing and visual variety."
        },
        {
          title: "Color Grading & Audio",
          description: "Final polish includes color correction for consistency, creative grading for mood, and audio mixing to ensure dialogue, music, and effects blend harmoniously."
        }
      ]}
      mediaPlaceholders={[
        { type: 'video', label: 'Demo Reel Clip' },
        { type: 'image', label: 'Before/After Color Grade' },
        { type: 'video', label: 'Transition Showcase' },
        { type: 'image', label: 'Timeline Screenshot' }
      ]}
      metaDescription="SceneSync Edits - Professional video editing portfolio by Geddada Devicharan featuring dynamic transitions, color grading, and cinematic storytelling."
    />
  );
}
