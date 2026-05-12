import { motion } from "motion/react";
import { Section } from "./Section";
import {
  Code2,
  Server,
  Palette,
  Database,
  Network,
  Wrench,
  Box,
} from "lucide-react";
import { useState } from "react";

type Tech = { name: string; slug: string; color: string };

const groups: {
  icon: typeof Code2;
  title: string;
  color: string;
  items: Tech[];
}[] = [
  {
    icon: Code2,
    title: "Frontend",
    color: "#6366f1",
    items: [
      { name: "React", slug: "react", color: "61DAFB" },
      { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
      { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
      { name: "HTML5", slug: "html5", color: "E34F26" },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    color: "#10b981",
    items: [
      { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
      { name: "Java", slug: "openjdk", color: "FFFFFF" },
      { name: "Spring", slug: "spring", color: "6DB33F" },
      { name: "Python", slug: "python", color: "3776AB" },
      { name: "FastAPI", slug: "fastapi", color: "009688" },
      { name: "GraphQL", slug: "graphql", color: "E10098" },
    ],
  },
  {
    icon: Database,
    title: "Databases",
    color: "#f59e0b",
    items: [
      { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { name: "MongoDB", slug: "mongodb", color: "47A248" },
      { name: "MySQL", slug: "mysql", color: "4479A1" },
      { name: "Redis", slug: "redis", color: "FF4438" },
      { name: "Supabase", slug: "supabase", color: "3FCF8E" },
      { name: "Prisma", slug: "prisma", color: "FFFFFF" },
    ],
  },
  {
    icon: Network,
    title: "Networking",
    color: "#3b82f6",
    items: [
      { name: "Cisco", slug: "cisco", color: "1BA0D7" },
      { name: "Wireshark", slug: "wireshark", color: "1679A7" },
      { name: "Cloudflare", slug: "cloudflare", color: "F38020" },
      { name: "OpenSSL", slug: "openssl", color: "721412" },
      { name: "Nginx", slug: "nginx", color: "009639" },
      { name: "Postman", slug: "postman", color: "FF6C37" },
    ],
  },
  {
    icon: Palette,
    title: "UI / Design",
    color: "#ec4899",
    items: [
      { name: "Figma", slug: "figma", color: "F24E1E" },
      { name: "Adobe XD", slug: "adobexd", color: "FF61F6" },
      { name: "Photoshop", slug: "adobephotoshop", color: "31A8FF" },
      { name: "Framer", slug: "framer", color: "0055FF" },
      { name: "Canva", slug: "canva", color: "00C4CC" },
      { name: "Storybook", slug: "storybook", color: "FF4785" },
    ],
  },
  {
    icon: Wrench,
    title: "DevOps & Tools",
    color: "#8b5cf6",
    items: [
      { name: "Git", slug: "git", color: "F05032" },
      { name: "GitHub", slug: "github", color: "FFFFFF" },
      { name: "Docker", slug: "docker", color: "2496ED" },
      { name: "Vercel", slug: "vercel", color: "FFFFFF" },
      { name: "VS Code", slug: "visualstudiocode", color: "007ACC" },
      { name: "Linux", slug: "linux", color: "FCC624" },
    ],
  },
];

function TechLogo({
  tech,
  accent,
  delay,
}: {
  tech: Tech;
  accent: string;
  delay: number;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -4, scale: 1.06 }}
      className="group/logo relative flex flex-col items-center gap-2"
      title={tech.name}
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 3 + ((delay * 4) % 2),
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl grid place-items-center transition-all duration-300 ring-1 ring-white/10"
        style={{
          background:
            "linear-gradient(145deg, #1a2030 0%, #0b0f1a 100%)",
        }}
      >
        {/* Hover glow */}
        <span
          className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 group-hover/logo:opacity-50 blur-lg transition-opacity duration-300"
          style={{ background: accent }}
        />
        {failed ? (
          <Box
            className="relative w-6 h-6 sm:w-7 sm:h-7"
            style={{ color: accent }}
            aria-label={`${tech.name} (logo unavailable)`}
          />
        ) : (
          <img
            src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
            alt={tech.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="relative w-6 h-6 sm:w-7 sm:h-7 object-contain transition-transform duration-300 group-hover/logo:scale-110"
          />
        )}
      </motion.div>
      <span className="text-[10px] sm:text-[11px] text-muted-foreground text-center leading-tight">
        {tech.name}
      </span>
    </motion.div>
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
            className="group relative p-5 sm:p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden transition-shadow hover:shadow-lg"
          >
            {/* Color accent glow */}
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{ background: g.color }}
            />

            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl grid place-items-center"
                  style={{ background: `${g.color}20`, color: g.color }}
                >
                  <g.icon className="w-5 h-5" />
                </div>
                <h3 style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                  {g.title}
                </h3>
              </div>

              {/* Logo grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {g.items.map((tech, j) => (
                  <TechLogo
                    key={tech.name}
                    tech={tech}
                    accent={g.color}
                    delay={i * 0.05 + j * 0.05}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
