import { motion, useInView } from "motion/react";
import { Section } from "./Section";
import {
  GraduationCap,
  Film,
  Gamepad2,
  BookOpen,
  Church,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

const timeline = [
  {
    year: "2024 — Present",
    title: "BS in Information Technology",
    org: "National University Lipa, Philippines",
    icon: GraduationCap,
    desc: "Pursuing a BSIT degree with focus on software development, web technologies, and database systems.",
    color: "#f59e0b",
  },
  {
    year: "2023 — 2024",
    title: "Senior High School",
    org: "San Celestino Integrated National High School",
    icon: GraduationCap,
    desc: "Completed secondary education with a focus on academic excellence and IT fundamentals.",
    color: "var(--vibrant)",
  },
];

const interests = [
  { icon: Film, label: "Watching movies" },
  { icon: Gamepad2, label: "Playing online games" },
  { icon: BookOpen, label: "Reading" },
  { icon: Church, label: "Church" },
];

const STATS = [
  { value: 3, suffix: "", label: "Projects completed" },
  { value: 3, suffix: "", label: "GitHub repos" },
  { value: 1, suffix: "", label: "Certification earned" },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <Section
      id="about"
      eyebrow="About"
      title="A developer who cares about craft."
      description="I'm a 2nd-year BSIT student passionate about software development, web technologies, databases, and creating modern digital experiences."
    >
      {/* Stats row */}
      <div
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm text-center group hover:border-primary/40 transition-colors"
          >
            <div
              className="tabular-nums mb-1"
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "var(--vibrant)",
              }}
            >
              <AnimatedCounter value={s.value} suffix={s.suffix} inView={statsInView} />
            </div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Bio + interests */}
        <div>
          <p className="text-muted-foreground leading-relaxed">
            I'm a 2nd-year BSIT student at National University Lipa, passionate
            about software development, web technologies, and databases. I enjoy
            building responsive, user-friendly applications while continuously
            sharpening my technical skills.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Highly disciplined, consistent, and motivated, I love digging into
            how complex systems work from end to end — from clean React
            interfaces to PHP backends and SQL data layers. I'm always exploring
            new tools and modern digital experiences.
          </p>

          <h3
            className="mt-10 mb-4"
            style={{ fontWeight: 600, letterSpacing: "-0.01em" }}
          >
            Beyond the code
          </h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/70 bg-card/60 backdrop-blur-sm hover:border-primary/50 hover:bg-accent/40 transition-all cursor-default"
              >
                <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-border via-border/60 to-transparent" />

          <div className="space-y-6">
            {timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative pl-14 group"
              >
                {/* Icon dot */}
                <div
                  className="absolute left-0 top-0 w-10 h-10 rounded-full border-2 border-border bg-card grid place-items-center shadow-sm transition-transform group-hover:scale-110"
                  style={{ borderColor: t.color }}
                >
                  <t.icon className="w-4 h-4" style={{ color: t.color }} />
                </div>

                <div
                  className="p-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-all group-hover:shadow-sm"
                >
                  <div
                    className="text-xs px-2 py-0.5 rounded-full inline-block mb-2"
                    style={{
                      background: "var(--vibrant-muted)",
                      color: "var(--vibrant)",
                    }}
                  >
                    {t.year}
                  </div>
                  <div style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {t.title}
                  </div>
                  <div className="text-sm text-muted-foreground">{t.org}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
