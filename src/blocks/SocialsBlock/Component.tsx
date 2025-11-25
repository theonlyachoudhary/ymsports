"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { getSocialIcon, getSocialColor } from "@/utilities/getSocialIcon";

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export function SocialsBlock({ title, items }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-24 px-6 flex flex-col items-center"
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-bebas text-6xl mb-16"
        >
          {title}
        </motion.h2>
      )}

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 max-w-6xl w-full text-center"
      >
        {items.map((item, i) => {
          const Icon = getSocialIcon(item.link || item.name || "");
          const color = getSocialColor(item.link || item.name || "");
          const isInstagram = color === "instagram";

          const x = useMotionValue(0);
          const y = useMotionValue(0);

          const rotateX = useTransform(y, [-60, 60], [10, -10]);
          const rotateY = useTransform(x, [-60, 60], [-10, 10]);

          const translateX = useTransform(x, (val) => val / 18);
          const translateY = useTransform(y, (val) => val / 18);

          return (
            <motion.div
              key={i}
              variants={itemVariants} 
              className="flex flex-col items-center"
            >
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
                  x: translateX,
                  y: translateY,
                  perspective: 800,
                  background: isInstagram
                    ? "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4)"
                    : color,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
                  translateY: -6,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                  duration: 1,
                }}
                className="
                  w-36 h-36 md:w-40 md:h-40
                  rounded-[32px]
                  flex items-center justify-center
                  shadow-lg
                  cursor-pointer
                "
              >
                <Icon className="w-14 h-14 text-white drop-shadow" />
              </motion.div>

              <h3 className="font-heading text-2xl tracking-wide mt-6">
                {item.name}
              </h3>

              <p className="text-neutral-600 text-base mt-1">{item.value}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
