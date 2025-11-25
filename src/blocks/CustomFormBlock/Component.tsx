"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export const CustomFormBlock = ({
  title,
  fields,
  buttonLabel,
  image,
  backgroundColor = "#F5F1E8",
  showInfo,
  infoSections,
}) => {
  const hasInfo = showInfo && infoSections?.length > 0;
  const hasImage = image?.url;

  return (
    <section className="w-full flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-6xl grid grid-cols-1 ${
          hasInfo ? "md:grid-cols-2" : "md:grid-cols-1"
        } gap-12`}
      >
        {/* MAIN CARD */}
        <div className="bg-[#F5F1E8] rounded-3xl overflow-hidden shadow-sm w-full">
          <div
            className={`flex flex-col ${
              hasImage ? "md:flex-row" : "md:flex-col"
            }`}
          >
            {/* FORM SIDE */}
            <div className={`p-10 md:p-14 ${hasImage ? "md:w-1/2" : "w-full"}`}>
              <h2 className="font-heading text-5xl md:text-6xl mb-10">
                {title}
              </h2>

              <form className="flex flex-col gap-6 w-full">
                {fields.map((field, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 + 0.2, duration: 0.5 }}
                    className="flex flex-col gap-2 w-full"
                  >
                    <label className="text-sm font-medium text-neutral-700">
                      {field.label}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        required={field.required}
                        className="
                          w-full rounded-xl px-4 py-3 bg-white
                          border border-neutral-300
                          shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]
                          focus:outline-none
                          focus:ring-2 focus:ring-[#C6A667]/40
                          transition-all
                          min-h-[150px]
                          text-[15px]
                        "
                      />
                    ) : (
                      <input
                        type={field.type}
                        required={field.required}
                        className="
                          w-full rounded-xl px-4 py-3 bg-white
                          border border-neutral-300
                          shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]
                          focus:outline-none
                          focus:ring-2 focus:ring-[#C6A667]/40
                          transition-all
                          text-[15px]
                        "
                      />
                    )}
                  </motion.div>
                ))}

                {/* PREMIUM BUTTON */}
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + fields.length * 0.07 }}
                  className="
                    mt-6 rounded-full px-8 py-3 text-sm font-medium tracking-wide
                    bg-black text-white
                    transition-all duration-200
                    hover:bg-[#3C2F19]
                    active:bg-[#0C0C0C]
                    focus-visible:ring-2 focus-visible:ring-[#C6A667]/50
                    hover:shadow-[0_8px_22px_-6px_rgba(0,0,0,0.25)]
                    w-fit
                  "
                >
                  {buttonLabel}
                </motion.button>
              </form>
            </div>

            {/* IMAGE SIDE */}
            {hasImage && (
              <div className="relative w-full md:w-1/2 h-[340px] md:h-auto">

                <Image
                  src={image.url}
                  alt={image.alt || "Form Image"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/5 to-transparent pointer-events-none" />
              </div>
            )}
          </div>
        </div>

        {/* INFO BLOCK */}
        {hasInfo && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="bg-[#F5F1E8] rounded-3xl p-10 md:p-12 shadow-sm h-fit w-full"
          >
            <div className="space-y-10">
              {infoSections?.map((sec, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-heading text-3xl md:text-4xl tracking-wide">
                    {sec.label}
                  </h3>
                  <p className="text-neutral-800 whitespace-pre-line text-[15px] leading-relaxed">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
