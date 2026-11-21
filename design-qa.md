# Design QA — Recomendações gamificadas

## Evidências

- Referência visual: `/var/folders/gl/vxgxqvdx1llg6pqg12yl66bh0000gn/T/TemporaryItems/NSIRD_screencaptureui_XrW937/Screenshot 2026-11-16 at 09.59.10.png`
- Dimensão da referência: 2836 × 1336 px
- Implementação: `recommendations-implementation.png`
- Dimensão verificada: 1280 × 720 px, escala 1×
- Estado comparado: resultados após escolher Bolsas, Tecnologia, Online e candidatura nos próximos 3 meses

## Comparação

A implementação preserva o padrão central da referência: uma pergunta por etapa, progresso segmentado, opções grandes e fáceis de selecionar, ação principal persistente e uma lista final de recomendações. A interface usa o azul da Oportunidades, o cabeçalho responsivo do produto e controlos nativos acessíveis.

Adaptações intencionais:

- quatro etapas essenciais em vez de questionários separados e longos;
- ausência de fotografia introdutória para reduzir ruído e consumo de dados;
- gamificação discreta com troféu, pontos e feedback por etapa;
- resultados apresentados como links claros e escaneáveis;
- campos de escolha implementados como botões de rádio nativos.

## Histórico de ajustes

1. Na primeira revisão, o título podia aproximar-se demasiado do cabeçalho fixo ao receber foco e o segmento incompleto da barra tinha contraste insuficiente.
2. Foi adicionado espaço de deslocamento ao título focado e a cor do progresso incompleto foi ajustada para `#7f91ad`.
3. A revisão final confirmou título visível, navegação completa por todas as etapas, resultados corretos e ausência de erros no navegador.

## Verificações finais

- Build de produção: aprovado.
- Verificação de diferenças: aprovada.
- Contraste automatizado: 8 combinações testadas, zero falhas.
- Fluxo completo no navegador: aprovado.
- Erros no console: nenhum.
- Resultado: aprovado, sem divergências críticas ou importantes.
