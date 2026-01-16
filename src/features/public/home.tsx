import SiteFooter from '@/components/SiteFooter'
import { ArticlesSection } from './home/components/ArticlesSection'
import { CategorySection } from './home/components/CategorySection'
import { CommunitySection } from './home/components/CommunitySection'
import { HeroSection } from './home/components/HeroSection'
import { ScholarshipSection } from './home/components/ScholarshipSection'
import { StepsSection } from './home/components/StepsSection'

export function PublicHomePage() {
  return (
    <main className="bg-white text-navy">
      <HeroSection />
      <CategorySection />
      <StepsSection />
      <ArticlesSection />
      <ScholarshipSection />
      <CommunitySection />
      <SiteFooter />
    </main>
  )
}
