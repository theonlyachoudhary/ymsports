"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function DualFeatureBanner({ left, right }) {
  return (
    <div className="w-full py-6 md:py-10 px-4 md:px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto relative h-[300px] sm:h-[400px] md:h-[550px] lg:h-[550px]">

        {/* LEFT SIDE */}
        <Link
          href={left.link}
          className="absolute left-0 right-0 h-full overflow-hidden rounded-l-xl md:rounded-l-2xl pointer-events-auto left-clip"
          style={{ 
            width: '80%',
            clipPath: 'polygon(0 0, calc(100% - 2vw) 0, calc(100% - 40vw) 100%, 0 100%)'
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative h-full w-full cursor-pointer group"
          >
            <Image
              src={left.image.url}
              alt={left.title}
              fill
              className="object-cover"
            />

            {/* Text */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 text-white drop-shadow-2xl z-20">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight flex items-center gap-2 md:gap-3">
                {left.title}
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              </p>
            </div>
          </motion.div>
        </Link>

        {/* RIGHT SIDE */}
        <Link
          href={right.link}
          className="absolute right-0 h-full overflow-hidden rounded-r-xl md:rounded-r-2xl pointer-events-auto right-clip"
          style={{ 
            width: '80%',
            clipPath: 'polygon(40vw 0, 100% 0, 100% 100%, 2vw 100%)'
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative h-full w-full cursor-pointer group"
          >
            <Image
              src={right.image.url}
              alt={right.title}
              fill
              className="object-cover"
            />

            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 text-white drop-shadow-2xl text-right z-20">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-tight flex items-center justify-end gap-2 md:gap-3">
                {right.title}
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              </p>
            </div>
          </motion.div>
        </Link>

      </div>

      <style jsx>{`
        @media (min-width: 1400px) {
          .left-clip {
            clip-path: polygon(0 0, calc(100% - 28px) 0, calc(100% - 220px) 100%, 0 100%) !important;
          }
          .right-clip {
            clip-path: polygon(120px 0, 100% 0, 100% 100%, 28px 100%) !important;
          }
        }
      `}</style>
    </div>
  );
}