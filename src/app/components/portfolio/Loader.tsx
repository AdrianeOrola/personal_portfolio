import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const PHRASES = ["Initializing...", "Loading portfolio...", "Almost ready..."];

export function Loader({ show }: { show: boolean }) {
  const [progress, setProgress] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 18 + 6;
      });
    }, 120);
    const phraseTimer = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
    }, 600);
    return () => { clearInterval(interval); clearInterval(phraseTimer); };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, var(--vibrant-muted) 0%, transparent 70%)",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8 text-center"
          >
            <div
              className="text-4xl tracking-tighter mb-1"
              style={{ fontWeight: 700, letterSpacing: "-0.05em" }}
            >
              <span style={{ color: "var(--vibrant)" }}>adriane</span>
              <span className="text-foreground">.dev</span>
            </div>
            <motion.p
              key={phraseIdx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-muted-foreground tracking-widest uppercase"
            >
              {PHRASES[phraseIdx]}
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 h-1 rounded-full overflow-hidden bg-muted relative">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--vibrant)" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>

          {/* Percentage */}
          <motion.span
            className="mt-3 text-xs text-muted-foreground tabular-nums"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.span>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-border/40 rounded-tl-2xl" />
          <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-border/40 rounded-tr-2xl" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-border/40 rounded-bl-2xl" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-border/40 rounded-br-2xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
