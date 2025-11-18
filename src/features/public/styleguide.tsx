import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const palette = [
  { name: 'Brand Blue', token: '--brand-blue', className: 'bg-brand text-white' },
  { name: 'Brand Tint', token: '--brand-blue-tint', className: 'bg-brand-tint text-brand' },
  { name: 'Canvas', token: '--canvas', className: 'bg-canvas text-navy' },
  { name: 'Canvas Soft', token: '--bg-canvas-2', className: 'bg-canvas-soft text-navy' },
  { name: 'Cloud', token: '--cloud', className: 'bg-cloud text-navy' },
  { name: 'Mint', token: '--bg-mint', className: 'bg-mint text-success' },
  { name: 'Info', token: '--bg-info', className: 'bg-info text-brand' },
  { name: 'Gold', token: '--accent-gold', className: 'bg-gold text-white' },
]

const buttons = [
  { label: 'Primary', props: { children: 'Criar conta', className: 'bg-brand hover:bg-brand-dark' } },
  { label: 'Outline', props: { children: 'Entrar', variant: 'outline', className: 'border border-brand text-brand' } },
  { label: 'Ghost', props: { children: 'Ver blog', variant: 'ghost', className: 'text-brand' } },
]

export function PublicStyleGuidePage() {
  return (
    <main className="bg-soft text-navy">
      <header className="bg-canvas-soft border-b border-sand p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-strong">Design Tokens</p>
        <h1 className="mt-3 text-4xl font-bold">Public Style Guide</h1>
        <p className="mt-3 max-w-3xl mx-auto text-subtle">
          Referência rápida para designers e desenvolvedores aplicarem a identidade visual da Oportunidades sem copiar
          valores hexadecimais.
        </p>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-12 space-y-8">
        <SectionHeading title="Palette" description="Usa classes utilitárias em vez de códigos hex." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {palette.map((swatch) => (
            <Card key={swatch.name} className="rounded-md border-soft shadow-sm">
              <div className={cn('h-24 rounded-t-md', swatch.className)} />
              <CardContent className="p-4">
                <p className="text-sm font-semibold">{swatch.name}</p>
                <p className="text-xs text-muted">{swatch.token}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 space-y-8">
        <SectionHeading title="Buttons" description="shadcn/ui + tokens." />
        <div className="flex flex-wrap gap-4">
          {buttons.map((btn) => (
            <div key={btn.label} className="space-y-2">
              <p className="text-xs font-semibold uppercase text-muted">{btn.label}</p>
              <Button {...btn.props} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 space-y-8">
        <SectionHeading title="Cards" description="Cards com tokens de texto e bordas." />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-md border-soft shadow-sm">
            <CardHeader>
              <CardTitle>Oportunidades em destaque</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted">
              <p>Exemplo de copy com <span className="text-brand font-semibold">link em destaque</span>.</p>
              <Button className="bg-brand text-white hover:bg-brand-dark rounded-md">Ver detalhes</Button>
            </CardContent>
          </Card>
          <Card className="rounded-md border-soft shadow-sm">
            <CardHeader>
              <CardTitle>Bolsas Internas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge className="bg-brand-tint text-brand">Abertas</Badge>
              <ul className="space-y-2 text-muted text-sm">
                <li>STEM Excellence — $2,500</li>
                <li>Universidade Parceira — $1,800</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 space-y-8">
        <SectionHeading title="Form inputs" description="Campos base com tokens aplicados." />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-navy">Nome completo</label>
            <Input placeholder="Edson Matola" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-navy">Email</label>
            <Input type="email" placeholder="tuemail@oportunidades.co.mz" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-muted-strong">Referência</p>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-muted">{description}</p>
    </div>
  )
}
