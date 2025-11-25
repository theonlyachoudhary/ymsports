import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://instagram.com/', // update to YMS insta
      Icon: Instagram,
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com/', // update
      Icon: Facebook,
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/', // update
      Icon: Youtube,
    },
    {
      label: 'Email',
      href: 'mailto:info@youthmuslimsports.com', // update
      Icon: Mail,
    },
  ]

  return (
    <footer className="mt-auto relative overflow-hidden bg-[#050506] text-white">
      {/* PARALLAX / GLOW BACKGROUND SHAPES */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-amber-400/40 via-amber-200/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-gradient-to-tl from-amber-500/35 via-amber-200/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

      {/* LIGHT STREAKS */}
      <div className="pointer-events-none absolute -top-10 left-1/3 h-0.5 w-64 -rotate-6 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent opacity-60" />
      <div className="pointer-events-none absolute top-10 right-10 h-0.5 w-52 rotate-6 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent opacity-60" />

      {/* MAIN CONTENT */}
      <div className="container relative z-10 py-16 lg:py-20 flex flex-col gap-12 lg:flex-row lg:justify-between lg:items-start">

        {/* LEFT: LOGO + MISSION + SOCIALS */}
        <div className="space-y-6 max-w-sm">
          {/* 3D-ish logo hover */}
          <Link
            href="/"
            className="inline-flex transform-gpu transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.03] hover:drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
          >
            <Logo />
          </Link>

          <div className="space-y-1">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-amber-300">
              Youth Muslim Sports
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Faith • Fitness • Community. Building the next generation of Muslim
              athletes with excellence on and off the field.
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex flex-wrap gap-3 pt-2">
            {socialLinks.map(({ label, href, Icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/30 bg-white/5 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-amber-300 hover:bg-amber-300/15"
              >
                <Icon className="h-5 w-5 text-amber-200 transition group-hover:text-amber-300" />
                <span className="pointer-events-none absolute -bottom-6 text-[11px] text-white/60 opacity-0 transition group-hover:opacity-100">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT: GLASS CARD – NEWSLETTER + NAV + THEME */}
        <div className="w-full max-w-xl lg:max-w-lg">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-7 py-7 md:px-9 md:py-9 backdrop-blur-2xl shadow-[0_28px_80px_rgba(0,0,0,0.65)]">
            {/* CALLOUT / NEWSLETTER */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-300">
                Stay in the loop
              </p>
              <h3 className="text-xl md:text-2xl font-semibold">
                Camps, leagues & faith-first training in your inbox.
              </h3>
              <p className="text-sm text-white/70">
                Be the first to hear about new programs, tournament slots, and
                community updates for Youth Muslim Sports.
              </p>

              {/* Simple newsletter form – wire up to your backend later */}
              <form
                action="#"
                method="post"
                className="mt-4 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-1 rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300/70"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(245,196,79,0.65)] transition hover:bg-amber-300 hover:-translate-y-0.5"
                >
                  Join newsletter
                </button>
              </form>
            </div>

            {/* NAV + THEME */}
            <div className="pt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* NAVIGATION – from CMS */}
              <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm md:justify-end">
                {navItems.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    className="text-white/75 hover:text-amber-300 transition-colors border-b border-transparent hover:border-amber-300 pb-0.5"
                  />
                ))}
              </nav>

              {/* THEME SELECTOR */}
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="hidden md:inline">Theme</span>
                <div className="opacity-80 hover:opacity-100 transition">
                  <ThemeSelector />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 bg-black/60">
        <div className="container py-5 flex flex-col gap-2 text-[11px] text-white/55 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} Youth Muslim Sports. All rights
            reserved.
          </span>
          <span className="md:text-right">
            Designed for elevated Muslim youth — blending faith, discipline, and
            elite sport.
          </span>
        </div>
      </div>
    </footer>
  )
}
