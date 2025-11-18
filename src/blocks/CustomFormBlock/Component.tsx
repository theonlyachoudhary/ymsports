"use client";
import Image from "next/image";
import React from "react";

type CustomFormBlockProps = {
  title: string;
  fields: {
    label: string;
    type: string;
    required?: boolean;
  }[];
  buttonLabel: string;

  image?: any;
  backgroundColor?: string;

  showInfo?: boolean;
  infoSections?: {
    label: string;
    body: string;
  }[];
};

export const CustomFormBlock: React.FC<CustomFormBlockProps> = ({
  title,
  fields,
  buttonLabel,
  image,
  backgroundColor,

  showInfo,
  infoSections,
}) => {
  return (
    <section className="w-full flex justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* LEFT SIDE → FORM BLOCK */}
        <div
          className={`
            bg-[#f7f4ed]
            rounded-3xl 
            p-10 md:p-14 
            shadow-sm
            ${showInfo && infoSections?.length > 0 ? "md:col-span-2" : "md:col-span-3"}
          `}
        >
          <h2 className="font-heading text-5xl md:text-6xl mb-10">
            {title}
          </h2>

          <form className="flex flex-col gap-6">
            {fields.map((field, i) => (
              <div key={i} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-700">
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    required={field.required}
                    className="
                      rounded-xl p-3 bg-white shadow-sm 
                      border border-neutral-200 
                      focus:outline-none focus:ring-2 focus:ring-neutral-400
                      min-h-[180px]
                    "
                  />
                ) : (
                  <input
                    type={field.type}
                    required={field.required}
                    className="
                      rounded-xl p-3 bg-white shadow-sm 
                      border border-neutral-200 
                      focus:outline-none focus:ring-2 focus:ring-neutral-400
                    "
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="
                mt-4 bg-black text-white 
                rounded-full px-8 py-3 text-sm 
                hover:bg-neutral-800 transition 
                w-fit
              "
            >
              {buttonLabel}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE → INFO BLOCK */}
        {showInfo && infoSections && infoSections.length > 0 && (
          <div
            className="
              bg-[#f7f4ed] 
              rounded-3xl 
              p-10 md:p-12 
              shadow-sm
              h-fit
              w-full
              md:w-auto
            "
          >
            <div className="space-y-10">
              {infoSections.map((sec, i) => (
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
          </div>
        )}

      </div>
    </section>
  );
};
