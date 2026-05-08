export function WhoWeAre() {
  return (
    <section className="pt-32 pb-24 px-6 md:px-24 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-light text-black dark:text-white mb-6 tracking-tight">
            Kami adalah <span className="font-semibold">Pilcodev</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-8 font-light">
            Agensi pengembangan software butik yang mengkhususkan diri dalam menciptakan produk digital berperforma tinggi, estetika minimalis, dan skalabilitas luar biasa. Kami tidak hanya menulis kode; kami membangun fondasi teknologi yang menggerakkan masa depan bisnis Anda.
          </p>
          <div className="flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <div className="flex flex-col gap-1">
              <span className="text-3xl text-black dark:text-white font-bold">50+</span>
              <span className="text-neutral-500 uppercase tracking-widest text-xs">Proyek</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl text-black dark:text-white font-bold">100%</span>
              <span className="text-neutral-500 uppercase tracking-widest text-xs">Pengiriman</span>
            </div>
          </div>
        </div>
        
        <div className="relative h-full min-h-[400px] w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden group">
          <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <p className="text-2xl md:text-3xl text-black/80 dark:text-white/80 font-light leading-snug text-center italic relative z-10">
              &quot;Kesederhanaan adalah kecanggihan tertinggi.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
