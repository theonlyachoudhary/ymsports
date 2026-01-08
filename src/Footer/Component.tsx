import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://instagram.com/',
      Icon: Instagram,
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com/',
      Icon: Facebook,
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/',
      Icon: Youtube,
    },
  ]

  return (
    <footer className="bg-[#052B70]/5 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Mission */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <Logo />
            </Link>
            <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
              Every parent longs for their children&apos;s safety, to be surrounded by positive influences, and to have a strong sense of belonging.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ label, href, Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#052B70]/20 bg-white hover:bg-[#3BD463] hover:border-[#3BD463] transition-all group"
                >
                  <Icon className="h-5 w-5 text-[#052B70] group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Programs */}
          <div>
            <h4 className="font-heading font-bold text-[#052B70] mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/programs?type=Clinic" className="hover:text-[#3BD463] transition-colors">
                  Clinics
                </Link>
              </li>
              <li>
                <Link href="/programs?type=Camp" className="hover:text-[#3BD463] transition-colors">
                  Camps
                </Link>
              </li>
              <li>
                <Link href="/programs?type=League" className="hover:text-[#3BD463] transition-colors">
                  Leagues
                </Link>
              </li>
              <li>
                <Link href="/programs?type=Tournament" className="hover:text-[#3BD463] transition-colors">
                  Tournaments
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-heading font-bold text-[#052B70] mb-4">Locations</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/locations" className="hover:text-[#3BD463] transition-colors flex items-center gap-1">
                  <MapPin size={14} className="text-[#3BD463]" /> Chicago, IL
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-[#3BD463] transition-colors flex items-center gap-1">
                  <MapPin size={14} className="text-[#3BD463]" /> Dallas, TX
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-[#3BD463] transition-colors flex items-center gap-1">
                  <MapPin size={14} className="text-[#3BD463]" /> Richmond, VA
                </Link>
              </li>
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h4 className="font-heading font-bold text-[#052B70] mb-4">Organization</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-[#3BD463] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="hover:text-[#3BD463] transition-colors">
                  Sponsorship
                </Link>
              </li>
              {navItems.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink
                    {...link}
                    className="hover:text-[#3BD463] transition-colors"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-[#052B70] mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#3BD463]" />
                <a href="mailto:info@ymsports.org" className="hover:text-[#3BD463] transition-colors">
                  info@ymsports.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#3BD463]" />
                <span>(555) 123-4567</span>
              </li>
            </ul>

            {/* Newsletter Mini Form */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <p className="text-xs font-semibold text-[#052B70] uppercase tracking-wide mb-2">
                Stay Updated
              </p>
              <form action="#" method="post" className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#3BD463] focus:ring-1 focus:ring-[#3BD463]"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#3BD463] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2EB854] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Youth Muslim Sports. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#3BD463] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#3BD463] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
