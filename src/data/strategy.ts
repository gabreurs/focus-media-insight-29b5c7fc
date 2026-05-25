/* ============================================================
 * Focus Media Brasil — Calendário Editorial · Junho 2026
 * Modelo de dados das publicações, pilares e datas sazonais.
 * ============================================================ */

export type FormatType = "Post Estático" | "Carrossel" | "Conceito de Reels";

export type PillarType =
  | "Condomínio Conectado"
  | "Presença onde a rotina acontece"
  | "Mídia dentro do ambiente certo"
  | "Informação para quem administra"
  | "Junho em Movimento"
  | "Presença Comercial";

export type AudienceType =
  | "Síndicos e Administradoras"
  | "Marcas e Agências"
  | "Misto";

export interface CarouselSlide {
  headline: string;
  body: string;
}

export interface StaticContent {
  kind: "static";
  visual: string;
  artwork: string;
  artworkSupport?: string;
  caption: string;
  cta: string;
  hashtags: string[];
}

export interface CarouselContent {
  kind: "carousel";
  visual: string;
  coverHeadline: string;
  slides: CarouselSlide[];
  caption: string;
  cta: string;
  hashtags: string[];
}

export interface ReelsScene {
  time: string;
  visual: string;
  onScreen: string;
}

export interface ReelsContent {
  kind: "reels";
  productionNote: string;
  scenes: ReelsScene[];
  caption: string;
  cta: string;
  hashtags: string[];
  dependency: string;
}

export type PublicationContent = StaticContent | CarouselContent | ReelsContent;

export interface Publication {
  id: number;
  date: string;
  weekday: string;
  week: number;
  title: string;
  hook: string;
  pillar: PillarType;
  audience: AudienceType;
  format: FormatType;
  objective: string;
  seasonal: boolean;
  seasonalNote?: string;
  content: PublicationContent;
}

/* ------------------------------------------------------------ */
/* Slides de navegação                                          */
/* ------------------------------------------------------------ */

export const slides = [
  { id: "abertura", label: "Abertura" },
  { id: "transicao", label: "Resumo do calendário" },
  { id: "pilares", label: "Pilares editoriais" },
  { id: "sazonais", label: "Oportunidades sazonais" },
  { id: "calendario", label: "Calendário editorial" },
  { id: "marqo", label: "Marqo" },
];

/* ------------------------------------------------------------ */
/* Semanas                                                       */
/* ------------------------------------------------------------ */

export const WEEKS = [
  { number: 1, label: "Semana 01", period: "01 a 07 de junho" },
  { number: 2, label: "Semana 02", period: "08 a 14 de junho" },
  { number: 3, label: "Semana 03", period: "15 a 21 de junho" },
  { number: 4, label: "Semana 04", period: "22 a 28 de junho" },
  { number: 5, label: "Semana 05", period: "29 e 30 de junho" },
];

/* ------------------------------------------------------------ */
/* Métricas de capa                                              */
/* ------------------------------------------------------------ */

export const heroMetrics = [
  { value: "14", label: "Publicações propostas" },
  { value: "09", label: "Datas sazonais selecionadas" },
  { value: "06", label: "Pilares editoriais" },
  { value: "03", label: "Formatos planejados" },
];

/* ------------------------------------------------------------ */
/* Resumo do calendário                                          */
/* ------------------------------------------------------------ */

export const entregaveisCalendario = [
  "14 publicações distribuídas em cinco semanas",
  "Copy finalizada: artwork, legenda, CTA e hashtags",
  "Conceitos visuais para posts, carrosséis e reels",
  "Datas sazonais selecionadas por relevância real",
];

export const formatosEPublicos = [
  "Síndicos e administradoras: comunicação para condomínios",
  "Marcas e agências: presença comercial e mídia indoor",
  "Posts estáticos, carrosséis e conceitos de reels",
  "Dois públicos distintos em peças estratégicas separadas",
];

/* ------------------------------------------------------------ */
/* Pilares editoriais                                            */
/* ------------------------------------------------------------ */

export interface Pillar {
  name: PillarType;
  purpose: string;
  audience: string;
  examples: string[];
}

export const pillars: Pillar[] = [
  {
    name: "Condomínio Conectado",
    purpose:
      "Telas digitais como canal de comunicação contemporâneo em halls, lobbies, elevadores e áreas comuns.",
    audience: "Síndicos, administradoras e gestores prediais.",
    examples: [
      "Como organizar comunicados digitais no condomínio",
      "Dia do Porteiro e comunicação na linha de frente",
      "Festas internas: como comunicar com clareza",
    ],
  },
  {
    name: "Presença onde a rotina acontece",
    purpose:
      "Visibilidade repetida e contextual nos caminhos que o público já percorre todos os dias na vida urbana.",
    audience: "Marcas e agências.",
    examples: [
      "Onde o público passa — todos os dias, várias vezes",
      "Frequência diária supera alcance pontual",
      "Mídia que acompanha sem disputar atenção",
    ],
  },
  {
    name: "Mídia dentro do ambiente certo",
    purpose:
      "O que torna o DOOH indoor diferente: contexto, atenção e recorrência dentro de ambientes controlados.",
    audience: "Anunciantes, agências e prospetos comerciais.",
    examples: [
      "Contexto é tudo: o que diferencia a tela do elevador",
      "Geolocalização e presença por bairro no DOOH indoor",
      "Alcance, frequência e segmentação na prática",
    ],
  },
  {
    name: "Informação para quem administra",
    purpose:
      "Comunicados, rotina predial, informação para moradores e modernização percebida sem promessas não fundamentadas.",
    audience: "Síndicos e administradoras.",
    examples: [
      "Como reduzir ruído visual nas áreas comuns",
      "Do mural sobrecarregado à tela organizada",
      "O que o morador quer saber e onde vai procurar",
    ],
  },
  {
    name: "Junho em Movimento",
    purpose:
      "Datas e momentos sazonais com vínculo real ao universo Focus Media — selecionados após filtragem editorial rigorosa.",
    audience: "Varia conforme a publicação.",
    examples: [
      "Dia do Porteiro — comunicação na linha de frente",
      "Dia da Mídia + início do inverno",
      "Copa do Mundo: audiência em alta, presença em movimento",
    ],
  },
  {
    name: "Presença Comercial",
    purpose:
      "Convite direto à compreensão da solução ou ao planejamento de presença — sem exageros, com argumento real.",
    audience: "Marcas, agências e condomínios parceiros em potencial.",
    examples: [
      "Sua marca já está na rotina das pessoas — só falta aparecer",
      "Como uma campanha indoor é planejada",
      "Planejar julho começa agora",
    ],
  },
];

/* ------------------------------------------------------------ */
/* Datas sazonais                                                */
/* ------------------------------------------------------------ */

export interface SeasonalDate {
  date: string;
  weekday: string;
  occasion: string;
  reason: string;
}

export const seasonalSelected: SeasonalDate[] = [
  {
    date: "05/06",
    weekday: "Sex",
    occasion: "Dia Mundial do Meio Ambiente",
    reason:
      "Comunicação digital indoor organiza e clarifica o espaço — o ambiente onde se comunica importa.",
  },
  {
    date: "09/06",
    weekday: "Ter",
    occasion: "Dia do Porteiro",
    reason:
      "O porteiro é o guardião da primeira impressão — comunicação nos halls apoia quem está na linha de frente.",
  },
  {
    date: "11/06",
    weekday: "Qui",
    occasion: "Início da Copa do Mundo 2026",
    reason:
      "Período de alta atenção coletiva — oportunidade para marcas visíveis nos percursos diários.",
  },
  {
    date: "12/06",
    weekday: "Sex",
    occasion: "Dia dos Namorados",
    reason:
      "Pico de intenção de compra — marcas no percurso diário vs. disputa no feed.",
  },
  {
    date: "19/06",
    weekday: "Qui",
    occasion: "Dia do Cinema Brasileiro",
    reason:
      "Cinema e DOOH: imagem + contexto + atenção = comunicação que funciona.",
  },
  {
    date: "21/06",
    weekday: "Sáb",
    occasion: "Dia da Mídia + Início do Inverno",
    reason:
      "Outdoor sofre com clima; DOOH indoor mantém qualidade 365 dias — reflexão para planejadores.",
  },
  {
    date: "24/06",
    weekday: "Qua",
    occasion: "São João / Festas Juninas",
    reason:
      "Eventos no condomínio dependem de comunicação clara e antecipada.",
  },
  {
    date: "30/06",
    weekday: "Ter",
    occasion: "Dia da Mídia Social",
    reason:
      "DOOH indoor e redes sociais têm forças complementares — canais que se completam.",
  },
];

export const seasonalExcluded: { date: string; occasion: string; reason: string }[] = [
  {
    date: "01/06",
    occasion: "Dia da Imprensa",
    reason: "Vínculo tangencial — Focus Media é mídia OOH, não jornalismo.",
  },
  {
    date: "03/06",
    occasion: "Dia Mundial da Bicicleta",
    reason: "Sem conexão natural com edifícios, DOOH indoor ou audiências urbanas.",
  },
  {
    date: "04/06",
    occasion: "Corpus Christi",
    reason: "Data religiosa/feriado sem vínculo com comunicação da marca.",
  },
  {
    date: "14/06",
    occasion: "Dia Mundial do Doador de Sangue",
    reason: "Causa nobre, mas sem vínculo com mídia OOH ou condomínios.",
  },
  {
    date: "27/06",
    occasion: "Dia das MPEs",
    reason: "Interesse potencial, mas sem ângulo documentado no Mídia Kit.",
  },
  {
    date: "28/06",
    occasion: "Dia do Orgulho LGBTQIAPN+",
    reason: "Exige posicionamento institucional explícito não mapeado nos materiais.",
  },
];

/* ------------------------------------------------------------ */
/* Publicações                                                   */
/* ------------------------------------------------------------ */

export const publications: Publication[] = [
  {
    id: 1,
    date: "02/06",
    weekday: "Terça-feira",
    week: 1,
    title: "A rotina passa pelo elevador",
    hook: "Várias vezes por dia, o mesmo público passa pela mesma tela.",
    pillar: "Presença onde a rotina acontece",
    audience: "Marcas e Agências",
    format: "Post Estático",
    objective:
      "Estabelecer o argumento central de presença recorrente na rotina — primeiro post de junho, tom conceitual e direto.",
    seasonal: false,
    content: {
      kind: "static",
      visual:
        "Fundo escuro com textura arquitetônica sutil (painel de elevador ou corredor de lobby). Tipografia grande, branca e âmbar. Sem excesso de elementos. Logo Focus Media no canto inferior.",
      artwork: "Várias vezes por dia,\no mesmo público\npassa pela mesma tela.",
      artworkSupport: "Frequência real, dentro do ambiente certo.",
      caption:
        "Entre a entrada e o andar de destino, existem alguns segundos. Não de espera — de presença.\n\nO elevador de um condomínio residencial ou corporativo não é um espaço vazio. É um ponto de circulação recorrente, onde o mesmo público passa várias vezes ao dia, ao longo de semanas e meses.\n\nMídia que aparece nesse contexto não interrompe: ela acompanha.\n\nConheça as soluções da Focus Media e planeje a presença da sua marca onde a rotina acontece.",
      cta: "Acesse focusmedia.com.br e fale com nossa equipe.",
      hashtags: ["#FocusMedia", "#DOOH", "#MídiaIndoor", "#MarketingUrbano"],
    },
  },
  {
    id: 2,
    date: "05/06",
    weekday: "Sexta-feira",
    week: 1,
    title: "Comunicar bem também é cuidar do ambiente",
    hook: "Comunicar bem também é uma forma de cuidar do ambiente.",
    pillar: "Junho em Movimento",
    audience: "Síndicos e Administradoras",
    format: "Carrossel",
    objective:
      "Conectar o Dia Mundial do Meio Ambiente com o argumento de comunicação digital indoor — sem claims de sustentabilidade não documentados.",
    seasonal: true,
    seasonalNote: "05/06 — Dia Mundial do Meio Ambiente",
    content: {
      kind: "carousel",
      visual:
        "Fundo escuro com gradiente sutil âmbar/verde escuro. Tipografia editorial limpa. Cada slide foca numa ideia central.",
      coverHeadline: "Comunicar bem também é uma forma de cuidar do ambiente.",
      slides: [
        {
          headline: "Comunicar bem também é uma forma de cuidar do ambiente.",
          body: "05 de junho — Dia Mundial do Meio Ambiente. Uma reflexão sobre o espaço onde a comunicação acontece.",
        },
        {
          headline: "O papel que não está lá.",
          body: "Um edifício que se comunica por tela não elimina apenas o papel. Elimina a poluição visual de quadros superlotados, avisos rasgados e informações desatualizadas nos corredores.",
        },
        {
          headline: "Informação atual. Entregue no lugar certo.",
          body: "Quando o comunicado fica na tela do lobby, ele está onde o morador passa — não esquecido num mural que ninguém leu esta semana.",
        },
        {
          headline: "Ambiente mais limpo é ambiente mais claro.",
          body: "Comunicação digital bem organizada reduz ruído visual, melhora a percepção dos espaços comuns e contribui para um ambiente mais agradável para quem vive e trabalha no edifício.",
        },
        {
          headline: "Conheça a Focus Media.",
          body: "Soluções de comunicação digital para edifícios residenciais e corporativos. Fale com nossa equipe: focusmedia.com.br",
        },
      ],
      caption:
        "Dia Mundial do Meio Ambiente também é oportunidade de pensar no ambiente onde se comunica.\n\nUm comunicado digital bem colocado melhora o espaço, respeita o tempo do morador e mantém as informações sempre visíveis — sem depender do mural sobrecarregado.\n\nConheça as soluções da Focus Media para edifícios.",
      cta: "Acesse focusmedia.com.br e entenda como funciona.",
      hashtags: ["#MeioAmbiente", "#CondomínioConectado", "#FocusMedia", "#ComunicaçãoDigital"],
    },
  },
  {
    id: 3,
    date: "09/06",
    weekday: "Terça-feira",
    week: 2,
    title: "Quem cuida da entrada cuida da primeira impressão",
    hook: "Quem cuida da entrada cuida da primeira impressão.",
    pillar: "Condomínio Conectado",
    audience: "Síndicos e Administradoras",
    format: "Post Estático",
    objective:
      "Reconhecer o profissional sem transformar a data em peça de venda. Conexão genuína com síndicos via papel do porteiro na comunicação do condomínio.",
    seasonal: true,
    seasonalNote: "09/06 — Dia do Porteiro",
    content: {
      kind: "static",
      visual:
        "Fundo escuro, quase preto. Tipografia grande em branco com destaque âmbar. Elemento gráfico opcional: silhueta de hall/lobby com tela lateral. Tom de respeito, não de marketing.",
      artwork: "Quem cuida da entrada\ncuida da primeira impressão.",
      artworkSupport: "09 de junho — Dia do Porteiro.",
      caption:
        "O porteiro é o primeiro contato do morador com o condomínio. Todos os dias.\n\nEle orienta, acolhe, resolve e comunica — muitas vezes sem ferramentas digitais à altura da importância do que faz.\n\nQuando o condomínio investe em comunicação organizada nos halls e lobbies, facilita o trabalho de quem está na linha de frente e melhora a experiência de quem chega.\n\nHoje, uma homenagem a quem faz a diferença na rotina de cada edifício.",
      cta: "Fale com a Focus Media e entenda como funciona a comunicação digital em edifícios: focusmedia.com.br",
      hashtags: ["#DiaDoPorteiro", "#CondomínioConectado", "#FocusMedia", "#GestãoPredial"],
    },
  },
  {
    id: 4,
    date: "11/06",
    weekday: "Quinta-feira",
    week: 2,
    title: "Quando todo mundo está prestando atenção",
    hook: "Quando todo mundo está prestando atenção, a sua marca precisa estar presente.",
    pillar: "Junho em Movimento",
    audience: "Marcas e Agências",
    format: "Post Estático",
    objective:
      "Usar o contexto de alta atenção coletiva como argumento para presença recorrente indoor. Sem associação, patrocínio ou uso de marcas protegidas do evento.",
    seasonal: true,
    seasonalNote: "Início da Copa do Mundo 2026 — ângulo: audiência e rotina, sem associação ao evento.",
    content: {
      kind: "static",
      visual:
        "Fundo escuro com elementos gráficos abstratos sugerindo movimento/cidade. Sem qualquer referência visual ao evento esportivo. Foco na ideia de audiência em movimento.",
      artwork:
        "Quando todo mundo\nestá prestando atenção,\na sua marca precisa estar presente.",
      artworkSupport: "Períodos de alta atenção são oportunidades reais.",
      caption:
        "Junho começa com o mundo em alta atenção. Não é coincidência — é contexto.\n\nPeríodos de maior engajamento coletivo criam oportunidades para marcas que entendem onde o público está: em casa, no trabalho, subindo para o escritório, voltando para o apartamento.\n\nA rotina continua. O elevador continua. A tela continua.\n\nMídia indoor em condomínios residenciais e corporativos mantém presença ativa nos momentos em que as pessoas estão mais receptivas — inclusive durante os períodos de maior audiência do ano.\n\nPlaneje a presença da sua marca onde a rotina realmente acontece.",
      cta: "Conheça as possibilidades de mídia em elevadores e lobbies: focusmedia.com.br",
      hashtags: ["#FocusMedia", "#DOOH", "#MídiaIndoor", "#PlanejamentoDeMídia"],
    },
  },
  {
    id: 5,
    date: "12/06",
    weekday: "Sexta-feira",
    week: 2,
    title: "Quem está presente no caminho",
    hook: "Quem está presente no caminho já ganhou a disputa de atenção.",
    pillar: "Junho em Movimento",
    audience: "Marcas e Agências",
    format: "Post Estático",
    objective: "Usar a sazonalidade do Dia dos Namorados como argumento comercial para o DOOH indoor.",
    seasonal: true,
    seasonalNote: "12/06 — Dia dos Namorados",
    content: {
      kind: "static",
      visual:
        "Fundo escuro com elemento gráfico âmbar sutil — linha ou detalhe remetendo a caminhos/percursos. Sem clichês românticos. Tom urbano e direto.",
      artwork:
        "Quem está presente\nno caminho já ganhou\na disputa de atenção.",
      artworkSupport: "12 de junho. Dia dos Namorados.",
      caption:
        "Quem está presente vale mais do que quem grita mais alto.\n\nDia dos Namorados é um dos períodos de maior intenção de compra do calendário brasileiro. E enquanto todo mundo concorre pela atenção nas redes, a mídia indoor coloca a marca dentro do trajeto diário do consumidor — sem disputar scroll.\n\nSeu público já está no elevador. No lobby. No corredor de saída.\n\nA pergunta é: sua marca vai encontrá-lo lá?",
      cta: "Fale com a Focus Media sobre campanhas em DOOH indoor: focusmedia.com.br",
      hashtags: ["#DiaDoNamorados", "#FocusMedia", "#DOOH", "#MídiaIndoor"],
    },
  },
  {
    id: 6,
    date: "16/06",
    weekday: "Segunda-feira",
    week: 3,
    title: "O que torna um espaço um canal",
    hook: "O que torna um espaço um canal de comunicação?",
    pillar: "Mídia dentro do ambiente certo",
    audience: "Marcas e Agências",
    format: "Carrossel",
    objective:
      "Educar anunciantes e agências sobre a lógica do DOOH indoor de forma editorial — argumento conceitual, não peça de venda.",
    seasonal: false,
    content: {
      kind: "carousel",
      visual:
        "Fundo escuro com elementos gráficos finos — linhas, setas, estrutura arquitetônica. Cada slide com uma ideia central em destaque. Paleta preta/âmbar.",
      coverHeadline: "O que torna um espaço um canal de comunicação?",
      slides: [
        {
          headline: "O que torna um espaço um canal de comunicação?",
          body: "Não é a tela. É a combinação de três coisas: contexto, audiência e recorrência.",
        },
        {
          headline: "Contexto é tudo.",
          body: "Uma tela na rua compete com movimento, sol e distração. Uma tela no elevador não compete com nada. O público está presente, parado e disponível.",
        },
        {
          headline: "Frequência não é acaso.",
          body: "O mesmo morador usa o elevador várias vezes ao dia. Não por acidente — por rotina. Isso gera frequência real, não estatística de impressões.",
        },
        {
          headline: "O ambiente define a mensagem.",
          body: "Uma campanha de saúde num espaço de bem-estar faz sentido. Uma campanha de serviços no hall de um condomínio residencial: também. Contexto qualifica a comunicação.",
        },
        {
          headline: "Recorrência diferencia presença de aparição.",
          body: "Aparecer uma vez é ser notado. Aparecer toda semana no mesmo espaço, para o mesmo público, é ser reconhecido.",
        },
        {
          headline: "DOOH indoor: alta atenção, baixa dispersão.",
          body: "Quando o ambiente é controlado e o público é recorrente, a mensagem tem chances reais de ser absorvida — não só visualizada.",
        },
        {
          headline: "Conheça as soluções de mídia indoor da Focus Media.",
          body: "focusmedia.com.br",
        },
      ],
      caption:
        "Nem toda tela é um canal. O que transforma um espaço em mídia é a combinação de contexto, audiência e recorrência.\n\nEntenda como o DOOH indoor funciona e por que o ambiente importa tanto quanto a mensagem.",
      cta: "Conheça as possibilidades na Focus Media: focusmedia.com.br",
      hashtags: ["#DOOH", "#MídiaIndoor", "#FocusMedia", "#MarketingContextual"],
    },
  },
  {
    id: 7,
    date: "18/06",
    weekday: "Quarta-feira",
    week: 3,
    title: "Ser visto uma vez é sorte",
    hook: "Ser visto uma vez é sorte. Ser visto toda semana é estratégia.",
    pillar: "Presença onde a rotina acontece",
    audience: "Marcas e Agências",
    format: "Post Estático",
    objective: "Reforçar o argumento de frequência como valor central do DOOH indoor.",
    seasonal: false,
    content: {
      kind: "static",
      visual:
        "Fundo escuro. Dois elementos idênticos — um isolado, outro em sequência — sugerindo diferença entre aparição e recorrência.",
      artwork: "Ser visto uma vez é sorte.\nSer visto toda semana\né estratégia.",
      artworkSupport: "Mídia com frequência real. DOOH indoor com a Focus Media.",
      caption:
        "Na publicidade, frequência não é repetição. É construção.\n\nUma mensagem vista uma vez pode passar despercebida. A mesma mensagem, vista três vezes por semana, no mesmo corredor, pelo mesmo público, começa a fazer parte do repertório cotidiano.\n\nÉ assim que marcas criam familiaridade sem interromper.\nÉ assim que o DOOH indoor funciona.\n\nPlaneje a presença da sua marca onde ela pode aparecer com consistência.",
      cta: "Fale com a Focus Media sobre campanhas em DOOH indoor: focusmedia.com.br",
      hashtags: ["#FocusMedia", "#DOOH", "#FrequênciaDeMídia", "#MídiaIndoor"],
    },
  },
  {
    id: 8,
    date: "19/06",
    weekday: "Quinta-feira",
    week: 3,
    title: "Toda tela conta uma história",
    hook: "Toda tela conta uma história. Algumas contam a sua.",
    pillar: "Junho em Movimento",
    audience: "Marcas e Agências",
    format: "Conceito de Reels",
    objective: "Usar o Dia do Cinema como gancho para o poder do DOOH visual em contextos de atenção.",
    seasonal: true,
    seasonalNote: "19/06 — Dia do Cinema Brasileiro",
    content: {
      kind: "reels",
      productionNote:
        "~30 segundos. Pode ser executado inteiramente com motion graphics tipográficos sobre fundo escuro, sem necessidade de filmagens externas.",
      scenes: [
        {
          time: "0:00–0:05",
          visual: "Corredor escuro de condomínio, câmera lenta, pessoa caminhando em direção ao elevador.",
          onScreen: "Toda tela conta uma história.",
        },
        {
          time: "0:05–0:10",
          visual: "Porta do elevador se abrindo, tela vertical visível no interior.",
          onScreen: "Algumas contam a sua.",
        },
        {
          time: "0:10–0:18",
          visual: "Pessoa olhando para a tela durante a subida.",
          onScreen: "Todos os dias. Para o mesmo público. No mesmo trajeto.",
        },
        {
          time: "0:18–0:25",
          visual: "Fachada de prédio residencial ao entardecer com elemento gráfico âmbar.",
          onScreen: "DOOH indoor. Presença recorrente onde a vida acontece.",
        },
        {
          time: "0:25–0:30",
          visual: "Logo Focus Media sobre fundo escuro.",
          onScreen: "focusmedia.com.br",
        },
      ],
      caption:
        "19 de junho — Dia do Cinema Brasileiro. Uma homenagem a quem entende que imagem e contexto transformam a forma como uma mensagem é recebida.\n\nA tela do elevador não é cinema. Mas também não é fundo de cena. É mídia real, com audiência real, em rotina real.\n\nConheça as possibilidades de DOOH indoor com a Focus Media.",
      cta: "focusmedia.com.br",
      dependency:
        "Executável com motion graphics tipográficos (sem filmagens). Opcionalmente, imagens de arquivo de corredor/elevador/lobby fornecidas pelo cliente.",
      hashtags: ["#DiaDoCinema", "#DOOH", "#FocusMedia", "#MídiaIndoor"],
    },
  },
  {
    id: 9,
    date: "21/06",
    weekday: "Sábado",
    week: 3,
    title: "A tela não sente frio",
    hook: "A tela não sente frio. A audiência continua.",
    pillar: "Junho em Movimento",
    audience: "Marcas e Agências",
    format: "Post Estático",
    objective:
      "Dupla oportunidade — Dia da Mídia para falar com profissionais; início do inverno como argumento prático de resiliência do DOOH indoor.",
    seasonal: true,
    seasonalNote: "21/06 — Dia da Mídia + Início do Inverno",
    content: {
      kind: "static",
      visual:
        "Contraste visual sugerindo exterior (clima adverso) vs. interior iluminado do lobby. Tipografia forte.",
      artwork: "A tela não sente frio.\nA audiência continua.",
      artworkSupport: "21 de junho. Dia da Mídia. Início do inverno.",
      caption:
        "Hoje é o Dia da Mídia. E também o início oficial do inverno no Brasil.\n\nEnquanto o outdoor enfrenta chuva, baixa luminosidade e vento, o DOOH indoor mantém o padrão — independente do tempo lá fora.\n\nElevadores, halls e lobbies funcionam 365 dias por ano. Com a mesma qualidade de exibição, com o mesmo público, com a mesma frequência.\n\nSazonalidade climática não afeta presença indoor.\n\nUma reflexão para planejadores de mídia neste 21 de junho.",
      cta: "Conheça os formatos e possibilidades na Focus Media: focusmedia.com.br",
      hashtags: ["#DiaDaMídia", "#DOOH", "#MídiaIndoor", "#FocusMedia"],
    },
  },
  {
    id: 10,
    date: "23/06",
    weekday: "Segunda-feira",
    week: 4,
    title: "Geolocalização no DOOH indoor",
    hook: "Geolocalização no DOOH indoor: o que isso significa na prática.",
    pillar: "Mídia dentro do ambiente certo",
    audience: "Marcas e Agências",
    format: "Carrossel",
    objective:
      "Explicar geolocalização e estratégia ponto a ponto no DOOH indoor usando a terminologia aprovada do Mídia Kit.",
    seasonal: false,
    content: {
      kind: "carousel",
      visual:
        "Fundo escuro com elementos cartográficos abstratos (linhas de mapa, pontos conectados). Referência visual ao conceito ponto a ponto do Mídia Kit. Paleta preta/âmbar.",
      coverHeadline: "Geolocalização no DOOH indoor: o que isso significa na prática.",
      slides: [
        {
          headline: "Geolocalização no DOOH indoor: o que isso significa na prática.",
          body: "Não é sobre estar em todo lugar. É sobre estar no lugar certo.",
        },
        {
          headline: "Seleção de edifícios por região.",
          body: "Campanhas podem ser segmentadas por bairro, zona ou região de interesse — focando onde o público-alvo realmente vive, trabalha e circula no dia a dia.",
        },
        {
          headline: "O bairro define o público.",
          body: "Um edifício corporativo no centro financeiro conecta marcas a um perfil profissional. Um residencial em bairro consolidado conecta ao consumidor no momento mais íntimo da rotina.",
        },
        {
          headline: "Ponto a ponto: impacto que acompanha a jornada.",
          body: "Circuitos personalizados com base no trajeto do consumidor criam cobertura eficaz — não aleatória. A mensagem segue o público, não o contrário.",
        },
        {
          headline: "Campanha pontual ou rede contínua?",
          body: "Dependendo do objetivo, a presença pode ser concentrada em poucos edifícios de alto impacto ou distribuída em rede mais ampla. Estratégia define o recorte.",
        },
        {
          headline: "Planeje a presença da sua marca nos edifícios certos.",
          body: "Fale com a Focus Media e entenda como funciona: focusmedia.com.br",
        },
      ],
      caption:
        "Estar presente no lugar certo vale mais do que estar presente em todo lugar.\n\nEntenda como a geolocalização no DOOH indoor permite que marcas se conectem ao público certo — por bairro, por região, por contexto.",
      cta: "focusmedia.com.br — Planeje a presença da sua marca onde ela gera impacto.",
      hashtags: ["#DOOH", "#Geolocalização", "#FocusMedia", "#MídiaIndoor"],
    },
  },
  {
    id: 11,
    date: "24/06",
    weekday: "Quarta-feira",
    week: 4,
    title: "Festa no condomínio começa com comunicação",
    hook: "Festa no condomínio começa com uma boa comunicação.",
    pillar: "Condomínio Conectado",
    audience: "Síndicos e Administradoras",
    format: "Post Estático",
    objective:
      "Conectar o São João à realidade operacional do síndico — comunicação de eventos internos como uso prático da tela digital.",
    seasonal: true,
    seasonalNote: "24/06 — São João / Festas Juninas",
    content: {
      kind: "static",
      visual:
        "Fundo escuro com elemento gráfico cálido mas sutil (âmbar, não literal/folclórico). Tom acolhedor sem clichê junino.",
      artwork: "Festa no condomínio\ncomeça com uma boa\ncomunicação.",
      artworkSupport: "São João, 24 de junho.",
      caption:
        "Festas Juninas nos condomínios são momentos de integração entre moradores. Como qualquer evento coletivo, dependem de comunicação clara e antecipada.\n\nData, horário, regras do espaço, confirmações, informações de segurança — tudo isso precisa chegar a tempo para quem vai participar.\n\nUm condomínio com canais digitais organizados comunica esses momentos com mais qualidade: na tela do hall, com visibilidade garantida, sem depender do mural sobrecarregado ou do grupo de WhatsApp que nem todo morador acompanha.\n\nBoa festa começa com boa comunicação.",
      cta: "Conheça as soluções da Focus Media para comunicação em edifícios: focusmedia.com.br",
      hashtags: ["#FestasJuninas", "#CondomínioConectado", "#FocusMedia", "#SãoJoão"],
    },
  },
  {
    id: 12,
    date: "26/06",
    weekday: "Sexta-feira",
    week: 4,
    title: "Sua marca já está na rotina das pessoas",
    hook: "Sua marca já está na rotina das pessoas. Só falta aparecer.",
    pillar: "Presença Comercial",
    audience: "Marcas e Agências",
    format: "Carrossel",
    objective:
      "Conversão comercial directa — explicar o DOOH indoor com clareza e chamar à acção.",
    seasonal: false,
    content: {
      kind: "carousel",
      visual:
        "Alto contraste: fundo preto, tipografia branca e âmbar. Último slide com CTA forte. Tom de pitch editorial.",
      coverHeadline: "Sua marca já está na rotina das pessoas. Só falta aparecer.",
      slides: [
        {
          headline: "Sua marca já está na rotina das pessoas. Só falta aparecer.",
          body: "O consumidor já percorre o mesmo caminho todos os dias. A questão é: sua marca vai encontrá-lo lá?",
        },
        {
          headline: "O consumidor não espera.",
          body: "Ele já está em movimento — no elevador, no lobby, no corredor. A questão é se sua marca vai estar nesse caminho ou continuar disputando espaço no feed.",
        },
        {
          headline: "Ambientes de alta atenção, audiência recorrente.",
          body: "O DOOH indoor coloca a mensagem no caminho que o público já percorre — todos os dias, com regularidade, em contexto relevante. Sem dispersão.",
        },
        {
          headline: "Alcance, frequência e segmentação.",
          body: "Campanhas planejadas com dados para impactar o público certo, no edifício certo, no momento de maior atenção. Esse é o argumento do DOOH indoor.",
        },
        {
          headline: "Pronto para estar onde seu público já está?",
          body: "Fale com a Focus Media. focusmedia.com.br",
        },
      ],
      caption:
        "Campanhas que disputam atenção no digital encontram cada vez mais resistência. Mídia que aparece no caminho que o público já percorre tem uma dinâmica diferente.\n\nEntenda como o DOOH indoor da Focus Media pode fazer parte do planejamento da sua marca.",
      cta: "focusmedia.com.br — Fale com a Focus Media sobre campanhas em DOOH indoor.",
      hashtags: ["#DOOH", "#FocusMedia", "#MídiaIndoor", "#PlanejamentoDeMídia"],
    },
  },
  {
    id: 13,
    date: "29/06",
    weekday: "Segunda-feira",
    week: 5,
    title: "Junho termina. A rotina, não",
    hook: "Junho termina. A rotina do seu público, não.",
    pillar: "Presença Comercial",
    audience: "Marcas e Agências",
    format: "Post Estático",
    objective:
      "Virada de mês como gatilho comercial — marcas que já estão presentes continuam enquanto concorrentes planejam.",
    seasonal: false,
    content: {
      kind: "static",
      visual:
        "Fundo preto com detalhe gráfico de transição temporal sutil. Tipografia de alto impacto. Tom estratégico.",
      artwork: "Junho termina.\nA rotina do seu público,\nnão.",
      artworkSupport: "Planejar julho começa agora.",
      caption:
        "O calendário virou. O público continua no mesmo elevador, no mesmo lobby, no mesmo corredor.\n\nEnquanto concorrentes param para pensar na estratégia do próximo mês, as marcas que já estão presentes continuam aparecendo.\n\nPresença recorrente não depende de sazonalidade. Depende de planejamento contínuo.\n\nJulho começa daqui a pouco. Sua marca vai estar lá?",
      cta: "Planeje a presença da sua marca nos próximos meses. Fale com a Focus Media: focusmedia.com.br",
      hashtags: ["#FocusMedia", "#DOOH", "#PlanejamentoDeMídia", "#MídiaIndoor"],
    },
  },
  {
    id: 14,
    date: "30/06",
    weekday: "Terça-feira",
    week: 5,
    title: "DOOH e Social: canais que se completam",
    hook: "DOOH e Social: canais que se completam.",
    pillar: "Junho em Movimento",
    audience: "Misto",
    format: "Carrossel",
    objective:
      "Encerrar junho conectando DOOH indoor e mídias sociais como canais complementares.",
    seasonal: true,
    seasonalNote: "30/06 — Dia da Mídia Social",
    content: {
      kind: "carousel",
      visual:
        "Divisão visual entre dois mundos: digital/social (esquerda) e ambiente físico/indoor (direita). Paleta âmbar + cinza escuro.",
      coverHeadline: "DOOH e Social: canais que se completam.",
      slides: [
        {
          headline: "30 de junho — Dia da Mídia Social.",
          body: "DOOH e Social: canais com lógicas diferentes — e complementares.",
        },
        {
          headline: "Social reach. Indoor depth.",
          body: "As redes sociais alcançam muito. O DOOH indoor aprofunda. Um gera volume de contato; o outro gera recorrência e contexto.",
        },
        {
          headline: "O consumidor não vive em um só canal.",
          body: "Ele vê a marca no feed às 8h. No elevador às 8h30. No Instagram ao meio-dia. A marca que aparece em múltiplos contextos se torna familiar mais rápido.",
        },
        {
          headline: "Frequência cruzada aumenta o impacto.",
          body: "Uma campanha que combina presença indoor com ativação digital cria consistência de mensagem sem depender de um único canal — ou de um único algoritmo.",
        },
        {
          headline: "Construa presença em múltiplos contextos.",
          body: "Com a Focus Media no indoor e sua estratégia digital nas redes, a marca aparece onde o público está. focusmedia.com.br",
        },
      ],
      caption:
        "Dia da Mídia Social é uma boa oportunidade para lembrar: o mundo da comunicação não é feito de um canal só.\n\nDOOH indoor e mídias sociais têm forças diferentes. Quando trabalham juntos, o resultado é presença real — com profundidade e alcance.",
      cta: "Conheça as possibilidades de mídia indoor com a Focus Media: focusmedia.com.br",
      hashtags: ["#DiaDaMídiaSocial", "#DOOH", "#FocusMedia", "#MídiaIntegrada"],
    },
  },
];
