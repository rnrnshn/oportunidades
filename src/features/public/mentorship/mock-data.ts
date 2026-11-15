import type { Mentor } from './api'

export type MentorProfile = Mentor & {
  slug: string
  location: string
  languages: string[]
  experience: string
  topics: string[]
  outcomes: string[]
}

export const mockMentorProfiles: MentorProfile[] = [
  {
    id: '1', user_id: 'mentor-1', slug: 'ana-mussa', user_name: 'Ana Mussá', headline: 'Engenheira de software e mentora de carreira', bio: 'Apoio estudantes e profissionais em início de carreira a construir um plano realista para entrar em tecnologia. Nas sessões, trabalhamos decisões concretas, portefólio e preparação para entrevistas.', expertise: 'Tecnologia', availability: '2 sessões por mês', is_active: true,
    location: 'Maputo · Sessões online', languages: ['Português', 'Inglês'], experience: '7 anos em produto e engenharia', topics: ['Transição para tecnologia', 'Portefólio', 'Entrevistas técnicas'], outcomes: ['Definir um próximo passo realista', 'Identificar lacunas prioritárias', 'Sair com um plano de acção'],
  },
  {
    id: '2', user_id: 'mentor-2', slug: 'celso-mabunda', user_name: 'Celso Mabunda', headline: 'Especialista em bolsas e mobilidade académica', bio: 'Partilho estratégias para encontrar programas adequados, interpretar requisitos e preparar candidaturas académicas mais fortes.', expertise: 'Bolsas de estudo', availability: 'Perguntas e respostas', is_active: true,
    location: 'Beira · Sessões online', languages: ['Português', 'Inglês'], experience: '9 anos em educação internacional', topics: ['Pesquisa de bolsas', 'Carta de motivação', 'Documentação'], outcomes: ['Escolher oportunidades compatíveis', 'Organizar documentos', 'Melhorar a narrativa da candidatura'],
  },
  {
    id: '3', user_id: 'mentor-3', slug: 'lidia-nhantumbo', user_name: 'Lídia Nhantumbo', headline: 'Gestora de talento e desenvolvimento', bio: 'Ajudo jovens a traduzir experiências académicas em competências relevantes para o mercado e a preparar os primeiros processos de recrutamento.', expertise: 'Carreira', availability: 'Conteúdo semanal', is_active: true,
    location: 'Maputo · Híbrido', languages: ['Português'], experience: '10 anos em gestão de talento', topics: ['Primeiro emprego', 'CV e LinkedIn', 'Entrevistas'], outcomes: ['Clarificar objectivos profissionais', 'Fortalecer a apresentação pessoal', 'Preparar entrevistas com confiança'],
  },
]

export const mockMentors: Mentor[] = mockMentorProfiles

export function getMockMentorProfile(slug: string) {
  return mockMentorProfiles.find((mentor) => mentor.slug === slug || mentor.id === slug) ?? mockMentorProfiles[0]
}
