import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* Brand glyphs — this lucide build ships no brand icons, so the marks are
   inline paths (Simple Icons geometry, CC0) drawn on a 24x24 grid. */
const socials = [
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.02 8h4.96v16H.02V8zm7.98 0h4.76v2.19h.07c.66-1.25 2.28-2.57 4.69-2.57 5.02 0 5.95 3.3 5.95 7.6V24h-4.96v-7.53c0-1.8-.03-4.11-2.5-4.11-2.51 0-2.89 1.96-2.89 3.98V24H8V8z',
  },
  {
    label: 'X',
    href: '#',
    path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z',
  },
  {
    label: 'GitHub',
    href: '#',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

const columns = [
  {
    title: 'Platform',
    links: [
      'AI Foundation Model',
      'Digital Pathology',
      'Whole Slide Image Analysis',
      'Biomarker Quantification',
      'Clinical Reporting',
      'Spatial Biology',
    ],
  },
  {
    title: 'Solutions',
    links: [
      'OmicMind Breast™',
      'Clinical AI',
      'Biomarker Discovery',
      'Drug Discovery AI',
      'Precision Oncology',
      'Research & Translational Medicine',
    ],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Publications', 'White Papers', 'Blog', 'Case Studies', 'FAQs'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Partners', 'Contact', 'Privacy Policy', 'Terms of Service'],
  },
];

const legal = ['Privacy Policy', 'Terms', 'Cookies'];

const noop = (e) => e.preventDefault();

/* Link with a gradient underline that wipes in from the left.
   Kept as a CSS transition rather than GSAP: there are 27 of these, and
   binding two listeners each would cost far more than the compositor
   already gives us for free.

   Size and colour are supplied by the caller, never defaulted here —
   Tailwind resolves competing utilities by CSS source order, not by class
   order, so a base `text-[14.5px]` would silently beat a caller's
   `text-[13.5px]`. One font-size class per element, always. */
function FooterLink({ children, className }) {
  return (
    <a
      href="#"
      onClick={noop}
      className={`group/link relative inline-block font-sans leading-snug transition-colors duration-300 hover:text-[#7C3AED] ${className}`}
    >
      {children}
      <span
        className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] transition-transform duration-300 ease-out group-hover/link:scale-x-100"
        aria-hidden="true"
      />
    </a>
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const ctaRef = useRef(null);
  const colsRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      /* ---- CTA button + social icon hover ---- */
      const cleanups = [];

      gsap.utils.toArray('.footer-cta-btn').forEach((btn) => {
        const glow = btn.parentElement.querySelector('.footer-cta-glow');
        const arrow = btn.querySelector('.footer-cta-arrow');

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

      gsap.utils.toArray('.footer-social').forEach((el) => {
        const enter = () =>
          gsap.to(el, { y: -4, scale: 1.1, duration: 0.38, ease: 'power3.out' });
        const leave = () => gsap.to(el, { y: 0, scale: 1, duration: 0.42, ease: 'power3.out' });
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          el.removeEventListener('mouseenter', enter);
          el.removeEventListener('mouseleave', leave);
        });
      });

      /* ---- Entrance ---- */
      if (!prefersReducedMotion) {
        gsap.from(ctaRef.current.children, {
          y: 44,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' },
        });

        gsap.from(colsRef.current.children, {
          y: 44,
          opacity: 0,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: colsRef.current, start: 'top 92%' },
        });

        gsap.from(bottomRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: bottomRef.current, start: 'top 98%' },
        });
      }

      return () => cleanups.forEach((fn) => fn());
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full bg-white">
      {/* ============ Top CTA ============ */}
      <div className="relative overflow-hidden bg-white">
        {/* Hairline accent separating the CTA from the section above */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(17,24,39,0) 0%, rgba(124,58,237,0.16) 30%, rgba(236,72,153,0.16) 70%, rgba(17,24,39,0) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Subtle gradient lighting, background stays predominantly white */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(58% 62% at 50% 8%, rgba(124,58,237,0.09) 0%, rgba(255,255,255,0) 68%), radial-gradient(44% 50% at 14% 92%, rgba(236,72,153,0.06) 0%, rgba(255,255,255,0) 70%), radial-gradient(44% 50% at 86% 88%, rgba(168,85,247,0.06) 0%, rgba(255,255,255,0) 70%)',
          }}
          aria-hidden="true"
        />

        <div
          ref={ctaRef}
          className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center lg:py-24"
        >
          <h2 className="font-serif text-4xl font-semibold leading-[1.12] tracking-[-0.01em] text-[#111827] sm:text-5xl lg:text-[3.4rem]">
            Transform Digital Pathology with{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
              AI.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl font-sans text-base leading-relaxed text-gray-600 sm:text-lg">
            Discover how OmicMind.ai empowers pathologists, researchers, and healthcare
            organizations with multimodal AI, computational pathology, and precision oncology
            solutions.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary */}
            <div className="relative inline-flex w-full sm:w-auto">
              <span
                className="footer-cta-glow pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] blur-[16px]"
                aria-hidden="true"
              />
              <button
                type="button"
                className="footer-cta-btn relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] px-7 py-3.5 font-sans text-[15px] font-semibold tracking-[0.01em] text-white shadow-[0_8px_26px_rgba(124,58,237,0.34)] outline-none ring-1 ring-inset ring-white/25 sm:w-auto"
              >
                Request a Demo
                <ArrowRight className="footer-cta-arrow h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>

            {/* Secondary */}
            <div className="relative inline-flex w-full sm:w-auto">
              <button
                type="button"
                className="footer-cta-btn relative inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-7 py-3.5 font-sans text-[15px] font-semibold tracking-[0.01em] text-[#111827] outline-none transition-colors duration-300 hover:border-purple-300 hover:text-[#7C3AED] sm:w-auto"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============ Main footer ============ */}
      <div className="border-t border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div
            ref={colsRef}
            className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[1.7fr_1fr_1fr_1fr_1fr] lg:gap-10"
          >
            {/* ---- Column 1: brand ---- */}
            <div className="lg:pr-8">
              <a
                href="#"
                onClick={noop}
                className="group/logo inline-flex items-baseline"
                aria-label="OmicMind.ai home"
              >
                <span className="font-serif text-[1.6rem] font-semibold leading-none tracking-[-0.015em] text-[#111827] transition-colors duration-300 group-hover/logo:text-[#7C3AED]">
                  OmicMind
                </span>
                <span className="font-serif text-[1.6rem] font-semibold leading-none tracking-[-0.015em] text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#D946EF] to-[#EC4899]">
                  .ai
                </span>
              </a>

              <p className="mt-5 font-sans text-[14.5px] font-medium leading-relaxed text-[#1F2937]">
                AI-Powered Computational Pathology &amp; Precision Oncology.
              </p>

              <p className="mt-3 font-sans text-[14px] leading-relaxed text-gray-500">
                Building the next generation of multimodal AI foundation models for digital
                pathology, biomarker analysis, spatial biology, and molecular prediction.
              </p>

              <ul className="mt-7 flex list-none justify-center gap-3 p-0 sm:justify-start">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      onClick={noop}
                      aria-label={s.label}
                      className="footer-social group/soc relative flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-gray-500 transition-colors duration-300 hover:border-purple-200 hover:text-[#7C3AED]"
                    >
                      {/* Soft hover glow */}
                      <span
                        className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-[8px] transition-opacity duration-300 group-hover/soc:opacity-100"
                        style={{
                          backgroundImage:
                            'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.3))',
                        }}
                        aria-hidden="true"
                      />
                      <svg
                        viewBox="0 0 24 24"
                        className="relative h-[17px] w-[17px]"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d={s.path} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---- Columns 2-5: links ---- */}
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="font-serif text-[1.05rem] font-semibold tracking-[-0.005em] text-[#111827]">
                  {col.title}
                </h3>
                <span
                  className="mt-3 block h-[2px] w-8 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] mx-auto sm:mx-0"
                  aria-hidden="true"
                />
                <ul className="mt-5 list-none space-y-3.5 p-0">
                  {col.links.map((link) => (
                    <li key={link}>
                      <FooterLink className="text-[14.5px] text-gray-600">{link}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* ============ Bottom bar ============ */}
          <div
            ref={bottomRef}
            className="mt-16 flex flex-col items-center gap-4 border-t border-[#E5E7EB] pt-8 text-center lg:mt-20 lg:flex-row lg:justify-between lg:gap-6 lg:text-left"
          >
            <p className="font-sans text-[13.5px] text-gray-500">
              &copy; 2026 OmicMind.ai. All rights reserved.
            </p>

            <p className="font-sans text-[13.5px] text-gray-400">
              Made for Precision Oncology &amp; Digital Pathology.
            </p>

            <ul className="flex list-none items-center gap-3 p-0">
              {legal.map((item, i) => (
                <React.Fragment key={item}>
                  <li>
                    <FooterLink className="text-[13.5px] text-gray-500">{item}</FooterLink>
                  </li>
                  {i < legal.length - 1 && (
                    <li aria-hidden="true" className="text-gray-300">
                      |
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
