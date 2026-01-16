import { steps } from '../data'

export function StepsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16">
      <div
        className="pointer-events-none absolute inset-y-6 left-0 w-64 -translate-x-10 bg-[url('/header-pattern-bg.svg')] bg-contain bg-left-top bg-no-repeat opacity-20"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-semibold text-navy">
            Entra, descobre e cresce
          </h2>
          <p className="mt-3 text-lg text-[#6a6e74]">
            Três passos simples para começares a usar a plataforma e transformares
            oportunidades em conquistas.
          </p>
        </div>

        <div className="relative grid gap-6 md:gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="relative overflow-hidden bg-white"
            >
              <div className="relative mb-9 flex items-center">
                <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-[4px] border-[#8f8f8f] bg-white" />
                <span
                  className="pointer-events-none ml-4 hidden h-px flex-1 border-t border-dashed border-[#9f9f9f] md:block"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none ml-4 flex h-px flex-1 border-t border-dashed border-[#c2c2c2] md:hidden"
                  aria-hidden="true"
                />
              </div>
              <div className="flex gap-2 items-stretch">
                <div>
                  <h3 className="text-xl font-semibold text-[#1f1f1f]">
                    {step.title}
                  </h3>
                  <p className="leading-relaxed text-[#61656b]">
                    {step.description}
                  </p>
                </div>
                <div
                  className="pointer-events-none text-[140px] font-black leading-none text-[#f0f0f0] md:text-[160px]"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
