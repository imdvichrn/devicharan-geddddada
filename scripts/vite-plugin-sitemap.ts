import path from 'node:path';
import type { Plugin } from 'vite';
import { generateSitemap } from './generateSitemap';

/**
 * Auto-generates public/sitemap.xml + sitemap-index.xml from src/data/projects.ts
 * - Runs at server start (dev) and build start
 * - Re-runs when projects.ts changes during dev
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
    name: 'lovable-sitemap-generator',
    apply: () => true,
    configResolved(cfg) {
      root = cfg.root;
    },
    async buildStart() {
      await run();
    },
    configureServer(server) {
      run();
      const watched = path.resolve(root, 'src/data/projects.ts');
      server.watcher.add(watched);
      server.watcher.on('change', (file) => {
        if (path.resolve(file) === watched) run();
      });
    },
  };
}
