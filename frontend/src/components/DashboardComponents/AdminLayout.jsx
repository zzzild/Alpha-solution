import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const dismissAlert = (id) =>
    setAlerts((prev) => prev.filter((a) => a.id !== id));

  const addAlert = (type, message) =>
    setAlerts((prev) => [...prev, { id: Date.now(), type, message }]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 md:hidden ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-4 md:px-6 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 transition-all duration-150"
            aria-label="Buka menu navigasi"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <nav className="flex items-center gap-2 text-sm">
            <span className="text-blue-600 font-semibold">Dasbor Admin</span>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-sm font-medium text-slate-700">Admin</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 space-y-4">
          <div className="space-y-2">
            {alerts.map((alert) => (
              <AlertBanner
                key={alert.id}
                alert={alert}
                onDismiss={dismissAlert}
              />
            ))}
          </div>

          <Outlet context={{ addAlert }} />
        </main>

        <Footer />
      </div>
    </div>
  );
};

const ALERT_VARIANTS = {
  message: {
    wrapper:
      "bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 text-blue-800",
    icon: "bg-blue-100 text-blue-600",
    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  success: {
    wrapper: "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800",
    icon: "bg-emerald-100 text-emerald-600",
    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  error: {
    wrapper: "bg-red-50 border-l-4 border-red-500 text-red-800",
    icon: "bg-red-100 text-red-600",
    d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

const AlertBanner = ({ alert, onDismiss }) => {
  const v = ALERT_VARIANTS[alert.type] || ALERT_VARIANTS.message;
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl ${v.wrapper} animate-fade-in`}
    >
      <div
        className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${v.icon}`}
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
            d={v.d}
          />
        </svg>
      </div>
      <p className="flex-1 text-sm font-medium leading-relaxed">
        {alert.message}
      </p>
      <button
        onClick={() => onDismiss(alert.id)}
        className="opacity-50 hover:opacity-100 transition-opacity mt-0.5 shrink-0"
        aria-label="Tutup notifikasi"
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
  );
};

export default AdminLayout;
