"use client";
import Image from "next/image";
import React, { useState } from "react";

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
};

export const CustomFormBlock: React.FC<CustomFormBlockProps> = ({
  title,
  fields,
  buttonLabel,
  image,
  backgroundColor,
}) => {
  return (
    <section className="w-full flex justify-center px-4">
      <div
        className="w-full max-w-6xl rounded-3xl p-10 md:p-14 shadow-sm flex flex-col md:flex-row gap-12"
        style={{ backgroundColor: backgroundColor || "#f7f4ed" }}
      >
        {/* LEFT: FORM */}
        <div className="flex-1">
          <h2 className="font-heading text-4xl md:text-5xl mb-8">{title}</h2>

          <form className="flex flex-col gap-5">

            {fields.map((field, i) => (
              <div key={i} className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-700">
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    required={field.required}
                    className="rounded-xl p-3 bg-white shadow-sm border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                  />
                ) : (
                  <input
                    type={field.type}
                    required={field.required}
                    className="rounded-xl p-3 bg-white shadow-sm border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="mt-4 bg-black text-white rounded-full px-8 py-3 text-sm hover:bg-neutral-800 transition w-fit"
            >
              {buttonLabel}
            </button>
          </form>
        </div>

        {/* RIGHT: IMAGE */}
        {image && (
          <div className="flex-1">
            <div className="w-full h-64 md:h-full bg-neutral-300 rounded-2xl overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt }
                width={800}
                height={800}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
