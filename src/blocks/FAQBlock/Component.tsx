"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function FAQBlock({ title, description, image, faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full py-28 px-6 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-bebas text-7xl md:text-8xl mb-6 leading-none"
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="text-neutral-700 text-lg mb-12 max-w-lg"
            >
              {description}
            </motion.p>
          )}

          {/* FAQ LIST */}
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="pb-4 border-b border-neutral-200 relative"
              >
                <button
                  className="
                    w-full flex justify-between items-center text-left 
                    group
                  "
                  onClick={() => toggle(i)}
                >
                  {/* QUESTION */}
                  <span
                    className="
                      font-semibold text-xl 
                      transition-all 
                      group-hover:text-black 
                      group-hover:tracking-wide
                    "
                  >
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl font-light text-neutral-700 group-hover:text-black"
                  >
                    {openIndex === i ? "−" : "+"}
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.35 }}
                        className="mt-4 text-neutral-700 leading-relaxed text-[17px] max-w-xl"
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        {image && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex justify-end"
          >
            <motion.div
              whileHover={{
                scale: 1.03,
                rotateX: 4,
                rotateY: -4,
                boxShadow: "0 40px 90px rgba(0,0,0,0.25)",
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 20,
              }}
              className="
                w-full max-w-xl 
                h-[470px] md:h-[560px] lg:h-[620px]
                rounded-[32px] overflow-hidden 
                shadow-xl bg-neutral-100
              "
            >
              <Image
                src={image.url}
                alt="FAQ Image"
                width={1000}
                height={1400}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
