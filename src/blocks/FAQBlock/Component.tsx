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
    <section className="w-full py-24 px-6 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

        {/* LEFT COLUMN */}
        <div>
          {/* MUCH BIGGER TITLE */}
          <h2 className="font-bebas text-7xl md:text-8xl mb-6 leading-none">
            {title}
          </h2>

          {description && (
            <p className="text-neutral-700 text-lg mb-12 max-w-lg">
              {description}
            </p>
          )}

          {/* FAQ LIST */}
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="pb-4 border-b border-neutral-300">
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => toggle(i)}
                >
                  <span className="font-semibold text-xl">
                    {faq.question}
                  </span>
                  <span className="text-3xl font-light">
                    {openIndex === i ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-neutral-700 leading-relaxed text-[17px] max-w-xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN – TALL FEATURE IMAGE */}
        {image && (
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-xl h-[450px] md:h-[550px] lg:h-[600px] rounded-3xl overflow-hidden shadow-md">
              <Image
                src={image.url}
                alt="FAQ Image"
                width={1000}
                height={1400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
