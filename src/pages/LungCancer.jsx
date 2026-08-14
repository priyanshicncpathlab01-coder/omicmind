import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import {
  LungHeroArt,
  AlveolarField,
  FeatureArt,
  FlowIcon,
  SegmentArt,
  ReportArt,
} from '../components/lung/LungArt.jsx';

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   Content — unchanged
================================================================ */

const FEATURES = [
  {
    art: 'detect',
    tag: 'Detection',
    title: 'Tumor Detection & Classification',
    body: 'Automatically identify and classify lung tumor patterns from whole slide images using advanced AI algorithms.',
    points: [
      'Tumor region detection',
      'Histological classification',
      'Tissue segmentation',
      'AI-assisted review',
    ],
  },
  {
    art: 'ihc',
    tag: 'Biomarkers',
    title: 'Quantitative Biomarker Analysis',
    body: 'Enable consistent and reproducible biomarker assessment through AI-powered image analysis.',
    points: [
      'PD-L1 expression',
      'Tumor proportion score (TPS)',
      'Immune cell markers',
      'Additional pathology biomarkers',
    ],
  },
  {
    art: 'spatial',
    tag: 'Microenvironment',
    title: 'Tumor Microenvironment Profiling',
    body: 'Understand interactions between tumor cells, immune cells, and stromal compartments through spatial AI analysis.',
    points: [
      'Immune infiltration',
      'Cellular organization',
      'Spatial relationships',
      'Tissue architecture',
    ],
  },
  {
    art: 'molecular',
    tag: 'Multimodal AI',
    title: 'Molecular & Clinical Prediction',
    body: 'Use multimodal AI to identify molecular patterns and generate predictive insights from pathology images.',
    points: [
      'EGFR-associated patterns',
      'ALK alterations',
      'KRAS-associated features',
      'Therapy response indicators',
    ],
  },
];

const WORKFLOW = [
  { icon: 'ffpe', title: 'FFPE Lung Tissue', body: 'Routine resection and biopsy blocks, no special protocol.' },
  { icon: 'wsi', title: 'Whole Slide Imaging', body: 'Research-grade digitization of the full lung section.' },
  { icon: 'ai', title: 'AI Image Analysis', body: 'Foundation-model inference across every tile.' },
  { icon: 'tumour', title: 'Tumor Identification', body: 'Tumor regions segmented and histologically classified.' },
  { icon: 'biomarker', title: 'Biomarker Quantification', body: 'Objective, repeatable PD-L1, TPS and immune scoring.' },
  { icon: 'molecular', title: 'Molecular Prediction', body: 'Morphology translated into molecular signals.' },
  { icon: 'insights', title: 'Clinical Decision Support', body: 'One reviewable, explainable lung cancer report.' },
];

const SEGMENTS = [
  {
    art: 'lab',
    tag: 'Diagnostics',
    title: 'Pathology Laboratories',
    body: 'Improve diagnostic efficiency and consistency with AI-assisted lung cancer workflows.',
    points: ['Standardized PD-L1 scoring', 'Faster case turnaround', 'Second-read confidence'],
  },
  {
    art: 'research',
    tag: 'Translational',
    title: 'Clinical Research',
    body: 'Accelerate translational research using AI-powered tissue analysis and biomarker discovery.',
    points: ['Cohort-scale analysis', 'Endpoint quantification', 'Reproducible pipelines'],
  },
  {
    art: 'pharma',
    tag: 'Industry',
    title: 'Pharmaceutical Development',
    body: 'Support oncology trials with computational pathology and predictive biomarker insights.',
    points: ['Patient stratification', 'Response biomarkers', 'Auditable study runs'],
  },
];

const BENEFITS = [
  {
    title: 'AI-powered whole slide analysis',
    body: 'Every region of the lung section is examined, not a handful of sampled fields.',
  },
  {
    title: 'Automated tumor detection',
    body: 'Tumor regions found, outlined and classified before the case reaches review.',
  },
  {
    title: 'Quantitative biomarker scoring',
    body: 'Continuous PD-L1 and TPS readouts in place of ordinal, eyeballed estimates.',
  },
  {
    title: 'Spatial tumour ecosystem analysis',
    body: 'Immune infiltration and tissue architecture measured, not approximated.',
  },
  {
    title: 'Molecular intelligence from morphology',
    body: 'EGFR, ALK and KRAS-associated signals surfaced from the slide you already have.',
  },
  {
    title: 'Explainable AI insights',
    body: 'Heatmaps, detections and per-region evidence behind every number.',
  },
];

const REPORT_MODULES = [
  {
    title: 'Histopathology findings',
    body: 'Tissue morphology, growth pattern and histological subtype with per-region confidence.',
  },
  {
    title: 'Tumor measurements',
    body: 'Tumor area, invasive fraction, nuclei counts and mitotic activity, quantified across the slide.',
  },
  {
    title: 'Biomarker scores',
    body: 'PD-L1 TPS, CPS, CD8 density and Ki-67 reported as reproducible numeric values.',
  },
  {
    title: 'Spatial analysis',
    body: 'Tumor, stromal and immune compartments mapped with their spatial relationships.',
  },
  {
    title: 'Molecular predictions',
    body: 'EGFR, ALK, KRAS and therapy-response signals inferred from routine pathology images.',
  },
  {
    title: 'AI visual explanations',
    body: 'Attention heatmaps and region contributions showing the evidence behind every call.',
  },
];

/* ================================================================
   Page-scoped styling — ambient motion the GSAP layer does not own
================================================================ */

const PAGE_CSS = `
.lung-page { position: relative; }

/* --- floating molecular particles --- */
@keyframes lpDrift {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(var(--lp-dx), var(--lp-dy), 0) scale(1.35); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
.lp-particle {
  position: absolute;
  border-radius: 9999px;
  animation: lpDrift var(--lp-dur) ease-in-out infinite;
  animation-delay: var(--lp-delay);
  will-change: transform;
}

/* --- slow breathing aurora behind sections --- */
@keyframes lpAurora {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1);    opacity: 0.7; }
  50%      { transform: translate3d(2.5%, -3.5%, 0) scale(1.16); opacity: 1; }
}
.lp-aurora {
  animation: lpAurora var(--lp-dur) ease-in-out infinite;
  animation-delay: var(--lp-delay);
  will-change: transform, opacity;
}

/* --- premium button micro-interactions --- */
.lung-page .btn-primary { overflow: hidden; }
.lung-page .btn-shine {
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 42%;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%);
  transform: translateX(-170%) skewX(-20deg);
  pointer-events: none;
}
.lung-page .btn-primary:hover .btn-shine { animation: btnShine 1s cubic-bezier(0.4, 0, 0.2, 1); }

.lung-page .btn-secondary { position: relative; overflow: hidden; }
.lung-page .btn-secondary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(70% 130% at 50% 128%, rgba(124,58,237,0.12), rgba(255,255,255,0) 70%);
  opacity: 0;
  transition: opacity 0.45s ease;
  pointer-events: none;
}
.lung-page .btn-secondary:hover::after { opacity: 1; }

/* --- animated gradient hairline used on hovered surfaces --- */
.lp-edge {
  background-image: linear-gradient(90deg, rgba(124,58,237,0) 0%, rgba(124,58,237,0.75) 25%, rgba(236,72,153,0.75) 50%, rgba(124,58,237,0) 75%, rgba(124,58,237,0) 100%);
  background-size: 220% 100%;
  animation: borderGlowMove 3.6s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .lp-particle, .lp-aurora, .lp-edge { animation: none !important; }
  .lung-page .btn-primary:hover .btn-shine { animation: none !important; }
}
`;

/* ================================================================
   Ambient building blocks
================================================================ */

function seeded(i, salt) {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Floating molecular particles — deterministic so SSR/HMR stays stable. */
function ParticleField({ count = 18, seed = 0, className = '', parallax }) {
  const dots = Array.from({ length: count }, (_, i) => {
    const k = i + seed * 31;
    const r1 = seeded(k, 1);
    const r2 = seeded(k, 2);
    const r3 = seeded(k, 3);
    const r4 = seeded(k, 4);
    const size = 2.5 + r3 * 5.5;
    const pink = i % 3 === 0;
    return {
      key: i,
      style: {
        left: `${(r1 * 100).toFixed(2)}%`,
        top: `${(r2 * 100).toFixed(2)}%`,
        width: `${size.toFixed(1)}px`,
        height: `${size.toFixed(1)}px`,
        opacity: 0.14 + r3 * 0.3,
        background: pink
          ? 'radial-gradient(circle at 30% 30%, #F9A8D4, #EC4899)'
          : 'radial-gradient(circle at 30% 30%, #C4B5FD, #7C3AED)',
        boxShadow: pink
          ? '0 0 12px rgba(236,72,153,0.45)'
          : '0 0 12px rgba(124,58,237,0.45)',
        '--lp-dx': `${(r4 * 44 - 22).toFixed(1)}px`,
        '--lp-dy': `${(-16 - r3 * 42).toFixed(1)}px`,
        '--lp-dur': `${(12 + r4 * 13).toFixed(1)}s`,
        '--lp-delay': `${(-r2 * 16).toFixed(1)}s`,
      },
    };
  });

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      data-scroll-parallax={parallax}
      aria-hidden="true"
    >
      {dots.map((d) => (
        <span key={d.key} className="lp-particle" style={d.style} />
      ))}
    </div>
  );
}

/** Soft radial lighting — layered, slowly breathing. */
function Aurora({ variant = 'a' }) {
  const sets = {
    a: [
      { className: '-right-40 -top-48 h-[34rem] w-[34rem]', color: 'rgba(124,58,237,0.16)', dur: '19s', delay: '0s' },
      { className: '-left-44 top-1/3 h-[30rem] w-[30rem]', color: 'rgba(236,72,153,0.12)', dur: '23s', delay: '-6s' },
    ],
    b: [
      { className: '-left-40 -top-32 h-[30rem] w-[30rem]', color: 'rgba(168,85,247,0.13)', dur: '21s', delay: '-3s' },
      { className: '-right-36 bottom-0 h-[28rem] w-[28rem]', color: 'rgba(236,72,153,0.11)', dur: '25s', delay: '-9s' },
    ],
    c: [
      { className: 'left-1/2 -top-40 h-[36rem] w-[36rem] -translate-x-1/2', color: 'rgba(124,58,237,0.12)', dur: '22s', delay: '-4s' },
      { className: 'right-0 bottom-[-6rem] h-[26rem] w-[26rem]', color: 'rgba(217,70,239,0.10)', dur: '26s', delay: '-11s' },
    ],
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {sets[variant].map((o, i) => (
        <span
          key={i}
          className={`lp-aurora absolute rounded-full blur-[90px] ${o.className}`}
          style={{
            backgroundImage: `radial-gradient(circle, ${o.color} 0%, rgba(255,255,255,0) 70%)`,
            '--lp-dur': o.dur,
            '--lp-delay': o.delay,
          }}
        />
      ))}
    </div>
  );
}

/** Faint AI network lattice. */
function NetworkLines({ className = '' }) {
  const nodes = [
    [80, 60], [230, 120], [400, 46], [560, 140], [720, 70],
    [880, 150], [1040, 62], [1200, 132], [1360, 58],
  ];
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 h-40 w-full ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="#7C3AED" strokeOpacity="0.13" strokeWidth="1">
        {nodes.map(([x, y], i) =>
          i < nodes.length - 1 ? (
            <line key={i} x1={x} y1={y} x2={nodes[i + 1][0]} y2={nodes[i + 1][1]} />
          ) : null
        )}
        {nodes.map(([x, y], i) =>
          i < nodes.length - 2 ? (
            <line key={`s${i}`} x1={x} y1={y} x2={nodes[i + 2][0]} y2={nodes[i + 2][1]} strokeOpacity="0.06" />
          ) : null
        )}
      </g>
      <g fill="#A855F7" fillOpacity="0.22">
        {nodes.map(([x, y], i) => (
          <circle key={`n${i}`} cx={x} cy={y} r="2.6" />
        ))}
      </g>
    </svg>
  );
}

/** Slide-grid texture, masked so it never competes with the copy. */
function GridTexture({ mask = 'radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 100%)', opacity = 0.35 }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage:
          'linear-gradient(to right, rgba(124,58,237,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.045) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
      aria-hidden="true"
    />
  );
}

/** Curved section boundary — white spills into the tinted band. */
function CurveEdge({ position = 'top' }) {
  const d =
    position === 'top'
      ? 'M0 0 H1440 V40 C 1170 92, 980 6, 720 32 C 468 57, 258 96, 0 48 Z'
      : 'M0 90 H1440 V50 C 1170 -2, 980 84, 720 58 C 468 33, 258 -6, 0 42 Z';

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${position === 'top' ? 'top-0' : 'bottom-0'} z-[1]`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={`block h-[44px] w-full sm:h-[68px] lg:h-[90px] ${
          position === 'top' ? '-translate-y-px' : 'translate-y-px'
        }`}
        fill="none"
      >
        <path d={d} fill="#FFFFFF" />
      </svg>
    </div>
  );
}

/* ================================================================
   Shared UI atoms
================================================================ */

function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/70 px-4 py-1.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#7C3AED] shadow-[0_2px_14px_-6px_rgba(124,58,237,0.4)] backdrop-blur-md ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
      {children}
    </span>
  );
}

function PrimaryButton({ children, className = '' }) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <span
        className="btn-glow pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] blur-[18px]"
        aria-hidden="true"
      />
      <button
        type="button"
        className="btn-primary relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] px-8 py-4 font-sans text-[15px] font-semibold tracking-[0.01em] text-white shadow-[0_10px_30px_rgba(124,58,237,0.34)] outline-none ring-1 ring-inset ring-white/25 sm:w-auto"
      >
        <span className="btn-shine" aria-hidden="true" />
        {children}
        <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={2.25} />
      </button>
    </span>
  );
}

function SecondaryButton({ children, className = '' }) {
  return (
    <button
      type="button"
      className={`btn-secondary inline-flex w-full items-center justify-center rounded-full border border-gray-200 bg-white/80 px-8 py-4 font-sans text-[15px] font-semibold tracking-[0.01em] text-[#111827] outline-none backdrop-blur-md transition-colors duration-300 hover:border-purple-300 hover:text-[#7C3AED] sm:w-auto ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function SectionHead({ eyebrow, title, accent, body, align = 'center' }) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-xl'}>
      <div data-reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>

      <h2
        data-reveal
        className="mt-7 font-serif text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.018em] text-[#111827] sm:text-[3rem] lg:text-[3.5rem]"
      >
        {title}{' '}
        {accent && (
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
            {accent}
          </span>
        )}
      </h2>

      <div
        data-reveal
        className={`mt-7 h-px w-16 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] ${centered ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />

      {body && (
        <p
          data-reveal
          className={`mt-7 font-sans text-[16px] leading-[1.75] text-gray-500 sm:text-[17px] ${
            centered ? 'mx-auto max-w-2xl' : ''
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

/* ================================================================
   Workflow geometry — a single curved rail carrying every node
================================================================ */

const WF_VIEW_W = 1400;
const WF_VIEW_H = 420;
const WF_NODE_X = WORKFLOW.map((_, i) => 100 + i * 200);
const WF_NODE_Y = WORKFLOW.map((_, i) => (i % 2 === 0 ? 186 : 234));
const WF_PATH = (() => {
  let d = `M0 ${WF_NODE_Y[0]} L${WF_NODE_X[0]} ${WF_NODE_Y[0]}`;
  for (let i = 0; i < WF_NODE_X.length - 1; i += 1) {
    const x0 = WF_NODE_X[i];
    const y0 = WF_NODE_Y[i];
    const x1 = WF_NODE_X[i + 1];
    const y1 = WF_NODE_Y[i + 1];
    d += ` C ${x0 + 100} ${y0} ${x1 - 100} ${y1} ${x1} ${y1}`;
  }
  d += ` L${WF_VIEW_W} ${WF_NODE_Y[WF_NODE_Y.length - 1]}`;
  return d;
})();

/* ================================================================
   Page
================================================================ */

export default function LungCancer() {
  const rootRef = useRef(null);

  /* ---- Smooth scroll (same configuration the rest of the site uses) ---- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  /* ---- This page is white; the global shell is near-black ---- */
  useEffect(() => {
    const html = document.documentElement;
    const { body } = document;
    const prev = {
      colorScheme: html.style.colorScheme,
      htmlBg: html.style.backgroundColor,
      bodyBg: body.style.backgroundColor,
      bodyColor: body.style.color,
    };

    html.style.colorScheme = 'light';
    html.style.backgroundColor = '#FFFFFF';
    body.style.backgroundColor = '#FFFFFF';
    body.style.color = '#111827';

    return () => {
      html.style.colorScheme = prev.colorScheme;
      html.style.backgroundColor = prev.htmlBg;
      body.style.backgroundColor = prev.bodyBg;
      body.style.color = prev.bodyColor;
    };
  }, []);

  /* ---- GSAP: reveals, parallax, pipeline flow, micro-interactions ---- */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    const ctx = gsap.context(() => {
      const cleanups = [];

      /* ---------- Hover micro-interactions ---------- */
      gsap.utils.toArray('[data-hover-card]').forEach((card) => {
        const glow = card.querySelector('.card-glow');
        const art = card.querySelector('.card-art');
        const artGlow = card.querySelector('.art-glow');
        const edge = card.querySelector('.card-edge');
        const feature = card.hasAttribute('data-feature-card');
        const lift = parseFloat(card.dataset.lift || '') || (feature ? 10 : 8);

        const enter = () => {
          gsap.to(card, { y: -lift, duration: 0.45, ease: 'power3.out' });
          if (glow) gsap.to(glow, { opacity: 1, duration: 0.45, ease: 'power2.out' });
          if (edge) gsap.to(edge, { opacity: 1, duration: 0.4, ease: 'power2.out' });
          if (artGlow) gsap.to(artGlow, { opacity: 1, duration: 0.55, ease: 'power2.out' });
          if (art) {
            gsap.to(art, {
              scale: feature ? 1.045 : 1.06,
              y: feature ? -8 : 0,
              duration: 0.5,
              ease: 'power2.inOut',
            });
          }
        };
        const leave = () => {
          gsap.to(card, { y: 0, duration: 0.55, ease: 'power3.out' });
          if (glow) gsap.to(glow, { opacity: 0, duration: 0.45, ease: 'power2.out' });
          if (edge) gsap.to(edge, { opacity: 0, duration: 0.45, ease: 'power2.out' });
          if (artGlow) gsap.to(artGlow, { opacity: 0, duration: 0.5, ease: 'power2.out' });
          if (art) gsap.to(art, { scale: 1, y: 0, duration: 0.55, ease: 'power2.inOut' });
        };

        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          card.removeEventListener('mouseenter', enter);
          card.removeEventListener('mouseleave', leave);
        });
      });

      gsap.utils.toArray('.btn-primary').forEach((btn) => {
        const glow = btn.parentElement.querySelector('.btn-glow');
        const arrow = btn.querySelector('.btn-arrow');

        const enter = () => {
          gsap.to(btn, { scale: 1.045, duration: 0.4, ease: 'power3.out' });
          if (glow) gsap.to(glow, { opacity: 1, scale: 1.16, duration: 0.5, ease: 'power2.out' });
          if (arrow) gsap.to(arrow, { x: 3, duration: 0.4, ease: 'power3.out' });
        };
        const leave = () => {
          gsap.to(btn, { scale: 1, duration: 0.45, ease: 'power3.out' });
          if (glow) gsap.to(glow, { opacity: 0.5, scale: 1, duration: 0.5, ease: 'power2.out' });
          if (arrow) gsap.to(arrow, { x: 0, duration: 0.4, ease: 'power3.out' });
        };

        if (glow) gsap.set(glow, { opacity: 0.5 });
        btn.addEventListener('mouseenter', enter);
        btn.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          btn.removeEventListener('mouseenter', enter);
          btn.removeEventListener('mouseleave', leave);
        });
      });

      gsap.utils.toArray('.btn-secondary').forEach((btn) => {
        const enter = () => gsap.to(btn, { scale: 1.035, duration: 0.4, ease: 'power3.out' });
        const leave = () => gsap.to(btn, { scale: 1, duration: 0.45, ease: 'power3.out' });
        btn.addEventListener('mouseenter', enter);
        btn.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          btn.removeEventListener('mouseenter', enter);
          btn.removeEventListener('mouseleave', leave);
        });
      });

      /* ---------- Mouse parallax on the illustrations ----------
         The parallax layer owns x/y on its own wrapper, so it never
         collides with the entrance, idle-float or hover transforms
         living on the nested layers. */
      if (finePointer && !prefersReduced) {
        gsap.utils.toArray('[data-parallax]').forEach((layer) => {
          const depth = parseFloat(layer.dataset.parallax) || 12;
          const host = layer.closest('[data-parallax-host]') || layer.parentElement;
          if (!host) return;

          const xTo = gsap.quickTo(layer, 'x', { duration: 0.9, ease: 'power3.out' });
          const yTo = gsap.quickTo(layer, 'y', { duration: 0.9, ease: 'power3.out' });

          const move = (e) => {
            const r = host.getBoundingClientRect();
            const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2 || 1);
            const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2 || 1);
            xTo(gsap.utils.clamp(-1, 1, nx) * depth);
            yTo(gsap.utils.clamp(-1, 1, ny) * depth * 0.7);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };

          host.addEventListener('mousemove', move);
          host.addEventListener('mouseleave', leave);
          cleanups.push(() => {
            host.removeEventListener('mousemove', move);
            host.removeEventListener('mouseleave', leave);
          });
        });
      }

      if (prefersReduced) {
        gsap.set('[data-reveal], [data-reveal-group] > *', { autoAlpha: 1, y: 0 });
        gsap.set('.wf-rail-fill', { scaleY: 1 });
        return () => cleanups.forEach((fn) => fn());
      }

      /* ---------- Hero entrance ---------- */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });
      heroTl
        .fromTo(
          '.hero-copy > *',
          { y: 34, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.09 }
        )
        .fromTo(
          '.hero-art',
          { y: 46, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 1.25 },
          0.15
        )
        .fromTo(
          '.hero-frame',
          { autoAlpha: 0, scale: 0.9, rotate: -2 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.4, ease: 'power2.out' },
          0.1
        )
        .fromTo(
          '.hero-strip > *',
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1 },
          0.55
        );

      /* ---------- Scroll reveals ---------- */
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        );
      });

      gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
        gsap.fromTo(
          group.children,
          { y: 48, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: 'top 88%' },
          }
        );
      });

      /* ---------- Slow parallax on decorative layers ---------- */
      gsap.utils.toArray('[data-scroll-parallax]').forEach((el) => {
        const shift = parseFloat(el.dataset.scrollParallax) || 60;
        gsap.fromTo(
          el,
          { yPercent: -shift / 12 },
          {
            yPercent: shift / 12,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      });

      /* ---------- Floating hero panels (3D-ish parallax drift) ---------- */
      const floats = [
        ['.lhero-float-a', -10, 6.4, 0],
        ['.lhero-float-b', -16, 5.2, 0.4],
        ['.lhero-float-c', -12, 5.8, 0.8],
        ['.lhero-float-d', -14, 6.8, 0.2],
      ];
      floats.forEach(([sel, y, dur, delay]) => {
        gsap.to(sel, { y, duration: dur, delay, ease: 'sine.inOut', repeat: -1, yoyo: true });
      });

      /* ---------- Hero live details ---------- */
      gsap.fromTo(
        '.lhero-wire',
        { strokeDashoffset: 0 },
        { strokeDashoffset: -44, duration: 2.6, ease: 'none', repeat: -1 }
      );
      gsap.fromTo(
        '.lhero-contour',
        { strokeDashoffset: 0 },
        { strokeDashoffset: -44, duration: 3.2, ease: 'none', repeat: -1 }
      );
      gsap.to('.lhero-node', {
        scale: 1.25,
        transformOrigin: 'center',
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.26,
      });
      gsap.fromTo(
        '.lhero-scan',
        { x: 0, autoAlpha: 0 },
        { x: 295, autoAlpha: 0.9, duration: 3.4, ease: 'none', repeat: -1, repeatDelay: 0.9 }
      );
      gsap.to('.lhero-nucleus', {
        opacity: 0.3,
        duration: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.08, from: 'random' },
      });
      gsap.to('.lhero-heat', {
        opacity: '-=0.05',
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.04, from: 'center' },
      });
      gsap.fromTo(
        '.lhero-bar',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.9 }
      );

      /* ---------- Feature illustrations: entrance, then a living idle ----------
         Nested layers each own one transform so no two tweens ever write
         the same property: .art-parallax (mouse), .art-enter (scroll
         entrance), .art-float (idle drift), .card-art (hover). */
      gsap.utils.toArray('.art-enter').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 34, autoAlpha: 0, scale: 0.93 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1.05,
            ease: 'power2.out',
            delay: (i % 2) * 0.12,
            scrollTrigger: { trigger: el.closest('[data-hover-card]') || el, start: 'top 88%' },
          }
        );
      });

      gsap.utils.toArray('.art-float').forEach((el, i) => {
        const phase = i * 0.28;

        gsap.fromTo(
          el,
          { y: 5 },
          { y: -5, duration: 4.6 + i * 0.35, delay: phase, ease: 'sine.inOut', repeat: -1, yoyo: true }
        );
        gsap.fromTo(
          el,
          { x: -4 },
          { x: 4, duration: 6.2 + i * 0.4, delay: phase * 1.6, ease: 'sine.inOut', repeat: -1, yoyo: true }
        );
        gsap.fromTo(
          el,
          { rotation: -0.7 },
          {
            rotation: 0.7,
            duration: 9 + i * 0.6,
            delay: phase,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            transformOrigin: 'center center',
          }
        );
        gsap.to(el, {
          scale: 1.03,
          duration: 5.4 + i * 0.3,
          delay: phase * 1.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          transformOrigin: 'center center',
        });
      });

      /* ---------- Feature card artwork ---------- */
      gsap.utils.toArray('.feature-art').forEach((art) => {
        const cells = art.querySelectorAll('.art-cell');
        const nodes = art.querySelectorAll('.art-node');

        if (cells.length) {
          gsap.fromTo(
            cells,
            { scale: 0, transformOrigin: 'center' },
            {
              scale: 1,
              duration: 0.7,
              ease: 'back.out(2)',
              stagger: { each: 0.025, from: 'random' },
              scrollTrigger: { trigger: art, start: 'top 88%' },
            }
          );
        }
        if (nodes.length) {
          gsap.to(nodes, {
            scale: 1.22,
            transformOrigin: 'center',
            duration: 1.4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            stagger: { each: 0.12, from: 'start' },
          });
        }
      });

      /* ---------- Story connectors between the feature acts ---------- */
      gsap.utils.toArray('.story-line').forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: line, start: 'top 92%' },
          }
        );
      });

      /* ---------- Workflow: the curved AI pipeline ---------- */
      const railPath = rootRef.current?.querySelector('.wf-path');
      const railDraw = rootRef.current?.querySelector('.wf-path-draw');
      const railGlow = rootRef.current?.querySelector('.wf-path-glow');

      if (railPath && railDraw) {
        const len = railPath.getTotalLength();

        gsap.set(railDraw, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(railDraw, {
          strokeDashoffset: 0,
          duration: 1.9,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: railPath.closest('.wf-track'), start: 'top 78%' },
        });

        if (railGlow) {
          gsap.set(railGlow, { strokeDasharray: '18 26' });
          gsap.to(railGlow, {
            strokeDashoffset: -88,
            duration: 2.4,
            ease: 'none',
            repeat: -1,
          });
        }

        /* Data packets riding the rail — sampled off the real path so the
           dots track the curve exactly at every breakpoint. */
        gsap.utils.toArray('.wf-flow').forEach((dot, i) => {
          const proxy = { t: 0 };
          gsap.to(proxy, {
            t: 1,
            duration: 5.4,
            ease: 'none',
            repeat: -1,
            delay: i * 1.8,
            onUpdate: () => {
              const p = railPath.getPointAtLength(proxy.t * len);
              gsap.set(dot, {
                attr: { cx: p.x, cy: p.y },
                autoAlpha: proxy.t < 0.05 || proxy.t > 0.95 ? 0 : 1,
              });
            },
          });
        });
      }

      gsap.utils.toArray('.wf-node').forEach((node, i) => {
        gsap.fromTo(
          node,
          { scale: 0.6, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: i * 0.09,
            scrollTrigger: { trigger: node.closest('.wf-track') || node, start: 'top 80%' },
          }
        );
      });

      gsap.utils.toArray('.wf-halo').forEach((halo, i) => {
        gsap.to(halo, {
          scale: 1.35,
          opacity: 0.15,
          duration: 2.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.24,
          transformOrigin: 'center',
        });
      });

      gsap.utils.toArray('.wf-rail-fill').forEach((rail) => {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: rail.parentElement, start: 'top 80%' },
          }
        );
      });

      gsap.utils.toArray('.wf-vpulse').forEach((dot, i) => {
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.6, delay: i * 1.1 })
          .fromTo(dot, { top: '0%' }, { top: '100%', duration: 3.2, ease: 'power1.inOut' }, 0)
          .fromTo(dot, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power1.out' }, 0)
          .to(dot, { autoAlpha: 0, duration: 0.5, ease: 'power1.in' }, 2.6);
      });

      /* ---------- Benefit ticks ---------- */
      gsap.utils.toArray('.benefit-tick').forEach((tick) => {
        gsap.fromTo(
          tick,
          { scale: 0, autoAlpha: 0, transformOrigin: 'center' },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'back.out(2.2)',
            scrollTrigger: { trigger: tick, start: 'top 94%' },
          }
        );
      });

      /* ---------- Clinical report dashboard ---------- */
      const shell = rootRef.current?.querySelector('.report-shell');
      if (shell) {
        gsap.fromTo(
          shell,
          { rotateX: 8, y: 34, scale: 0.975, transformPerspective: 1600, transformOrigin: 'center top' },
          {
            rotateX: 0,
            y: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: shell, start: 'top 95%', end: 'top 45%', scrub: 0.7 },
          }
        );
      }

      const report = rootRef.current?.querySelector('.report-art');
      if (report) {
        gsap.fromTo(
          report.querySelectorAll('.rep-panel'),
          { y: 22, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: report, start: 'top 86%' },
          }
        );
        gsap.fromTo(
          report.querySelectorAll('.rep-bar'),
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.05,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: { trigger: report, start: 'top 80%' },
          }
        );
        gsap.fromTo(
          report.querySelectorAll('.rep-donut'),
          { strokeDasharray: '0 346' },
          {
            strokeDasharray: '132 214',
            duration: 1.3,
            ease: 'power2.out',
            scrollTrigger: { trigger: report, start: 'top 80%' },
          }
        );
        gsap.fromTo(
          report.querySelectorAll('.rep-cell'),
          { scale: 0, transformOrigin: 'center' },
          {
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.9)',
            stagger: { each: 0.018, from: 'random' },
            scrollTrigger: { trigger: report, start: 'top 80%' },
          }
        );
        gsap.fromTo(
          report.querySelectorAll('.rep-scan'),
          { x: 0, autoAlpha: 0 },
          { x: 229, autoAlpha: 0.9, duration: 3.2, ease: 'none', repeat: -1, repeatDelay: 1 }
        );
        gsap.to(report.querySelectorAll('.rep-heat'), {
          opacity: '-=0.05',
          duration: 1.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.04, from: 'center' },
        });
        gsap.to(report.querySelectorAll('.rep-node'), {
          scale: 1.25,
          transformOrigin: 'center',
          duration: 1.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.14,
        });
      }

      /* ---------- CTA ambience ---------- */
      gsap.to('.cta-orb', {
        scale: 1.14,
        opacity: 0.9,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.8,
      });

      ScrollTrigger.refresh();

      return () => cleanups.forEach((fn) => fn());
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{PAGE_CSS}</style>
      <Navbar />

      <main ref={rootRef} className="lung-page relative w-full overflow-x-clip bg-white text-[#111827]">
        {/* ============================================================
            HERO — cinematic split
        ============================================================ */}
        <section className="relative overflow-hidden bg-white">
          {/* Stylised alveolar field — kept very low contrast so the
              headline stays the highest-contrast element on the page. */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <AlveolarField className="h-full w-full opacity-[0.5]" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(100deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.84) 38%, rgba(255,255,255,0.6) 68%, rgba(255,255,255,0.5) 100%)',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-52"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), #FFFFFF)' }}
            />
          </div>

          <Aurora variant="a" />
          <GridTexture />
          <ParticleField count={22} seed={1} parallax={70} />
          <NetworkLines className="top-[18%] opacity-70" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col px-6 pb-24 pt-[120px] lg:min-h-[100svh] lg:justify-center lg:px-10 lg:pb-28 lg:pt-[150px]">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 xl:gap-20">
              {/* ---- Copy ---- */}
              <div className="hero-copy text-center lg:text-left">
                <div>
                  <Eyebrow>OmicMind Lung™</Eyebrow>
                </div>

                <h1 className="mt-8 font-serif text-[2.9rem] font-semibold leading-[1.03] tracking-[-0.022em] text-[#111827] sm:text-[3.7rem] lg:text-[4.15rem] xl:text-[4.6rem]">
                  AI-Powered Lung Cancer{' '}
                  <span className="relative italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
                    Intelligence
                  </span>{' '}
                  for Precision Pathology
                </h1>

                <div
                  className="mx-auto mt-9 h-px w-20 bg-gradient-to-r from-[#7C3AED] to-transparent lg:mx-0"
                  aria-hidden="true"
                />

                <p className="mx-auto mt-8 max-w-xl font-sans text-[17px] leading-[1.75] text-[#374151] sm:text-[18.5px] lg:mx-0 lg:max-w-[34rem]">
                  OmicMind Lung™ applies multimodal AI to analyze lung tissue images, identify complex
                  cancer patterns, quantify biomarkers, and provide deeper biological insights from
                  routine pathology specimens.
                </p>

                <div className="mt-11 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <PrimaryButton className="w-full sm:w-auto">Request Demo</PrimaryButton>
                  <SecondaryButton>Explore Platform</SecondaryButton>
                </div>
              </div>

              {/* ---- Illustration ---- */}
              <div className="hero-art relative" data-parallax-host>
                {/* Layered stage behind the artwork */}
                <div
                  className="hero-frame pointer-events-none absolute -inset-6 rounded-[3rem] border border-[#F1EAFB] bg-white/40 backdrop-blur-[2px] sm:-inset-10"
                  aria-hidden="true"
                />
                <div
                  className="hero-frame pointer-events-none absolute -inset-2 rotate-[-3deg] rounded-[2.75rem] border border-[#F6F0FD]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -inset-10 rounded-[3.5rem]"
                  style={{
                    backgroundImage:
                      'radial-gradient(60% 60% at 45% 40%, rgba(168,85,247,0.16) 0%, rgba(255,255,255,0) 70%), radial-gradient(50% 50% at 78% 82%, rgba(236,72,153,0.14) 0%, rgba(255,255,255,0) 72%)',
                  }}
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute -left-6 top-10 h-20 w-20 rounded-3xl border border-purple-100/80 bg-white/60 backdrop-blur-md sm:-left-10 sm:h-24 sm:w-24"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute -bottom-4 right-2 h-16 w-16 rounded-full border border-pink-100 bg-gradient-to-br from-white/70 to-pink-50/50 backdrop-blur-md sm:h-20 sm:w-20"
                  aria-hidden="true"
                />

                <div data-parallax="14" className="relative">
                  <LungHeroArt className="relative w-full drop-shadow-[0_30px_60px_rgba(76,29,149,0.10)]" />
                </div>
              </div>
            </div>

            {/* ---- Signal strip ---- */}
            <div className="hero-strip mt-16 grid grid-cols-1 gap-y-8 border-t border-[#F1EDFB] pt-10 sm:grid-cols-3 sm:gap-y-0 lg:mt-20">
              {[
                ['PD-L1 · TPS · CPS', 'Quantitative scoring'],
                ['CD8 · Stroma · TILs', 'Spatial microenvironment'],
                ['EGFR · ALK · KRAS', 'Molecular prediction'],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={`group relative px-0 text-center sm:px-8 sm:text-left ${
                    i > 0 ? 'sm:border-l sm:border-[#F1EDFB]' : ''
                  }`}
                >
                  <span
                    className="pointer-events-none absolute -top-10 left-0 h-px w-0 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] transition-all duration-500 group-hover:w-full"
                    aria-hidden="true"
                  />
                  <p className="font-sans text-[14px] font-semibold tracking-[0.02em] text-[#7C3AED]">{k}</p>
                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-gray-500">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 1 — Precision Lung Cancer Analysis
        ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#FCFAFF] to-white pb-24 pt-24 lg:pb-36 lg:pt-32">
          <CurveEdge position="top" />
          <Aurora variant="b" />
          <ParticleField count={14} seed={2} className="opacity-80" parallax={60} />

          <div className="relative z-[2] mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="The solution"
              title="Precision Lung Cancer"
              accent="Analysis"
              body="Transform lung cancer diagnostics with AI-powered computational pathology that combines morphology, biomarkers, spatial context, and molecular intelligence."
            />

            <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-36">
              {FEATURES.map((f, i) => {
                const flip = i % 2 === 1;
                return (
                  <div key={f.title} className="relative">
                    {/* Gradient connector threading one act into the next */}
                    {i > 0 && (
                      <span
                        className="story-line pointer-events-none absolute -top-16 left-1/2 hidden h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C4B5FD] to-[#F9A8D4] lg:block lg:-top-24 lg:h-24"
                        aria-hidden="true"
                      />
                    )}

                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-20">
                      {/* ---- Illustration stage ---- */}
                      <div
                        data-hover-card
                        data-feature-card
                        data-parallax-host
                        className={`group relative ${flip ? 'lg:order-2' : ''}`}
                      >
                        {/* Offset slab behind the stage — asymmetric depth */}
                        <span
                          className={`pointer-events-none absolute -inset-x-6 -bottom-6 -top-6 rounded-[2.5rem] bg-gradient-to-br from-[#F6F1FE] to-[#FDF2FA] opacity-60 ${
                            flip ? '-rotate-2' : 'rotate-2'
                          }`}
                          aria-hidden="true"
                        />
                        <span
                          className="art-glow pointer-events-none absolute -right-10 -top-14 h-64 w-64 rounded-full opacity-0 blur-[52px]"
                          style={{
                            backgroundImage:
                              'radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(236,72,153,0.26) 46%, rgba(255,255,255,0) 72%)',
                          }}
                          aria-hidden="true"
                        />

                        <div className="relative overflow-hidden rounded-[2rem] border border-[#EEE9F9] bg-white/85 px-6 py-10 shadow-[0_30px_70px_-46px_rgba(76,29,149,0.5)] backdrop-blur-xl sm:px-10 sm:py-12">
                          <span
                            className="card-glow pointer-events-none absolute inset-0 opacity-0"
                            style={{
                              backgroundImage:
                                'radial-gradient(85% 70% at 50% 0%, rgba(124,58,237,0.09) 0%, rgba(255,255,255,0) 72%)',
                            }}
                            aria-hidden="true"
                          />
                          <span
                            className="card-edge lp-edge pointer-events-none absolute inset-x-10 top-0 h-[2px] rounded-full opacity-0"
                            aria-hidden="true"
                          />

                          <div data-parallax="10" className="relative">
                            <div className="art-enter">
                              <div className="art-float">
                                <FeatureArt name={f.art} className="card-art feature-art w-full" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Floating glass accent overlapping the stage edge */}
                        <span
                          className={`pointer-events-none absolute -bottom-7 h-16 w-16 rounded-2xl border border-purple-100 bg-white/70 shadow-[0_16px_36px_-22px_rgba(124,58,237,0.6)] backdrop-blur-md ${
                            flip ? '-right-5' : '-left-5'
                          }`}
                          aria-hidden="true"
                        >
                          <span className="absolute inset-4 rounded-lg bg-gradient-to-br from-[#7C3AED]/20 to-[#EC4899]/20" />
                        </span>
                      </div>

                      {/* ---- Copy ---- */}
                      <div className={flip ? 'lg:order-1' : ''}>
                        <div data-reveal>
                          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-purple-100 bg-purple-50/70 px-3.5 py-1.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">
                            {f.tag}
                          </span>
                        </div>

                        <h3
                          data-reveal
                          className="mt-6 font-serif text-[2rem] font-semibold leading-[1.14] tracking-[-0.015em] text-[#111827] sm:text-[2.35rem] lg:text-[2.5rem]"
                        >
                          {f.title}
                        </h3>

                        <p
                          data-reveal
                          className="mt-5 max-w-xl font-sans text-[16px] leading-[1.78] text-gray-500 sm:text-[16.5px]"
                        >
                          {f.body}
                        </p>

                        <ul
                          data-reveal-group
                          className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5"
                        >
                          {f.points.map((p) => (
                            <li
                              key={p}
                              className="group/pt flex items-center gap-3 rounded-2xl border border-[#F1ECFB] bg-white/70 px-4 py-3.5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-purple-200 hover:bg-white hover:shadow-[0_14px_32px_-22px_rgba(124,58,237,0.75)]"
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED]/10 to-[#EC4899]/10 transition-transform duration-500 group-hover/pt:scale-110">
                                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
                              </span>
                              <span className="font-sans text-[13.5px] font-medium leading-snug text-gray-600">
                                {p}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <CurveEdge position="bottom" />
        </section>

        {/* ============================================================
            SECTION 2 — AI-Powered Lung Cancer Workflow
        ============================================================ */}
        <section className="relative overflow-hidden bg-white py-24 lg:py-32">
          <Aurora variant="c" />
          <GridTexture
            mask="radial-gradient(60% 70% at 50% 55%, #000 0%, transparent 100%)"
            opacity={0.3}
          />
          <ParticleField count={12} seed={3} />

          <div className="relative z-[2] mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="End to end"
              title="AI-Powered Lung Cancer"
              accent="Workflow"
              body="One continuous chain of custody from block to report, with every step reproducible, versioned and traceable."
            />

            {/* ---- Desktop: curved pipeline ---- */}
            <div className="wf-track relative mt-24 hidden h-[500px] lg:block xl:h-[460px]">
              <svg
                viewBox={`0 0 ${WF_VIEW_W} ${WF_VIEW_H}`}
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="wf-rail" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="52%" stopColor="#D946EF" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <linearGradient id="wf-fade" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
                    <stop offset="12%" stopColor="#7C3AED" stopOpacity="0.75" />
                    <stop offset="88%" stopColor="#EC4899" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Base rail */}
                <path className="wf-path" d={WF_PATH} stroke="#F1EDFB" strokeWidth="2.5" strokeLinecap="round" />
                {/* Drawn-in gradient rail */}
                <path
                  className="wf-path-draw"
                  d={WF_PATH}
                  stroke="url(#wf-fade)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Flowing dash overlay */}
                <path
                  className="wf-path-glow"
                  d={WF_PATH}
                  stroke="url(#wf-rail)"
                  strokeOpacity="0.5"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                {/* Data packets riding the curve */}
                {[0, 1, 2].map((i) => (
                  <circle key={i} className="wf-flow" cx="0" cy="0" r="4.5" fill="#EC4899" opacity="0" />
                ))}
              </svg>

              <div className="absolute inset-0 grid grid-cols-7">
                {WORKFLOW.map((step, i) => {
                  const above = i % 2 === 0;
                  const y = WF_NODE_Y[i];
                  return (
                    <div key={step.title} className="relative">
                      {/* Node */}
                      <div
                        className="wf-node group absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                        style={{ top: `${(y / WF_VIEW_H) * 100}%` }}
                      >
                        <span
                          className="wf-halo pointer-events-none absolute -inset-4 rounded-[1.6rem] bg-gradient-to-br from-[#7C3AED]/25 to-[#EC4899]/25 opacity-40 blur-xl"
                          aria-hidden="true"
                        />
                        <div className="relative flex h-[74px] w-[74px] items-center justify-center rounded-[1.4rem] border border-purple-100 bg-white shadow-[0_10px_28px_-12px_rgba(124,58,237,0.45)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-purple-200 group-hover:shadow-[0_20px_40px_-16px_rgba(124,58,237,0.6)]">
                          <FlowIcon name={step.icon} className="h-9 w-9" />
                          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] font-sans text-[11px] font-bold text-white ring-[3px] ring-white">
                            {i + 1}
                          </span>
                        </div>
                      </div>

                      {/* Label, thrown outward from the rail */}
                      <div
                        className="absolute inset-x-0 px-3 text-center"
                        style={
                          above
                            ? { bottom: `${((WF_VIEW_H - (y - 56)) / WF_VIEW_H) * 100}%` }
                            : { top: `${((y + 56) / WF_VIEW_H) * 100}%` }
                        }
                      >
                        <h3 className="font-sans text-[14px] font-semibold leading-snug tracking-[-0.005em] text-[#111827]">
                          {step.title}
                        </h3>
                        <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-gray-500">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---- Tablet / mobile: vertical rail ---- */}
            <div className="relative mt-16 lg:hidden">
              <div
                className="absolute bottom-8 left-[36px] top-8 w-[2px] rounded-full bg-[#F1EDFB]"
                aria-hidden="true"
              >
                <span className="wf-rail-fill absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#7C3AED]/70 to-[#EC4899]/50" />
                <span className="wf-vpulse absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-[#EC4899] shadow-[0_0_12px_rgba(236,72,153,0.9)]" />
              </div>

              <ul data-reveal-group className="relative space-y-4">
                {WORKFLOW.map((step, i) => (
                  <li
                    key={step.title}
                    className="flex items-start gap-5 rounded-3xl border border-transparent p-2 transition-colors duration-500 hover:border-[#F1ECFB] hover:bg-white/70"
                  >
                    <div className="relative z-10 flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-[1.4rem] border border-purple-100 bg-white shadow-[0_10px_28px_-14px_rgba(124,58,237,0.5)]">
                      {/* uid keeps the gradient ids unique against the desktop track */}
                      <FlowIcon name={step.icon} uid="-m" className="h-9 w-9" />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] font-sans text-[11px] font-bold text-white ring-[3px] ring-white">
                        {i + 1}
                      </span>
                    </div>
                    <div className="pt-3">
                      <h3 className="font-sans text-[15.5px] font-semibold leading-snug text-[#111827]">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 font-sans text-[13.5px] leading-relaxed text-gray-500">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3 — Applications Across Lung Oncology
        ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#FCFAFF] to-white pb-24 pt-24 lg:pb-36 lg:pt-32">
          <CurveEdge position="top" />
          <Aurora variant="b" />
          <ParticleField count={14} seed={4} parallax={60} />

          <div className="relative z-[2] mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="Who it serves"
              title="Applications Across Lung"
              accent="Oncology"
              body="The same platform, governed differently for the diagnostic bench, the trial pipeline and the discovery lab."
            />

            <div
              data-reveal-group
              className="mt-16 grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-8"
            >
              {SEGMENTS.map((s, i) => (
                <article
                  key={s.title}
                  data-hover-card
                  data-parallax-host
                  className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-[#EEE9F9] bg-white/85 shadow-[0_2px_4px_rgba(17,24,39,0.02)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_36px_70px_-40px_rgba(124,58,237,0.5)] ${
                    i === 1 ? 'lg:mt-10' : ''
                  } ${i === 2 ? 'lg:mt-20' : ''}`}
                >
                  <span
                    className="card-glow pointer-events-none absolute inset-0 z-20 opacity-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(90% 60% at 50% 0%, rgba(236,72,153,0.10) 0%, rgba(255,255,255,0) 72%)',
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="card-edge lp-edge pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] opacity-0"
                    aria-hidden="true"
                  />

                  {/* Illustration stage */}
                  <div className="relative overflow-hidden border-b border-[#F3EEFC] bg-gradient-to-br from-[#FBF9FF] via-white to-[#FDF6FB] px-6 py-12">
                    <span
                      className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-[46px]"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(255,255,255,0) 70%)',
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute -bottom-14 -left-12 h-44 w-44 rounded-full blur-[44px]"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle, rgba(236,72,153,0.18) 0%, rgba(255,255,255,0) 70%)',
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute inset-6 rounded-[1.6rem] border border-white/70"
                      aria-hidden="true"
                    />

                    <div data-parallax="8" className="relative">
                      <SegmentArt
                        name={s.art}
                        className="card-art mx-auto h-[152px] w-full max-w-[290px]"
                      />
                    </div>
                  </div>

                  <div className="relative flex flex-1 flex-col p-8 lg:p-9">
                    <span className="inline-flex w-fit rounded-full border border-purple-100 bg-purple-50/70 px-3 py-1 font-sans text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">
                      {s.tag}
                    </span>

                    <h3 className="mt-5 font-serif text-[1.6rem] font-semibold leading-[1.18] tracking-[-0.012em] text-[#111827] lg:text-[1.7rem]">
                      {s.title}
                    </h3>
                    <p className="mt-4 font-sans text-[14.5px] leading-[1.72] text-gray-500">{s.body}</p>

                    <ul className="mt-7 space-y-0 border-t border-[#F3EEFC] pt-2">
                      {s.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-3 border-b border-[#F7F3FD] py-3 last:border-0"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#7C3AED]/10 to-[#EC4899]/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
                          </span>
                          <span className="font-sans text-[13.5px] leading-relaxed text-gray-600">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <CurveEdge position="bottom" />
        </section>

        {/* ============================================================
            SECTION 4 — Why OmicMind Lung™
            No overflow-hidden here: the editorial column is sticky, and a
            clipping ancestor would silently kill position: sticky. Every
            decorative layer clips itself instead.
        ============================================================ */}
        <section className="relative bg-white py-24 lg:py-32">
          <Aurora variant="a" />
          <NetworkLines className="bottom-10 opacity-60" />
          <ParticleField count={12} seed={5} parallax={60} />

          <div className="relative z-[2] mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
              {/* ---- Sticky editorial column ---- */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHead
                  align="left"
                  eyebrow="The difference"
                  title="Why OmicMind"
                  accent="Lung™"
                  body="What changes when the slide is read computationally, measured end to end, and every number carries its evidence."
                />

                <div
                  data-reveal
                  className="relative mt-12 hidden h-44 overflow-hidden rounded-[2rem] border border-[#F1ECFB] bg-gradient-to-br from-[#FBF9FF] to-[#FDF6FB] lg:block"
                  aria-hidden="true"
                >
                  <span
                    className="absolute -right-10 -top-10 h-44 w-44 rounded-full blur-[42px]"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, rgba(124,58,237,0.24) 0%, rgba(255,255,255,0) 70%)',
                    }}
                  />
                  <span
                    className="absolute -bottom-12 left-4 h-40 w-40 rounded-full blur-[44px]"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(255,255,255,0) 70%)',
                    }}
                  />
                  <svg viewBox="0 0 320 176" className="relative h-full w-full" fill="none">
                    <g stroke="#7C3AED" strokeOpacity="0.2" strokeWidth="1">
                      {[36, 72, 108, 144].map((y) => (
                        <line key={y} x1="24" y1={y} x2="296" y2={y} />
                      ))}
                    </g>
                    <path
                      d="M24 140 C 78 128, 108 92, 158 78 C 208 64, 246 44, 296 34"
                      stroke="url(#why-line)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="why-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    {[[24, 140], [158, 78], [296, 34]].map(([cx, cy], i) => (
                      <circle key={i} cx={cx} cy={cy} r="4" fill="#D946EF" fillOpacity="0.75" />
                    ))}
                  </svg>
                </div>
              </div>

              {/* ---- Benefit ledger ---- */}
              <ul data-reveal-group className="relative">
                {BENEFITS.map((b) => (
                  <li
                    key={b.title}
                    className="group relative flex items-start gap-5 border-b border-[#F3EEFC] py-7 transition-all duration-500 first:border-t first:border-[#F3EEFC] hover:pl-4 sm:gap-7 sm:py-8"
                  >
                    <span
                      className="pointer-events-none absolute inset-y-2 left-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        right: '-1rem',
                        backgroundImage:
                          'linear-gradient(90deg, rgba(124,58,237,0.05) 0%, rgba(236,72,153,0.03) 55%, rgba(255,255,255,0) 100%)',
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute inset-y-3 left-0 w-[2px] origin-top scale-y-0 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#EC4899] transition-transform duration-500 ease-out group-hover:scale-y-100"
                      aria-hidden="true"
                    />

                    <span className="benefit-tick relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] shadow-[0_10px_24px_-10px_rgba(124,58,237,0.75)] transition-transform duration-500 group-hover:scale-105">
                      <Check className="h-5 w-5 text-white" strokeWidth={3.2} />
                    </span>

                    <div className="relative">
                      <h3 className="font-sans text-[17px] font-semibold leading-snug tracking-[-0.01em] text-[#111827] sm:text-[18px]">
                        {b.title}
                      </h3>
                      <p className="mt-2.5 max-w-xl font-sans text-[14.5px] leading-[1.75] text-gray-500">
                        {b.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5 — Clinical reporting
        ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#FBFAFF] to-white pb-24 pt-24 lg:pb-36 lg:pt-32">
          <CurveEdge position="top" />
          <Aurora variant="c" />
          <ParticleField count={14} seed={6} parallax={60} />

          <div className="relative z-[2] mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="Clinical reporting"
              title="Integrated AI Lung Cancer"
              accent="Report"
              body="Morphology, measurements, biomarker scores, spatial metrics, molecular predictions and AI visualizations arrive together as one pathology intelligence report."
            />

            {/* ---- Product preview ---- */}
            <div className="relative mx-auto mt-16 max-w-[1180px] lg:mt-20" data-parallax-host>
              <span
                className="pointer-events-none absolute -inset-x-10 -bottom-10 top-10 rounded-[3rem] blur-[60px]"
                style={{
                  backgroundImage:
                    'radial-gradient(60% 60% at 30% 20%, rgba(124,58,237,0.18) 0%, rgba(255,255,255,0) 70%), radial-gradient(55% 55% at 78% 88%, rgba(236,72,153,0.16) 0%, rgba(255,255,255,0) 72%)',
                }}
                aria-hidden="true"
              />

              <div
                data-reveal
                className="report-shell relative overflow-hidden rounded-[2rem] border border-[#EEE9F9] bg-white/90 shadow-[0_50px_110px_-60px_rgba(76,29,149,0.6)] backdrop-blur-xl"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#D946EF]/60 to-transparent"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full opacity-70 blur-[74px]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* Window chrome */}
                <div className="relative flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-[#F3EEFC] px-6 py-5 sm:px-8">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#E9D5FF]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FBCFE8]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#EDE9FE]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-[14px] font-semibold tracking-[-0.005em] text-[#111827]">
                      Case LU-4821 · NSCLC
                    </p>
                    <p className="mt-0.5 font-sans text-[11.5px] leading-relaxed text-gray-500">
                      Lung resection · H&amp;E + PD-L1 22C3 · OmicMind Lung™ v2.4
                    </p>
                  </div>
                  <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50/70 px-3.5 py-1.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
                    Analysis complete
                  </span>
                </div>

                {/* Tabs */}
                <div className="relative flex flex-wrap gap-2 border-b border-[#F3EEFC] px-6 py-3.5 sm:px-8">
                  {['Overview', 'Morphology', 'Biomarkers', 'Spatial', 'Molecular', 'Evidence'].map(
                    (t, i) => (
                      <span
                        key={t}
                        className={`cursor-default rounded-full px-3.5 py-1.5 font-sans text-[12px] font-semibold tracking-[0.01em] transition-all duration-300 ${
                          i === 0
                            ? 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-[0_8px_18px_-6px_rgba(124,58,237,0.7)]'
                            : 'text-gray-500 hover:bg-purple-50/80 hover:text-[#7C3AED]'
                        }`}
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>

                {/* Report body */}
                <div className="relative bg-gradient-to-br from-[#FCFAFF] via-white to-[#FDF6FB] p-5 sm:p-8">
                  <div data-parallax="6" className="relative">
                    <ReportArt className="report-art w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* ---- Report modules ---- */}
            <ul
              data-reveal-group
              className="mt-16 grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
            >
              {REPORT_MODULES.map((m, i) => (
                <li
                  key={m.title}
                  className="group relative flex items-start gap-4 border-t border-[#F1ECFB] py-7 transition-colors duration-500"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] transition-transform duration-500 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="mt-0.5 font-sans text-[12px] font-bold tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-sans text-[15px] font-semibold leading-snug tracking-[-0.008em] text-[#111827]">
                      {m.title}
                    </p>
                    <p className="mt-2 font-sans text-[13.5px] leading-[1.72] text-gray-500">{m.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <CurveEdge position="bottom" />
        </section>

        {/* ============================================================
            FINAL CTA
        ============================================================ */}
        <section className="relative overflow-hidden bg-white py-24 lg:py-32">
          <ParticleField count={20} seed={7} />

          <div className="relative z-[2] mx-auto max-w-[1400px] px-6 lg:px-10">
            <div
              data-reveal
              className="relative overflow-hidden rounded-[2.5rem] border border-[#EEE9F9] bg-white/80 px-6 py-20 text-center shadow-[0_40px_90px_-56px_rgba(76,29,149,0.45)] backdrop-blur-xl sm:px-12 lg:py-28"
            >
              <span
                className="cta-orb pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full opacity-70 blur-[74px]"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.34), transparent 70%)' }}
                aria-hidden="true"
              />
              <span
                className="cta-orb pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full opacity-70 blur-[84px]"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(236,72,153,0.3), transparent 70%)' }}
                aria-hidden="true"
              />
              <span
                className="cta-orb pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[90px]"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(217,70,239,0.16), transparent 70%)' }}
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#D946EF]/60 to-transparent"
                aria-hidden="true"
              />
              <GridTexture
                mask="radial-gradient(60% 70% at 50% 50%, #000 0%, transparent 100%)"
                opacity={0.3}
              />
              <ParticleField count={14} seed={8} />

              <div className="relative mx-auto max-w-3xl">
                <Eyebrow>Get started</Eyebrow>

                <h2 className="mt-8 font-serif text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.022em] text-[#111827] sm:text-[3.2rem] lg:text-[4rem]">
                  Advance Lung Cancer Diagnostics with{' '}
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
                    AI
                  </span>
                </h2>

                <p className="mx-auto mt-7 max-w-2xl font-sans text-[16.5px] leading-[1.75] text-gray-500 sm:text-lg">
                  Unlock deeper insights from every tissue specimen with OmicMind Lung™.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <PrimaryButton className="w-full sm:w-auto">Request Demo</PrimaryButton>
                  <SecondaryButton>Contact Our Team</SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
