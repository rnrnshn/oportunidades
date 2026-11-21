import SiteFooter from '@/components/SiteFooter'
import { ArticlesSection } from './home/components/ArticlesSection'
import { CategorySection } from './home/components/CategorySection'
import { CommunitySection } from './home/components/CommunitySection'
import { HeroSection } from './home/components/HeroSection'
import { ScholarshipSection } from './home/components/ScholarshipSection'
import { StepsSection } from './home/components/StepsSection'
import { RecommendationSection } from './home/components/RecommendationSection'
import { WorkOpportunitiesSection } from './home/components/WorkOpportunitiesSection'
import { useHomeWorkOpportunities } from './home/hooks/use-home-work-opportunities'

export function PublicHomePage() {
  const { opportunities } = useHomeWorkOpportunities()

  return (
    <main className="bg-white text-navy [&_a]:text-sm [&_button]:text-sm [&_p]:text-sm [&_p]:leading-6">
      <HeroSection />
      <CommunitySection />
      <CategorySection />
      <ScholarshipSection />
      <WorkOpportunitiesSection opportunities={opportunities} />
      <RecommendationSection />
      <StepsSection />
      <ArticlesSection />
      <SiteFooter variant="home" />
    </main>
  )
}
