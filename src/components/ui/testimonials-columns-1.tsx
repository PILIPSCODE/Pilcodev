"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: {text: string, image: string, name: string, role: string}[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.02)] max-w-xs w-full" key={i}>
                  <div className="text-neutral-600 dark:text-neutral-400 font-light">{text}</div>
                  <div className="flex items-center gap-3 mt-8">
                    <Image
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full border border-neutral-200 dark:border-neutral-800 object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight text-black dark:text-white leading-5">{name}</div>
                      <div className="leading-5 text-neutral-500 dark:text-neutral-500 text-sm tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
