"use client";

import CardStack from "./ui/card-stack"

const ProjectsSection = () => {
 
  return (
    <section
      id="projects"
      className="w-full py-20 relative overflow-hidden bg-white dark:bg-black"
    >
     

      {/* Container utama */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Projects
            </span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Featured work and case studies showcasing my development skills
          </p>
        </div>

        {/* CardStack tampil di atas background */}
        <div className="mx-auto w-full aspect-square max-w-[350px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] relative z-20">
          <CardStack />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
