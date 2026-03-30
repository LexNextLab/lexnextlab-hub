export const SYSTEM_CATEGORIES = [
  "Todas",
  "Operações",
  "Jurídico",
  "Comercial",
  "Financeiro",
] as const;

export type SystemCategory = Exclude<(typeof SYSTEM_CATEGORIES)[number], "Todas">;

/** Blocos extras no modal “Sobre” (manual / flyer) */
export type SystemAboutBlock =
  | { kind: "text"; title: string; body: string }
  | { kind: "bullets"; title: string; items: string[] }
  | {
      kind: "steps";
      title: string;
      steps: { label: string; description: string }[];
    };

export interface SystemAboutExtended {
  tagline?: string;
  badge?: string;
  rollout?: string;
  blocks: SystemAboutBlock[];
  contact?: {
    title: string;
    intro: string;
    email: string;
    people?: string[];
  };
}

export interface System {
  id: number;
  name: string;
  description: string;
  category: SystemCategory;
  /** Endereço do sistema (nova aba). Se vazio, use o link informado pela TI/gestão. */
  url?: string;
  logo: string;
  /** Termos extras para a busca na página (nome e descrição já entram automaticamente) */
  keywords?: string[];
  /** Parágrafos do modal “Sobre”, separados por linha em branco */
  about: string;
  /** Texto opcional no rodapé do modal (créditos / equipe) */
  credits?: string;
  /** Conteúdo adicional estruturado (funcionalidades, passos, contato, etc.) */
  aboutExtended?: SystemAboutExtended;
}

export const systems: System[] = [
  {
    id: 1,
    name: "Responsum - Abertura e acompanhamento de chamados",
    description:
      "Abertura e acompanhamento de chamados da Controladoria e demais áreas — status, histórico e chat no mesmo lugar.",
    category: "Operações",
    url: "https://www.responsum.com.br",
    logo: "/logos/logo-responsum.png",
    about: `Use o Responsum para pedidos à Controladoria (protocolo, cadastro, digitalização, publicação etc.). Cada demanda fica registrada com andamento em tempo real.

Acesse com seu login corporativo. Pedidos pelo sistema substituem solicitações soltas por e-mail ou mensagem.`,
    aboutExtended: {
      badge: "Chamados · Bismarchi | Pires",
      blocks: [
        {
          kind: "bullets",
          title: "O que você faz aqui",
          items: [
            "Abrir um chamado e escolher o tipo de pedido.",
            "Acompanhar status e falar com o time pelo chat do chamado.",
            "Anexar arquivos e avaliar o atendimento ao concluir.",
          ],
        },
        {
          kind: "bullets",
          title: "Importante",
          items: [
            "Registre pedidos só pelo Responsum.",
            "A avaliação ao finalizar o chamado é obrigatória.",
          ],
        },
      ],
      contact: {
        title: "Dúvidas",
        intro: "Suporte ao uso do Responsum:",
        email: "controladoria@bismarchipires.com.br",
      },
    },
  },
  {
    id: 2,
    name: "Fênix.IA - Banco de Teses Jurídicas",
    description:
      "Banco de teses jurídicas do escritório: consultar, redigir e exportar conteúdo, com apoio de IA quando disponível.",
    category: "Jurídico",
    url: "https://fenix-ia.vercel.app/",
    logo: "/logos/FENIXIA/logo-fenix-ia-09.png",
    keywords: [
      "teses",
      "teses jurídicas",
      "acervo",
      "ia",
      "editor",
      "word",
      "docx",
      "fênix",
      "fenix",
      "banco de teses",
    ],
    about: `O Fênix.IA concentra as teses do escritório para você localizar, editar e reutilizar. Há filtros por assunto e opção de exportar para Word.

Entre com o usuário e senha que você recebeu para este sistema.`,
    aboutExtended: {
      badge: "Banco de teses jurídicas",
      blocks: [
        {
          kind: "bullets",
          title: "Principais usos",
          items: [
            "Buscar e organizar teses por tema.",
            "Redigir e ajustar texto no próprio sistema.",
            "Exportar para Word quando precisar usar em peças.",
          ],
        },
        {
          kind: "steps",
          title: "Acesso",
          steps: [
            {
              label: "1. Site",
              description: "Abra o endereço indicado ao lado (abre em nova aba).",
            },
            {
              label: "2. Login",
              description: "Use seu usuário e senha do Fênix.IA.",
            },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    name: "CADASTRO DE LEAD — Bismarchi | Pires",
    description:
      "CRM Manual Bismarchi | Pires — guia para preencher o CRM certinho, com funis de vendas e pós-venda, conferência de dados, aviso de leads atrasados, painel de resultados e apoio à Due Diligence.",
    category: "Comercial",
    url: "https://crm-bp.vercel.app/",
    logo: "/logos/CADASTRO%20DE%20LEAD/fenix.png",
    keywords: [
      "crm",
      "leads",
      "cadastro",
      "lead",
      "funil",
      "vendas",
      "pós-venda",
      "due diligence",
      "sla",
      "bismarchi",
      "pires",
      "comercial",
      "planilha",
    ],
    about: `É o guia do CRM do escritório: cada etapa do funil, o que preencher e telas para conferir dados, ver quem está atrasado e analisar resultados.

Quem usa: equipe que trabalha com CRM, planilha e acompanhamento de leads. Usuário e senha, quando exigidos, são informados pela TI ou pela gestão.`,
    aboutExtended: {
      badge: "CRM · Bismarchi | Pires",
      blocks: [
        {
          kind: "bullets",
          title: "O que você encontra aqui",
          items: [
            "Manual dos funis — vendas e pós-venda: fases, o que fazer e dicas para cadastrar certo.",
            "Cadastro de lead — registrar novo contato do jeito que o escritório pede.",
            "Validação — conferir se planilha/CRM está completo e correto.",
            "SLA — leads parados há muito tempo na mesma etapa.",
            "Dashboard / análise — números, gráficos, perdas, origem e relatórios.",
            "Due Diligence — checagem por áreas, envio de arquivos e material para fechar a análise.",
          ],
        },
      ],
    },
  },
  {
    id: 4,
    name: "SIOE - Sistema Integrado de Operações Estratégicas",
    description:
      "Inadimplência, comitê e visão financeira do escritório: clientes em atraso, dashboard, grupos com processos e horas — com perfis admin, financeiro e comitê.",
    category: "Financeiro",
    url: "https://financeiro-bp.vercel.app/",
    logo: "/logos/CADASTRO%20DE%20LEAD/fenix.png",
    keywords: [
      "sioe",
      "sistema integrado",
      "operações estratégicas",
      "inadimplência",
      "inadimplencia",
      "financeiro",
      "comitê",
      "comite",
      "dashboard",
      "escritório",
      "escritorio",
      "parcelas",
      "cobrança",
      "cobranca",
      "recuperação",
      "bismarchi",
      "pires",
    ],
    about: `O SIOE (Sistema Integrado de Operações Estratégicas) é o sistema interno para acompanhar inadimplência, atuar no comitê e enxergar indicadores e a operação do escritório.

Acesse com e-mail corporativo e senha. Se esquecer a senha, use a opção de recuperação na tela de login. O que cada pessoa vê depende do perfil (administrador, financeiro ou comitê).`,
    aboutExtended: {
      badge: "Inadimplência e visão do escritório · BP",
      blocks: [
        {
          kind: "bullets",
          title: "Principais áreas",
          items: [
            "Inadimplência — lista e visões em quadro (por classe ou gestor), filtros, resumo em números, detalhe do cliente (parcelas, providências, follow-ups, pagamentos, ações).",
            "Dashboard — totais, recuperação, rankings e alertas de follow-up.",
            "Escritório — visão dos grupos com situação financeira, processos e horas.",
            "Gestores e configurações — disponíveis para administrador (usuários, perfis e ajustes gerais).",
            "Meu perfil — dados da conta e alteração de senha.",
          ],
        },
        {
          kind: "bullets",
          title: "Perfis (resumo)",
          items: [
            "Administrador e Financeiro — inadimplência completa, dashboard, escritório; admin também cadastra usuários e configura o sistema.",
            "Comitê — acompanha inadimplência e dashboard; cria providências e follow-ups, sem incluir cliente novo nem marcar como resolvido (conforme regra do sistema).",
          ],
        },
        {
          kind: "steps",
          title: "Acesso",
          steps: [
            {
              label: "1. Site",
              description: "Abra o endereço ao lado (abre em nova aba).",
            },
            {
              label: "2. Login",
              description:
                "E-mail @bismarchipires.com.br e senha. Primeiro acesso ou senha provisória conforme orientação do administrador.",
            },
          ],
        },
      ],
    },
  },
];
