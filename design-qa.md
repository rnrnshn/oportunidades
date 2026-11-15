# Design QA — pesquisa, filtros e mega-menu

## Sources and captures

- Referências: mega-menu, filtro accordion e selector de resultados fornecidos pelo utilizador em 2026-10-05.
- Capturas: `output/playwright/grouped-search-mega.png` e `output/playwright/grouped-search-filters.png`.

## Review

- O mega-menu reproduz a hierarquia da referência: ligação global, filtros populares, separador vertical e áreas em duas colunas.
- Os filtros usam disclosures nativos, com uma secção principal aberta e as restantes compactas.
- Os conjuntos académicos e profissionais são agrupados por navegação contextual; cada destino mantém URL, dados e filtros próprios.
- A opção activa é comunicada por texto, sublinhado e `aria-current`.
- Mobile mantém scrolling horizontal nos agrupadores e disclosures nativos nos filtros.

## Findings

- P0: none.
- P1: none.
- P2: none.
- P3: as ligações de filtros populares usam a página de cursos enquanto os parâmetros definitivos de backend não existem.

## Final result

final result: passed
