import { useState } from "react";

// Icons
const SearchIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const MenuIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
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
const ChevronDown = ({ cls = "w-3.5 h-3.5" }) => (
  <svg
    className={cls}
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

// Dummy Data
const NAV_ITEMS = [
  {
    label: "Kejuruan",
    hasDropdown: true,
    items: [
      "Teknologi Informasi",
      "Konstruksi",
      "Pertanian",
      "Kesehatan",
      "Pariwisata",
    ],
  },
  {
    label: "Pelatihan",
    hasDropdown: true,
    items: [
      "Pelatihan Online",
      "Pelatihan Tatap Muka",
      "Pelatihan Mandiri",
      "Sertifikasi",
    ],
  },
  { label: "Magang" },
  { label: "Akreditasi" },
  {
    label: "Mitra",
    hasDropdown: true,
    items: ["Mitra Pelatihan", "Mitra Industri", "Mitra Pemerintah"],
  },
  {
    label: "Panduan",
    hasDropdown: true,
    items: ["Panduan Peserta", "Panduan Penyelenggara"],
  },
];

// Sub-Components
function Logo() {
  return (
    <div className="flex items-center gap-1.5 cursor-pointer flex-shrink-0">
      {/* logo */}
      <a
        href="/"
        className="text-[17px] font-extrabold tracking-tight leading-none text-orange-700"
      >
        APLHA SOLUSI
      </a>
    </div>
  );
}

function NavDropdown({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`flex items-center gap-1 px-2 py-1.5 text-sm font-medium rounded-md transition-colors ${open ? "text-blue-700" : "text-gray-700 hover:text-blue-700"}`}
      >
        {item.label}
        {item.hasDropdown && (
          <span
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <ChevronDown />
          </span>
        )}
      </button>
      {item.hasDropdown && open && (
        <div className="absolute top-full left-0 pt-2 w-52 z-50">
          <div className="bg-white rounded-xl shadow-xl border border-blue-50 py-1.5 animate-[fadeIn_0.15s_ease]">
            {item.items.map((sub) => (
              <button
                key={sub}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile Nav Item dengan sub-menu accordion
function MobileNavItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-[15px] font-medium text-gray-800 text-left"
        onClick={() => item.hasDropdown && setOpen(!open)}
      >
        {item.label}
        {item.hasDropdown && (
          <span
            className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          >
            <ChevronRight />
          </span>
        )}
      </button>

      {/* Sub-menu accordion */}
      {item.hasDropdown && open && (
        <div className="bg-gray-50 pb-1">
          {item.items.map((sub) => (
            <button
              key={sub}
              className="w-full text-left px-8 py-3 text-sm text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Navbar
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { transform:translateX(-100%); } to { transform:translateX(0); } }
      `}</style>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-[60px] flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700 p-1 hover:text-blue-700 transition-colors flex-shrink-0"
          >
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>

          <Logo />

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV_ITEMS.map((item, i) => (
              <NavDropdown key={i} item={item} />
            ))}
          </div>

          {/* Desktop search */}
          <div
            className={`hidden lg:flex items-center flex-[0_1_440px] bg-gray-100 rounded-lg px-3 gap-2 transition-all duration-200 ${searchFocused ? "ring-2 ring-blue-500 bg-white" : ""}`}
          >
            <span className="text-gray-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Cari pelatihan, lokasi pelatihan, mitra, dll"
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 py-2.5 placeholder:text-gray-400"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <button className="text-gray-400 hover:text-gray-600"></button>
          </div>

          {/* Mobile search icon */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="lg:hidden text-gray-600 p-1 ml-auto flex-shrink-0"
          >
            <SearchIcon />
          </button>

          {/* Desktop auth buttons */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <a
              href="/login"
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:border-blue-400 transition-colors"
            >
              Masuk
            </a>
            <a
              href="/register"
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-200 transition-colors"
            >
              Daftar
            </a>
          </div>
        </div>

        {/* Mobile search bar */}
        {mobileSearchOpen && (
          <div className="lg:hidden px-4 pb-3">
            <div className="flex items-center bg-white rounded-lg px-3 gap-2 ring-2 ring-blue-500">
              <span className="text-gray-400">
                <SearchIcon />
              </span>
              <input
                autoFocus
                type="text"
                placeholder="Cari pelatihan..."
                className="flex-1 bg-transparent border-none outline-none text-sm py-2.5"
              />
            </div>
          </div>
        )}
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] z-40 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-[60px] left-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-50 overflow-y-auto shadow-2xl transition-transform duration-250 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ animation: mobileMenuOpen ? "slideIn 0.22s ease" : "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-gray-100">
          <Logo />
          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:border-blue-400 transition-colors">
              Masuk
            </button>
            <button className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold transition-colors">
              Daftar
            </button>
          </div>
        </div>

        {NAV_ITEMS.map((item, i) => (
          <MobileNavItem key={i} item={item} />
        ))}
      </div>
    </>
  );
}
