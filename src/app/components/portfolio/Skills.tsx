import { motion, useInView } from "motion/react";
import { Section } from "./Section";
import {
  Code2,
  Server,
  Palette,
  Database,
  Network,
  Wrench,
} from "lucide-react";
import { useRef } from "react";

const groups = [
  {
    icon: Code2,
    title: "Frontend",
    color: "#6366f1",
    items: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Motion / Framer", level: 80 },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    color: "#10b981",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Java / Spring", level: 82 },
      { name: "Python / FastAPI", level: 88 },
      { name: "GraphQL", level: 72 },
    ],
  },
  {
    icon: Database,
    title: "Databases",
    color: "#f59e0b",
    items: [
      { name: "PostgreSQL", level: 86 },
      { name: "MongoDB", level: 78 },
      { name: "Redis", level: 70 },
      { name: "Prisma / ORM", level: 82 },
    ],
  },
  {
    icon: Network,
    title: "Networking",
    color: "#3b82f6",
    items: [
      { name: "TCP/IP protocols", level: 85 },
      { name: "DNS / HTTP(S)", level: 88 },
      { name: "Cisco IOS / CCNA", level: 75 },
      { name: "Wireshark", level: 80 },
    ],
  },
  {
    icon: Palette,
    title: "UI / Design",
    color: "#ec4899",
    items: [
      { name: "Figma", level: 84 },
      { name: "Design Systems", level: 80 },
      { name: "Accessibility", level: 78 },
      { name: "Prototyping", level: 82 },
    ],
  },
  {
    icon: Wrench,
    title: "DevOps & Tools",
    color: "#8b5cf6",
    items: [
      { name: "Git / GitHub", level: 94 },
      { name: "Docker", level: 80 },
      { name: "AWS / Cloud", level: 74 },
      { name: "CI/CD Pipelines", level: 76 },
    ],
  },
];

function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm">{name}</span>
        <span className="text-xs text-muted-foreground tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technologies I work with."
      description="A snapshot of the stack I rely on most. I value depth over breadth and learn exactly what each project needs."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="group relative p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden transition-shadow hover:shadow-md"
          >
            {/* Color accent glow */}
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{ background: g.color }}
            />

            <div className="relative">
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl grid place-items-center mb-4 transition-colors"
                style={{ background: `${g.color}20`, color: g.color }}
              >
                <g.icon className="w-5 h-5" />
              </div>

              <h3 style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                {g.title}
              </h3>

              {/* Skill bars */}
              <div className="mt-4 space-y-3">
                {g.items.map((it, j) => (
                  <SkillBar
                    key={it.name}
                    name={it.name}
                    level={it.level}
                    color={g.color}
                    delay={i * 0.07 + j * 0.06}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom tech chips */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 flex flex-wrap gap-2 justify-center"
      >
        {[
          "React", "TypeScript", "Next.js", "Java", "Python", "Node.js",
          "PostgreSQL", "MongoDB", "Docker", "AWS", "Figma", "Git",
          "TCP/IP", "REST API", "GraphQL", "Spring Boot",
        ].map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full border border-border bg-card/60 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all cursor-default hover:scale-105"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </Section>
  );
}
