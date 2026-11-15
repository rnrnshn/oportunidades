import type { ArticleDetail } from './api-detail'
import type { Article } from './api'

const articleDetails: Record<string, ArticleDetail> = {
  'como-preparar-candidatura': {
    id: '1',
    slug: 'como-preparar-candidatura',
    title: 'Como preparar uma candidatura que se destaca',
    excerpt: 'Um guia directo para organizar documentos, contar a tua história e evitar os erros mais comuns.',
    type: 'Guia',
    author_name: 'Equipa Oportunidades',
    published_at: '2026-09-24',
    cover_image_url: '/graduation.png',
    content: '<p>Uma boa candidatura não começa no formulário. Começa quando percebes o que a oportunidade procura e consegues relacionar esses critérios com aquilo que já fizeste.</p><h2>Começa pelos requisitos</h2><p>Lê o anúncio por inteiro e separa os requisitos obrigatórios dos desejáveis. Cria uma lista curta com documentos, datas e exemplos que comprovem a tua experiência.</p><h2>Adapta a tua história</h2><p>Evita enviar exactamente o mesmo texto para todas as oportunidades. Explica por que esta oportunidade faz sentido para o teu percurso e usa exemplos concretos de projectos, actividades ou resultados.</p><h2>Revê antes de enviar</h2><ul><li>Confirma nomes, datas e contactos.</li><li>Usa nomes de ficheiro claros.</li><li>Pede a outra pessoa para rever o texto.</li><li>Guarda uma cópia de tudo o que enviaste.</li></ul><h2>Depois da candidatura</h2><p>Regista o prazo e a data de envio. Se houver contacto para esclarecimentos, faz perguntas específicas e profissionais. Uma candidatura organizada também facilita a preparação para uma possível entrevista.</p>',
  },
  'escolher-curso-certo': {
    id: '2', slug: 'escolher-curso-certo', title: '5 perguntas antes de escolher um curso', type: 'Editorial', author_name: 'Equipa Oportunidades', published_at: '2026-09-18', cover_image_url: '/ready-graduation.png',
    excerpt: 'Critérios práticos para comparar opções sem perder de vista os teus objectivos.',
    content: '<p>Escolher um curso é mais simples quando transformas uma decisão grande em perguntas concretas.</p><h2>Que problemas quero aprender a resolver?</h2><p>Pensa nas actividades que te dão energia e nos temas sobre os quais tens curiosidade contínua.</p><h2>Como quero estudar?</h2><p>Compara modalidade, horário, duração e localização. A melhor opção é também aquela que consegues frequentar de forma sustentável.</p><h2>Que portas este curso abre?</h2><p>Consulta o plano curricular, as saídas profissionais e fala com estudantes ou profissionais da área.</p><h2>Quanto vai custar no total?</h2><p>Inclui propinas, transporte, alojamento, materiais e tempo. Procura bolsas antes de excluir uma boa opção.</p><h2>Qual é o meu plano alternativo?</h2><p>Escolhe duas ou três opções coerentes para não dependeres de uma única candidatura.</p>',
  },
  'primeiro-emprego': {
    id: '3', slug: 'primeiro-emprego', title: 'Do campus ao primeiro emprego', type: 'Carreira', author_name: 'Equipa Oportunidades', published_at: '2026-09-07', cover_image_url: '/home-figma/image-10.png',
    excerpt: 'Como transformar experiências académicas em argumentos fortes para recrutadores.',
    content: '<p>Não precisas de muitos anos de experiência para demonstrar valor. Projectos académicos, voluntariado e associações também mostram como trabalhas.</p><h2>Traduz experiência em competências</h2><p>Em vez de listar tarefas, explica o problema, o teu contributo e o resultado alcançado.</p><h2>Constrói provas</h2><p>Organiza trabalhos, apresentações, código, relatórios ou recomendações que possas mostrar durante o processo.</p><h2>Prepara uma apresentação curta</h2><p>Resume quem és, o que sabes fazer e o tipo de problema que queres ajudar a resolver.</p>',
  },
}

export function getMockArticleDetail(slug: string) {
  return articleDetails[slug] ?? articleDetails['como-preparar-candidatura']
}

export function getMockRelatedArticles(slug: string): Article[] {
  return Object.values(articleDetails)
    .filter((article) => article.slug !== slug)
    .map(({ content: _content, seo_title: _seoTitle, seo_description: _seoDescription, ...article }) => article)
    .slice(0, 3)
}
