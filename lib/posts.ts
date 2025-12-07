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
    };
  });
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else return 0;
  });
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
    return {
      content: marked(matterResult.content),
      id: matterResult.data.id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      tags: matterResult.data.tags || [],
    };
  } catch (error) {
    return { content: null, id: null, title: null, date: null, tags: [] };
  }
}
