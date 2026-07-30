import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ClinicalWorkflow from './components/ClinicalWorkflow.jsx'
import OmicMindBreast from './components/OmicMindBreast.jsx'
import FoundationModel from './components/FoundationModel.jsx'
import OmicMindCore from './components/OmicMindCore.jsx'
import OmicMindEcosystem from './components/OmicMindEcosystem.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const heroWrapperRef = useRef(null);
  const suitesWrapperRef = useRef(null);
  
  // Spotlight effect motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // 2. Global Mouse Spotlight Listener
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 3. Seamless Section Transitions (Continuous 3D Environment)
    const ctx = gsap.context(() => {
      // Overlap transition: Hero scales down and fades into the background
      gsap.to(heroWrapperRef.current, {
        scale: 0.9,
        opacity: 0,
        y: -100, // moves slightly up
        ease: 'none',
        scrollTrigger: {
          trigger: suitesWrapperRef.current,
          start: 'top bottom', // When suites start entering from the bottom
          end: 'top top',      // Until suites reach the top
          scrub: true,
        }
      });

      // Suites section slides up smoothly over the hero
      gsap.fromTo(suitesWrapperRef.current, 
        { y: 100, z: 50 }, 
        { 
          y: 0, 
          z: 0, 
          ease: 'none',
          scrollTrigger: {
            trigger: suitesWrapperRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Fixed navbar — kept outside <main> so its `position: fixed` is not
          captured by main's `perspective`/`overflow-hidden` containing block. */}
      <Navbar />

      <main ref={containerRef} className="relative min-h-screen w-full bg-[#030712] text-gray-50 selection:bg-purple-500/30 overflow-hidden" style={{ perspective: '1200px' }}>

      {/* Global Mouse Spotlight */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Sections wrapped for overlapping GSAP animations */}
      <div ref={heroWrapperRef} className="relative z-10 w-full" style={{ transformOrigin: 'top center' }}>
        <Hero />
      </div>

      {/* Re-writing the Suites wrapper correctly for standard flow */}
      <div ref={suitesWrapperRef} className="relative z-20 w-full bg-[#030712] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-[3rem]">
        <ClinicalWorkflow />
        <OmicMindBreast />
        <FoundationModel />
        <OmicMindCore />
        <OmicMindEcosystem />
      </div>
      </main>

      {/* Footer kept outside <main> so it is untouched by main's
          perspective / overflow-hidden and the parallax transforms. */}
      <Footer />
    </>
  )
}

export default App
