/**
 * Data awal dummy untuk ditampilkan sebelum data asli tersedia.
 * Setiap objek merepresentasikan satu paket kursus.
 */

export const INITIAL_DATA = [
  {
    id: 1,
    title: "React.js untuk Pemula",
    price: 350000,
    duration: "8 minggu",
    accessPeriod: "3 bulan",
    totalModules: 12,
    sertificate: true,
    difficulty: "pemula",
    method: "online",
    image: "https://placehold.co/400x220/3b82f6/ffffff?text=React.js",
    description:
      "Belajar React.js dari dasar hingga membuat aplikasi web modern yang responsif.",
  },
  {
    id: 2,
    title: "UI/UX Figma Profesional",
    price: 275000,
    duration: "6 minggu",
    accessPeriod: "2 bulan",
    totalModules: 9,
    sertificate: true,
    difficulty: "menengah",
    method: "online",
    image: "https://placehold.co/400x220/ec4899/ffffff?text=UI/UX+Figma",
    description:
      "Kuasai Figma untuk desain antarmuka yang menarik dan pengalaman pengguna yang optimal.",
  },
];

/** Pilihan tingkat kesulitan paket kursus */
export const DIFFICULTY_OPTIONS = ["pemula", "menengah", "lanjutan"];

/** Pilihan metode pembelajaran */
export const METHOD_OPTIONS = ["vidio", "live class", "hybrid"];

/** Pilihan durasi kursus */
export const DURATION_OPTIONS = [
  1,
  2,
  4,
  5,
  6,
  8,
  10,
  12,
];

/** Pilihan masa akses */
export const ACCESS_OPTIONS = [
  1,
  2,
  3,
  4,
  6,
  12,
  24,
];

/** Template form kosong */
export const EMPTY_FORM = {
  title: "",
  price: "",
  duration: "4 minggu",
  accessPeriod: "1 bulan",
  totalModules: "",
  sertificate: false,
  difficulty: "pemula",
  method: "online",
  image: "",
  description: "",
};

/** Warna badge difficulty */
export const DIFFICULTY_COLOR = {
  pemula: "bg-emerald-50 text-emerald-700 border-emerald-200",
  menengah: "bg-amber-50 text-amber-700 border-amber-200",
  lanjutan: "bg-rose-50 text-rose-700 border-rose-200",
};

/** Warna badge method */
export const METHOD_COLOR = {
  "live class": "bg-sky-50 text-sky-700 border-sky-200",
  vidiog: "bg-violet-50 text-violet-700 border-violet-200",
  hybrid: "bg-cyan-50 text-cyan-700 border-cyan-200",
};
