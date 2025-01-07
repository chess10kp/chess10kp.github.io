import { getPostById, getAllPostIds } from "@/lib/posts";
import "./post.css";

export async function generateStaticParams() {
  const posts = getAllPostIds();
  return posts.map((post) => post.params); // Format: { id: "post-id" }
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { content, title, date } = await getPostById(id);
  return (
    <div className="flex items-stretch justify-center min-h-[80vh]">
      {title ? (
        <div>
          <div className="flex flex-col text-center">
            <h1 className="font-bold text-6xl ">{title}</h1>
            <p className="text-md">{date.toString().slice(0, 10)}</p>
          </div>
          <div className="mx-10 p-0 min-w-[80vw]">
            <div
              className="post"
              dangerouslySetInnerHTML={{
                __html: content ? content : "No post found",
              }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="text-center justify-center  flex">
          <div className="my-auto flex items-center">
            <h1 className="border-r leading-loose align-top mx-8 px-8 border-r-foreground text-4xl">
              404
            </h1>
            <p className="mx-2 font-light align-top">Page not found</p>
          </div>
        </div>
      )}
    </div>
  );
}
