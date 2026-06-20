import { visit } from 'unist-util-visit';
import type { Root } from 'hast';
import { highlightJacCode } from './syntaxHighlighting';

export function rehypeJacHighlight() {
  return (tree: Root) => {
    visit(tree, 'element', (node: any) => {
      // Check if this is a pre element with Jac code
      if (
        node.tagName === 'pre' &&
        node.properties &&
        node.properties.className &&
        node.properties.className.includes('astro-code') &&
        node.properties['data-language'] === 'plaintext'
      ) {
        // Extract the code content
        const codeElement = node.children[0];
        if (codeElement && codeElement.tagName === 'code') {
          // Get the text content from the code element
          let codeText = '';
          visit(codeElement, 'text', (textNode: any) => {
            codeText += textNode.value;
          });

          // Apply custom Jac highlighting
          const highlightedCode = highlightJacCode(codeText);

          // Replace the entire pre element with our custom HTML
          node.tagName = 'pre';
          node.properties = {
            className: ['jac-code-block'],
          };
          node.children = [
            {
              type: 'element',
              tagName: 'code',
              properties: {
                className: ['language-jac'],
              },
              children: [
                {
                  type: 'raw',
                  value: highlightedCode,
                },
              ],
            },
          ];
        }
      }
    });
  };
}