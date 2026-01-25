import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata = {
  title: "Devies Ade Irawan | Fullstack Developer Portfolio",
  description: "Mahasiswa Universitas Jember yang antusias di bidang pemrograman dan teknologi. Fokus pada pembangunan solusi software yang inovatif dan efisien.",
  keywords: ["Devies Ade Irawan", "Portfolio", "Fullstack Developer", "Next.js", "React", "Universitas Jember", "Software Engineer"],
  authors: [{ name: "Devies Ade Irawan" }],
  creator: "Devies Ade Irawan",
  publisher: "Devies Ade Irawan",
  robots: "index, follow",
  alternates: {
    canonical: "https://portofolio-devies-ade.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://portofolio-devies-ade.vercel.app",
    title: "Devies Ade Irawan | Fullstack Developer Portfolio",
    description: "Mahasiswa Universitas Jember yang antusias di bidang pemrograman dan teknologi.",
    siteName: "Devies Ade Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devies Ade Irawan | Fullstack Developer Portfolio",
    description: "Mahasiswa Universitas Jember yang antusias di bidang pemrograman dan teknologi.",
  },
  verification: {
    google: "uvN_umDTuYE3JRyIdrkWywyUhtgE0_oAczMWpsdtOFk",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${syne.variable} antialiased`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
