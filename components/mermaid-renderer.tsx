'use client';

import { useEffect } from 'react';
import mermaid from 'mermaid';

export default function MermaidRenderer() {
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        lineColor: 'hsl(348 83% 61%)',
        primaryColor: 'hsl(207 22% 8%)',
        primaryTextColor: 'hsl(40 50% 80%)',
        primaryBorderColor: 'hsl(40 50% 80%)'
      }
    });
    mermaid.run();
  }, []);

  return null;
}