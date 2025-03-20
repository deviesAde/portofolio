import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import AboutMe from "@/components/Aboutme";
import TimelineSection from "@/components/TimelineSection";
import { FloatingDockdemo } from "@/components/Floatingdock";
import Certificate from "@/components/Certificate";
import Project from "@/components/Project";
import TrueFocus from "@/components/ui/Truefocus";







export default function Home() {
  return (
    <div className="w-full mt-12 mb-20px">
      <TrueFocus
        sentence="WELCOME TO MY PORTFOLIO"
        manualMode={false}
        blurAmount={5}
        borderColor="purple"
        glowColor="rgba(0, 255, 0, 0.6)"
        animationDuration={0.5}
        pauseBetweenAnimations={1}
      />

      <div className="fixed top-0 left-0 w-full h-auto z-50 py-2 px-4">
        <FloatingDockdemo />
      </div>
      <BackgroundBeamsWithCollision>
        <section
          id="about-me"
          className="w-full flex flex-col items-center py-12"
        >
          <AboutMe />
        </section>
      </BackgroundBeamsWithCollision>

      <section
        id="timeline"
        className="w-full py-12 border-t mt-12 flex flex-col items-center"
      >
        <TimelineSection />
      </section>

      <section
        id="certificates"
        className="w-full py-12 border-t mt-12 flex flex-col items-center"
      >
        <Certificate />
      </section>
      <section
        id="projects"
        className="w-full py-12 border-t mt-12 flex flex-col items-center"
      >
        <div className="text-center">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            My Projects
          </h2>
          <Project />
        </div>
      </section>
      <section
        id="contact"
        className="w-full py-12 border-t mt-12 flex flex-col items-center"
      >
        <div className="text-center">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            More About me
          </h2>
        </div>
      </section>
    </div>
  );
}
