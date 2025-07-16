"use client";
import RotatingText from "./ui/rotating-text";
import Lanyard from "./ui/lanyard";
import BlurText from "@/components/ui/Blurtext";
import SocialButton from "./ui/social-button";
import Btn03 from "./ui/button03";
import Aurora from "./ui/bg-aurora";
import Squares from "./ui/squarebg";

export default function AboutMe() {
  const handleAnimationComplete = () => {
    console.log("Animasi selesai!");
  };

  return (
    <div className="relative w-full">
      {" "}
      {/* Added wrapper for backgrounds */}
      {/* Background elements */}
      <div className="absolute inset-0 -z-20 overflow-hidden opacity-20">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="absolute inset-0 -z-10 opacity-10 dark:opacity-[0.03]">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#888"
          hoverFillColor="#222"
        />
      </div>
      {/* Content */}
      <div className="pt-16 sm:pt-20 px-4 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-0">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          {/* Title and RotatingText */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center lg:text-left">
              I'M READY FOR
            </h1>
            <div className="mt-2 sm:mt-0">
              <RotatingText
                texts={["CODE", "DESIGN", "CREATE", "INNOVATE", "EXPLORE"]}
                mainClassName="px-5 sm:px-6 md:px-7 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-3xl sm:text-4xl md:text-5xl py-3 sm:py-4 justify-center rounded-xl"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1 sm:pb-1.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
          </div>

          {/* Description */}
          <BlurText
            text="Saya Devies Ade Irawan, mahasiswa Universitas Jember yang antusias di bidang pemrograman dan teknologi. 💻 Saya senang memecahkan masalah, belajar hal baru, dan membangun solusi lewat software. Dengan semangat belajar tinggi, saya terus berkembang dan berkontribusi di dunia teknologi."
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-base sm:text-lg md:text-xl mb-10 text-center lg:text-left w-full max-w-2xl leading-relaxed"
          />

          {/* Buttons */}
          <div className="w-full flex flex-wrap justify-center lg:justify-start gap-4">
            <div className="w-full sm:w-auto">
              <SocialButton className="h-14 px-8 text-lg" />
            </div>
            <div className="w-full sm:w-auto">
              <Btn03 className="h-14 px-8 text-lg" />
            </div>
          </div>
        </div>

        {/* Lanyard Section */}
        <div className="w-full lg:w-1/2 h-auto lg:h-[550px] flex justify-center items-center mt-10 lg:mt-0">
          <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
        </div>
      </div>
    </div>
  );
}
