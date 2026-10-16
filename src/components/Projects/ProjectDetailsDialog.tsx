'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { Project } from '@/lib/types'
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, GithubIcon, PreviewIcon } from '@/utils/icons'

interface ProjectDetailsDialogProps {
  project: Project
  images: string[]
  onClose: () => void
}

const ProjectDetailsDialog: React.FC<ProjectDetailsDialogProps> = ({ project, images, onClose }) => {
  const { t } = useLanguage()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const imageCount = images.length

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  const showPreviousImage = () => {
    setActiveImage((current) => (current === 0 ? imageCount - 1 : current - 1))
  }

  const showNextImage = () => {
    setActiveImage((current) => (current === imageCount - 1 ? 0 : current + 1))
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-details-title"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return
        event.preventDefault()
        if (zoomOpen) setZoomOpen(false)
        else dialogRef.current?.close()
      }}
      onCancel={(event) => {
        event.preventDefault()
        if (zoomOpen) {
          setZoomOpen(false)
        } else dialogRef.current?.close()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close()
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-6xl overflow-y-auto rounded-2xl border border-white/10 bg-secondary p-0 text-white shadow-2xl backdrop:bg-black/80"
    >
      <div className="relative">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-secondary/95 px-5 py-4 backdrop-blur md:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {t('projects.detailsHeading')}
            </p>
            <h2 id="project-details-title" className="mt-1 text-lg font-semibold text-white md:text-xl">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={t('projects.closeDetails')}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-primary-content transition hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <div className="grid min-w-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <section className="min-w-0 p-4 md:p-8" aria-label={t('projects.gallery')}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-primary">
              {images[activeImage] ? (
                <>
                  <button
                    type="button"
                    onClick={() => setZoomOpen(true)}
                    aria-label={t('projects.zoomImage')}
                    className="absolute inset-0 z-[1] cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
                  >
                    <Image
                      src={images[activeImage]}
                      alt={`${project.title} — ${activeImage + 1}`}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-contain"
                    />
                  </button>
                  <span className="pointer-events-none absolute right-3 bottom-3 z-[2] rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                    {activeImage + 1} / {imageCount}
                  </span>
                  {imageCount > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPreviousImage}
                        aria-label={t('projects.previousImage')}
                        className="absolute top-1/2 left-3 z-[3] flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        <ArrowLeftIcon className="size-5" />
                      </button>
                      <button
                        type="button"
                        onClick={showNextImage}
                        aria-label={t('projects.nextImage')}
                        className="absolute top-1/2 right-3 z-[3] flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        <ArrowRightIcon className="size-5" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-primary-content">
                  {t('projects.noImages')}
                </div>
              )}
            </div>

            {imageCount > 1 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label={t('projects.gallery')}>
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`${t('projects.image')} ${index + 1}`}
                    aria-current={activeImage === index ? 'true' : undefined}
                    className={`relative h-14 w-20 overflow-hidden rounded-md border-2 transition ${
                      activeImage === index ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={image} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="flex min-w-0 flex-col border-t border-white/10 p-5 md:border-t-0 md:border-l md:p-8">
            {project.type && (
              <span className="mb-5 w-fit rounded-md bg-white/10 px-3 py-1.5 text-sm text-accent">
                {project.type}
              </span>
            )}
            <h3 className="text-base font-semibold text-white">{t('projects.description')}</h3>
            <div
              className="project-description project-description--details mt-3 w-full min-w-0 text-sm leading-7 text-primary-content md:text-base"
              dangerouslySetInnerHTML={{ __html: project.shortDescription }}
            />

            <div className="mt-8 flex flex-wrap gap-3">
              {project.livePreview && (
                <a
                  href={project.livePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-primary transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <PreviewIcon className="size-4" />
                  <span>Live Preview</span>
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <GithubIcon className="size-4" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </section>
        </div>

        {zoomOpen && images[activeImage] && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-14"
            onClick={() => setZoomOpen(false)}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              aria-label={t('projects.closeImage')}
              className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <CloseIcon className="size-5" />
            </button>
            <div className="relative h-full w-full max-w-screen-xl">
              <Image
                src={images[activeImage]}
                alt={`${project.title} — ${activeImage + 1}`}
                fill
                sizes="100vw"
                className="pointer-events-none object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </dialog>
  )
}

export default ProjectDetailsDialog
