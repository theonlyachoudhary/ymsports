'use client'

import type { Program } from 'src/payload-types'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  title?: string
  description?: string
  programs?: Program[]
  className?: string
}

export const ProgramsBlock: React.FC<Props> = ({
  title,
  description,
  programs = [],
  className,
}) => {
  return (
    <section
      className={cn(
        'w-full bg-[#FFF9F2] py-16 px-4 md:px-8 rounded-t-[20px]',
        className
      )}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#5B2C0E] uppercase tracking-wide">
          {title}
        </h2>
        <p className="mt-3 text-base md:text-lg text-[#545454] max-w-2xl mx-auto">
          {description}
        </p>

        {/* Static Age Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <span className="px-3 py-1 border border-[#C4571B] text-[#C4571B] rounded-md text-sm font-semibold">
            5 to 7
          </span>
          <span className="px-3 py-1 border border-[#2B9CC8] text-[#2B9CC8] rounded-md text-sm font-semibold">
            8 to 10
          </span>
          <span className="px-3 py-1 border border-[#E1A529] text-[#E1A529] rounded-md text-sm font-semibold">
            11 to 13
          </span>
          <span className="px-3 py-1 border border-[#5A9E56] text-[#5A9E56] rounded-md text-sm font-semibold">
            14 to 16
          </span>
        </div>
      </div>

      {/* Program Cards */}
      <div className="mt-12 max-w-6xl mx-auto flex flex-col gap-10">
        {programs.map((p, idx) => {
          const colors = ['#C4571B', '#2B9CC8', '#E1A529', '#5A9E56']
          const color = p.themeColor || colors[idx % colors.length]

          return (
            <Card
              key={p.id ?? idx}
              className="relative rounded-2xl border border-[#E6E6E6] shadow-[0_2px_6px_rgba(0,0,0,0.05)] bg-white overflow-hidden"
            >
              <CardContent className="p-8 flex flex-col md:flex-row justify-between gap-8 relative">
                {/* Left Text Section */}
                <div className="flex-1">
                  <h3
                    className="text-xl font-extrabold uppercase"
                    style={{ color }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm font-semibold uppercase mt-1"
                    style={{ color }}
                  >
                    {p.subtitle}
                  </p>
                  <p className="mt-3 text-[#333] leading-relaxed max-w-prose">
                    {p.description}
                  </p>

                  {p.buttonText && (
                    <a
                      href={p.buttonLink ?? '#'}
                      className="mt-6 inline-block rounded-md px-5 py-2 text-sm font-semibold transition hover:opacity-90"
                      style={{
                        border: `1.5px solid ${color}`,
                        color,
                      }}
                    >
                      {p.buttonText}
                    </a>
                  )}
                </div>

                {/* Right Decorative Section */}
                <div className="hidden md:block relative flex-shrink-0 md:w-[260px] overflow-visible">
                  {p.sideImage?.url ? (
                    <img
                      src={p.sideImage.url}
                      alt={p.sideImage.alt ?? ''}
                      className="absolute right-[0px] top-1/2 -translate-y-1/2 w-[280px] max-w-none object-contain"
                    />
                  ) : (
                    <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 flex gap-10">
                      {/* Boys column */}
                      <div className="flex flex-col items-center gap-3">
                        <span className="rotate-90 text-xs tracking-widest text-[#5B2C0E] font-semibold">
                          BOYS
                        </span>
                        <div
                          className="w-16 h-20 rounded-md"
                          style={{ border: `2px solid ${color}` }}
                        />
                        <div
                          className="w-16 h-14 rounded-md"
                          style={{ border: `2px solid ${color}` }}
                        />
                      </div>

                      {/* Girls column */}
                      <div className="flex flex-col items-center gap-3">
                        <span className="rotate-90 text-xs tracking-widest text-[#5B2C0E] font-semibold">
                          GIRLS
                        </span>
                        <div
                          className="w-16 h-20 rounded-md"
                          style={{ border: `2px solid ${color}` }}
                        />
                        <div
                          className="w-16 h-14 rounded-md"
                          style={{ border: `2px solid ${color}` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
