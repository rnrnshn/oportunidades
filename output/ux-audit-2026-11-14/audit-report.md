# Auditoria geral de UI e UX — Oportunidades

Data: 14 de novembro de 2026

## Âmbito

Percurso analisado: descoberta na homepage, navegação móvel, pesquisa de cursos e empregos, filtros, detalhes de uma vaga, passagem para candidatura, artigos e mentoria. A análise prioriza pessoas com baixa literacia digital e utilização em telemóvel.

## Objectivo do utilizador

Encontrar uma oportunidade adequada, perceber se pode candidatar-se e saber exactamente qual é o próximo passo, sem precisar de compreender a arquitectura interna da plataforma.

## Pontos fortes

- Identidade visual coerente, com contraste e hierarquia geralmente claros.
- Linguagem próxima e orientada para objectivos em várias áreas da homepage.
- Breadcrumbs, títulos e resultados tornam a posição do utilizador relativamente compreensível.
- Checkboxes nos filtros expõem opções sem obrigar a aprender selectores complexos.
- Páginas de detalhe organizam requisitos, elegibilidade e passos de candidatura.

## Riscos prioritários

### P1 — Conteúdo expirado continua accionável

As listas apresentam cursos com prazos de 2024 e vagas cujo prazo já terminou, mas as páginas continuam a oferecer acções de candidatura. Isto reduz a confiança e pode fazer o utilizador gastar dados móveis e tempo numa candidatura impossível.

Recomendação: remover expirados dos resultados por defeito; mostrar “Candidatura encerrada” com baixo destaque; desactivar o CTA e oferecer alternativas semelhantes.

### P1 — O CTA de candidatura não conduz à candidatura

“Iniciar candidatura” e “Pedir mentoria” conduzem a uma página de perfil genérica. O contexto e a intenção perdem-se, e a página mistura dados fictícios e campos em inglês.

Recomendação: preservar a intenção durante autenticação e devolver o utilizador ao fluxo correcto. Antes de sair da plataforma, mostrar uma lista curta do que precisa e explicar se a candidatura é interna ou externa.

### P1 — Conteúdo prometido e conteúdo disponível não coincidem

A homepage apresenta artigos; a página de artigos apresenta estado vazio. Situação semelhante pode acontecer em mentoria. Isto transmite a sensação de que a plataforma está incompleta.

Recomendação: usar a mesma fonte de dados e fallback em todas as superfícies. Nunca mostrar contagens, cards ou CTAs sem destino disponível.

## Oportunidades de melhoria

### P2 — Navegação orientada por tarefas

“A Oportunidades”, “Estudar”, “Mais oportunidades” e “Recursos” exigem interpretação. Para este público, os destinos principais devem ser explícitos:

- Encontrar curso
- Encontrar bolsa
- Encontrar emprego
- Pedir orientação
- Aprender a candidatar-me

### P2 — Pesquisa com instruções visíveis

O placeholder “Bolsas em Maputo” parece um valor já escolhido e o botão móvel usa apenas um ícone. Colocar “O que procuras?” como rótulo visível, um exemplo abaixo do campo e “Pesquisar” no botão reduz a ambiguidade.

### P2 — Recomendação sem bloquear a tarefa principal

O banner de recomendação ocupa o topo de todas as páginas de pesquisa. É útil, mas compete com o objectivo de ver resultados. Torná-lo compacto no topo ou colocá-lo depois dos primeiros resultados.

### P2 — Filtros móveis precisam de encerramento claro

O painel ocupa o ecrã inteiro, todas as secções estão abertas e não existe uma acção persistente que explique o resultado. Adicionar um botão fixo “Ver 6 resultados”, contador de selecções e manter abertas apenas as categorias mais importantes.

### P2 — Cartões devem apoiar decisões rápidas

Priorizar título, instituição, localização, modalidade e prazo. Evitar longas descrições repetidas. Usar CTAs concretos como “Ver requisitos” ou “Ver como candidatar-me”.

### P2 — Estados de carregamento e vazio mais úteis

Durante o carregamento surge “0 resultados”, paginação e depois os cards. Mostrar skeletons, ocultar contagem e paginação até os dados chegarem. Estados vazios devem sugerir “Limpar filtros”, “Ver todas” ou uma categoria alternativa.

### P2 — Idioma e contexto local consistentes

Eliminar “Profile”, “Settings”, “First name”, “Open until” e valores em dólares quando o contexto usa português e meticais. Evitar identidades fictícias como “Jane Doe” num fluxo real.

### P3 — Reduzir peso e ruído

Optimizar imagens, evitar carrosséis indispensáveis e oferecer feedback claro em ligações lentas. Remover o botão de ferramentas de desenvolvimento da experiência apresentada ao público.

## Proposta de experiência guiada

1. Na homepage, começar com duas decisões grandes: “Quero estudar” e “Quero trabalhar”.
2. Depois perguntar apenas o essencial: área, localização e modalidade.
3. Mostrar resultados com uma explicação curta: “Encontrámos 8 opções para ti”.
4. Em cada detalhe, apresentar “Podes candidatar-te se…” e uma checklist de preparação.
5. No CTA final, dizer exactamente o que acontece: “Criar conta e continuar candidatura” ou “Ir ao site da entidade”.
6. Guardar automaticamente o progresso e permitir regressar sem repetir escolhas.

## Ordem recomendada

### Agora — confiança e conclusão

- Corrigir prazos expirados.
- Corrigir o destino dos CTAs.
- Unificar conteúdos e remover dados fictícios.
- Traduzir integralmente a conta e autenticação.

### A seguir — orientação

- Simplificar navegação por tarefas.
- Criar pesquisa guiada de três perguntas.
- Adicionar CTA fixo nos filtros móveis.
- Melhorar estados vazios e de carregamento.

### Depois — consistência e escala

- Normalizar cards, inputs e mensagens.
- Optimizar imagens e experiência em ligações lentas.
- Medir pesquisas, abandonos e candidaturas concluídas.

## Limites da auditoria

A revisão confirmou estrutura, comportamento visível, conteúdo, responsividade móvel e desktop e alguns elementos semânticos. Não constitui certificação WCAG completa; não foram testados leitores de ecrã, zoom a 400%, ligações lentas reais nem todas as combinações de teclado.
