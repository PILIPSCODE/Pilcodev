"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, ArrowRight, Filter, SortDesc, SortAsc, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { MarkdownDocument } from "@/lib/markdown";

interface BlogContentProps {
  initialPosts: MarkdownDocument[];
}

export function BlogContent({ initialPosts }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const posts = useMemo(() => {
    return initialPosts.map(post => ({
      title: post.frontmatter.title,
      category: post.frontmatter.category || "General",
      date: post.frontmatter.date,
      image: post.frontmatter.image && post.frontmatter.image !== ""
        ? post.frontmatter.image
        : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      description: post.frontmatter.description,
      slug: `/blog/${post.slug}`
    }));
  }, [initialPosts]);

  const filteredAndSortedPosts = useMemo(() => {
    let result = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [posts, searchQuery, sortOrder]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const ITEMS_PER_PAGE = 10;

  const currentPage = useMemo(() => {
    const page = searchParams.get("page");
    return page ? Math.max(1, parseInt(page)) : 1;
  }, [searchParams]);

  // Use ref to track previous search value
  const prevSearchRef = useRef(searchQuery);

  useEffect(() => {
    // Only reset to page 1 if search actually changed
    if (prevSearchRef.current !== searchQuery) {
      prevSearchRef.current = searchQuery;

      const params = new URLSearchParams(searchParams.toString());
      if (params.get("page") !== "1") {
        params.set("page", "1");
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }
  }, [searchQuery, router, searchParams]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredAndSortedPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });

    const gridElement = document.getElementById("blog-grid");
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-32 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white mb-6">
            Artikel <span className="font-light italic">& Wawasan</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl">
            Jelajahi kumpulan artikel terbaru kami tentang teknologi, desain, dan inovasi digital.
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 transition-colors group-focus-within:text-black dark:group-focus-within:text-white" />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-100 dark:bg-neutral-900 border-none rounded-2xl py-4 pl-12 pr-6 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="flex items-center gap-2 px-6 py-4 bg-neutral-100 dark:bg-neutral-900 rounded-2xl text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              {sortOrder === "desc" ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
              {sortOrder === "desc" ? "Terbaru" : "Terlama"}
            </button>
          </div>
        </div>

        {/* Grid Section */}
        {paginatedPosts.length > 0 ? (
          <div id="blog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post, i) => (
              <Link key={i} href={post.slug} className="group flex flex-col bg-white dark:bg-black rounded-[2.5rem] overflow-hidden border border-neutral-200 dark:border-neutral-900 shadow-sm hover:shadow-2xl dark:shadow-[0_0_50px_rgba(255,255,255,0.03)] transition-all duration-500 hover:-translate-y-3">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-black dark:text-white">
                    {post.category}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500 mb-4 font-light">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="text-2xl font-semibold text-black dark:text-white mb-4 leading-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 font-light text-base line-clamp-3 mb-8 flex-1 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-black dark:text-white mt-auto group/btn">
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="inline-block p-6 bg-neutral-50 dark:bg-neutral-900 rounded-full mb-6">
              <Search className="w-12 h-12 text-neutral-300 dark:text-neutral-700" />
            </div>
            <h3 className="text-2xl font-medium mb-2 text-black dark:text-white">Tidak ada hasil ditemukan</h3>
            <p className="text-neutral-500 dark:text-neutral-500">Coba gunakan kata kunci pencarian yang berbeda.</p>
          </div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="mt-24 flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all active:scale-90"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-12 h-12 flex items-center justify-center rounded-2xl text-sm font-bold transition-all active:scale-90 ${currentPage === page
                        ? "bg-black dark:bg-white text-white dark:text-black shadow-xl"
                        : "bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all active:scale-90"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500 tracking-wide uppercase">
              Menampilkan <span className="text-black dark:text-white">{startIndex + 1}</span> - <span className="text-black dark:text-white">{Math.min(startIndex + ITEMS_PER_PAGE, filteredAndSortedPosts.length)}</span> Dari <span className="text-black dark:text-white">{filteredAndSortedPosts.length}</span> Artikel
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
