import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Horizontal reach of a desktop spoke: grid gutter (48px) + half the hub column (340px / 2).
// Kept in JS so the connector width and the travelling pulse can never drift apart.
const SPOKE_W = 218;

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const hubIcon = (
  <svg viewBox="0 0 24 24" className="h-11 w-11" {...stroke}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="3.6" r="1.6" />
    <circle cx="20.4" cy="7.8" r="1.6" />
    <circle cx="20.4" cy="16.2" r="1.6" />
    <circle cx="12" cy="20.4" r="1.6" />
    <circle cx="3.6" cy="16.2" r="1.6" />
    <circle cx="3.6" cy="7.8" r="1.6" />
    <path d="M12 5.2v3.8M14.7 10.7l4.2-2.1M14.7 13.3l4.2 2.1M12 15v3.8M9.3 13.3l-4.2 2.1M9.3 10.7L5.1 8.6" />
  </svg>
);

const icons = {
  // Whole-slide pathology image
  histopathology: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <rect x="3" y="3.5" width="18" height="17" rx="2.5" />
      <path d="M3 8.2h18" />
      <circle cx="8.4" cy="12.8" r="2.3" />
      <circle cx="14.8" cy="11.9" r="1.7" />
      <circle cx="11.6" cy="17" r="1.9" />
      <circle cx="17.6" cy="16.4" r="1.3" />
      <circle cx="8.4" cy="12.8" r="0.55" fill="currentColor" stroke="none" />
    </svg>
  ),
  // IHC stained tissue with AI overlay
  ihc: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <rect x="3" y="3.5" width="18" height="17" rx="2.5" />
      <path d="M9 4v16M15 4v16M3.5 9.5h17M3.5 15h17" opacity="0.4" />
      <rect x="9" y="9.5" width="6" height="5.5" fill="currentColor" stroke="none" opacity="0.75" />
      <path
        d="M17.9 4.6l.62 1.68 1.68.62-1.68.62-.62 1.68-.62-1.68-1.68-.62 1.68-.62z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
  // DNA helix with sequencing read-out
  genomics: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <path d="M7.4 2.9c0 4.3 6.4 4.5 6.4 9.1s-6.4 4.7-6.4 9.1" />
      <path d="M13.8 2.9c0 4.3-6.4 4.5-6.4 9.1s6.4 4.7 6.4 9.1" />
      <path d="M8.6 6h4M7.8 9.4h5.6M7.8 14.6h5.6M8.6 18h4" />
      <path d="M17.4 19v-2.6M19.2 19v-5.4M21 19v-3.4" />
    </svg>
  ),
  // Clustered RNA expression heatmap
  transcriptomics: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <path d="M6.5 2.8v1.4h11V2.8M12 4.2v1.4" opacity="0.65" />
      <rect x="3" y="6" width="18" height="14" rx="2.2" />
      <path d="M9 6.5v13M15 6.5v13M3.5 10.6h17M3.5 15.2h17" opacity="0.4" />
      <rect x="3.5" y="6.5" width="5.5" height="4.1" fill="currentColor" stroke="none" opacity="0.75" />
      <rect x="9" y="10.6" width="6" height="4.6" fill="currentColor" stroke="none" opacity="0.4" />
      <rect x="15" y="15.2" width="5.5" height="4.3" fill="currentColor" stroke="none" opacity="0.6" />
    </svg>
  ),
  // Spatial cellular interaction network
  spatial: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <path d="M2.8 5.6c5-2 13.4-2 18.4 0v12.8c-5 2-13.4 2-18.4 0z" opacity="0.4" />
      <circle cx="6.4" cy="8.2" r="1.5" />
      <circle cx="17.2" cy="7.8" r="1.3" />
      <circle cx="12" cy="12.2" r="1.9" />
      <circle cx="6.8" cy="16.4" r="1.3" />
      <circle cx="17.6" cy="16" r="1.5" />
      <path d="M7.7 9.4l2.6 1.7M13.6 11.2l2.4-2.2M10.6 13.5l-2.6 2M13.7 13.4l2.6 1.7" />
    </svg>
  ),
  // Clinical dashboard with predictive analytics
  outcomes: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <rect x="2.5" y="3.5" width="19" height="17" rx="2.5" />
      <path d="M2.5 8h19" />
      <circle cx="5.5" cy="5.75" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="7.7" cy="5.75" r="0.55" fill="currentColor" stroke="none" />
      <path d="M5.8 16.8l3.6-3.4 3 1.9 5.6-4.8" />
      <path d="M15.4 10.5H18v2.6" />
    </svg>
  ),
};

// Explicit desktop grid placement — written as full literal class strings so Tailwind's
// scanner picks them up. Left column feeds the hub from the right, right column from the left.
const applications = [
  {
    number: '01',
    title: 'Histopathology',
    desc: 'Analyze tissue architecture and cellular morphology for accurate disease detection and classification.',
    icon: icons.histopathology,
    accent: '#7C3AED',
    tint: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.08))',
    side: 'left',
    placement: 'lg:col-start-1 lg:row-start-1',
  },
  {
    number: '02',
    title: 'IHC',
    desc: 'Quantitative biomarker interpretation with reproducible AI-assisted scoring for ER, PR, HER2, Ki-67 and additional markers.',
    icon: icons.ihc,
    accent: '#8B5CF6',
    tint: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(168,85,247,0.08))',
    side: 'left',
    placement: 'lg:col-start-1 lg:row-start-2',
  },
  {
    number: '03',
    title: 'Genomics',
    desc: 'Combine genomic information with digital pathology to uncover clinically meaningful molecular insights.',
    icon: icons.genomics,
    accent: '#A855F7',
    tint: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(217,70,239,0.08))',
    side: 'left',
    placement: 'lg:col-start-1 lg:row-start-3',
  },
  {
    number: '04',
    title: 'Transcriptomics',
    desc: 'Integrate gene expression signatures with tissue morphology for deeper biological understanding.',
    icon: icons.transcriptomics,
    accent: '#D946EF',
    tint: 'linear-gradient(135deg, rgba(217,70,239,0.12), rgba(236,72,153,0.08))',
    side: 'right',
    placement: 'lg:col-start-3 lg:row-start-1',
  },
  {
    number: '05',
    title: 'Spatial Biology',
    desc: 'Map cell-to-cell interactions and tissue architecture to reveal the tumour microenvironment.',
    icon: icons.spatial,
    accent: '#EC4899',
    tint: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(244,114,182,0.08))',
    side: 'right',
    placement: 'lg:col-start-3 lg:row-start-2',
  },
  {
    number: '06',
    title: 'Outcomes',
    desc: 'Generate explainable clinical predictions, therapeutic insights, and unified decision-support reports.',
    icon: icons.outcomes,
    accent: '#7C3AED',
    tint: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.08))',
    side: 'right',
    placement: 'lg:col-start-3 lg:row-start-3',
  },
];

const spokeGradient = {
  left: 'linear-gradient(270deg, rgba(124,58,237,0.75) 0%, rgba(217,70,239,0.5) 55%, rgba(236,72,153,0.18) 100%)',
  right: 'linear-gradient(90deg, rgba(124,58,237,0.75) 0%, rgba(217,70,239,0.5) 55%, rgba(236,72,153,0.18) 100%)',
};

function ApplicationCard({ app }) {
  const isLeft = app.side === 'left';

  return (
    <li className={`app-item group relative lg:py-6 ${app.placement}`}>
      {/* Tablet / mobile chain connector sitting in the row gap above the card */}
      <span
        className="app-chain absolute -top-10 left-1/2 h-10 w-[2px] -translate-x-1/2 rounded-full md:-top-14 md:h-14 lg:hidden"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(124,58,237,0.7) 0%, rgba(217,70,239,0.45) 60%, rgba(236,72,153,0.15) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Desktop spoke running from the card edge to the hub */}
      <span
        className={`app-spoke absolute top-1/2 hidden h-[2px] -translate-y-1/2 rounded-full transition-opacity duration-[350ms] lg:block ${
          isLeft ? 'left-full origin-right' : 'right-full origin-left'
        }`}
        style={{ width: SPOKE_W, backgroundImage: spokeGradient[app.side] }}
        data-side={app.side}
        aria-hidden="true"
      >
        {/* Glowing data node where the spoke meets the card */}
        <span
          className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full transition-all duration-[350ms] group-hover:scale-150 ${
            isLeft ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'
          }`}
          style={{
            backgroundColor: app.accent,
            boxShadow: `0 0 10px ${app.accent}80`,
          }}
        />
        {/* Pulse travelling out from the hub — centred via margins so GSAP owns the transform */}
        <span
          className="app-pulse absolute top-1/2 h-[7px] w-[7px] rounded-full opacity-0"
          style={{
            left: 0,
            marginTop: -3.5,
            marginLeft: -3.5,
            backgroundColor: '#ffffff',
            boxShadow: `0 0 10px 2px ${app.accent}`,
          }}
        />
      </span>

      {/* Hover illumination overlay for the spoke */}
      <span
        className={`app-spoke-glow pointer-events-none absolute top-1/2 hidden h-[3px] -translate-y-1/2 rounded-full opacity-0 blur-[2px] transition-opacity duration-[350ms] group-hover:opacity-100 lg:block ${
          isLeft ? 'left-full' : 'right-full'
        }`}
        style={{ width: SPOKE_W, backgroundImage: spokeGradient[app.side] }}
        aria-hidden="true"
      />

      <article className="relative h-full rounded-[24px]">
        {/* Purple/pink gradient border glow on hover */}
        <div
          className="pointer-events-none absolute -inset-[3px] rounded-[26px] opacity-0 blur-[10px] transition-opacity duration-[350ms] ease-out group-hover:opacity-100"
          style={{ backgroundImage: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(236,72,153,0.35))' }}
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col rounded-[24px] border border-gray-200 bg-white p-6 shadow-[0_2px_12px_rgba(17,24,39,0.05)] transition-all duration-[350ms] ease-out group-hover:-translate-y-1.5 group-hover:border-purple-200 group-hover:shadow-[0_22px_48px_-16px_rgba(124,58,237,0.28)] sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="app-icon-float w-fit">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-[350ms] ease-out group-hover:scale-110"
                style={{
                  backgroundImage: app.tint,
                  color: app.accent,
                  borderColor: `${app.accent}26`,
                }}
              >
                {app.icon}
              </div>
            </div>

            <span
              className="font-sans text-xs font-semibold tracking-[0.22em]"
              style={{ color: `${app.accent}66` }}
            >
              {app.number}
            </span>
          </div>

          <h3 className="mt-6 font-serif text-[1.45rem] font-semibold leading-tight tracking-[-0.01em] text-[#111827]">
            {app.title}
          </h3>

          <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-gray-600">
            {app.desc}
          </p>
        </div>
      </article>
    </li>
  );
}

export default function FoundationModel() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Header fade-up
      gsap.from(headerRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
      });

      // Hub reveal
      gsap.from('.hub-cell', {
        scale: 0.88,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      });

      // Application cards fade-up, staggered
      gsap.from('.app-item', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      });

      // Connector lines draw outward from the hub
      gsap.from('.app-spoke', {
        scaleX: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.4,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      });

      gsap.from('.app-chain, .hub-spine', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      });

      // Continuous pulses flowing from the hub out to each application
      gsap.utils.toArray('.app-spoke').forEach((spoke, i) => {
        const pulse = spoke.querySelector('.app-pulse');
        if (!pulse) return;

        const fromX = spoke.dataset.side === 'left' ? SPOKE_W : 0;
        const toX = spoke.dataset.side === 'left' ? 0 : SPOKE_W;

        gsap
          .timeline({ repeat: -1, repeatDelay: 0.9, delay: i * 0.32 })
          .set(pulse, { x: fromX, opacity: 0 })
          .to(pulse, { opacity: 1, duration: 0.3 }, 0)
          .to(pulse, { x: toX, duration: 1.9, ease: 'none' }, 0)
          .to(pulse, { opacity: 0, duration: 0.35 }, 1.55);
      });

      // Floating hub
      gsap.to('.hub-node', {
        y: -12,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Gently rotating glow around the hub
      gsap.to('.hub-glow', {
        rotation: 360,
        duration: 24,
        ease: 'none',
        repeat: -1,
      });

      // Subtle floating card icons
      gsap.to('.app-icon-float', {
        y: -7,
        duration: 2.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white pb-24 pt-10 lg:pb-32 lg:pt-16"
    >
      {/* Very subtle radial brand glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(60% 45% at 50% 55%, rgba(124,58,237,0.06) 0%, rgba(236,72,153,0.04) 45%, rgba(255,255,255,0) 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-semibold leading-[1.12] tracking-[-0.01em] text-[#111827] sm:text-5xl lg:text-[3.5rem]">
            <span className="block">One AI Foundation Model.</span>
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
              Multiple Clinical Applications.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl font-sans text-lg font-normal leading-[1.65] tracking-[-0.005em] text-[#1F2937] sm:text-xl">
            Our Foundation Model uses{' '}
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A855F7]">
              cross-modal attention mechanisms
            </span>{' '}
            to reconstruct missing biological layers, allowing us to predict{' '}
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A855F7]">
              molecular phenotypes
            </span>{' '}
            from simple{' '}
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#A855F7]">
              tissue scans
            </span>
            .
          </p>

          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-gray-600 sm:text-lg">
            A unified multimodal AI foundation model that understands pathology images,
            molecular data, and spatial biology to power multiple clinical applications
            from a single intelligent platform.
          </p>
        </div>

        <ol
          ref={gridRef}
          className="relative mt-20 grid list-none grid-cols-1 gap-y-10 p-0 md:mt-24 md:grid-cols-2 md:gap-x-12 md:gap-y-14 lg:grid-cols-[1fr_340px_1fr] lg:grid-rows-3 lg:gap-x-12 lg:gap-y-0"
        >
          {/* Central AI Foundation Model hub */}
          <li className="hub-cell relative flex flex-col items-center justify-center md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:row-span-3">
            {/* Vertical spine linking the top and bottom spokes into the hub */}
            <span
              className="hub-spine absolute left-1/2 top-[16.667%] bottom-[16.667%] hidden w-[2px] -translate-x-1/2 rounded-full lg:block"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(236,72,153,0.2) 0%, rgba(217,70,239,0.6) 50%, rgba(236,72,153,0.2) 100%)',
              }}
              aria-hidden="true"
            />

            <div className="relative">
              <div className="hub-node relative flex h-[260px] w-[260px] items-center justify-center rounded-full">
                {/* Rotating gradient glow */}
                <div
                  className="hub-glow pointer-events-none absolute -inset-7 rounded-full opacity-70 blur-2xl"
                  style={{
                    backgroundImage:
                      'conic-gradient(from 0deg, rgba(124,58,237,0.5), rgba(217,70,239,0.45), rgba(236,72,153,0.5), rgba(168,85,247,0.45), rgba(124,58,237,0.5))',
                  }}
                  aria-hidden="true"
                />

                {/* Purple → pink gradient ring with a glass interior */}
                <div
                  className="absolute inset-0 rounded-full p-[2px] shadow-[0_18px_50px_-18px_rgba(124,58,237,0.5)]"
                  style={{ backgroundImage: 'linear-gradient(135deg, #7C3AED, #D946EF, #EC4899)' }}
                >
                  <div className="h-full w-full rounded-full bg-white/90 backdrop-blur-xl" />
                </div>

                <div className="relative z-10 flex flex-col items-center px-9 text-center">
                  <div
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-2xl border"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, rgba(124,58,237,0.14), rgba(236,72,153,0.10))',
                      color: '#7C3AED',
                      borderColor: 'rgba(124,58,237,0.18)',
                    }}
                  >
                    {hubIcon}
                  </div>

                  <h3 className="mt-4 font-serif text-[1.55rem] font-semibold leading-tight tracking-[-0.01em] text-[#111827]">
                    AI Foundation Model
                  </h3>
                </div>
              </div>

              {/* Description sits below the circle without shifting it off the spoke axis */}
              <p className="mx-auto mt-7 max-w-md text-center font-sans text-[14.5px] leading-relaxed text-gray-600 lg:absolute lg:left-1/2 lg:top-full lg:mt-8 lg:w-[340px] lg:max-w-none lg:-translate-x-1/2">
                A multimodal AI engine that integrates morphology, biomarker expression,
                molecular information, spatial context, and clinical knowledge to generate
                unified diagnostic intelligence.
              </p>
            </div>
          </li>

          {applications.map((app) => (
            <ApplicationCard key={app.title} app={app} />
          ))}
        </ol>
      </div>
    </section>
  );
}
