import { Link } from '@tanstack/react-router'

import { CONTACT_EMAIL } from '@/lib/site'

import { LegalPage, type LegalSection } from './LegalPage'

const email = (
  <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand hover:underline">
    {CONTACT_EMAIL}
  </a>
)

const sections: LegalSection[] = [
  {
    title: 'Que dados recolhemos',
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Dados da conta: nome, email e a tua password, guardada apenas em forma cifrada.</li>
        <li>Actividade na plataforma: oportunidades que guardas e informações incorrectas que reportas.</li>
        <li>Dados técnicos: endereço IP e registos de acesso, usados para segurança e prevenção de abusos.</li>
      </ul>
    ),
  },
  {
    title: 'Para que os usamos',
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Criar e gerir a tua conta e permitir que inicies sessão.</li>
        <li>Guardar as tuas oportunidades favoritas.</li>
        <li>Enviar emails necessários, como a verificação de email e a recuperação de password.</li>
        <li>Proteger a plataforma contra acessos indevidos e abusos.</li>
      </ul>
    ),
  },
  {
    title: 'Com quem partilhamos',
    body: (
      <>
        <p>Não vendemos os teus dados. Recorremos a prestadores de serviços que os tratam apenas por nossa conta: alojamento e rede (Cloudflare), envio de email (Resend) e armazenamento de imagens (Supabase).</p>
        <p>Alguns destes prestadores estão fora de Moçambique, pelo que os teus dados podem ser tratados noutros países.</p>
      </>
    ),
  },
  {
    title: 'Cookies',
    body: <p>Usamos apenas um cookie essencial, que mantém a tua sessão iniciada. Não usamos cookies de publicidade nem de análise.</p>,
  },
  {
    title: 'Durante quanto tempo guardamos',
    body: <p>Guardamos os dados da conta enquanto ela estiver activa. Se desactivares a conta, ela deixa de estar acessível; para pedires a eliminação definitiva dos teus dados escreve-nos para {email}.</p>,
  },
  {
    title: 'Os teus direitos',
    body: (
      <p>
        Podes consultar e corrigir o teu nome na <Link to="/account" className="font-semibold text-brand hover:underline">página da tua conta</Link>, desactivar a conta a qualquer momento e pedir-nos o acesso, a correcção ou a eliminação dos teus dados através de {email}.
      </p>
    ),
  },
  {
    title: 'Segurança',
    body: <p>Protegemos os teus dados com ligações cifradas, passwords cifradas e acesso restrito aos sistemas. Nenhum sistema é totalmente seguro, por isso usa uma password única.</p>,
  },
  {
    title: 'Menores',
    body: <p>A plataforma destina-se a pessoas com 16 anos ou mais. Se tiveres conhecimento de que um menor de 16 anos criou uma conta, contacta-nos.</p>,
  },
  {
    title: 'Alterações e contacto',
    body: <p>Podemos actualizar esta política; a data no topo indica a versão em vigor. Para qualquer questão sobre privacidade, escreve-nos para {email}.</p>,
  },
]

export function PrivacyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      updatedAt="27 de setembro de 2026"
      intro="Esta política explica que dados pessoais o Oportunidades recolhe, porquê, e que controlo tens sobre eles."
      sections={sections}
    />
  )
}
