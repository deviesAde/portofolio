import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import AboutMe from "@/components/Aboutme";
import TimelineSection from "@/components/TimelineSection";
import { FloatingDockdemo } from "@/components/Floatingdock";
import { LinkPreviewDemo } from "@/components/Techstack";




export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="text-center mb-2 mt-50">
        <h2 className="text-xl relative z-20 md:text-2xl lg:text-4xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          Welcome to My {""}
          <div className="relative mx-auto inline-block w-max text-gray-700 dark:text-gray-300 [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500">
              <span>Portfolio</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span>Portfolio</span>
            </div>
          </div>
        </h2>
      </div>
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
        id="link-previews"
        className="w-full flex flex-col items-center py-12"
      >
        <LinkPreviewDemo />
      </section>
    </div>
  );
}
