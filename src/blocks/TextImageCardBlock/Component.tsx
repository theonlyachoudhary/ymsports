'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
    <section className="py-32 "> 
      <div className="max-w-6xl mx-auto px-6">

        {/* CARD */}
        <div className="bg-[#F5F1E8] rounded-3xl overflow-hidden shadow-sm grid md:grid-cols-2">

          {/* LEFT TEXT */}
          <div className="py-16 px-6 md:py-28 md:px-16 lg:py-40 lg:px-20 flex flex-col justify-center">
            <h2 className="uppercase font-heading tracking-wide text-6xl mb-6">
              {title}
            </h2>

            <p className="text-neutral-700 text-xl leading-relaxed mb-10 max-w-[90%]">
              {content}
            </p>

            {buttonText && (
              <Link
                href={buttonLink}
                className=" px-8 py-3  lg:w-1/3 bg-black text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition"
              >
                {buttonText}
              </Link>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full h-full">
            {image?.url ? (
              <Image
                src={image.url}
                alt={image.alt || 'Image'}
                width={900}
                height={900}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-300" />
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
