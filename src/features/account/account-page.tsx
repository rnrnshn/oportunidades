import Avatar from '@/components/Avatar'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import SiteFooter from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const links = [
  { title: 'Favoritos', description: 'Oportunidades guardadas', href: '#' },
  { title: 'Administrar contas', description: 'Editar detalhes ou adicionar', href: '#' },
  { title: 'Central de suporte', description: 'Perguntas Frequentes', href: '#' },
]

const profileSchema = z.object({
  firstName: z.string().min(1, 'Obrigatório'),
  lastName: z.string().min(1, 'Obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Min. 8 caracteres'),
})

type ProfileForm = z.infer<typeof profileSchema>

export function AccountPageView() {
  return (
    <main className="bg-soft text-navy">
      <HeroHeader />
      <AccountCard />
      <SiteFooter />
    </main>
  )
}

function HeroHeader() {
  return (
    <section className="bg-canvas-soft pb-24 pt-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4">
        <ImagePlaceholder label="User cover" className="h-24 w-full rounded-md" />
      </div>
    </section>
  )
}

function AccountCard() {
  return (
    <section className="-mt-24 pb-20">
      <div className="mx-auto max-w-2xl px-4">
        <Card className="rounded-md shadow-lg">
          <CardContent className="space-y-6 p-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <Avatar name="Jane Doe" imageUrl="/placeholder.jpg" />
              <div>
                <h1 className="text-xl font-semibold text-navy">Jane Doe</h1>
                <p className="text-sm text-muted">Conta criada há 2 dias</p>
              </div>
              <div className="flex gap-3">
                <Badge className="rounded-md bg-brand px-4 py-1 text-white">Perfil</Badge>
                <Badge variant="outline" className="rounded-md border border-brand px-4 py-1 text-brand">
                  Configurações
                </Badge>
              </div>
            </div>

            <AccountForm />

            <nav className="divide-y divide-soft border-y border-soft">
              {links.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="flex items-center justify-between py-4 text-sm font-semibold text-navy"
                >
                  <div>
                    <div>{link.title}</div>
                    <p className="text-xs font-normal text-muted">{link.description}</p>
                  </div>
                  <span aria-hidden="true">→</span>
                </a>
              ))}
              <a className="flex items-center justify-between py-4 text-sm font-semibold text-danger" href="#">
                Excluir conta <span aria-hidden="true">→</span>
              </a>
            </nav>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-soft p-6">
            <Button
              variant="outline"
              className="w-full rounded-md border-danger text-danger hover:bg-danger-soft"
            >
              Sair
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

function AccountForm() {
  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: 'Edson',
      lastName: 'Matola',
      email: 'tuemail@oportunidades.co.mz',
      password: '',
    },
  })

  const onSubmit = (values: ProfileForm) => {
    console.log('profile submit', values)
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Nome" error={form.formState.errors.firstName?.message}>
          <Input
            {...form.register('firstName')}
            className="rounded-md border-muted bg-white focus-visible:ring-brand"
          />
        </FormField>
        <FormField label="Sobrenome" error={form.formState.errors.lastName?.message}>
          <Input
            {...form.register('lastName')}
            className="rounded-md border-muted bg-white focus-visible:ring-brand"
          />
        </FormField>
      </div>
      <FormField label="Email" error={form.formState.errors.email?.message}>
        <Input
          type="email"
          {...form.register('email')}
          className="rounded-md border-muted bg-white focus-visible:ring-brand"
        />
      </FormField>
      <FormField label="Senha" error={form.formState.errors.password?.message}>
        <Input
          type="password"
          {...form.register('password')}
          className="rounded-md border-muted bg-white focus-visible:ring-brand"
        />
      </FormField>
      <Button type="submit" className="rounded-md bg-brand text-white hover:bg-brand-dark">
        Guardar alterações
      </Button>
    </form>
  )
}

function FormField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-navy">
      {label}
      {children}
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </label>
  )
}
