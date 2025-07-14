import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

const data = [
  {
    title: "2025 - Sapardi AI & Vision Bot",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          Membangun <strong>Sapardi</strong>, chatbot AI dan sistem deteksi
          visual berbasis web untuk mengenali tanaman padi serta memberikan
          informasi penyakitnya. Proyek ini mengintegrasikan teknologi{" "}
          <strong>YOLOv8</strong> dan <strong>Groq LLM</strong> dengan antarmuka
          interaktif.
        </p>
        <ul className="list-disc list-inside text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-6">
          <li>
            Mengembangkan backend dengan Laravel 12 untuk menyimpan sesi chat
            dan riwayat
          </li>
          <li>
            Mengintegrasikan Groq LLaMA 4 Scout 17B untuk menjawab pertanyaan
            terkait padi
          </li>
          <li>
            Menggunakan YOLOv8 (Python) untuk deteksi visual penyakit tanaman
          </li>
          <li>Mendesain antarmuka menggunakan React dan Tailwind CSS</li>
        </ul>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Image
              src="/images/2025/devies_sapardi.jpg"
              alt="Deteksi YOLOv8"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
            />
            
          </div>
          <div>
            <Image
              src="/images/2025/devies_sapardi2.jpg"
              alt="Chatbot Interface"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
            />
          
          </div>
          <div>
            <Image
              src="/images/2025/devies_sapardi3.jpg"
              alt="Session Storage"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
            />
           
          </div>
          <div>
            <Image
              src="/images/2025/devies_sapardo4.jpg"
              alt="New Chat Feature"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
            />
           
          </div>
        </div>
      </div>
    ),
  },
  {
  title: "Early 2024",
  content: (
    <div>
      <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
        Bergabung sebagai <strong>Programmer Staf</strong> di <strong>UKM Linux and Open Source (LAOS)</strong> dan sebagai <strong>Research Assistant</strong> di <strong>Software Engineering Laboratory</strong>, Universitas Jember. Dua peran ini menjadi fondasi penting dalam perjalanan saya sebagai junior developer.
      </p>
      <ul className="list-disc list-inside text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-6">
        <li>Mengembangkan proyek berbasis <strong>PHP, Laravel, dan React</strong> dalam tim open source</li>
        <li>Melatih kemampuan komunikasi dan <strong>public speaking</strong> dalam berbagai agenda organisasi</li>
        <li>Berpartisipasi dalam <strong>pengembangan inovasi digital</strong> dan kompetisi teknologi</li>
      </ul>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image
            src="/images/2024/devieslaos.png"
            alt="UKM Linux and Open Source"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2">
            Aktif sebagai programmer staf di UKM LAOS, mengembangkan berbagai proyek open source.
          </p>
        </div>
        <div>
          <Image
            src="/images/2024/rpl.png"
            alt="Software Engineering Laboratory"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-md"
          />
          <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2">
            Aktif sebagai Research Assistant di Software Engineering Laboratory.
          </p>
        </div>
      </div>
    </div>
  ),
},
  {
    title: "Changelog",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
         Telah mengerjakan berbagai proyek menarik dan inovatif, termasuk:
        </p>
        <div className="mb-8">
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Sapardi AI untuk deteksi penyakit tanaman padi
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Eventix Event Management System berbasis web
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Admin Dashboard untuk manajemen system
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ ResQFood, aplikasi donasi makanan berbasis web
          </div>
          <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
            ✅ Sistem Informasi Perpustakaan berbasis web
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
         
          <Image
            src="/images/2025/devies_sapardi2.jpg"
            alt="feature template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="/images/2025/resq.png"
            alt="bento template"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
         
        </div>
      </div>
    ),
  },
];

export default function TimelineSection() {
  return (
    
      <Timeline data={data} />
    
  );
}
