import { ProjectLayout } from '@/components/ProjectLayout';

export default function GrowthStrategy() {
  return (
    <ProjectLayout
      title="Growth Strategy"
      description="Strategic digital marketing and growth planning projects focused on audience engagement, content strategy, and data-driven decision making. Combining analytical thinking with creative execution to drive meaningful results."
      year="2024"
      tools={[
        "Google Analytics",
        "Social Media Insights",
        "Notion",
        "Google Sheets",
        "Canva",
        "AI Writing Tools"
      ]}
      roles={[
        "Strategy Development",
        "Content Planning",
        "Analytics & Research",
        "Campaign Management",
        "Performance Tracking"
      ]}
      process={[
        {
          title: "Market Analysis",
          description: "Comprehensive research into target demographics, competitor strategies, and market opportunities. This foundation ensures all strategic decisions are grounded in real data and insights."
        },
        {
          title: "Strategy Framework",
          description: "Developing a clear roadmap with defined goals, KPIs, and tactical approaches. The framework balances short-term wins with long-term sustainable growth objectives."
        },
        {
          title: "Content & Campaign Planning",
          description: "Creating content calendars and campaign timelines that align with strategic goals. Each piece of content is designed to serve a specific purpose in the customer journey."
        },
        {
          title: "Measurement & Optimization",
          description: "Tracking performance metrics, analyzing results, and iterating on strategies. Continuous improvement based on data ensures campaigns become more effective over time."
        }
      ]}
      mediaPlaceholders={[
        { type: 'image', label: 'Strategy Framework Document' },
        { type: 'image', label: 'Analytics Dashboard' },
        { type: 'image', label: 'Content Calendar Sample' },
        { type: 'image', label: 'Campaign Results Overview' }
      ]}
      metaDescription="Growth Strategy projects by Geddada Devicharan - Digital marketing strategy, content planning, and data-driven growth initiatives."
    />
  );
}
