import { Link } from '@tanstack/react-router'

import { CONTACT_EMAIL } from '@/lib/site'

import { LegalPage, type LegalSection } from './LegalPage'

const sections: LegalSection[] = [
  {
    title: 'Aceitação',
    body: <p>Ao criares uma conta ou utilizares o Oportunidades, aceitas estes Termos de Utilização e a nossa <Link to="/privacidade" className="font-semibold text-brand hover:underline">Política de Privacidade</Link>. Se não concordares, não utilizes a plataforma.</p>,
  },
  {
    title: 'O serviço',
    body: (
      <>
        <p>O Oportunidades reúne informação sobre bolsas de estudo, universidades, cursos, estágios, empregos e outras oportunidades, publicada pela nossa equipa e por parceiros.</p>
        <p>Não somos a entidade que concede as bolsas nem que contrata. As candidaturas são feitas directamente junto de cada instituição, nos termos por ela definidos.</p>
      </>
    ),
  },
  {
    title: 'A tua conta',
    body: (
      <>
        <p>Para usares funcionalidades como guardar oportunidades precisas de uma conta. Deves fornecer informação verdadeira, manter a tua password em segurança e avisar-nos se suspeitares de utilização não autorizada.</p>
        <p>Deves ter pelo menos 16 anos. Se tiveres menos de 18 anos, confirma que tens autorização do teu encarregado de educação.</p>
      </>
    ),
  },
  {
    title: 'Utilização aceitável',
    body: <p>Não podes utilizar a plataforma para publicar informação falsa ou enganosa, fazer-te passar por outra pessoa, recolher dados de outros utilizadores, sobrecarregar ou tentar aceder sem autorização aos nossos sistemas, nem para qualquer fim ilegal.</p>,
  },
  {
    title: 'Exactidão da informação',
    body: <p>Esforçamo-nos por manter a informação correcta e actualizada, mas prazos, valores e requisitos podem mudar sem aviso. Confirma sempre os detalhes junto da instituição antes de te candidatares. Se encontrares um erro, usa a opção "Reportar informação incorrecta".</p>,
  },
  {
    title: 'Ligações externas',
    body: <p>A plataforma inclui ligações para sites de terceiros, como páginas de candidatura. Não controlamos esses sites e não somos responsáveis pelo seu conteúdo nem pelas suas práticas.</p>,
  },
  {
    title: 'Propriedade intelectual',
    body: <p>O nome, a marca, o design e o conteúdo original do Oportunidades pertencem-nos ou aos respectivos titulares. Não os podes copiar ou reutilizar para fins comerciais sem autorização.</p>,
  },
  {
    title: 'Suspensão e desactivação',
    body: <p>Podes desactivar a tua conta a qualquer momento na página da tua conta. Podemos suspender ou encerrar contas que violem estes Termos.</p>,
  },
  {
    title: 'Limitação de responsabilidade',
    body: <p>A plataforma é disponibilizada tal como está. Na medida permitida por lei, não somos responsáveis por decisões tomadas com base na informação publicada, nem pelo resultado de candidaturas.</p>,
  },
  {
    title: 'Alterações a estes Termos',
    body: <p>Podemos actualizar estes Termos. Quando as alterações forem relevantes, avisaremos na plataforma ou por email. A data no topo indica a versão em vigor.</p>,
  },
  {
    title: 'Lei aplicável',
    body: <p>Estes Termos regem-se pela lei da República de Moçambique.</p>,
  },
  {
    title: 'Contacto',
    body: <p>Para qualquer questão sobre estes Termos, escreve-nos para <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand hover:underline">{CONTACT_EMAIL}</a>.</p>,
  },
]

export function TermsPage() {
  return (
    <LegalPage
      title="Termos de Utilização"
      updatedAt="27 de setembro de 2026"
      intro="Estes termos explicam as regras de utilização do Oportunidades. Lê-os com atenção antes de criares a tua conta."
      sections={sections}
    />
  )
}
