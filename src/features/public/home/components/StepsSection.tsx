import { steps } from '../data'
import { SectionHeading } from './SectionHeading'

export function StepsSection() {
  return (
    <section className="relative overflow-hidden bg-canvas-soft py-[50px]" aria-labelledby="steps-title">
      <div
        className="pointer-events-none absolute inset-y-6 left-0 w-64 -translate-x-10 bg-[url('/header-pattern-bg.svg')] bg-contain bg-left-top bg-no-repeat opacity-20"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 xl:px-0">
        <SectionHeading
          id="steps-title"
          title="Entra, descobre e cresce"
          className="mb-6"
          divider={false}
        />

        <ol className="relative grid gap-8 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, index) => (
            <li
              key={`${step.title}-${index}`}
              className="relative overflow-hidden bg-transparent"
            >
              <div className="relative mb-8 flex items-center" aria-hidden="true">
                <span className="relative z-10 size-5 rounded-full border-4 border-[#737373] bg-canvas-soft" />
                <span className="ml-4 h-px flex-1 border-t border-dashed border-[#9f9f9f]" />
              </div>
              <div className="grid grid-cols-[1fr_auto] items-end gap-3">
                <div className="pb-4">
                  <span className="sr-only">Passo {index + 1}: </span>
                  <h3 className="text-xl font-semibold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#525252]">{step.description}</p>
                </div>
                <span
                  className="select-none text-[7rem] font-black leading-[0.8] text-[#737373]/15 md:text-[9rem]"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
