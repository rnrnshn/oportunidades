# Plano de Desenvolvimento - Oportunidades

> Roadmap detalhado para desenvolvimento e lançamento da plataforma

**Versão**: 1.0  
**Data**: Novembro 2025  
**Champion**: Alcino Chivangue  
**Status**: 🟡 Em Desenvolvimento

---

## 📊 Visão Geral do Projeto

### Objectivos

1. **Curto Prazo** (3 meses): Lançar MVP funcional
2. **Médio Prazo** (6 meses): Consolidar base de utilizadores
3. **Longo Prazo** (12+ meses): Expandir para CPLP

### Métricas de Sucesso

- 10,000+ utilizadores registados (6 meses)
- 500+ oportunidades activas
- 100% das universidades catalogadas
- 80%+ taxa de satisfação
- <3s tempo de carregamento

---

## 🎯 Fases de Desenvolvimento

## FASE 1: MVP - Fundação (Semanas 1-6)

**Objectivo**: Plataforma funcional com features essenciais

### Semana 1-2: Setup & Infraestrutura

#### Tarefas Técnicas

- [ ] **Inicializar projeto TanStack Start**
  ```bash
  npm create @tanstack/start@latest
  cd oportunidades
    npm install
    ```

- [ ] **Configurar TypeScript**
  - Strict mode habilitado
  - Path aliases (`@/`)
  - Types para Supabase

- [ ] **Setup Supabase**
  - Criar projeto no Supabase
  - Configurar variáveis de ambiente
  - Instalar Supabase CLI
  - Inicializar projeto local

- [ ] **Configurar Tailwind CSS + Shadcn/ui**
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  npx shadcn-ui@latest init
  ```

- [ ] **Estrutura de pastas**
  - Criar estrutura conforme arquitetura
  - Setup de aliases de import
  - Configurar linting (ESLint + Prettier)

- [ ] **Git & GitHub**
  - Inicializar repositório
  - Criar `.gitignore`
  - Push para GitHub
  - Setup de branches (main, dev, staging)

#### Deliverables

✅ Projeto inicializado  
✅ Desenvolvimento local funcionando  
✅ Repositório no GitHub  
✅ CI/CD básico configurado

---

### Semana 3-4: Database & Autenticação

#### Database Schema

- [ ] **Criar migrações iniciais**
  ```sql
  -- 01_initial.sql
  - profiles
  - opportunities
  - universities
  - courses
  - saved_opportunities
  - verification_reports
  ```

- [ ] **Configurar Row Level Security (RLS)**
  - Políticas para cada tabela
  - Testes de segurança

- [ ] **Seed data inicial**
  - 10-20 oportunidades de teste
  - 5-10 universidades
  - Perfis de teste (user, admin)

- [ ] **Gerar TypeScript types**
  ```bash
  supabase gen types typescript --local > app/types/database.types.ts
  ```

#### Autenticação

- [ ] **Implementar Supabase Auth**
  - Email/Password signup
  - Email/Password login
  - Password reset
  - Email verification

- [ ] **Auth Components**
  - LoginForm
  - RegisterForm
  - PasswordResetForm

- [ ] **Auth Server Functions**
  - getCurrentUser()
  - signIn()
  - signUp()
  - signOut()

- [ ] **Protected Routes**
  - Middleware de autenticação
  - Redirect para login

#### Deliverables

✅ Database schema completo  
✅ RLS policies implementadas  
✅ Autenticação funcionando  
✅ Seed data carregada

---

### Semana 5-6: Features Core - Oportunidades

#### Listagem de Oportunidades

- [ ] **Server Functions**
  ```typescript
  // app/server/functions/opportunities.ts
  - getOpportunities(filters)
  - getOpportunity(id)
  ```

- [ ] **Route: `/oportunidades`**
  - Layout responsivo
  - Grid de cards
  - Filtros (tipo, província, pesquisa)
  - Paginação
  - Loading states
  - Empty states

- [ ] **Components**
  - OpportunityCard
  - OpportunityList
  - OpportunityFilters
  - SearchBar
  - Pagination

#### Detalhes de Oportunidade

- [ ] **Route: `/oportunidades/$id`**
  - Layout detalhado
  - Informação completa
  - Meta tags (SEO)
  - Structured data (Schema.org)
  - Botão de candidatura
  - Share buttons

- [ ] **Features**
  - Save/Bookmark (autenticado)
  - Report outdated info
  - Breadcrumbs
  - Related opportunities

#### SEO

- [ ] **Meta tags dinâmicos**
  - Title
  - Description
  - Open Graph
  - Twitter Cards

- [ ] **Structured Data**
  - JobPosting schema
  - BreadcrumbList

- [ ] **Sitemap**
  - Dynamic generation
  - Update on new opportunities

#### Deliverables

✅ Listagem de oportunidades funcionando  
✅ Página de detalhes completa  
✅ Filtros e pesquisa implementados  
✅ SEO perfeito (100/100 Lighthouse)

---

## FASE 2: Catálogo de Universidades (Semanas 7-10)

### Semana 7-8: Universidades & Cursos

#### Catálogo de Universidades

- [ ] **Research & Data Collection**
  - Lista completa de universidades em Moçambique
  - Contactos, websites, localização
  - Logos (com permissão)

- [ ] **Server Functions**
  ```typescript
  - getUniversities(filters)
  - getUniversity(id)
  - getCourses(universityId)
  ```

- [ ] **Route: `/universidades`**
  - Grid de universidades
  - Filtros (tipo, província)
  - Pesquisa
  - Badges (pública/privada, verificada)

- [ ] **Route: `/universidades/$id`**
  - Informação detalhada
  - Lista de cursos
  - Contactos
  - Mapa (Google Maps embed)
  - Meta tags e structured data

#### Cursos

- [ ] **Route: `/universidades/$id/cursos/$courseId`**
  - Detalhes do curso
  - Duração, modalidade
  - Requisitos
  - Custos (se aplicável)
  - Processo de candidatura

- [ ] **Components**
  - UniversityCard
  - UniversityList
  - CourseList
  - CourseCard
  - UniversityFilters

#### Deliverables

✅ Catálogo com 70% das universidades  
✅ Informação estruturada de cursos  
✅ Sistema de pesquisa eficiente  
✅ SEO otimizado

---

### Semana 9-10: User Features

#### Perfil de Utilizador

- [ ] **Route: `/perfil`**
  - Informação pessoal
  - Avatar upload
  - Editar perfil

- [ ] **Oportunidades Guardadas**
  - Lista de bookmarks
  - Remover bookmarks
  - Filtros
  - Export (futuro)

- [ ] **Notificações**
  - Email para novas oportunidades
  - Preferências de notificação
  - Digest semanal (futuro)

#### Sistema de Verificação

- [ ] **Report System**
  - Formulário para reportar info desatualizada
  - Categorias (erro, desatualizado, link quebrado)
  - Tracking de status

- [ ] **Components**
  - ReportModal
  - ReportForm
  - ReportList (admin)

#### Deliverables

✅ Perfil de utilizador completo  
✅ Sistema de bookmarks  
✅ Sistema de verificação funcionando

---

## FASE 3: Admin Dashboard (Semanas 11-12)

### Admin Panel

- [ ] **Route: `/admin` (protected)**
  - Dashboard overview
  - Estatísticas
  - Gráficos (opportunities, users, reports)

#### Gestão de Oportunidades

- [ ] **Routes**
  - `/admin/oportunidades` - Lista
  - `/admin/oportunidades/new` - Criar
  - `/admin/oportunidades/$id/edit` - Editar

- [ ] **Features**
  - CRUD completo
  - Rich text editor
  - Image upload
  - Preview
  - Bulk actions
  - CSV import/export
  - Status management (active/expired/draft)

#### Gestão de Universidades

- [ ] **Routes**
  - `/admin/universidades` - Lista
  - `/admin/universidades/new` - Criar
  - `/admin/universidades/$id/edit` - Editar

- [ ] **Features**
  - CRUD completo
  - Logo upload
  - Verification toggle
  - Manage courses

#### Gestão de Relatórios

- [ ] **Route: `/admin/relatorios`**
  - Lista de reports
  - Filtros (pending, reviewed, resolved)
  - Actions (mark as reviewed/resolved)
  - Link to content

#### Components

- [ ] AdminLayout
- [ ] AdminSidebar
- [ ] AdminNav
- [ ] DataTable (reusable)
- [ ] Forms (opportunity, university, course)
- [ ] ImageUploader
- [ ] RichTextEditor

#### Deliverables

✅ Admin dashboard funcional  
✅ CRUD de oportunidades  
✅ CRUD de universidades  
✅ Sistema de relatórios

---

## FASE 4: Polish & Launch (Semanas 13-16)

### Semana 13-14: UI/UX Refinement

#### Design System

- [ ] **Cores & Tipografia**
  - Definir paleta de cores
  - Configurar fonts
  - Design tokens

- [ ] **Components refinement**
  - Consistência visual
  - Animations & transitions
  - Micro-interactions
  - Loading skeletons

- [ ] **Responsiveness**
  - Testar em todos os breakpoints
  - Mobile navigation
  - Touch interactions

- [ ] **Accessibility**
  - ARIA labels
  - Keyboard navigation
  - Screen reader testing
  - Color contrast (WCAG 2.1 AA)

#### Performance

- [ ] **Optimizações**
  - Image optimization (WebP, lazy loading)
  - Code splitting
  - Bundle size analysis
  - Caching strategies

- [ ] **Metrics**
  - Lighthouse score >90
  - First Contentful Paint <1.5s
  - Time to Interactive <3s
  - Core Web Vitals green

---

### Semana 15: Testing & QA

#### Testing

- [ ] **Unit Tests**
  - Server functions
  - Components críticos
  - Utilities

- [ ] **Integration Tests**
  - Auth flow
  - CRUD operations
  - Search & filters

- [ ] **E2E Tests**
  - User journeys críticos
  - Admin workflows

- [ ] **Manual Testing**
  - Checklist completo
  - Cross-browser (Chrome, Firefox, Safari)
  - Mobile devices (iOS, Android)

#### Bug Fixing

- [ ] Fix P0 (critical) bugs
- [ ] Fix P1 (high priority) bugs
- [ ] Document P2 (low priority) for post-launch

---

### Semana 16: Launch Preparation

#### Content

- [ ] **Seed Production Data**
  - 100+ oportunidades reais
  - 50+ universidades
  - Imagens de qualidade

- [ ] **Documentation**
  - User guide
  - FAQ
  - Admin guide

#### Marketing

- [ ] **Landing Page**
  - Hero section
  - Features
  - Testimonials (futuro)
  - CTA

- [ ] **Social Media**
  - Setup contas (Facebook, Twitter, LinkedIn)
  - Primeiros posts
  - Community building

- [ ] **Email**
  - Welcome email
  - Newsletter setup
  - Templates

#### Legal

- [ ] Termos de Serviço
- [ ] Política de Privacidade
- [ ] Cookie Policy
- [ ] RGPD compliance

#### Deployment

- [ ] **Production Setup**
  - Vercel project
  - Environment variables
  - Custom domain
  - SSL certificate
  - Analytics (Google Analytics, Vercel Analytics)
  - Error tracking (Sentry)

- [ ] **Monitoring**
  - Uptime monitoring
  - Performance monitoring
  - Error logging

- [ ] **Backup**
  - Database backup strategy
  - Point-in-time recovery

#### Soft Launch

- [ ] Deploy to production
- [ ] Internal testing
- [ ] Friends & family testing
- [ ] Gather feedback
- [ ] Fix critical issues

#### Public Launch

- [ ] Announce on social media
- [ ] Press release
- [ ] Reach out to universities
- [ ] Reach out to companies
- [ ] Community engagement

#### Deliverables

✅ Aplicação production-ready  
✅ Content carregado  
✅ Marketing materials prontos  
✅ Lançamento público bem-sucedido

---

## 📈 Post-Launch (Ongoing)

### Semana 17+: Manutenção & Iteração

#### Operações Diárias

- [ ] Monitor analytics
- [ ] Responder a support tickets
- [ ] Update oportunidades
- [ ] Review verification reports
- [ ] Engage with community

#### Content Strategy

- [ ] **Oportunidades**
  - Daily updates
  - Partnerships com organizações
  - Automated scraping (futuro)

- [ ] **Blog** (futuro)
  - Guias de candidatura
  - Success stories
  - Career tips
  - University profiles

#### Growth

- [ ] **User Acquisition**
  - SEO optimization contínua
  - Social media marketing
  - Partnership com universidades
  - Ambassador program

- [ ] **Partnerships**
  - Universidades (perfis verificados)
  - Empresas (job board)
  - ONGs (bolsas)
  - Governo (programas oficiais)

#### Features Pipeline

##### Q2 2025
- [ ] Mentoria (beta)
- [ ] University profiles verified
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Mobile app (PWA)

##### Q3 2025
- [ ] Premium plans para instituições
- [ ] Mentoria paga
- [ ] Application tracking
- [ ] Calendar integration
- [ ] WhatsApp notifications

##### Q4 2025
- [ ] Expansão para escolas técnicas
- [ ] CV builder
- [ ] Interview preparation
- [ ] Career tests
- [ ] Webinars

##### 2026
- [ ] CPLP expansion
- [ ] API pública
- [ ] Mobile apps (iOS, Android)
- [ ] AI-powered recommendations
- [ ] Virtual career fairs

---

## 🎯 Milestones & KPIs

### Milestone 1: MVP Launch (Semana 16)
- ✅ Oportunidades & Universidades live
- ✅ Auth funcionando
- ✅ Admin panel operacional
- **KPI**: 100+ oportunidades, 50+ universidades

### Milestone 2: Product-Market Fit (Mês 3)
- ✅ 1,000+ utilizadores registados
- ✅ 50+ oportunidades aplicadas/semana
- **KPI**: 70%+ user retention (1 mês)

### Milestone 3: Consolidação (Mês 6)
- ✅ 10,000+ utilizadores
- ✅ 100% universidades catalogadas
- ✅ 5+ parcerias institucionais
- **KPI**: 500+ active users/dia

### Milestone 4: Monetização (Mês 9)
- ✅ Primeiro paid plan
- ✅ 3+ instituições pagantes
- **KPI**: MRR > $1,000

### Milestone 5: Expansão (Mês 12)
- ✅ Lançamento em segundo país (Angola)
- ✅ 50,000+ utilizadores
- **KPI**: 20% do tráfego internacional

---

## 🚧 Riscos & Mitigação

### Riscos Técnicos

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Performance issues (scale) | Alto | Médio | Caching, CDN, optimization |
| Security breach | Alto | Baixo | RLS, audits, penetration testing |
| Data loss | Alto | Baixo | Backups, PITR, redundancy |
| Third-party downtime (Supabase) | Médio | Baixo | Status monitoring, fallbacks |

### Riscos de Negócio

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Baixa adoção | Alto | Médio | Marketing, partnerships, SEO |
| Competição | Médio | Médio | Diferenciação, quality, speed |
| Falta de conteúdo | Alto | Baixo | Partnerships, automation, team |
| Questões legais | Médio | Baixo | T&C, legal review, compliance |

---

## 👥 Equipa & Recursos

### Atual (Solo)
- **Developer/Founder**: Alcino Chivangue
  - Full-stack development
  - Product management
  - Marketing

### Necessidades Futuras (6-12 meses)

- **Content Manager** (Part-time)
  - Curate opportunities
  - Write blog posts
  - Social media

- **Designer** (Freelance)
  - Brand identity
  - Marketing materials
  - UI improvements

- **Developer** (Part-time, then full-time)
  - Features development
  - Maintenance
  - Mobile app

### Ferramentas & Budget

| Item | Custo/mês | Notas |
|------|-----------|-------|
| Supabase | $0-25 | Free tier initially |
| Vercel | $0-20 | Hobby/Pro plan |
| Domain | $1-2 | .co.mz |
| Email | $0-6 | Google Workspace |
| Analytics | $0 | Vercel Analytics |
| **Total** | **$1-53** | Escalável |

---

## 📚 Recursos & Referências

### Documentation
- [TanStack Start Docs](https://tanstack.com/start)
- [TanStack Router Docs](https://tanstack.com/router)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Learning Resources
- [TanStack Start Tutorial](https://tanstack.com/start/latest/docs/overview)
- [Supabase Crash Course](https://supabase.com/docs/guides/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community
- [TanStack Discord](https://discord.com/invite/tanstack)
- [Supabase Discord](https://discord.supabase.com/)
- [Mozambique Tech Community](https://mozdevs.com)

---

## ✅ Checklist de Pré-Launch

### Técnico
- [ ] Todos os testes passando
- [ ] Lighthouse score >90
- [ ] SEO perfeito (meta tags, sitemap, robots.txt)
- [ ] Formulários validados
- [ ] Error handling robusto
- [ ] Analytics configurado
- [ ] Backup strategy
- [ ] Security audit

### Conteúdo
- [ ] 100+ oportunidades
- [ ] 50+ universidades
- [ ] Sobre nós
- [ ] FAQ
- [ ] Contacto
- [ ] Blog (3+ posts)

### Legal
- [ ] Termos de serviço
- [ ] Política de privacidade
- [ ] Cookie policy
- [ ] RGPD compliance

### Marketing
- [ ] Social media accounts
- [ ] Email templates
- [ ] Press kit
- [ ] Launch announcement

### Operations
- [ ] Support email
- [ ] Monitoring & alerting
- [ ] Incident response plan
- [ ] Documentation

---

## 🎉 Success Criteria

### Phase 1 (MVP) - Success if:
- ✅ App deployed and stable
- ✅ 100+ quality opportunities
- ✅ 50+ universities catalogued
- ✅ <3s page load
- ✅ Zero critical bugs

### Phase 2 (3 months) - Success if:
- ✅ 1,000+ registered users
- ✅ 10+ daily applications
- ✅ 3+ university partnerships
- ✅ Positive user feedback (4+/5)

### Phase 3 (6 months) - Success if:
- ✅ 10,000+ users
- ✅ 100+ daily active users
- ✅ 10+ institutional partnerships
- ✅ First revenue generated

---

**Next Steps**: Iniciar Fase 1, Semana 1-2 - Setup & Infraestrutura

**Last Updated**: 18 Novembro 2025
