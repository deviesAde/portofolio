"use client";
import RotatingText from "./ui/rotating-text";
import Lanyard from "./ui/lanyard";
import BlurText from "@/components/ui/Blurtext";
import SocialButton from "./ui/social-button";
import MorphingDownloadButton from "./ui/dowload-button";
import Aurora from "./ui/bg-aurora";
import Squares from "./ui/squarebg";
import Magnetic from "./ui/Magnetic";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function AboutMe() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sophisticated slide-up reveal for letters/lines
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        rotate: 5,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5
      });

      gsap.from(".reveal-subtext", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAnimationComplete = () => {
    console.log("Animasi selesai!");
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex items-center overflow-hidden">

      <div className="absolute inset-0 -z-20">
        <Aurora
          colorStops={["#A855F7", "#030014", "#6366F1"]}
          blend={0.5}
          amplitude={1.2}
          speed={0.3}
        />
      </div>

      {/* Content */}
      <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto w-full relative z-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24">

          {/* Lanyard Section - Positioned higher and made responsive */}
          <div className="w-full lg:w-2/5 order-first lg:order-last flex justify-center items-center lg:mt-12">
            <div className="relative w-full max-w-md aspect-square lg:aspect-[4/5] h-auto grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out cursor-crosshair">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
              <div className="absolute bottom-4 right-4 flex flex-col items-end">
                <span className="text-[10px] font-mono text-accent/40 uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr]">Identification.01</span>
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <div className="mb-6 inline-block px-3 py-1 border border-accent/30 rounded-full bg-accent/5">
              <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Fullstack and AI Engineer</span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-8 tracking-tighter text-foreground overflow-hidden">
              <span className="inline-block reveal-text">DEVIES</span> <br className="hidden sm:block" />
              <span className="inline-block reveal-text">ADE</span> <br className="hidden sm:block" />
              <span className="text-accent italic font-light drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] inline-block reveal-text">IRAWAN</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-center lg:items-start lg:items-center gap-6 mb-12">
              <div className="hidden lg:block h-[2px] w-20 bg-accent/50" />
              <RotatingText
                texts={["ARCHITECTING", "DESIGNING", "CODING", "INNOVATING"]}
                mainClassName="text-2xl sm:text-3xl font-bold tracking-tight text-foreground/80"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            </div>

            <div className="max-w-xl mx-auto lg:mx-0">
              <BlurText
                text="Mahasiswa Ilmu Komputer Universitas Jember dengan fokus pada backend development dan penerapan kecerdasan buatan. Berpengalaman membangun backend aplikasi menggunakan Laravel, PHP, MySQL, dan RESTful API dengan pengelolaan kode berbasis Git. Saat ini mengembangkan kemampuan project machine learning dan computer vision untuk integrasi AI ke dalam aplikasi nyata."
                delay={30}
                animateBy="words"
                direction="top"
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10"
              />
            </div>

            <div className="flex justify-center lg:justify-start reveal-subtext">
              <Magnetic>
                <SocialButton className="h-14 w-full sm:w-[280px]" />
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      {/* Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-foreground/[0.03] -z-10" />
      <div className="absolute bottom-10 left-10 text-[8vw] font-bold text-foreground/[0.02] pointer-events-none select-none -z-10 uppercase">
        Software Engineer
      </div>
    </div>
  );
}