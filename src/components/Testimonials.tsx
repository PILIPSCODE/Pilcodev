"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";
import testimonials from "@/data/testimonials.json";

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white dark:bg-black py-24 relative overflow-hidden border-y border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="border border-neutral-200 dark:border-neutral-800 py-1 px-4 rounded-full text-xs font-medium uppercase tracking-widest text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900">
              Testimoni
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-black dark:text-white">
            Apa <span className="font-medium italic">kata mereka</span>
          </h2>
          <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 font-light">
            Dengarkan langsung dari klien-klien yang telah mempercayakan pertumbuhan digital mereka kepada kami.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
