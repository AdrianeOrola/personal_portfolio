import { motion } from "motion/react";
import { useState, useRef } from "react";
import { Section } from "./Section";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Send,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const SOCIALS = [
  {
    icon: Github,
    label: "GitHub",
    handle: "@AdrianeOrola",
    href: "https://github.com/AdrianeOrola",
    color: "#6b7280",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "in/adriane-orola",
    href: "https://www.linkedin.com/in/adriane-orola-694242319/",
    color: "#0a66c2",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    handle: "@lohdri",
    href: "https://x.com/lohdri",
    color: "#1d9bf0",
  },
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@adriholiczx",
    href: "https://www.instagram.com/adriholiczx/",
    color: "#e1306c",
  },
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-cfcb1d94/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ name, email, subject, message }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Contact form error response:", data);
        toast.error(data?.error ?? "Something went wrong. Please try again.");
      } else {
        setSent(true);
        toast.success("Message sent — I'll reply within 24 hours! 🎉");
        form.reset();
        setTimeout(() => setSent(false), 4000);
      }
    } catch (err) {
      console.error("Contact form fetch error:", err);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together."
      description="Have a project, role, or just want to say hi? My inbox is always open — I reply within 24 hours."
    >
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8">
        {/* Left: info */}
        <div className="space-y-4">
          {/* Availability card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </span>
              <span style={{ fontWeight: 600 }}>Currently available</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Open to internships, freelance projects, and student
              collaborations while continuing my BSIT studies.
            </p>
          </motion.div>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-sm space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-muted grid place-items-center">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="text-sm" style={{ fontWeight: 500 }}>adrianeorola10@gmail.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-muted grid place-items-center">
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Location</div>
                <div className="text-sm" style={{ fontWeight: 500 }}>Batangas, Philippines · Remote-friendly</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-muted grid place-items-center">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Response time</div>
                <div className="text-sm" style={{ fontWeight: 500 }}>Usually within 24 hours</div>
              </div>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="space-y-2"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div
                  className="w-9 h-9 rounded-xl grid place-items-center"
                  style={{ background: `${s.color}18`, color: s.color }}
                >
                  <s.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm" style={{ fontWeight: 500 }}>{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.handle}</div>
                </div>
                <div className="w-5 h-5 rounded-full bg-muted grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs">→</span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: form */}
        <motion.form
          ref={formRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm space-y-4 relative"
        >
          {/* Success overlay */}
          {sent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 rounded-2xl bg-background/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3"
            >
              <CheckCircle2
                className="w-12 h-12"
                style={{ color: "#10b981" }}
              />
              <div style={{ fontWeight: 600 }}>Message sent!</div>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </motion.div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Jane Doe"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Project inquiry / Job opportunity"
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project or opportunity..."
              className="rounded-xl resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl group h-11"
            style={{
              background: submitting ? undefined : "var(--vibrant)",
              color: submitting ? undefined : "#fff",
              border: "none",
            }}
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Sending...
              </div>
            ) : (
              <>
                Send message
                <Send className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your message is sent directly to my inbox. No spam, ever.
          </p>
        </motion.form>
      </div>
    </Section>
  );
}