import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import SlideShell, { SlideMeta } from "@/components/focus/SlideShell";
import SlideNav from "@/components/focus/SlideNav";
import {
  slides,
  heroMetrics,
  entregaveisCalendario,
  formatosEPublicos,
  pillars,
  seasonalSelected,
  publications,
  WEEKS,
  type Publication,
} from "@/data/strategy";
import marqoLogo from "@/assets/marqo-logo.svg";

/* ============================================================ */
/* Hooks                                                          */
/* ============================================================ */

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
};

/* ============================================================ */
/* Shared atoms                                                  */
/* ============================================================ */

const SplitText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => (
  <span className={`inline-block ${className}`}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 60, rotateX: -80 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, delay: delay + i * 0.022, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
        style={{ transformOrigin: "bottom" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

const TopMeta = ({ index, total, label }: { index: number; total: number; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -6 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true, amount: 0.3 }}
    className="absolute top-6 md:top-10 left-5 sm:left-8 md:left-12 lg:left-20 xl:left-28 right-16 md:right-32 z-10 flex flex-wrap items-center gap-3 md:gap-4"
  >
    <span className="font-editorial text-off-white/70 whitespace-nowrap">
      {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </span>
    <div className="h-px w-8 md:w-10 bg-off-white/20" />
    <span className="font-editorial text-caption truncate">{label}</span>
  </motion.div>
);

const SectionTitle = ({ children, accent }: { children: React.ReactNode; accent?: React.ReactNode }) => {
  const isDesktop = useIsDesktop();
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.3 }}
      className="font-display-light text-off-white max-w-5xl"
      style={{
        fontSize: isDesktop ? "clamp(2rem, min(5.5vw, 8svh), 4.5rem)" : "clamp(1.75rem, 8vw, 2.5rem)",
        lineHeight: 0.98,
      }}
    >
      {children}
      {accent ? <><br /><span className="text-mineral">{accent}</span></> : null}
    </motion.h2>
  );
};

/* ============================================================ */
/* Editorial slide wrapper                                       */
/* ============================================================ */

const ContentSlide = ({
  index, total, label, children, scrollable = false,
}: {
  index: number; total: number; label: string;
  children: React.ReactNode; scrollable?: boolean;
}) => {
  const isDesktop = useIsDesktop();
  return (
    <div
      className="relative flex w-full min-h-[100svh] flex-col px-5 pt-20 pb-40 sm:px-8 md:h-full md:px-12 md:pt-24 md:pb-24 lg:px-20 xl:px-28"
      style={!isDesktop ? { paddingBottom: "max(10rem, calc(8.5rem + env(safe-area-inset-bottom)))" } : undefined}
    >
      <TopMeta index={index} total={total} label={label} />
      <div
        className={`relative z-10 flex-1 min-h-0 flex flex-col ${
          scrollable
            ? "justify-center md:overflow-hidden"
            : "justify-center md:overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

/* ============================================================ */
/* 01 — Hero                                                     */
/* ============================================================ */

const HeroSlide = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const sx = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const sy = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(sx, [0, 1], [-20, 20]);
  const bgY = useTransform(sy, [0, 1], [-20, 20]);

  useEffect(() => {
    if (!isDesktop) return;
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top) / r.height);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop, mouseX, mouseY]);

  const headlineSize = "clamp(2.25rem, min(9.5vw, 12svh), 8rem)";

  return (
    <div
      ref={ref}
      className="relative flex w-full min-h-[100svh] flex-col justify-start gap-8 px-5 pt-12 pb-36 sm:px-8 sm:pt-16 sm:pb-40 md:h-full md:justify-between md:gap-12 md:px-12 md:py-20 lg:px-20 xl:px-28"
    >
      {isDesktop ? (
        <motion.div className="absolute inset-0 pointer-events-none" style={{ x: bgX, y: bgY }}>
          <div className="absolute top-1/4 left-1/4 h-[60vw] w-[60vw] max-h-[600px] max-w-[600px] rounded-full bg-mineral/[0.04] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[50vw] w-[50vw] max-h-[500px] max-w-[500px] rounded-full bg-off-white/[0.025] blur-[120px]" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-[36%] h-[72vw] w-[72vw] -translate-x-1/2 rounded-full bg-mineral/[0.03] blur-[56px]" />
        </div>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-border origin-left"
      />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 flex justify-between items-center gap-3"
      >
        <span className="font-editorial text-caption">Marqo para Focus Media Brasil</span>
        <span className="font-editorial text-caption hidden sm:block">Ciclo 02 · Junho 2026</span>
      </motion.div>

      <div className="relative z-10 max-w-6xl">
        <div className="space-y-1 md:space-y-2 perspective-[1000px]">
          <h1
            className="font-display-light text-off-white"
            style={{
              fontSize: isDesktop ? headlineSize : "clamp(2rem, 12vw, 3.25rem)",
              lineHeight: 0.92,
            }}
          >
            {isDesktop ? <SplitText text="Calendário" delay={0.7} /> : "Calendário"}
          </h1>
          <h1
            className="font-display-light text-off-white"
            style={{
              fontSize: isDesktop ? headlineSize : "clamp(2rem, 12vw, 3.25rem)",
              lineHeight: 0.92,
            }}
          >
            {isDesktop ? <SplitText text="Editorial" delay={0.95} /> : "Editorial"}
          </h1>
          <h1
            className="font-display-light text-mineral"
            style={{
              fontSize: isDesktop ? headlineSize : "clamp(2rem, 12vw, 3.25rem)",
              lineHeight: 0.92,
            }}
          >
            {isDesktop ? <SplitText text="Junho 2026." delay={1.25} /> : "Junho 2026."}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: isDesktop ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isDesktop ? 1 : 0.45, delay: isDesktop ? 2 : 0.12 }}
          className="mt-6 flex items-start gap-4 sm:mt-10 sm:gap-6 md:mt-12 md:gap-8"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-mineral/40 w-12 mt-3 hidden md:block origin-left flex-shrink-0"
          />
          <p
            className="text-caption max-w-xl leading-relaxed"
            style={{ fontSize: isDesktop ? "clamp(0.85rem, 1.1vw, 1rem)" : "0.98rem" }}
          >
            Junho traduz a presença da Focus Media em conteúdo recorrente e
            publicável — calendário completo para aprovação e execução, com copy
            finalizado para edifícios, marcas e a rotina urbana.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: isDesktop ? 2.4 : 1.3 }}
        className="relative z-10 mt-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 md:gap-x-10 border-t border-border/60 pt-6 md:pt-8"
      >
        {heroMetrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (isDesktop ? 2.5 : 1.4) + i * 0.07 }}
            className="flex flex-col"
          >
            <span
              className="font-display-light text-off-white tabular-nums"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              {m.value}
            </span>
            <span className="font-editorial text-caption mt-2">{m.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

/* ============================================================ */
/* 02 — Resumo do calendário                                     */
/* ============================================================ */

const TransicaoSlide = ({ index, total }: { index: number; total: number }) => {
  const isDesktop = useIsDesktop();
  return (
    <ContentSlide index={index} total={total} label="Resumo do calendário">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 translate-x-1/3 h-[55vw] w-[55vw] max-h-[640px] max-w-[640px] rounded-full bg-mineral/[0.04] blur-[140px]" />
      </div>

      <SectionTitle accent="copy, arte e calendário fechados.">
        Quatorze publicações,
      </SectionTitle>

      <p className="text-caption text-sm max-w-2xl mt-6 md:mt-8 leading-relaxed">
        Cada peça tem data definida, público-alvo, formato, objetivo e copy
        finalizada. O calendário está pronto para aprovação e produção.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mt-12 md:mt-20 max-w-5xl">
        {/* Entregáveis do calendário */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="border-t border-border/60 pt-6"
        >
          <div className="flex items-baseline justify-between mb-5">
            <span className="font-editorial text-off-white">O que está no calendário</span>
            <span className="block w-6 h-px bg-off-white/60" />
          </div>
          <ul className="space-y-3">
            {entregaveisCalendario.map((it) => (
              <li key={it} className="flex gap-3 text-foreground/85 text-sm md:text-[0.95rem] leading-relaxed">
                <span className="mt-2.5 w-2 h-px bg-off-white/60 shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Públicos e formatos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="border-t border-border/60 pt-6"
        >
          <div className="flex items-baseline justify-between mb-5">
            <span className="font-editorial text-off-white">Públicos e formatos</span>
            <span className="block w-6 h-px bg-off-white/60" />
          </div>
          <ul className="space-y-3">
            {formatosEPublicos.map((it) => (
              <li key={it} className="flex gap-3 text-foreground/85 text-sm md:text-[0.95rem] leading-relaxed">
                <span className="mt-2.5 w-2 h-px bg-off-white/60 shrink-0" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </ContentSlide>
  );
};

/* ============================================================ */
/* 03 — Pilares editoriais                                       */
/* ============================================================ */

const PilaresSlide = ({ index, total }: { index: number; total: number }) => (
  <ContentSlide index={index} total={total} label="Pilares editoriais" scrollable>
    <SectionTitle accent="organiza a comunicação de junho.">
      Seis pilares,
    </SectionTitle>

    <p className="text-caption text-sm max-w-xl mt-6 md:mt-8 leading-relaxed">
      Cada publicação responde a um pilar — que define a audiência primária,
      o tom da mensagem e o papel da peça no mês.
    </p>

    <div className="mt-12 md:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 max-w-7xl pb-8">
      {pillars.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.15 }}
          className="border-t border-border/60 pt-5"
        >
          <div className="flex items-baseline justify-between mb-3">
            <span className="font-editorial text-caption">Pilar 0{i + 1}</span>
            <span className="block w-6 h-px bg-off-white/30" />
          </div>
          <h3
            className="font-display-light text-off-white mb-3"
            style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            {p.name}
          </h3>
          <p className="text-foreground/70 leading-relaxed text-sm mb-4">{p.purpose}</p>
          <p className="font-editorial text-caption mb-2">Audiência</p>
          <p className="text-foreground/60 text-sm mb-4">{p.audience}</p>
          <p className="font-editorial text-caption mb-2">Exemplos em Junho</p>
          <ul className="space-y-1.5">
            {p.examples.map((ex) => (
              <li key={ex} className="flex gap-2 text-foreground/65 text-sm leading-relaxed">
                <span className="mt-2 w-1.5 h-px bg-off-white/40 shrink-0" />
                <span>{ex}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </ContentSlide>
);

/* ============================================================ */
/* 04 — Datas sazonais                                           */
/* ============================================================ */

const SazonaisSlide = ({ index, total }: { index: number; total: number }) => (
  <ContentSlide index={index} total={total} label="Oportunidades sazonais" scrollable>
    <SectionTitle accent="com vínculo real ao negócio.">
      Oito datas
    </SectionTitle>

    <p className="text-caption text-sm max-w-2xl mt-6 md:mt-8 leading-relaxed">
      A curadoria de junho priorizou datas que conversam diretamente com
      edifícios, mídia indoor e a rotina urbana — descartando oportunismo de
      calendário.
    </p>

    <div className="mt-12 md:mt-16 pb-8 max-w-5xl">
      <div>
        <div className="flex items-baseline justify-between mb-6">
          <span className="font-editorial text-off-white">Datas selecionadas — 08</span>
          <span className="block w-6 h-px bg-off-white/60" />
        </div>
        <ul>
          {seasonalSelected.map((d, i) => (
            <motion.li
              key={d.date}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              viewport={{ once: true, amount: 0.2 }}
              className="border-t border-border/60 py-4 grid grid-cols-12 gap-3"
            >
              <div className="col-span-3 md:col-span-2">
                <div className="font-display-light text-off-white tabular-nums text-base md:text-lg">{d.date}</div>
                <div className="font-editorial text-caption">{d.weekday}</div>
              </div>
              <div className="col-span-9 md:col-span-10">
                <div className="text-foreground/85 text-sm md:text-[0.95rem] mb-1">{d.occasion}</div>
                <p className="text-caption text-xs md:text-sm leading-relaxed">{d.reason}</p>
              </div>
            </motion.li>
          ))}
          <div className="border-t border-border/60" />
        </ul>
      </div>
    </div>
  </ContentSlide>
);

/* ============================================================ */
/* Card de publicação                                            */
/* ============================================================ */

const formatBadgeClass = "font-editorial text-caption border border-border/70 px-2.5 py-1";
const audienceBadgeClass = "font-editorial text-off-white/80 border border-off-white/30 px-2.5 py-1";
const pillarBadgeClass = "font-editorial text-mineral border border-mineral/40 px-2.5 py-1";

const PublicationCard = ({ pub }: { pub: Publication }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      className="border border-border/60 bg-card/30 backdrop-blur-sm"
    >
      {/* Header (always visible) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full text-left p-5 md:p-7 group"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-baseline gap-4">
            <span
              className="font-display-light text-mineral tabular-nums"
              style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)", letterSpacing: "-0.04em" }}
            >
              #{String(pub.id).padStart(2, "0")}
            </span>
            <div>
              <div className="font-editorial text-off-white/80 tabular-nums">{pub.date}</div>
              <div className="font-editorial text-caption">{pub.weekday}</div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="border border-border/70 w-9 h-9 flex items-center justify-center group-hover:border-off-white/50 transition-colors"
          >
            <ChevronDown className="w-4 h-4 text-off-white/70" strokeWidth={1.25} />
          </motion.div>
        </div>

        <h3
          className="font-display-light text-off-white mb-3"
          style={{ fontSize: "clamp(1.25rem, 1.9vw, 1.6rem)", letterSpacing: "-0.03em", lineHeight: 1.15 }}
        >
          {pub.hook}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={pillarBadgeClass}>{pub.pillar}</span>
          <span className={formatBadgeClass}>{pub.format}</span>
          <span className={audienceBadgeClass}>{pub.audience}</span>
          {pub.seasonal && (
            <span className="font-editorial text-mineral border border-mineral/60 bg-mineral/[0.05] px-2.5 py-1 inline-flex items-center gap-1.5">
              <CalendarIcon className="w-3 h-3" strokeWidth={1.5} />
              Sazonal
            </span>
          )}
        </div>

        <p className="text-foreground/70 text-sm leading-relaxed">{pub.objective}</p>
        {pub.seasonalNote && (
          <p className="font-editorial text-caption mt-3">{pub.seasonalNote}</p>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60"
          >
            <div className="p-5 md:p-7 space-y-7">
              {/* Conceito visual (static / carousel) */}
              {pub.content.kind !== "reels" && (
                <div>
                  <div className="font-editorial text-caption mb-2">Conceito visual</div>
                  <p className="text-foreground/75 text-sm leading-relaxed">{pub.content.visual}</p>
                </div>
              )}

              {/* Conteúdo específico */}
              {pub.content.kind === "static" && (
                <>
                  <div>
                    <div className="font-editorial text-caption mb-2">Texto do artwork</div>
                    <p
                      className="font-display-light text-off-white whitespace-pre-line"
                      style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                    >
                      {pub.content.artwork}
                    </p>
                    {pub.content.artworkSupport && (
                      <p className="text-mineral text-sm mt-3">{pub.content.artworkSupport}</p>
                    )}
                  </div>
                </>
              )}

              {pub.content.kind === "carousel" && (
                <div>
                  <div className="font-editorial text-caption mb-3">
                    Slides do carrossel — {pub.content.slides.length}
                  </div>
                  <div className="space-y-3">
                    {pub.content.slides.map((s, i) => (
                      <div key={i} className="border border-border/50 bg-background/40 p-4">
                        <div className="font-editorial text-mineral tabular-nums mb-2">
                          Slide {String(i + 1).padStart(2, "0")} / {String(pub.content.kind === "carousel" ? pub.content.slides.length : 0).padStart(2, "0")}
                        </div>
                        <h4
                          className="font-display-light text-off-white mb-2"
                          style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                        >
                          {s.headline}
                        </h4>
                        <p className="text-foreground/75 text-sm leading-relaxed">{s.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pub.content.kind === "reels" && (
                <>
                  <div>
                    <div className="font-editorial text-caption mb-2">Nota de produção</div>
                    <p className="text-foreground/75 text-sm leading-relaxed">{pub.content.productionNote}</p>
                  </div>
                  <div>
                    <div className="font-editorial text-caption mb-3">Roteiro cena a cena</div>
                    <div className="space-y-3">
                      {pub.content.scenes.map((s, i) => (
                        <div key={i} className="border border-border/50 bg-background/40 p-4">
                          <div className="font-editorial text-mineral tabular-nums mb-2">
                            Cena {String(i + 1).padStart(2, "0")} · {s.time}
                          </div>
                          <p className="text-foreground/70 text-sm mb-2"><span className="font-editorial text-caption">Visual: </span>{s.visual}</p>
                          <p className="text-off-white text-sm"><span className="font-editorial text-caption">On-screen: </span>{s.onScreen}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-editorial text-caption mb-2">Dependência de produção</div>
                    <p className="text-foreground/75 text-sm leading-relaxed">{pub.content.dependency}</p>
                  </div>
                </>
              )}

              {/* Legenda */}
              <div>
                <div className="font-editorial text-caption mb-2">Legenda Instagram</div>
                <p className="text-foreground/85 text-sm leading-relaxed whitespace-pre-line">{pub.content.caption}</p>
              </div>

              {/* CTA */}
              <div>
                <div className="font-editorial text-caption mb-2">CTA</div>
                <p className="text-off-white text-sm leading-relaxed">{pub.content.cta}</p>
              </div>

              {/* Hashtags */}
              <div>
                <div className="font-editorial text-caption mb-2">Hashtags</div>
                <div className="flex flex-wrap gap-2">
                  {pub.content.hashtags.map((h) => (
                    <span key={h} className="font-editorial text-mineral text-[0.7rem] border border-mineral/30 px-2 py-1">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

/* ============================================================ */
/* 05 — Calendário                                               */
/* ============================================================ */

const CalendarioSlide = ({ index, total }: { index: number; total: number }) => {
  const [activeWeek, setActiveWeek] = useState<number | "all">("all");

  const filtered = activeWeek === "all"
    ? publications
    : publications.filter((p) => p.week === activeWeek);

  const tabs: Array<{ key: number | "all"; label: string; sub?: string }> = [
    { key: "all", label: "Todas", sub: "14 publicações" },
    ...WEEKS.map((w) => ({ key: w.number, label: w.label, sub: w.period })),
  ];

  return (
    <ContentSlide index={index} total={total} label="Calendário editorial" scrollable>
      <SectionTitle accent="cinco semanas, calendário fechado.">
        Quatorze publicações,
      </SectionTitle>

      <p className="text-caption text-sm max-w-2xl mt-6 md:mt-8 leading-relaxed">
        Cada card abre o material completo da peça — artwork, roteiro de
        carrossel ou reels, legenda, CTA e hashtags. Pronto para aprovação
        e produção.
      </p>

      {/* Tabs por semana */}
      <div className="mt-8 md:mt-10 flex flex-wrap gap-2 pb-4 border-b border-border/60">
        {tabs.map((t) => {
          const active = activeWeek === t.key;
          return (
            <button
              key={String(t.key)}
              onClick={() => setActiveWeek(t.key)}
              className={`group border px-3 py-2 transition-colors duration-300 text-left ${
                active
                  ? "border-off-white/70 bg-off-white/[0.04]"
                  : "border-border/60 hover:border-off-white/40"
              }`}
            >
              <div className={`font-editorial ${active ? "text-off-white" : "text-off-white/70"}`}>
                {t.label}
              </div>
              {t.sub && (
                <div className="font-editorial text-caption text-[0.65rem] mt-0.5">{t.sub}</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 pb-10 max-w-7xl">
        {filtered.map((pub) => (
          <PublicationCard key={pub.id} pub={pub} />
        ))}
      </div>
    </ContentSlide>
  );
};

/* ============================================================ */
/* 06 — Closing / Marqo                                          */
/* ============================================================ */

const ClosingSlide = ({ total }: { total: number }) => {
  const isDesktop = useIsDesktop();
  return (
    <div
      className="relative flex w-full min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:h-full md:px-12 lg:px-20 xl:px-28"
      style={!isDesktop ? { paddingBottom: "max(10rem, calc(8.5rem + env(safe-area-inset-bottom)))" } : undefined}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mineral/[0.05] ${
            isDesktop
              ? "h-[80vw] w-[80vw] max-h-[800px] max-w-[800px] blur-[160px]"
              : "h-[70vw] w-[70vw] blur-[56px]"
          }`}
        />
      </div>

      <SlideMeta index={total} total={total} label="Assinatura" />

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 h-px bg-border origin-left"
      />

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="font-editorial text-caption mb-8 sm:mb-10 md:mb-14"
        >
          Planejamento editorial e identidade visual por
        </motion.p>

        <motion.img
          src={marqoLogo}
          alt="Marqo"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="h-12 md:h-16 w-auto mb-10 md:mb-14 opacity-95"
        />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="font-display-light text-off-white"
          style={{ fontSize: "clamp(2rem, min(7vw, 10svh), 6rem)", lineHeight: 0.95 }}
        >
          Junho fechado.
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="font-display-light text-mineral mt-1"
          style={{ fontSize: "clamp(2rem, min(7vw, 10svh), 6rem)", lineHeight: 0.95 }}
        >
          Aprovação e produção a seguir.
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="h-px w-16 sm:w-20 bg-off-white/30 mx-auto mt-10 sm:mt-12 md:mt-16"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center gap-3 font-editorial text-caption"
        >
          <span>Focus Media Brasil</span>
          <span className="w-6 h-px bg-off-white/20" />
          <span>Junho 2026</span>
        </motion.div>

        <motion.a
          href="https://studiomarqo.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="group mt-10 sm:mt-12 inline-flex items-center gap-4 border border-off-white/25 px-6 py-3.5 sm:px-8 sm:py-4 hover:border-off-white/70 hover:bg-off-white/[0.03] transition-all duration-500"
        >
          <span
            className="font-display-light text-off-white"
            style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)", letterSpacing: "-0.01em" }}
          >
            Conheça a Marqo
          </span>
          <span className="h-px w-6 bg-off-white/40 group-hover:w-10 group-hover:bg-off-white transition-all duration-500" />
          <span className="font-editorial text-caption">studiomarqo.com.br</span>
        </motion.a>
      </div>
    </div>
  );
};

/* ============================================================ */
/* INDEX                                                          */
/* ============================================================ */

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const isDesktop = useIsDesktop();

  const total = slides.length; // 6

  const goTo = useCallback(
    (i: number) => {
      const c = containerRef.current;
      if (!c) return;
      const clamped = Math.max(0, Math.min(total - 1, i));
      const target = c.querySelector<HTMLElement>(`[data-slide-index="${clamped}"]`);
      if (target) {
        c.scrollTo({ top: target.offsetTop, behavior: isDesktop ? "smooth" : "auto" });
      }
    },
    [isDesktop, total]
  );

  useEffect(() => {
    const c = containerRef.current;
    if (!c || !isDesktop) return;
    const els = c.querySelectorAll<HTMLElement>("[data-slide-index]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.55) {
            const i = Number((e.target as HTMLElement).dataset.slideIndex);
            setCurrent(i);
          }
        });
      },
      { root: c, threshold: [0.55, 0.75] }
    );
    els.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isDesktop]);

  useEffect(() => {
    const c = containerRef.current;
    if (!c || isDesktop) return;
    const els = Array.from(c.querySelectorAll<HTMLElement>("[data-slide-index]"));
    let ticking = false;
    const update = () => {
      const probe = c.scrollTop + c.clientHeight * 0.4;
      let active = 0;
      for (const s of els) {
        if (s.offsetTop <= probe) active = Number(s.dataset.slideIndex ?? 0);
      }
      setCurrent(active);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    c.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      c.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [isDesktop]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, total, goTo]);

  return (
    <>
      <div
        ref={containerRef}
        className={`bg-background h-screen w-full overflow-y-auto overflow-x-hidden ${
          isDesktop ? "snap-y snap-mandatory scroll-smooth" : "overscroll-y-contain"
        }`}
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        <SlideShell index={0} id={slides[0].id}>
          <HeroSlide />
        </SlideShell>

        <SlideShell index={1} id={slides[1].id}>
          <TransicaoSlide index={2} total={total} />
        </SlideShell>

        <SlideShell index={2} id={slides[2].id}>
          <PilaresSlide index={3} total={total} />
        </SlideShell>

        <SlideShell index={3} id={slides[3].id}>
          <SazonaisSlide index={4} total={total} />
        </SlideShell>

        <SlideShell index={4} id={slides[4].id}>
          <CalendarioSlide index={5} total={total} />
        </SlideShell>

        <SlideShell index={5} id={slides[5].id}>
          <ClosingSlide total={total} />
        </SlideShell>
      </div>

      <SlideNav
        current={current}
        total={total}
        isDesktop={isDesktop}
        onNext={() => goTo(current + 1)}
        onPrev={() => goTo(current - 1)}
        onJump={goTo}
      />
    </>
  );
};

export default Index;