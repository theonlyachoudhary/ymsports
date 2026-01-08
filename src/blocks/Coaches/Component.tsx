"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";
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
  title = "Our Leadership & Coaches",
  description = "The dedicated individuals who make YMS a fertile ground for growth.",
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

  if (loading) return <p className="text-center text-gray-500 py-12">Loading coaches…</p>;
  if (error) return <p className="text-center text-red-600 py-12">Error: {error}</p>;
  if (!coaches?.length) return null;

  return (
    <section className={cn("py-24 bg-[#052B70]/5", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#052B70] mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600">
              {description}
            </p>
          )}
        </motion.div>

        {/* Coach Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((c, i) => {
            const img = (c.profilePicture as any)?.url as string | undefined;

            return (
              <motion.div
                key={c.id ?? i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                onClick={() => setActiveCoach(c)}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                {/* Square Image Container */}
                <div className="w-full aspect-square bg-gray-100 rounded-xl mb-6 overflow-hidden relative">
                  {img ? (
                    <img
                      src={img}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <Users size={64} />
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-heading font-bold text-[#052B70] group-hover:text-[#3BD463] transition-colors">
                  {c.name}
                </h3>
                <div className="text-[#3BD463] text-sm font-bold uppercase tracking-wider mb-3">
                  {c.role || "Coach"}
                </div>
                {c.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {c.bio}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
            >
              {/* Modal Image */}
              {activeCoach.profilePicture ? (
                <img
                  src={(activeCoach.profilePicture as any).url}
                  alt={activeCoach.name}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
                  <Users size={80} className="text-gray-300" />
                </div>
              )}

              {/* Modal Content */}
              <div className="p-8 text-center">
                <h3 className="text-3xl font-heading font-bold text-[#052B70]">
                  {activeCoach.name}
                </h3>

                <p className="mt-2 text-[#3BD463] text-sm font-bold uppercase tracking-wider">
                  {activeCoach.role || "Coach"}
                </p>

                {activeCoach.bio && (
                  <p className="mt-6 text-gray-600 leading-relaxed">
                    {activeCoach.bio}
                  </p>
                )}

                <button
                  onClick={() => setActiveCoach(null)}
                  className="mt-8 w-full bg-[#052B70] text-white py-3 rounded-full font-bold uppercase tracking-wide hover:bg-[#041d4d] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
