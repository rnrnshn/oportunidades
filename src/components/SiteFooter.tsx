const footerLinks = [
  { label: 'Sobre Oportunidades', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Parcerias', href: '#' },
  { label: 'Suporte', href: '#' },
]

export default function SiteFooter() {
  return (
    <footer className="bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <img src="/logo.svg" alt="Oportunidades" className="h-10 w-auto" />
          <p className="mt-3 max-w-sm text-sm text-muted">
            A plataforma para encontrar bolsas, universidades e programas que
            transformam o teu percurso académico e profissional.
          </p>
        </div>
        <div className="grid gap-4 text-sm text-navy sm:grid-cols-2 md:grid-cols-4">
          {footerLinks.map((link) => (
            <a key={link.label} className="hover:text-brand" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-10 border-t border-soft pt-4 text-center text-xs text-hint-2">
        © {new Date().getFullYear()} Oportunidades. Feito em Moçambique com
        dedicação.
      </div>
    </footer>
  )
}
