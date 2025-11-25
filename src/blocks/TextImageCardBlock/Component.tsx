'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

type TextImageCardBlockProps = {
  title: string
  content: string
  buttonText?: string
  buttonLink?: string
  image?: {
    url: string
    alt?: string
  }
}

export const TextImageCardBlock: React.FC<TextImageCardBlockProps> = ({
  title,
  content,
  buttonText,
  buttonLink = '#',
  image,
}) => {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 55, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="bg-[#F5F1E8] rounded-3xl overflow-hidden shadow-sm grid md:grid-cols-2"
        >

          {/* LEFT TEXT */}
          <div className="py-16 px-6 md:py-28 md:px-16 lg:py-40 lg:px-20 flex flex-col justify-center">
            
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="uppercase font-heading tracking-wide text-5xl md:text-6xl mb-6"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-neutral-700 text-xl leading-relaxed mb-10 max-w-[90%]"
            >
              {content}
            </motion.p>

            {buttonText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="relative z-10 pointer-events-auto "
              >
                <Link
                  href={buttonLink}
                  className="
                    inline-flex items-center justify-center
                    rounded-full px-8 py-4
                    text-sm font-medium tracking-wide
                    bg-black text-white
                    transition-colors duration-300
                    hover:bg-[#DED7CB]
                    hover:text-black
                    active:bg-neutral-950
                  "
                >
                  {buttonText}
                </Link>
              </motion.div>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 1.02 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
            className="w-full h-full relative overflow-hidden group"
          >
            {image?.url ? (
              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -3,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full h-full"
              >
                <Image
                  src={image.url}
                  alt={image.alt || 'Image'}
                  width={900}
                  height={900}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ) : (
              <div className="w-full h-full bg-neutral-300" />
            )}

            {/* Lens Sweep */}
            <motion.div
              initial={{ x: '-130%' }}
              whileInView={{ x: '130%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: 'easeOut', delay: 0.45 }}
              className="absolute inset-0 bg-gradient-to-br from-transparent via-white/12 to-transparent pointer-events-none"
            />
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
