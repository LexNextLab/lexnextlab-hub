# LEXNEXT LAB — Hub de Sistemas

Hub interno em [Next.js](https://nextjs.org/) (App Router), React, TypeScript e Tailwind CSS, com [shadcn/ui](https://ui.shadcn.com/) e componentes animados do [React Bits](https://reactbits.dev/) (registry `@react-bits`).

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Dados e logos

- Sistemas mockados: [`data/systems.ts`](data/systems.ts).
- Logos: arquivos em [`public/logos/`](public/logos/). Substitua pelos oficiais mantendo os caminhos ou atualize o campo `logo` em cada item.

## MCP shadcn (Cursor)

O projeto inclui [`.cursor/mcp.json`](.cursor/mcp.json) gerado com `npx shadcn@latest mcp init --client cursor`. No Cursor, habilite o servidor MCP do shadcn em **Configurações → MCP** (o identificador costuma aparecer como `project-0-LEXNEXTLAB-shadcn` ou similar).

Com o MCP ligado, dá para:

- **`get_project_registries`** — listar registries do [`components.json`](components.json) (ex.: `@shadcn`, `@react-bits`).
- **`search_items_in_registries`** — buscar componentes por nome/descrição.
- **`get_add_command_for_items`** — obter o comando exato `npx shadcn@latest add ...`.
- **`list_items_in_registries`** / **`view_items_in_registries`** — explorar o catálogo.

Exemplo usado neste repo: busca por *scroll area* → `npx shadcn@latest add @shadcn/scroll-area` → componente em [`components/ui/scroll-area.tsx`](components/ui/scroll-area.tsx) (faixa **Últimos acessados** em [`hub-client.tsx`](components/systems/hub-client.tsx)).

Documentação: [shadcn/ui MCP](https://ui.shadcn.com/docs/mcp).

## Funcionalidades

- Busca por nome ou descrição, filtro por categoria.
- Tema claro / escuro (`next-themes`).
- Favoritos e últimos acessos persistidos em `localStorage` neste dispositivo.
- Skeleton de carregamento inicial, empty state e tooltips.
