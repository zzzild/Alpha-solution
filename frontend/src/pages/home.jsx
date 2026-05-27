import { useState, useEffect, useRef } from "react";
import Navbar from "./../components/Navbar";
import Footer from "../components/Footer";

/* ─────────────────────────── ICONS ─────────────────────────── */
const ChevronRight = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const ArrowRight = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const SendIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const CheckCircle = () => (
  <svg
    className="w-5 h-5 text-blue-600 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

/* ─────────────────────────── DATA ─────────────────────────── */
const STATS = [
  { value: "42.800+", label: "Peserta Terlatih" },
  { value: "1.200+", label: "Pelatihan Selesai" },
  { value: "180+", label: "Lembaga Mitra" },
  { value: "34", label: "Provinsi Terjangkau" },
  { value: "98%", label: "Tingkat Kelulusan" },
];

const CATEGORIES = [
  {
    name: "Bisnis & Manajemen",
    icon: "💼",
    count: 38,
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    name: "Teknologi Informasi",
    icon: "💻",
    count: 52,
    color: "bg-violet-50 text-violet-700 border-violet-100",
  },
  {
    name: "Pariwisata",
    icon: "🍽️",
    count: 24,
    color: "bg-orange-50 text-orange-700 border-orange-100",
  },
  {
    name: "Teknik Listrik",
    icon: "⚡",
    count: 19,
    color: "bg-yellow-50 text-yellow-700 border-yellow-100",
  },
  {
    name: "Konstruksi",
    icon: "🏗️",
    count: 15,
    color: "bg-stone-50 text-stone-700 border-stone-200",
  },
  {
    name: "Kesehatan",
    icon: "🩺",
    count: 21,
    color: "bg-green-50 text-green-700 border-green-100",
  },
  {
    name: "Pertanian",
    icon: "🌱",
    count: 17,
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    name: "Maritim",
    icon: "⚓",
    count: 9,
    color: "bg-sky-50 text-sky-700 border-sky-100",
  },
];

const TRAININGS = [
  {
    id: "#9FAE2E41",
    badge: "Batch 2 · 2026",
    category: "Bisnis Dan Manajemen",
    title: "Digital Office Administration Berbasis Google Workspace",
    tags: ["Offline", "Non Boarding", "Bantuan Transport"],
    rating: 4.9,
    reviews: 128,
    lembaga: "BPVP SAMARINDA",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=220&fit=crop",
  },
  {
    id: "#A12B3C4D",
    badge: "Batch 2 · 2026",
    category: "Teknologi Informasi",
    title: "Pemrograman Aplikasi Mobile Berbasis Android",
    tags: ["Online", "Bantuan Transport"],
    rating: 4.7,
    reviews: 94,
    lembaga: "BPVP JAKARTA",
    img: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=220&fit=crop",
  },
  {
    id: "#E56F7G8H",
    badge: "Batch 2 · 2026",
    category: "Pariwisata",
    title: "Barista Kopi Profesional Bersertifikat BNSP",
    tags: ["Offline", "Boarding", "Uang Saku"],
    rating: 4.9,
    reviews: 211,
    lembaga: "BPVP MAKASSAR",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=220&fit=crop",
  },
  {
    id: "#B23C4D5E",
    badge: "Batch 2 · 2026",
    category: "Konstruksi",
    title: "Teknik Las SMAW Posisi 3G Bersertifikat BNSP",
    tags: ["Offline", "Boarding", "Uang Saku"],
    rating: 4.5,
    reviews: 76,
    lembaga: "BPVP SERANG",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=220&fit=crop",
  },
  {
    id: "#C34D5E6F",
    badge: "Batch 2 · 2026",
    category: "Bisnis Dan Manajemen",
    title: "Strategi Pemasaran Digital & Media Sosial",
    tags: ["Online", "Non Boarding"],
    rating: 4.8,
    reviews: 163,
    lembaga: "BBPVP BANDUNG",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=220&fit=crop",
  },
  {
    id: "#D45E6F7G",
    badge: "Batch 2 · 2026",
    category: "Kesehatan",
    title: "Perawatan Lansia dan Disabilitas Fisik",
    tags: ["Offline", "Non Boarding", "Bantuan Transport"],
    rating: 4.6,
    reviews: 88,
    lembaga: "BPVP SURABAYA",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=220&fit=crop",
  },
];

const FEATURES = [
  "Pelatihan diakui pemerintah & industri",
  "Sertifikasi BNSP & internasional",
  "Instruktur berpengalaman di bidangnya",
  "Bantuan penempatan kerja pasca pelatihan",
  "Tersedia beasiswa & subsidi penuh",
  "180+ lembaga pelatihan terpercaya",
];

/* ─────────────────────────── TYPING PLACEHOLDER ─────────────────────────── */
const PLACEHOLDERS = [
  "Aku ingin jadi barista profesional...",
  "Cari pelatihan digital marketing...",
  "Aku mau belajar las bersertifikat...",
  "Cari pelatihan gratis...",
  "Aku ingin kerja di bidang IT...",
];

function TypingInput() {
  const [displayed, setDisplayed] = useState("");
  const state = useRef({ phIndex: 0, charIdx: 0, typing: true, timer: null });

  useEffect(() => {
    const tick = () => {
      const s = state.current;
      const current = PLACEHOLDERS[s.phIndex];

      if (s.typing) {
        if (s.charIdx < current.length) {
          s.charIdx++;
          setDisplayed(current.slice(0, s.charIdx));
          s.timer = setTimeout(tick, 55);
        } else {
          s.timer = setTimeout(() => {
            s.typing = false;
            tick();
          }, 1800);
        }
      } else {
        if (s.charIdx > 0) {
          s.charIdx--;
          setDisplayed(current.slice(0, s.charIdx));
          s.timer = setTimeout(tick, 28);
        } else {
          s.phIndex = (s.phIndex + 1) % PLACEHOLDERS.length;
          s.typing = true;
          tick();
        }
      }
    };

    tick();
    return () => clearTimeout(state.current.timer);
  }, []);

  return (
    <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-6">
      <p className="text-gray-800 text-[15px] leading-relaxed min-h-[72px]">
        {displayed}
        <span className="inline-block w-0.5 h-4 bg-blue-600 ml-0.5 align-middle animate-pulse" />
      </p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <p className="text-[12px] text-gray-400">
          Ceritakan tujuan kariermu, kami carikan pelatihan yang tepat
        </p>
        <a
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-[13px] font-bold transition-colors shadow-lg shadow-blue-200"
          href="/rekomendasi"
        >
          <SendIcon /> Cari Sekarang
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────── CARDS ─────────────────────────── */
function TrainingCard({ training }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col hover:border-blue-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 group">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={training.img}
          alt={training.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 text-[11px] font-semibold text-gray-800">
          {training.badge}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-[11px] font-semibold text-blue-700">
          {training.id}
        </div>

        <div className="text-[12px] text-gray-500">{training.category}</div>

        <div className="text-[13.5px] font-bold text-gray-900 leading-snug line-clamp-2 min-h-[40px]">
          {training.title}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2 min-h-[28px]">
          {training.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-[11px] text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-end justify-between mt-3">
            <div>
              <div className="text-[10.5px] text-gray-400">Harga</div>
              <div className="text-lg font-extrabold text-gray-900">
                Terjangkau
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 mt-2 rounded-lg bg-primary hover:bg-lightprimary active:bg-lightprimary text-white text-sm font-bold transition-colors cursor-pointer">
            Lihat Pelatihan
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* ════════════════ HERO ════════════════ */}
        <section className="hero-mesh relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-28">
          <div className="blob-1" />
          <div className="blob-2" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="fade-up-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[12px] font-semibold text-blue-700 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Platform Pelatihan
              </div>

              {/* Headline */}
              <h1 className="fade-up-2 text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-gray-900 leading-[1.12] tracking-tight mb-5">
                Bangun Karier sebagai
                <br />
                <span className="text-blue-700">Talenta Vokasi</span> Unggulan
              </h1>
              <p className="fade-up-3 text-[15.5px] sm:text-[17px] text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
                Pelatihan bersertifikat, diselenggarakan oleh lembaga resmi.
                Mulai dari nol hingga siap kerja.
              </p>

              {/* Smart search box */}
              <div className="fade-up-4 max-w-2xl mx-auto">
                <TypingInput />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ STATS STRIP ════════════════ */}
        <section className="border-y border-gray-100 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-gray-100">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="stat-card flex flex-col items-center justify-center py-8 px-4 text-center transition-colors cursor-default"
                >
                  <div className="stat-value text-3xl sm:text-[2rem] font-black text-gray-900 leading-none mb-1 transition-colors duration-200">
                    {s.value}
                  </div>
                  <div className="text-[12px] text-gray-400 font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ CATEGORIES ════════════════ */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[12px] font-bold text-blue-600 uppercase tracking-widest mb-2">
                  Kejuruan
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Pilih Bidang Minatmu
                </h2>
              </div>
              <button className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold text-blue-700 hover:underline">
                Lihat semua <ChevronRight />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={i}
                  className={`category-chip flex flex-col items-center gap-2.5 px-3 py-5 rounded-2xl border transition-all duration-200 cursor-pointer ${cat.color}`}
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <div className="text-center">
                    <div className="text-[12px] font-bold leading-snug">
                      {cat.name}
                    </div>
                    <div className="text-[11px] opacity-60 mt-0.5">
                      {cat.count} pelatihan
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ POPULAR TRAININGS ════════════════ */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[12px] font-bold text-blue-600 uppercase tracking-widest mb-2">
                  Pelatihan Pilihan
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Pelatihan Paling Populer
                </h2>
              </div>
              <button className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold text-blue-700 hover:underline">
                Lihat semua <ChevronRight />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TRAININGS.map((t) => (
                <TrainingCard key={t.id} training={t} />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <a
                href="/pelatihan"
                className="flex items-center gap-2 px-8 py-3.5 border-2 border-blue-700 rounded-xl text-blue-700 font-bold text-[14px] hover:bg-blue-700 hover:text-white transition-all duration-200"
              >
                Lihat Semua Pelatihan <ArrowRight />
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════ WHY US ════════════════ */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <p className="text-[12px] font-bold text-blue-600 uppercase tracking-widest mb-3">
                  Keunggulan Kami
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                  Mengapa Ribuan Peserta
                  <br />
                  Mempercayai Alpha Solusi?
                </h2>
                <p className="text-[14.5px] text-gray-500 leading-relaxed mb-8 max-w-md">
                  Kami menghubungkan pencari kerja dengan lembaga pelatihan
                  vokasi terbaik di seluruh Indonesia, didukung penuh oleh
                  pemerintah.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {FEATURES.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle />
                      <span className="text-[13.5px] text-gray-700 leading-snug">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href="/login"
                  className="mt-8 w-fit flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-[14px] transition-colors shadow-lg shadow-blue-200"
                >
                  Mulai Daftar Gratis <ArrowRight />
                </a>
              </div>

              {/* Right: visual grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    num: "42.8K+",
                    label: "Alumni Berhasil",
                    color: "bg-blue-700",
                    text: "text-white",
                    sub: "text-blue-200",
                  },
                  {
                    num: "180+",
                    label: "Lembaga Mitra",
                    color: "bg-white border border-gray-100",
                    text: "text-gray-900",
                    sub: "text-gray-400",
                  },
                  {
                    num: "98%",
                    label: "Tingkat Kelulusan",
                    color: "bg-white border border-gray-100",
                    text: "text-gray-900",
                    sub: "text-gray-400",
                  },
                  {
                    num: "Terjangkau",
                    label: "Biaya Pelatihan",
                    color: "bg-green-600",
                    text: "text-white",
                    sub: "text-green-200",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl p-6 shadow-sm ${card.color} flex flex-col justify-between aspect-square`}
                  >
                    <div
                      className={`text-4xl font-black leading-none ${card.text}`}
                    >
                      {card.num}
                    </div>
                    <div className={`text-[13px] font-semibold ${card.sub}`}>
                      {card.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-blue-700 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-600 opacity-50" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-blue-800 opacity-60" />
            <div className="absolute top-10 left-1/3 w-2 h-2 rounded-full bg-white opacity-30 float-anim" />
            <div
              className="absolute bottom-16 right-1/4 w-3 h-3 rounded-full bg-white opacity-20 float-anim"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              Siap Mulai Perjalanan
              <br />
              Kariermu?
            </h2>
            <p className="text-[15px] text-blue-200 mb-8 leading-relaxed max-w-lg mx-auto">
              Ribuan pelatihan tersedia di seluruh Indonesia. Daftar sekarang
              dan raih sertifikat kompetensi resmi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/pelatihan"
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 text-blue-700 rounded-xl font-bold text-[15px] transition-colors shadow-xl"
              >
                Jelajahi Pelatihan
              </a>
              <a
                href="/daftar-lembaga"
                className="w-full sm:w-auto px-8 py-3.5 border-2 border-white/40 hover:border-white text-white rounded-xl font-bold text-[15px] transition-colors"
              >
                Daftar Lembaga Mitra
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
