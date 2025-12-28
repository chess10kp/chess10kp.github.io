import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {marked} from "marked";
import markedKatex from "marked-katex-extension";
import { markedHighlight } from "marked-highlight";
import Prism from "prismjs";

import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-haskell";
import "prismjs/components/prism-csharp";

marked.use(markedKatex());
marked.use(markedHighlight({
  langPrefix: 'language-',
  highlight(code, lang) {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return code;
  }
}));

// Custom renderer for images with lazy loading and mermaid diagrams
(marked.use as any)({
  renderer: {
    image(href: string, title: string | null, text: string) {
      return `<img src="${href}" alt="${text || ''}" title="${title || text || ''}" loading="lazy">`;
    },
    code(code: string, language: string | undefined) {
      if (language === 'mermaid') {
        return `<div class="mermaid">${code}</div>`;
      }
      return `<pre><code class="language-${language || ''}">${code}</code></pre>`;
    }
  }
});

// Custom processor to handle footnotes
function processFootnotes(content: string): { processedContent: string; footnotes: Map<string, string> } {
  const footnotes = new Map<string, string>();
  
  // Extract footnote definitions using a more comprehensive regex
  const footnoteDefRegex = /^\[(\^[^\]]+)\]:\s*(.+?)(?=\n\n|\n(?=\[)|$)/gm;
  let match;
  
  // Use while loop to collect all footnote definitions
  while ((match = footnoteDefRegex.exec(content)) !== null) {
    const id = match[1].substring(1);
    const text = match[2].trim();
    footnotes.set(id, text);
  }
  
  // Remove footnote definitions from content first
  let processedContent = content.replace(footnoteDefRegex, '');
  
  // Replace footnote references with HTML
  processedContent = processedContent.replace(/\[(\^[^\]]+)\]/g, (match, p1) => {
    const id = p1.substring(1);
    return `<sup class="footnote-ref"><a href="#footnote-${id}">${id}</a></sup>`;
  });
  
  return { processedContent, footnotes };
}

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.filter((filename) => {
    return filename.endsWith(".md") && !filename.startsWith(".")
  }).map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id: id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      tags: matterResult.data.tags || [],
      tagline: matterResult.data.tagline || "",
    };
  });
  return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.filter((filename) => {
    return filename.endsWith(".md") && !filename.startsWith(".")
  }).map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostById(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const { processedContent, footnotes } = processFootnotes(matterResult.content);
    const processedHtml = marked(processedContent);
    
    // Append footnotes section if any exist
    let finalContent = processedHtml;
    if (footnotes.size > 0) {
      let footnotesHtml = '<div class="footnotes"><hr><ol>';
      footnotes.forEach((text, id) => {
        footnotesHtml += `<li id="footnote-${id}">${text}</li>`;
      });
      footnotesHtml += '</ol></div>';
      finalContent += footnotesHtml;
    }
    
    return {
      content: finalContent,
      id: matterResult.data.id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      tags: matterResult.data.tags || [],
      tagline: matterResult.data.tagline || "",
    };
  } catch (error) {
    return { content: null, id: null, title: null, date: null, tags: [] };
  }
}
