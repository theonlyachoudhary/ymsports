export function PageHeaderBlock({ title, subtitle, align, paddingSize }) {
  const pad = {
    lg: "py-28 px-6 md:px-12",
    md: "py-20 px-6 md:px-10",
    sm: "py-14 px-6 md:px-8",
  }[paddingSize || "lg"];

  const alignment = align === "left" ? "text-left" : "text-center";

  return (
    <section className="w-full flex justify-center">
      <div className={`min-w-[85vw] bg-[#f7f4ed] rounded-2xl shadow-sm ${pad}`}>

        <h1
          className={`font-bebas
            text-6xl sm:text-6xl md:text-8xl xl:text-9xl
            ${alignment}`}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={`mt-6
              w-full sm:w-4/5 md:w-2/3 lg:w-1/2
              mx-auto
              text-base sm:text-lg md:text-2xl 
              text-neutral-700 leading-relaxed
              ${alignment}`}
          >
            {subtitle}
          </p>
        )}

      </div>
    </section>
  );
}
