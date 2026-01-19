"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function DualFeatureBanner({ left, right }) {
  // Extract images with type guards for null safety
  const leftImage = left?.image && typeof left.image === 'object' ? left.image : null
  const rightImage = right?.image && typeof right.image === 'object' ? right.image : null

  // hover presets
  const panelHover = {
    scale: 1.03,
    boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
    transition: { duration: 0.7, ease: "easeOut" }
  };

  const imgHover = {
    scale: 1.08,
    x: -8,
    y: -5,
    transition: { duration: 1.1, ease: "easeOut" }
  };

  return (
    <div className="w-full py-12 md:py-20 px-4 md:px-6 lg:px-12">
      <div className="max-w-[1500px] mx-auto relative h-[300px] sm:h-[400px] md:h-[550px] lg:h-[580px]">

        {/* LEFT SIDE */}
        <Link
          href={left.link}
          className="absolute left-0 right-0 h-full overflow-hidden rounded-l-2xl left-clip pointer-events-auto"
          style={{
            width: "65%",
            clipPath: "polygon(0 0, 100% 0, 50% 100%, 0 100%)",
          }}
        >
          <motion.div
            whileHover={panelHover}
            initial={{ opacity: 0, x: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative h-full w-full cursor-pointer group will-change-transform"
          >
            {/* IMAGE */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              whileHover={imgHover}
            >
              {leftImage?.url && (
                <Image
                  src={leftImage.url}
                  alt={leftImage.alt || left.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </motion.div>

            {/* LENS SWEEP */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 pointer-events-none"
              initial={{ x: "-150%" }}
              whileInView={{ x: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              whileHover={{ x: "130%" }}
            />

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="absolute top-6 left-6 sm:top-8 sm:left-8 md:top-10 md:left-10 text-white z-20 drop-shadow-2xl"
            >
              <motion.p
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight flex items-center gap-2"
              >
                {left.title}
                <motion.span
                  initial={{ opacity: 0, rotate: -20 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                >
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                </motion.span>
              </motion.p>
            </motion.div>

          </motion.div>
        </Link>

        {/* RIGHT SIDE */}
        <Link
          href={right.link}
          className="absolute right-0 h-full overflow-hidden rounded-r-2xl right-clip pointer-events-auto"
          style={{
            width: "65%",
            clipPath: "polygon(50% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          <motion.div
            whileHover={panelHover}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative h-full w-full cursor-pointer group will-change-transform"
          >

            {/* IMAGE */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              whileHover={imgHover}
            >
              {rightImage?.url && (
                <Image
                  src={rightImage.url}
                  alt={rightImage.alt || right.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </motion.div>

            {/* LENS SWEEP */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tl from-white/0 via-white/5 to-white/0 pointer-events-none"
              initial={{ x: "150%" }}
              whileInView={{ x: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              whileHover={{ x: "-130%" }}
            />

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 text-white z-20 drop-shadow-2xl text-right"
            >
              <motion.p
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                whileInView={{ clipPath: "inset(0 0 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight flex items-center justify-end gap-2"
              >
                {right.title}
                <motion.span
                  initial={{ opacity: 0, rotate: 20 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
                >
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                </motion.span>
              </motion.p>
            </motion.div>

          </motion.div>
        </Link>
      </div>

      <style jsx>{`
        @media (min-width: 1400px) {
          .left-clip {
            clip-path: polygon(
              0 0,
              calc(100% - 28px) 0,
              calc(100% - 220px) 100%,
              0 100%
            ) !important;
          }
          .right-clip {
            clip-path: polygon(120px 0, 100% 0, 100% 100%, 28px 100%) !important;
          }
        }
      `}</style>
    </div>
  );
}
