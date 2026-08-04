import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Minus } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import {
  BreastHeroArt,
  TissueField,
  FeatureArt,
  FlowIcon,
  SegmentArt,
} from '../components/breast/BreastArt.jsx';

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   Content
================================================================ */

const FEATURES = [
  {
    art: 'ihc',
    tag: 'Biomarkers',
    title: 'Quantitative Biomarker Analysis',
    body: 'Automated AI-powered analysis of the biomarkers that drive breast cancer decisions, with standardized quantitative scoring that improves reproducibility and reduces interpretation variability.',
    chips: ['ER', 'PR', 'HER2', 'Ki-67'],
  },
  {
    art: 'spatial',
    tag: 'Microenvironment',
    title: 'Spatial Immune Profiling',
    body: 'Understand the tumour microenvironment by analysing the spatial relationships between cancer cells, stromal regions and immune populations across intact tissue.',
    chips: ['CD3', 'CD8', 'CD68', 'FOXP3'],
  },
  {
    art: 'molecular',
    tag: 'Multimodal AI',
    title: 'Molecular Prediction',
    body: 'Multimodal models learn the relationships between morphology and genomic biology, surfacing molecular characteristics directly from routine pathology images.',
    chips: ['HRD', 'MSI', 'TMB', 'PIK3CA', 'TP53', 'BRCA1/2'],
  },
  {
    art: 'report',
    tag: 'Reporting',
    title: 'Unified Clinical Reporting',
    body: 'Tissue morphology, biomarker scores, spatial metrics, molecular predictions and AI visualizations arrive together as one pathology intelligence report.',
    chips: ['Morphology', 'Scores', 'Spatial', 'Molecular', 'Visuals'],
  },
];

const WORKFLOW = [
  { icon: 'ffpe', title: 'FFPE Tissue Sample', body: 'Routine blocks and sections, no special protocol.' },
  { icon: 'wsi', title: 'Whole Slide Imaging', body: 'Research-grade digitization of the full slide.' },
  { icon: 'ai', title: 'AI Analysis', body: 'Foundation-model inference across every tile.' },
  { icon: 'biomarker', title: 'Biomarker Quantification', body: 'Objective, repeatable ER, PR, HER2 and Ki-67 scoring.' },
  { icon: 'spatial', title: 'Spatial Profiling', body: 'Immune, stromal and tumour compartments mapped.' },
  { icon: 'molecular', title: 'Molecular Prediction', body: 'Morphology translated into molecular signals.' },
  { icon: 'insights', title: 'Clinical Insights', body: 'One reviewable, explainable report.' },
];

const SEGMENTS = [
  {
    art: 'lab',
    tag: 'Diagnostics',
    title: 'Pathology Laboratories',
    body: 'Improve diagnostic consistency and efficiency with AI-assisted workflows that pre-read every slide before it reaches the pathologist.',
    points: ['Standardized scoring', 'Faster case turnaround', 'Second-read confidence'],
  },
  {
    art: 'pharma',
    tag: 'Industry',
    title: 'Pharmaceutical Research',
    body: 'Accelerate biomarker discovery and clinical trials using computational pathology across screening, stratification and response cohorts.',
    points: ['Cohort-scale analysis', 'Endpoint quantification', 'Auditable study runs'],
  },
  {
    art: 'translational',
    tag: 'Discovery',
    title: 'Translational Research',
    body: 'Connect tissue morphology with molecular biology to build a deeper, testable understanding of how breast cancers behave.',
    points: ['Morphology–omics links', 'Hypothesis generation', 'Reproducible pipelines'],
  },
];

const BENEFITS = [
  {
    title: 'AI-powered tissue analysis',
    body: 'Every region of the slide is examined, not a handful of sampled fields.',
  },
  {
    title: 'Quantitative biomarker scoring',
    body: 'Continuous, numeric readouts in place of ordinal, eyeballed estimates.',
  },
  {
    title: 'Multimodal biological understanding',
    body: 'Imaging, spatial and molecular signals reasoned over as one representation.',
  },
  {
    title: 'Spatial tumour microenvironment analysis',
    body: 'Immune infiltration and tissue architecture measured, not approximated.',
  },
  {
    title: 'Molecular prediction from pathology images',
    body: 'Molecular hypotheses surfaced from the slide you already have.',
  },
  {
    title: 'Explainable AI insights',
    body: 'Heatmaps, detections and per-region evidence behind every number.',
  },
];

const CONVENTIONAL = [
  'Manual, ordinal scoring by eye',
  'Inter-observer variability between readers',
  'Morphology reviewed in isolation',
  'Immune context estimated visually',
  'Molecular insight needs separate assays',
  'Limited traceability of how a call was made',
];

/* ================================================================
   Shared UI atoms — identical language to the rest of the site
================================================================ */

function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50/60 px-3.5 py-1.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#7C3AED] ${className}`}
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
        className="btn-glow pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] blur-[16px]"
        aria-hidden="true"
      />
      <button
        type="button"
        className="btn-primary relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] px-7 py-3.5 font-sans text-[15px] font-semibold tracking-[0.01em] text-white shadow-[0_8px_26px_rgba(124,58,237,0.34)] outline-none ring-1 ring-inset ring-white/25 sm:w-auto"
      >
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
      className={`btn-secondary inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-7 py-3.5 font-sans text-[15px] font-semibold tracking-[0.01em] text-[#111827] outline-none transition-colors duration-300 hover:border-purple-300 hover:text-[#7C3AED] sm:w-auto ${className}`}
    >
      {children}
    </button>
  );
}

function SectionHead({ eyebrow, title, accent, body, align = 'center' }) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <div data-reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2
        data-reveal
        className="mt-6 font-serif text-[2.15rem] font-semibold leading-[1.12] tracking-[-0.012em] text-[#111827] sm:text-[2.75rem] lg:text-[3.1rem]"
      >
        {title}{' '}
        {accent && (
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
            {accent}
          </span>
        )}
      </h2>
      {body && (
        <p
          data-reveal
          className={`mt-5 font-sans text-[15.5px] leading-relaxed text-gray-600 sm:text-base ${
            centered ? 'mx-auto max-w-2xl' : ''
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

function Lighting({ variant = 'a' }) {
  const images = {
    a: 'radial-gradient(52% 58% at 84% 12%, rgba(124,58,237,0.10) 0%, rgba(255,255,255,0) 70%), radial-gradient(46% 52% at 8% 78%, rgba(236,72,153,0.08) 0%, rgba(255,255,255,0) 72%)',
    b: 'radial-gradient(50% 55% at 12% 14%, rgba(168,85,247,0.09) 0%, rgba(255,255,255,0) 70%), radial-gradient(44% 50% at 90% 84%, rgba(236,72,153,0.07) 0%, rgba(255,255,255,0) 72%)',
    c: 'radial-gradient(56% 60% at 50% 0%, rgba(124,58,237,0.08) 0%, rgba(255,255,255,0) 68%)',
  };
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: images[variant] }}
      aria-hidden="true"
    />
  );
}

/* Small marker pill used under the feature copy */
function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-purple-100 bg-purple-50/50 px-2.5 py-1 font-sans text-[11.5px] font-semibold tracking-[0.01em] text-[#7C3AED]">
      {children}
    </span>
  );
}

/* ================================================================
   Page
================================================================ */

export default function BreastCancer() {
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

  /* ---- GSAP: reveals, floats, connectors, hover micro-interactions ---- */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cleanups = [];

      /* ---------- Hover micro-interactions ---------- */
      gsap.utils.toArray('[data-hover-card]').forEach((card) => {
        const glow = card.querySelector('.card-glow');
        const art = card.querySelector('.card-art');
        /* The four feature cards lift and light their illustration as well */
        const artGlow = card.querySelector('.art-glow');
        const feature = card.hasAttribute('data-feature-card');

        const enter = () => {
          gsap.to(card, { y: -8, duration: 0.45, ease: 'power3.out' });
          if (glow) gsap.to(glow, { opacity: 1, duration: 0.45, ease: 'power2.out' });
          if (artGlow) gsap.to(artGlow, { opacity: 1, duration: 0.55, ease: 'power2.out' });
          if (art) {
            gsap.to(art, {
              scale: feature ? 1.05 : 1.06,
              y: feature ? -10 : 0,
              duration: 0.5,
              ease: 'power2.inOut',
            });
          }
        };
        const leave = () => {
          gsap.to(card, { y: 0, duration: 0.55, ease: 'power3.out' });
          if (glow) gsap.to(glow, { opacity: 0, duration: 0.45, ease: 'power2.out' });
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
          if (glow) gsap.to(glow, { opacity: 1, scale: 1.14, duration: 0.5, ease: 'power2.out' });
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

      if (prefersReduced) {
        gsap.set('[data-reveal], [data-reveal-group] > *', { autoAlpha: 1, y: 0 });
        gsap.set('.wf-line-fill, .wf-rail-fill', { scaleX: 1, scaleY: 1 });
        return () => cleanups.forEach((fn) => fn());
      }

      /* ---------- Hero entrance ---------- */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.25 });
      heroTl
        .fromTo(
          '.hero-copy > *',
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.09 }
        )
        .fromTo(
          '.hero-art',
          { y: 40, autoAlpha: 0, scale: 0.96 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 1.15 },
          0.2
        );

      /* ---------- Scroll reveals ---------- */
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });

      gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
        gsap.fromTo(
          group.children,
          { y: 44, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: 'top 86%' },
          }
        );
      });

      /* ---------- Floating hero panels (3D-ish parallax drift) ---------- */
      const floats = [
        ['.bhero-float-a', -10, 6.4, 0],
        ['.bhero-float-b', -16, 5.2, 0.4],
        ['.bhero-float-c', -12, 5.8, 0.8],
        ['.bhero-float-d', -14, 6.8, 0.2],
      ];
      floats.forEach(([sel, y, dur, delay]) => {
        gsap.to(sel, { y, duration: dur, delay, ease: 'sine.inOut', repeat: -1, yoyo: true });
      });

      /* ---------- Hero live details ---------- */
      gsap.fromTo(
        '.bhero-wire',
        { strokeDashoffset: 0 },
        { strokeDashoffset: -44, duration: 2.6, ease: 'none', repeat: -1 }
      );
      gsap.to('.bhero-node', {
        scale: 1.25,
        transformOrigin: 'center',
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.26,
      });
      gsap.fromTo(
        '.bhero-scan',
        { x: 0, autoAlpha: 0 },
        { x: 295, autoAlpha: 0.9, duration: 3.4, ease: 'none', repeat: -1, repeatDelay: 0.9 }
      );
      gsap.to('.bhero-nucleus', {
        opacity: 0.3,
        duration: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.08, from: 'random' },
      });
      gsap.to('.bhero-heat', {
        opacity: '-=0.05',
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.04, from: 'center' },
      });
      gsap.fromTo(
        '.bhero-bar',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.9 }
      );

      /* ---------- Feature illustrations: entrance, then a living idle ----------
         Three nested layers carry three different jobs so no two tweens ever
         write the same transform: .art-enter (scroll entrance), .art-float
         (idle drift) and .card-art (hover). */
      gsap.utils.toArray('.art-enter').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 26, autoAlpha: 0, scale: 0.94 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.95,
            ease: 'power2.out',
            delay: (i % 2) * 0.14,
            scrollTrigger: { trigger: el.closest('[data-hover-card]'), start: 'top 86%' },
          }
        );
      });

      gsap.utils.toArray('.art-float').forEach((el, i) => {
        const phase = i * 0.28;

        /* Vertical breath — the dominant motion */
        gsap.fromTo(
          el,
          { y: 4 },
          { y: -4, duration: 4.6 + i * 0.35, delay: phase, ease: 'sine.inOut', repeat: -1, yoyo: true }
        );
        /* Lateral drift on a longer period so the path never repeats visibly */
        gsap.fromTo(
          el,
          { x: -4 },
          { x: 4, duration: 6.2 + i * 0.4, delay: phase * 1.6, ease: 'sine.inOut', repeat: -1, yoyo: true }
        );
        /* Barely-there tilt */
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
        /* Breathing scale */
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
              scrollTrigger: { trigger: art, start: 'top 85%' },
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

      /* ---------- Workflow connectors ---------- */
      gsap.utils.toArray('.wf-line-fill').forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: line, start: 'top 92%' },
          }
        );
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

      /* Signal packets travelling each connector, faded at both ends so the
         loop restart is never visible. */
      gsap.utils.toArray('.wf-pulse').forEach((dot, i) => {
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.5, delay: i * 0.18 })
          .fromTo(dot, { left: '0%' }, { left: '100%', duration: 1.8, ease: 'power1.inOut' }, 0)
          .fromTo(dot, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power1.out' }, 0)
          .to(dot, { autoAlpha: 0, duration: 0.45, ease: 'power1.in' }, 1.35);
      });

      /* ---------- Comparison ticks ---------- */
      gsap.utils.toArray('.benefit-tick').forEach((tick) => {
        gsap.fromTo(
          tick,
          { scale: 0, autoAlpha: 0, transformOrigin: 'center' },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'back.out(2.2)',
            scrollTrigger: { trigger: tick, start: 'top 92%' },
          }
        );
      });

      /* ---------- CTA ambience ---------- */
      gsap.to('.cta-orb', {
        scale: 1.12,
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
      <Navbar />

      <main ref={rootRef} className="relative w-full bg-white text-[#111827]">
        {/* ============================================================
            HERO
        ============================================================ */}
        <section className="relative overflow-hidden bg-white">
          {/* Stylised breast tissue field — kept very low contrast so the
              headline stays the highest-contrast element on the page. */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <TissueField className="h-full w-full opacity-[0.5]" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(100deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.8) 38%, rgba(255,255,255,0.62) 68%, rgba(255,255,255,0.55) 100%)',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-40"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), #FFFFFF)' }}
            />
          </div>

          <Lighting variant="a" />

          {/* Faint slide-grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(124,58,237,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,58,237,0.045) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(70% 60% at 50% 30%, #000 0%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 pb-20 pt-[122px] lg:grid-cols-[1.02fr_1fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-[168px]">
            {/* ---- Copy ---- */}
            <div className="hero-copy text-center lg:text-left">
              <div>
                <Eyebrow>OmicMind Breast™</Eyebrow>
              </div>

              <h1 className="mt-7 font-serif text-[2.6rem] font-semibold leading-[1.07] tracking-[-0.015em] text-[#111827] sm:text-[3.4rem] lg:text-[4rem]">
                AI-Powered Breast Cancer{' '}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
                  Intelligence
                </span>{' '}
                for Precision Pathology
              </h1>

              <p className="mx-auto mt-6 max-w-xl font-sans text-[17px] font-medium leading-relaxed text-[#1F2937] sm:text-[19px] lg:mx-0 lg:max-w-2xl">
                Transform breast cancer diagnosis with AI-powered digital pathology, quantitative
                biomarker analysis, spatial immune profiling, and molecular prediction from routine
                FFPE tissue.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <PrimaryButton className="w-full sm:w-auto">Request Demo</PrimaryButton>
                <SecondaryButton>Explore Platform</SecondaryButton>
              </div>

              {/* Signal strip */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start">
                {[
                  ['ER · PR · HER2 · Ki-67', 'Quantitative scoring'],
                  ['CD3 · CD8 · CD68 · FOXP3', 'Spatial immune profile'],
                  ['HRD · MSI · TMB', 'Molecular prediction'],
                ].map(([k, v]) => (
                  <div key={k} className="text-center lg:text-left">
                    <p className="font-sans text-[13px] font-semibold tracking-[0.01em] text-[#7C3AED]">
                      {k}
                    </p>
                    <p className="mt-1 font-sans text-[12.5px] leading-relaxed text-gray-500">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- Illustration ---- */}
            <div className="hero-art relative">
              <div
                className="pointer-events-none absolute -inset-8 rounded-[3rem]"
                style={{
                  backgroundImage:
                    'radial-gradient(60% 60% at 45% 40%, rgba(168,85,247,0.12) 0%, rgba(255,255,255,0) 70%), radial-gradient(50% 50% at 75% 80%, rgba(236,72,153,0.10) 0%, rgba(255,255,255,0) 72%)',
                }}
                aria-hidden="true"
              />
              <BreastHeroArt className="relative w-full" />
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 1 — Precision Breast Cancer Analysis
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <Lighting variant="b" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="The solution"
              title="Precision Breast Cancer"
              accent="Analysis"
              body="OmicMind Breast™ combines pathology intelligence, biomarker analysis, and multimodal AI to provide deeper biological understanding from tissue images."
            />

            <div
              data-reveal-group
              className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:gap-7"
            >
              {FEATURES.map((f) => (
                <article
                  key={f.title}
                  data-hover-card
                  data-feature-card
                  className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-[#EEE9F9] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.03)] transition-shadow duration-500 hover:shadow-[0_22px_48px_-24px_rgba(124,58,237,0.45)]"
                >
                  <span
                    className="card-glow pointer-events-none absolute inset-0 z-20 opacity-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(80% 70% at 50% 0%, rgba(124,58,237,0.08) 0%, rgba(255,255,255,0) 72%)',
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute inset-x-8 top-0 z-20 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#D946EF]/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  {/* Visual — right-weighted, floating on its own layer so the
                      loop, the scroll entrance and the hover lift never fight
                      over the same transform. */}
                  <div className="relative overflow-hidden border-b border-[#F3EEFC] bg-gradient-to-br from-[#FCFAFF] to-[#FDF6FB] px-6 py-9 sm:px-8">
                    <span
                      className="art-glow pointer-events-none absolute -right-12 -top-12 h-60 w-60 rounded-full opacity-0 blur-[48px]"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle, rgba(124,58,237,0.42) 0%, rgba(236,72,153,0.26) 46%, rgba(255,255,255,0) 72%)',
                      }}
                      aria-hidden="true"
                    />

                    <div className="art-enter relative w-full sm:ml-auto sm:w-[86%]">
                      <div className="art-float">
                        <FeatureArt name={f.art} className="card-art feature-art w-full" />
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-1 flex-col p-7 lg:p-8">
                    <span className="inline-flex w-fit rounded-full border border-purple-100 bg-purple-50/60 px-2.5 py-1 font-sans text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#7C3AED]">
                      {f.tag}
                    </span>

                    <h3 className="mt-4 font-serif text-[1.5rem] font-semibold leading-snug tracking-[-0.005em] text-[#111827] sm:text-[1.65rem]">
                      {f.title}
                    </h3>
                    <p className="mt-3.5 font-sans text-[14.5px] leading-relaxed text-gray-600">
                      {f.body}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {f.chips.map((c) => (
                        <Chip key={c}>{c}</Chip>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2 — AI-Powered Breast Cancer Workflow
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <Lighting variant="c" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="End to end"
              title="AI-Powered Breast Cancer"
              accent="Workflow"
              body="One continuous chain of custody from block to report, with every step reproducible, versioned and traceable."
            />

            {/* ---- Desktop: horizontal timeline ---- */}
            <div className="relative mt-20 hidden lg:block" data-reveal>
              <div className="grid grid-cols-7 gap-3">
                {WORKFLOW.map((step, i) => (
                  <div key={step.title} className="relative flex flex-col items-center text-center">
                    {/* Connector reaching the centre of the next node */}
                    {i < WORKFLOW.length - 1 && (
                      <div className="absolute left-1/2 top-[34px] h-[2px] w-[calc(100%+0.75rem)] -translate-y-1/2">
                        <span className="absolute inset-0 rounded-full bg-[#F1EDFB]" />
                        <span className="wf-line-fill absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#7C3AED]/60 to-[#EC4899]/45" />
                        <span className="wf-pulse absolute left-0 top-1/2 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EC4899] shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                      </div>
                    )}

                    <div className="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-purple-100 bg-white shadow-[0_6px_18px_rgba(124,58,237,0.10)]">
                      <FlowIcon name={step.icon} className="h-8 w-8" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] font-sans text-[11px] font-bold text-white ring-2 ring-white">
                        {i + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 font-sans text-[14px] font-semibold leading-snug text-[#111827]">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-gray-500">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- Tablet / mobile: vertical rail ---- */}
            <div className="relative mt-14 lg:hidden">
              <div className="absolute bottom-6 left-[33px] top-6 w-[2px] rounded-full bg-[#F1EDFB]" aria-hidden="true">
                <span className="wf-rail-fill absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#7C3AED]/60 to-[#EC4899]/45" />
              </div>

              <ul data-reveal-group className="relative space-y-5">
                {WORKFLOW.map((step, i) => (
                  <li key={step.title} className="flex items-start gap-5">
                    <div className="relative z-10 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border border-purple-100 bg-white shadow-[0_6px_18px_rgba(124,58,237,0.10)]">
                      {/* uid keeps the gradient ids unique against the desktop track */}
                      <FlowIcon name={step.icon} uid="-m" className="h-8 w-8" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] font-sans text-[11px] font-bold text-white ring-2 ring-white">
                        {i + 1}
                      </span>
                    </div>
                    <div className="pt-2.5">
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
            SECTION 3 — Built for Modern Breast Oncology
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <Lighting variant="b" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="Who it serves"
              title="Built for Modern Breast"
              accent="Oncology"
              body="The same platform, governed differently for the diagnostic bench, the trial pipeline and the discovery lab."
            />

            <div
              data-reveal-group
              className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7"
            >
              {SEGMENTS.map((s) => (
                <article
                  key={s.title}
                  data-hover-card
                  className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-[#EEE9F9] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.03)] transition-shadow duration-500 hover:shadow-[0_22px_48px_-24px_rgba(236,72,153,0.4)]"
                >
                  <span
                    className="card-glow pointer-events-none absolute inset-0 z-20 opacity-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(85% 70% at 50% 0%, rgba(236,72,153,0.08) 0%, rgba(255,255,255,0) 72%)',
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative overflow-hidden border-b border-[#F3EEFC] bg-gradient-to-br from-[#FCFAFF] to-[#FDF6FB] px-6 py-8">
                    <SegmentArt name={s.art} className="card-art mx-auto h-[132px] w-full max-w-[260px]" />
                  </div>

                  <div className="relative flex flex-1 flex-col p-7 lg:p-8">
                    <span className="inline-flex w-fit rounded-full border border-purple-100 bg-purple-50/60 px-2.5 py-1 font-sans text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#7C3AED]">
                      {s.tag}
                    </span>

                    <h3 className="mt-4 font-serif text-[1.45rem] font-semibold leading-snug tracking-[-0.005em] text-[#111827]">
                      {s.title}
                    </h3>
                    <p className="mt-3.5 font-sans text-[14.5px] leading-relaxed text-gray-600">
                      {s.body}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-[#F3EEFC] pt-5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
                          <span className="font-sans text-[13.5px] leading-relaxed text-gray-600">
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span
                    className="pointer-events-none absolute bottom-0 left-7 right-7 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] transition-transform duration-500 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4 — Why OmicMind Breast™
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <Lighting variant="a" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="The difference"
              title="Why OmicMind"
              accent="Breast™"
              body="What changes when the slide is read computationally, measured end to end, and every number carries its evidence."
            />

            <div className="mt-14 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-7">
              {/* ---- Conventional column ---- */}
              <div
                data-reveal
                className="relative overflow-hidden rounded-[1.75rem] border border-[#EFF1F5] bg-[#FCFCFD] p-7 lg:p-9"
              >
                <span className="inline-flex rounded-full border border-gray-200 bg-white px-2.5 py-1 font-sans text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                  Conventional read
                </span>
                <h3 className="mt-5 font-serif text-[1.5rem] font-semibold leading-snug text-[#4B5563]">
                  Manual review alone
                </h3>

                <ul className="mt-7 space-y-4">
                  {CONVENTIONAL.map((c) => (
                    <li key={c} className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
                        <Minus className="h-3.5 w-3.5 text-gray-400" strokeWidth={3} />
                      </span>
                      <span className="font-sans text-[14.5px] leading-relaxed text-gray-500">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ---- OmicMind column ---- */}
              <div
                data-reveal
                className="relative overflow-hidden rounded-[1.75rem] border border-[#EEE9F9] bg-white p-7 shadow-[0_24px_70px_-46px_rgba(76,29,149,0.45)] lg:p-9"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#D946EF]/60 to-transparent"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-70 blur-[70px]"
                  style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.16), transparent 70%)' }}
                  aria-hidden="true"
                />

                <Eyebrow>OmicMind Breast™</Eyebrow>
                <h3 className="relative mt-5 font-serif text-[1.5rem] font-semibold leading-snug text-[#111827]">
                  Computational pathology, measured end to end
                </h3>

                <ul data-reveal-group className="relative mt-7 grid grid-cols-1 gap-x-7 gap-y-5 sm:grid-cols-2">
                  {BENEFITS.map((b) => (
                    <li key={b.title} className="flex items-start gap-3.5">
                      <span className="benefit-tick mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] shadow-[0_4px_12px_rgba(124,58,237,0.28)]">
                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.2} />
                      </span>
                      <div>
                        <p className="font-sans text-[14.5px] font-semibold leading-snug tracking-[-0.005em] text-[#111827]">
                          {b.title}
                        </p>
                        <p className="mt-1 font-sans text-[13.5px] leading-relaxed text-gray-600">
                          {b.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5 — Call to action
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <div
              data-reveal
              className="relative overflow-hidden rounded-[2.25rem] border border-[#EEE9F9] bg-white px-6 py-16 text-center shadow-[0_24px_70px_-40px_rgba(76,29,149,0.35)] sm:px-12 lg:py-20"
            >
              <span
                className="cta-orb pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-70 blur-[70px]"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.32), transparent 70%)' }}
                aria-hidden="true"
              />
              <span
                className="cta-orb pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full opacity-70 blur-[80px]"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(236,72,153,0.28), transparent 70%)' }}
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#D946EF]/60 to-transparent"
                aria-hidden="true"
              />

              <div className="relative mx-auto max-w-3xl">
                <Eyebrow>Get started</Eyebrow>

                <h2 className="mt-7 font-serif text-[2.15rem] font-semibold leading-[1.12] tracking-[-0.012em] text-[#111827] sm:text-[2.9rem] lg:text-[3.4rem]">
                  Transform Breast Cancer Pathology with{' '}
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
                    AI
                  </span>
                </h2>

                <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-gray-600 sm:text-lg">
                  Unlock deeper insights from every tissue specimen with OmicMind Breast™.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
