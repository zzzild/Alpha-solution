import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";

// Icons
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

// Sub-Components
function Logo() {
  return (
    <div className="flex items-center gap-1.5 cursor-pointer flex-shrink-0">
      <a
        href="/"
        className="text-[17px] font-extrabold tracking-tight leading-none text-orange-700"
      >
        APLHA SOLUSI
      </a>
    </div>
  );
}

// Desktop Navigation Item with Dropdown
function NavDropdown({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          `flex items-center gap-1 px-2 py-1.5 text-sm font-medium rounded-md transition-colors ${
            isActive ? "text-blue-700" : "text-gray-700 hover:text-blue-700"
          }`
        }
      >
        {item.label}
        {item.hasDropdown && (
          <span
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <ChevronDown />
          </span>
        )}
      </NavLink>
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

// Mobile Navigation Item
function MobileNavItem({ item }) {
  return (
    <div className="border-b border-gray-100">
      <NavLink
        to={item.href}
        className="block px-5 py-4 text-[15px] font-medium text-gray-800 border-b border-gray-100"
      >
        {item.label}
      </NavLink>

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

// Main Component
export default function Navbar() {
  const { token, userData } = useContext(AppContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Rekomendasi", href: "/rekomendasi" },
    { label: "Pelatihan", href: "/pelatihan" },

    ...(token
      ? [
          {
            label: "Pemesanan",
            href: "/pemesanan",
          },
        ]
      : []),
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-[60px] flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700 p-1 hover:text-blue-700 transition-colors flex-shrink-0"
          >
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>

          <Logo />

          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {navItems.map((item, i) => (
              <NavDropdown key={i} item={item} />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {!token && !userData ? (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:border-blue-400 transition-colors"
                >
                  Masuk
                </NavLink>

                <NavLink
                  to="/register"
                  className="px-4 py-2 bg-primary hover:bg-lightprimary text-white rounded-lg text-sm font-semibold shadow-md shadow-orange-200 transition-colors"
                >
                  Daftar
                </NavLink>
              </>
            ) : (
              <NavLink to="/profile">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:scale-105 transition">
                  {userData?.nameUser
                    ? userData.nameUser[0].toUpperCase()
                    : ""}
                </div>
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] z-40 bg-black/40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-[60px] left-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-50 overflow-y-auto shadow-2xl transition-transform duration-250 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          animation: mobileMenuOpen ? "slideIn 0.22s ease" : "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-gray-100">
          {!token ? (
            <div className="flex gap-2 mt-4">
              <NavLink
                to="/login"
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 text-center"
              >
                Masuk
              </NavLink>

              <NavLink
                to="/register"
                className="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold text-center"
              >
                Daftar
              </NavLink>
            </div>
          ) : (
            <div className="font-semibold text-gray-700">
              {userData?.nameUser}
            </div>
          )}
        </div>

        {navItems.map((item, i) => (
          <MobileNavItem key={i} item={item} />
        ))}
      </div>
    </>
  );
}