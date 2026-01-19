import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import {
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  type LucideIcon,
} from 'lucide-react'

// TikTok icon - not available in lucide-react
const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
)

const platformIcons: Record<string, LucideIcon | React.FC<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
  tiktok: TikTokIcon,
}

// Default values
const DEFAULT_MISSION_STATEMENT =
  "Every parent longs for their children's safety, to be surrounded by positive influences, and to have a strong sense of belonging."

const DEFAULT_SOCIAL_LINKS = [
  { id: 'default-instagram', platform: 'instagram' as const, url: 'https://instagram.com/' },
  { id: 'default-facebook', platform: 'facebook' as const, url: 'https://facebook.com/' },
  { id: 'default-youtube', platform: 'youtube' as const, url: 'https://youtube.com/' },
]

const DEFAULT_PROGRAMS_TITLE = 'Programs'
const DEFAULT_PROGRAMS_LINKS = [
  { id: 'default-clinics', label: 'Clinics', href: '/programs?type=Clinic' },
  { id: 'default-camps', label: 'Camps', href: '/programs?type=Camp' },
  { id: 'default-leagues', label: 'Leagues', href: '/programs?type=League' },
  { id: 'default-tournaments', label: 'Tournaments', href: '/programs?type=Tournament' },
]

const DEFAULT_LOCATIONS_TITLE = 'Locations'
const DEFAULT_LOCATIONS = [
  { id: 'default-chicago', name: 'Chicago, IL', href: '/locations' },
  { id: 'default-dallas', name: 'Dallas, TX', href: '/locations' },
  { id: 'default-richmond', name: 'Richmond, VA', href: '/locations' },
]

const DEFAULT_ORGANIZATION_TITLE = 'Organization'

const DEFAULT_CONTACT_TITLE = 'Contact'
const DEFAULT_CONTACT_EMAIL = 'info@ymsports.org'
const DEFAULT_CONTACT_PHONE = '(555) 123-4567'

const DEFAULT_NEWSLETTER_ENABLED = true
const DEFAULT_NEWSLETTER_TITLE = 'Stay Updated'
const DEFAULT_NEWSLETTER_PLACEHOLDER = 'Your email'
const DEFAULT_NEWSLETTER_BUTTON_TEXT = 'Subscribe'
const DEFAULT_NEWSLETTER_FORM_ACTION = '#'

const DEFAULT_COPYRIGHT_TEXT = 'Youth Muslim Sports. All rights reserved.'
const DEFAULT_BOTTOM_BAR_LINKS = [
  { id: 'default-privacy', label: 'Privacy Policy', href: '/privacy' },
  { id: 'default-terms', label: 'Terms of Service', href: '/terms' },
]

export async function Footer() {
  const footerData: Footer | null = await getCachedGlobal('footer', 1)()

  // Extract data with defensive defaults
  const missionStatement = footerData?.missionStatement || DEFAULT_MISSION_STATEMENT

  // Social links - use configured or defaults
  const configuredSocialLinks = Array.isArray(footerData?.socialLinks)
    ? footerData.socialLinks
    : null
  const socialLinks =
    configuredSocialLinks && configuredSocialLinks.length > 0
      ? configuredSocialLinks
      : DEFAULT_SOCIAL_LINKS

  // Programs column
  const configuredProgramsLinks = Array.isArray(footerData?.programsColumn?.links)
    ? footerData.programsColumn.links
    : null
  const programsLinks =
    configuredProgramsLinks && configuredProgramsLinks.length > 0
      ? configuredProgramsLinks
      : DEFAULT_PROGRAMS_LINKS
  const programsTitle = footerData?.programsColumn?.title || DEFAULT_PROGRAMS_TITLE

  // Locations column
  const configuredLocations = Array.isArray(footerData?.locationsColumn?.locations)
    ? footerData.locationsColumn.locations
    : null
  const locationsItems =
    configuredLocations && configuredLocations.length > 0 ? configuredLocations : DEFAULT_LOCATIONS
  const locationsTitle = footerData?.locationsColumn?.title || DEFAULT_LOCATIONS_TITLE

  // Organization column (no defaults for CMS links - they require proper link objects)
  const organizationLinks = Array.isArray(footerData?.organizationColumn?.links)
    ? footerData.organizationColumn.links
    : []
  const organizationTitle = footerData?.organizationColumn?.title || DEFAULT_ORGANIZATION_TITLE
  const hasOrganizationContent = organizationLinks.length > 0

  // Contact column
  const contactTitle = footerData?.contactColumn?.title || DEFAULT_CONTACT_TITLE
  const contactEmail = footerData?.contactColumn?.email || DEFAULT_CONTACT_EMAIL
  const contactPhone = footerData?.contactColumn?.phone || DEFAULT_CONTACT_PHONE

  // Bottom bar
  const copyrightText = footerData?.bottomBar?.copyrightText || DEFAULT_COPYRIGHT_TEXT
  const configuredBottomBarLinks = Array.isArray(footerData?.bottomBar?.links)
    ? footerData.bottomBar.links
    : null
  const bottomBarLinks =
    configuredBottomBarLinks && configuredBottomBarLinks.length > 0
      ? configuredBottomBarLinks
      : DEFAULT_BOTTOM_BAR_LINKS

  return (
    <footer className="border-t border-gray-200 bg-[#052B70]/5 pb-8 pt-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & Mission */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <Logo />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-600">{missionStatement}</p>
            {/* Social Icons */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social, i) => {
                  if (!social?.platform) return null
                  const Icon = platformIcons[social.platform]
                  if (!Icon) return null
                  return (
                    <a
                      key={social.id || `social-${i}`}
                      href={social.url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.platform}
                      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#052B70]/20 bg-white transition-all hover:border-[#3BD463] hover:bg-[#3BD463]"
                    >
                      <Icon className="h-5 w-5 text-[#052B70] transition-colors group-hover:text-white" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Programs */}
          {programsLinks.length > 0 && (
            <div>
              <h4 className="font-heading mb-4 font-bold text-[#052B70]">
                {programsTitle || 'Programs'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {programsLinks.map((item, i) => {
                  if (!item?.label) return null
                  return (
                    <li key={item.id || `program-${i}`}>
                      <Link
                        href={item.href || '#'}
                        className="transition-colors hover:text-[#3BD463]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Locations */}
          {locationsItems.length > 0 && (
            <div>
              <h4 className="font-heading mb-4 font-bold text-[#052B70]">
                {locationsTitle || 'Locations'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {locationsItems.map((location, i) => {
                  if (!location?.name) return null
                  return (
                    <li key={location.id || `location-${i}`}>
                      <Link
                        href={location.href || '/locations'}
                        className="flex items-center gap-1 transition-colors hover:text-[#3BD463]"
                      >
                        <MapPin size={14} className="text-[#3BD463]" />{' '}
                        {location.name || 'Chicago, IL'}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Organization - only show if configured */}
          {hasOrganizationContent && (
            <div>
              <h4 className="font-heading mb-4 font-bold text-[#052B70]">
                {organizationTitle || 'Organization'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {organizationLinks.map((item, i) => {
                  if (!item?.link) return null
                  return (
                    <li key={item.id || `org-${i}`}>
                      <CMSLink {...item.link} className="transition-colors hover:text-[#3BD463]" />
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div>
            <h4 className="font-heading mb-4 font-bold text-[#052B70]">
              {contactTitle || 'Contact'}
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {contactEmail && (
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-[#3BD463]" />
                  <a
                    href={`mailto:${contactEmail}`}
                    className="transition-colors hover:text-[#3BD463]"
                  >
                    {contactEmail}
                  </a>
                </li>
              )}
              {contactPhone && (
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-[#3BD463]" />
                  <span>{contactPhone}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between border-t border-gray-200 pt-8 text-xs text-gray-500 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  )
}
