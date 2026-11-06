import { motion, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { Section } from "./Section";
import { ExternalLink, Clock, ArrowUpRight } from "lucide-react";
import jbmTradingImage from "../../../imports/jbm-trading-optimized.jpg";
import imSafeImage from "../../../imports/imsafe-v2-optimized.jpg";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

type Project = {
  id: string;
  title: string;
  category: "Java" | "Python" | "Web" | "Database" | "Networking";
  tagline: string;
  description: string;
  challenges: string;
  features: string[];
  tags: string[];
  emoji: string;
  image?: string;
  color: string;
  accentTextClass: string;
  badgeClass: string;
  status: "Live" | "In Progress" | "Archived";
  year: string;
  demo?: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "JBM Trading Company",
    category: "Web",
    tagline: "Inventory & sales system for a wholesale trading business",
    description:
      "The JBM Trading System is a full-stack web application designed to digitize and streamline the inventory and sales operations of a wholesale trading business. Built to transition manual processes into an automated environment, the system bridges the gap between high-fidelity design and functional backend management.",
    challenges:
      "Translating high-fidelity UI designs into a fully functional system while replacing manual inventory and sales workflows with reliable, automated processes.",
    features: [
      "Inventory management & tracking",
      "Sales recording and reporting",
      "Role-based access for staff",
      "Responsive admin dashboard",
      "Automated workflow from design to backend",
    ],
    tags: ["TypeScript", "PHP", "JavaScript", "Tailwind", "HTML", "CSS"],
    emoji: "🏪",
    image: jbmTradingImage,
    color: "#10b981",
    accentTextClass: "text-emerald-700 dark:text-emerald-300",
    badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200",
    status: "Live",
    year: "2025",
    demo: "https://jbm-smart-trade.vercel.app/",
  },
  {
    id: "2",
    title: "iMSafe v2.0",
    category: "Web",
    tagline: "Community disaster reporting and response coordination platform",
    description:
      "iMSafe v2.0 is a full-stack disaster monitoring platform that turns community observations into response-ready incident records. It combines guided rapid assessments, precise Philippine location data, public report tracking, live operational dashboards, and official weather and hazard context to help communities and responders coordinate clearly.",
    challenges:
      "Designing a trustworthy end-to-end emergency workflow that captures enough structured detail for responders without slowing down people reporting under pressure, while keeping public status updates, live data, and sensitive evidence secure.",
    features: [
      "Guided, color-coded rapid incident assessments",
      "Philippine location lookup & geolocation",
      "Public report tracking with status updates",
      "Live admin dashboard, maps & analytics",
      "Evacuation capacity and hazard advisories",
      "AI-assisted safety guidance and email alerts",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "Leaflet", "OpenAI API", "HTML/CSS"],
    emoji: "🚨",
    image: imSafeImage,
    color: "#14b8a6",
    accentTextClass: "text-teal-700 dark:text-teal-300",
    badgeClass: "bg-teal-100 text-teal-800 dark:bg-teal-950/70 dark:text-teal-200",
    status: "Live",
    year: "2026",
    demo: "https://imsafev2.com/",
  },
];

type ProjectFilter = "All" | Project["category"];

const categories: ProjectFilter[] = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

const STATUS_COLORS: Record<string, string> = {
  Live: "#10b981",
  "In Progress": "#f59e0b",
  Archived: "#6b7280",
};

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [active, setActive] = useState<Project | null>(null);
  const activeTrigger = useRef<HTMLButtonElement | null>(null);

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work."
      description="A handful of projects I'm proud of. Each one taught me something valuable. Tap any card to explore the details."
    >
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => {
          const count = c === "All"
            ? projects.length
            : projects.filter((project) => project.category === c).length;

          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`min-h-10 px-4 rounded-full border text-sm inline-flex items-center gap-2 transition-[background-color,border-color,color] duration-200 ${
                filter === c
                  ? "border-primary text-primary-foreground"
                  : "border-border/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
              style={
                filter === c
                  ? { background: "var(--vibrant)", borderColor: "var(--vibrant)" }
                  : {}
              }
            >
              <span>{c}</span>
              <span
                className={`text-[11px] tabular-nums ${
                  filter === c ? "text-primary-foreground/75" : "text-muted-foreground/75"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects grid */}
      <motion.div layout className="grid sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.button
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28 }}
              whileHover={{ y: -5 }}
              onClick={(event) => {
                activeTrigger.current = event.currentTarget;
                setActive(p);
              }}
              className="group relative h-full flex flex-col text-left rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden transition-shadow hover:shadow-lg"
            >
              {/* Color header strip */}
              <div
                className="h-1 w-full"
                style={{ background: p.color }}
              />

              {/* Project image */}
              {p.image && (
                <div className="relative h-44 w-full overflow-hidden border-b border-border/60 bg-muted/40">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={720}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Bottom fade for legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Gradient hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top left, ${p.color}12 0%, transparent 60%)`,
                }}
              />

              <div className="relative p-6 flex flex-1 flex-col">
                {/* Top row */}
                <div className="flex items-start justify-between mb-4 gap-3">
                  {!p.image && <div className="text-4xl">{p.emoji}</div>}
                  {p.image && (
                    <div className="min-w-0 flex-1">
                      <h3
                        className="truncate"
                        style={{ fontWeight: 600, letterSpacing: "-0.01em" }}
                      >
                        {p.title}
                      </h3>
                    </div>
                  )}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${p.badgeClass}`}
                    >
                      {p.category}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: STATUS_COLORS[p.status] }}
                      />
                      <span className="text-xs">{p.status}</span>
                    </div>
                  </div>
                </div>

                {/* Text */}
                {!p.image && (
                  <h3 style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {p.title}
                  </h3>
                )}
                <p className="mt-1 text-pretty text-muted-foreground text-sm line-clamp-2">
                  {p.tagline}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-md bg-muted text-foreground/70"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tags.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-foreground/70">
                      +{p.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer row */}
                <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium ${p.accentTextClass}`}
                  >
                    View project
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs">{p.year}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            activeTrigger.current?.focus();
          }}
        >
          {active && (
            <>
              {/* Color bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                style={{ background: active.color }}
              />

              {active.image && (
                <div className="relative w-full overflow-hidden rounded-xl border border-border/60 bg-muted/40 max-h-[300px] flex items-center justify-center">
                  <img
                    src={active.image}
                    alt={active.title}
                    decoding="async"
                    className="w-full h-auto max-h-[300px] object-contain"
                  />
                </div>
              )}

              <DialogHeader className="pt-2">
                <div className="flex items-start gap-4">
                  {!active.image && <div className="text-5xl">{active.emoji}</div>}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full ${active.badgeClass}`}
                      >
                        {active.category}
                      </span>
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1"
                        style={{
                          background: `${STATUS_COLORS[active.status]}20`,
                          color: STATUS_COLORS[active.status],
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: STATUS_COLORS[active.status] }}
                        />
                        {active.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{active.year}</span>
                    </div>
                    <DialogTitle style={{ fontSize: "1.4rem", letterSpacing: "-0.02em" }}>
                      {active.title}
                    </DialogTitle>
                    <DialogDescription className="mt-1">{active.tagline}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{active.description}</p>

              {/* Challenge */}
              <div className="p-4 rounded-xl border border-border bg-muted/30">
                <div className="text-sm" style={{ fontWeight: 600 }}>
                  Key Challenge
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{active.challenges}</p>
              </div>

              {/* Features */}
              <div>
                <div className="text-sm mb-2" style={{ fontWeight: 600 }}>
                  Highlights
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {active.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: active.color }}
                      />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div>
                <div className="text-sm mb-2" style={{ fontWeight: 600 }}>
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-md border border-border bg-card text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live demo action */}
              {active.demo && (
                <div className="flex gap-3 pt-1">
                  <Button
                    asChild
                    className="rounded-xl"
                    style={{
                      background: "var(--vibrant)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    <a href={active.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1.5" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
