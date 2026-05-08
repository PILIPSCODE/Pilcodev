import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { Blog } from "@/components/Blog";
import services from "@/data/services.json";
import { getMarkdownFiles } from "@/lib/markdown";

export default function Home() {
  const blogPosts = getMarkdownFiles("blog")
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Portfolio />
      <Services services={services} />
      <Testimonials />
      <Blog posts={blogPosts} />
    </main>
  );
}
