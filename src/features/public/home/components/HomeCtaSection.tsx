import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { AlertDialog } from '@/features/public/AlertDialog'

export function HomeCtaSection() {
  const [alertOpen, setAlertOpen] = useState(false)

  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="home-cta-title">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 xl:px-0">
        <div className="grid w-full items-center gap-6 overflow-hidden rounded-2xl bg-[#f5f9ff] px-6 py-7 sm:grid-cols-[160px_minmax(0,1fr)] sm:px-8 md:gap-8 lg:grid-cols-[180px_minmax(0,1fr)_auto] lg:px-10">
          <img
            src="/home-v2/opportunity-alert-3d.png"
            alt=""
            width="512"
            height="468"
            loading="lazy"
            className="mx-auto w-36 select-none sm:w-40 lg:w-44"
          />

          <div className="max-w-xl text-center sm:text-left">
            <h2 id="home-cta-title" className="text-2xl  font-semibold leading-snug text-navy">
              Não percas a próxima oportunidade
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#4f5c7c]">
              Cria um alerta e recebe novidades relacionadas com os teus interesses.
            </p>
          </div>

          <Button type="button" className="mx-auto min-h-12 bg-brand px-6 text-sm font-semibold text-white shadow-none hover:bg-brand-dark sm:col-start-2 sm:mx-0 sm:justify-self-start lg:col-start-auto lg:justify-self-end" onClick={() => setAlertOpen(true)}>
            Criar alerta
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen} />
    </section>
  )
}
