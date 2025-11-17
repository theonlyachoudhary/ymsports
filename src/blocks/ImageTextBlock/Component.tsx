'use client'

import React from 'react'
import Image from 'next/image'

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
    <section className="py-32 "> 
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        
        {/* IMAGE */}
        <div className="w-full flex justify-center">
          <div className="w-[420px] h-[420px] md:w-[500px] md:h-[500px] rounded-2xl overflow-hidden shadow-md bg-neutral-300">
            {image?.url && (
              <Image
                src={image.url}
                alt={image.alt || 'Image'}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* TEXT */}
        <div className="text-left">
          <h2 className="uppercase tracking-wide font-heading text-4xl md:text-5xl mb-6">
            {title}
          </h2>

          <p className="text-neutral-700 font-sans text-lg leading-relaxed md:leading-loose max-w-[90%]">
            {content}
          </p>
        </div>

      </div>
    </section>
  )
}
