import { stats } from '../data'

export function CommunitySection() {
  return (
    <section className="bg-[#f5f9ff]" aria-label="Catálogo da Oportunidades">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 xl:px-0">
        <dl className="grid divide-y divide-[#dbe5f2] py-3 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-7">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-4 py-4 sm:flex-col sm:items-start sm:gap-1 sm:px-8 sm:py-0 first:sm:pl-0 last:sm:pr-0">
              <dt className="order-2 text-sm font-medium leading-5 text-[#4f5c7c] sm:text-base">
                {stat.label}
              </dt>
              <dd className="order-1 min-w-14 text-[28px] font-semibold leading-none tracking-tight text-brand md:text-[32px]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
