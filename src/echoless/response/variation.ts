/**
 * Echoless Rhythm & Phrasing Variation Engine
 * 
 * Rotates natural conversational phrasing to prevent robotic repetitive phrasing.
 */

export function selectVariation(options: string[] | string, turnCount: number): string {
  if (typeof options === 'string') return options;
  if (!options || options.length === 0) return '';
  const index = turnCount % options.length;
  return options[index];
}

export function selectNextVariation(options: string[] | string, currentIndex: number): string {
  if (typeof options === 'string') return options;
  if (!options || options.length === 0) return '';
  const nextIndex = (currentIndex + 1) % options.length;
  return options[nextIndex];
}
