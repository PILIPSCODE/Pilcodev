import { getMarkdownFile, getMarkdownFiles } from "@/lib/markdown";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const posts = getMarkdownFiles("blog");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getMarkdownFile("blog", resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32 px-6 md:px-24 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16">
          <div className="text-neutral-500 font-mono text-sm mb-4">
            {post.frontmatter.date}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {post.frontmatter.title}
          </h1>
          <div className="flex gap-2">
            {post.frontmatter.tags?.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 text-xs font-medium uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:font-light prose-headings:font-medium prose-a:text-black dark:prose-a:text-white hover:prose-a:text-neutral-600 dark:hover:prose-a:text-neutral-300">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
