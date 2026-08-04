import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import {
  HeroArt,
  ValueIcon,
  AppArt,
  StepIcon,
  PlatformDashboard,
  AudienceArt,
  PubIcon,
} from '../components/research/ResearchArt.jsx';
import biomarkerImg from '../assets/biomarker.webp';
import multimodalImg from '../assets/multimodal.webp';
import spatialImg from '../assets/spatial.webp';

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   Content
================================================================ */

const VALUES = [
  {
    icon: 'multimodal',
    image: multimodalImg,
    title: 'Multimodal AI Analysis',
    body: 'Analyze pathology images together with genomic, transcriptomic, proteomic, and spatial data.',
  },
  {
    icon: 'biomarker',
    image: biomarkerImg,
    title: 'Biomarker Discovery',
    body: 'Discover novel predictive and prognostic biomarkers using AI.',
  },
  {
    icon: 'spatial',
    image: spatialImg,
    title: 'Spatial Biology',
    body: 'Study tissue architecture and cellular interactions at high resolution.',
  },
  {
    icon: 'translation',
    title: 'Clinical Translation',
    body: 'Transform research findings into clinically actionable insights.',
  },
];

const APPLICATIONS = [
  {
    art: 'cancer',
    title: 'Cancer Research',
    body: 'Profile tumour heterogeneity, clonal architecture and morphology across large slide cohorts.',
  },
  {
    art: 'drug',
    title: 'Drug Development',
    body: 'Quantify treatment response and mechanism of action directly from tissue readouts.',
  },
  {
    art: 'validation',
    title: 'Biomarker Validation',
    body: 'Test candidate markers across independent cohorts with reproducible scoring.',
  },
  {
    art: 'translational',
    title: 'Translational Medicine',
    body: 'Carry discovery findings from the bench into clinically meaningful endpoints.',
  },
  {
    art: 'immuno',
    title: 'Immuno-Oncology',
    body: 'Map immune infiltration, TILs and the tumour microenvironment at cellular resolution.',
  },
  {
    art: 'spatialbio',
    title: 'Spatial Biology',
    body: 'Resolve neighbourhoods, niches and cell–cell interactions across intact tissue.',
  },
  {
    art: 'digitalpath',
    title: 'Digital Pathology',
    body: 'Digitize, review and quantify whole slide images in one collaborative workspace.',
  },
  {
    art: 'aimodel',
    title: 'AI Model Development',
    body: 'Fine-tune foundation models on your own cohorts with versioned, auditable runs.',
  },
];

const WORKFLOW = [
  { icon: 'sample', title: 'Sample Collection', body: 'Cohort intake with consent and metadata capture.' },
  { icon: 'ffpe', title: 'FFPE Tissue', body: 'Sectioning, staining and quality control.' },
  { icon: 'wsi', title: 'Whole Slide Imaging', body: 'High-resolution digitization at research grade.' },
  { icon: 'ai', title: 'AI Image Analysis', body: 'Foundation-model inference across every tile.' },
  { icon: 'integrate', title: 'Spatial & Molecular Integration', body: 'Image features fused with omics layers.' },
  { icon: 'biomarker', title: 'Biomarker Discovery', body: 'Candidate signatures ranked and validated.' },
  { icon: 'publish', title:'Drug Discovery and Testing', body: 'Reproducible results ready to report.' },
];

const PLATFORM_FEATURES = [
  {
    title: 'Whole Slide Analysis',
    body: 'Stream gigapixel images and run inference across the full slide, not sampled regions.',
  },
  {
    title: 'Quantitative Pathology',
    body: 'Objective, repeatable scoring for cell counts, densities and marker positivity.',
  },
  {
    title: 'Spatial Analytics',
    body: 'Neighbourhood statistics, niche detection and distance-based interaction metrics.',
  },
  {
    title: 'Molecular Prediction',
    body: 'Infer molecular status and expression signatures directly from morphology.',
  },
  {
    title: 'Cloud Collaboration',
    body: 'Shared studies, role-based access and audit trails across distributed research teams.',
  },
  {
    title: 'AI-assisted Annotation',
    body: 'Model-proposed regions and nuclei that pathologists refine instead of drawing from scratch.',
  },
];

const AUDIENCES = [
  {
    art: 'academic',
    title: 'Academic Research',
    body: 'Labs and university groups running discovery studies on institutional slide archives.',
  },
  {
    art: 'pharma',
    title: 'Pharmaceutical Companies',
    body: 'Translational and clinical teams quantifying response across trial cohorts.',
  },
  {
    art: 'biotech',
    title: 'Biotechnology Companies',
    body: 'Platform and therapeutics teams building evidence around novel modalities.',
  },
  {
    art: 'cro',
    title: 'Contract Research Organizations',
    body: 'CROs delivering standardized, auditable image analysis at study scale.',
  },
  {
    art: 'hospital',
    title: 'Hospitals & Research Centers',
    body: 'Clinical research units linking pathology archives to patient outcomes.',
  },
];

const PUBLICATIONS = [
  {
    icon: 'paper',
    tag: 'Peer Review',
    title: 'Peer-Reviewed Publications',
    body: 'Methods and results from OmicMind models published across pathology, oncology and computational biology venues.',
  },
  {
    icon: 'shield',
    tag: 'Evidence',
    title: 'Clinical Validation Studies',
    body: 'Retrospective and prospective evaluations measuring model agreement against expert pathologist consensus.',
  },
  {
    icon: 'podium',
    tag: 'Community',
    title: 'Conference Presentations',
    body: 'Findings presented at international digital pathology, AI and precision-oncology meetings.',
  },
  {
    icon: 'benchmark',
    tag: 'Benchmarks',
    title: 'AI Model Benchmarking',
    body: 'Transparent evaluation on reference cohorts with published metrics, ablations and failure analysis.',
  },
  {
    icon: 'collab',
    tag: 'Partnership',
    title: 'Research Collaborations',
    body: 'Joint programs with academic labs, biobanks, pharmaceutical sponsors and CRO partners.',
  },
];

/* ================================================================
   Shared UI atoms — matched to the existing navbar / footer language
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

/* Soft radial lighting used to keep large white sections from going flat */
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

/* ================================================================
   Page
================================================================ */

export default function Research() {
  const rootRef = useRef(null);

  /* ---- Smooth scroll (same configuration the homepage uses) ---- */
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

        const enter = () => {
          gsap.to(card, { y: -8, duration: 0.45, ease: 'power3.out' });
          if (glow) gsap.to(glow, { opacity: 1, duration: 0.45, ease: 'power2.out' });
          if (art) gsap.to(art, { scale: 1.07, duration: 0.5, ease: 'power3.out' });
        };
        const leave = () => {
          gsap.to(card, { y: 0, duration: 0.55, ease: 'power3.out' });
          if (glow) gsap.to(glow, { opacity: 0, duration: 0.45, ease: 'power2.out' });
          if (art) gsap.to(art, { scale: 1, duration: 0.55, ease: 'power3.out' });
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
        gsap.set('.dash-bar', { scaleX: 1 });
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

      /* ---------- Card imagery fades in as it enters view ---------- */
      gsap.utils.toArray('[data-card-img]').forEach((img) => {
        gsap.fromTo(
          img,
          { autoAlpha: 0, scale: 1.06 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: img, start: 'top 94%' },
          }
        );
      });

      /* ---------- Floating hero illustration ---------- */
      const floats = [
        ['.hero-float-a', -10, 6.4, 0],
        ['.hero-float-b', -16, 5.2, 0.4],
        ['.hero-float-c', -12, 5.8, 0.8],
        ['.hero-float-d', -14, 6.8, 0.2],
      ];
      floats.forEach(([sel, y, dur, delay]) => {
        gsap.to(sel, {
          y,
          duration: dur,
          delay,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      /* ---------- Hero live details ---------- */
      gsap.fromTo(
        '.hero-wire',
        { strokeDashoffset: 0 },
        { strokeDashoffset: -44, duration: 2.6, ease: 'none', repeat: -1 }
      );
      gsap.to('.hero-node', {
        scale: 1.25,
        transformOrigin: 'center',
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.26,
      });
      gsap.fromTo(
        '.hero-scan',
        { x: 0, autoAlpha: 0 },
        { x: 300, autoAlpha: 0.9, duration: 3.4, ease: 'none', repeat: -1, repeatDelay: 0.9 }
      );
      gsap.to('.hero-nucleus', {
        opacity: 0.35,
        duration: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.08, from: 'random' },
      });
      gsap.to('.hero-heat', {
        opacity: '-=0.12',
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.04, from: 'center' },
      });
      gsap.fromTo(
        '.hero-bar',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.9 }
      );

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

      /* A packet of signal travelling each connector, fading at both ends
         so the loop restart is never visible. */
      gsap.utils.toArray('.wf-pulse').forEach((dot, i) => {
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.5, delay: i * 0.18 })
          .fromTo(dot, { left: '0%' }, { left: '100%', duration: 1.8, ease: 'power1.inOut' }, 0)
          .fromTo(dot, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power1.out' }, 0)
          .to(dot, { autoAlpha: 0, duration: 0.45, ease: 'power1.in' }, 1.35);
      });

      /* ---------- Dashboard mockup ---------- */
      gsap.fromTo(
        '.dash-bar',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.15,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.platform-art', start: 'top 78%' },
        }
      );
      gsap.fromTo(
        '.dash-ring',
        { strokeDashoffset: 214 },
        {
          strokeDashoffset: 42,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.platform-art', start: 'top 78%' },
        }
      );
      gsap.fromTo(
        '.dash-heat',
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.platform-art', start: 'top 78%' },
        }
      );
      gsap.fromTo(
        '.dash-contour',
        { strokeDashoffset: 0 },
        { strokeDashoffset: -44, duration: 3, ease: 'none', repeat: -1 }
      );
      gsap.to('.platform-art', {
        y: -14,
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
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
          {/* Premium multi-omics / computational-biology backdrop.
              Unblurred so the imagery stays crisp; readability comes from a
              light white scrim that is strongest over the copy column. */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <img
              src={biomarkerImg}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="h-full w-full object-cover object-center opacity-[0.55]"
              style={{
                maskImage: 'linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(100deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.86) 34%, rgba(255,255,255,0.6) 62%, rgba(255,255,255,0.5) 100%)',
              }}
            />
            <div
              className="absolute inset-0 lg:hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}
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
                <Eyebrow>OmicMind.ai for Research</Eyebrow>
              </div>

              <h1 className="mt-7 font-serif text-[2.9rem] font-semibold leading-[1.06] tracking-[-0.015em] text-[#111827] sm:text-[3.75rem] lg:text-[4.4rem]">
                Research{' '}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
                  Solutions
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl font-sans text-[17px] font-medium leading-relaxed text-[#1F2937] sm:text-[19px] lg:mx-0 lg:max-w-2xl">
                Accelerating biomedical research with multimodal AI, digital pathology,
                computational imaging, and molecular intelligence.
              </p>

              <p className="mx-auto mt-5 max-w-xl font-sans text-[15.5px] leading-relaxed text-gray-600 sm:text-base lg:mx-0 lg:max-w-2xl">
                OmicMind.ai empowers academic institutions, pharmaceutical companies, CROs, and
                translational research teams with AI-powered pathology workflows that enable
                biomarker discovery, spatial biology, and computational tissue analysis.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <PrimaryButton className="w-full sm:w-auto">Request Demo</PrimaryButton>
                <SecondaryButton>Talk to Research Team</SecondaryButton>
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
              <HeroArt className="relative w-full" />
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 1 — Why OmicMind Research
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <Lighting variant="b" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="Why OmicMind"
              title="Why OmicMind"
              accent="Research"
              body="A single computational layer over imaging and molecular data, built for the questions research teams actually need to answer."
            />

            <div
              data-reveal-group
              className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
            >
              {VALUES.map((v) => (
                <article
                  key={v.title}
                  data-hover-card
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

                  {/* Media header — same height on every card so the grid stays even */}
                  <div className="relative h-[190px] w-full shrink-0 overflow-hidden rounded-t-[1.75rem] border-b border-[#F3EEFC] bg-gradient-to-br from-[#FCFAFF] to-[#FDF6FB]">
                    {v.image ? (
                      <img
                        data-card-img
                        src={v.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="card-art h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="card-art flex h-full w-full items-center justify-center">
                        <ValueIcon name={v.icon} className="h-14 w-14" />
                      </div>
                    )}

                    {/* Soft purple/pink glow that lifts in on hover */}
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        backgroundImage:
                          'linear-gradient(155deg, rgba(124,58,237,0.16) 0%, rgba(255,255,255,0) 55%, rgba(236,72,153,0.16) 100%)',
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/70 to-transparent"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="relative flex flex-1 flex-col p-7">
                    <h3 className="font-serif text-[1.35rem] font-semibold leading-snug tracking-[-0.005em] text-[#111827]">
                      {v.title}
                    </h3>
                    <p className="mt-3.5 font-sans text-[14.5px] leading-relaxed text-gray-600">
                      {v.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2 — Research Applications
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <Lighting variant="c" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="Applications"
              title="Research"
              accent="Applications"
              body="From discovery through validation, the same platform adapts to the study design in front of you."
            />

            <div
              data-reveal-group
              className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
            >
              {APPLICATIONS.map((a) => (
                <article
                  key={a.title}
                  data-hover-card
                  className="group relative overflow-hidden rounded-[1.75rem] border border-[#EEE9F9] bg-white p-7 shadow-[0_1px_2px_rgba(17,24,39,0.03)]"
                >
                  <span
                    className="card-glow pointer-events-none absolute inset-0 opacity-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(85% 70% at 50% 0%, rgba(236,72,153,0.08) 0%, rgba(255,255,255,0) 72%)',
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative overflow-hidden rounded-2xl border border-[#F3EEFC] bg-gradient-to-br from-[#FCFAFF] to-[#FDF6FB] px-4 py-5">
                    <AppArt name={a.art} className="card-art mx-auto h-[76px] w-full max-w-[168px]" />
                  </div>

                  <h3 className="relative mt-6 font-serif text-[1.2rem] font-semibold leading-snug tracking-[-0.005em] text-[#111827]">
                    {a.title}
                  </h3>
                  <p className="relative mt-3 font-sans text-[14px] leading-relaxed text-gray-600">
                    {a.body}
                  </p>

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
            SECTION 3 — Research Workflow
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <Lighting variant="b" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="End to end"
              title="Research"
              accent="Workflow"
              body="One continuous chain of custody from tissue to publication, with every step reproducible and traceable."
            />

            {/* ---- Desktop: horizontal track ---- */}
            <div className="relative mt-20 hidden lg:block" data-reveal>
              <div className="grid grid-cols-7 gap-3">
                {WORKFLOW.map((step, i) => (
                  <div key={step.title} className="relative flex flex-col items-center text-center">
                    {/* Connector to the next step. Its width is the column plus
                        the grid gap, so it lands on the centre of the next node. */}
                    {i < WORKFLOW.length - 1 && (
                      <div className="absolute left-1/2 top-[34px] h-[2px] w-[calc(100%+0.75rem)] -translate-y-1/2">
                        <span className="absolute inset-0 rounded-full bg-[#F1EDFB]" />
                        <span className="wf-line-fill absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#7C3AED]/60 to-[#EC4899]/45" />
                        <span className="wf-pulse absolute left-0 top-1/2 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EC4899] shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                      </div>
                    )}

                    <div className="wf-node relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-purple-100 bg-white shadow-[0_6px_18px_rgba(124,58,237,0.10)]">
                      <StepIcon name={step.icon} className="h-8 w-8" />
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
                    <div className="wf-node relative z-10 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border border-purple-100 bg-white shadow-[0_6px_18px_rgba(124,58,237,0.10)]">
                      {/* uid keeps the gradient ids unique against the desktop track */}
                      <StepIcon name={step.icon} uid="-m" className="h-8 w-8" />
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
            SECTION 4 — Research Platform
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <Lighting variant="a" />

          <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:px-10">
            {/* ---- Dashboard ---- */}
            <div data-reveal className="relative order-2 lg:order-1">
              <div
                className="pointer-events-none absolute -inset-10 rounded-[3rem]"
                style={{
                  backgroundImage:
                    'radial-gradient(60% 60% at 50% 45%, rgba(124,58,237,0.11) 0%, rgba(255,255,255,0) 72%)',
                }}
                aria-hidden="true"
              />
              <PlatformDashboard className="platform-art relative w-full" />
            </div>

            {/* ---- Features ---- */}
            <div className="order-1 lg:order-2">
              <SectionHead
                eyebrow="The platform"
                title="Research"
                accent="Platform"
                body="Whole slide viewing, AI heatmaps, cell detection, biomarker scoring and tissue segmentation in one workspace your whole team can reach."
                align="left"
              />

              <ul data-reveal-group className="mt-10 space-y-3.5">
                {PLATFORM_FEATURES.map((f) => (
                  <li
                    key={f.title}
                    data-hover-card
                    className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-[#EEE9F9] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(17,24,39,0.03)]"
                  >
                    <span
                      className="card-glow pointer-events-none absolute inset-0 opacity-0"
                      style={{
                        backgroundImage:
                          'linear-gradient(90deg, rgba(124,58,237,0.07) 0%, rgba(255,255,255,0) 60%)',
                      }}
                      aria-hidden="true"
                    />
                    <span className="card-art relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] shadow-[0_4px_12px_rgba(124,58,237,0.28)]">
                      <Check className="h-4 w-4 text-white" strokeWidth={3} />
                    </span>
                    <div className="relative">
                      <h3 className="font-sans text-[15.5px] font-semibold tracking-[-0.005em] text-[#111827]">
                        {f.title}
                      </h3>
                      <p className="mt-1 font-sans text-[13.5px] leading-relaxed text-gray-600">
                        {f.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5 — Who We Support
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <Lighting variant="c" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="Our partners"
              title="Who We"
              accent="Support"
              body="Research organisations of every shape run on the same platform, with the governance each of them requires."
            />

            <div
              data-reveal-group
              className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-5"
            >
              {AUDIENCES.map((a) => (
                <article
                  key={a.title}
                  data-hover-card
                  className="group relative overflow-hidden rounded-[1.75rem] border border-[#EEE9F9] bg-white p-7 text-center shadow-[0_1px_2px_rgba(17,24,39,0.03)]"
                >
                  <span
                    className="card-glow pointer-events-none absolute inset-0 opacity-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(80% 70% at 50% 0%, rgba(168,85,247,0.09) 0%, rgba(255,255,255,0) 72%)',
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative mx-auto flex h-[92px] w-full items-center justify-center rounded-2xl border border-[#F3EEFC] bg-gradient-to-br from-[#FCFAFF] to-[#FDF6FB]">
                    <AudienceArt name={a.art} className="card-art h-[68px] w-auto" />
                  </div>

                  <h3 className="relative mt-6 font-serif text-[1.15rem] font-semibold leading-snug tracking-[-0.005em] text-[#111827]">
                    {a.title}
                  </h3>
                  <p className="relative mt-3 font-sans text-[13.5px] leading-relaxed text-gray-600">
                    {a.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6 — Publications & Validation
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <Lighting variant="b" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHead
              eyebrow="Evidence"
              title="Publications &"
              accent="Validation"
              body="Every claim on this page is meant to be checkable — here is how the work is evaluated, reported and shared."
            />

            <div className="relative mx-auto mt-16 max-w-4xl">
              {/* Spine */}
              <div
                className="absolute bottom-4 left-[27px] top-4 w-[2px] rounded-full bg-[#F1EDFB] md:left-1/2 md:-translate-x-1/2"
                aria-hidden="true"
              >
                <span className="wf-rail-fill absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#7C3AED]/55 via-[#D946EF]/45 to-[#EC4899]/40" />
              </div>

              <ul data-reveal-group className="relative space-y-6 md:space-y-10">
                {PUBLICATIONS.map((p, i) => {
                  const flip = i % 2 === 1;
                  return (
                    <li
                      key={p.title}
                      className={`relative flex items-start gap-5 md:gap-0 ${
                        flip ? 'md:flex-row-reverse' : 'md:flex-row'
                      }`}
                    >
                      {/* Node */}
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-purple-100 bg-white shadow-[0_6px_18px_rgba(124,58,237,0.10)] md:absolute md:left-1/2 md:-translate-x-1/2">
                        <PubIcon name={p.icon} className="h-7 w-7" />
                      </div>

                      {/* Card */}
                      <div
                        data-hover-card
                        className={`group relative w-full overflow-hidden rounded-[1.5rem] border border-[#EEE9F9] bg-white p-6 shadow-[0_1px_2px_rgba(17,24,39,0.03)] md:w-[calc(50%-3rem)] ${
                          flip ? 'md:mr-auto md:text-right' : 'md:ml-auto'
                        }`}
                      >
                        <span
                          className="card-glow pointer-events-none absolute inset-0 opacity-0"
                          style={{
                            backgroundImage:
                              'radial-gradient(80% 80% at 50% 0%, rgba(124,58,237,0.08) 0%, rgba(255,255,255,0) 72%)',
                          }}
                          aria-hidden="true"
                        />
                        <span className="relative inline-flex rounded-full border border-purple-100 bg-purple-50/60 px-2.5 py-1 font-sans text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#7C3AED]">
                          {p.tag}
                        </span>
                        <h3 className="relative mt-4 font-serif text-[1.25rem] font-semibold leading-snug tracking-[-0.005em] text-[#111827]">
                          {p.title}
                        </h3>
                        <p className="relative mt-2.5 font-sans text-[14px] leading-relaxed text-gray-600">
                          {p.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 7 — Call to action
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <div
              data-reveal
              className="relative overflow-hidden rounded-[2.25rem] border border-[#EEE9F9] bg-white px-6 py-16 text-center shadow-[0_24px_70px_-40px_rgba(76,29,149,0.35)] sm:px-12 lg:py-20"
            >
              {/* Gradient ambience */}
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
                  Advance Biomedical Research with{' '}
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
                    OmicMind AI
                  </span>
                </h2>

                <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-gray-600 sm:text-lg">
                  Build the future of computational pathology using multimodal AI foundation models.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <PrimaryButton className="w-full sm:w-auto">Request Demo</PrimaryButton>
                  <SecondaryButton>Contact Research Team</SecondaryButton>
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
