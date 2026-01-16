import { categories } from '../data'

export function CategorySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 bg-white">
      <h2 className="text-2xl font-semibold text-navy">
        Que oportunidade procuras hoje?
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.title}
            className="group relative h-40 overflow-hidden rounded-2xl bg-white shadow-xs"
          >
            <img
              src={category.image}
              alt={category.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-white/20" />
            <div className="relative flex h-full flex-col justify-center px-5">
              <p className="text-lg font-semibold text-brand">
                {category.title}
              </p>
              <button className="mt-1 flex items-center gap-2 text-sm font-semibold text-brand transition hover:translate-x-0.5">
                Ver mais
                <span
                  className="h-2 w-2 rounded-full bg-[#f58220]"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
