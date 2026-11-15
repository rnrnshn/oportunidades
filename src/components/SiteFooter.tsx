import { Link } from '@tanstack/react-router'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

type FooterRoute = '/about' | '/artigos' | '/bolsas' | '/cursos' | '/empregos' | '/estagios' | '/mentoria' | '/oportunidades' | '/universidades'
type FooterLink = { label: string; to: FooterRoute; hash?: string }
type FooterSection = { title: string; links: FooterLink[] }

const footerSections: FooterSection[] = [
  {
    title: 'Sobre a Oportunidades',
    links: [
      { label: 'Sobre nós', to: '/about', hash: 'about' },
      { label: 'Como trabalhamos', to: '/about', hash: 'principles' },
      { label: 'Impacto', to: '/about', hash: 'impact' },
      { label: 'Parceiros', to: '/about', hash: 'partners' },
    ],
  },
  {
    title: 'Explorar',
    links: [
      { label: 'Universidades', to: '/universidades' },
      { label: 'Cursos e Programas', to: '/cursos' },
      { label: 'Bolsas', to: '/bolsas' },
      { label: 'Empregos', to: '/empregos' },
      { label: 'Estágios', to: '/estagios' },
      { label: 'Oportunidades académicas', to: '/oportunidades' },
    ],
  },
  {
    title: 'Recursos e apoio',
    links: [
      { label: 'Artigos e guias', to: '/artigos' },
      { label: 'Mentoria', to: '/mentoria' },
      { label: 'Termos de utilização', to: '/about' },
      { label: 'Política de privacidade', to: '/about' },
    ],
  },
]

interface SiteFooterProps {
  variant?: 'default' | 'home'
}

export default function SiteFooter({ variant = 'default' }: SiteFooterProps) {
  const isHome = variant === 'home'

  return (
    <footer className="bg-[#f5f5f5]">
      <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 xl:px-0 ${isHome ? 'py-12 lg:py-[70px]' : 'py-8 lg:py-10'}`}>
        <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-4 md:items-start">
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title} className="space-y-3">
              <h2 className={`${isHome ? 'text-lg font-medium' : 'text-sm font-semibold'} text-[#262626]`}>{section.title}</h2>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      hash={link.hash}
                      className={`inline-flex min-h-11 items-center text-[#525252] underline-offset-4 transition hover:text-[#0049af] hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0049af] md:min-h-8 ${isHome ? 'text-base' : 'text-sm'}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="space-y-3">
            <h2 className={`${isHome ? 'text-lg font-medium' : 'text-sm font-semibold'} text-[#262626]`}>Acompanha-nos</h2>
            <p className={`max-w-xs leading-6 text-[#525252] ${isHome ? 'text-base' : 'text-sm'}`}>Encontra-nos nas redes sociais</p>
            <div className="flex flex-wrap gap-2" aria-hidden="true">
              {[
                { label: 'Facebook', Icon: Facebook },
                { label: 'LinkedIn', Icon: Linkedin },
                { label: 'Instagram', Icon: Instagram },
                { label: 'YouTube', Icon: Youtube },
              ].map(({ label, Icon }) => (
                <span key={label} className="flex size-11 items-center justify-center rounded-xl bg-[#0049af] text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#dcdcdc]">
        <div className={`mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-5 text-center sm:px-6 xl:px-0 ${isHome ? 'gap-5 py-[30px]' : 'py-5'}`}>
          {isHome && <img src="/logo.png" alt="Oportunidades" width="119" height="32" className="h-8 w-auto object-contain" />}
          <p className="text-xs leading-5 text-[#525252]">
            © 2022–{new Date().getFullYear()} Oportunidades. Todos os direitos reservados. Feito em Moçambique.
          </p>
        </div>
      </div>
    </footer>
  )
}
