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
          <p className="text-base text-[#5a5e66]">
            A Oportunidades liga estudantes e jovens profissionais a programas que
            fazem a diferença.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8edff] text-[#2d3f85]">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xl font-semibold text-[#f58220]">
                  {stat.value}
                </p>
                <p className="text-base font-semibold text-[#1f1f1f]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e3e6eb] shadow-none">
          <div className="grid gap-0 md:grid-cols-[1.2fr_1fr] md:items-stretch">
            <img
              src="/community.jpg"
              alt="Comunidade de graduados"
              className="h-96 w-full object-cover object-[100%_20%]"
            />
            <div className="flex h-full flex-col justify-center gap-4 p-6 sm:p-8 bg-white">
              <h3 className="text-2xl font-semibold text-[#0049AF]">
                Começa hoje a explorar o teu futuro
              </h3>
              <p className="text-base text-[#5a5e66]">
                Cria a tua conta e recebe acesso a todas as oportunidades no teu
                perfil.
              </p>
              <p className="text-base text-[#5a5e66]">
                Descobre oportunidades académicas e profissionais criadas
                especialmente para jovens como tu. Dá o primeiro passo para
                construir um caminho cheio de possibilidades.
              </p>
              <Button className="mt-2 w-fit rounded-lg bg-[#0049AF] px-5 py-3 text-sm font-semibold text-white shadow-none transition hover:bg-[#0a56c4]">
                Criar Conta Gratuitamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
