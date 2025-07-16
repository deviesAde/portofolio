"use client";
import AboutMe from "@/components/Aboutme";
import TimelineSection from "@/components/TimelineSection";
import { FloatingDockdemo } from "@/components/Floatingdock";
import Certificate from "@/components/Certificate";
import ProjectsSection from "@/components/Project";
import MultilingualLoader from "@/components/ui/multi-language-loader";
import TechStack from "@/components/ui/techstack";
import MorphingDownloadButton from "@/components/ui/dowload-button";
import GetInTouch from "@/components/ui/get-in-touch";

export default function Home() {
  return (
    <div className="w-full mt-12 mb-20 relative">
     

      {/* Floating Download Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <MorphingDownloadButton
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
          resumeUrl="/RESUME_DEVIES_ADE.pdf"
          resumeName="Devies_Ade_Irawan_CV.pdf"
        />
      </div>

      <MultilingualLoader>
        {/* Floating Dock */}
        <div className="fixed top-0 left-0 w-full h-auto z-50 py-2 px-4">
          <FloatingDockdemo />
        </div>

        {/* About Me Section */}
        <section
          id="about-me"
          
        >
          <AboutMe />
        </section>

        {/* Timeline Section */}
        <section
          id="timeline"
         
        >
          <TimelineSection />
        </section>

        {/* Certificates Section */}
        <section
          id="certificates"
          
        >
          <Certificate />
        </section>

      
        <section id="projects">
          <ProjectsSection />
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack">
          <TechStack />
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="w-full py-12 border-t mt-12 flex flex-col items-center bg-white dark:bg-black"
        >
          <div className="text-center">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
              Get in Touch
            </h2>
          </div>
          <div className="mt-6 max-w-2xl w-full px-4">
            <GetInTouch />
          </div>
        </section>
      </MultilingualLoader>
    </div>
  );
}
