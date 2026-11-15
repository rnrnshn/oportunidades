import type { OpportunityDetail } from './api-detail'
import { jobsMock } from './mock-data'

const descriptions: Record<string, string> = {
  'quality-assurance-officer': 'Apoiar a melhoria contínua dos processos operacionais, acompanhar indicadores de qualidade e colaborar com equipas para resolver desvios de forma consistente.',
  'supervisor-de-construcao': 'Coordenar actividades no terreno, acompanhar prazos, segurança e qualidade da execução, garantindo uma comunicação clara entre equipas técnicas e parceiros.',
  'programador-frontend-junior': 'Integrar a equipa de produto para desenvolver interfaces acessíveis, rápidas e responsivas. A pessoa seleccionada colaborará com design e engenharia na entrega de experiências digitais úteis.',
  'assistente-de-comunicacao': 'Apoiar a produção de conteúdos, organização de campanhas e comunicação com parceiros e comunidades.',
  'analista-financeiro': 'Apoiar análises financeiras, controlo orçamental e preparação de informação para decisões de gestão.',
  'tecnico-de-campo-agricola': 'Acompanhar produtores, recolher dados de campo e apoiar a implementação de boas práticas agrícolas.',
}

export function getMockOpportunityDetail(slug: string): OpportunityDetail {
  const job = jobsMock.find((item) => item.slug === slug) ?? jobsMock[2]
  return {
    id: job.id,
    slug: job.slug,
    title: job.title,
    type: job.type,
    entity_name: job.entityName,
    description: descriptions[job.slug] ?? descriptions['programador-frontend-junior'],
    requirements: `Formação relevante para ${job.area ?? 'a função'}\nBoa capacidade de comunicação e trabalho em equipa\nOrganização, autonomia e atenção ao detalhe\nDisponibilidade para trabalhar em ${job.location ?? 'Moçambique'}`,
    eligibility: `Candidatos em início ou desenvolvimento de carreira\nResidência em Moçambique\nDisponibilidade para o regime ${job.workMode?.toLowerCase() ?? 'indicado'}`,
    application_process: 'Revê os requisitos e actualiza o teu perfil\nPrepara o CV e uma breve apresentação\nSubmete a candidatura antes do prazo\nA entidade contactará apenas candidatos seleccionados',
    deadline: job.deadline,
    apply_url: '/account',
    external_url_label: 'Iniciar candidatura',
    country: job.country,
    location: job.location,
    is_remote: job.isRemote,
    language: 'Português',
    area: job.area,
    amount_currency: 'MZN',
    coverage: [job.contractType ?? 'Contrato', job.workMode ?? 'Presencial', job.experienceLevel ?? 'Júnior'],
    degree_level: job.degreeLevel,
    program_area: job.area,
    verified: true,
    is_active: true,
  }
}
