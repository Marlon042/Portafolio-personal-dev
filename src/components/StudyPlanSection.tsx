'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function StudyPlanSection() {
  const { t } = useLanguage()

  return (
    <section className="my-10 rounded-2xl border border-[#607b96]/25 bg-secondary/70 p-5 md:my-14 md:flex md:items-center md:justify-between md:gap-8 md:p-7">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.75h7l5 5v11.5a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-13a2.5 2.5 0 0 1 2-2.5Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 3.75v5h5M8.5 13h7M8.5 16.5h7" />
          </svg>
        </span>
        <div>
          <h2 className="text-base font-semibold text-white md:text-lg">{t('studyPlan.title')}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-primary-content">
            {t('studyPlan.description')}
          </p>
        </div>
      </div>
      <a
        href="/Brochure-IngenieriaSistemas.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-accent/40 px-4 py-2.5 text-sm font-medium text-accent transition hover:border-accent hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:mt-0 md:w-auto md:shrink-0"
      >
        <span>{t('studyPlan.link')}</span>
        <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5m-9 4 9-9M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
        </svg>
      </a>
    </section>
  )
}
