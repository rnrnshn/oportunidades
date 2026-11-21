import { Link, useLocation } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { BookOpen, BriefcaseBusiness, ChevronDown, GraduationCap, Handshake, Info, Menu, School, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AuthDialog } from '@/features/auth/AuthDialog'
import { Button } from '@/components/ui/button'
import { logout } from '@/features/auth/api'
import { useCurrentUser } from '@/features/auth/use-current-user'
import { useLaunchInventory } from '@/features/public/launch-inventory'
import { subscribeToSignInRequests } from '@/lib/auth-store'
import { DASHBOARD_ACCOUNT_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

type MenuLink = { label: string; href: string; description?: string; icon?: ReactNode }

const aboutLinks: MenuLink[] = [
  { label: 'Sobre nós', href: '/about#about', description: 'Conhece a missão da Oportunidades.', icon: <Info /> },
  { label: 'Como trabalhamos', href: '/about#principles', description: 'Os princípios que orientam a plataforma.', icon: <Sparkles /> },
  { label: 'Parceiros', href: '/about#partners', description: 'Organizações que constroem este projecto connosco.', icon: <Handshake /> },
]
const careerLinks: MenuLink[] = [
  { label: 'Estágios', href: '/estagios', description: 'Experiência para começar a carreira.', icon: <BriefcaseBusiness /> },
  { label: 'Oportunidades académicas', href: '/oportunidades', description: 'Programas para estudar, participar e crescer.', icon: <Sparkles /> },
  { label: 'Intercâmbios', href: '/oportunidades?type=intercambio', description: 'Experiências de aprendizagem noutros contextos.', icon: <School /> },
  { label: 'Workshops e competições', href: '/oportunidades?type=workshop', description: 'Actividades para desenvolver competências.', icon: <BookOpen /> },
]
const programmeLinks: MenuLink[] = [
  { label: 'Cursos e Programas', href: '/cursos', description: 'Compara áreas, modalidades e instituições.', icon: <GraduationCap /> },
  { label: 'Universidades', href: '/universidades', description: 'Explora instituições e os cursos disponíveis.', icon: <School /> },
  { label: 'Bolsas de estudo', href: '/bolsas', description: 'Encontra apoio para financiar os estudos.', icon: <Sparkles /> },
]
const resourceLinks: MenuLink[] = [
  { label: 'Artigos e guias', href: '/artigos', description: 'Conteúdo prático para tomar melhores decisões.', icon: <BookOpen /> },
  { label: 'Mentoria', href: '/mentoria', description: 'Orientação de profissionais experientes.', icon: <Sparkles /> },
]

function MegaMenu({ label, links, onNavigate }: { label: string; links: MenuLink[]; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); triggerRef.current?.focus() } }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open])
  return <div className="xl:static">
    <button ref={triggerRef} type="button" aria-expanded={open} className="inline-flex min-h-11 w-full items-center justify-between gap-1 rounded-lg px-2 text-left font-medium text-navy hover:bg-[#f3f5f7] hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand xl:w-auto transition-colors duration-150 ease-out" onClick={() => setOpen((value) => !value)} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); window.requestAnimationFrame(() => firstLinkRef.current?.focus()) } }}>
      {label}<ChevronDown className={cn('size-4 transition-transform duration-200 ease-out', open && 'rotate-180')} aria-hidden="true" />
    </button>
    {open && <><button type="button" aria-label={`Fechar menu ${label}`} className="fixed inset-0 z-40 hidden cursor-default bg-[#122045]/35 animate-in fade-in-0 duration-200 ease-out xl:block" onClick={() => setOpen(false)} /><div className="z-50 mt-1 rounded-xl border border-[var(--surface-border)] bg-white p-3 shadow-xl animate-in fade-in-0 slide-in-from-top-1 duration-200 ease-out xl:absolute xl:inset-x-0 xl:top-full xl:mt-0 xl:rounded-none xl:border-x-0 xl:p-0"><nav aria-label={label} className="mx-auto w-full max-w-6xl px-5 py-5 sm:px-6 xl:px-0"><ul className="grid gap-2 xl:grid-cols-3 xl:gap-x-6">{links.map((link, index) => <li key={link.href}><a ref={index === 0 ? firstLinkRef : undefined} href={link.href} onClick={() => { setOpen(false); onNavigate?.() }} className="group flex min-h-14 items-start gap-3 rounded-lg p-3 hover:bg-[#f3f5f7] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand transition-colors duration-150 ease-out">{link.icon && <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#edf4ff] text-brand [&>svg]:size-4" aria-hidden="true">{link.icon}</span>}<span><span className="block text-sm font-semibold text-navy group-hover:text-brand transition-colors duration-150 ease-out">{link.label}</span>{link.description && <span className="mt-1 block text-xs leading-5 text-[#525252]">{link.description}</span>}</span></a></li>)}</ul></nav></div></>}
  </div>
}

export default function Header({ transparent = false }: { transparent?: boolean }) {
  const queryClient = useQueryClient(); const { data: user } = useCurrentUser()
  const { data: inventory } = useLaunchInventory()
  const studyLinks = programmeLinks.filter((link) =>
    (link.href !== '/bolsas' || inventory?.scholarships !== false) &&
    (link.href !== '/cursos' || inventory?.courses !== false) &&
    (link.href !== '/universidades' || inventory?.universities !== false),
  )
  const workLinks = careerLinks.filter((link) => link.href !== '/estagios' || inventory?.internships !== false)
  const guidesLinks = resourceLinks.filter((link) => link.href !== '/mentoria' || inventory?.mentors !== false)
  const [mobileOpen, setMobileOpen] = useState(false); const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null)
  // Save buttons, reports and mentoring requests ask for sign-in through the shared store.
  useEffect(() => subscribeToSignInRequests((mode) => { setMobileOpen(false); setAuthMode(mode) }), [])
  const location = useLocation(); const isHome = location.pathname === '/'
  async function handleLogout() { await logout(); queryClient.clear() }
  return <header className={cn('z-40 w-full', (transparent || isHome) ? 'absolute inset-x-0 top-0 border-transparent bg-transparent' : 'sticky top-0 border-b border-[var(--surface-border)] bg-white')} data-home={isHome}>
    <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-6 xl:px-0"><Link to="/" className="rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><img src="/logo.png" alt="Oportunidades" width="164" height="44" className="hidden h-11 w-auto xl:block" /><img src="/logo-mobile.png" alt="Oportunidades" width="40" height="40" className="block h-10 w-auto xl:hidden" /></Link>
      <nav aria-label="Navegação principal" className="hidden items-center gap-1 whitespace-nowrap text-sm xl:flex">{studyLinks.length > 0 && <MegaMenu label="Estudar" links={studyLinks} />}<Link to="/empregos" className="inline-flex min-h-11 items-center rounded-lg px-2 font-medium text-navy hover:bg-[#f3f5f7] hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand transition-colors duration-150 ease-out">Encontrar emprego</Link><MegaMenu label={inventory?.internships === false ? 'Programas' : 'Estágios e programas'} links={workLinks} /><MegaMenu label={inventory?.mentors === false ? 'Guias' : 'Guias e mentoria'} links={guidesLinks} /><MegaMenu label="Sobre" links={aboutLinks} /></nav>
      {user ? <div className="hidden items-center gap-3 xl:flex"><a href={DASHBOARD_ACCOUNT_URL} className="max-w-[130px] truncate text-sm font-semibold">{user.name}</a><Button variant="outline" onClick={() => void handleLogout()}>Sair</Button></div> : <div className="hidden items-center gap-2 xl:flex"><Button variant="ghost" onClick={() => setAuthMode('login')}>Entrar</Button><Button className="bg-brand" onClick={() => setAuthMode('signup')}>Criar conta</Button></div>}
      <Button variant="outline" size="icon" className="ml-auto size-11 xl:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">{mobileOpen ? <X /> : <Menu />}</Button></div>
     {mobileOpen && <div className="border-t border-[var(--surface-border)] bg-white px-4 pb-5 animate-in fade-in-0 slide-in-from-top-2 duration-200 ease-out xl:hidden"><nav id="mobile-navigation" aria-label="Navegação móvel" className="flex flex-col gap-1 py-3">{inventory?.courses !== false && <Link to="/cursos" onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center rounded-lg px-2 font-medium text-navy hover:bg-[#f3f5f7] transition-colors duration-150 ease-out">Encontrar curso</Link>}{inventory?.scholarships !== false && <Link to="/bolsas" onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center rounded-lg px-2 font-medium text-navy hover:bg-[#f3f5f7] transition-colors duration-150 ease-out">Encontrar bolsa</Link>}<Link to="/empregos" onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center rounded-lg px-2 font-medium text-navy hover:bg-[#f3f5f7] transition-colors duration-150 ease-out">Encontrar emprego</Link>{inventory?.mentors !== false && <Link to="/mentoria" onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center rounded-lg px-2 font-medium text-navy hover:bg-[#f3f5f7] transition-colors duration-150 ease-out">Pedir orientação</Link>}<MegaMenu label="Mais opções" links={[...workLinks, ...guidesLinks, ...aboutLinks]} onNavigate={() => setMobileOpen(false)} /></nav><div className="grid gap-2">{user ? <><a href={DASHBOARD_ACCOUNT_URL} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-white">A minha conta</a><Button variant="outline" onClick={() => void handleLogout()}>Sair</Button></> : <><Button variant="outline" onClick={() => { setMobileOpen(false); setAuthMode('login') }}>Entrar</Button><Button className="bg-brand" onClick={() => { setMobileOpen(false); setAuthMode('signup') }}>Criar conta</Button></>}</div></div>}
    <AuthDialog mode={authMode} open={Boolean(authMode)} onOpenChange={(open) => { if (!open) setAuthMode(null) }} onSwitchMode={setAuthMode} />
  </header>
}
