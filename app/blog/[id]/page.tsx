import { getPostById, getAllPostIds, getAdjacentPosts } from "@/lib/posts";
import "./post.css";
import { Badge } from "@/components/ui/badge";
import CodeBlockCopy from "@/components/code-block-copy";
import MermaidRenderer from "@/components/mermaid-renderer";
import BlogNavigation from "@/components/blog-navigation";

export async function generateStaticParams() {
  const posts = getAllPostIds();
  return posts.map((post) => post.params);
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  const { content, title, date, tags } = post;
  const { prev, next } = getAdjacentPosts(id);

  return (
    <div className="flex justify-center min-h-screen px-4 lg:px-64 md:px-8">
      {title ? (
        <div className="my-8 sm:my-12 md:my-16 w-full max-w-4xl bg-card p-8 rounded-none shadow-lg">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <p className="text-md text-zinc-400 mb-2 sm:mb-0">
                {date.toString().slice(0, 10)}
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
            <h1 className="font-bold text-4xl mono text-left">{title}</h1>
          </div>
          <div className="items-center flex w-full">
            <div
              className="post"
              dangerouslySetInnerHTML={{
                __html: (content as string) || "No post found",
              }}
            ></div>
            <MermaidRenderer />
          </div>

          <BlogNavigation prev={prev} next={next} />
        </div>
      ) : (
        <div className="text-center justify-center flex">
          <div className="my-auto flex items-center">
            <h1 className="border-r leading-loose align-top mx-8 px-8 border-r-foreground text-4xl">
              404
            </h1>
            <p className="mx-2 font-light align-top">Page not found</p>
          </div>
        </div>
      )}
      <CodeBlockCopy />
    </div>
  );
}
