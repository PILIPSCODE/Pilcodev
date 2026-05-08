import { getMarkdownFile, getMarkdownFiles } from "@/lib/markdown";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Calendar, Tag, ArrowRight, Globe, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/github-icon";
import { ShareButtons } from "@/components/ShareButtons";
import Link from "next/link";

export async function generateStaticParams() {
  const projects = getMarkdownFiles("portfolio");
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function PortfolioDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getMarkdownFile("portfolio", resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-32 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 md:px-24">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono uppercase tracking-widest mb-6">
            <span className="bg-neutral-100 dark:bg-neutral-900 px-3 py-1 rounded-full text-black dark:text-white font-bold">
              {project.frontmatter.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(project.frontmatter.date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl leading-[1.1]">
            {project.frontmatter.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light max-w-3xl leading-relaxed">
            {project.frontmatter.description}
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden border border-neutral-200 dark:border-neutral-900 shadow-2xl mb-24">
          <Image 
            src={project.frontmatter.image} 
            alt={project.frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <article className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-lg prose-p:font-light prose-headings:font-bold prose-headings:tracking-tight prose-a:text-black dark:prose-a:text-white hover:prose-a:text-neutral-600 dark:hover:prose-a:text-neutral-300 prose-img:rounded-3xl">
              <ReactMarkdown>{project.content}</ReactMarkdown>
            </article>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div className="flex flex-col gap-4">
                {project.frontmatter.previewUrl && project.frontmatter.previewUrl !== "#" ? (
                  <a 
                    href={project.frontmatter.previewUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-black text-white dark:bg-white dark:text-black py-4 rounded-2xl text-sm font-bold hover:scale-[1.02] transition-transform shadow-xl"
                  >
                    <Globe className="w-4 h-4" /> Live Preview <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                  </a>
                ) : (
                  <div 
                    className="flex items-center justify-center gap-3 w-full bg-neutral-100 dark:bg-neutral-900 text-neutral-400 py-4 rounded-2xl text-sm font-bold cursor-not-allowed border border-neutral-200 dark:border-neutral-800"
                  >
                    <Globe className="w-4 h-4" /> Preview Tidak Tersedia
                  </div>
                )}

                {project.frontmatter.githubUrl && project.frontmatter.githubUrl !== "#" ? (
                  <a 
                    href={project.frontmatter.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full border border-neutral-200 dark:border-neutral-800 bg-transparent text-black dark:text-white py-4 rounded-2xl text-sm font-bold hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4" /> Source Code
                  </a>
                ) : (
                  <div 
                    className="flex items-center justify-center gap-3 w-full border border-neutral-100 dark:border-neutral-900 text-neutral-300 dark:text-neutral-700 py-4 rounded-2xl text-sm font-bold cursor-not-allowed"
                  >
                    <GitHubIcon className="w-4 h-4" /> Code Tidak Tersedia
                  </div>
                )}
              </div>

              <div className="p-8 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-3xl">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-black dark:text-white">Tertarik dengan solusi serupa?</h4>
                <p className="text-neutral-600 dark:text-neutral-400 font-light mb-8 text-sm leading-relaxed">
                  Kami dapat membantu Anda membangun platform yang sama atau bahkan lebih baik dari ini.
                </p>
                <Link 
                  href={`https://wa.me/6287776266539?text=${encodeURIComponent(`Halo Pilcodev, saya tertarik dengan proyek ${project.frontmatter.title} dan ingin mendiskusikan kebutuhan saya.`)}`}
                  className="flex items-center justify-center gap-2 w-full bg-black text-white dark:bg-white dark:text-black py-4 rounded-2xl text-sm font-bold hover:scale-[1.02] transition-transform shadow-xl"
                >
                  Konsultasi Sekarang <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-black dark:text-white">Bagikan</h4>
                <ShareButtons title={project.frontmatter.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
