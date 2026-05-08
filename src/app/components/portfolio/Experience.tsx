import { motion } from "motion/react";
import { Section } from "./Section";
import {
  Award,
  Trophy,
  Briefcase,
  GraduationCap,
  MapPin,
  CalendarDays,
  ExternalLink,
} from "lucide-react";

const workExperience = [
  {
    title: "Software Engineer Intern",
    org: "Northwind Labs",
    location: "Berlin, Germany",
    period: "Jul 2024 — Present",
    type: "Full-time Internship",
    color: "#10b981",
    icon: Briefcase,
    responsibilities: [
      "Built internal tooling dashboard with React, TypeScript and Node.js",
      "Optimized PostgreSQL queries, reducing average response time by 40%",
      "Implemented CI/CD pipelines with GitHub Actions and Docker",
    ],
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    title: "Freelance Full-Stack Developer",
    org: "Self-employed",
    location: "Remote",
    period: "Jan 2023 — Jun 2024",
    type: "Freelance",
    color: "var(--vibrant)",
    icon: Briefcase,
    responsibilities: [
      "Delivered 12+ web applications for startups and SMBs",
      "Tech consulting on architecture, databases, and deployment strategies",
      "Maintained long-term relationships with 5+ repeat clients",
    ],
    tags: ["React", "Next.js", "Stripe", "Supabase"],
  },
  {
    title: "Teaching Assistant — Intro to CS",
    org: "State University",
    location: "On-campus",
    period: "Sep 2022 — Dec 2022",
    type: "Part-time",
    color: "#f59e0b",
    icon: GraduationCap,
    responsibilities: [
      "Led weekly lab sessions for 30+ students in Python programming",
      "Graded assignments and provided detailed written feedback",
      "Held biweekly office hours with 90% student satisfaction rating",
    ],
    tags: ["Python", "Teaching", "Communication"],
  },
];

const certs = [
  {
    title: "AWS Certified Solutions Architect",
    org: "Amazon Web Services",
    year: "2025",
    tag: "Cloud",
    color: "#f59e0b",
    icon: Award,
  },
  {
    title: "Meta Front-End Developer Certificate",
    org: "Coursera / Meta",
    year: "2024",
    tag: "Frontend",
    color: "#3b82f6",
    icon: Award,
  },
  {
    title: "CCNA — Networking Fundamentals",
    org: "Cisco",
    year: "2024",
    tag: "Networks",
    color: "#10b981",
    icon: Award,
  },
  {
    title: "Hackathon — 1st Place",
    org: "StateU CS Hackathon",
    year: "2023",
    tag: "Award",
    color: "#f59e0b",
    icon: Trophy,
  },
  {
    title: "Dean's List (4× consecutive)",
    org: "State University",
    year: "2022–2025",
    tag: "Academic",
    color: "var(--vibrant)",
    icon: GraduationCap,
  },
  {
    title: "Google UX Design Certificate",
    org: "Google / Coursera",
    year: "2023",
    tag: "Design",
    color: "#ec4899",
    icon: Award,
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked & what I've earned."
      description="A timeline of my professional journey, plus the certifications and awards along the way."
    >
      {/* Work Experience */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-7">
          <Briefcase className="w-4 h-4 text-muted-foreground" />
          <h3 style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
            Work Experience
          </h3>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-border via-border/60 to-transparent hidden sm:block" />

          <div className="space-y-5">
            {workExperience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative sm:pl-14 group"
              >
                {/* Icon */}
                <div
                  className="hidden sm:grid absolute left-0 top-5 w-10 h-10 rounded-full border-2 bg-card place-items-center shadow-sm transition-transform group-hover:scale-105"
                  style={{ borderColor: exp.color }}
                >
                  <exp.icon className="w-4 h-4" style={{ color: exp.color }} />
                </div>

                <div className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:shadow-md transition-all">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                        {exp.title}
                      </h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground flex-wrap">
                        <span style={{ color: exp.color === "var(--vibrant)" ? undefined : exp.color, fontWeight: 500 }}>
                          {exp.org}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full shrink-0"
                      style={{
                        background: `${exp.color === "var(--vibrant)" ? "#6366f1" : exp.color}18`,
                        color: exp.color,
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-1.5 mb-4">
                    {exp.responsibilities.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ background: exp.color }}
                        />
                        {r}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications & Awards */}
      <div>
        <div className="flex items-center gap-3 mb-7">
          <Award className="w-4 h-4 text-muted-foreground" />
          <h3 style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
            Certifications & Awards
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div
                className="w-10 h-10 rounded-xl grid place-items-center shrink-0"
                style={{
                  background: `${cert.color === "var(--vibrant)" ? "#6366f1" : cert.color}18`,
                  color: cert.color,
                }}
              >
                <cert.icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className="text-sm truncate"
                  style={{ fontWeight: 600, letterSpacing: "-0.01em" }}
                >
                  {cert.title}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {cert.org} · {cert.year}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${cert.color === "var(--vibrant)" ? "#6366f1" : cert.color}18`,
                    color: cert.color,
                  }}
                >
                  {cert.tag}
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
