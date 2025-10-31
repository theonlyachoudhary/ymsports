import type { Program as ProgramProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { SectionHeader } from '@/components/SectionHeader'

type Props = {
  className?: string
} & ProgramProps

export const ProgramsBlock: React.FC<Props> = ({ className, title, description }) => {
  return (
    <section className={cn('mx-auto my-8 w-full', className)}>
      <SectionHeader
        heading={title ?? ''}
        subheading={description ?? ''}
        align="center"
        spacing="sm"
        containerClassName="w-full ml-0"
      />
    </section>
  )
}
