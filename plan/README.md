# Oportunidades

> Plataforma de referência em Moçambique para acesso a oportunidades académicas e profissionais

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-red)](https://tanstack.com/start)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

## 📋 Sobre o Projeto

Oportunidades é uma plataforma digital que conecta jovens moçambicanos a oportunidades de bolsas de estudo, estágios, empregos e formação profissional. A plataforma também oferece o primeiro catálogo digital completo de universidades e cursos em Moçambique.

### 🎯 Missão

Facilitar o acesso a bolsas, estágios, empregos, formação e informação académica, promovendo a inclusão, a transparência e o crescimento pessoal.

### 🌟 Visão

Ser a plataforma de referência em Moçambique para acesso a oportunidades académicas e profissionais — promovendo informação fiável, orientação e ferramentas que capacitam jovens a construir o seu próprio caminho.

## 🏗️ Arquitectura

### Tech Stack

- **Frontend Framework**: [TanStack Start](https://tanstack.com/start) (SSR/SSG)
- **Router**: [TanStack Router](https://tanstack.com/router) (Type-safe routing)
- **State Management**: [TanStack Query](https://tanstack.com/query) (Server state)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/ui](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment**: [Vercel](https://vercel.com/)

### Principais Características

- ✅ **Server-Side Rendering (SSR)** - SEO perfeito out-of-the-box
- ✅ **Type-Safe** - TypeScript end-to-end
- ✅ **Server Functions** - Data fetching seguro no servidor
- ✅ **Row Level Security** - Segurança ao nível da base de dados
- ✅ **Real-time Updates** - Supabase Realtime
- ✅ **Optimistic UI** - Atualizações instantâneas
- ✅ **Mobile-First** - Design responsivo
- ✅ **Progressive Enhancement** - Funciona sem JavaScript
- ✅ **Accessibility** - WCAG 2.1 compliant

## 📁 Estrutura do Projeto

```
oportunidades/
├── app/
│   ├── routes/                  # Rotas TanStack Router (SSR)
│   │   ├── __root.tsx
│   │   ├── index.tsx           # Homepage
│   │   ├── oportunidades/      # Seção de oportunidades
│   │   ├── universidades/      # Catálogo de universidades
│   │   ├── auth/               # Autenticação
│   │   └── admin/              # Dashboard admin (protegido)
│   │
│   ├── components/             # Componentes React
│   │   ├── ui/                # Componentes Shadcn/ui
│   │   ├── opportunities/     # Componentes de oportunidades
│   │   ├── universities/      # Componentes de universidades
│   │   └── layout/            # Layout components
│   │
│   ├── server/                # Código server-side
│   │   ├── functions/         # Server functions
│   │   ├── middleware/        # Middleware
│   │   └── utils/             # Server utilities
│   │
│   ├── lib/                   # Utilities & config
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript types
│   └── styles/                # Global styles
│
├── supabase/
│   ├── migrations/            # Database migrations
│   └── seed.sql              # Seed data
│
├── public/                    # Assets estáticos
├── app.config.ts             # TanStack Start config
└── package.json
```

## 🚀 Getting Started

### Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado) ou npm
- Conta Supabase
- Git

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/your-username/oportunidades.git
cd oportunidades
```

2. **Instale as dependências**

```bash
pnpm install
# ou
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Edite `.env` com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. **Configure o Supabase localmente (opcional)**

```bash
# Instale Supabase CLI
npm install -g supabase

# Inicie Supabase localmente
supabase start

# Execute as migrações
supabase db reset
```

5. **Execute o servidor de desenvolvimento**

```bash
pnpm dev
# ou
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📊 Database Schema

### Principais Tabelas

- **profiles** - Perfis de utilizadores (extends auth.users)
- **opportunities** - Bolsas, estágios, empregos
- **universities** - Universidades de Moçambique
- **courses** - Cursos oferecidos por universidades
- **saved_opportunities** - Oportunidades guardadas pelos utilizadores
- **verification_reports** - Relatórios de informação desatualizada

Para ver o schema completo, consulte `supabase/migrations/`.

## 🔐 Autenticação e Autorização

### Níveis de Acesso

1. **Público** - Pode visualizar oportunidades e universidades
2. **Utilizador Autenticado** - Pode guardar oportunidades, submeter relatórios
3. **Admin** - CRUD de oportunidades e universidades
4. **Super Admin** - Gestão de utilizadores e configurações

### Row Level Security (RLS)

Todas as tabelas têm RLS habilitado com políticas específicas:

```sql
-- Exemplo: Oportunidades públicas são visíveis por todos
create policy "Public can view active opportunities"
  on opportunities for select
  using (status = 'active');

-- Apenas admins podem criar oportunidades
create policy "Admins can insert opportunities"
  on opportunities for insert
  with check (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role in ('admin', 'super_admin')
    )
  );
```

## 🎨 Componentes UI

Utilizamos [Shadcn/ui](https://ui.shadcn.com/) para componentes base:

```bash
# Adicionar componente
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add card
pnpm dlx shadcn-ui@latest add dialog
```

## 🔍 SEO

### Server-Side Rendering

Todas as páginas são renderizadas no servidor para SEO perfeito:

```typescript
export const Route = createFileRoute('/oportunidades/$id')({
  loader: async ({ params: { id } }) => {
    // Dados carregados no servidor
    const opportunity = await getOpportunity(id)
    return { opportunity }
  },
  
  meta: ({ loaderData }) => [
    { title: `${loaderData.opportunity.title} | Oportunidades` },
    { name: 'description', content: loaderData.opportunity.description },
  ],
  
  component: OpportunityDetail,
})
```

### Structured Data

Implementamos Schema.org para rich snippets:

- JobPosting para oportunidades de emprego/estágio
- EducationalOrganization para universidades
- Course para cursos
- BreadcrumbList para navegação

### Sitemap Dinâmico

Gerado automaticamente em `/sitemap.xml` com todas as oportunidades e universidades.

## 📱 Responsividade

Design mobile-first com breakpoints:

- **sm**: 640px - Mobile landscape
- **md**: 768px - Tablets
- **lg**: 1024px - Desktop
- **xl**: 1280px - Large desktop

## 🧪 Testing

```bash
# Executar testes
pnpm test

# Testes com cobertura
pnpm test:coverage

# Type checking
pnpm type-check
```

## 🚢 Deployment

### Vercel (Recomendado)

1. Push para GitHub
2. Importe no Vercel
3. Configure environment variables
4. Deploy automático em cada push

```bash
# Build para produção
pnpm build

# Preview local da build
pnpm start
```

### Outras Plataformas

O projeto suporta:
- Netlify
- Cloudflare Pages
- Railway
- Render

Configure o preset em `app.config.ts`:

```typescript
export default defineConfig({
  server: {
    preset: 'vercel', // ou 'netlify', 'cloudflare', etc.
  },
})
```

## 📈 Roadmap

### Fase 1 - MVP (Q1 2025) ✅
- [x] Oportunidades (listagem e detalhes)
- [x] Catálogo básico de universidades (70%)
- [x] Sistema de autenticação
- [x] Sistema de verificação de informação
- [ ] Identidade visual unificada

### Fase 2 - Consolidação (Q2 2025)
- [ ] Catálogo completo de universidades
- [ ] Perfis institucionais verificados
- [ ] Programa de mentoria (beta)
- [ ] Parcerias com universidades

### Fase 3 - Monetização (Q3 2025)
- [ ] Planos premium para instituições
- [ ] Mentoria paga
- [ ] Publicidade ética
- [ ] SaaS para gestão de candidaturas

### Fase 4 - Expansão Nacional (Q4 2025)
- [ ] Expansão para escolas técnicas
- [ ] Parcerias com Ministérios
- [ ] Programa de embaixadores

### Fase 5 - Expansão Regional (2026)
- [ ] Integração CPLP (Angola, Cabo Verde, etc.)
- [ ] Intercâmbio de oportunidades lusófonas

## 🤝 Contribuir

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Guidelines

- Siga o style guide do projeto
- Escreva testes para novas features
- Atualize a documentação
- Mantenha commits pequenos e focados

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja [LICENSE](LICENSE) para detalhes.

## 👥 Equipa

**Champion**: Alcino Chivangue

- GitHub: [@your-github](https://github.com/your-github)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: contacto@oportunidades.co.mz

## 🙏 Agradecimentos

- [TanStack](https://tanstack.com/) - Pela stack incrível
- [Supabase](https://supabase.com/) - Pelo backend poderoso
- [Vercel](https://vercel.com/) - Pelo hosting excelente
- Comunidade open-source de Moçambique

## 📞 Suporte

- **Website**: [oportunidades.co.mz](https://oportunidades.co.mz)
- **Email**: suporte@oportunidades.co.mz
- **Twitter**: [@oportunidades_mz](https://twitter.com/oportunidades_mz)
- **Facebook**: [oportunidades.mz](https://facebook.com/oportunidades.mz)

---

**Feito com ❤️ em Moçambique, para Moçambique**
