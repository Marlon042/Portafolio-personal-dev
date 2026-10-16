'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'
import { iconMap } from '@/utils/iconMap'
import { useLanguage } from '@/context/LanguageContext'
import { getSiteConfig } from '@/actions/site-config'
import { getIcons } from '@/actions/icons'
import SectionHeading from '../SectionHeading/SectionHeading'

const MarqueeWrapper = dynamic(() => import('../Marquee/MarqueeWrapper'), { ssr: false })

type SkillData = { name: string; icon_id: string }

const customSvgCache = new Map<string, string>()

const IconRenderer = ({ iconId, size = 'sm' }: { iconId: string; size?: 'sm' | 'lg' }) => {
  const BundledIcon = iconMap[iconId]
  const cls = size === 'lg' ? 'mx-2 size-11 lg:size-14' : 'size-8 shrink-0 lg:size-10'
  if (BundledIcon) {
    return <BundledIcon className={cls} />
  }
  const svgContent = customSvgCache.get(iconId)
  if (svgContent) {
    return <span className={`inline-flex items-center justify-center text-current ${cls}`} dangerouslySetInnerHTML={{ __html: svgContent }} />
  }
  return null
}

const Skills: React.FC = () => {
  const { t } = useLanguage()
  const [skills, setSkills] = useState<SkillData[]>([])
  const [adminMode, setAdminMode] = useState<'marquee' | 'grid'>('marquee')
  const [visitorMode, setVisitorMode] = useState<'marquee' | 'grid' | null>(null)
  const [marqueeDuration, setMarqueeDuration] = useState(20000)
  const initLoaded = useRef(false)
  const mode = visitorMode ?? adminMode

  useEffect(() => {
    if (initLoaded.current) return
    initLoaded.current = true

    Promise.all([
      supabase.from('skills').select('name, icon_id').order('display_order'),
      getSiteConfig(),
      getIcons(),
    ]).then(([{ data }, config, icons]) => {
      if (data) setSkills(data as SkillData[])
      if (config.marquee_duration) setMarqueeDuration(config.marquee_duration)
      if (config.skills_display_mode) setAdminMode(config.skills_display_mode)
      icons.forEach((icon) => {
        if (!icon.is_bundled && icon.svg_content) {
          customSvgCache.set(icon.id, icon.svg_content)
        }
      })
    })
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('skills-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'skills' }, async () => {
        const { data } = await supabase.from('skills').select('name, icon_id').order('display_order')
        if (data) setSkills(data as SkillData[])
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_config' }, async () => {
        const config = await getSiteConfig()
        if (config.marquee_duration) setMarqueeDuration(config.marquee_duration)
        if (config.skills_display_mode) setAdminMode(config.skills_display_mode)
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const toggleMode = () => {
    setVisitorMode(mode === 'marquee' ? 'grid' : 'marquee')
  }

  return (
    <section id="skills">
      <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
        <div className="flex items-center justify-between gap-4">
          <SectionHeading title={t('skills.title')} />
          <button
            type="button"
            role="switch"
            aria-checked={mode === 'grid'}
            aria-label={t('skills.toggleView')}
            onClick={toggleMode}
            className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border bg-secondary p-0.5 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span
              aria-hidden="true"
              className={`flex size-5 items-center justify-center rounded-full bg-accent text-primary shadow-sm transition-transform ${
                mode === 'grid' ? 'translate-x-5' : 'translate-x-0'
              }`}
            >
              {mode === 'grid' ? (
                <svg className="size-3" viewBox="0 0 12 12" fill="currentColor">
                  <rect x="1" y="1" width="4" height="4" rx="1" />
                  <rect x="7" y="1" width="4" height="4" rx="1" />
                  <rect x="1" y="7" width="4" height="4" rx="1" />
                  <rect x="7" y="7" width="4" height="4" rx="1" />
                </svg>
              ) : (
                <svg className="size-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 4h8M2 8h8M4 2 2 4l2 2m4 0 2 2-2 2" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>
      {mode === 'marquee' ? (
        <MarqueeWrapper duration={marqueeDuration} className="from-primary to-primary via-marquee bg-linear-to-r">
          <div className="flex gap-8 lg:gap-24">
            {skills.map(({ name, icon_id }, index) => (
              <span key={index} className="font-inter text-primary-content flex items-center text-xs lg:text-base">
                <IconRenderer iconId={icon_id} size="lg" />
                {name}
              </span>
            ))}
          </div>
        </MarqueeWrapper>
      ) : (
        <div className="from-primary to-primary via-marquee bg-linear-to-r">
          <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-4 px-4 py-6 lg:gap-6 lg:py-8">
            {skills.map(({ name, icon_id }, index) => (
              <div key={index} className="flex items-center gap-2 rounded-lg border border-[#607b96]/20 bg-[#0d1a3b]/50 px-3 py-2 lg:px-4 lg:py-3">
                <IconRenderer iconId={icon_id} />
                <span className="text-primary-content text-xs font-medium lg:text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default Skills
