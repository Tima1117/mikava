"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type HeroCopy = {
  eyebrow: string; words: [string, string]; h1: string; h1em: string; sub: string; rating: string;
  cta: string; cta2: string; hint: string;
  badges: [string, string][];
  chips: { t: string; s: string }[];
};

export function WaIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" /></svg>;
}

export function HeroVideo({ c, wa }: { c: HeroCopy; wa: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const u = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    u();
    window.addEventListener("resize", u);
    return () => window.removeEventListener("resize", u);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.5 });
  const fixed = useMotionValue(1);
  const p = reduce ? fixed : spring;

  const mobile = vp.w < 760;
  const w0 = mobile ? Math.min(vp.w * 0.78, 320) : Math.min(vp.w * 0.46, 720);
  const h0 = mobile ? w0 * 1.25 : w0 * 0.58;

  const width = useTransform(p, [0, 1], [w0, vp.w]);
  const height = useTransform(p, [0, 1], [h0, vp.h]);
  const radius = useTransform(p, [0, 0.85], [22, 0]);
  const shift = useTransform(p, [0, 0.7], [0, mobile ? vp.w * 0.7 : vp.w * 0.44]);
  const shiftNeg = useTransform(shift, v => -v);
  const titleOp = useTransform(p, [0.45, 0.8], [1, 0]);
  const gridOp = useTransform(p, [0, 0.8], [1, 0]);
  const hintOp = useTransform(p, [0, 0.2], [1, 0]);
  const contentOp = useTransform(p, [0.8, 1], [0, 1]);
  const contentY = useTransform(p, [0.8, 1], [30, 0]);
  const contentEvents = useTransform(contentOp, v => (v > 0.5 ? "auto" : "none"));
  const shade = useTransform(p, [0.4, 1], [0.05, 0.8]);
  const chip0 = useTransform(p, [0.1, 0.22, 0.5, 0.62], [0, 1, 1, 0]);
  const chip1 = useTransform(p, [0.22, 0.34, 0.58, 0.7], [0, 1, 1, 0]);
  const chip2 = useTransform(p, [0.34, 0.46, 0.66, 0.78], [0, 1, 1, 0]);
  const chipY = useTransform(p, [0, 1], [40, -40]);
  const chipOps = [chip0, chip1, chip2];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22 });
  const sy = useSpring(my, { stiffness: 70, damping: 22 });
  const rotY = useTransform([sx, p], ([x, pr]) => (x as number) * (1 - (pr as number)) * 6);
  const rotX = useTransform([sy, p], ([y, pr]) => -(y as number) * (1 - (pr as number)) * 6);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  return (
    <section ref={ref} className="vhero" id="top" aria-label="MIKAVA estate">
      <div className="vhero-stage">
        <motion.div className="vhero-grid" style={{ opacity: gridOp }} aria-hidden />
        <motion.p className="vhero-eyebrow" style={{ opacity: titleOp }}>{c.eyebrow}</motion.p>

        <motion.div className="vhero-frame" style={{ width, height, borderRadius: radius, rotateX: rotX, rotateY: rotY }}>
          <video className="vhero-video" src="/video/hero.mp4" poster="/video/hero-poster.jpg" autoPlay muted loop playsInline />
          <motion.div className="vhero-shade" style={{ opacity: shade }} />
        </motion.div>

        <motion.div className="vhero-title" style={{ opacity: titleOp }} aria-hidden>
          <motion.span style={{ x: shiftNeg }}>{c.words[0]}</motion.span>
          <motion.span style={{ x: shift }}>{c.words[1]}</motion.span>
        </motion.div>

        <div className="vhero-chips" aria-hidden>
          {c.chips.map((ch, i) => (
            <motion.div key={ch.t} className={`vhero-chip vhero-chip-${i}`} style={{ opacity: chipOps[i], y: chipY }}>
              <i />
              <b>{ch.t}</b>
              <span>{ch.s}</span>
            </motion.div>
          ))}
        </div>

        <motion.div className="vhero-content" style={{ opacity: contentOp, y: contentY, pointerEvents: contentEvents }}>
          <h1 className="vhero-h1">{c.h1} <em>{c.h1em}</em></h1>
          <p className="vhero-sub">{c.sub}</p>
          <p className="vhero-rating"><span>★★★★★</span>{c.rating}</p>
          <div className="vhero-actions">
            <a className="btn btn-wa" href={wa} target="_blank" rel="noopener noreferrer"><WaIcon />{c.cta}</a>
            <a className="btn btn-ghost" href="#listings">{c.cta2}</a>
          </div>
          <ul className="vhero-badges">
            {c.badges.map(([b, s]) => <li key={s}><b>{b}</b><span>{s}</span></li>)}
          </ul>
        </motion.div>

        <motion.div className="vhero-hint" style={{ opacity: hintOp }} aria-hidden>
          <span>{c.hint}</span>
          <motion.span className="vhero-hint-dot" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>↓</motion.span>
        </motion.div>
      </div>
    </section>
  );
}
