import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  Link,
} from '@tanstack/react-router'
import Header from '../components/Header'
import { Button } from '@/components/ui/button'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Oportunidades',
      },
      {
        name: 'description',
        content: 'Plataforma moçambicana para descobrir bolsas, estágios e oportunidades académicas.',
      },
      {
        name: 'theme-color',
        content: '#0049AF',
      },
    ],
    links: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: '/android-chrome-512x512.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-MZ">
      <head>
        <HeadContent />
      </head>
      <body>
        <BodyLayout>{children}</BodyLayout>
        <Scripts />
      </body>
    </html>
  )
}

function BodyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-brand px-4 py-3 font-semibold text-white focus:translate-y-0">Saltar para o conteúdo principal</a>
      <Header />
      <div id="main-content" tabIndex={-1}>{children}</div>
    </>
  )
}

function NotFoundPage() {
  return (
    <main className="bg-canvas-soft text-navy">
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-strong">
          Página não encontrada
        </span>
        <h1 className="text-2xl font-bold tracking-tight">
          Não encontrámos essa página
        </h1>
        <p className="max-w-2xl text-base text-soft">
          O endereço que procuras pode ter sido removido ou está temporariamente
          indisponível. Verifica o URL ou regressa à página inicial.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            className="rounded-md border-sand-strong text-navy"
            onClick={() => window.history.back()}
          >
            Voltar
          </Button>
          <Button asChild className="rounded-md bg-brand px-6 py-2 font-semibold text-white hover:bg-brand-dark"><Link to="/">Ir para o início</Link></Button>
        </div>
      </div>
    </main>
  )
}
