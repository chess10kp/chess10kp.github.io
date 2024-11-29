import { getPostById } from "@/lib/posts";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { content, title, date } = getPostById(id);
  return (
    <div>
      {title ? (
        <div>
          <h1>{title}</h1>
          <h1>{date}</h1>
          <p>{content}</p>
        </div>
      ) : (
        <div className="text-center justify-center  min-h-[80vh] flex">
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
