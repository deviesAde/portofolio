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
          Joined as a <strong>Programmer Staff</strong> at <strong>UKM Linux and Open Source (LAOS)</strong> and as a <strong>Research Assistant</strong> at <strong>Software Engineering Laboratory</strong>, University of Jember. These two roles were important foundations in my journey as a junior developer.
        </p>
        <ul className="list-disc list-inside text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-6">
          <li>Developed projects based on <strong>PHP, Laravel, and React</strong> in an open source team</li>
          <li>Practiced communication and <strong>public speaking</strong> skills in various organizational agendas</li>
          <li>Participated in <strong>digital innovation development</strong> and technology competitions</li>
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
              Active as programmer staff at UKM LAOS, developing various open source projects.
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
              Active as Research Assistant at Software Engineering Laboratory.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Pengalaman Proyek",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-6">
          Telah mengerjakan berbagai proyek menarik sebagai Fullstack Developer, Backend Developer, Frontend Developer, dan Machine Learning Engineer:
        </p>
        <div className="space-y-4 mb-6">
          <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              ESD MATH - Agustus 2025
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <strong>Backend Developer</strong> - Mengembangkan layanan backend untuk platform pembelajaran matematika interaktif dengan fitur autentikasi pengguna, manajemen soal, dan pelacakan kemajuan belajar.
            </p>
          </div>

          <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              IBP Academy Website - Agustus 2025
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <strong>Fullstack Developer</strong> - Membangun Learning Management System (LMS) untuk kompetisi internasional dengan fitur materi kursus, manajemen peserta, dan pelacakan aktivitas.
            </p>
          </div>

          <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              BBRI Stock Price Prediction - Agustus 2025
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <strong>Machine Learning Engineer</strong> - Mengembangkan model LSTM untuk memprediksi harga saham BBRI menggunakan data time-series historis dengan pengolahan dan normalisasi data.
            </p>
          </div>

          <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              Sapardi - Sahabat Pintar Petani Padi - April 2025
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <strong>Fullstack Developer</strong> - Mengembangkan chatbot AI berbasis YOLO untuk deteksi penyakit tanaman padi dengan backend Laravel dan frontend React untuk mendukung pertanian cerdas.
            </p>
          </div>

          <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              E-Commerce Holiday - Januari 2025
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <strong>Fullstack Developer</strong> - Membangun platform e-commerce dengan fitur pembeli, penjual, dan admin, integrasi payment gateway Midtrans untuk transaksi aman.
            </p>
          </div>

          <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              resQfood - Desember 2024
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <strong>Frontend Developer</strong> - Mengembangkan frontend aplikasi berbasis Next.js untuk mengurangi pemborosan makanan dengan menjual produk mendekati tanggal expired dengan harga diskon.
            </p>
          </div>

          <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              Ventix - Platform Tiket Event - Maret 2025
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <strong>Fullstack Developer</strong> - Mengembangkan aplikasi web untuk penjualan tiket event dengan manajemen tiket, registrasi pengguna, integrasi pembayaran, dan QR code check-in.
            </p>
          </div>

          <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              Tani Alpukat Sidorejo App - November 2024
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <strong>Fullstack Developer</strong> - Mengembangkan aplikasi web untuk mendukung pemasaran alpukat dari kelompok petani dengan fitur manajemen stok, pemrosesan pesanan, dan promosi online.
            </p>
          </div>

          <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              Greenloops App - November 2024
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <strong>Fullstack Developer</strong> - Mengembangkan platform web untuk penjualan produk ramah lingkungan dengan fitur listing produk, manajemen kategori, dan alur pembelian online.
            </p>
          </div>

          <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
              Prokerku App - November 2024
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <strong>Fullstack Developer</strong> - Mengembangkan aplikasi mobile dengan React Native dan Expo untuk manajemen program organisasi dengan fitur penugasan tugas, pelacakan kemajuan, dan notifikasi.
            </p>
          </div>
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
