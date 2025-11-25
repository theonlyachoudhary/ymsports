"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Coach as CoachDoc, Coaches as CoachesBlockDoc } from "@/payload-types";
import { cn } from "@/utilities/ui";

type Props = {
  className?: string;
  title?: string;
  description?: string;
  featuredCoaches?: CoachDoc[];
} & CoachesBlockDoc;

export const CoachesBlock: React.FC<Props> = ({
  className,
  title,
  description,
  featuredCoaches,
}) => {
  const [fetched, setFetched] = useState<CoachDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeCoach, setActiveCoach] = useState<CoachDoc | null>(null);

  const shouldFetch = !featuredCoaches || featuredCoaches.length === 0;

  useEffect(() => {
    if (!shouldFetch) return;
    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/coaches?limit=12&depth=1");
        if (!res.ok) throw new Error(`Failed to fetch coaches: ${res.status}`);
        const data = await res.json();
        setFetched(data.docs as CoachDoc[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [shouldFetch]);

  const coaches: CoachDoc[] = useMemo(
    () => (shouldFetch ? fetched : featuredCoaches ?? []),
    [shouldFetch, fetched, featuredCoaches]
  );

  if (loading) return <p className="text-center text-gray-500">Loading coaches…</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;
  if (!coaches?.length) return null;

  return (
    <section className={cn("w-full bg-[#FAF7EF] py-24 px-6", className)}>
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="font-heading uppercase tracking-tight text-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          {title}
        </h2>

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-4 text-lg font-sans text-neutral-700"
          >
            {description}
          </motion.p>
        )}
      </motion.div>

      {/* GRID */}
      <div
        className="mt-20 max-w-7xl mx-auto 
                   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                   gap-12 group"
      >
        {coaches.map((c, i) => {
          const img = (c.profilePicture as any)?.url as string | undefined;

          return (
            <motion.div
              key={c.id ?? i}
              initial={{ opacity: 0, y: 40, scale: 0.92, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: i * 0.08,
                scale: { type: "spring", stiffness: 140, damping: 14 },
              }}
              onClick={() => setActiveCoach(c)}
              className={cn(
                "relative bg-white rounded-3xl shadow-md overflow-hidden cursor-pointer",
                "hover:shadow-xl hover:-translate-y-1",
                "group-hover:opacity-50 hover:!opacity-100"
              )}
            >
              {/* IMAGE */}
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                {img ? (
                  <motion.img
                    src={img}
                    alt={c.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08, y: -6 }}
                    transition={{ duration: 0.6 }}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-300 animate-pulse" />
                )}

                {/* LENS SWEEP */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0 pointer-events-none"
                  initial={{ x: "-120%" }}
                  whileHover={{ x: "130%" }}
                  transition={{ duration: 1.3, ease: "easeOut" }}
                />
              </div>

              {/* TEXT AREA */}
              <div className="py-6 px-5 text-center">
                <h3 className="font-heading text-2xl uppercase text-black tracking-wide">
                  {c.name}
                </h3>

                <p className="font-sans text-neutral-600 text-sm mt-1">
                  {c.role || "Coach"}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {activeCoach && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCoach(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-xl"
            >
              {/* Modal Image */}
              {activeCoach.profilePicture && (
                <img
                  src={(activeCoach.profilePicture as any).url}
                  alt={activeCoach.name}
                  className="w-full h-72 object-cover"
                />
              )}

              {/* Modal Content */}
              <div className="p-8 text-center">
                <h3 className="text-3xl font-heading uppercase tracking-tight">
                  {activeCoach.name}
                </h3>

                <p className="mt-2 text-neutral-600 font-sans text-sm">
                  {activeCoach.role}
                </p>

                {activeCoach.bio && (
                  <p className="mt-6 text-neutral-700 leading-relaxed">
                    {activeCoach.bio}
                  </p>
                )}

                <button
                  className="mt-8 w-full bg-black text-white py-3 rounded-full font-heading uppercase tracking-wide hover:bg-neutral-900 transition"
                >
                  Book Intro Call
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};