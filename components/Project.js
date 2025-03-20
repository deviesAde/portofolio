import Carousel from "@/components/ui/Carousel";

export default function Project() {
  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Explore Component",
      src: "/images/devies.JPG",
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "/images/devies.JPG",
    },
    {
      title: "Neon Nights",
      button: "Explore Component",
      src: "/images/devies.JPG",
    },
    {
      title: "Desert Whispers",
      button: "Explore Component",
      src: "/images/devies.JPG",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
