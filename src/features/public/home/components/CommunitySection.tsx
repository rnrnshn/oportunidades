import { Button } from '@/components/ui/button'
import { GraduationCap } from 'lucide-react'
import { stats } from '../data'

export function CommunitySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="space-y-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-[#1f1f1f]">
            Feita para jovens que querem mais
          </h2>
          <p className="text-base text-muted">
            A Oportunidades liga estudantes e jovens profissionais a programas que
            fazem a diferença.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-brand-dark">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xl font-semibold text-orange">
                  {stat.value}
                </p>
                <p className="text-base font-semibold text-navy">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-soft shadow-none">
          <div className="grid gap-0 md:grid-cols-[1.2fr_1fr] md:items-stretch">
            <img
              src="/community.jpg"
              alt="Comunidade de graduados"
              className="h-96 w-full object-cover object-[100%_20%]"
            />
            <div className="flex h-full flex-col justify-center gap-4 p-6 sm:p-8 bg-white">
              <h3 className="text-2xl font-semibold text-brand">
                Começa hoje a explorar o teu futuro
              </h3>
              <p className="text-base text-muted">
                Cria a tua conta e recebe acesso a todas as oportunidades no teu
                perfil.
              </p>
              <p className="text-base text-muted">
                Descobre oportunidades académicas e profissionais criadas
                especialmente para jovens como tu. Dá o primeiro passo para
                construir um caminho cheio de possibilidades.
              </p>
              <Button className="mt-2 w-fit rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-none transition hover:bg-brand-dark">
                Criar Conta Gratuitamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
