
import AboutMe from "@/components/Aboutme";
import TimelineSection from "@/components/TimelineSection";
import { FloatingDockdemo } from "@/components/Floatingdock";
import Certificate from "@/components/Certificate";
import Project from "@/components/Project";
import CardStack from "@/components/ui/card-stack";
import MultilingualLoader from "@/components/ui/multi-language-loader";







export default function Home() {
  return (

    <div className="w-full mt-12 mb-20px">
      <MultilingualLoader>

      <div className="fixed top-0 left-0 w-full h-auto z-50 py-2 px-4">
        <FloatingDockdemo />
      </div>
      <section
        id="about-me"
        className="w-full flex flex-col items-center py-12"
      >
        <AboutMe />
      </section>

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
        <div className="text-center w-full">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center text-black dark:text-white font-sans tracking-tight mb-8">
            My Projects
          </h2>
          <div className="mx-auto w-full aspect-square max-w-[350px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
            <CardStack />
          </div>
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
      </MultilingualLoader>
    </div>
  
  );
}
