'use client'

import { motion } from 'framer-motion'

export function Hamburger({ open }: { open: boolean }) {
  return (
    <motion.div
      className="relative flex flex-col justify-center items-center w-7 h-7"
      initial={false}
      animate={open ? "open" : "closed"}
    >
      {/* Top line */}
      <motion.span
        className="absolute h-[2px] w-7 bg-foreground rounded-full"
        variants={{
          closed: { rotate: 0, y: -6 },
          open: { rotate: 45, y: 0 },
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />

      {/* Middle line */}
      <motion.span
        className="absolute h-[2px] w-7 bg-foreground rounded-full"
        variants={{
          closed: { opacity: 1, y: 0 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Bottom line */}
      <motion.span
        className="absolute h-[2px] w-7 bg-foreground rounded-full"
        variants={{
          closed: { rotate: 0, y: 6 },
          open: { rotate: -45, y: 0 },
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
    </motion.div>
  )
}
