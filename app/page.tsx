import { ThemeProvider } from "@/components/theme-provider";
import HomeContent from "@/components/home-content";
import { getSortedPostsData, getAllPostIds } from "@/lib/posts";
import "./page.css";

export default function Home() {
  // Fetch posts data on the server
  const posts = getSortedPostsData();
  const availableBlogPosts = getAllPostIds().map(post => post.params.id);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <HomeContent posts={posts} availableBlogPosts={availableBlogPosts} />
    </ThemeProvider>
  );
}
