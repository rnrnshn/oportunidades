# Oportunidades - Project Documentation Package

**Date Created**: November 18, 2025  
**Version**: 1.0  
**Status**: Ready for Development

---

## 📦 Package Contents

This package contains all the documentation needed to start developing Oportunidades, a platform for academic and professional opportunities in Mozambique.

### Files Included

1. **README.md** (15 KB)
   - Comprehensive project overview
   - Tech stack details
   - Architecture explanation
   - Installation instructions
   - Contributing guidelines
   - Deployment information

2. **PLAN.md** (25 KB)
   - Detailed 16-week development roadmap
   - Phase-by-phase breakdown
   - Tasks and deliverables
   - Milestones and KPIs
   - Risk mitigation strategies
   - Post-launch operations plan

3. **OPORTUNIDADES_SKILL.md** (12 KB)
   - Claude AI development assistant skill
   - Architecture patterns
   - Code examples
   - Common tasks and solutions
   - Database schema reference
   - Best practices

4. **QUICKSTART.md** (8 KB)
   - 15-minute setup guide
   - Step-by-step instructions
   - Common issues and solutions
   - Development workflow
   - Helpful commands

5. **init-repo.sh** (5 KB)
   - Automated repository setup script
   - Creates GitHub repository
   - Initializes git
   - Generates necessary files

---

## 🎯 Quick Overview

### What is Oportunidades?

A Server-Side Rendered (SSR) platform built with TanStack Start that helps Mozambican youth discover:
- 📚 Scholarships (Bolsas de Estudo)
- 💼 Internships (Estágios)
- 🏢 Jobs (Empregos)
- 🎓 University information and courses

### Key Features

- ✅ Perfect SEO with Server-Side Rendering
- ✅ Type-safe with TypeScript end-to-end
- ✅ Secure backend with Supabase & Row Level Security
- ✅ Mobile-first responsive design
- ✅ Real-time updates
- ✅ Admin dashboard for content management

### Tech Stack

```
Frontend:  TanStack Start (SSR) + React + TypeScript
Router:    TanStack Router (type-safe)
State:     TanStack Query (server state)
Backend:   Supabase (PostgreSQL + Auth + Storage)
Styling:   Tailwind CSS + Shadcn/ui
Deploy:    Vercel
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm)
- Git
- GitHub account
- Supabase account (free)

### Quick Start (15 minutes)

```bash
# 1. Run initialization script
chmod +x init-repo.sh
./init-repo.sh

# 2. Initialize TanStack Start project
npm create @tanstack/start@latest
cd oportunidades
pnpm install

# 3. Configure Supabase
# - Create project at supabase.com
# - Copy API keys to .env

# 4. Start development
pnpm dev
```

**Full instructions**: See [QUICKSTART.md](QUICKSTART.md)

---

## 📅 Development Timeline

### Phase 1: MVP (Weeks 1-6)
- Setup infrastructure
- Build opportunities module
- Create university catalog (70%)
- Implement authentication

### Phase 2: Consolidation (Weeks 7-10)
- Complete university catalog
- Add user features (bookmarks, reports)
- Build admin dashboard

### Phase 3: Polish & Launch (Weeks 11-16)
- UI/UX refinement
- Performance optimization
- Testing & QA
- Public launch

**Detailed timeline**: See [PLAN.md](PLAN.md)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────┐
│          Client (Browser)                    │
│  - React Components (SSR Hydrated)          │
│  - TanStack Router (Type-safe routes)       │
│  - TanStack Query (Client state)            │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│          TanStack Start (SSR)                │
│  - Server Functions                          │
│  - Route Loaders                             │
│  - Meta & SEO                                │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│          Supabase Backend                    │
│  - PostgreSQL Database                       │
│  - Row Level Security (RLS)                  │
│  - Authentication                            │
│  - Storage                                   │
└─────────────────────────────────────────────┘
```

---

## 📊 Key Metrics & Goals

### Launch (Month 1)
- 100+ opportunities listed
- 50+ universities cataloged
- <3s page load time
- 100/100 Lighthouse score

### Product-Market Fit (Month 3)
- 1,000+ registered users
- 50+ applications/week
- 70%+ user retention

### Growth (Month 6)
- 10,000+ users
- 100+ daily active users
- 5+ institutional partnerships
- 100% universities cataloged

### Monetization (Month 9)
- First premium plans launched
- 3+ paying institutions
- $1,000+ MRR

---

## 🔐 Security & Best Practices

### Database Security
- Row Level Security (RLS) on all tables
- Service role key only on server
- Type-safe queries with generated types

### Authentication
- Supabase Auth (email/password)
- Protected admin routes
- Role-based access control (user/admin/super_admin)

### Performance
- Server-Side Rendering (SSR)
- Code splitting
- Image optimization
- Caching strategies

### SEO
- Dynamic meta tags per page
- Structured data (Schema.org)
- Dynamic sitemap generation
- Open Graph tags

---

## 📚 Database Schema

### Core Tables

**opportunities**
- Scholarships, internships, jobs
- Types: bolsa, estagio, emprego, workshop, competicao
- Status: active, expired, draft
- Public read, admin write

**universities**
- University catalog for Mozambique
- Type: publica, privada
- Verification status
- Public read

**courses**
- Courses offered by universities
- Degree types: licenciatura, mestrado, doutoramento
- Modality: presencial, distancia, hibrido

**profiles**
- User profiles (extends auth.users)
- Role: user, admin, super_admin

**saved_opportunities**
- User bookmarks
- User-specific access

---

## 🛠️ Development Tools

### Required
- VS Code (or your preferred editor)
- Git
- Node.js 18+
- pnpm

### Recommended VS Code Extensions
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Supabase

### CLI Tools
```bash
# TanStack Start
npm create @tanstack/start@latest

# Supabase CLI
npm install -g supabase

# Shadcn/ui
pnpm dlx shadcn-ui@latest
```

---

## 📖 Documentation Structure

### For Development
1. Start with **QUICKSTART.md** - Get running in 15 minutes
2. Reference **OPORTUNIDADES_SKILL.md** - Patterns and examples
3. Follow **PLAN.md** - Week-by-week roadmap

### For Context
1. Read **README.md** - Full project overview
2. Check architecture section - Understand structure
3. Review database schema - Data model

### For Operations
1. Deployment section in README
2. Post-launch plan in PLAN.md
3. Monitoring and maintenance guides

---

## 🤝 Contributing

This project is open for contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Areas That Need Help
- Content curation (opportunities)
- University data collection
- Portuguese translations
- UI/UX improvements
- Testing

---

## 📞 Contact & Support

- **Email**: contacto@oportunidades.co.mz
- **GitHub**: [github.com/your-username/oportunidades](https://github.com/your-username/oportunidades)
- **Documentation Issues**: Open an issue on GitHub

---

## 📝 Next Steps

### Immediate (Today)
1. ✅ Review all documentation
2. ✅ Set up development environment (QUICKSTART.md)
3. ✅ Create GitHub repository (init-repo.sh)
4. ✅ Initialize TanStack Start project

### This Week (Week 1-2)
1. 📝 Configure Supabase
2. 📝 Create database schema
3. 📝 Set up authentication
4. 📝 Build first route

### Next 2 Weeks (Week 3-4)
1. 📝 Build opportunities listing
2. 📝 Create opportunity details page
3. 📝 Implement search and filters

### Follow PLAN.md for complete 16-week roadmap

---

## ⚡ Key Commands Reference

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Start production server

# Database
supabase start              # Start local Supabase
supabase db reset           # Reset database
supabase gen types          # Generate TypeScript types

# Git
git checkout -b feature/x   # Create feature branch
git add .                   # Stage changes
git commit -m "message"     # Commit
git push                    # Push to GitHub

# UI Components
pnpm dlx shadcn-ui@latest add button  # Add Shadcn component
```

---

## 🎉 Success Criteria

### MVP Launch (Week 16)
- ✅ 100+ opportunities
- ✅ 50+ universities
- ✅ Perfect SEO (100/100)
- ✅ <3s page load
- ✅ Mobile responsive

### First 1000 Users (Month 3)
- ✅ Stable platform
- ✅ Daily content updates
- ✅ Positive user feedback
- ✅ University partnerships

### Sustainable Growth (Month 6)
- ✅ 10,000+ users
- ✅ Regular engagement
- ✅ Revenue generation
- ✅ Team expansion

---

## 📄 License

MIT License - Free to use, modify, and distribute with attribution.

---

## 🙏 Acknowledgments

- **TanStack** - For the amazing React ecosystem
- **Supabase** - For the powerful backend platform
- **Vercel** - For seamless deployment
- **Open Source Community** - For all the tools and libraries

---

**Version**: 1.0  
**Last Updated**: November 18, 2025  
**Maintained by**: Alcino Chivangue

**Made with ❤️ in Mozambique, for Mozambique**
