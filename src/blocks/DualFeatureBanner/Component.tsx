"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

interface FeatureItem {
  title: string;
  description?: string;
  duration?: string;
  link: string;
  image: { url: string };
}

interface TripleFeatureBannerProps {
  left?: FeatureItem;
  center?: FeatureItem;
  right?: FeatureItem;
}

export function DualFeatureBanner({ left, center, right }: TripleFeatureBannerProps) {
  const features = [left, center, right].filter(Boolean) as FeatureItem[];
  if (features.length === 0) return null;

  const panelHover = {
    scale: 1.02,
    boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
    transition: { duration: 0.5, ease: "easeOut" as const }
  };

  const imgHover = {
    scale: 1.06,
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  const FeaturePanel = ({ 
    feature, 
    position, 
    delay = 0 
  }: { 
    feature: FeatureItem; 
    position: 'left' | 'center' | 'right';
    delay?: number;
  }) => {
    if (!feature || !feature.link) return null;
    
    const textPosition = position === 'left' 
      ? 'top-4 left-4 sm:top-6 sm:left-6 text-left' 
      : position === 'right'
      ? 'bottom-4 right-4 sm:bottom-6 sm:right-6 text-right'
      : 'bottom-4 left-4 sm:bottom-6 sm:left-6 text-left';

    return (
      <Link
        href={feature.link || '#'}
        className="block relative w-full h-full overflow-hidden rounded-2xl"
      >
        <motion.div
          whileHover={panelHover}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay }}
          className="relative h-full w-full cursor-pointer group"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={imgHover}
          >
            <Image
              src={feature.image?.url || '/placeholder.jpg'}
              alt={feature.title || 'Feature'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 pointer-events-none"
            initial={{ x: "-150%" }}
            whileHover={{ x: "150%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: delay + 0.2 }}
            className={`absolute ${textPosition} text-white z-20 max-w-[85%]`}
          >
            {feature.duration && (
              <div className="flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5 text-[#3BD463]" />
                <span className="text-xs sm:text-sm font-medium text-white/90 uppercase tracking-wide">
                  {feature.duration}
                </span>
              </div>
            )}
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight flex items-center gap-2 flex-wrap">
              {feature.title}
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:translate-x-1 transition-transform" />
            </h3>
            
            {feature.description && (
              <p className="text-xs sm:text-sm text-white/80 mt-2 line-clamp-2 max-w-xs">
                {feature.description}
              </p>
            )}
          </motion.div>
        </motion.div>
      </Link>
    );
  };

  const hasThreeFeatures = left && center && right;
  const hasTwoFeatures = features.length === 2;

  if (hasThreeFeatures) {
    return (
      <div className="w-full py-6 md:py-10 px-4 md:px-6 lg:px-12">
        <div className="max-w-[1500px] mx-auto">
          <div className="hidden lg:grid lg:grid-cols-12 gap-4 h-[500px] xl:h-[550px]">
            <div 
              className="col-span-4 relative overflow-hidden rounded-2xl"
              style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}
            >
              <FeaturePanel feature={left} position="left" delay={0} />
            </div>

            <div 
              className="col-span-5 relative overflow-hidden rounded-2xl -ml-8 -mr-8 z-10"
              style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)" }}
            >
              <FeaturePanel feature={center} position="center" delay={0.1} />
            </div>

            <div 
              className="col-span-4 relative overflow-hidden rounded-2xl -ml-4"
              style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <FeaturePanel feature={right} position="right" delay={0.2} />
            </div>
          </div>

          <div className="lg:hidden flex flex-col gap-4">
            <div className="h-[200px] sm:h-[250px] rounded-2xl overflow-hidden">
              <FeaturePanel feature={left} position="left" delay={0} />
            </div>
            <div className="h-[200px] sm:h-[250px] rounded-2xl overflow-hidden">
              <FeaturePanel feature={center} position="center" delay={0.1} />
            </div>
            <div className="h-[200px] sm:h-[250px] rounded-2xl overflow-hidden">
              <FeaturePanel feature={right} position="right" delay={0.2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hasTwoFeatures || left || right) {
    return (
      <div className="w-full py-6 md:py-10 px-4 md:px-6 lg:px-12">
        <div className="max-w-[1500px] mx-auto relative h-[300px] sm:h-[400px] md:h-[550px] lg:h-[580px]">
          {left && (
            <div
              className="absolute left-0 right-0 h-full overflow-hidden rounded-l-2xl"
              style={{
                width: "65%",
                clipPath: "polygon(0 0, 100% 0, 50% 100%, 0 100%)",
              }}
            >
              <FeaturePanel feature={left} position="left" delay={0} />
            </div>
          )}

          {right && (
            <div
              className="absolute right-0 h-full overflow-hidden rounded-r-2xl"
              style={{
                width: "65%",
                clipPath: "polygon(50% 0, 100% 0, 100% 100%, 0 100%)",
              }}
            >
              <FeaturePanel feature={right} position="right" delay={0.1} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
