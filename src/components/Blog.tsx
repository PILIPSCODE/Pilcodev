import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarkdownDocument } from "@/lib/markdown";

export function Blog({ posts = [] }: { posts?: MarkdownDocument[] }) {
  const displayPosts = posts.map(post => ({
    title: post.frontmatter.title,
    category: post.frontmatter.category,
    date: post.frontmatter.date,
    image: post.frontmatter.image && post.frontmatter.image !== "" 
      ? post.frontmatter.image 
      : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    description: post.frontmatter.description,
    slug: `/blog/${post.slug}`
  }));

  return (
    <section id="blog" className="py-24 px-6 md:px-24 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center flex flex-col items-center">
          <div className="flex justify-center mb-6">
            <div className="border border-neutral-200 dark:border-neutral-800 py-1 px-4 rounded-full text-xs font-medium uppercase tracking-widest text-neutral-600 dark:text-neutral-400 bg-white dark:bg-black">
              Wawasan
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light text-black dark:text-white mb-6 tracking-tight">
            Artikel <span className="font-medium italic">Terbaru</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light mb-8">
            Baca wawasan terbaru, panduan teknis, dan ide-ide inovatif seputar pengembangan perangkat lunak dari tim ahli kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayPosts.map((post, i) => (
            <Link key={i} href={post.slug} className="group flex flex-col bg-white dark:bg-black rounded-[2rem] overflow-hidden border border-neutral-200 dark:border-neutral-900 shadow-sm hover:shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-300 hover:-translate-y-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-sm text-neutral-500 dark:text-neutral-500 mb-3 font-light">
                  {post.date}
                </div>
                <h3 className="text-xl font-medium text-black dark:text-white mb-4 leading-snug group-hover:underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-4">
                  {post.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 font-light text-sm line-clamp-3 mb-6 flex-1">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-black dark:text-white mt-auto">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/blog" className="text-black dark:text-white text-sm font-medium uppercase tracking-widest hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors pb-2 border-b border-neutral-300 dark:border-neutral-800 hover:border-neutral-600 dark:hover:border-neutral-400 inline-block">
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}
