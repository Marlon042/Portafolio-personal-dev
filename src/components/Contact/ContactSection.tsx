'use client'

import { MsgIcon } from '@/utils/icons'
import { useLanguage } from '@/context/LanguageContext'
import ContactForm from './ContactForm'

const ContactSection = () => {
  const { t } = useLanguage()

  return (
    <section
      id="contact"
      className="bg-secondary my-8 grid grid-cols-1 gap-16 rounded-4xl p-8 md:my-16 md:grid-cols-2 md:gap-8 lg:gap-12">
      <div className="flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-neutral text-3xl font-bold">{t('contact.letsTalk')}</h3>
            <h4 className="text-accent text-2xl font-bold md:text-3xl">{t('contact.help')}</h4>
            <p className="text-neutral mt-8">
              {t('contact.subtitle')}
            </p>
          </div>

          <button
            onClick={downloadCV}
            aria-label="Download CV"
            className="bg-accent max-w-max cursor-pointer rounded-lg px-[14px] py-[10px] text-center text-sm font-medium text-[#00071E]">
            {t('contact.downloadCV')}
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-neutral text-lg font-bold">{t('contact.information')}</p>
          <a
            href="mailto:marckgv@gmail.com"
            className="text-neutral hover:text-accent flex items-center gap-1 font-light transition-colors duration-300">
            <MsgIcon /> marckgv@gmail.com
          </a>
          <a
            href={`https://wa.me/50686748396?text=${encodeURIComponent(t('contact.whatsappMessage'))}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('contact.whatsappLink')}
            className="text-neutral hover:text-accent flex items-center gap-1 font-light transition-colors duration-300">
            <svg
              className="size-5 text-[#25D366]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.52 3.48A11.82 11.82 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.59 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.77 1.47h.01c6.58 0 11.94-5.35 11.95-11.93a11.86 11.86 0 0 0-3.48-8.42ZM12.05 21.8h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.72.97.99-3.63-.24-.37a9.87 9.87 0 0 1-1.52-5.25c0-5.47 4.46-9.92 9.94-9.92a9.85 9.85 0 0 1 7.03 2.91 9.86 9.86 0 0 1 2.9 7.04c0 5.47-4.46 9.92-9.98 9.92Zm5.46-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.49-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.27.5 1.71.64.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
            </svg>
            <span>+506 8674-8396</span>
          </a>
        </div>
      </div>

      <ContactForm />
    </section>
  )

  function downloadCV() {
    const link = document.createElement('a');
    link.href = '/CV_Marlon_Gutiérrez_V_English.pdf';
    link.download = 'CV_Marlon_Gutiérrez_V_English.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default ContactSection
