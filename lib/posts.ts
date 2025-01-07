import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {marked} from "marked"

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.filter((filename) => {
    return filename.endsWith(".md")
  }).map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id: id,
      title: matterResult.data.title,
      date: matterResult.data.date,
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
  return fileNames.map((fileName) => {
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
    };
  } catch (error) {
    return { content: null, id: null, title: null, date: null };
  }
}
