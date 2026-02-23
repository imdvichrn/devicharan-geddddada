import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(__dirname, '../data');

function readDataFile(name: string) {
  const p = path.join(DATA_DIR, name);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf8');
}

export function getSocialLinks() {
  // Prefer contact.txt, fallback to parsing about.txt
  const contact = readDataFile('contact.txt') || '';
  const combined = contact + '\n' + (readDataFile('about.txt') || '');
  const lines = combined.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const links: { platform: string; handle: string; url?: string }[] = [];

  const urlRegex = /(https?:\/\/[^\s]+)/i;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  for (const l of lines) {
    const lower = l.toLowerCase();
    if (lower.includes('instagram') || lower.includes('@') && lower.includes('instagram')) {
      const m = l.match(/instagram[:\s]*(@?\S+)/i) || l.match(urlRegex);
      if (m) links.push({ platform: 'Instagram', handle: (m[1]||m[0]).replace(/^@/, ''), url: m[0].match(urlRegex)?.[0] });
      continue;
    }
    if (lower.includes('linkedin')) {
      const m = l.match(/linkedin[:\s]*(\S+)/i) || l.match(urlRegex);
      if (m) links.push({ platform: 'LinkedIn', handle: m[1]||m[0], url: m[0].match(urlRegex)?.[0] });
      continue;
    }
    if (lower.includes('github')) {
      const m = l.match(/github[:\s]*(\S+)/i) || l.match(urlRegex);
      if (m) links.push({ platform: 'GitHub', handle: m[1]||m[0], url: m[0].match(urlRegex)?.[0] });
      continue;
    }
    if (emailRegex.test(l)) {
      const m = l.match(emailRegex);
      if (m) links.push({ platform: 'Email', handle: m[1], url: `mailto:${m[1]}` });
      continue;
    }
    // generic URL fallback
    if (urlRegex.test(l)) {
      links.push({ platform: 'Website', handle: l.match(urlRegex)![0], url: l.match(urlRegex)![0] });
    }
  }

  // Deduplicate by platform
  const seen = new Set();
  const unique = links.filter(item => {
    const key = `${item.platform}:${item.handle}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return unique;
}

export function getSection(sectionName: string) {
  const file = `${sectionName.toLowerCase()}.txt`;
  const content = readDataFile(file);
  if (!content) return null;
  // Try splitting into bullets if there are line breaks
  const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  // If multiple paragraphs, return as array of paragraphs
  if (lines.length > 4) return { type: 'paragraphs', value: lines };
  return { type: 'lines', value: lines };
}

export function getProjects() {
  const raw = readDataFile('projects.txt');
  if (!raw) return [];
  // split by double newline or lines starting with -
  const blocks = raw.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  const projects = blocks.map(b => {
    const lines = b.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    return { title: lines[0] || '', description: lines.slice(1).join(' '), raw: b };
  });
  return projects;
}

export function getCoreIdentity() {
  const about = readDataFile('about.txt') || '';
  const contact = readDataFile('contact.txt') || '';
  const nameMatch = about.match(/name[:\s]*(.+)/i);
  const locationMatch = about.match(/location[:\s]*(.+)/i);
  const emailMatch = contact.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return {
    name: nameMatch ? nameMatch[1].trim() : 'Geddada Devicharan',
    location: locationMatch ? locationMatch[1].trim() : undefined,
    contact: emailMatch ? emailMatch[1] : undefined
  };
}

export default { getSocialLinks, getSection, getProjects, getCoreIdentity };
