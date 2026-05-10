"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, Filter, SortDesc, SortAsc, LayoutGrid, Smartphone, Cpu, Zap, Globe, ArrowRight, ChevronLeft, ChevronRight, Monitor, Code2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { GitHubIcon } from "@/components/ui/github-icon";
import categoriesData from "@/data/categories.json";

interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  date: string;
  image: string;
  slug: string;
  previewUrl?: string;
  githubUrl?: string;
}

interface PortfolioContentProps {
  initialPortfolio: PortfolioItem[];
}

const IconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Cpu,
  Zap,
  Monitor,
  LayoutGrid,
  Code2
};

const categories = ["Semua", ...categoriesData.map(c => c.name)];

const CategoryIconMap: Record<string, any> = {
  "Semua": LayoutGrid,
  ...Object.fromEntries(categoriesData.map(c => [c.name, IconMap[c.icon] || Code2]))
};

export function PortfolioContent({ initialPortfolio }: PortfolioContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const searchParams = useSearchParams();
  const router = useRouter();

  // Unified function to update URL params
  const updateURL = useCallback((category: string, page: number) => {
    const params = new URLSearchParams();
    if (category !== "Semua") {
      // User specifically requested quotes in the query param: ?category="Website"
      params.set("category", `"${category}"`);
    }
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router]);

  // Single source of truth for category from URL
  const activeCategory = useMemo(() => {
    const cat = searchParams.get("category");
    // Handle literal quotes if present in URL
    const cleanCat = cat?.replace(/^"|"$/g, '') || "Semua";
    return categories.includes(cleanCat) ? cleanCat : "Semua";
  }, [searchParams]);

  // Single source of truth for page from URL
  const currentPage = useMemo(() => {
    const page = searchParams.get("page");
    return page ? Math.max(1, parseInt(page)) : 1;
  }, [searchParams]);

  const filteredAndSortedPortfolio = useMemo(() => {
    let result = initialPortfolio.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [initialPortfolio, searchQuery, activeCategory, sortOrder]);

  const ITEMS_PER_PAGE = 10;

  // Only reset page when search changes (category is now in URL)
  const prevSearchRef = useRef(searchQuery);

  useEffect(() => {
    if (prevSearchRef.current !== searchQuery) {
      prevSearchRef.current = searchQuery;
      updateURL(activeCategory, 1);
    }
  }, [searchQuery, activeCategory, updateURL]);

  const totalPages = Math.ceil(filteredAndSortedPortfolio.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPortfolio = filteredAndSortedPortfolio.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    updateURL(activeCategory, page);

    // Smooth scroll to top of grid
    const gridElement = document.getElementById("portfolio-grid");
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
            Portofolio <span className="font-light italic">& Karya</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl">
            Kumpulan proyek pilihan yang menunjukkan dedikasi kami pada kualitas, inovasi, dan hasil nyata.
          </p>
        </div>

        {/* Filters & Search Section */}
        <div className="flex flex-col space-y-8 mb-16">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 transition-colors group-focus-within:text-black dark:group-focus-within:text-white" />
              <input
                type="text"
                placeholder="Cari proyek..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-100 dark:bg-neutral-900 border-none rounded-2xl py-4 pl-12 pr-6 text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                className="flex items-center gap-2 px-6 py-4 bg-neutral-100 dark:bg-neutral-900 rounded-2xl text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors w-full md:w-auto justify-center"
              >
                {sortOrder === "desc" ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
                {sortOrder === "desc" ? "Terbaru" : "Terlama"}
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 p-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-[2rem] w-fit">
            {categories.map((category) => {
              const Icon = CategoryIconMap[category] || LayoutGrid;
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => updateURL(category, 1)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                    ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                    : "text-neutral-500 hover:text-black dark:hover:text-white"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        {paginatedPortfolio.length > 0 ? (
          <div id="portfolio-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {paginatedPortfolio.map((item, i) => (
              <div key={i} className="group relative flex flex-col gap-6">
                <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="px-8 py-3 bg-white text-black rounded-full font-bold text-sm scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                  <div className="absolute top-8 left-8">
                    <span className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-black dark:text-white shadow-xl">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="px-4">
                  <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono uppercase tracking-widest mb-4">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="text-3xl font-bold text-black dark:text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {item.title}
                  </h3>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light max-w-xl leading-relaxed mb-8 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <Link href={`/portfolio/${item.slug}`} className="flex items-center gap-2 text-sm font-bold text-black dark:text-white group/btn">
                      Detail
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                    </Link>
                    <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />

                    {item.previewUrl && item.previewUrl !== "#" ? (
                      <a href={item.previewUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                        <Globe className="w-4 h-4" /> Demo
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 text-sm font-bold text-neutral-300 dark:text-neutral-700 cursor-not-allowed" title="Demo tidak tersedia">
                        <Globe className="w-4 h-4" /> Demo
                      </div>
                    )}

                    <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />

                    {item.githubUrl && item.githubUrl !== "#" ? (
                      <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                        <GitHubIcon className="w-4 h-4" /> Code
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 text-sm font-bold text-neutral-300 dark:text-neutral-700 cursor-not-allowed" title="Source code tidak tersedia">
                        <GitHubIcon className="w-4 h-4" /> Code
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="inline-block p-8 bg-neutral-50 dark:bg-neutral-900 rounded-full mb-8">
              <LayoutGrid className="w-12 h-12 text-neutral-300 dark:text-neutral-700" />
            </div>
            <h3 className="text-3xl font-medium mb-4 text-black dark:text-white">Proyek tidak ditemukan</h3>
            <p className="text-neutral-500 dark:text-neutral-500">Coba atur ulang filter atau kata kunci pencarian Anda.</p>
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
              Menampilkan <span className="text-black dark:text-white">{startIndex + 1}</span> - <span className="text-black dark:text-white">{Math.min(startIndex + ITEMS_PER_PAGE, filteredAndSortedPortfolio.length)}</span> Dari <span className="text-black dark:text-white">{filteredAndSortedPortfolio.length}</span> Proyek
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
