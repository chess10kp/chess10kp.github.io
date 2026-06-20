import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

export function remarkJacHighlight() {
  return (tree: Root) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'jac') {
        // Mark it for client-side highlighting
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};
        node.data.hProperties.className = node.data.hProperties.className || [];
        node.data.hProperties.className.push('language-jac');
        node.data.hProperties['data-language'] = 'jac';
      }
    });
  };
}
