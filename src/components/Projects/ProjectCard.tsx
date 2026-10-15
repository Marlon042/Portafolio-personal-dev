'use client'

import { Project } from '@/lib/types'
import Image from 'next/image'
import { FC, SVGProps, useState, useEffect, useRef } from 'react'
import { Earning, EyeIcon, GithubIcon, Likes, PreviewIcon, Star, Timer } from '../../utils/icons'
import { getSiteConfig } from '@/actions/site-config'
import { useLanguage } from '@/context/LanguageContext'
import ProjectDetailsDialog from './ProjectDetailsDialog'

const IconText: React.FC<{ icon: FC<SVGProps<SVGSVGElement>>; text: string }> = ({ icon: Icon, text }) => (
  <li className="flex gap-2">
    <Icon className="size-[18px] md:size-5" />
    <span className="text-neutral text-sm">{text}</span>
  </li>
)

interface ProjectCardProps {
  data: Project
  index?: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data, index = 0 }) => {
  const { t } = useLanguage()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(0)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [galleryIdx, setGalleryIdx] = useState(0)
  const [slideInterval, setSlideInterval] = useState(4000)
  const ref = useRef<HTMLDivElement>(null)

  const {
    title,
    shortDescription,
    visitors,
    earned,
    ratings,
    githubStars,
    numberOfSales,
    livePreview,
    githubLink,
    siteAge,
    type,
    cover,
    gallery_urls,
  } = data

  const allImages = [cover, ...(gallery_urls ?? [])].filter(Boolean) as string[]
  const hasGallery = allImages.length > 1

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    getSiteConfig().then((config) => {
      if (config.projects_slide_interval) setSlideInterval(config.projects_slide_interval)
    })
  }, [])

  useEffect(() => {
    if (!hasGallery) return
    const interval = setInterval(() => {
      setGalleryIdx((prev) => (prev + 1) % allImages.length)
    }, slideInterval)
    return () => clearInterval(interval)
  }, [hasGallery, allImages.length, slideInterval])

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx)
    setLightboxOpen(true)
  }

  return (
    <>
      <div
        ref={ref}
        className={`bg-secondary border-border flex flex-col justify-between rounded-[14px] border p-5 transition-all duration-700 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
              <h3 className="text-secondary-content text-lg font-medium md:font-semibold">{title}</h3>
              {type && (
                <span
                  className={`h-7 w-fit rounded-md bg-[#FFFFFF1A] p-1 text-sm ${type === 'New 🔥' ? 'animate-blink text-tag' : 'text-accent'} backdrop-blur-[80px]`}>
                  {type}
                </span>
              )}
            </div>
            <ul className="mt-3 flex flex-col flex-wrap gap-2 sm:flex-row sm:gap-4">
              {(visitors || numberOfSales) && (
                <IconText text={(visitors || numberOfSales)?.toString() || ''} icon={Likes} />
              )}
              {siteAge && <IconText text={siteAge} icon={Timer} />}
              {earned && <IconText text={earned} icon={Earning} />}
              {(ratings || githubStars) && (
                <IconText text={(ratings || githubStars)?.toString() || ''} icon={Star} />
              )}
            </ul>
          </div>
          {cover && (
            <button
              type="button"
              aria-label={`${hasGallery ? t('projects.viewGallery') : t('projects.viewImage')}: ${title}`}
              className="group relative flex cursor-pointer justify-end overflow-hidden rounded-md border-0 bg-transparent p-0"
              onClick={() => openLightbox(galleryIdx)}
            >
              <Image
                src={allImages[galleryIdx] || cover}
                width={150}
                height={80}
                alt={`${title} — ${t('projects.image')} 1`}
                className="h-[80px] w-[150px] rounded-md object-cover shadow-[0px_1.66px_3.74px_-1.25px_#18274B1F]"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-md bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <EyeIcon className="size-4 text-white" />
                <span className="text-xs font-medium text-white">
                  {hasGallery ? t('projects.viewGallery') : t('projects.viewImage')}
                </span>
              </div>
            </button>
          )}
        </div>

        <div>
          <div className="bg-primary text-primary-content relative my-4 overflow-hidden rounded-2xl">
            <div className="px-4 py-2">
              <p className="line-clamp-3 text-[14px] font-normal md:text-base">{shortDescription}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {livePreview && (
                <a
                  href={livePreview}
                  className="text-accent flex gap-2 text-sm underline underline-offset-[3px] transition-all duration-75 ease-linear hover:scale-105 md:text-base"
                  target="_blank"
                  rel="noopener noreferrer">
                  <PreviewIcon className="h-auto w-[18px] md:w-5" />
                  <span>Live Preview</span>
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink}
                  className="text-accent flex gap-2 text-sm underline underline-offset-[3px] transition-all duration-75 ease-linear hover:scale-105 md:text-base"
                  target="_blank"
                  rel="noopener noreferrer">
                  <GithubIcon className="w-[18px] md:w-5" />
                  <span>Github Link</span>
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={() => setDetailsOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-accent/30 px-3 py-2 text-sm font-medium text-accent transition hover:border-accent/70 hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={`${t('projects.details')}: ${title}`}
            >
              <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
              </svg>
              <span>{t('projects.details')}</span>
            </button>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 text-2xl text-white hover:text-gray-300"
          >
            ✕
          </button>
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1)) }}
                className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
              >
                <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1)) }}
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
              >
                <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
          <Image
            src={allImages[lightboxIdx]}
            width={1200}
            height={800}
            alt={title}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {detailsOpen && (
        <ProjectDetailsDialog
          project={data}
          images={allImages}
          onClose={() => setDetailsOpen(false)}
        />
      )}
    </>
  )
}

export default ProjectCard
