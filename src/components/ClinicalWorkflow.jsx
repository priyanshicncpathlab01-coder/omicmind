import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const icons = {
  // Digital pathology slide / tissue morphology
  histopathology: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <rect x="3" y="3.5" width="18" height="17" rx="2.5" />
      <path d="M3 8.2h18" />
      <circle cx="8.4" cy="12.8" r="2.3" />
      <circle cx="14.8" cy="11.9" r="1.7" />
      <circle cx="11.6" cy="17" r="1.9" />
      <circle cx="17.6" cy="16.4" r="1.3" />
      <circle cx="8.4" cy="12.8" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="11.6" cy="17" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  // IHC staining with quantitative biomarker heatmap
  ihc: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M9 3.5v17M15 3.5v17M3.5 9h17M3.5 15h17" opacity="0.55" />
      <rect x="9" y="9" width="6" height="6" fill="currentColor" stroke="none" opacity="0.85" />
      <rect x="15" y="3" width="5.5" height="6" fill="currentColor" stroke="none" opacity="0.35" />
      <rect x="3.5" y="15" width="5.5" height="5.5" fill="currentColor" stroke="none" opacity="0.5" />
    </svg>
  ),
  // Fragmented DNA / molecular signal
  molecular: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <path d="M8 2.8c0 4.6 8 4.6 8 9.2s-8 4.6-8 9.2" />
      <path d="M16 2.8c0 4.6-8 4.6-8 9.2s8 4.6 8 9.2" />
      <path d="M9.4 6.1h5.2M8.3 9.5h2.9M13.1 9.5h2.6M8.3 14.5h2.4M13.6 14.5h2.1M9.4 17.9h5.2" />
    </svg>
  ),
  // Spatial profiling map / tumor microenvironment
  spatial: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
      <path d="M3.5 6.5l5.5-2.2 6 2.2 5.5-2.2v13.2l-5.5 2.2-6-2.2-5.5 2.2z" />
      <path d="M9 4.3v15.4M15 6.5v15.4" opacity="0.7" />
      <circle cx="6.2" cy="10" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13.2" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="17.8" cy="9.2" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const features = [
  {
    number: '01',
    title: 'Histopathology',
    desc: 'Analyze tissue architecture and cellular morphology to identify disease patterns and support accurate diagnosis.',
    icon: icons.histopathology,
    accent: '#7C3AED',
    tint: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.08))',
  },
  {
    number: '02',
    title: 'IHC Discrepancies',
    desc: 'Resolve inconsistencies in immunohistochemistry interpretation with AI-powered quantitative analysis and standardized biomarker assessment.',
    icon: icons.ihc,
    accent: '#8B5CF6',
    tint: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(217,70,239,0.08))',
  },
  {
    number: '03',
    title: 'Molecular Fragmentation',
    desc: 'Integrate fragmented molecular signals with pathology insights to uncover deeper biological characteristics of tumors.',
    icon: icons.molecular,
    accent: '#D946EF',
    tint: 'linear-gradient(135deg, rgba(217,70,239,0.12), rgba(236,72,153,0.08))',
  },
  {
    number: '04',
    title: 'Spatial Context',
    desc: 'Understand the tumor microenvironment by mapping cells, biomarkers, and molecular interactions within their native tissue location.',
    icon: icons.spatial,
    accent: '#EC4899',
    tint: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(244,114,182,0.08))',
  },
];

function FeatureCard({ feature }) {
  return (
    <li className="workflow-item relative h-full">
      <article className="workflow-card group relative h-full rounded-[22px]">
        {/* Soft purple/pink glow revealed on hover */}
        <div
          className="pointer-events-none absolute -inset-[3px] rounded-[24px] opacity-0 blur-[10px] transition-opacity duration-[350ms] ease-out group-hover:opacity-100"
          style={{ backgroundImage: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(236,72,153,0.35))' }}
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col rounded-[22px] border border-gray-200 bg-white p-7 shadow-[0_2px_12px_rgba(17,24,39,0.05)] transition-all duration-[350ms] ease-out group-hover:-translate-y-1.5 group-hover:border-purple-200 group-hover:shadow-[0_22px_48px_-16px_rgba(124,58,237,0.28)] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="workflow-icon-float w-fit">
              <div
                className="workflow-icon flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-[350ms] ease-out group-hover:scale-110"
                style={{
                  backgroundImage: feature.tint,
                  color: feature.accent,
                  borderColor: `${feature.accent}26`,
                }}
              >
                {feature.icon}
              </div>
            </div>

            <span
              className="font-sans text-xs font-semibold tracking-[0.22em]"
              style={{ color: `${feature.accent}66` }}
            >
              {feature.number}
            </span>
          </div>

          <h3 className="mt-7 font-serif text-[1.6rem] font-semibold leading-tight tracking-[-0.01em] text-[#111827]">
            {feature.title}
          </h3>

          <p className="mt-3 font-sans text-[15px] leading-relaxed text-gray-600">
            {feature.desc}
          </p>
        </div>
      </article>
    </li>
  );
}

export default function ClinicalWorkflow() {
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

      // Card fade-up with stagger
      gsap.from('.workflow-item', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      });

      // Gentle floating icons
      gsap.to('.workflow-icon-float', {
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
      className="relative w-full rounded-t-[3rem] bg-white py-24 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-semibold leading-[1.12] tracking-[-0.01em] text-[#111827] sm:text-5xl lg:text-[3.5rem]">
            Modern Oncology Requires{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
              Morphology
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-gray-600 sm:text-lg">
            Advanced cancer diagnosis requires integration of tissue morphology,
            molecular insights, and spatial context to deliver precise and
            comprehensive patient understanding.
          </p>
        </div>

        <ol
          ref={gridRef}
          className="relative mt-20 grid list-none grid-cols-1 gap-y-10 p-0 md:mt-24 md:grid-cols-2 md:gap-x-12 md:gap-y-14"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </ol>
      </div>
    </section>
  );
}
