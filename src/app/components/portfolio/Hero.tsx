import { motion } from "motion/react";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import avatarImg from "../../../imports/image-7.png";

const ROLES = [
  "BSIT Student",
  "Full-Stack Developer",
  "Web Developer",
  "Database Enthusiast",
  "Lifelong Learner",
];

export function Hero() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          80,
        );
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length - 1)),
          40,
        );
      } else {
        timeout = setTimeout(() => {
          setRoleIdx((r) => (r + 1) % ROLES.length);
          setTyping(true);
        }, 300);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-32 md:pb-20"
    >
      {/* Mouse-tracked radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50 transition-all duration-300"
        style={{
          background: `radial-gradient(700px circle at ${pos.x}px ${pos.y}px, var(--vibrant-muted), transparent 60%)`,
        }}
      />

      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_3%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_3%,transparent)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] opacity-60" />

      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--vibrant)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--vibrant)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center w-full">
        {/* Left content */}
        <div>
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            style={{
              fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 700,
            }}
          >
            Hi, I'm{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--vibrant) 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Adriane James Orola
            </span>
            .
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-2"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              letterSpacing: "-0.02em",
              fontWeight: 600,
            }}
          >
            <span className="text-muted-foreground">
              <span style={{ paddingRight: "0.15em" }}>{displayed}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[3px] h-[1em] align-middle"
                style={{ background: "var(--vibrant)" }}
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-muted-foreground leading-relaxed"
            style={{ fontSize: "1.05rem" }}
          >
            2nd-year BSIT student from Batangas, Philippines, passionate about
            software development, web technologies, and databases. I build
            responsive, user-friendly applications and love understanding how
            complex systems work end to end.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              asChild
              className="group rounded-full px-6 shadow-lg"
              style={{
                background: "var(--vibrant)",
                color: "#fff",
                border: "none",
              }}
            >
              <a href="#projects">
                View my work
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-6 border-border/80 hover:border-primary/60"
              asChild
            >
              <a href="#cv">
                <Download className="w-4 h-4 mr-1.5" />
                Download CV
              </a>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex items-center gap-3"
          >
            {[
              { icon: Github, href: "https://github.com/AdrianeOrola", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/adriane-orola-694242319/", label: "LinkedIn" },
              { icon: Twitter, href: "https://x.com/lohdri", label: "Twitter" },
              { icon: Instagram, href: "https://www.instagram.com/adriholiczx/", label: "Instagram" },
            ].map(({ icon: Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 grid place-items-center rounded-full border border-border/70 bg-card/60 backdrop-blur-sm hover:border-primary/60 hover:text-primary transition-all hover:scale-110 hover:shadow-sm"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>

        </div>

        {/* Right: Code card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative aspect-[4/4.5] max-w-[400px] mx-auto w-full order-first lg:order-none mt-4 lg:mt-0"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-3xl blur-2xl opacity-20"
            style={{ background: "var(--vibrant)" }}
          />

          {/* Main card */}
          <div className="relative h-full rounded-3xl border border-border bg-card/70 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Profile image filling card */}
            <motion.img
              src={avatarImg}
              alt="Adriane James Orola"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Subtle gradient overlay for legibility */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, color-mix(in oklab, var(--background) 75%, transparent) 100%)",
              }}
            />

            {/* Corner accent brackets */}
            <span
              className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl-md"
              style={{ borderColor: "var(--vibrant)" }}
            />
            <span
              className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 rounded-br-md"
              style={{ borderColor: "var(--vibrant)" }}
            />

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute bottom-5 left-5 right-5 flex items-center gap-2.5"
            >
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </span>
              <div className="flex-1 min-w-0">
                <div
                  className="text-white drop-shadow"
                  style={{
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    fontSize: "1rem",
                  }}
                >
                  Adriane Orola
                </div>
                <div className="text-[11px] text-white/80 font-mono">
                  // BSIT · Full-Stack Dev
                </div>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 -right-4 px-3 py-1.5 rounded-full border border-border bg-card/90 backdrop-blur-sm shadow-lg text-sm"
            >
              ⚡ React
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-28 -left-4 px-3 py-1.5 rounded-full border border-border bg-card/90 backdrop-blur-sm shadow-lg text-sm"
            >
              🐍 Python
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-14 right-4 px-3 py-1.5 rounded-full border border-border bg-card/90 backdrop-blur-sm shadow-lg text-sm"
            >
              ☕ Java
            </motion.div>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4.8, repeat: Infinity }}
              className="absolute top-36 left-4 px-3 py-1.5 rounded-full border border-border bg-card/90 backdrop-blur-sm shadow-lg text-sm"
            >
              🌐 Networks
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-6 rounded-full"
          style={{ background: "var(--vibrant)" }}
        />
      </motion.div>
    </section>
  );
}