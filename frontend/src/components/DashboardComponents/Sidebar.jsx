import { useLocation, Link } from "react-router-dom";
import { HomeIcon, BoxIcon, PersonIcon } from "../Icons";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const NAV_ITEMS = [
  {
    group: null,
    items: [
      {
        to: "/admin",
        label: "Dasbor",
        icon: <HomeIcon />,
      },
    ],
  },
  {
    group: "Manajemen",
    items: [
      {
        to: "/admin/paket-pelatihan",
        label: "Paket Pelatihan",
        icon: <BoxIcon />,
      },
      {
        to: "/admin/pemesanan",
        label: "Pemesanan",
        icon: <PersonIcon />,
      },
    ],
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const {setAToken} = useContext(AdminContext)
  const logout = () => {
    localStorage.removeItem("aToken");
    setAToken("");
    window.location.href = "/";
    toast.success('Keluar Admin')
  };

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
          className="md:hidden flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
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
                {typeof icon === "string" ? (
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
                ) : (
                  <span className="w-5 h-5 shrink-0">{icon}</span>
                )}

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
          <button onClick={logout} className="mt-2.5 w-full flex items-center cursor-pointer justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-red-500/70 hover:bg-red-500/90 active:bg-red-600 rounded-lg transition-all duration-200">
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
