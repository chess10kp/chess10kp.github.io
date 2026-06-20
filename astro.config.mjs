import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'url';
import path from 'path';
import { rehypeSyntaxHighlight } from './src/lib/rehype-syntax-highlight';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://chess10kp.github.io',
  integrations: [
    react(),
    mdx(),
    tailwind(),
  ],
  output: 'static',
  markdown: {
    syntaxHighlight: false, // Disable built-in syntax highlighting
    rehypePlugins: [rehypeSyntaxHighlight],
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
});
