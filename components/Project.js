import Carousel from "@/components/ui/Carousel";

export default function Project() {
  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Explore Component",
      src: "/images/devies.JPG",
      description: "This is a description of the project",
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "/images/devies.JPG",
      description: "This is a description of the project",
    },
    {
      title: "Neon Nights",
      button: "Explore Component",
      src: "/images/devies.JPG",
      description: "This is a description of the project",
    },
    {
      title: "Desert Whispers",
      button: "Explore Component",
      src: "/images/devies.JPG",
      description: "This is a description of the project",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <div className="aspect-w-16 aspect-h-9">
        <Carousel slides={slideData} />
      </div>
    </div>
  );
}
