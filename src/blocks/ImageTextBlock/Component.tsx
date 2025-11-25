'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type ImageTextBlockProps = {
  title: string
  content: string
  image?: {
    url: string
    alt?: string
  }
}

export const ImageTextBlock: React.FC<ImageTextBlockProps> = ({
  title,
  content,
  image,
}) => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.85,         // slower to match Coaches section
            ease: [0.16, 1, 0.3, 1]
          }}
          className="w-full flex justify-center relative"
        >
          <motion.div
            whileHover={{
              scale: 1.02,          // subtle
              y: -3,                // tiny elegant lift
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-[420px] aspect-square md:max-w-[500px] rounded-2xl overflow-hidden shadow-md bg-neutral-300 relative group"
          >
            {image?.url && (
              <Image
                src={image.url}
                alt={image.alt || 'Image'}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            )}

            {/* Subtle Lens Sweep */}
            <motion.div
              initial={{ x: '-120%' }}
              whileInView={{ x: '130%' }}
              viewport={{ once: true }}
              transition={{
                duration: 1.8,
                ease: 'easeOut',
                delay: 0.4,
              }}
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/12 to-transparent pointer-events-none"
            />
          </motion.div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-left"
        >
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.15,
              duration: 0.7,
              ease: 'easeOut'
            }}
            className="uppercase tracking-wide font-heading text-4xl md:text-5xl mb-6"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.28,
              duration: 0.7,
              ease: 'easeOut'
            }}
            className="text-neutral-700 font-sans text-lg leading-relaxed md:leading-loose max-w-[90%]"
          >
            {content}
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}
