import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import { highlightJacCode } from './syntaxHighlighting';

export function remarkJacHighlight() {
  return (tree: Root) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'jac') {
        // Use custom Jac syntax highlighter
        const highlightedCode = highlightJacCode(node.value);
        
        // Replace the code with pre-formatted HTML
        node.type = 'html';
        node.value = `<pre class="jac-code-block"><code class="language-jac">${highlightedCode}</code></pre>`;
      }
    });
  };
}
