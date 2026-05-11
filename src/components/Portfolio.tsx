"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import portfolio from "@/data/portfolio.json";
import categoriesData from "@/data/categories.json";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { GitHubIcon } from "./ui/github-icon";

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const projects = [...portfolio].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const filters = ["Semua", ...categoriesData.map(c => c.name)];

  const filteredProjects = (activeFilter === "Semua"
    ? projects
    : projects.filter(p => p.category === activeFilter)).slice(0, 4);

  return (
    <section id="portfolio" className="py-24 px-6 md:px-24 bg-white dark:bg-black border-y border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-light text-black dark:text-white mb-4 tracking-tight">
            Apa Yang <span className="font-medium italic">Kami Bangun</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light max-w-2xl mx-auto">
            Beberapa hasil karya digital yang kami bangun untuk membantu brand tampil lebih profesional, modern, dan siap berkembang di era digital.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeFilter === filter
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project: any, i) => (
            <div key={i} className="group relative overflow-hidden bg-neutral-100 dark:bg-neutral-950 aspect-video border border-neutral-200 dark:border-neutral-900 rounded-xl">
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
              </div>

              {/* Overlay content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-neutral-300 dark:text-neutral-400 text-xs font-bold uppercase tracking-widest mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl text-white font-bold mb-4">{project.title}</h3>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2"
                    >
                      Lihat Detail
                    </Link>

                    {project.previewUrl && project.previewUrl !== "#" ? (
                      <a
                        href={project.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-colors"
                        title="Live Preview"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    ) : (
                      <div
                        className="p-2 bg-white/5 backdrop-blur-md text-white/20 rounded-lg cursor-not-allowed"
                        title="Preview tidak tersedia"
                      >
                        <Globe className="w-4 h-4" />
                      </div>
                    )}

                    {project.githubUrl && project.githubUrl !== "#" ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-colors"
                        title="Source Code"
                      >
                        <GitHubIcon className="w-4 h-4" />
                      </a>
                    ) : (
                      <div
                        className="p-2 bg-white/5 backdrop-blur-md text-white/20 rounded-lg cursor-not-allowed"
                        title="Source code tidak tersedia"
                      >
                        <GitHubIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/portfolio" className="text-black dark:text-white text-sm font-medium uppercase tracking-widest hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors pb-2 border-b border-neutral-300 dark:border-neutral-800 hover:border-neutral-600 dark:hover:border-neutral-400 inline-flex items-center gap-2">
            Lihat Semua Karya <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
