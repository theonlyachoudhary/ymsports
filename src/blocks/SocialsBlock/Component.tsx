"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { getSocialIcon, getSocialColor } from "@/utilities/getSocialIcon";



export function SocialsBlock({ title, items }) {

  return (
    <section className="w-full py-24 px-6 flex flex-col items-center">
      
      {title && <h2 className="font-bebas text-6xl mb-16">{title}</h2>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 max-w-6xl w-full text-center">
        {items.map((item, i) => {
          const Icon = getSocialIcon(item.link || item.name || "");

          const color = getSocialColor(item.link || item.name || "");
          const isInstagram = color === "instagram";


          // Motion values for 3D hover
          const x = useMotionValue(0);
          const y = useMotionValue(0);

          const rotateX = useTransform(y, [-50, 50], [12, -12]);
          const rotateY = useTransform(x, [-50, 50], [-12, 12]);

          return (
            <div key={i} className="flex flex-col items-center">
              
              {/* ICON BLOCK */}
              <motion.div
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  x.set(e.clientX - rect.left - rect.width / 2);
                  y.set(e.clientY - rect.top - rect.height / 2);
                }}
                onMouseLeave={() => {
                  x.set(0);
                  y.set(0);
                }}
                style={{
                  rotateX,
                  rotateY,
                  perspective: 1000,
                  background: isInstagram
                    ? "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4)"
                    : color,
                }}
                className="
                  w-36 h-36 md:w-40 md:h-40
                  rounded-[32px]
                  shadow-lg
                  flex items-center justify-center
                  transition-all duration-300
                  hover:shadow-2xl hover:-translate-y-2
                "
              >
                <Icon className="w-14 h-14 text-white drop-shadow" />
              </motion.div>

              {/* NAME */}
              <h3 className="font-heading text-2xl tracking-wide mt-6">
                {item.name}
              </h3>

              {/* HANDLE */}
              <p className="text-neutral-600 text-base mt-1">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
