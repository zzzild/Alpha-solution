import { useLocation, Link } from "react-router-dom";

const NAV_ITEMS = [
  {
    group: null,
    items: [
      {
        to: "/dashboard",
        label: "Dasbor",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        stroke: true,
      },
    ],
  },
  {
    group: "Rekrutmen",
    items: [
      {
        to: "/dashboard/rekrutmen",
        label: "Data Rekrutmen",
        icon: "M11 12q-1.65 0-2.825-1.175T7 8t1.175-2.825T11 4t2.825 1.175T15 8t-1.175 2.825T11 12m11.1 13.5l-3.2-3.2q-.525.3-1.125.5T16.5 21q-1.875 0-3.187-1.312T12 16.5t1.313-3.187T16.5 12t3.188 1.313T21 16.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2zm-3.825-5.225Q19 17.55 19 16.5t-.725-1.775T16.5 14t-1.775.725T14 16.5t.725 1.775T16.5 19t1.775-.725M3 20v-2.775q0-.85.425-1.575t1.175-1.1q1.275-.65 2.875-1.1t3.55-.45q-.3.45-.513.963t-.337 1.062q-1.5.125-2.675.513t-1.975.812q-.25.125-.387.363T5 17.225V18h5.175q.125.55.338 1.05t.512.95z",
        stroke: false,
      },
    ],
  },
  {
    group: "Akun",
    items: [
      {
        to: "/dashboard/profil",
        label: "Profil",
        icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        stroke: true,
      },
    ],
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
      isActive(path)
        ? "bg-white/20 text-white shadow-sm"
        : "text-blue-100 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col
        bg-gradient-to-b from-blue-700 via-blue-800 to-indigo-900
        shadow-2xl transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between h-16 px-4 bg-black/20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md p-1 shrink-0">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-white font-bold text-base tracking-tight">
            ALPHA SOLUSI
          </span>
        </div>

        {/* Tombol tutup – hanya tampil di mobile */}
        <button
          onClick={onClose}
          className="md:hidden flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Tutup menu"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* ── Navigasi ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 pb-28 scrollbar-thin scrollbar-thumb-white/10">
        {NAV_ITEMS.map(({ group, items }) => (
          <div key={group ?? "__root"}>
            {group && (
              <p className="px-3 mt-4 mb-1 text-[10px] font-bold text-blue-300 uppercase tracking-widest">
                {group}
              </p>
            )}
            {items.map(({ to, label, icon, stroke }) => (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={linkClass(to)}
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  fill={stroke ? "none" : "currentColor"}
                  stroke={stroke ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap={stroke ? "round" : undefined}
                    strokeLinejoin={stroke ? "round" : undefined}
                    strokeWidth={stroke ? 2 : undefined}
                    d={icon}
                  />
                </svg>
                <span>{label}</span>
                {isActive(to) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* ── Profil bawah ── */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-indigo-950 via-indigo-950/90 to-transparent">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white/30 to-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-white">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                Administrator
              </p>
              <p className="text-xs text-blue-300 truncate">Super Admin</p>
            </div>
          </div>
          <button className="mt-2.5 w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-red-500/70 hover:bg-red-500/90 active:bg-red-600 rounded-lg transition-all duration-200">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Keluar
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
