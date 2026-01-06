import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        alt="YMS Logo"
        width={40}
        height={40}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="w-10 h-10 rounded-md object-contain"
        src="/yms-logo.jpg"
      />
      <span className="font-heading text-xl tracking-wide">YMS</span>
    </div>
  )
}
