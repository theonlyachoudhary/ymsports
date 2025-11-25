"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HighlightsBlock({ title, images }) {
  const IMAGES_PER_SLIDE = 3;

  // GROUP IMAGES INTO SLIDES
  const slides = useMemo(() => {
    const groups = [];
    for (let i = 0; i < images.length; i += IMAGES_PER_SLIDE) {
      groups.push(images.slice(i, i + IMAGES_PER_SLIDE));
    }
    return groups;
  }, [images]);

  const [index, setIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const dragging = useRef(false);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

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
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col items-center py-16 px-6 select-none overflow-hidden"
    >
      <h2 className="font-bebas text-5xl mb-10">{title}</h2>

      <div
        className="relative w-full max-w-6xl flex items-center justify-center"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        {/* LEFT ARROW */}
        <button
          onClick={prev}
          className="
            hidden md:flex absolute left-0 -ml-10 top-1/2 -translate-y-1/2
            bg-white shadow-lg p-3 rounded-full 
            hover:scale-110 transition
          "
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        {/* SLIDER */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex"
            animate={{ x: `-${index * 100}%` }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            {slides.map((group, i) => (
              <div
                key={i}
                className="shrink-0 w-full flex gap-4 px-1"
              >
                {group.map((imgObj, j) => (
                  <motion.div
                    key={j}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    style={{ rotate }}
                    onDragStart={() => (dragging.current = true)}
                    onDragEnd={handleDragEnd}
                    className="
                      w-full md:w-[33%] sm:w-[50%]
                      rounded-2xl overflow-hidden 
                      transition-all duration-200
                    "
                  >
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.3 }}
                    >
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
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          className="
            hidden md:flex absolute right-0 -mr-10 top-1/2 -translate-y-1/2
            bg-white shadow-lg p-3 rounded-full 
            hover:scale-110 transition
          "
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      {/* DOTS */}
      <div className="flex gap-3 mt-8">
        {slides.map((_, i) => (
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
    </motion.section>
  );
}
