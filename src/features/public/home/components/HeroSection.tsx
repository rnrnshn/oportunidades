import { Check, ChevronDown, Search } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const opportunityTypes = [
  { label: 'Todas', value: '', action: '/oportunidades' },
  { label: 'Bolsas', value: 'bolsa', action: '/bolsas' },
  { label: 'Estágios', value: 'estagio', action: '/estagios' },
  { label: 'Empregos', value: 'emprego', action: '/empregos' },
] as const

export function HeroSection() {
  const [typeOpen, setTypeOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<(typeof opportunityTypes)[number]>(opportunityTypes[0])
  const firstOptionRef = useRef<HTMLButtonElement>(null)

  return (
    <section className="relative overflow-hidden bg-[#fff2d3] pt-24 md:pt-28" aria-labelledby="home-title">
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[360px] w-[320px] bg-[url('/home-v2/asset-03.png')] bg-contain bg-left-bottom bg-no-repeat opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-[530px] w-[451px] bg-[url('/home-v2/asset-06.png')] bg-contain bg-right-top bg-no-repeat opacity-30"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[462px] w-full max-w-6xl gap-10 px-5 pb-14 pt-8 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-20 md:pb-12 md:pt-10 xl:px-0">
        <div className="max-w-xl">
          <h1 id="home-title" className="text-4xl md:text-6xl  font-bold leading-tight tracking-tight text-[#262626]">
            Encontra aqui a tua próxima oportunidade
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-[#525252]">
            Bolsas de estudo, universidades, estágios e empregos, tudo num só espaço pensado para estudantes e jovens profissionais.
          </p>

          <p className="mt-7 text-sm font-semibold text-[#262626]">O que procuras?</p>
          <form action={selectedType.action} method="get" role="search" className="mt-2 flex min-h-[var(--field-height)] max-w-xl flex-wrap rounded-[var(--field-radius)] border border-[var(--field-border)] bg-white focus-within:border-[var(--field-focus)] focus-within:ring-2 focus-within:ring-[var(--field-focus)] focus-within:ring-offset-1 sm:flex-nowrap">
            <Popover open={typeOpen} onOpenChange={setTypeOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex h-[var(--field-height)] w-full shrink-0 items-center justify-between rounded-t-[var(--field-radius)] border-b border-[var(--field-border)] bg-[var(--field-disabled)] px-[var(--field-padding-x)] text-sm text-[#525252] outline-none transition hover:bg-[#e9edf2] sm:w-[116px] sm:rounded-l-[var(--field-radius)] sm:rounded-r-none sm:border-b-0 sm:border-r"
                  aria-expanded={typeOpen}
                  aria-label={`Tipo de oportunidade: ${selectedType.label}`}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault()
                      setTypeOpen(true)
                      window.requestAnimationFrame(() => firstOptionRef.current?.focus())
                    }
                  }}
                >
                  {selectedType.label}
                  <ChevronDown className={`size-4 transition-transform ${typeOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" sideOffset={8} className="w-[200px] rounded-[var(--field-radius)] border border-[var(--field-border)] bg-white p-1 shadow-lg">
                <fieldset>
                  <legend className="sr-only">Tipo de oportunidade</legend>
                  {opportunityTypes.map((option, index) => (
                    <button
                      key={option.value || 'all'}
                      ref={index === 0 ? firstOptionRef : undefined}
                      type="button"
                      aria-pressed={selectedType.value === option.value}
                      className="flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-left text-sm text-[#262626] outline-none hover:bg-[#f5f5f5] focus-visible:bg-[#d6e7ff] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0049af]"
                      onClick={() => {
                        setSelectedType(option)
                        setTypeOpen(false)
                      }}
                    >
                      {option.label}
                      {selectedType.value === option.value && <Check className="size-4 text-[#0049af]" aria-hidden="true" />}
                    </button>
                  ))}
                </fieldset>
              </PopoverContent>
            </Popover>
            <label htmlFor="home-search" className="sr-only">Pesquisar oportunidades</label>
            <Input id="home-search" name="q" type="search" placeholder="Ex.: bolsa de engenharia em Maputo" className="min-w-0 flex-1 basis-full rounded-none border-0 bg-white text-sm shadow-none focus-visible:ring-0 sm:basis-auto" />
            <Button type="submit" className="h-[var(--field-height)] w-full shrink-0 rounded-b-[var(--field-radius)] rounded-t-none bg-[#0049af] px-4 text-white hover:bg-[#00398b] focus-visible:ring-0 sm:w-auto sm:rounded-l-none sm:rounded-r-[var(--field-radius)]">
              <Search className="size-5" aria-hidden="true" />
              <span>Pesquisar</span>
            </Button>
          </form>
          <p className="mt-2 text-sm text-[#525252]">Escolhe um tipo ou pesquisa pelo nome, área ou localização.</p>
        </div>

        <div className="relative w-full max-w-[524px] justify-self-center">
          <img src="/home-v2/asset-05.png" alt="Dois jovens recém-graduados" width={524} height={350} className="h-auto w-full rounded-2xl object-cover" />
        </div>
      </div>
    </section>
  )
}
