import TiltedCard from "@/components/ui/TiltedCardd";
import BlurText from "@/components/ui/Blurtext";

export default function Certificate() {
  const certificates = [
    {
      imageSrc: "/images/devies.JPG",
      altText: "Certificate 1",
      captionText: "Certified Web Developer",
    },
    {
      imageSrc: "/images/devies.JPG",
      altText: "Certificate 2",
      captionText: "React & Frontend Specialist",
    },
    {
      imageSrc: "/images/devies.JPG",
      altText: "Certificate 3",
      captionText: "Full-Stack Developer",
    },

    {
      imageSrc: "/images/devies.JPG",
      altText: "Certificate 3",
      captionText: "Full-Stack Developer",
    },
    {
      imageSrc: "/images/devies.JPG",
      altText: "Certificate 3",
      captionText: "Full-Stack Developer",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <BlurText
        text="Here are some of my certificates"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-4xl font-bold text-center  mb-7"
      />
      <div className="flex flex-wrap justify-center gap-6">
        {certificates.map((cert, index) => (
          <TiltedCard
            key={index}
            imageSrc={cert.imageSrc}
            altText={cert.altText}
            captionText={cert.captionText}
            containerHeight="180px" // 16:9 Aspect Ratio
            containerWidth="320px"
            imageHeight="180px"
            imageWidth="320px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="text-[oklch(0.496_0.265_301.924)] font-semibold text-center w-full">
                {cert.captionText}
              </p>
            }
          />
        ))}
      </div>
    </div>
  );
}
  

