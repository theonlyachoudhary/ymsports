import React from 'react'

import type { Page } from '@/payload-types'

import { CTAButton } from '@/components/CTAButton'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

const getLinkHref = (link: NonNullable<NonNullable<Page['hero']>['links']>[number]['link']) => {
  if (link.type === 'reference' && link.reference?.value && typeof link.reference.value === 'object') {
    const prefix = link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}` : ''
    return `${prefix}/${link.reference.value.slug}`
  }
  return link.url || '#'
}

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="">
      <div className="container mb-4">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CTAButton
                    href={getLinkHref(link)}
                    newTab={link.newTab || false}
                    variant={link.appearance === 'link' ? 'link' : i === 0 ? 'default' : 'outline'}
                    size="lg"
                  >
                    {link.label}
                  </CTAButton>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container ">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
