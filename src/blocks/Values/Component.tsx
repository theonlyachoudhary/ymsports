import { cn } from '@/utilities/ui'
import { SectionHeader } from '@/components/SectionHeader'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

type Props = {
  className?: string
  title?: string
  description?: string
  valueCards?: {
    title: string
    description: string
    icon: {
      url: string
      alt?: string
    }
  }[]
}

export const ValuesBlock: React.FC<Props> = ({
  className,
  title,
  description,
  valueCards = [],
}) => {
  return (
    <section className={cn('mx-auto my-8 w-full', className)}>
      <SectionHeader
        heading={title ?? ''}
        subheading={description ?? ''}
        align="center"
        spacing="sm"
        containerClassName="w-full ml-0"
      />
      <div className="flex flex-wrap justify-center items-center gap-8">
        {valueCards.map((values, idx) =>
          values ? (
            <Card
              key={values.title ?? idx}
              className="bg-white shadow-lg flex flex-col items-center justify-between transition-shadow duration-300 hover:shadow-[0_0_24px_4px_theme(colors.primary.DEFAULT)]"
              style={{
                width: '15rem',
                height: '15rem',
                border: 'none',
                borderRadius: '0.75rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '75%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              >
                {values.icon?.url && (
                  <Image
                    src={values.icon.url}
                    alt={values.icon.alt ?? values.title ?? 'icon'}
                    width={0}
                    height={0}
                    unoptimized
                    style={{
                      objectFit: 'contain',
                      borderRadius: '0.5rem',
                      width: '6rem',
                      height: '6rem',
                      aspectRatio: '1 / 1',
                      maxHeight: '100%',
                      maxWidth: '100%',
                    }}
                  />
                )}
              </div>

              <div
                className="flex flex-col items-start pb-2 px-4"
                style={{
                  height: '25%',
                  width: '100%',
                  justifyContent: 'flex-start',
                }}
              >
                {values.title && (
                  <h3 className="font-semibold text-center w-full">{values.title}</h3>
                )}
                {values.description && (
                  <p className="text-center w-full text-sm">{values.description}</p>
                )}
              </div>
            </Card>
          ) : null,
        )}
      </div>
    </section>
  )
}
