import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import HomeContent from "@/components/home-content";
import { getSortedPostsData } from "@/lib/posts";
import "./page.css";

export default function Home() {
  // Fetch posts data on the server
  const posts = getSortedPostsData();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <HomeContent posts={posts} />
    </ThemeProvider>
  );
}
