import { useState, useRef } from "react";
import Navbar from "./../components/Navbar";
import Footer from "../components/Footer";

/* ─── ICONS ─── */
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
const SparkleIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3l1.88 5.76L20 10l-6.12 1.24L12 17l-1.88-5.76L4 10l6.12-1.24z" />
  </svg>
);
const CheckIcon = () => (
  <svg
    className="w-4 h-4"
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
const TrophyIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
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
const ArrowDown = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

/* ─── DATA ─── */
const BUDGET_OPTIONS = [
  "< Rp 500.000",
  "Rp 500.000 – 1.000.000",
  "Rp 1.000.000 – 2.500.000",
  "Rp 2.500.000 – 5.000.000",
  "> Rp 5.000.000",
];
const DURASI_OPTIONS = [
  "1 Hari",
  "2 – 3 Hari",
  "1 Minggu",
  "2 – 4 Minggu",
  "> 1 Bulan",
];
const LEVEL_OPTIONS = ["Pemula", "Menengah", "Lanjut", "Semua Level"];
const FASILITAS_OPTIONS = [
  "Sertifikat",
  "Modul Digital",
  "Asrama",
  "Bantuan Transport",
  "Uang Saku",
  "Semua Fasilitas",
];

const PAKET_DATA = [
  {
    id: "A",
    nama: "Paket A — Digital Office",
    harga: "Rp 1.500.000",
    hargaNum: 1500000,
    durasi: "2 – 3 Hari",
    level: "Semua Level",
    fasilitas: ["Sertifikat", "Modul Digital", "Bantuan Transport"],
    deskripsi:
      "Pelatihan administrasi perkantoran berbasis Google Workspace. Cocok untuk pemula maupun profesional yang ingin upgrade skill digital.",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=180&fit=crop",
    saw: null, // calculated dynamically
    badge: "Terpopuler",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "B",
    nama: "Paket B — Digital Marketing",
    harga: "Rp 2.500.000",
    hargaNum: 2500000,
    durasi: "1 Minggu",
    level: "Menengah",
    fasilitas: ["Sertifikat", "Modul Digital", "Uang Saku"],
    deskripsi:
      "Strategi pemasaran digital & media sosial komprehensif. Pelajari SEO, konten kreatif, dan iklan berbayar.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=180&fit=crop",
    saw: null,
    badge: null,
  },
  {
    id: "C",
    nama: "Paket C — Mobile Developer",
    harga: "Rp 4.000.000",
    hargaNum: 4000000,
    durasi: "2 – 4 Minggu",
    level: "Lanjut",
    fasilitas: ["Sertifikat", "Modul Digital", "Asrama", "Uang Saku"],
    deskripsi:
      "Kelas intensif pemrograman Android & Flutter. Dilengkapi proyek nyata dan mentoring langsung dari praktisi.",
    img: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=300&h=180&fit=crop",
    saw: null,
    badge: "Premium",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    id: "D",
    nama: "Paket D — Barista & F&B",
    harga: "Rp 800.000",
    hargaNum: 800000,
    durasi: "2 – 3 Hari",
    level: "Pemula",
    fasilitas: ["Sertifikat", "Bantuan Transport"],
    deskripsi:
      "Pelatihan barista & food and beverage profesional. Cocok untuk pemula yang ingin terjun ke industri perhotelan.",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=180&fit=crop",
    saw: null,
    badge: "Terjangkau",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    id: "E",
    nama: "Paket E — Teknik Las BNSP",
    harga: "Rp 1.200.000",
    hargaNum: 1200000,
    durasi: "1 Minggu",
    level: "Menengah",
    fasilitas: ["Sertifikat", "Modul Digital", "Asrama", "Bantuan Transport"],
    deskripsi:
      "Sertifikasi las SMAW/GMAW berstandar BNSP. Fasilitas lengkap termasuk asrama dan peralatan las profesional.",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=180&fit=crop",
    saw: null,
    badge: null,
  },
];

/* ─── SAW ALGORITHM ─── */
// Criteria: budget_fit (benefit), duration_fit (benefit), level_fit (benefit), facility_score (benefit)
// Weights: budget 0.35, duration 0.30, level 0.20, facility 0.15

const BUDGET_MAP = {
  "< Rp 500.000": 500000,
  "Rp 500.000 – 1.000.000": 1000000,
  "Rp 1.000.000 – 2.500.000": 2500000,
  "Rp 2.500.000 – 5.000.000": 5000000,
  "> Rp 5.000.000": 99999999,
};
const DURASI_ORDER = [
  "1 Hari",
  "2 – 3 Hari",
  "1 Minggu",
  "2 – 4 Minggu",
  "> 1 Bulan",
];
const WEIGHTS = { budget: 0.35, duration: 0.3, level: 0.2, facility: 0.15 };

function computeSAW(prefs) {
  const budgetMax = BUDGET_MAP[prefs.budget] || 99999999;

  const scores = PAKET_DATA.map((p) => {
    // Budget: 1 jika dalam budget, semakin jauh di atas makin rendah
    const budgetRatio = p.hargaNum <= budgetMax ? 1 : budgetMax / p.hargaNum;

    // Duration: match lebih baik = 1, tiap level beda -0.25
    const pDurIdx = DURASI_ORDER.indexOf(p.durasi);
    const uDurIdx = DURASI_ORDER.indexOf(prefs.durasi);
    const durDiff = Math.abs(pDurIdx - uDurIdx);
    const durationScore = Math.max(0, 1 - durDiff * 0.25);

    // Level: exact match = 1, "Semua Level" = 0.9, 1 level off = 0.6, else 0.3
    let levelScore = 0.3;
    if (p.level === prefs.level || p.level === "Semua Level")
      levelScore =
        prefs.level === "Semua Level"
          ? 0.85
          : p.level === prefs.level
            ? 1
            : 0.9;

    // Facility: berapa banyak preferensi yang terpenuhi
    const wantedFac =
      prefs.fasilitas === "Semua Fasilitas" ? p.fasilitas : [prefs.fasilitas];
    const matched = wantedFac.filter((f) => p.fasilitas.includes(f)).length;
    const facilityScore = matched / wantedFac.length;

    const saw =
      WEIGHTS.budget * budgetRatio +
      WEIGHTS.duration * durationScore +
      WEIGHTS.level * levelScore +
      WEIGHTS.facility * facilityScore;

    return { ...p, saw: Math.round(saw * 1000) / 1000 };
  });

  // Normalize
  const maxSaw = Math.max(...scores.map((s) => s.saw));
  return scores
    .map((s) => ({ ...s, sawNorm: Math.round((s.saw / maxSaw) * 1000) / 1000 }))
    .sort((a, b) => b.sawNorm - a.sawNorm);
}

/* ─── SELECT FIELD ─── */
function SelectField({ label, options, value, onChange }) {
  return (
    <div
      className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 group cursor-pointer"
      onClick={() => {}}
    >
      <span className="text-[14px] font-semibold text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-[13.5px] font-semibold text-blue-700 bg-transparent outline-none cursor-pointer appearance-none text-right pr-4"
          style={{ direction: "rtl" }}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronRight />
      </div>
    </div>
  );
}

/* ─── RANK BADGE ─── */
function RankBadge({ rank }) {
  const styles = [
    "bg-amber-400 text-white shadow-amber-200",
    "bg-gray-300 text-gray-700 shadow-gray-200",
    "bg-orange-300 text-white shadow-orange-200",
  ];
  const labels = ["1st", "2nd", "3rd"];
  if (rank > 3)
    return (
      <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[11px] font-bold text-gray-500">
        {rank}
      </div>
    );
  return (
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shadow-md ${styles[rank - 1]}`}
    >
      {labels[rank - 1]}
    </div>
  );
}

/* ─── SCORE BAR ─── */
function ScoreBar({ value }) {
  const pct = Math.round(value * 100);
  const color =
    pct >= 85 ? "bg-blue-600" : pct >= 65 ? "bg-blue-400" : "bg-gray-300";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11.5px] font-bold text-gray-600 w-10 text-right">
        {value.toFixed(3)}
      </span>
    </div>
  );
}

/* ─── RESULT CARD ─── */
function ResultCard({ paket, rank, isTop }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isTop ? "border-blue-300 shadow-lg shadow-blue-100" : "border-gray-100 shadow-sm"}`}
      style={{ animation: `fadeSlideUp 0.4s ease ${rank * 0.08}s both` }}
    >
      {isTop && (
        <div className="bg-blue-700 px-4 py-2 flex items-center gap-2">
          <TrophyIcon />
          <span className="text-white text-[12px] font-bold">
            Rekomendasi Terbaik — Nilai SAW Tertinggi (
            {paket.sawNorm.toFixed(3)})
          </span>
        </div>
      )}

      <div className={`p-5 flex gap-4 ${isTop ? "bg-blue-50/30" : "bg-white"}`}>
        {/* Rank */}
        <div className="flex-shrink-0 pt-1">
          <RankBadge rank={rank} />
        </div>

        {/* Image */}
        <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 hidden sm:block">
          <img
            src={paket.img}
            alt={paket.nama}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              {paket.badge && (
                <span
                  className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full mr-2 ${paket.badgeColor}`}
                >
                  {paket.badge}
                </span>
              )}
              <span className="text-[15px] font-extrabold text-gray-900">
                {paket.nama}
              </span>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-[16px] font-black text-gray-900">
                {paket.harga}
              </div>
              <div className="text-[11px] text-gray-400">{paket.durasi}</div>
            </div>
          </div>

          <p className="text-[12.5px] text-gray-500 leading-relaxed mb-3 line-clamp-2">
            {paket.deskripsi}
          </p>

          {/* Score */}
          <div className="mb-3">
            <div className="text-[11px] text-gray-400 mb-1">
              Nilai SAW (Ternormalisasi)
            </div>
            <ScoreBar value={paket.sawNorm} />
          </div>

          {/* Fasilitas */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {paket.fasilitas.map((f) => (
              <span
                key={f}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-[11px] text-gray-600"
              >
                <CheckIcon /> {f}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className={`flex-1 py-2.5 rounded-xl text-[13px] font-bold transition-colors ${isTop ? "bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-200" : "border border-blue-200 text-blue-700 hover:bg-blue-50"}`}
            >
              {isTop ? "✓  Pilih Paket Ini" : "Pilih Paket"}
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-[12px] text-gray-500 hover:bg-gray-50 transition-colors"
            >
              {expanded ? "Tutup" : "Detail"}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div
          className="px-5 pb-5 bg-gray-50 border-t border-gray-100"
          style={{ animation: "fadeSlideUp 0.25s ease both" }}
        >
          <div className="pt-4 grid sm:grid-cols-4 gap-3">
            {[
              {
                label: "Budget Score",
                val: `${Math.round(WEIGHTS.budget * 100)}%`,
              },
              {
                label: "Durasi Score",
                val: `${Math.round(WEIGHTS.duration * 100)}%`,
              },
              {
                label: "Level Score",
                val: `${Math.round(WEIGHTS.level * 100)}%`,
              },
              {
                label: "Fasilitas Score",
                val: `${Math.round(WEIGHTS.facility * 100)}%`,
              },
            ].map((c) => (
              <div
                key={c.label}
                className="bg-white rounded-xl p-3 border border-gray-100 text-center"
              >
                <div className="text-[13px] font-black text-blue-700">
                  {c.val}
                </div>
                <div className="text-[11px] text-gray-400">
                  {c.label} (bobot)
                </div>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-gray-400 mt-3 leading-relaxed">
            Metode SAW (Simple Additive Weighting) menghitung skor setiap paket
            berdasarkan empat kriteria berbobot. Paket dengan skor
            ternormalisasi tertinggi merupakan rekomendasi terbaik sesuai
            preferensi Anda.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function RekomendasiPage() {
  const [budget, setBudget] = useState(BUDGET_OPTIONS[2]);
  const [durasi, setDurasi] = useState(DURASI_OPTIONS[1]);
  const [level, setLevel] = useState(LEVEL_OPTIONS[3]);
  const [fasilitas, setFasilitas] = useState(FASILITAS_OPTIONS[5]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const handleProses = () => {
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      const ranked = computeSAW({ budget, durasi, level, fasilitas });
      setResults(ranked);
      setLoading(false);
      setTimeout(
        () =>
          resultRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        100,
      );
    }, 900);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Sora:wght@700;800&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        h1, h2 { font-family: 'Sora', sans-serif; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 0.8s linear infinite; }

        @keyframes pulse-ring {
          0%   { transform: scale(0.9); opacity: 0.7; }
          70%  { transform: scale(1.1); opacity: 0; }
          100% { transform: scale(0.9); opacity: 0; }
        }
        .pulse-ring { animation: pulse-ring 1.5s ease infinite; }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="max-w-[900px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* ── Header ── */}
          <div
            className="mb-8"
            style={{ animation: "fadeSlideUp 0.5s ease both" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[12px] font-bold text-blue-700 mb-4">
              <SparkleIcon />
              Sistem Pendukung Keputusan · Metode SAW
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
              Rekomendasi Paket
              <br />
              Training Terbaik
            </h1>
            <p className="text-[14.5px] text-gray-500 max-w-lg leading-relaxed">
              Isi kebutuhan Anda, sistem akan menghitung rekomendasi paket
              terbaik menggunakan metode{" "}
              <span className="font-semibold text-gray-700">
                Simple Additive Weighting (SAW)
              </span>{" "}
              dari PT Alpha Solusi Indonesia.
            </p>
          </div>

          {/* ── Form Card ── */}
          <div
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6"
            style={{ animation: "fadeSlideUp 0.5s ease 0.1s both" }}
          >
            <div className="px-6 pt-5 pb-1 border-b border-gray-50">
              <h2 className="text-[15px] font-bold text-gray-800">
                Pilih Kebutuhan Paket Training Anda
              </h2>
            </div>
            <div className="px-6 py-2">
              <SelectField
                label="Budget"
                options={BUDGET_OPTIONS}
                value={budget}
                onChange={setBudget}
              />
              <SelectField
                label="Durasi"
                options={DURASI_OPTIONS}
                value={durasi}
                onChange={setDurasi}
              />
              <SelectField
                label="Level"
                options={LEVEL_OPTIONS}
                value={level}
                onChange={setLevel}
              />
              <SelectField
                label="Fasilitas"
                options={FASILITAS_OPTIONS}
                value={fasilitas}
                onChange={setFasilitas}
              />
            </div>

            <div className="px-6 pb-5 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-[12px] text-gray-400 max-w-sm leading-relaxed">
                Sistem akan meranking seluruh paket berdasarkan kesesuaian
                dengan preferensi Anda menggunakan bobot kriteria SAW.
              </p>
              <button
                onClick={handleProses}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-lightprimary disabled:opacity-70 text-white rounded-xl text-[14px] font-bold transition-colors shadow-md shadow-orange-200 whitespace-nowrap cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg
                      className="spinner w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    <SparkleIcon /> Proses Rekomendasi
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ── Bobot info strip ── */}
          <div
            className="flex flex-wrap gap-2 mb-8"
            style={{ animation: "fadeSlideUp 0.5s ease 0.2s both" }}
          >
            {[
              { label: "Budget", w: "35%" },
              { label: "Durasi", w: "30%" },
              { label: "Level", w: "20%" },
              { label: "Fasilitas", w: "15%" },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-100 text-[12px]"
              >
                <span className="text-gray-500">{c.label}</span>
                <span className="font-bold text-blue-700">{c.w}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100 text-[12px] text-blue-600">
              <InfoIcon /> Bobot kriteria SAW
            </div>
          </div>

          {/* ── Results ── */}
          {results && (
            <div ref={resultRef} style={{ scrollMarginTop: "90px" }}>
              {/* Top alert */}
              <div
                className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border-l-4 border-blue-600 mb-6"
                style={{ animation: "fadeSlideUp 0.4s ease both" }}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-700 text-white text-[12px] font-bold flex items-center justify-center mt-0.5">
                  1
                </span>
                <p className="text-[13.5px] text-blue-800 leading-relaxed">
                  <span className="font-extrabold">{results[0].nama}</span>{" "}
                  adalah pilihan terbaik dengan nilai SAW tertinggi, yaitu
                  sebesar{" "}
                  <span className="font-bold">
                    {results[0].sawNorm.toFixed(3)}
                  </span>
                  . Paket ini paling sesuai dengan preferensi budget, durasi,
                  level, dan fasilitas yang Anda pilih.
                </p>
              </div>

              {/* Scroll hint */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
                  <ArrowDown />
                  {results.length} paket diranking
                </div>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-4">
                {results.map((paket, i) => (
                  <ResultCard
                    key={paket.id}
                    paket={paket}
                    rank={i + 1}
                    isTop={i === 0}
                  />
                ))}
              </div>

              {/* Bottom note */}
              <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2.5">
                <span className="text-amber-500 flex-shrink-0 mt-0.5">
                  <InfoIcon />
                </span>
                <p className="text-[12.5px] text-amber-700 leading-relaxed">
                  Hasil rekomendasi bersifat indikatif berdasarkan metode SAW.
                  Keputusan akhir tetap ada di tangan Anda. Hubungi tim kami
                  untuk konsultasi lebih lanjut.
                </p>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
