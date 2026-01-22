"use client";
import Navbar from "@/components/ui/Navbar";
import AboutMe from "@/components/Aboutme";
import TimelineSection from "@/components/TimelineSection";
import Certificate from "@/components/Certificate";
import ProjectsSection from "@/components/Project";
import MultilingualLoader from "@/components/ui/multi-language-loader";
import TechStack from "@/components/ui/techstack";
import MorphingDownloadButton from "@/components/ui/dowload-button";
import GitHubAllInOne from '@/components/GitHubAllInOne';
import GetInTouch from "@/components/getintouch";

export default function Home() {
  return (
    <div className="w-full relative">
      {/* Navbar */}
      <Navbar />

      {/* Main Content with top padding to account for fixed navbar */}
      <div className="pt-16">
        <div className="fixed bottom-8 right-8 z-50">
          <MorphingDownloadButton
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
            resumeUrl="/RESUME_DEVIES_ADE.pdf"
            resumeName="Devies_Ade_Irawan_CV.pdf"
          />
        </div>

        <MultilingualLoader>

          <section id="about-me">
            <AboutMe />
          </section>

          {/* GitHub Activity Section */}
          <section id="github" className="my-8">
            <GitHubAllInOne
              username={process.env.NEXT_PUBLIC_GITHUB_USERNAME || "deviesAde"}
              token={process.env.NEXT_PUBLIC_GITHUB_TOKEN}
            />
          </section>

          {/* Timeline Section */}
          <section id="timeline">
            <TimelineSection />
          </section>

          {/* Certificates Section */}
          <section id="certificates">
            <Certificate />
          </section>

          {/* Projects Section */}
          <section id="projects">
            <ProjectsSection />
          </section>

          {/* Tech Stack Section */}
          <section id="tech-stack">
            <TechStack />
          </section>


          <section id="contact">
            <h2 className="text-4xl font-bold mb-8 text-center"> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Get In Touch
            </span></h2>
            <GetInTouch />
          </section>
        </MultilingualLoader>
      </div>
    </div>
  );
}