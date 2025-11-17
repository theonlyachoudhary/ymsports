"use client";
import { useState, useRef } from "react";
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
  const contentRef = useRef<HTMLDivElement | null>(null);

  const bgStyle = { backgroundColor: backgroundColor || "#fbc948" };

  return (
    <section className="w-full flex justify-center px-4">
      <div
        className="w-full max-w-6xl rounded-3xl p-10 md:p-14 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        style={bgStyle}
      >
        {/* Header */}
        <div className="cursor-pointer" onClick={() => setOpen(!open)}>
          <h2 className="font-bebas text-4xl md:text-5xl text-white">
            {title}
          </h2>

          <p className="mt-4 text-white/90 text-lg max-w-2xl leading-relaxed">
            {description}
          </p>

          {/* Arrow */}
          <div className="flex justify-end mt-6">
            <ChevronDown
              className={`text-white h-8 w-8 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Collapsible Section */}
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: open
              ? `${contentRef.current?.scrollHeight ?? 0}px`
              : "0px",
          }}
        >
          {/* Camps */}
          {camps && camps.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-4">
              {camps.map((camp, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 120}ms` }}
                    className="
                      opacity-0 translate-y-4 
                      animate-fadeUp 
                      bg-white rounded-2xl p-8 flex flex-col items-center text-center 
                      shadow-md transition-all duration-300 
                      hover:-translate-y-2 hover:shadow-xl
                    "                
                >
                  <h3 className="font-bebas text-2xl mb-6">{camp.name}</h3>

                  {camp.buttonLink && (
                    <a
                      href={camp.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#f7f4ed] rounded-full px-6 py-2 text-sm hover:bg-neutral-100 transition inline-block"
                    >
                      {camp.buttonLabel || "Register"}
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/80 mt-6">No camps available for this age group.</p>
          )}
        </div>
      </div>
    </section>
  );
};
