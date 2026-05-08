import { motion } from "motion/react";
import { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 px-6 overflow-hidden">
      {/* Subtle section separator glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--vibrant), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-5">
            <div
              className="h-px w-8 rounded-full"
              style={{ background: "var(--vibrant)" }}
            />
            <span
              className="tracking-widest uppercase text-xs"
              style={{ color: "var(--vibrant)", fontWeight: 600 }}
            >
              {eyebrow}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {title}
          </h2>

          {description && (
            <p className="mt-4 text-muted-foreground leading-relaxed" style={{ fontSize: "1.05rem" }}>
              {description}
            </p>
          )}
        </motion.div>

        {children}
      </div>
    </section>
  );
}
