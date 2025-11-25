'use client'

import { motion } from 'framer-motion'

export function PageHeaderBlock({ title, subtitle, align, paddingSize }) {
  const pad = {
    lg: "py-28 px-6 md:px-12",
    md: "py-20 px-6 md:px-10",
    sm: "py-14 px-6 md:px-8",
  }[paddingSize || "lg"];

  const alignment = align === "left" ? "text-left" : "text-center";

  return (
    <section className="w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`min-w-[100vw] bg-[#F5F1E8] rounded-2xl shadow-sm ${pad}`}
      >

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.12,
          }}
          className={`font-bebas
            text-6xl sm:text-6xl md:text-8xl xl:text-9xl
            ${alignment}`}
        >
          {title}
        </motion.h1>

        {/* SUBTITLE */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.22,
            }}
            className={`mt-6
              w-full sm:w-4/5 md:w-2/3 lg:w-1/2
              mx-auto
              text-base sm:text-lg md:text-2xl 
              text-neutral-700 leading-relaxed
              ${alignment}`}
          >
            {subtitle}
          </motion.p>
        )}

      </motion.div>
    </section>
  );
}
