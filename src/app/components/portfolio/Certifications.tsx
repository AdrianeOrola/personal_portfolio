import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Section } from "./Section";
import { Award, ExternalLink, Calendar, Building2, Hash, Download, Maximize2, X } from "lucide-react";
import ic3CertPdf from "../../../imports/IC3_PASSED_CERT.pdf?url";
import ic3CertImage from "../../../imports/image-6.png";

type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  image: string;
  pdf?: string;
  color: string;
};

const certifications: Certification[] = [
  {
    id: "ic3-gs6-l1",
    title: "IC3 Digital Literacy Certification — GS6 Level 1",
    issuer: "Certiport (Pearson VUE)",
    date: "October 20, 2025",
    credentialId: "Jocp-4wNo",
    image: ic3CertImage,
    pdf: ic3CertPdf,
    color: "#10b981",
  },
];

export function Certifications() {
  const [active, setActive] = useState<Certification | null>(null);

  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Credentials & achievements."
      description="A growing collection of certifications I've earned along the way. Click any card to preview the full certificate."
    >
      {certifications.length === 0 ? (
        <div className="p-10 rounded-2xl border border-dashed border-border/70 bg-card/40 text-center text-muted-foreground text-sm">
          Certifications coming soon.
        </div>
      ) : (
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {certifications.map((c, i) => (
              <motion.button
                key={c.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                onClick={() => setActive(c)}
                className="group relative text-left rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-border/80"
              >
                <div className="h-1 w-full" style={{ background: c.color }} />

                <div
                  className="relative w-full aspect-[4/3] overflow-hidden bg-muted/40 border-b border-border/50"
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-items-center"
                    style={{
                      background: `linear-gradient(180deg, transparent 40%, ${c.color}40 100%)`,
                    }}
                  >
                    <span className="px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-xs inline-flex items-center gap-1.5 border border-border/60">
                      <Maximize2 className="w-3.5 h-3.5" />
                      Preview
                    </span>
                  </div>
                </div>

                <div className="relative p-5">
                  <div className="flex items-start justify-between mb-3 gap-3">
                    <div
                      className="w-10 h-10 rounded-xl grid place-items-center shrink-0"
                      style={{ background: `${c.color}18`, color: c.color }}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 shrink-0"
                      style={{
                        background: "var(--vibrant-muted)",
                        color: "var(--vibrant)",
                      }}
                    >
                      <Calendar className="w-3 h-3" />
                      {c.date}
                    </span>
                  </div>

                  <h3 style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {c.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="truncate">{c.issuer}</span>
                  </div>

                  {c.credentialId && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Hash className="w-3 h-3" />
                      <span className="font-mono truncate">{c.credentialId}</span>
                    </div>
                  )}

                  <div
                    className="mt-4 flex items-center gap-1.5 text-sm transition-colors"
                    style={{ color: c.color }}
                  >
                    <span>View certificate</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative w-full max-w-5xl max-h-[92vh] rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: active.color }}
              />

              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full grid place-items-center bg-background/80 backdrop-blur border border-border hover:bg-background transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="px-5 sm:px-7 pt-6 pb-4 flex items-start gap-4 border-b border-border/60">
                <div
                  className="w-12 h-12 rounded-xl grid place-items-center shrink-0"
                  style={{ background: `${active.color}18`, color: active.color }}
                >
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0 pr-10">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full inline-flex items-center gap-1"
                      style={{
                        background: "var(--vibrant-muted)",
                        color: "var(--vibrant)",
                      }}
                    >
                      <Calendar className="w-3 h-3" />
                      {active.date}
                    </span>
                    {active.credentialId && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 bg-muted/60 text-muted-foreground border border-border/60">
                        <Hash className="w-3 h-3" />
                        <span className="font-mono">{active.credentialId}</span>
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", letterSpacing: "-0.02em", fontWeight: 600 }}>
                    {active.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="w-3.5 h-3.5" />
                    {active.issuer}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4 sm:p-6 bg-muted/30">
                <motion.img
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  src={active.image}
                  alt={active.title}
                  className="mx-auto max-w-full h-auto max-h-[68vh] object-contain rounded-lg shadow-lg"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 px-5 sm:px-7 py-4 border-t border-border/60 bg-card/60">
                {active.pdf && (
                  <a
                    href={active.pdf}
                    download
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-colors"
                    style={{ background: "var(--vibrant)", color: "#fff" }}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
