import { MarkdownDocument } from "@/lib/markdown";
import Link from "next/link";

export function BlogSection({ posts }: { posts: MarkdownDocument[] }) {
  return (
    <section id="blog" className="py-24 px-6 md:px-24 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-black dark:text-white mb-4 tracking-tight">Wawasan</h2>
          <p className="text-neutral-600 dark:text-neutral-500 font-light max-w-xl">
            Pemikiran, ide, dan eksplorasi teknis dari tim engineering kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Link href={`/blog/${post.slug}`} key={i} className="group flex flex-col block">
              <div className="mb-4 text-neutral-500 text-xs font-mono tracking-widest uppercase">
                {post.frontmatter.date || "Terbaru"}
              </div>
              <h3 className="text-xl text-black dark:text-white font-medium mb-3 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                {post.frontmatter.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 font-light text-sm leading-relaxed mb-6 flex-grow">
                {post.frontmatter.description}
              </p>
              <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-900 group-hover:bg-neutral-800 dark:group-hover:bg-neutral-500 transition-colors duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
