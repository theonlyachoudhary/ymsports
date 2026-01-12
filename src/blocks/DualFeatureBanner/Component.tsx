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

  const FeaturePanel = ({ 
    feature, 
    position,
    delay = 0,
    clipPath,
    className = ""
  }: { 
    feature: FeatureItem; 
    position: 'top' | 'middle' | 'bottom';
    delay?: number;
    clipPath?: string;
    className?: string;
  }) => {
    if (!feature || !feature.link) return null;

    return (
      <Link
        href={feature.link || '#'}
        className={`block relative w-full h-full overflow-hidden ${className}`}
        style={clipPath ? { clipPath } : undefined}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay }}
          whileHover={{ scale: 1.02 }}
          className="relative h-full w-full cursor-pointer group"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.08 }}
          >
            <Image
              src={feature.image?.url || '/placeholder.jpg'}
              alt={feature.title || 'Feature'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: delay + 0.2 }}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white z-20"
          >
            {feature.duration && (
              <div className="flex items-center gap-1.5 mb-2">
                <Clock className="w-3 h-3 text-[#3BD463]" />
                <span className="text-xs font-medium text-white/90 uppercase tracking-wide">
                  {feature.duration}
                </span>
              </div>
            )}
            
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight flex items-center gap-2">
              {feature.title}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </h3>
            
            {feature.description && (
              <p className="text-xs text-white/70 mt-1 line-clamp-1 max-w-[200px]">
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
        <div className="max-w-[1200px] mx-auto">
          <div className="hidden md:flex flex-col gap-3">
            <div 
              className="h-[180px] lg:h-[220px] w-[70%] rounded-2xl overflow-hidden"
              style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)" }}
            >
              <FeaturePanel feature={left} position="top" delay={0} />
            </div>
            
            <div 
              className="h-[180px] lg:h-[220px] w-[75%] rounded-2xl overflow-hidden ml-8"
              style={{ clipPath: "polygon(5% 0, 100% 0, 92% 100%, 0 100%)" }}
            >
              <FeaturePanel feature={center} position="middle" delay={0.1} />
            </div>
            
            <div 
              className="h-[180px] lg:h-[220px] w-[65%] rounded-2xl overflow-hidden"
              style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}
            >
              <FeaturePanel feature={right} position="bottom" delay={0.2} />
            </div>
          </div>

          <div className="md:hidden flex flex-col gap-3">
            <div className="h-[150px] rounded-xl overflow-hidden">
              <FeaturePanel feature={left} position="top" delay={0} />
            </div>
            <div className="h-[150px] rounded-xl overflow-hidden">
              <FeaturePanel feature={center} position="middle" delay={0.1} />
            </div>
            <div className="h-[150px] rounded-xl overflow-hidden">
              <FeaturePanel feature={right} position="bottom" delay={0.2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hasTwoFeatures || left || right) {
    const firstFeature = left || center;
    const secondFeature = right || center;
    
    return (
      <div className="w-full py-6 md:py-10 px-4 md:px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="hidden md:flex flex-col gap-3">
            {firstFeature && (
              <div 
                className="h-[200px] lg:h-[240px] w-[70%] rounded-2xl overflow-hidden"
                style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)" }}
              >
                <FeaturePanel feature={firstFeature} position="top" delay={0} />
              </div>
            )}
            
            {secondFeature && secondFeature !== firstFeature && (
              <div 
                className="h-[200px] lg:h-[240px] w-[65%] rounded-2xl overflow-hidden ml-8"
                style={{ clipPath: "polygon(5% 0, 100% 0, 85% 100%, 0 100%)" }}
              >
                <FeaturePanel feature={secondFeature} position="bottom" delay={0.1} />
              </div>
            )}
          </div>

          <div className="md:hidden flex flex-col gap-3">
            {firstFeature && (
              <div className="h-[150px] rounded-xl overflow-hidden">
                <FeaturePanel feature={firstFeature} position="top" delay={0} />
              </div>
            )}
            {secondFeature && secondFeature !== firstFeature && (
              <div className="h-[150px] rounded-xl overflow-hidden">
                <FeaturePanel feature={secondFeature} position="bottom" delay={0.1} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
