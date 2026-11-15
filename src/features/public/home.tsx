import SiteFooter from '@/components/SiteFooter'
import { ArticlesSection } from './home/components/ArticlesSection'
import { CategorySection } from './home/components/CategorySection'
import { CommunitySection } from './home/components/CommunitySection'
import { HeroSection } from './home/components/HeroSection'
import { HomeCtaSection } from './home/components/HomeCtaSection'
import { ScholarshipSection } from './home/components/ScholarshipSection'
import { StepsSection } from './home/components/StepsSection'
import { RecommendationSection } from './home/components/RecommendationSection'

export function PublicHomePage() {
  return (
    <main className="bg-white text-navy [&_a]:text-sm [&_button]:text-sm [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:tracking-tight [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-tight [&_h3]:text-base [&_h3]:font-semibold [&_h3]:leading-snug [&_p]:text-sm [&_p]:leading-6 md:[&_h1]:text-[28px]">
      <HeroSection />
      <CommunitySection />
      <CategorySection />
      <ScholarshipSection />
      <RecommendationSection />
      <StepsSection />
      <ArticlesSection />
      <HomeCtaSection />
      <SiteFooter variant="home" />
    </main>
  )
}
