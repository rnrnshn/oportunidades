import { z } from 'zod'

import { universitiesMock } from '@/features/public/universities/api/mock-data'
import type { Course, CourseDetail } from './types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

const CourseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  university_id: z.string(),
  name: z.string(),
  area: z.string(),
  level: z.string(),
  regime: z.string(),
  duration_years: z.number().optional(),
  annual_fee: z.string().optional(),
})

const CoursesResponseSchema = z.object({
  data: z.array(CourseSchema),
})

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetch(`${API_URL}/v1/catalog/courses?per_page=100`)
    if (!response.ok) throw new Error('Não foi possível carregar cursos.')
    const parsed = CoursesResponseSchema.parse(await response.json())
    return parsed.data.map((item) => {
      const university = universitiesMock.find((entry) => entry.id === item.university_id)
      return {
        id: item.id,
        slug: item.slug,
        universityId: item.university_id,
        universityName: university?.name ?? 'Universidade por confirmar',
        location: university?.location,
        deadline: university?.deadline,
        name: item.name,
        area: item.area,
        level: item.level,
        regime: item.regime,
        durationYears: item.duration_years,
        annualFee: item.annual_fee,
      }
    })
  } catch {
    return mockCourses
  }
}

export const mockCourses: Course[] = universitiesMock.flatMap((university) =>
  (university.courses ?? []).map((course) => ({
    id: course.id,
    slug: course.slug,
    universityId: university.id,
    universityName: university.name,
    location: university.location,
    deadline: university.deadline,
    name: course.name,
    area: course.area,
    level: course.level,
    regime: course.regime,
    durationYears: course.duration_years,
    annualFee: course.annual_fee,
  }))
)

export async function getCourseDetail(slug: string): Promise<CourseDetail> {
  const course = mockCourses.find((item) => item.slug === slug) ?? mockCourses[0]
  if (!course) throw new Error('Curso não encontrado.')
  const isTechnology = course.area === 'Tecnologia'
  return {
    ...course,
    description: `O curso de ${course.name} prepara estudantes para responder a desafios profissionais da área de ${course.area}, combinando fundamentos teóricos, prática e projetos aplicados.`,
    learningObjectives: isTechnology
      ? ['Compreender os fundamentos da computação e da engenharia de software.', 'Aplicar métodos de programação, análise de sistemas, redes e bases de dados.', 'Desenvolver soluções tecnológicas adequadas às necessidades locais.', 'Promover inovação e trabalho colaborativo.']
      : [`Dominar os fundamentos essenciais de ${course.area}.`, 'Aplicar conhecimentos em situações profissionais e projetos reais.', 'Desenvolver pensamento crítico, comunicação e trabalho colaborativo.'],
    language: 'Português',
    instructionalTime: 'Diurno',
    faculty: course.area,
    admissionRequirements: ['Conclusão do Ensino Secundário Geral ou equivalente', 'Aprovação nos exames de admissão aplicáveis'],
    curriculum: Array.from({ length: course.durationYears ?? 3 }, (_, index) => ({
      year: `${index + 1}º Ano`,
      semesters: [
        { title: 'Semestre I', subjects: index === 0 ? ['Introdução à área', 'Matemática', 'Comunicação e Expressão', 'Metodologia de estudo'] : ['Unidade curricular obrigatória', 'Laboratório ou prática aplicada', 'Projeto interdisciplinar'] },
        { title: 'Semestre II', subjects: index === 0 ? ['Fundamentos profissionais', 'Métodos quantitativos', 'Tecnologias de informação', 'Projeto integrado'] : ['Unidade curricular avançada', 'Prática profissional', 'Seminário de investigação'] },
      ],
    })),
    locationDetails: [course.area, course.universityName, course.location ?? 'Localização por confirmar'],
  }
}
