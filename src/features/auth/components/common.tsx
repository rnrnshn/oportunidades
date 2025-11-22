import React from 'react'

export function AuthLogo() {
  return (
    <img
      src="/logo-small.svg"
      alt="Oportunidades"
      className="mx-auto h-12 w-12"
      loading="lazy"
    />
  )
}

export function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="relative flex flex-col gap-1 pt-4 text-sm font-semibold text-navy">
      <span className="absolute -top-1 left-4 rounded-full border border-white bg-brand-tint px-3 py-0.5 text-xs font-semibold text-brand shadow">
        {label}
      </span>
      {children}
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </label>
  )
}

export function Divider({ label }: { label: string }) {
  return (
    <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-muted">
      <span className="h-px flex-1 bg-soft" />
      {label}
      <span className="h-px flex-1 bg-soft" />
    </div>
  )
}

export function GoogleButton({ label }: { label: string }) {
  return (
    <button className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-brand bg-white py-3 text-sm font-semibold text-brand transition hover:border-brand-dark">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.72 1.22 9.21 3.6l6.85-6.85C35.63 1.61 30.28 0 24 0 14.56 0 6.27 5.38 2.47 13.19l7.99 6.21C12.5 13.09 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.1 24.5c0-1.57-.14-3.08-.39-4.5H24v9.01h12.4c-.54 2.92-2.18 5.39-4.65 7.05l7.41 5.74C43.22 37.32 46.1 31.42 46.1 24.5z"
          />
          <path
            fill="#FBBC05"
            d="M10.46 28.4c-.47-1.4-.74-2.9-.74-4.4s.27-3 .74-4.4L2.47 13.19A23.92 23.92 0 0 0 0 24c0 3.82.89 7.43 2.47 10.81l7.99-6.41z"
          />
          <path
            fill="#34A853"
            d="M24 47.5c6.28 0 11.54-2.08 15.39-5.66l-7.41-5.74c-2.06 1.39-4.7 2.2-7.98 2.2-6.26 0-11.5-4.19-13.38-10.03l-7.99 6.21C6.27 42.62 14.56 47.5 24 47.5z"
          />
        </svg>
      </span>
      {label}
    </button>
  )
}
