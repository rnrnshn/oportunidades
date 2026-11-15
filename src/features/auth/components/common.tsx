import React from 'react'

export function AuthLogo() {
  return (
    <img
      src="/logo-mobile.png"
      alt="Oportunidades"
      width="48"
      height="48"
      className="mx-auto h-12 w-12"
      loading="lazy"
    />
  )
}

export function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-navy">{label}</label>
      {children}
      {error ? <p id={`${htmlFor}-error`} className="text-sm text-danger">{error}</p> : null}
    </div>
  )
}
