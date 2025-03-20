"use client";

import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import BlurText from "@/components/ui/Blurtext";


export default function AboutMe() {
  const handleAnimationComplete = () => {
    console.log("Animasi selesai!");
  };
  return (
    <div className="mt-6 p-4 max-w-2xl flex items-start space-x-4">
      <div className="text-left w-1/2 mt-10">
        <div style={{ marginTop: "4rem" }}>
          <BlurText
            text="Hello, I'm Devies Ade Irawan. I am a student at the University of Jember with a deep passion for programming and technology. 💻🚀 I enjoy tackling coding challenges, solving problems, and developing innovative solutions through software development. With a strong curiosity, I am always eager to learn new programming languages, explore different frameworks, and stay updated with the latest tech trends.
            For me, programming is not just about writing code—it’s about creativity, logic, and perseverance in building efficient and impactful systems. 🎯✨ I love participating in projects, competitions, and collaborations that allow me to grow and expand my knowledge in the tech world. With a strong learning spirit, I am committed to continuously improving my skills and making meaningful contributions to the field of technology. 🔥📚."
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-sm mb-8"
          />
        </div>
      </div>
      <div className="w-1/2">
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[18rem] h-auto rounded-xl p-6 border mt-[-20px]">
            <CardItem
              translateZ="50"
              className="text-lg font-bold text-neutral-600 dark:text-white"
            >
              Devies Ade Irawan
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Junior Developer
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="/images/devies.JPG"
                height={800}
                width={800}
                className="h-100 justify-between w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="Devies Ade Irawan"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-10">
              <CardItem
                translateZ={20}
                as={Link}
                href="https://www.linkedin.com/in/deviesade/"
                target="__blank"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                Lets Connect on LinkedIn
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
}
