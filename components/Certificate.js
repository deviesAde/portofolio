import TiltedCard from "@/components/ui/TiltedCardd";
import BlurText from "@/components/ui/Blurtext";

export default function Certificate() {
  const certificates = [
    {
      imageSrc: "/images/certif/certif1.JPEG",
    },
    {
      imageSrc: "/images/certif/certif2.JPEG",
    },
    {
      imageSrc: "/images/certif/certif3.JPEG",
    },
    {
      imageSrc: "/images/certif/certif4.JPEG",

    },
  ];

  return (
    <div className="flex flex-col items-center">
      <BlurText
        text="SERTIFIKASI & PENCAPAIAN SAYA"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-lg font-bold text-center mb-7"
      />
      <div className="flex flex-wrap justify-center gap-6">
        {certificates.map((cert, index) => (
          <TiltedCard
            key={index}
            imageSrc={cert.imageSrc}
            altText={cert.altText}
            captionText={cert.captionText}
            containerHeight="180px" 
            containerWidth="320px"
            imageHeight="180px"
            imageWidth="320px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
          
          />
        ))}
      </div>
    </div>
  );
}
