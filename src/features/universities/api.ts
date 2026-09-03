import { z } from 'zod'

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
  entry_requirements: z.string().optional(),
})

const UniversityFeeSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  value: z.string(),
  sort_order: z.number(),
})

const UniversityScholarshipSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  amount: z.string().optional(),
  status: z.string(),
  provider: z.string().optional(),
  provider_name: z.string().optional(),
  deadline: z.string().optional(),
  sort_order: z.number(),
})

export const UniversityDetailSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  type: z.string(),
  province: z.string(),
  city: z.string().optional(),
  country: z.string(),
  description: z.string().optional(),
  logo_url: z.string().optional(),
  campus_image_url: z.string().optional(),
  website: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  founded_year: z.number().optional(),
  address: z.string().optional(),
  map_url: z.string().optional(),
  academic_calendar: z.string().optional(),
  student_count: z.number().optional(),
  admissions_deadline: z.string().optional(),
  tags: z.array(z.string()),
  fields: z.array(z.string()).optional(),
  courses: z.array(CourseSchema).optional(),
  fees: z.array(UniversityFeeSchema).optional(),
  scholarships: z.array(UniversityScholarshipSchema).optional(),
  verified: z.boolean(),
  i_applied: z.boolean().optional(),
  overview_costs: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      items: z.array(z.string()),
    })
  ).optional(),
  overview_admission: z.object({
    title: z.string(),
    items: z.array(z.string()),
  }).optional(),
  program_details: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ).optional(),
  learning_objectives: z.array(z.string()).optional(),
  curriculum: z.array(
    z.object({
      year: z.string(),
      semesters: z.array(
        z.object({
          title: z.string(),
          courses: z.array(z.string()),
        })
      ),
    })
  ).optional(),
  location_details: z.array(z.string()).optional(),
  more_info_url: z.string().optional(),
})

const UniversityDetailResponseSchema = z.object({
  data: UniversityDetailSchema,
})

export type UniversityDetail = z.infer<typeof UniversityDetailSchema>

type UniversityDetailExtras = {
  overview_costs?: Array<{ title: string; subtitle?: string; items: string[] }>
  overview_admission?: { title: string; items: string[] }
  program_details?: Array<{ label: string; value: string }>
  learning_objectives?: string[]
  curriculum?: Array<{ year: string; semesters: Array<{ title: string; courses: string[] }> }>
  location_details?: string[]
  more_info_url?: string
}

const universityDetailExtras: Record<string, UniversityDetailExtras> = {
  isctem: {
    overview_costs: [
      {
        title: 'Custos',
        subtitle: 'Total tuition fee: 20,000 MZN*',
        items: ['First tuition fee instalment: 20,000 MZN*'],
      },
    ],
    overview_admission: {
      title: 'Requisitos de Admissão',
      items: ['Exames de Admissão: Matemática, Física', 'Ensino Secundário Geral ou equivalente'],
    },
    program_details: [
      { label: 'Duração', value: '4 anos (8 semestres)' },
      { label: 'Language of instruction', value: 'Português' },
      { label: 'Teaching form', value: 'Course, On-campus' },
      { label: 'Instructional time', value: 'Daytime' },
      { label: 'Faculdade', value: 'Engineering' },
    ],
    learning_objectives: [
      'Compreender os princípios fundamentais da computação e engenharia de software.',
      'Aplicar métodos e técnicas de programação, análise de sistemas, redes e bases de dados.',
      'Desenvolver soluções informáticas adequadas às necessidades locais e internacionais.',
      'Promover a inovação e o empreendedorismo tecnológico.',
    ],
    curriculum: [
      {
        year: '1º Ano',
        semesters: [
          {
            title: 'Semestre I',
            courses: ['Introdução à Programação', 'Matemática Discreta', 'Álgebra Linear', 'Comunicação e Expressão'],
          },
          {
            title: 'Semestre II',
            courses: ['Introdução à Programação', 'Matemática Discreta', 'Álgebra Linear', 'Comunicação e Expressão'],
          },
        ],
      },
      {
        year: '2º Ano',
        semesters: [
          {
            title: 'Semestre I',
            courses: ['Estruturas de Dados', 'Matemática Aplicada', 'Sistemas Digitais', 'Estatística'],
          },
          {
            title: 'Semestre II',
            courses: ['Algoritmos Avançados', 'Bases de Dados', 'Arquitetura de Computadores', 'Projeto Integrado'],
          },
        ],
      },
       {
        year: '3º Ano',
        semesters: [
          {
            title: 'Semestre I',
            courses: ['Estruturas de Dados', 'Matemática Aplicada', 'Sistemas Digitais', 'Estatística'],
          },
          {
            title: 'Semestre II',
            courses: ['Algoritmos Avançados', 'Bases de Dados', 'Arquitetura de Computadores', 'Projeto Integrado'],
          },
        ],
      },
       {
        year: '4º Ano',
        semesters: [
          {
            title: 'Semestre I',
            courses: ['Estruturas de Dados', 'Matemática Aplicada', 'Sistemas Digitais', 'Estatística'],
          },
          {
            title: 'Semestre II',
            courses: ['Algoritmos Avançados', 'Bases de Dados', 'Arquitetura de Computadores', 'Projeto Integrado'],
          },
        ],
      },
    ],
    location_details: ['Faculdade de Engenharia', 'Campus Principal da UEM', 'Av. Julius Nyerere, Maputo – Moçambique'],
    more_info_url: 'https://www.uem.mz',
  },
}

import { universitiesMock } from '@/features/public/universities/api/mock-data'
import { scholarshipsMock } from '@/features/public/scholarships/api/mock-data'

export async function fetchUniversityDetail(slug: string): Promise<UniversityDetail> {
  // Check mock data first for testing
  const mockUniversity = universitiesMock.find((u) => u.id === slug)
  if (mockUniversity) {
    const relatedScholarships = scholarshipsMock
      .filter((scholarship) =>
        scholarship.country === mockUniversity.country ||
        scholarship.location.includes(mockUniversity.country) ||
        scholarship.location.includes(mockUniversity.location.split(',')[1]?.trim() ?? '') ||
        scholarship.modality === 'Online'
      )
      .slice(0, 5)

    const details = universityDetailExtras[mockUniversity.id]

    return {
      id: mockUniversity.id,
      slug: mockUniversity.id,
      name: mockUniversity.name,
      type: mockUniversity.type,
      province: 'Province',
      city: mockUniversity.location.split(',')[0],
      country: mockUniversity.country,
      email: mockUniversity.email,
      phone: mockUniversity.phone,
      description: `Instituição de ensino superior com programas em ${mockUniversity.fields.join(', ')}.`,
      tags: mockUniversity.tags ?? [],
      fields: mockUniversity.fields ?? [],
      courses: mockUniversity.courses ?? undefined,
      fees: mockUniversity.fees ?? undefined,
      scholarships: relatedScholarships.map((scholarship, index) => ({
        id: scholarship.id,
        name: scholarship.title,
        amount: scholarship.amountRange,
        status: scholarship.type,
        provider: scholarship.provider,
        deadline: scholarship.deadline,
        sort_order: index + 1,
      })),
      verified: true,
      i_applied: mockUniversity.i_applied ?? false,
      ...(details ?? {}),
    }
  }

  const response = await fetch(`${API_URL}/v1/catalog/universities/${slug}`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar a universidade.')
  }

  const body = await response.json()
  return UniversityDetailResponseSchema.parse(body).data
}
