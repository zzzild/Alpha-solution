import { useState, useEffect, useRef } from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Hero from "../components/Hero";
import Statistik from "../components/Statistik";
import Category from "../components/Category";
import PaketCard from "../components/PaketCard";

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
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-lightprimary text-white rounded-xl text-[13px] font-bold transition-colors shadow-lg shadow-orange-200"
          href="/rekomendasi"
        >
          <SendIcon /> Cari Sekarang
        </a>
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
        <Hero TypingInput={TypingInput} />

        {/* ════════════════ STATS STRIP ════════════════ */}
        <Statistik />

        {/* ════════════════ CATEGORIES ════════════════ */}
        <Category />

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
              <a
                href="/pelatihan"
                className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold text-blue-700 hover:underline"
              >
                Lihat semua <ChevronRight />
              </a>
            </div>

            <PaketCard/>

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
                  Kami menghubungkan pencari kerja dengan lembaga pelatihan di
                  seluruh Indonesia, didukung penuh oleh pemerintah.
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
                  className="mt-8 w-fit flex items-center gap-2 px-6 py-3 bg-primary hover:bg-lightprimary text-white rounded-xl font-bold text-[14px] transition-colors shadow-lg shadow-orange-200"
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
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
