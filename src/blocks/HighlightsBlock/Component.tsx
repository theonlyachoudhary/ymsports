"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HighlightsBlock({ title, images }) {
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const dragging = useRef(false);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  // AUTOPLAY
  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      if (!dragging.current) next();
    }, 4000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  // DRAG CONTROLS
  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 200], [-2, 2]);

  const handleDragEnd = (_, info) => {
    dragging.current = false;

    if (info.offset.x < -50) next();
    if (info.offset.x > 50) prev();
  };

  return (
    <section className="w-full flex flex-col items-center py-16 px-6 select-none overflow-hidden">
      <h2 className="font-bebas text-5xl mb-10">{title}</h2>

      <div
        className="relative w-full max-w-6xl flex items-center justify-center"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        {/* LEFT ARROW — hidden on mobile */}
        <button
          onClick={prev}
          className="
            hidden md:flex
            absolute left-0 -ml-10 top-1/2 -translate-y-1/2
            bg-white shadow-lg p-3 rounded-full 
            hover:scale-110 transition
          "
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        {/* SLIDER */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-4"
            animate={{ x: `-${index * 100}%` }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            {images.map((imgObj, i) => (
              <motion.div
                key={i}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{ rotate }}
                onDragStart={() => (dragging.current = true)}
                onDragEnd={handleDragEnd}
                className="
                  shrink-0 
                  w-full md:w-[33%] sm:w-[50%]
                  rounded-2xl overflow-hidden 
                  border-4 border-transparent 
                  transition-all duration-200
                "
              >
                <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.3 }}>
                  <Image
                    src={imgObj.image.url}
                    alt="Highlight"
                    width={1200}
                    height={1200}
                    className="object-cover w-full h-[320px]"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT ARROW — hidden on mobile */}
        <button
          onClick={next}
          className="
            hidden md:flex
            absolute right-0 -mr-10 top-1/2 -translate-y-1/2
            bg-white shadow-lg p-3 rounded-full 
            hover:scale-110 transition
          "
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      {/* DOTS */}
      <div className="flex gap-3 mt-8">
        {images.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setIndex(i)}
            className={`
              w-3 h-3 rounded-full cursor-pointer 
              ${i === index ? "bg-black" : "bg-neutral-400"}
            `}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{
              scale: i === index ? 1.1 : 0.8,
              opacity: 1,
            }}
            transition={{ duration: 0.25 }}
          />
        ))}
      </div>
    </section>
  );
}
