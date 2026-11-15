import { Link } from '@tanstack/react-router'
import type React from 'react'

export function AuthPageLayout({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode
  title: string
  description: string
  children?: React.ReactNode
}) {
  return (
    <main className="bg-canvas-soft text-navy">
      <div className="mx-auto flex min-h-[70vh] max-w-lg items-center px-4 py-16">
        <section className="w-full rounded-2xl border border-sand-strong bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-canvas-soft">
            {icon}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-3 text-soft">{description}</p>
          {children ? <div className="mt-7">{children}</div> : null}
          <Link to="/" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-brand hover:underline transition-colors duration-150 ease-out">
            Voltar ao início
          </Link>
        </section>
      </div>
    </main>
  )
}
