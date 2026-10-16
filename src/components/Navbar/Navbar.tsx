'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BurgerIcon, CloseIcon, HomeIcon, ProjectsIcon, ServicesIcon, BlogIcon, ContactIcon, PhoneIcon } from '../../utils/icons'
import Logo from './Logo'
import { useLanguage } from '@/context/LanguageContext'

const navItems = [
  {
    labelKey: 'nav.home' as const,
    href: '/',
    icon: HomeIcon,
  },
  {
    labelKey: 'nav.projects' as const,
    href: '/#projects',
    icon: ProjectsIcon,
  },
  {
    labelKey: 'nav.services' as const,
    href: '/#services',
    icon: BlogIcon,
  },
  {
    labelKey: 'nav.blogs' as const,
    href: '/blogs',
    icon: ServicesIcon,
  },
]

const AdminAccessLink = ({ label, className = '' }: { label: string; className?: string }) => (
  <Link
    href="/admin/login"
    aria-label={label}
    title={label}
    className={`group relative flex size-12 shrink-0 items-center justify-center rounded-lg text-primary-content transition-colors hover:bg-white/5 hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-accent ${className}`}
  >
    <svg
      className="size-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
      <circle cx="12" cy="9" r="2.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 17a4.5 4.5 0 0 1 9 0" />
    </svg>
    <span className="pointer-events-none absolute top-full right-0 z-20 mt-2 whitespace-nowrap rounded-md border border-border bg-secondary px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
      {label}
    </span>
  </Link>
)

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const toggleMenu = () => {
    setIsVisible(!isVisible)
  }
  const adminLabel = t('nav.adminManagement')

  return (
    <nav className="bg-primary border-border relative h-16 border-b">
      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-4 py-1 lg:gap-x-8 lg:pr-20">
        <Link href="/">
          <div className="animate-fade-up text-primary-content relative flex shrink-0 items-center gap-3 transition-all duration-300 md:static lg:mr-4">
            <Logo />
            <span className="text-primary-content">MARLON GUTIÉRREZ</span>
          </div>
        </Link>

        {pathname === '/admin/login' ? (
          <Link
            href="/"
            className="rounded-lg px-2 py-2 text-sm font-medium text-primary-content transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3"
          >
            <span className="hidden sm:inline">Volver al portafolio</span>
            <span className="sm:hidden">Portafolio</span>
          </Link>
        ) : (
          <>
            <div className="flex items-center lg:hidden">
              <AdminAccessLink label={adminLabel} />
              <button type="button" onClick={toggleMenu} aria-label={t('nav.menu')}>
                {isVisible ? <CloseIcon className="text-primary-content" /> : <BurgerIcon className="text-primary-content" />}
              </button>
            </div>

            <ul
              className={`${isVisible ? 'flex' : 'hidden'} animate-fade-in bg-primary absolute top-16 left-0 z-10 h-dvh w-dvw flex-col lg:static lg:top-0 lg:flex lg:h-full lg:min-w-0 lg:flex-1 lg:flex-row lg:justify-end`}>
              {navItems.map(({ labelKey, href, icon: Icon }) => (
                <li
                  key={href}
                  onClick={() => setIsVisible(false)}
                  className="border-border flex items-center border-b px-4 text-2xl lg:min-w-0 lg:flex-1 lg:border-y-0 lg:border-e lg:px-1 lg:text-sm lg:first:border-s xl:px-2">
                  <Link
                    href={href}
                    className={`text-primary-content hover:text-neutral flex w-full items-center gap-2 py-7 transition-all duration-150 lg:justify-center lg:gap-1.5 lg:py-0 ${pathname === href ? 'text-neutral cursor-text' : ''}`}>
                    <Icon className="h-6 w-6 shrink-0" />
                    <span className="lg:break-words lg:text-center lg:leading-tight">{t(labelKey)}</span>
                  </Link>
                </li>
              ))}
              <li className="border-border flex items-center border-b px-4 text-2xl lg:min-w-0 lg:flex-1 lg:border-y-0 lg:border-e lg:px-1 lg:text-sm xl:px-2">
              <Link
                href="/#contact"
                onClick={() => setIsVisible(false)}
                className="text-primary-content hover:text-neutral flex w-full items-center gap-2 py-7 transition-all duration-150 lg:justify-center lg:gap-1.5 lg:py-0">
                <PhoneIcon className="h-6 w-6 shrink-0" />
                <span className="lg:break-words lg:text-center lg:leading-tight">{t('nav.contactMe')}</span>
              </Link>
              </li>
            </ul>
          </>
        )}
      </div>
      {pathname !== '/admin/login' && (
        <AdminAccessLink
          label={adminLabel}
          className="hidden lg:!absolute lg:top-1/2 lg:right-4 lg:flex lg:-translate-y-1/2"
        />
      )}
    </nav>
  )
}

export default Navbar
