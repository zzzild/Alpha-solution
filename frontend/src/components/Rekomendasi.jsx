import { useState } from "react";
import Navbar from "./Navbar";

// Icons
const LogoIcon = () => (
  <svg
    className="w-3.5 h-3.5"
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
);
const ChevronDown = () => (
  <svg
    className="w-3.5 h-3.5"
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
const FilterIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
    <polyline
      points="2,6 5,9 10,3"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const XIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Data
const FILTER_SECTIONS = [
  { title: "Tipe Pelatihan", items: ["Offline", "Online", "Blended"] },
  { title: "Metode Pelatihan", items: ["Boarding", "Non Boarding", "MTU"] },
  {
    title: "Batch Nasional",
    items: ["Batch 1 Tahun 2026", "Batch 2 Tahun 2026"],
  },
  {
    title: "Fasilitas",
    items: [
      "Asrama (Bagi Peserta yang Jauh)",
      "Asrama (Seluruh Peserta)",
      "Bantuan Transport",
      "Uang Saku",
    ],
  },
];
const LOKASI = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Timur",
  "Kalimantan Timur",
  "Sumatera Barat",
  "Sulawesi Selatan",
];
const KEJURUAN = [
  "Bisnis Dan Manajemen",
  "Teknik Listrik",
  "Pariwisata",
  "Teknologi Informasi",
  "Konstruksi",
  "Kesehatan",
];
const URUTAN = ["Terbaru", "Rating Tertinggi", "Gratis Dulu", "A-Z"];
const TRAININGS = [
  {
    id: "#9FAE2E41",
    badge: "Batch 2 Tahun 2026",
    category: "Bisnis Dan Manajemen",
    title: "DIGITAL OFFICE ADMINISTRATION BERBASIS GOOGLE WORKSPACE",
    tags: ["Offline", "Non Boarding", "Bantuan Transport"],
    rating: 4.9,
    lembaga: "BPVP SAMARINDA",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=220&fit=crop",
  },
  {
    id: "#5E82168D",
    badge: "Batch 2 Tahun 2026",
    category: "Teknik Listrik",
    title: "Pemasangan Instalasi Listrik Skala Rumah Tangga",
    tags: ["Offline", "MTU", "Bantuan Transport"],
    rating: 0,
    lembaga: "BPVP PADANG",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=220&fit=crop",
  },
  {
    id: "#937F5F6C",
    badge: "Batch 2 Tahun 2026",
    category: "Pariwisata",
    title: "Penyiapan Produk Roti",
    tags: ["Offline", "Non Boarding", "Bantuan Transport"],
    rating: 0,
    lembaga: "BBPVP MEDAN",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=220&fit=crop",
  },
  {
    id: "#A12B3C4D",
    badge: "Batch 2 Tahun 2026",
    category: "Teknologi Informasi",
    title: "Pemrograman Aplikasi Mobile Berbasis Android",
    tags: ["Online", "Bantuan Transport"],
    rating: 4.7,
    lembaga: "BPVP JAKARTA",
    img: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=220&fit=crop",
  },
  {
    id: "#B23C4D5E",
    badge: "Batch 2 Tahun 2026",
    category: "Konstruksi",
    title: "Teknik Las SMAW Posisi 3G Bersertifikat BNSP",
    tags: ["Offline", "Boarding", "Uang Saku"],
    rating: 4.5,
    lembaga: "BPVP SERANG",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=220&fit=crop",
  },
  {
    id: "#C34D5E6F",
    badge: "Batch 2 Tahun 2026",
    category: "Bisnis Dan Manajemen",
    title: "Strategi Pemasaran Digital & Media Sosial",
    tags: ["Online", "Non Boarding"],
    rating: 4.8,
    lembaga: "BBPVP BANDUNG",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=220&fit=crop",
  },
  {
    id: "#D45E6F7G",
    badge: "Batch 2 Tahun 2026",
    category: "Kesehatan",
    title: "Perawatan Lansia dan Disabilitas Fisik",
    tags: ["Offline", "Non Boarding", "Bantuan Transport"],
    rating: 4.6,
    lembaga: "BPVP SURABAYA",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=220&fit=crop",
  },
  {
    id: "#E56F7G8H",
    badge: "Batch 2 Tahun 2026",
    category: "Pariwisata",
    title: "Barista Kopi Profesional Bersertifikat BNSP",
    tags: ["Offline", "Boarding", "Uang Saku"],
    rating: 4.9,
    lembaga: "BPVP MAKASSAR",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=220&fit=crop",
  },
  {
    id: "#F67G8H9I",
    badge: "Batch 2 Tahun 2026",
    category: "Pertanian",
    title: "Budidaya Tanaman Hortikultura Modern",
    tags: ["Offline", "Boarding", "Bantuan Transport"],
    rating: 4.2,
    lembaga: "BPVP LOMBOK",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=220&fit=crop",
  },
];

// Components
function SelectDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm cursor-pointer hover:border-blue-300 transition-colors"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: value ? 500 : 400,
          color: value ? "#1a1a2e" : "#9ca3af",
        }}
      >
        {value || label}
        <ChevronDown />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
            <button
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-50"
            >
              Semua {label}
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${value === opt ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function FilterAccordion({ title, items, selected, onToggle }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-3 mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-gray-800"
      >
        {title}
        <span
          className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <ChevronDown />
        </span>
      </button>
      {open && (
        <div className="flex flex-col gap-2.5 pl-0.5">
          {items.map((item) => (
            <label
              key={item}
              htmlFor={`filter-${item}`}
              className="flex items-start gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                id={`filter-${item}`}
                checked={selected.includes(item)}
                onChange={() => onToggle(item)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded flex-shrink-0 mt-0.5 border flex items-center justify-center transition-all duration-150 ${selected.includes(item) ? "bg-blue-700 border-blue-700" : "border-gray-300 bg-white group-hover:border-blue-400"}`}
              >
                {selected.includes(item) && <CheckIcon />}
              </div>
              <span className="text-[13px] text-gray-600 leading-snug">
                {item}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

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

      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <div className="text-[11px] font-semibold text-blue-700">
          {training.id}
        </div>
        <div className="text-[12px] text-gray-500">{training.category}</div>
        <div className="text-[13.5px] font-bold text-gray-900 leading-snug line-clamp-2">
          {training.title}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {training.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-[11px] text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between mt-2">
          <div>
            <div className="text-[10.5px] text-gray-400">Harga</div>
            <div className="text-lg font-extrabold text-gray-900">Gratis</div>
          </div>
        </div>

        <button className="w-full py-2.5 mt-2 rounded-lg bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white text-sm font-bold transition-colors cursor-pointer">
          Lihat Pelatihan
        </button>
      </div>

      <div className="px-4 py-2.5 border-t border-gray-100 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-md bg-blue-700 flex items-center justify-center flex-shrink-0">
          <LogoIcon />
        </div>
        <div>
          <div className="text-[9.5px] text-gray-400">Lembaga pelatihan</div>
          <div className="text-[11.5px] font-bold text-gray-800">
            {training.lembaga}
          </div>
        </div>
      </div>
    </div>
  );
}

// Page
export default function PelatihanPage() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [lokasi, setLokasi] = useState("");
  const [kejuruan, setKejuruan] = useState("");
  const [urutan, setUrutan] = useState("");

  const toggleFilter = (item) =>
    setSelectedFilters((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item],
    );

  const filtered = TRAININGS.filter((t) => {
    if (kejuruan && t.category !== kejuruan) return false;
    if (selectedFilters.length > 0) {
      const hasTag = selectedFilters.some(
        (f) => t.tags.includes(f) || t.badge.includes(f),
      );
      if (!hasTag) return false;
    }
    return true;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes slideUp { from { transform:translateY(100%); } to { transform:translateY(0); } }
      `}</style>

      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />

        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
            Pelatihan Vokasi Nasional
          </h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <SelectDropdown
              label="Lokasi"
              options={LOKASI}
              value={lokasi}
              onChange={setLokasi}
            />
            <SelectDropdown
              label="Kejuruan"
              options={KEJURUAN}
              value={kejuruan}
              onChange={setKejuruan}
            />
            <SelectDropdown
              label="Urutkan"
              options={URUTAN}
              value={urutan}
              onChange={setUrutan}
            />
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className={`lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors cursor-pointer ${selectedFilters.length > 0 ? "border-blue-400 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-600"}`}
            >
              <FilterIcon />
              Filters{" "}
              {selectedFilters.length > 0 && `(${selectedFilters.length})`}
            </button>
          </div>

          {/* Active filter chips */}
          {selectedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFilter(f)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  {f} <span className="text-sm leading-none">×</span>
                </button>
              ))}
              <button
                onClick={() => setSelectedFilters([])}
                className="px-3 py-1 text-xs text-gray-400 underline"
              >
                Hapus semua
              </button>
            </div>
          )}

          {/* Layout: Sidebar + Cards */}
          <div className="flex gap-6 items-start">
            {/* Sidebar — desktop only */}
            <aside className="hidden lg:block w-[220px] flex-shrink-0 bg-white rounded-xl border border-gray-100 p-5 sticky top-[76px]">
              <h2 className="text-base font-bold text-gray-900 mb-2">Filter</h2>
              {FILTER_SECTIONS.map((s) => (
                <FilterAccordion
                  key={s.title}
                  title={s.title}
                  items={s.items}
                  selected={selectedFilters}
                  onToggle={toggleFilter}
                />
              ))}
            </aside>

            {/* Cards grid */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-bold text-gray-900">
                  {filtered.length}
                </span>{" "}
                pelatihan ditemukan
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((t) => (
                  <TrainingCard key={t.id} training={t} />
                ))}
              </div>

              {/* Load more */}
              <div className="flex justify-center mt-10">
                <button className="px-8 py-3 border border-blue-700 rounded-lg text-blue-700 font-bold text-sm hover:bg-blue-700 hover:text-white transition-all duration-200 cursor-pointer">
                  Muat lebih banyak
                </button>
              </div>
            </div>
          </div>
        </main>

        {mobileFilterOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileFilterOpen(false)}
          />
        )}

        {/* Mobile Filter Bottom Sheet */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto shadow-2xl transition-transform duration-300 ${mobileFilterOpen ? "translate-y-0" : "translate-y-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
            <span className="text-base font-bold text-gray-900">Filter</span>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="text-gray-500 cursor-pointer"
            >
              <XIcon />
            </button>
          </div>
          <div className="px-5 pb-8">
            {FILTER_SECTIONS.map((s) => (
              <FilterAccordion
                key={s.title}
                title={s.title}
                items={s.items}
                selected={selectedFilters}
                onToggle={toggleFilter}
              />
            ))}
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 mt-4 bg-blue-700 text-white rounded-xl font-bold text-sm cursor-pointer hover:bg-blue-800 transition-colors"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
