"use client";
import { useEffect } from "react";

export default function CodeBlockCopy() {
  useEffect(() => {
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('.post pre');
      codeBlocks.forEach((block) => {
        if (block.querySelector('.copy-button')) return;
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = 'Copy';
        button.setAttribute('aria-label', 'Copy code');
        button.addEventListener('click', async () => {
          const code = block.querySelector('code');
          if (code) {
            try {
              await navigator.clipboard.writeText(code.textContent || '');
              button.innerHTML = 'Copied!';
              button.classList.add('copied');
              setTimeout(() => { button.innerHTML = 'Copy'; button.classList.remove('copied'); }, 2000);
            } catch (err) { console.error('Failed to copy code:', err); }
          }
        });
        (block as HTMLElement).style.position = 'relative';
        block.appendChild(button);
      });
    };
    addCopyButtons();
    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
