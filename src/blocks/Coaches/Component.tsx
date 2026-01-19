"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Zap } from "lucide-react";
import type { Coach as CoachDoc, Coaches as CoachesBlockDoc } from "@/payload-types";
import { cn } from "@/utilities/ui";

type Props = {
  className?: string;
  title?: string;
  description?: string;
  featuredCoaches?: CoachDoc[];
} & CoachesBlockDoc;

const CoachCard: React.FC<{
  coach: CoachDoc;
  index: number;
  onViewDetails: (coach: CoachDoc) => void;
}> = ({ coach, index, onViewDetails }) => {
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const bioRef = useRef<HTMLParagraphElement>(null);

  const img = (coach.profilePicture as any)?.url as string | undefined;

  useEffect(() => {
    if (bioRef.current && coach.bio) {
      const lineHeight = parseFloat(getComputedStyle(bioRef.current).lineHeight);
      const maxHeight = lineHeight * 3;
      setNeedsTruncation(bioRef.current.scrollHeight > maxHeight + 2);
    }
  }, [coach.bio]);

  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails(coach);
  };

  return (
    <motion.div
      key={coach.id ?? index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      onClick={() => onViewDetails(coach)}
      className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col"
    >
      <div className="w-full aspect-square bg-gray-100 rounded-xl mb-6 overflow-hidden relative flex-shrink-0">
        {img ? (
          <img
            src={img}
            alt={coach.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <Users size={64} />
          </div>
        )}
      </div>

      <h3 className="text-xl font-heading font-bold text-[#052B70] group-hover:text-[#3BD463] transition-colors">
        {coach.name}
      </h3>
      <div className="text-[#3BD463] text-sm font-bold uppercase tracking-wider mb-3">
        {coach.role || "Coach"}
      </div>

      {coach.bio && (
        <div className="flex-grow">
          <p
            ref={bioRef}
            className="text-gray-600 text-sm leading-relaxed line-clamp-3"
          >
            {coach.bio}
          </p>
          {needsTruncation && (
            <button
              onClick={handleViewProfile}
              className="mt-2 text-[#052B70] text-sm font-semibold hover:text-[#3BD463] transition-colors"
            >
              View full profile
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

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
    <section className={cn("py-20 md:py-28 relative overflow-hidden", className)}>
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#3BD463]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#052B70]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#3BD463]/10 rounded-full">
            <Zap size={16} className="text-[#3BD463]" />
            <span className="text-[#3BD463] font-bold uppercase tracking-widest text-sm">Our Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#052B70] uppercase tracking-tight mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {coaches.map((c, i) => (
            <CoachCard
              key={c.id ?? i}
              coach={c}
              index={i}
              onViewDetails={setActiveCoach}
            />
          ))}
        </div>
      </div>

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
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {activeCoach.profilePicture ? (
                <img
                  src={(activeCoach.profilePicture as any).url}
                  alt={activeCoach.name}
                  className="w-full h-72 object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-full h-72 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Users size={80} className="text-gray-300" />
                </div>
              )}

              <div className="p-8 text-center overflow-y-auto flex-grow">
                <h3 className="text-3xl font-heading font-bold text-[#052B70]">
                  {activeCoach.name}
                </h3>

                <p className="mt-2 text-[#3BD463] text-sm font-bold uppercase tracking-wider">
                  {activeCoach.role || "Coach"}
                </p>

                {activeCoach.bio && (
                  <p className="mt-6 text-gray-600 leading-relaxed text-left">
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
