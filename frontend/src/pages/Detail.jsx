import { useState } from "react";
import Navbar from "../components/Navbar";

// Icons
const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-blue-700 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const MapPinIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const UsersIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const CertIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const ShareIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const ChevronRightIcon = () => (
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
const ChevronDownIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const InfoIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// Data
const TRAINING = {
  id: "#9FAE2E41",
  badge: "Batch 2 Tahun 2026",
  category: "Bisnis Dan Manajemen",
  title: "Digital Office Administration Berbasis Google Workspace",
  subtitle:
    "Kuasai tools produktivitas modern untuk administrasi perkantoran digital yang efisien dan profesional",
  tags: ["Offline", "Non Boarding", "Bantuan Transport"],
  reviewCount: 128,
  lembaga: "BPVP SAMARINDA",
  lembagaLogo: null,
  lokasi: "Samarinda, Kalimantan Timur",
  durasi: "200 Jam",
  kuota: 30,
  terdaftar: 24,
  mulai: "14 Juli 2026",
  selesai: "15 Agustus 2026",
  pendaftaran: "1 – 10 Juli 2026",
  sertifikasi: "Sertifikat BNSP",
  harga: "Gratis",
  img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=500&fit=crop",
  fasilitas: [
    "Bantuan Transport",
    "Modul & Materi Digital",
    "Sertifikat Kompetensi",
  ],
  persyaratan: [
    "WNI usia 17–45 tahun",
    "Pendidikan minimal SMA/SMK sederajat",
    "Memiliki KTP yang masih berlaku",
    "Belum pernah mengikuti program Prakerja",
    "Bersedia mengikuti seluruh rangkaian pelatihan",
  ],
  kompetensi: [
    "Mengelola dokumen digital menggunakan Google Docs & Drive",
    "Membuat laporan dan presentasi profesional dengan Google Slides",
    "Mengorganisasi jadwal dan agenda kerja dengan Google Calendar",
    "Berkolaborasi tim secara real-time menggunakan Google Meet",
    "Mengelola spreadsheet data menggunakan Google Sheets",
    "Membuat formulir survei dan pengumpulan data dengan Google Forms",
  ],
  kurikulum: [
    {
      minggu: "Minggu 1",
      topik: "Pengenalan Ekosistem Google Workspace",
      jp: "40 JP",
    },
    {
      minggu: "Minggu 2",
      topik: "Google Docs & Drive untuk Administrasi",
      jp: "40 JP",
    },
    {
      minggu: "Minggu 3",
      topik: "Google Sheets & Data Management",
      jp: "40 JP",
    },
    {
      minggu: "Minggu 4",
      topik: "Google Slides & Komunikasi Profesional",
      jp: "40 JP",
    },
    {
      minggu: "Minggu 5",
      topik: "Kolaborasi Tim & Ujian Sertifikasi",
      jp: "40 JP",
    },
  ],
};

// Sub-components
function Breadcrumb() {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
      {["Beranda", "Pelatihan", "Bisnis Dan Manajemen"].map((item, i, arr) => (
        <span key={item} className="flex items-center gap-1.5">
          <button
            className={
              i === arr.length - 1
                ? "text-blue-700 font-medium"
                : "hover:text-gray-600 transition-colors"
            }
          >
            {item}
          </button>
          {i < arr.length - 1 && <ChevronRightIcon />}
        </span>
      ))}
    </nav>
  );
}

function InfoBadge({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5 py-3 border-b border-gray-100 last:border-0">
      <span className="text-blue-600 flex-shrink-0">{icon}</span>
      <div>
        <div className="text-[10.5px] text-gray-400">{label}</div>
        <div className="text-[13px] font-semibold text-gray-800">{value}</div>
      </div>
    </div>
  );
}

function KurikulumItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[11px] font-bold text-blue-700 flex-shrink-0">
            {index + 1}
          </span>
          <div>
            <div className="text-[12px] text-gray-400 font-medium">
              {item.minggu}
            </div>
            <div className="text-[13.5px] font-semibold text-gray-800">
              {item.topik}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-[11px] text-gray-400 font-medium">
            {item.jp}
          </span>
          <span
            className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <ChevronDownIcon />
          </span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 bg-gray-50 border-t border-gray-100">
          <p className="text-[13px] text-gray-500">
            Peserta akan mempelajari {item.topik.toLowerCase()} secara intensif
            melalui sesi teori, praktik langsung, dan studi kasus dunia nyata.
          </p>
        </div>
      )}
    </div>
  );
}

// Main Page
export default function DetailPelatihan() {
  const [activeTab, setActiveTab] = useState("overview");
  const t = TRAINING;

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "kurikulum", label: "Kurikulum" },
    { id: "syarat", label: "Persyaratan" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.35s ease forwards; }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Breadcrumb />

          {/* ── Hero Image ── */}
          <div
            className="relative w-full rounded-2xl overflow-hidden mb-6"
            style={{ aspectRatio: "21/7" }}
          >
            <img
              src={t.img}
              alt={t.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <span className="bg-white/90 backdrop-blur-sm rounded-md px-2.5 py-1 text-[11px] font-bold text-gray-800">
                {t.badge}
              </span>
              <span className="bg-blue-700/90 backdrop-blur-sm rounded-md px-2.5 py-1 text-[11px] font-bold text-white">
                {t.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* ── Left: Main Content ── */}
            <div className="flex-1 min-w-0 fade-up">
              {/* Title block */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mb-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="text-[11px] font-semibold text-blue-600">
                    {t.id}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm hover:border-blue-300 transition-colors text-gray-600">
                      <ShareIcon />
                      <span className="hidden sm:inline text-[12px] font-medium">
                        Bagikan
                      </span>
                    </button>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-2">
                  {t.title}
                </h1>
                <p className="text-[13.5px] text-gray-500 mb-4 leading-relaxed">
                  {t.subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-[11.5px] text-gray-500 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Rating row */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                    <UsersIcon />
                    {t.terdaftar} peserta terdaftar
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                    <CertIcon />
                    {t.sertifikasi}
                  </div>
                </div>
              </div>

              {/* Lembaga strip */}
              <div className="bg-white rounded-2xl border border-gray-100 px-5 py-3.5 mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10.5px] text-gray-400">
                    Diselenggarakan oleh
                  </div>
                  <div className="text-[13.5px] font-bold text-gray-800">
                    {t.lembaga}
                  </div>
                </div>
                <button className="ml-auto text-[12px] text-blue-700 font-semibold hover:underline flex items-center gap-1">
                  Lihat profil <ChevronRightIcon />
                </button>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
                <div className="flex border-b border-gray-100 overflow-x-auto">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-3.5 text-[13px] font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${activeTab === tab.id ? "text-blue-700 border-b-2 border-blue-700 -mb-px bg-blue-50/40" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-5 sm:p-6">
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="fade-up">
                      <h2 className="text-[15px] font-bold text-gray-900 mb-3">
                        Yang Akan Kamu Pelajari
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                        {t.kompetensi.map((k) => (
                          <div key={k} className="flex items-start gap-2.5">
                            <CheckIcon />
                            <span className="text-[13px] text-gray-600 leading-snug">
                              {k}
                            </span>
                          </div>
                        ))}
                      </div>

                      <h2 className="text-[15px] font-bold text-gray-900 mb-3">
                        Fasilitas Pelatihan
                      </h2>
                      <div className="flex flex-wrap gap-2.5">
                        {t.fasilitas.map((f) => (
                          <div
                            key={f}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-100"
                          >
                            <CheckIcon />
                            <span className="text-[12.5px] font-semibold text-blue-700">
                              {f}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Kurikulum Tab */}
                  {activeTab === "kurikulum" && (
                    <div className="fade-up">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[15px] font-bold text-gray-900">
                          Kurikulum Pelatihan
                        </h2>
                        <span className="text-[12px] text-gray-400">
                          {t.kurikulum.length} minggu · {t.durasi}
                        </span>
                      </div>
                      {t.kurikulum.map((item, i) => (
                        <KurikulumItem key={i} item={item} index={i} />
                      ))}
                    </div>
                  )}

                  {/* Persyaratan Tab */}
                  {activeTab === "syarat" && (
                    <div className="fade-up">
                      <h2 className="text-[15px] font-bold text-gray-900 mb-3">
                        Persyaratan Pendaftaran
                      </h2>
                      <div className="flex flex-col gap-3">
                        {t.persyaratan.map((s, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100"
                          >
                            <span className="w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[10px] font-bold text-white">
                                {i + 1}
                              </span>
                            </span>
                            <span className="text-[13px] text-gray-700 leading-snug">
                              {s}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2.5">
                        <span className="text-amber-500 flex-shrink-0 mt-0.5">
                          <InfoIcon />
                        </span>
                        <p className="text-[12.5px] text-amber-700 leading-relaxed">
                          Pastikan semua dokumen persyaratan sudah disiapkan
                          sebelum mendaftar. Pendaftaran yang tidak lengkap
                          tidak akan diproses.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Right: Sticky Card ── */}
            <aside className="w-full lg:w-[300px] flex-shrink-0 sticky top-[76px] fade-up">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                {/* Price */}
                <div className="px-5 pt-5 pb-4 border-b border-gray-100">
                  <div className="text-[10.5px] text-gray-400 mb-0.5">
                    Biaya Pelatihan
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-1">
                    Gratis
                  </div>
                  <div className="flex items-center gap-1.5 text-[11.5px] text-green-600 font-semibold">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Dibiayai Pemerintah
                  </div>
                </div>

                {/* Info list */}
                <div className="px-5 py-1">
                  <InfoBadge
                    icon={<CalendarIcon />}
                    label="Periode Pelatihan"
                    value={`${t.mulai} – ${t.selesai}`}
                  />
                  <InfoBadge
                    icon={<ClockIcon />}
                    label="Durasi"
                    value={t.durasi}
                  />
                  <InfoBadge
                    icon={<MapPinIcon />}
                    label="Lokasi"
                    value={t.lokasi}
                  />
                  <InfoBadge
                    icon={<CertIcon />}
                    label="Sertifikasi"
                    value={t.sertifikasi}
                  />
                </div>

                {/* Pendaftaran notice */}
                <div className="mx-5 mb-4 mt-1 p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="text-[10.5px] text-blue-600 font-semibold mb-0.5">
                    Masa Pendaftaran
                  </div>
                  <div className="text-[12.5px] font-bold text-blue-800">
                    {t.pendaftaran}
                  </div>
                </div>

                {/* CTA */}
                <div className="px-5 pb-5 flex flex-col gap-2.5">
                  <button className="w-full py-3 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white rounded-xl text-[14px] font-bold shadow-md shadow-blue-200 transition-colors cursor-pointer">
                    Daftar Sekarang
                  </button>
                  <button className="w-full py-3 border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer">
                    Hubungi Lembaga
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
