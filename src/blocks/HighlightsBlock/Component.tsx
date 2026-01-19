"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

export function HighlightsBlock({ title, images }) {
  const IMAGES_PER_SLIDE = 3;

  // Filter out invalid images (missing image object or url)
  const validImages = useMemo(() => {
    return (images || []).filter(imgObj => {
      const img = imgObj?.image && typeof imgObj.image === 'object' ? imgObj.image : null
      return img?.url
    })
  }, [images])

  // GROUP IMAGES INTO SLIDES
  const slides = useMemo(() => {
    const groups = [];
    for (let i = 0; i < validImages.length; i += IMAGES_PER_SLIDE) {
      groups.push(validImages.slice(i, i + IMAGES_PER_SLIDE));
    }
    return groups;
  }, [validImages]);

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

  // Don't render if no valid images
  if (slides.length === 0) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col items-center py-20 md:py-28 select-none relative overflow-hidden"
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3BD463]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#052B70]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 w-full flex flex-col items-center px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#3BD463]/10 rounded-full">
            <Camera size={16} className="text-[#3BD463]" />
            <span className="text-[#3BD463] font-bold uppercase tracking-widest text-sm">Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#052B70] uppercase tracking-tight mb-4">{title}</h2>
        </div>

        <div
          className="relative w-full container mx-auto flex items-center justify-center"
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
                {group.map((imgObj, j) => {
                  const image = imgObj?.image && typeof imgObj.image === 'object' ? imgObj.image : null
                  if (!image?.url) return null
                  return (
                    <motion.div
                      key={j}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      style={{ rotate }}
                      onDragStart={() => (dragging.current = true)}
                      onDragEnd={handleDragEnd}
                      className="
                        w-full md:w-[33%] sm:w-[50%]
                        rounded-3xl overflow-hidden
                        transition-all duration-200
                      "
                    >
                      <motion.div
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt || "Highlight"}
                          width={1200}
                          height={1200}
                          className="object-cover w-full h-[320px]"
                        />
                      </motion.div>
                    </motion.div>
                  )
                })}
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
                ${i === index ? "bg-[#052B70]" : "bg-neutral-300"}
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
      </div>
    </motion.section>
  );
}
