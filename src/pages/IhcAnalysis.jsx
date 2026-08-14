import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { OmioIcon } from '../components/ihc/OmioIcons.jsx';
import ihcHeroVideo from '../assets/ihcvid.mp4';
import ihcVideo from '../assets/ihc.mp4';

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   Content — OmicMind Oncology Solutions
================================================================ */

/* Per-card tint. Each solution carries one shade from the site's pink→purple
   range, kept pastel and low-saturation so #111827 headings and gray-600 body
   copy keep their contrast. `tint` is the pastel-to-medium card gradient,
   `line`/`lineHover` the matching border, `glow` the hover wash that replaces
   the generic violet/pink one — same geometry and opacities, card's own hues. */
const SOLUTIONS = [
  {
    icon: 'breast',
    name: 'Omio Breast™',
    pack: 'Breast Cancer Pack',
    body: 'Full-panel biomarker quantification and spatial immune profiling in invasive breast carcinoma.',
    shade: 'blush',
    tint:
      'linear-gradient(158deg, rgba(255,246,249,0.90) 0%, rgba(252,228,238,0.90) 55%, rgba(248,213,229,0.90) 100%)',
    line: '#F4CFE0',
    lineHover: '#EDB9D0',
    glow:
      'radial-gradient(85% 70% at 50% 0%, rgba(219,39,119,0.10) 0%, rgba(255,255,255,0) 72%), radial-gradient(70% 60% at 80% 100%, rgba(236,72,153,0.08) 0%, rgba(255,255,255,0) 72%)',
  },
  {
    icon: 'lung',
    name: 'Omio Lung™',
    body: 'Morphology and biomarker analysis across lung tumour subtypes.',
    shade: 'lilac',
    tint:
      'linear-gradient(158deg, rgba(249,247,255,0.90) 0%, rgba(239,235,254,0.90) 55%, rgba(229,222,252,0.90) 100%)',
    line: '#E0D8FA',
    lineHover: '#C9BEF5',
    glow:
      'radial-gradient(85% 70% at 50% 0%, rgba(139,92,246,0.10) 0%, rgba(255,255,255,0) 72%), radial-gradient(70% 60% at 80% 100%, rgba(167,139,250,0.08) 0%, rgba(255,255,255,0) 72%)',
  },
  {
    icon: 'colorectal',
    name: 'Omio Colorectal™',
    pack: 'Colorectal Adenocarcinoma Pack',
    body: 'Precision stratification, tumor budding, and spatial Immunoscore implementation.',
    shade: 'orchid',
    tint:
      'linear-gradient(158deg, rgba(253,245,252,0.90) 0%, rgba(247,228,245,0.90) 55%, rgba(241,213,239,0.90) 100%)',
    line: '#EDCFEA',
    lineHover: '#E2B5DE',
    glow:
      'radial-gradient(85% 70% at 50% 0%, rgba(192,38,211,0.09) 0%, rgba(255,255,255,0) 72%), radial-gradient(70% 60% at 80% 100%, rgba(217,70,239,0.07) 0%, rgba(255,255,255,0) 72%)',
  },
  {
    icon: 'endometrium',
    name: 'Omio Endometrium™',
    pack: 'Endometrial Carcinoma Pack',
    body: 'ProMisE molecular framework alignment and risk stratification.',
    shade: 'mauve',
    tint:
      'linear-gradient(158deg, rgba(251,246,249,0.90) 0%, rgba(243,229,238,0.90) 55%, rgba(235,215,228,0.90) 100%)',
    line: '#E6D1DF',
    lineHover: '#D9B9CD',
    glow:
      'radial-gradient(85% 70% at 50% 0%, rgba(157,23,77,0.07) 0%, rgba(255,255,255,0) 72%), radial-gradient(70% 60% at 80% 100%, rgba(190,24,93,0.06) 0%, rgba(255,255,255,0) 72%)',
  },
  {
    icon: 'prostate',
    name: 'Omio Prostate™',
    pack: 'Prostate Adenocarcinoma Pack',
    body: 'Automated needle biopsy core evaluation and radical prostatectomy grading.',
    shade: 'violet',
    tint:
      'linear-gradient(158deg, rgba(246,244,254,0.90) 0%, rgba(233,229,253,0.90) 55%, rgba(218,212,251,0.90) 100%)',
    line: '#D5CEF9',
    lineHover: '#BAAFF4',
    glow:
      'radial-gradient(85% 70% at 50% 0%, rgba(109,40,217,0.10) 0%, rgba(255,255,255,0) 72%), radial-gradient(70% 60% at 80% 100%, rgba(124,58,237,0.08) 0%, rgba(255,255,255,0) 72%)',
  },
  {
    icon: 'ovarian',
    name: 'Omio Ovarian™',
    pack: 'Ovarian Epithelial Carcinoma Pack',
    body: 'High-grade serous ovarian carcinoma (HGSOC) stratification and immune microenvironment.',
    shade: 'plum',
    tint:
      'linear-gradient(158deg, rgba(250,245,253,0.90) 0%, rgba(239,229,248,0.90) 55%, rgba(228,214,242,0.90) 100%)',
    line: '#DFD0EE',
    lineHover: '#CDB6E4',
    glow:
      'radial-gradient(85% 70% at 50% 0%, rgba(147,51,234,0.09) 0%, rgba(255,255,255,0) 72%), radial-gradient(70% 60% at 80% 100%, rgba(168,85,247,0.07) 0%, rgba(255,255,255,0) 72%)',
  },
  {
    icon: 'pancreas',
    name: 'Omio Pancreas™',
    pack: 'Pancreatic Ductal Adenocarcinoma (PDAC) Pack',
    body: 'Low-cellularity, stroma-rich pancreatic biopsy and resection profiling.',
    shade: 'rose',
    tint:
      'linear-gradient(158deg, rgba(255,246,248,0.90) 0%, rgba(251,231,236,0.90) 55%, rgba(245,216,225,0.90) 100%)',
    line: '#F1D2DC',
    lineHover: '#E7B9C8',
    glow:
      'radial-gradient(85% 70% at 50% 0%, rgba(225,29,72,0.07) 0%, rgba(255,255,255,0) 72%), radial-gradient(70% 60% at 80% 100%, rgba(244,63,94,0.06) 0%, rgba(255,255,255,0) 72%)',
  },
  {
    icon: 'melanoma',
    name: 'Omio Melanoma™',
    pack: 'Cutaneous & Metastatic Melanoma Pack',
    body: 'Microenvironment spatial profiling in primary and metastatic lesions.',
    shade: 'amethyst',
    tint:
      'linear-gradient(158deg, rgba(248,245,252,0.90) 0%, rgba(235,228,246,0.90) 55%, rgba(220,209,240,0.90) 100%)',
    line: '#D7CBEC',
    lineHover: '#C0AEE1',
    glow:
      'radial-gradient(85% 70% at 50% 0%, rgba(126,34,206,0.09) 0%, rgba(255,255,255,0) 72%), radial-gradient(70% 60% at 80% 100%, rgba(147,51,234,0.07) 0%, rgba(255,255,255,0) 72%)',
  },
];

/* Pack detail — Omio Breast™ and Omio Colorectal™.
   `v` renders as a scannable violet value chip; `sup` appends a true
   superscript so mm² is set typographically rather than as a glyph. */
const PACKS = [
  {
    id: 'omio-breast',
    icon: 'breast',
    product: 'Omio Breast™',
    pack: 'Breast Cancer Pack',
    focus:
      'Full-panel biomarker quantification and spatial immune profiling in invasive breast carcinoma.',
    tiers: [
      {
        tier: 'A',
        label: 'RUO Quant',
        wide: true,
        items: [
          { t: 'H&E tumor mask & tumor %' },
          { t: 'ER/PR nuclear positivity %, intensity distribution', v: '0, 1+, 2+, 3+' },
          { t: 'Allred Score', v: '0–8' },
          { t: 'H-Score', v: '0–300' },
          { t: 'Ki-67 global index & automated top-3 hotspot proliferation index' },
          { t: 'HER2 membrane completeness & intensity scoring assist' },
          { t: 'CD3/CD8 intratumoral vs. stromal immune density per mm', sup: '2' },
        ],
      },
      {
        tier: 'B',
        label: 'Research Models',
        items: [
          { t: 'H&E-based PIK3CA mutation probability' },
          { t: 'TP53 mutation score' },
          { t: 'Homologous Recombination Deficiency (HRD) morphology phenotype score' },
        ],
      },
      {
        tier: 'C',
        label: 'Decision Layer',
        items: [{ t: 'Neoadjuvant chemotherapy complete response (pCR) prediction score' }],
      },
    ],
  },
  {
    id: 'omio-colorectal',
    icon: 'colorectal',
    product: 'Omio Colorectal™',
    pack: 'Colorectal Adenocarcinoma Pack',
    focus: 'Precision stratification, tumor budding, and spatial Immunoscore implementation.',
    tiers: [
      {
        tier: 'A',
        label: 'RUO Quant',
        wide: true,
        items: [
          { t: 'Tumor Budding quantification at the invasive front', v: 'single cells/small clusters' },
          {
            t: 'Mismatch Repair (MMR) IHC interpretation assist',
            v: 'MLH1, PMS2, MSH2, MSH6 retained vs. loss',
          },
          {
            t: 'Immunoscore-style CD3+/CD8+ density calculation at the Tumor Core (CT) and Invasive Margin (IM)',
          },
        ],
      },
      {
        tier: 'B',
        label: 'Research Models',
        items: [
          { t: 'H&E-based Microsatellite Instability High (MSI-H) likelihood score' },
          { t: 'BRAF V600E prediction' },
          { t: 'KRAS/NRAS mutation screening' },
        ],
      },
      {
        tier: 'C',
        label: 'Decision Layer',
        items: [
          { t: 'Adjuvant fluoropyrimidine chemotherapy benefit score' },
          { t: 'Anti-EGFR response index' },
        ],
      },
    ],
  },
  {
    id: 'omio-endometrium',
    icon: 'endometrium',
    product: 'Omio Endometrium™',
    pack: 'Endometrial Carcinoma Pack',
    focus: 'ProMisE molecular framework alignment and risk stratification.',
    tiers: [
      {
        tier: 'A',
        label: 'RUO Quant',
        wide: true,
        items: [
          { t: 'Epithelial segmentation and myometrial invasion depth estimation' },
          {
            t: 'p53 IHC pattern classifier',
            v: 'Wild-type vs. Mutant-overexpression / Null patterns',
          },
          { t: 'MMR IHC panel scoring' },
        ],
      },
      {
        tier: 'B',
        label: 'Research Models',
        items: [
          { t: 'POLE exonuclease domain mutation likelihood prediction from H&E' },
          { t: 'Integrated 4-class molecular subtype classifier' },
        ],
      },
      {
        tier: 'C',
        label: 'Decision Layer',
        items: [{ t: 'Recurrence risk score for early-stage endometrial carcinomas' }],
      },
    ],
  },
  {
    id: 'omio-prostate',
    icon: 'prostate',
    product: 'Omio Prostate™',
    pack: 'Prostate Adenocarcinoma Pack',
    focus: 'Automated needle biopsy core evaluation and radical prostatectomy grading.',
    tiers: [
      {
        tier: 'A',
        label: 'RUO Quant',
        wide: true,
        items: [
          { t: 'Cancer detection & core involvement percentage' },
          { t: 'Automated Gleason Pattern classification', v: 'Patterns 3, 4, 5' },
          { t: 'Cribriform architecture detection %' },
          { t: 'Grade Group output', v: '1 to 5' },
        ],
      },
      {
        tier: 'B',
        label: 'Research Models',
        items: [
          { t: 'PTEN expression loss probability' },
          { t: 'ERG rearrangement likelihood' },
          { t: 'BRCA2/ATM alteration screening from morphology' },
        ],
      },
      {
        tier: 'C',
        label: 'Decision Layer',
        items: [{ t: 'Post-prostatectomy biochemical recurrence (BCR) risk scoring' }],
      },
    ],
  },
  {
    id: 'omio-ovarian',
    icon: 'ovarian',
    product: 'Omio Ovarian™',
    pack: 'Ovarian Epithelial Carcinoma Pack',
    focus:
      'High-grade serous ovarian carcinoma (HGSOC) stratification and immune microenvironment.',
    tiers: [
      {
        tier: 'A',
        label: 'RUO Quant',
        wide: true,
        items: [
          { t: 'Tumor-to-stroma ratio' },
          { t: 'Dense fibrotic stroma quantification' },
          { t: 'p53 mutant staining pattern assist' },
          { t: 'CD8+ intra-epithelial lymphocyte spatial density' },
        ],
      },
      {
        tier: 'B',
        label: 'Research Models',
        items: [
          { t: 'Genomic HRD phenotype likelihood prediction' },
          { t: 'Somatic BRCA1/2 mutation screening' },
        ],
      },
      {
        tier: 'C',
        label: 'Decision Layer',
        items: [{ t: 'Platinum chemotherapy sensitivity/resistance prediction index' }],
      },
    ],
  },
  {
    id: 'omio-pancreas',
    icon: 'pancreas',
    product: 'Omio Pancreas™',
    pack: 'Pancreatic Ductal Adenocarcinoma (PDAC) Pack',
    focus: 'Low-cellularity, stroma-rich pancreatic biopsy and resection profiling.',
    tiers: [
      {
        tier: 'A',
        label: 'RUO Quant',
        wide: true,
        items: [
          { t: 'Desmoplastic stroma area %' },
          { t: 'Tumor cellularity count' },
          { t: 'Stroma-to-tumor ratio (STR)' },
          { t: 'Suppressive myeloid microenvironment mapping' },
        ],
      },
      {
        tier: 'B',
        label: 'Research Models',
        items: [
          { t: 'KRAS oncogenic mutation prediction' },
          { t: 'SMAD4/DPC4 loss-of-expression screening' },
        ],
      },
      {
        tier: 'C',
        label: 'Decision Layer',
        items: [
          { t: 'Comparative FOLFIRINOX vs. Gemcitabine chemotherapy benefit estimation' },
        ],
      },
    ],
  },
  {
    id: 'omio-melanoma',
    icon: 'melanoma',
    product: 'Omio Melanoma™',
    pack: 'Cutaneous & Metastatic Melanoma Pack',
    focus: 'Microenvironment spatial profiling in primary and metastatic lesions.',
    tiers: [
      {
        tier: 'A',
        label: 'RUO Quant',
        wide: true,
        items: [
          { t: 'Pigment-filtered tumor architecture segmentation' },
          { t: 'Breslow depth estimation assist' },
          { t: 'CD8+ T-cell infiltration patterns:', sub: ['Inflamed', 'Excluded', 'Desert'] },
        ],
      },
      {
        tier: 'B',
        label: 'Research Models',
        items: [
          { t: 'H&E-based BRAF V600E mutation probability' },
          { t: 'NRAS/KIT alteration scores' },
        ],
      },
      {
        tier: 'C',
        label: 'Decision Layer',
        items: [
          { t: 'Combined Anti-PD-1 + Anti-CTLA-4 immunotherapy response prediction' },
        ],
      },
    ],
  },
];

/* ================================================================
   Hero composition — decorative layers

   Everything below is positioned in percentages of the hero stage, so
   the arrangement holds its proportions at every breakpoint. The stage
   is inset slightly negative of the video frame, which lets elements
   sit on the footage's edges or just outside it, never over its centre.
================================================================ */

/* Soft glowing AI analysis nodes */
const HERO_NODES = [
  { x: '3%', y: '22%', s: 10, tone: 'violet' },
  { x: '96%', y: '16%', s: 8, tone: 'pink' },
  { x: '92%', y: '66%', s: 12, tone: 'violet' },
  { x: '7%', y: '78%', s: 9, tone: 'pink' },
  { x: '50%', y: '2%', s: 7, tone: 'violet' },
  { x: '38%', y: '97%', s: 8, tone: 'pink' },
];

/* Molecular dots — the finest layer, kept low-contrast */
const HERO_DOTS = [
  { x: '12%', y: '8%', s: 3, o: 0.5 },
  { x: '22%', y: '94%', s: 4, o: 0.45 },
  { x: '84%', y: '6%', s: 3, o: 0.5 },
  { x: '97%', y: '40%', s: 4, o: 0.4 },
  { x: '2%', y: '52%', s: 3, o: 0.45 },
  { x: '66%', y: '99%', s: 3, o: 0.4 },
  { x: '30%', y: '3%', s: 2, o: 0.5 },
  { x: '75%', y: '93%', s: 4, o: 0.35 },
  { x: '9%', y: '36%', s: 2, o: 0.5 },
  { x: '94%', y: '84%', s: 3, o: 0.4 },
  { x: '58%', y: '5%', s: 2, o: 0.45 },
  { x: '17%', y: '62%', s: 3, o: 0.3 },
];

/* Cellular / biomarker markers */
const HERO_MARKERS = [
  { label: 'Ki-67', x: '-2%', y: '58%' },
  { label: 'HER2', x: '64%', y: '-4%' },
  { label: 'CD8+', x: '86%', y: '92%' },
];

/* Glass information panels. Panel three only appears from `md` up so the
   composition stays uncluttered on small screens. */
const HERO_PANELS = [
  {
    label: 'AI Tissue Analysis',
    meta: 'Segmentation active',
    pos: 'left-[-2%] top-[10%] sm:left-[-6%]',
    show: 'hidden sm:flex',
  },
  {
    label: 'Biomarker Detection',
    meta: '7 markers tracked',
    pos: 'right-[-2%] top-[44%] sm:right-[-6%]',
    show: 'hidden sm:flex',
  },
  {
    label: 'Spatial Profiling',
    meta: 'Immune map',
    pos: 'left-[6%] bottom-[-6%]',
    show: 'hidden md:flex',
  },
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

/* One measurement line: statement on the left, quantitative range in a
   violet chip so the numbers stay scannable down the column. */
function TierItem({ item, className = '' }) {
  return (
    <li className={`flex items-start gap-3 break-inside-avoid ${className}`}>
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
      <span className="font-sans text-[13.5px] leading-relaxed text-gray-600">
        {item.t}
        {item.sup && <sup className="text-[0.7em] leading-none">{item.sup}</sup>}
        {item.v && (
          <span className="ml-2 inline-flex items-center rounded-full border border-purple-100 bg-purple-50/50 px-2 py-[3px] font-sans text-[11.5px] font-semibold tracking-[0.01em] text-[#7C3AED]">
            {item.v}
          </span>
        )}

        {item.sub && (
          <span className="mt-2.5 flex flex-wrap gap-2">
            {item.sub.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-full border border-purple-100 bg-white px-2.5 py-1 font-sans text-[11.5px] font-semibold tracking-[0.01em] text-[#7C3AED]"
              >
                {s}
              </span>
            ))}
          </span>
        )}
      </span>
    </li>
  );
}

function TierBlock({ tier }) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-[#F3EEFC] bg-[#FCFAFF] p-6 sm:p-7">
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#7C3AED] to-[#EC4899]"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] font-sans text-[12px] font-bold text-white shadow-[0_4px_12px_rgba(124,58,237,0.28)]">
          {tier.tier}
        </span>
        <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
          Tier {tier.tier}
        </span>
        <span className="h-1 w-1 rounded-full bg-gray-300" aria-hidden="true" />
        <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
          {tier.label}
        </span>
      </div>

      <ul
        className={`mt-5 space-y-3 ${tier.wide ? 'lg:columns-2 lg:gap-10 lg:space-y-0' : ''}`}
      >
        {tier.items.map((item) => (
          <TierItem key={item.t} item={item} className={tier.wide ? 'lg:mb-3' : ''} />
        ))}
      </ul>
    </div>
  );
}

/* ================================================================
   Page
================================================================ */

export default function IhcAnalysis() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);

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

  /* ---- GSAP: hero entrance + scroll reveals ---- */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cleanups = [];

      /* ---------- Hover micro-interactions (solution cards) ---------- */
      gsap.utils.toArray('[data-hover-card]').forEach((card) => {
        const glow = card.querySelector('.card-glow');
        const art = card.querySelector('.card-art');

        const enter = () => {
          gsap.to(card, { y: -8, duration: 0.4, ease: 'power3.out' });
          if (glow) gsap.to(glow, { opacity: 1, duration: 0.4, ease: 'power2.out' });
          if (art) gsap.to(art, { scale: 1.08, duration: 0.4, ease: 'power2.inOut' });
        };
        const leave = () => {
          gsap.to(card, { y: 0, duration: 0.4, ease: 'power3.out' });
          if (glow) gsap.to(glow, { opacity: 0, duration: 0.35, ease: 'power2.out' });
          if (art) gsap.to(art, { scale: 1, duration: 0.4, ease: 'power2.inOut' });
        };

        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          card.removeEventListener('mouseenter', enter);
          card.removeEventListener('mouseleave', leave);
        });
      });

      if (prefersReduced) {
        gsap.set('.hero-copy > *, [data-reveal], [data-reveal-group] > *', { autoAlpha: 1, y: 0 });
        gsap.set('.hero-video-layer, .hero-panel, .hero-node, .hero-marker', {
          autoAlpha: 1,
          scale: 1,
          y: 0,
        });
        gsap.set('.hero-dot', { autoAlpha: (i, t) => Number(t.dataset.o) || 1, scale: 1 });
        return () => cleanups.forEach((fn) => fn());
      }

      /* ---------- Hero entrance ----------
         Copy first, then the footage scales up from 0.96, then the AI
         elements and glass panels arrive in sequence. */
      const heroIn = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroIn
        .fromTo(
          '.hero-copy > *',
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.09 },
          0.25
        )
        .fromTo(
          '.hero-video-layer',
          { autoAlpha: 0, scale: 0.96, y: 28 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 1.3, ease: 'expo.out' },
          0.45
        )
        .fromTo(
          '.hero-node',
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.07 },
          0.95
        )
        .fromTo(
          '.hero-dot',
          { autoAlpha: 0, scale: 0.4 },
          {
            autoAlpha: (i, t) => Number(t.dataset.o) || 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.035,
          },
          1.0
        )
        .fromTo(
          '.hero-marker',
          { autoAlpha: 0, y: 10, scale: 0.9 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.09 },
          1.15
        )
        .fromTo(
          '.hero-panel',
          { autoAlpha: 0, y: 22, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.12 },
          1.25
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

      ScrollTrigger.refresh();

      return () => cleanups.forEach((fn) => fn());
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* ---- Hero: drifting light, floating elements, mouse + scroll parallax ----
     Kept in its own effect so the depth behaviour can be tuned per device
     through gsap.matchMedia without touching the page's other animations. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* ---------- Slow lighting drift (all devices) ---------- */
      const drift = { ease: 'sine.inOut', repeat: -1, yoyo: true };
      gsap.to('.hero-aurora-a', { xPercent: 9, yPercent: 7, scale: 1.09, duration: 9, ...drift });
      gsap.to('.hero-aurora-b', {
        xPercent: -8,
        yPercent: 10,
        scale: 1.07,
        duration: 11,
        ...drift,
      });
      gsap.to('.hero-aurora-c', { xPercent: 7, yPercent: -8, scale: 1.1, duration: 13, ...drift });

      /* ---------- Floating motion (all devices, starts after entrance) ---------- */
      const float = (selector, range, dur) =>
        gsap.utils.toArray(selector).forEach((el, i) => {
          gsap.to(el, {
            y: gsap.utils.random(-range, -range * 0.4),
            x: gsap.utils.random(-range * 0.5, range * 0.5),
            duration: gsap.utils.random(dur, dur * 1.6),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            /* Starts once the entrance timeline has finished writing `y`,
               so the two never fight over the same property. */
            delay: 2.6 + i * 0.12,
          });
        });

      float('.hero-node', 14, 3.6);
      float('.hero-dot', 10, 4);
      float('.hero-marker', 8, 4.4);
      float('.hero-panel', 7, 5);

      /* ---------- Depth: mouse parallax + tilt (fine pointers only) ---------- */
      mm.add(
        {
          desktop: '(hover: hover) and (pointer: fine) and (min-width: 1024px)',
          tablet: '(hover: hover) and (pointer: fine) and (min-width: 768px) and (max-width: 1023px)',
        },
        (context) => {
          const hero = heroRef.current;
          if (!hero) return undefined;

          /* Tablet moves at half the amplitude of desktop */
          const k = context.conditions.desktop ? 1 : 0.5;
          const to = (target, prop, duration = 0.9) =>
            gsap.quickTo(target, prop, { duration, ease: 'power3.out' });

          const vidX = to('.hero-video-layer', 'x');
          const vidY = to('.hero-video-layer', 'y');
          const vidRX = to('.hero-video-layer', 'rotationX', 1.1);
          const vidRY = to('.hero-video-layer', 'rotationY', 1.1);
          const fxX = to('.hero-fx', 'x', 1.1);
          const fxY = to('.hero-fx', 'y', 1.1);
          const bgX = to('.hero-bg', 'x', 1.4);
          const bgY = to('.hero-bg', 'y', 1.4);

          gsap.set('.hero-video-layer', { transformPerspective: 1300 });

          const onMove = (e) => {
            const r = hero.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;

            /* Video: ~8px of travel and a 4–5° tilt at the extremes */
            vidX(px * 16 * k);
            vidY(py * 12 * k);
            vidRY(px * 5 * k);
            vidRX(-py * 4 * k);

            /* Foreground drifts further, background the opposite way — the
               three speeds are what read as depth. */
            fxX(px * 30 * k);
            fxY(py * 24 * k);
            bgX(-px * 14 * k);
            bgY(-py * 10 * k);
          };

          const onLeave = () => {
            vidX(0);
            vidY(0);
            vidRX(0);
            vidRY(0);
            fxX(0);
            fxY(0);
            bgX(0);
            bgY(0);
          };

          hero.addEventListener('mousemove', onMove);
          hero.addEventListener('mouseleave', onLeave);

          return () => {
            hero.removeEventListener('mousemove', onMove);
            hero.removeEventListener('mouseleave', onLeave);
          };
        }
      );

      /* ---------- Depth: scroll parallax (tablet and up) ---------- */
      mm.add('(min-width: 768px)', () => {
        const scroll = (targets, yPercent) =>
          gsap.to(targets, {
            yPercent,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

        /* Each layer leaves at its own rate */
        scroll('.hero-bg', -12);
        scroll('.hero-copy', -7);
        scroll('.hero-video-layer', 9);
        scroll('.hero-fx', 16);
      });

      return () => mm.revert();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />

      <main ref={rootRef} className="relative w-full bg-white text-[#111827]">
        {/* ============================================================
            HERO
        ============================================================ */}
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-white"
          style={{ perspective: '1300px' }}
        >
          {/* ---------- Layer 1 (back) — drifting violet/pink lighting ---------- */}
          <div className="hero-bg pointer-events-none absolute inset-0" aria-hidden="true">
            <span
              className="hero-aurora-a absolute -left-[10%] -top-[18%] h-[62vh] w-[62vh] rounded-full blur-[110px]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.20), transparent 70%)',
              }}
            />
            <span
              className="hero-aurora-b absolute -right-[12%] top-[6%] h-[58vh] w-[58vh] rounded-full blur-[110px]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(236,72,153,0.18), transparent 70%)',
              }}
            />
            <span
              className="hero-aurora-c absolute -bottom-[24%] left-[26%] h-[54vh] w-[54vh] rounded-full blur-[120px]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.16), transparent 70%)',
              }}
            />

          </div>

          {/* Sits outside .hero-bg so the scroll parallax never drags the
              section's blend into the white below it. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
            style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), #FFFFFF)' }}
            aria-hidden="true"
          />

          <Lighting variant="a" />

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

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 pt-[122px] lg:px-10 lg:pb-28 lg:pt-[168px]">
            <div className="hero-copy mx-auto max-w-3xl text-center">
              <Eyebrow>IHC Analysis</Eyebrow>

              <h1 className="mt-7 font-serif text-[2.6rem] font-semibold leading-[1.07] tracking-[-0.015em] text-[#111827] sm:text-[3.4rem] lg:text-[4rem]">
                IHC{' '}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
                  Analysis
                </span>
              </h1>

              <span
                className="mx-auto mt-9 block h-px w-24 rounded-full bg-gradient-to-r from-transparent via-[#A855F7]/60 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* ---------- Stage: video (middle) + AI elements (front) ---------- */}
            <div
              className="hero-stage relative mx-auto mt-12 max-w-5xl lg:mt-14"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* -- Middle layer — the IHC footage, unchanged and unblurred -- */}
              <div className="hero-video-layer relative" style={{ transformStyle: 'preserve-3d' }}>
                <span
                  className="hero-glow pointer-events-none absolute -inset-5 rounded-[2.9rem] opacity-80 blur-[58px] sm:-inset-7"
                  style={{
                    backgroundImage:
                      'radial-gradient(58% 60% at 28% 18%, rgba(124,58,237,0.30), transparent 70%), radial-gradient(55% 58% at 76% 86%, rgba(236,72,153,0.24), transparent 72%)',
                  }}
                  aria-hidden="true"
                />

                <div className="relative overflow-hidden rounded-[2rem] border border-[#EEE9F9] bg-white shadow-[0_40px_90px_-45px_rgba(76,29,149,0.55)]">
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] bg-gradient-to-r from-transparent via-[#D946EF]/60 to-transparent"
                    aria-hidden="true"
                  />

                  <video
                    className="block aspect-video h-full w-full object-cover object-center"
                    src={ihcHeroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    controls={false}
                    disablePictureInPicture
                  />
                </div>
              </div>

              {/* -- Front layer — nodes, dots and markers -- */}
              <div
                className="hero-fx pointer-events-none absolute inset-[-8%]"
                style={{ transformStyle: 'preserve-3d' }}
                aria-hidden="true"
              >
                {HERO_DOTS.map((d, i) => (
                  <span
                    key={`dot-${i}`}
                    className="hero-dot absolute rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]"
                    data-o={d.o}
                    style={{ left: d.x, top: d.y, width: d.s, height: d.s }}
                  />
                ))}

                {HERO_NODES.map((n, i) => (
                  <span
                    key={`node-${i}`}
                    className="hero-node absolute flex items-center justify-center rounded-full"
                    style={{
                      left: n.x,
                      top: n.y,
                      width: n.s,
                      height: n.s,
                      backgroundColor: n.tone === 'pink' ? '#EC4899' : '#7C3AED',
                      boxShadow:
                        n.tone === 'pink'
                          ? '0 0 0 4px rgba(236,72,153,0.14), 0 0 18px 4px rgba(236,72,153,0.35)'
                          : '0 0 0 4px rgba(124,58,237,0.14), 0 0 18px 4px rgba(124,58,237,0.35)',
                    }}
                  />
                ))}

                {HERO_MARKERS.map((m) => (
                  <span
                    key={m.label}
                    className="hero-marker absolute inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7C3AED] shadow-[0_8px_22px_-12px_rgba(76,29,149,0.5)] backdrop-blur-md"
                    style={{ left: m.x, top: m.y }}
                  >
                    <span className="h-1 w-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
                    {m.label}
                  </span>
                ))}
              </div>

              {/* -- Front layer — glass information panels -- */}
              {HERO_PANELS.map((p) => (
                <div
                  key={p.label}
                  className={`hero-panel pointer-events-none absolute ${p.pos} ${p.show} items-center gap-2.5 rounded-2xl border border-white/70 bg-white/60 px-3.5 py-2.5 shadow-[0_18px_40px_-20px_rgba(76,29,149,0.5)] backdrop-blur-md backdrop-saturate-150`}
                  aria-hidden="true"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] shadow-[0_6px_16px_-6px_rgba(124,58,237,0.8)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-sans text-[11.5px] font-semibold tracking-[0.01em] text-[#111827]">
                      {p.label}
                    </span>
                    <span className="font-sans text-[10px] font-medium tracking-[0.06em] text-gray-500">
                      {p.meta}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            OMICMIND ONCOLOGY SOLUTIONS
            Sits directly under the hero — this heading now occupies the
            position the IHC introductory paragraph previously held.
        ============================================================ */}
        <section className="relative overflow-hidden border-t border-[#F1EDFB] bg-white py-20 lg:py-28">
          <Lighting variant="b" />

          <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <div data-reveal>
                <Eyebrow>Oncology Solutions</Eyebrow>
              </div>

              <h2
                data-reveal
                className="mt-6 font-serif text-[2.15rem] font-semibold leading-[1.12] tracking-[-0.012em] text-[#111827] sm:text-[2.75rem] lg:text-[3.1rem]"
              >
                OmicMind Oncology{' '}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
                  Solutions
                </span>
              </h2>

              <p
                data-reveal
                className="mx-auto mt-5 max-w-2xl font-sans text-[15.5px] leading-relaxed text-gray-600 sm:text-base"
              >
                AI-powered pathology solutions designed for comprehensive cancer analysis across
                multiple disease areas.
              </p>
            </div>

            {/* ---- Card grid + its background video ----
                The wrapper carries the grid's old top margin and is sized by the
                grid alone, so the video's box starts at the top edge of the first
                card row and ends at the bottom edge of the last one — at every
                breakpoint, however many columns the grid resolves to. */}
            <div className="relative mt-14 overflow-hidden rounded-[2rem] lg:mt-16">
              <video
                className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
                src={ihcVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
                aria-hidden="true"
              />

              <div
                data-reveal-group
                className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-7"
              >
              {SOLUTIONS.map((s) => (
                <article
                  key={s.name}
                  data-hover-card
                  style={{
                    '--tint': s.tint,
                    '--tint-line': s.line,
                    '--tint-line-hover': s.lineHover,
                  }}
                  className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-[color:var(--tint-line)] bg-[image:var(--tint)] p-7 shadow-[0_1px_2px_rgba(17,24,39,0.03)] transition-[box-shadow,border-color] duration-[350ms] ease-out hover:border-[color:var(--tint-line-hover)] hover:shadow-[0_22px_48px_-24px_rgba(124,58,237,0.45)]"
                >
                  <span
                    className="card-glow pointer-events-none absolute inset-0 z-0 opacity-0"
                    style={{ backgroundImage: s.glow }}
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute inset-x-8 top-0 z-10 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#D946EF]/45 to-transparent opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-100 bg-gradient-to-br from-[#FCFAFF] to-[#FDF6FB] shadow-[0_6px_18px_rgba(124,58,237,0.10)]">
                    <OmioIcon name={s.icon} uid="-sol" className="card-art h-7 w-7" />
                  </span>

                  <h3 className="relative z-10 mt-6 font-serif text-[1.25rem] font-semibold leading-snug tracking-[-0.005em] text-[#111827]">
                    {s.name}
                  </h3>

                  {s.pack && (
                    <p className="relative z-10 mt-2 font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
                      {s.pack}
                    </p>
                  )}

                  <p className="relative z-10 mt-3 font-sans text-[13.5px] leading-relaxed text-gray-600">
                    {s.body}
                  </p>

                  <span className="relative z-10 mt-6 inline-flex items-center gap-1.5 font-sans text-[12.5px] font-semibold uppercase tracking-[0.12em] text-gray-400 transition-colors duration-[350ms] group-hover:text-[#7C3AED]">
                    Explore
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-[350ms] ease-out group-hover:translate-x-1"
                      strokeWidth={2.25}
                    />
                  </span>

                  <span
                    className="pointer-events-none absolute bottom-0 left-7 right-7 z-10 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] transition-transform duration-[400ms] ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </article>
              ))}
              </div>
            </div>

            {/* ---- Pack detail — Omio Breast™ and Omio Colorectal™ ---- */}
            <div className="mt-12 space-y-8 lg:mt-14 lg:space-y-10">
              {PACKS.map((p) => (
                <article
                  key={p.id}
                  id={p.id}
                  data-reveal
                  className="relative scroll-mt-24 overflow-hidden rounded-[2rem] border border-[#EEE9F9] bg-white p-7 shadow-[0_24px_70px_-46px_rgba(76,29,149,0.45)] sm:p-10 lg:p-12"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#D946EF]/60 to-transparent"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-70 blur-[70px]"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, rgba(124,58,237,0.16), transparent 70%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Header */}
                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-purple-100 bg-gradient-to-br from-[#FCFAFF] to-[#FDF6FB] shadow-[0_6px_18px_rgba(124,58,237,0.10)]">
                      <OmioIcon name={p.icon} uid="-pack" className="h-8 w-8" />
                    </span>

                    <div className="flex-1">
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">
                        {p.product}
                      </p>
                      <h3 className="mt-2.5 font-serif text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.01em] text-[#111827] sm:text-[2.1rem]">
                        {p.pack}
                      </h3>

                      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                        <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                          Focus
                        </span>
                        <p className="max-w-3xl font-sans text-[15px] leading-relaxed text-gray-600 sm:text-base">
                          {p.focus}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tiers */}
                  <div className="relative mt-9 space-y-6 lg:mt-10">
                    <TierBlock tier={p.tiers[0]} />

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      <TierBlock tier={p.tiers[1]} />
                      <TierBlock tier={p.tiers[2]} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
