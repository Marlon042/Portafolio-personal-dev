'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (err) {
      setError(
        err.code === 'invalid_credentials'
          ? 'El correo o la contraseña son incorrectos.'
          : `No se pudo iniciar sesión: ${err.message}`,
      )
      setLoading(false)
      return
    }

    router.push('/admin')
  }

  return (
    <main className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden bg-primary px-4 py-6 sm:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -bottom-40 size-96 rounded-full bg-accent/5 blur-3xl" />
      <form
        onSubmit={handleSubmit}
        aria-labelledby="login-title"
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-secondary p-5 shadow-2xl shadow-black/20 sm:p-9"
      >
        <div className="mb-6 text-center sm:mb-8">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent sm:mb-5">
            <svg
              className="size-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Administración
          </p>
          <h1 id="login-title" className="text-2xl font-bold text-neutral sm:text-3xl">
            Acceso al panel
          </h1>
          <p className="mt-3 text-sm leading-6 text-tertiary-content">
            Aquí se administran los proyectos / publicaciones del portafolio.
          </p>
        </div>

        {error && (
          <p role="alert" className="mb-5 rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm leading-5 text-red-300">
            {error}
          </p>
        )}

        <div className="mb-4 sm:mb-5">
          <label className="mb-2 block text-sm font-medium text-neutral" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            autoComplete="username"
            required
            aria-invalid={Boolean(error)}
            className="w-full rounded-lg border border-border bg-primary px-4 py-3 text-neutral outline-none transition placeholder:text-tertiary-content/70 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
            placeholder="nombre@ejemplo.com"
          />
        </div>

        <div className="mb-6 sm:mb-7">
          <label className="mb-2 block text-sm font-medium text-neutral" htmlFor="password">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              autoComplete="current-password"
              required
              aria-invalid={Boolean(error)}
              className="w-full rounded-lg border border-border bg-primary px-4 py-3 pr-20 text-neutral outline-none transition placeholder:text-tertiary-content/70 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30"
              placeholder="ingrese la contraseña."
            />
            <button
              type="button"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              aria-pressed={showPassword}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 my-auto rounded px-2 text-xs font-medium text-tertiary-content transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-semibold text-primary transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-60"
        >
          {loading && (
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
            </svg>
          )}
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>

        <p className="mt-5 text-center text-xs text-tertiary-content sm:mt-6">
          Acceso privado para administración
        </p>
      </form>
    </main>
  )
}
