import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

export function rehypeJacHighlight() {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') {
        const codeNode = node.children[0];
        const className = codeNode.properties?.className as string[] || [];
        const language = className.find((c) => c.startsWith('language-'))?.replace('language-', '');
        
        if (language === 'jac') {
          // Replace the entire pre element with a plain one for client-side highlighting
          const textContent = extractText(codeNode);
          
          // Create a new simple pre/code structure
          const newPre = {
            type: 'element',
            tagName: 'pre',
            properties: { 'data-language': 'jac' },
            children: [
              {
                type: 'element',
                tagName: 'code',
                properties: { className: ['language-jac'], 'data-language': 'jac' },
                children: [{ type: 'text', value: textContent }]
              }
            ]
          };
          
          if (parent && typeof index === 'number') {
            parent.children[index] = newPre;
          }
        }
      }
    });
  };
}

function extractText(node: any): string {
  if (node.type === 'text') {
    return node.value;
  } else if (node.type === 'element' && node.children) {
    return node.children.map(extractText).join('');
  }
  return '';
}
