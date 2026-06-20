// Jac syntax highlighting function (client-side version)
function highlightJacCode(code: string): string {
  const keywords = new Set([
    'node', 'edge', 'walker', 'can', 'with', 'entry', 'exit', 'def', 'class', 'obj',
    'enum', 'has', 'ability', 'if', 'else', 'elif', 'for', 'while', 'return',
    'spawn', 'visit', 'disengage', 'yield', 'try', 'except', 'finally', 'assert',
    'import', 'include', 'from', 'as', 'global', 'async', 'await', 'lambda',
    'here', 'self', 'root', 'super', 'init', 'postinit', 'visitor', 'impl',
    'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None', 'break', 'continue',
    'pass', 'del', 'raise', 'test', 'check'
  ]);
  
  const visitKeywords = new Set(['visit', 'disengage']);
  const types = new Set(['str', 'int', 'float', 'bool', 'list', 'dict', 'tuple', 'set', 'any', 'type']);
  const operators = new Set(['=', '+', '-', '*', '/', '%', '==', '!=', '<', '>', '<=', '>=', '+=', '-=', '*=', '/=', '|', '&', '^', '~', '<<', '>>', '**']);

  const tokens: Array<{type: string, value: string, level?: number}> = [];
  let i = 0;
  let bracketStack: string[] = [];

  while (i < code.length) {
    // Skip whitespace
    if (/\s/.test(code[i])) {
      let whitespace = '';
      while (i < code.length && /\s/.test(code[i])) {
        whitespace += code[i];
        i++;
      }
      tokens.push({ type: 'whitespace', value: whitespace });
      continue;
    }

    // Handle comments
    if (code[i] === '#') {
      if (code[i + 1] === '*') {
        // Block comment
        let comment = '';
        while (i < code.length && !(code[i] === '*' && code[i + 1] === '#')) {
          comment += code[i];
          i++;
        }
        if (i < code.length) {
          comment += code[i] + code[i + 1];
          i += 2;
        }
        tokens.push({ type: 'comment', value: comment });
      } else {
        // Line comment
        let comment = '';
        while (i < code.length && code[i] !== '\n') {
          comment += code[i];
          i++;
        }
        tokens.push({ type: 'comment', value: comment });
      }
      continue;
    }

    // Handle strings
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i];
      let string = quote;
      i++;
      while (i < code.length && code[i] !== quote) {
        if (code[i] === '\\' && i + 1 < code.length) {
          string += code[i] + code[i + 1];
          i += 2;
        } else {
          string += code[i];
          i++;
        }
      }
      if (i < code.length) {
        string += code[i];
        i++;
      }
      tokens.push({ type: 'string', value: string });
      continue;
    }

    // Handle numbers
    if (/\d/.test(code[i])) {
      let number = '';
      while (i < code.length && /[\d.]/.test(code[i])) {
        number += code[i];
        i++;
      }
      tokens.push({ type: 'number', value: number });
      continue;
    }

    // Handle brackets with nesting
    if (code[i] === '{') {
      bracketStack.push('{');
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length - 1 });
      i++;
      continue;
    }
    
    if (code[i] === '}') {
      if (bracketStack.length > 0 && bracketStack[bracketStack.length - 1] === '{') {
        bracketStack.pop();
      }
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length });
      i++;
      continue;
    }

    if (code[i] === '(' || code[i] === '[') {
      bracketStack.push(code[i]);
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length - 1 });
      i++;
      continue;
    }
    
    if (code[i] === ')' || code[i] === ']') {
      const expectedOpen = code[i] === ')' ? '(' : '[';
      if (bracketStack.length > 0 && bracketStack[bracketStack.length - 1] === expectedOpen) {
        bracketStack.pop();
      }
      tokens.push({ type: 'bracket', value: code[i], level: bracketStack.length });
      i++;
      continue;
    }

    // Handle operators
    let operator = '';
    let j = i;
    while (j < code.length && /[=+\-*/%<>!&|^~]/.test(code[j])) {
      operator += code[j];
      j++;
    }
    if (operator && operators.has(operator)) {
      tokens.push({ type: 'operator', value: operator });
      i = j;
      continue;
    }

    // Handle identifiers
    if (/[a-zA-Z_]/.test(code[i])) {
      let identifier = '';
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        identifier += code[i];
        i++;
      }
      
      const prevNonWhitespaceToken = tokens.slice().reverse().find(t => t.type !== 'whitespace');
      const isAfterImport = prevNonWhitespaceToken && 
        ['import', 'include', 'from'].includes(prevNonWhitespaceToken.value);
      
      if (isAfterImport) {
        while (i < code.length && code[i] === '.') {
          identifier += code[i];
          i++;
          while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
            identifier += code[i];
            i++;
          }
        }
        tokens.push({ type: 'module', value: identifier });
        continue;
      }
      
      const isAfterArchetypeKeyword = prevNonWhitespaceToken && 
        ['walker', 'node', 'edge', 'obj', 'class', 'enum'].includes(prevNonWhitespaceToken.value);
      const isAfterCan = prevNonWhitespaceToken && prevNonWhitespaceToken.value === 'can';
      const isAfterWith = prevNonWhitespaceToken && prevNonWhitespaceToken.value === 'with';
      
      if (['entry', 'exit'].includes(identifier) && (isAfterWith || isAfterCan)) {
        tokens.push({ type: 'special-keyword', value: identifier });
      } else if (visitKeywords.has(identifier)) {
        tokens.push({ type: 'visit-keyword', value: identifier });
      } else if (keywords.has(identifier)) {
        tokens.push({ type: 'keyword', value: identifier });
      } else if (types.has(identifier)) {
        tokens.push({ type: 'type', value: identifier });
      } else if (isAfterArchetypeKeyword || /^[A-Z]/.test(identifier)) {
        tokens.push({ type: 'class-name', value: identifier });
      } else if (isAfterCan) {
        tokens.push({ type: 'function', value: identifier });
      } else {
        let k = i;
        while (k < code.length && /\s/.test(code[k])) k++;
        if (k < code.length && code[k] === '(') {
          tokens.push({ type: 'function', value: identifier });
        } else {
          tokens.push({ type: 'variable', value: identifier });
        }
      }
      continue;
    }

    tokens.push({ type: 'punctuation', value: code[i] });
    i++;
  }

  return tokens.map(token => {
    const escaped = escapeHtml(token.value);
    switch (token.type) {
      case 'comment': return `<span class="jac-comment">${escaped}</span>`;
      case 'string': return `<span class="jac-string">${escaped}</span>`;
      case 'number': return `<span class="jac-number">${escaped}</span>`;
      case 'keyword': return `<span class="jac-keyword">${escaped}</span>`;
      case 'special-keyword': return `<span class="jac-special-keyword">${escaped}</span>`;
      case 'visit-keyword': return `<span class="jac-visit-keyword">${escaped}</span>`;
      case 'type': return `<span class="jac-type">${escaped}</span>`;
      case 'class-name': return `<span class="jac-class-name">${escaped}</span>`;
      case 'module': return `<span class="jac-module">${escaped}</span>`;
      case 'function': return `<span class="jac-function">${escaped}</span>`;
      case 'variable': return `<span class="jac-variable">${escaped}</span>`;
      case 'operator': return `<span class="jac-operator">${escaped}</span>`;
      case 'bracket': return `<span class="jac-bracket-level-${(token.level || 0) % 4}">${escaped}</span>`;
      default: return escaped;
    }
  }).join('');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Make the function available globally
if (typeof window !== 'undefined') {
  (window as any).highlightJacCode = highlightJacCode;
  
  // Auto-highlight on load
  const highlightJacBlocks = () => {
    const codeBlocks = document.querySelectorAll('code.language-jac, code[data-language="jac"], pre[data-language="jac"] code');
    
    codeBlocks.forEach((block) => {
      const codeElement = block as HTMLElement;
      if (codeElement.querySelector('.jac-keyword')) return;
      
      const originalCode = codeElement.textContent || '';
      if (originalCode.trim()) {
        const highlighted = highlightJacCode(originalCode);
        codeElement.innerHTML = highlighted;
        codeElement.classList.remove('astro-code');
        if (codeElement.parentElement) {
          codeElement.parentElement.classList.remove('astro-code');
        }
      }
    });
  };

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightJacBlocks);
  } else {
    highlightJacBlocks();
  }

  // Observe for dynamic content
  const observer = new MutationObserver(highlightJacBlocks);
  observer.observe(document.body, { childList: true, subtree: true });
}

export default function JacSyntaxHighlighter() {
  return null;
}
