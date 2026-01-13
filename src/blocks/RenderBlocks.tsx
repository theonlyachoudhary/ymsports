import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

// Import block components here after you create them !!!
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

// Our custom blocks
import { ProgramsBlock } from '@/blocks/Programs/Component'
import { ValuesBlock } from '@/blocks/Values/Component'
import { CoachesBlock } from '@/blocks/Coaches/Component'
import { TestimonialsBlock } from './Testimonials/Component'
import { DualFeatureBanner } from '@/blocks/DualFeatureBanner/Component'
import { TournamentsBlock } from '@/blocks/Tournaments/Component'
import { ImageTextBlock } from '@/blocks/ImageTextBlock/Component'
import { TextImageCardBlock } from '@/blocks/TextImageCardBlock/Component'
import { PageHeaderBlock } from '@/blocks/PageHeaderBlock/Component'
import { AgeGroupBlock } from '@/blocks/AgeGroupBlock/Component'
import { CustomFormBlock } from '@/blocks/CustomFormBlock/Component'
import { HighlightsBlock } from '@/blocks/HighlightsBlock/Component'
import { SocialsBlock } from '@/blocks/SocialsBlock/Component'
import { FAQBlock } from '@/blocks/FAQBlock/Component'
import { InfoBlock } from '@/blocks/InfoBlock/Component'
import { PartnersBlock } from '@/blocks/Partners/Component'
import { WhySectionBlock } from '@/blocks/WhySection/Component'
import { FeaturedProgramsBlock } from '@/blocks/FeaturedPrograms/Component'
import { SponsorshipBlock } from '@/blocks/Sponsorship/Component'
import { LocationsBlockComponent } from '@/blocks/LocationsBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  programs: ProgramsBlock,
  values: ValuesBlock,
  coaches: CoachesBlock,
  testimonials: TestimonialsBlock,
  tournaments: TournamentsBlock,
  dualFeatureBanner: DualFeatureBanner,
  imageTextBlock: ImageTextBlock,
  textImageCardBlock: TextImageCardBlock,
  pageHeaderBlock: PageHeaderBlock,
  ageGroupBlock: AgeGroupBlock,
  customFormBlock: CustomFormBlock,
  highlightsBlock: HighlightsBlock,
  socialsBlock: SocialsBlock,
  faqBlock: FAQBlock,
  infoBlock: InfoBlock,
  partners: PartnersBlock,
  whySection: WhySectionBlock,
  featuredPrograms: FeaturedProgramsBlock,
  sponsorship: SponsorshipBlock,
  locationsBlock: LocationsBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-12" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
