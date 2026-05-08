import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [clicking, setClicking] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [role='button'], input, textarea, select"));
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  // Smooth trailing cursor with RAF (no dependency on state)
  useEffect(() => {
    let rafId: number;
    const animate = () => {
      const target = posRef.current;
      const curr = trailRef.current;
      const nx = curr.x + (target.x - curr.x) * 0.12;
      const ny = curr.y + (target.y - curr.y) * 0.12;
      trailRef.current = { x: nx, y: ny };
      setTrail({ x: nx, y: ny });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="pointer-events-none fixed z-[100] rounded-full mix-blend-difference hidden md:block"
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          width: clicking ? 8 : 10,
          height: clicking ? 8 : 10,
        }}
        transition={{ type: "spring", stiffness: 900, damping: 40, mass: 0.15 }}
        style={{ background: "white" }}
      />

      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed z-[99] rounded-full border border-white/70 mix-blend-difference hidden md:block"
        animate={{
          x: trail.x - (hover ? 22 : 16),
          y: trail.y - (hover ? 22 : 16),
          width: hover ? 44 : 32,
          height: hover ? 44 : 32,
          opacity: hover ? 0.9 : 0.5,
          scale: clicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
      />
    </>
  );
}
