import { visit } from 'unist-util-visit';
import type { Root } from 'hast';
import { createHighlighter } from 'shiki';
import { highlightJacCode } from './syntaxHighlighting';

// Cache the highlighter to avoid recreating it for every file
let highlighterInstance: any = null;

export const rehypeSyntaxHighlight = () => {
  return async (tree: Root) => {
    if (!highlighterInstance) {
      highlighterInstance = await createHighlighter({
        themes: ['gruvbox-dark-medium'],
        langs: [
          'javascript',
          'typescript',
          'python',
          'rust',
          'go',
          'java',
          'cpp',
          'c',
          'plaintext',
          'csharp',
          'bash',
          'haskell',
          'css',
          'html',
          'json',
          'markdown',
          'sql',
          'yaml',
          'xml',
          'php',
          'ruby',
          'swift',
          'kotlin',
          'dart',
          'scala',
          'r',
          'lua',
          'perl',
          'shell',
          'powershell',
        ],
      });
    }

    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      // Check if this is a pre element with code
      if (
        node.tagName === 'pre' &&
        node.children &&
        node.children[0] &&
        node.children[0].tagName === 'code'
      ) {
        const codeElement = node.children[0];
        const className = codeElement.properties?.className || [];
        const lang = className.find((c: string) => c.startsWith('language-'))?.replace('language-', '') || 'text';

        // Get the text content from the code element
        let codeText = '';
        visit(codeElement, 'text', (textNode: any) => {
          codeText += textNode.value;
        });

        if (lang === 'jac') {
          // Use custom Jac highlighting
          const highlightedCode = highlightJacCode(codeText);
          
          // Replace the entire pre element with our custom HTML
          if (parent && typeof index === 'number') {
            parent.children[index] = {
              type: 'raw',
              value: `<pre class="jac-code-block"><code class="language-jac">${highlightedCode}</code></pre>`,
            };
          }
        } else {
          // Use Shiki for other languages
          const html = highlighterInstance.codeToHtml(codeText, {
            lang: lang === 'text' ? 'plaintext' : lang,
            theme: 'gruvbox-dark-medium',
            // Keep the gruvbox palette but swap gruvbox's default background
            // (#282828) for the site's dark background so it matches the theme.
            colorReplacements: { '#282828': '#0e1419' },
          });
          
          // Replace the entire pre element with Shiki's HTML output
          if (parent && typeof index === 'number') {
            parent.children[index] = {
              type: 'raw',
              value: html,
            };
          }
        }
      }
    });
  };
};