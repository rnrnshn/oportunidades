import { useState } from 'react'
import { useLoaderData } from '@tanstack/react-router'
import { CheckCircle2, FileText } from 'lucide-react'

import { TaskPage } from '@/components/layout/TaskPage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ApplicationPage() {
  const opportunity = useLoaderData({ from: '/candidaturas/$slug' })
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <TaskPage title="Candidatura enviada" backTo="/empregos" backLabel="Voltar aos empregos">
        <div role="status" className="max-w-xl rounded-2xl border border-[#b7dac7] bg-[#f0faf4] p-6">
          <CheckCircle2 className="size-8 text-[#176b3a]" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-navy">Recebemos a tua candidatura</h2>
          <p className="mt-2 leading-7 text-[#525252]">A candidatura para {opportunity.title} foi registada. Guarda uma cópia dos documentos enviados.</p>
        </div>
      </TaskPage>
    )
  }

  return (
    <TaskPage
      title={`Candidatura: ${opportunity.title}`}
      description={`Envia os teus dados para ${opportunity.entity_name}. Confirma tudo antes de concluir.`}
      backTo={`/oportunidades/${opportunity.slug}`}
      backLabel="Voltar à vaga"
      aside={<ApplicationSummary title={opportunity.title} entity={opportunity.entity_name} deadline={opportunity.deadline} />}
    >
      <form className="max-w-2xl space-y-5 rounded-2xl border border-[var(--surface-border)] p-5 sm:p-7" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
        <h2 className="text-xl font-bold text-navy">Os teus dados</h2>
        <Field label="Nome completo" htmlFor="application-name"><Input id="application-name" autoComplete="name" required /></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" htmlFor="application-email"><Input id="application-email" type="email" autoComplete="email" required /></Field>
          <Field label="Telefone" htmlFor="application-phone"><Input id="application-phone" type="tel" autoComplete="tel" required placeholder="Ex.: 84 123 4567" /></Field>
        </div>
        <Field label="Currículo" htmlFor="application-cv"><Input id="application-cv" type="file" accept=".pdf,.doc,.docx" required /><p className="text-sm text-[#525252]">PDF ou Word, até 5 MB.</p></Field>
        <Field label="Mensagem para a entidade" htmlFor="application-message"><Textarea id="application-message" rows={5} placeholder="Resume por que tens interesse e experiência adequada." /></Field>
        <label className="flex items-start gap-3 text-sm leading-6 text-[#525252]"><input type="checkbox" required className="mt-1 size-5 shrink-0 rounded border border-[#767676] accent-[var(--field-focus)] focus-visible:ring-2 focus-visible:ring-[var(--field-focus)] focus-visible:ring-offset-2" /><span>Confirmo que os dados enviados são correctos e autorizo o seu uso nesta candidatura.</span></label>
        <Button type="submit" className="w-full sm:w-auto">Enviar candidatura</Button>
      </form>
    </TaskPage>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return <div className="space-y-2"><label htmlFor={htmlFor} className="block font-semibold text-navy">{label}</label>{children}</div>
}

function ApplicationSummary({ title, entity, deadline }: { title: string; entity: string; deadline?: string }) {
  return <div className="rounded-2xl border border-[var(--surface-border)] bg-[#f7f9fc] p-5"><FileText className="size-6 text-brand" aria-hidden="true" /><h2 className="mt-3 font-bold text-navy">{title}</h2><p className="mt-1 text-sm text-[#525252]">{entity}</p>{deadline ? <p className="mt-4 border-t border-[var(--surface-border)] pt-4 text-sm"><span className="block text-[#525252]">Prazo</span><strong className="text-navy">{new Date(`${deadline}T12:00:00`).toLocaleDateString('pt-MZ', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></p> : null}</div>
}
