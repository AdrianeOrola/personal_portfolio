import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({
  dark,
  onToggleTheme,
}: {
  dark: boolean;
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 20);

      // Active section detection
      const sectionIds = ["about", "skills", "projects", "certifications", "contact"];
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-transparent overflow-hidden">
        <motion.div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, var(--vibrant), var(--primary))",
            width: `${scrollProgress}%`,
          }}
          transition={{ ease: "linear", duration: 0 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group"
          style={{ fontWeight: 700, letterSpacing: "-0.03em" }}
        >
          <div
            className="w-7 h-7 rounded-lg grid place-items-center text-white text-xs transition-transform group-hover:scale-110"
            style={{ background: "var(--vibrant)" }}
          >
            AO
          </div>
          <span>
            <span style={{ color: "var(--vibrant)" }}>adriane</span>
            <span className="text-foreground">.dev</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = activeSection === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-vibrant-muted"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="rounded-full w-9 h-9"
          >
            <motion.span
              key={dark ? "moon" : "sun"}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.span>
          </Button>

          {/* Mobile menu btn */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full w-9 h-9"
            onClick={() => setOpen((o) => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className={`py-2.5 px-3 rounded-lg text-sm transition-colors ${
                    activeSection === l.href.slice(1)
                      ? "text-foreground bg-vibrant-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
