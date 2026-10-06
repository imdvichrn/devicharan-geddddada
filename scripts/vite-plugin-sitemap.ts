import type { Plugin } from 'vite';
import path from 'node:path';
import { generateSitemap } from './generateSitemap';

/**
 * Generates canonical public/sitemap.xml
 */
export function sitemapPlugin(): Plugin {
  let root = process.cwd();
  const run = async () => {
    try {
      await generateSitemap(root, path.join(root, 'public'));
    } catch (e) {
      console.warn('[sitemap] generation failed:', (e as Error).message);
    }
  };

  return {
    name: 'sitemap-generator',
    apply: () => true,
    configResolved(cfg) {
      root = cfg.root;
    },
    async buildStart() {
      await run();
    },
  };
}
