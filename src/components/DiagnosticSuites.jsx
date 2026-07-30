import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

function SuiteIllustration({ from, to, children }) {
  return (
    <div
      className="relative h-full w-full"
      style={{
        backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-30 mix-blend-screen"
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g fill="none" stroke="#ffffff" strokeWidth="1.2">
          <circle cx="70" cy="60" r="26" />
          <circle cx="150" cy="120" r="40" />
          <circle cx="300" cy="70" r="34" />
          <circle cx="330" cy="180" r="22" />
          <circle cx="90" cy="200" r="30" />
          <line x1="70" y1="60" x2="150" y2="120" />
          <line x1="150" y1="120" x2="300" y2="70" />
          <line x1="150" y1="120" x2="90" y2="200" />
          <line x1="300" y1="70" x2="330" y2="180" />
        </g>
        <g fill="#ffffff" opacity="0.9">
          <circle cx="70" cy="60" r="3.5" />
          <circle cx="150" cy="120" r="3.5" />
          <circle cx="300" cy="70" r="3.5" />
          <circle cx="330" cy="180" r="3.5" />
          <circle cx="90" cy="200" r="3.5" />
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md">
          {children}
        </div>
      </div>
    </div>
  );
}

// 3D Tilt Card Component using Framer Motion
function TiltCard({ suite }) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="suite-card group relative rounded-[22px] cursor-pointer"
    >
      <div
        className="animate-borderGlow pointer-events-none absolute -inset-[1.5px] rounded-[22px] opacity-0 blur-[6px] transition-opacity duration-500 group-hover:opacity-100"
        style={{
          backgroundImage: 'linear-gradient(120deg, #a855f7, #ec4899, #d946ef, #a855f7)',
          backgroundSize: '200% 200%',
          transform: "translateZ(-10px)"
        }}
        aria-hidden="true"
      />

      <div 
        className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-white/5 backdrop-blur-xl transition-colors duration-500 group-hover:bg-white/10 group-hover:border-white/20"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="relative h-52 w-full overflow-hidden">
          <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-110">
            <SuiteIllustration from={suite.from} to={suite.to}>
              {suite.icon}
            </SuiteIllustration>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-14 border-t border-white/10 bg-[#030712]/30 backdrop-blur-md" />
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="font-serif text-2xl font-semibold tracking-[-0.01em] text-white">
            {suite.title}
          </h3>
          <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-gray-300">
            {suite.desc}
          </p>

          <MagneticButton>
            <button className="group/btn relative mt-6 inline-flex w-fit items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-sans text-sm font-semibold tracking-wide text-white shadow-[0_8px_20px_rgba(168,85,247,0.3)] transition-all duration-300 hover:shadow-[0_10px_26px_rgba(236,72,153,0.5)] border border-white/10">
              <span className="relative z-10">Explore Suite</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 bg-white/20 blur-[2px] [transform:translateX(-130%)_skewX(-20deg)] group-hover/btn:animate-[btnShine_0.9s_ease-in-out]" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </motion.article>
  );
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const icons = {
  lung: (
    <svg viewBox="0 0 24 24" className="h-9 w-9" {...stroke}>
      <path d="M12 3v8" />
      <path d="M12 7c-1 1.5-3 2-3 4v4c0 2.5-1.5 4-3.5 4C4 23 4 21 4 19c0-3 1-6 3-8 1.2-1.2 3-1.5 5-1z" />
      <path d="M12 7c1 1.5 3 2 3 4v4c0 2.5 1.5 4 3.5 4C20 23 20 21 20 19c0-3-1-6-3-8-1.2-1.2-3-1.5-5-1z" />
    </svg>
  ),
  ribbon: (
    <svg viewBox="0 0 24 24" className="h-9 w-9" {...stroke}>
      <path d="M9 21c-1-2-3-6-3-9 0-3.5 2.5-6 6-6s6 2.5 6 6c0 3-2 7-3 9" />
      <path d="M9 9c1 2 3 5 3 5s2-3 3-5" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" className="h-9 w-9" {...stroke}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  ),
  loop: (
    <svg viewBox="0 0 24 24" className="h-9 w-9" {...stroke}>
      <path d="M6 4v6a4 4 0 004 4h1a3 3 0 013 3v3" />
      <path d="M6 4c3 0 4 2 4 4v3a3 3 0 003 3h2a3 3 0 013 3" />
    </svg>
  ),
  stomach: (
    <svg viewBox="0 0 24 24" className="h-9 w-9" {...stroke}>
      <path d="M8 3v4c0 2 1 3 3 3 3 0 5 2 5 5s-2 6-6 6c-3.5 0-6-2.5-6-6" />
      <path d="M16 12h2.5" />
    </svg>
  ),
  skin: (
    <svg viewBox="0 0 24 24" className="h-9 w-9" {...stroke}>
      <path d="M4 7c3-2 13-2 16 0" />
      <path d="M4 12c3-2 13-2 16 0" />
      <path d="M4 17c3-2 13-2 16 0" />
      <circle cx="9" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const suites = [
  {
    title: 'Lung Cancer Suite',
    desc: 'AI-guided detection and quantification of tumor morphology, subtyping and immune markers to support faster, more confident oncology decisions.',
    from: '#7c3aed',
    to: '#a855f7',
    icon: icons.lung,
  },
  {
    title: 'Breast Cancer Suite',
    desc: 'Automated scoring of HER2, ER/PR and Ki-67 with precise tumor region analysis for reproducible grading and streamlined reporting.',
    from: '#ec4899',
    to: '#f472b6',
    icon: icons.ribbon,
  },
  {
    title: 'Prostate Cancer Suite',
    desc: 'Gleason pattern recognition and gland-level analysis that bring consistent, quantitative insight to prostate biopsy review.',
    from: '#8b5cf6',
    to: '#d946ef',
    icon: icons.shield,
  },
  {
    title: 'Colorectal Cancer Suite',
    desc: 'Tumor segmentation, MSI signals and lymph node assessment to accelerate colorectal staging and biomarker workflows.',
    from: '#a855f7',
    to: '#ec4899',
    icon: icons.loop,
  },
  {
    title: 'Gastric Cancer Suite',
    desc: 'Deep tissue analysis for gastric carcinoma subtyping and biomarker quantification, enabling earlier and more precise intervention.',
    from: '#d946ef',
    to: '#f472b6',
    icon: icons.stomach,
  },
  {
    title: 'Skin Cancer Suite',
    desc: 'Layer-aware analysis of melanoma and dermal lesions with margin assessment to support accurate, reproducible dermatopathology.',
    from: '#7c3aed',
    to: '#ec4899',
    icon: icons.skin,
  },
];

export default function DiagnosticSuites() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      });

      // 3D camera-like depth animation on cards
      gsap.from('.suite-card', {
        y: 100,
        z: -100, // Depth translation
        opacity: 0,
        rotationX: 10,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      });

      gsap.to('.suite-blob', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-transparent py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="suite-blob absolute -top-24 -left-24 h-[30rem] w-[30rem] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="suite-blob absolute top-1/3 -right-32 h-[35rem] w-[35rem] rounded-full bg-pink-600/10 blur-[160px]" />
        <div className="animate-suiteFloat absolute left-[12%] top-[18%] h-3 w-3 rounded-full bg-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
        <div
          className="animate-suiteFloat absolute right-[18%] top-[28%] h-2.5 w-2.5 rounded-full bg-pink-400/80 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="animate-suiteFloat absolute left-[22%] bottom-[20%] h-2.5 w-2.5 rounded-full bg-fuchsia-400/80 shadow-[0_0_15px_rgba(217,70,239,0.8)]"
          style={{ animationDelay: '3s' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center" style={{ perspective: '1000px' }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gray-200 shadow-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
            Diagnostic Suites
          </span>

          <h2 className="mt-6 font-serif text-4xl font-semibold leading-[1.1] tracking-[-0.01em] text-white sm:text-5xl lg:text-6xl" style={{ textShadow: '0 4px 20px rgba(255,255,255,0.1)' }}>
            AI-Powered Cancer{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Diagnostic Suites
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-gray-300 sm:text-lg">
            Accelerating precision diagnostics with AI-powered pathology solutions
            for oncology — delivering faster, more accurate biomarker analysis and
            clinical decision support.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
          style={{ perspective: '1200px' }}
        >
          {suites.map((suite) => (
            <TiltCard key={suite.title} suite={suite} />
          ))}
        </div>
      </div>
    </section>
  );
}
