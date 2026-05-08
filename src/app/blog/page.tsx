import { getMarkdownFiles } from "@/lib/markdown";
import { BlogContent } from "./BlogContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel & Wawasan | Pilcodev",
  description: "Dapatkan wawasan terbaru tentang teknologi, desain, dan inovasi digital dari tim ahli Pilcodev.",
};

export default function BlogPage() {
  const posts = getMarkdownFiles("blog");
  
  // Sort by date descending initially
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });

  return <BlogContent initialPosts={sortedPosts} />;
}
