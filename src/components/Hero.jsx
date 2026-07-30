import React, { useRef, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import timelineVideo from '../assets/Timeline.mp4';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// 3D DNA-like floating particles
function FloatingMolecules() {
  const group = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
      const t = i / 40;
      const x = Math.sin(t * Math.PI * 4) * 2;
      const y = (t - 0.5) * 8;
      const z = Math.cos(t * Math.PI * 4) * 2;
      temp.push({ position: [x, y, z], scale: Math.random() * 0.15 + 0.05 });
      
      const x2 = Math.sin(t * Math.PI * 4 + Math.PI) * 2;
      const z2 = Math.cos(t * Math.PI * 4 + Math.PI) * 2;
      temp.push({ position: [x2, y, z2], scale: Math.random() * 0.15 + 0.05 });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.2;
      group.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
  });

  return (
    <group ref={group}>
      {particles.map((data, i) => (
        <Sphere key={i} position={data.position} scale={data.scale}>
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#a855f7" : "#ec4899"} 
            emissive={i % 2 === 0 ? "#7c3aed" : "#ec4899"}
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

// Eyebrow badge: pure fade-in on page load
const eyebrowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);
  const headingRef = useRef(null);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // --- 0. Hero Heading Entrance (GSAP fade-up, line by line) ---
      const headingLines = headingRef.current?.querySelectorAll('.hero-line');
      if (headingLines?.length) {
        if (prefersReducedMotion) {
          gsap.set(headingLines, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            headingLines,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
              stagger: 0.12,
              delay: 0.45,
            }
          );
        }
      }

      if (!prefersReducedMotion) {
        // --- 1. Layered Scroll Parallax ---
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2, // Smooth scrub
          }
        });

        // Video: Slow zoom-in and slight pan
        scrollTl.fromTo(videoRef.current,
          { scale: 1, yPercent: 0 },
          { scale: isMobile ? 1.05 : 1.15, yPercent: 10, ease: 'none' },
          0
        );

        // 3D Particles: Move towards the user on Z axis and translate up
        scrollTl.fromTo(canvasRef.current,
          { y: 0, z: 0 },
          { y: isMobile ? -50 : -150, z: isMobile ? 50 : 150, ease: 'none' },
          0
        );

        // Foreground Content: Move up fastest
        scrollTl.fromTo(contentRef.current,
          { y: 0, z: 0 },
          { y: isMobile ? -80 : -200, z: isMobile ? 20 : 50, ease: 'none' },
          0
        );

        // Decorative Glows
        scrollTl.fromTo(glowRef.current,
          { y: 0 },
          { y: -100, ease: 'none' },
          0
        );

        // --- 2. Mouse-based 3D Tilt & Pan (Desktop Only) ---
        let handleMouseMove;
        if (!isMobile) {
          handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            // Normalize mouse position between -1 and 1
            const x = (e.clientX / innerWidth - 0.5) * 2;
            const y = (e.clientY / innerHeight - 0.5) * 2;

            // Pan the background video slightly in opposition to mouse
            gsap.to(videoRef.current, {
              x: x * -20,
              y: y * -20,
              duration: 1.5,
              ease: "power2.out"
            });

            // Pan and tilt the 3D canvas (moves more than video)
            gsap.to(canvasRef.current, {
              x: x * 30,
              y: y * 30,
              rotationX: y * -5,
              rotationY: x * 5,
              duration: 1.5,
              ease: "power2.out"
            });

            // Pan and tilt the foreground content (creates layered depth)
            gsap.to(contentRef.current, {
              x: x * 15,
              y: y * 15,
              rotationX: y * -2,
              rotationY: x * 2,
              duration: 1.5,
              ease: "power2.out"
            });
          };

          const heroEl = heroRef.current;
          heroEl.addEventListener('mousemove', handleMouseMove);

          // Return specific cleanup for the listener
          return () => {
            heroEl.removeEventListener('mousemove', handleMouseMove);
          };
        }
      } else {
        // Fallback for reduced motion
        gsap.to(heroRef.current, {
          yPercent: 5,
          opacity: 0.8,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative w-full min-h-screen flex items-center bg-[#030712] overflow-hidden"
      style={{ perspective: '1200px' }} // Enables 3D space for the layered elements
    >
      
      {/* Background Video (Full visibility) */}
      <video 
        ref={videoRef}
        src={timelineVideo} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ transformOrigin: "center center" }}
      />
      
      {/* Very subtle transparent gradient overlay for minimal blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/10 via-transparent to-[#030712]/20 z-0 pointer-events-none" />

      {/* Decorative Glows */}
      <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[50%] rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[60%] rounded-full bg-pink-600/10 blur-[150px]" />
      </div>

      {/* 3D R3F Canvas - Positioned slightly to the right */}
      <div ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Stars radius={50} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <group position={[4, 0, 0]}>
                <FloatingMolecules />
              </group>
            </Float>
          </Canvas>
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex items-center min-h-screen">
        
        {/* Left Side Glass Card */}
        <motion.div 
          ref={contentRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-[65%] lg:w-[55%] flex flex-col items-start text-left mt-20 md:mt-0 glass-card bg-[#030712]/60 backdrop-blur-2xl p-10 md:p-14 rounded-[2rem] relative overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Inner subtle glow for the card */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple-500/30 blur-[80px] rounded-full pointer-events-none" />
          
          {/* Eyebrow badge */}
          <motion.div
            variants={eyebrowVariants}
            className="inline-flex items-center gap-2.5 pl-3.5 pr-5 py-2 rounded-full bg-white/10 border border-purple-400/40 backdrop-blur-md shadow-[0_4px_24px_rgba(168,85,247,0.18)] mb-8"
          >
            <Sparkles className="w-4 h-4 shrink-0 text-purple-300" strokeWidth={2} />
            <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.12em] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400">
              Introducing OmicMind Breast&trade;
            </span>
          </motion.div>

          <h1
            ref={headingRef}
            className="font-serif font-bold tracking-[-0.01em] text-white leading-[1.1] mb-6 text-[2rem] sm:text-[2.6rem] md:text-[2.05rem] lg:text-[2.4rem] xl:text-[3rem] 2xl:text-[3.6rem]"
          >
            <span className="hero-line block opacity-0">One FFPE Specimen.</span>
            <span className="hero-line block opacity-0">Infinite Multi-Omic Insights.</span>
          </h1>

          <motion.p
            variants={itemVariants}
            className="font-sans text-lg lg:text-xl text-gray-300 max-w-xl mb-10 leading-relaxed tracking-[0.01em]"
          >
            Accelerate your research with our cutting-edge AI platform. We transform complex data into actionable insights for the future of healthcare.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 relative z-10">
            <MagneticButton>
              <button 
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-sans text-base font-medium tracking-wide rounded-full shadow-[0_8px_25px_rgba(168,85,247,0.4)] transition-all hover:scale-105 hover:shadow-[0_8px_35px_rgba(236,72,153,0.5)] flex items-center gap-2 border border-white/10"
              >
                Start Building
                <ArrowRight className="w-5 h-5" />
              </button>
            </MagneticButton>
            <MagneticButton>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-sans text-base font-medium tracking-wide rounded-full shadow-lg border border-white/10 transition-all hover:scale-105 flex items-center gap-2 backdrop-blur-md">
                View Demo
              </button>
            </MagneticButton>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
