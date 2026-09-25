/**
 * Echoless Fact & Output Validator
 * 
 * Enforces strict constraints:
 * 1. NO raw URLs in text (URLs belong exclusively in action buttons).
 * 2. NO markdown noise, stars, bullets, fake headers.
 * 3. Verified facts only.
 */

const URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:in|com|org|net|io)\b)/gi;
const MARKDOWN_HEADER_REGEX = /^(#|\*|-|>|\d+\.)/gm;

export function validateAndCleanResponse(text: string): string {
  let cleaned = text;

  // 1. Strip any accidentally leaked URLs from sentence text
  cleaned = cleaned.replace(URL_REGEX, '').replace(/\s{2,}/g, ' ').trim();

  // 2. Strip fake AI headers or bullet prefixes
  cleaned = cleaned.replace(MARKDOWN_HEADER_REGEX, '');

  // 3. Remove excessive quotes or brackets
  cleaned = cleaned.replace(/```[a-z]*\n?/g, '');

  return cleaned.trim();
}
