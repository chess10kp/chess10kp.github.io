import { getPostById } from "@/lib/posts";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const {content, metadata} = getPostById(id);
  return (
    <div>
      <h1>{id}</h1>
      <h2 >{content}</h2>
    </div> 
  );
}
