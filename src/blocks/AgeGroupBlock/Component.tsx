"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type AgeGroupBlockProps = {
  title: string;
  description: string;
  backgroundColor?: string;
  camps?: {
    name: string;
    buttonLabel?: string;
    buttonLink?: string;
  }[];
};

export const AgeGroupBlock: React.FC<AgeGroupBlockProps> = ({
  title,
  description,
  backgroundColor,
  camps,
}) => {
  const [open, setOpen] = useState(false);

  const bgStyle = { backgroundColor: backgroundColor || "#fbc948" };

  return (
    <section className="w-full flex justify-center px-4">
      <motion.div
        layout
        onClick={() => setOpen(!open)}
        className="
          w-full max-w-6xl rounded-3xl p-10 md:p-14 cursor-pointer relative
          shadow-sm transition-all duration-500
          hover:-translate-y-[2px] hover:shadow-xl
        "
        style={bgStyle}
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-black/5 opacity-60" />

        {/* HEADER */}
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="font-bebas text-4xl md:text-5xl text-white"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.20 }}
            className="mt-4 text-white/90 text-lg max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>

          <div className="flex justify-end mt-6">
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="text-white h-8 w-8" />
            </motion.div>
          </div>
        </div>

        {/* COLLAPSIBLE */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden"
            >
              {camps && camps.length > 0 ? (
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-4">
                  {camps.map((camp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.65,
                        ease: [0.16, 1, 0.3, 1],
                        delay: i * 0.12,
                      }}
                      className="
                        bg-white rounded-2xl p-8 flex flex-col items-center text-center 
                        shadow-sm
                      "
                    >
                      <h3 className="font-bebas text-2xl mb-6">{camp.name}</h3>

                      {/* BUTTON */}
                      {camp.buttonLink && (
                        <a
                          href={camp.buttonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            rounded-full px-6 py-2 text-sm font-medium
                            bg-[#E8E3D9] text-black
                            transition-colors duration-200
                            hover:bg-[#DCD6CA]
                            active:bg-[#D3CDC1]
                          "
                        >
                          {camp.buttonLabel || "Register"}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-white/80 mt-6">No camps available.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
