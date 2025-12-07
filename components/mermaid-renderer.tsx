'use client';

import { useEffect } from 'react';
import mermaid from 'mermaid';

export default function MermaidRenderer() {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.run();
  }, []);

  return null;
}