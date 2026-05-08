import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Instagram, Heart, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/AdrianeOrola", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/adriane-orola-694242319/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/lohdri", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/adriholiczx/", label: "Instagram" },
];

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-border/60 pt-12 pb-8 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <a
              href="#hero"
              className="inline-flex items-center gap-2 mb-3"
              style={{ fontWeight: 700, letterSpacing: "-0.03em" }}
            >
              <div
                className="w-7 h-7 rounded-lg grid place-items-center text-white text-xs"
                style={{ background: "var(--vibrant)" }}
              >
                AO
              </div>
              <span>
                <span style={{ color: "var(--vibrant)" }}>adriane</span>
                <span className="text-foreground">.dev</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
              Building thoughtful software that makes a difference.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <div className="text-sm mb-3" style={{ fontWeight: 600 }}>
              Navigation
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-0.5 transform inline-block"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm mb-3" style={{ fontWeight: 600 }}>
              Connect
            </div>
            <div className="space-y-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-muted grid place-items-center group-hover:bg-accent transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Orola, Adriane James. All rights reserved.</span>

          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Built with React · Tailwind · Motion
            </span>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollTop}
              className="w-8 h-8 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
