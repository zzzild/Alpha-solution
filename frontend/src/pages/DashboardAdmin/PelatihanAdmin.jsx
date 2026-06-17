import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

// Dummy Data
const INITIAL_DATA = [
  {
    id: 1,
    title: "React.js untuk Pemula",
    price: 350000,
    duration: "8 minggu",
    accessPeriod: "3 bulan",
    totalModules: 12,
    sertificate: true,
    difficulty: "pemula",
    method: "online",
    image: "https://placehold.co/400x220/3b82f6/ffffff?text=React.js",
    description:
      "Belajar React.js dari dasar hingga membuat aplikasi web modern yang responsif.",
  },
  {
    id: 2,
    title: "UI/UX Figma Profesional",
    price: 275000,
    duration: "6 minggu",
    accessPeriod: "2 bulan",
    totalModules: 9,
    sertificate: true,
    difficulty: "menengah",
    method: "online",
    image: "https://placehold.co/400x220/ec4899/ffffff?text=UI/UX+Figma",
    description:
      "Kuasai Figma untuk desain antarmuka yang menarik dan pengalaman pengguna yang optimal.",
  },
];
const DIFFICULTY_OPTIONS = ["pemula", "menengah", "lanjutan"];
const METHOD_OPTIONS = ["online", "offline", "hybrid"];
const DURATION_OPTIONS = [
  "1 minggu",
  "2 minggu",
  "4 minggu",
  "5 minggu",
  "6 minggu",
  "8 minggu",
  "10 minggu",
  "12 minggu",
];
const ACCESS_OPTIONS = [
  "1 bulan",
  "2 bulan",
  "3 bulan",
  "4 bulan",
  "6 bulan",
  "12 bulan",
  "Selamanya",
];
const EMPTY_FORM = {
  title: "",
  price: "",
  duration: "4 minggu",
  accessPeriod: "1 bulan",
  totalModules: "",
  sertificate: false,
  difficulty: "pemula",
  method: "online",
  image: "",
  description: "",
};
const DIFFICULTY_COLOR = {
  pemula: "bg-green-50 text-green-700 border-green-200",
  menengah: "bg-amber-50 text-amber-700 border-amber-200",
  lanjutan: "bg-red-50 text-red-700 border-red-200",
};
const METHOD_COLOR = {
  online: "bg-blue-50 text-blue-600 border-blue-200",
  offline: "bg-slate-100 text-slate-600 border-slate-200",
  hybrid: "bg-purple-50 text-purple-700 border-purple-200",
};

// Component
export default function PaketPage() {
  const {paket} = useContext(AdminContext)
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("semua");

  const [modal, setModal] = useState(null);

  const handleCreate = (form) => {
    const newItem = {
      ...form,
      id: Date.now(),
      price: Number(form.price),
      totalModules: Number(form.totalModules),
    };
    setData((prev) => [newItem, ...prev]);
    setModal(null);
  };

  const handleUpdate = (form) => {
    setData((prev) =>
      prev.map((d) =>
        d.id === form.id
          ? {
              ...form,
              price: Number(form.price),
              totalModules: Number(form.totalModules),
            }
          : d,
      ),
    );
    setModal(null);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((d) => d.id !== id));
    setModal(null);
  };

  const filtered = data.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
    const matchDiff =
      filterDifficulty === "semua" || d.difficulty === filterDifficulty;
    return matchSearch && matchDiff;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manajemen Paket</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {data.length} paket terdaftar ·{" "}
            {data.filter((d) => d.difficulty === "pemula").length} untuk pemula
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "create" })}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-150 shadow-sm shadow-blue-200 cursor-pointer"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Paket
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari nama paket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-slate-50"
          />
        </div>
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-slate-600 cursor-pointer"
        >
          <option value="semua">Semua Kesulitan</option>
          {DIFFICULTY_OPTIONS.map((s) => (
            <option key={s} className="capitalize">
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">
                  Paket
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden sm:table-cell">
                  Harga
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden md:table-cell">
                  Durasi & Akses
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden lg:table-cell">
                  Modul
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden lg:table-cell">
                  Sertifikat
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden sm:table-cell">
                  Kesulitan
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden lg:table-cell">
                  Metode
                </th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-slate-400">
                    <svg
                      className="w-10 h-10 mx-auto mb-3 text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <p className="text-sm font-medium">
                      Tidak ada data ditemukan
                    </p>
                    <p className="text-xs mt-1">
                      Coba ubah filter atau tambah paket baru
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.image ||
                            "https://placehold.co/64x40/e2e8f0/94a3b8?text=No+Image"
                          }
                          alt={item.title}
                          className="w-16 h-10 object-cover rounded-lg shrink-0 border border-slate-100"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/64x40/e2e8f0/94a3b8?text=No+Image";
                          }}
                        />
                        <div>
                          <p className="font-medium text-slate-800 leading-tight">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="font-semibold text-slate-800">
                        {formatPrice(item.price)}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-slate-700 text-xs font-medium">
                        {item.duration}
                      </p>
                      <p className="text-slate-400 text-xs">
                        Akses {item.accessPeriod}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-slate-700 text-sm font-medium">
                        {item.totalModules} modul
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {item.sertificate ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Ada
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-400 border border-slate-200">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Tidak
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className={`inline-block capitalize text-xs font-medium px-2.5 py-1 rounded-full border ${DIFFICULTY_COLOR[item.difficulty]}`}
                      >
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span
                        className={`inline-block capitalize text-xs font-medium px-2.5 py-1 rounded-full border ${METHOD_COLOR[item.method]}`}
                      >
                        {item.method}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setModal({ mode: "view", item })}
                          title="Detail"
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 transition-colors cursor-pointer"
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => setModal({ mode: "edit", item })}
                          title="Edit"
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-50 text-amber-500 transition-colors cursor-pointer"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => setModal({ mode: "delete", item })}
                          title="Hapus"
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 transition-colors cursor-pointer"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>
              Menampilkan {filtered.length} dari {data.length} paket
            </span>
            <span className="hidden sm:block">
              {data.filter((d) => d.difficulty === "pemula").length} pemula ·{" "}
              {data.filter((d) => d.difficulty === "menengah").length} menengah
              · {data.filter((d) => d.difficulty === "lanjutan").length}{" "}
              lanjutan
            </span>
          </div>
        )}
      </div>

      {modal && (
        <Modal
          modal={modal}
          onClose={() => setModal(null)}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

// Modal
function Modal({ modal, onClose, onCreate, onUpdate, onDelete }) {
  const { mode, item } = modal;

  const [form, setForm] = useState(
    mode === "create" ? EMPTY_FORM : { ...item },
  );
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Nama paket wajib diisi";
    if (!form.price || Number(form.price) < 0) e.price = "Harga tidak valid";
    if (!form.totalModules || Number(form.totalModules) < 1)
      e.totalModules = "Jumlah modul minimal 1";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    mode === "create" ? onCreate(form) : onUpdate(form);
  };

  const titles = {
    create: "Tambah Paket",
    edit: "Edit Paket",
    view: "Detail Paket",
    delete: "Hapus Paket",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden flex flex-col max-h-[90vh] ${mode === "delete" ? "max-w-md" : "max-w-2xl"}`}
      >
        <div
          className={`flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0 ${mode === "delete" ? "bg-red-50" : mode === "view" ? "bg-blue-50" : "bg-white"}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${mode === "delete" ? "bg-red-100" : mode === "view" ? "bg-blue-100" : "bg-blue-600"}`}
            >
              {mode === "create" && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
              {mode === "edit" && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              )}
              {mode === "view" && (
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
              {mode === "delete" && (
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </div>
            <h2 className="font-bold text-slate-800">{titles[mode]}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
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

        <div className="overflow-y-auto flex-1 p-6">
          {mode === "delete" && (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">
                Hapus Paket?
              </h3>
              <p className="text-slate-500 text-sm mb-1">
                Anda akan menghapus paket:
              </p>
              <p className="font-semibold text-slate-800 mb-4">
                "{item.title}"
              </p>
              <p className="text-xs text-red-500 bg-red-50 rounded-lg px-4 py-2">
                Tindakan ini tidak dapat dibatalkan. Data paket akan hilang
                secara permanen.
              </p>
            </div>
          )}

          {mode === "view" && (
            <div className="space-y-5">
              <img
                src={
                  item.image ||
                  "https://placehold.co/600x200/e2e8f0/94a3b8?text=No+Image"
                }
                alt={item.title}
                className="w-full h-44 object-cover rounded-xl border border-slate-100"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x200/e2e8f0/94a3b8?text=No+Image";
                }}
              />

              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span
                      className={`capitalize text-xs font-medium px-2.5 py-0.5 rounded-full border ${DIFFICULTY_COLOR[item.difficulty]}`}
                    >
                      {item.difficulty}
                    </span>
                    <span
                      className={`capitalize text-xs font-medium px-2.5 py-0.5 rounded-full border ${METHOD_COLOR[item.method]}`}
                    >
                      {item.method}
                    </span>
                    {item.sertificate && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        Bersertifikat
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-bold text-blue-600">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>

              {item.description && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Deskripsi
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Harga", value: formatPrice(item.price) },
                  {
                    label: "Jumlah Modul",
                    value: `${item.totalModules} modul`,
                  },
                  { label: "Durasi", value: item.duration },
                  { label: "Masa Akses", value: item.accessPeriod },
                  { label: "Kesulitan", value: item.difficulty },
                  { label: "Metode", value: item.method },
                  {
                    label: "Sertifikat",
                    value: item.sertificate ? "Ada" : "Tidak Ada",
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-slate-700 capitalize">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(mode === "create" || mode === "edit") && (
            <div className="space-y-4">
              <Field label="Nama Paket" required error={errors.title}>
                <input
                  type="text"
                  placeholder="Masukkan nama paket"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  className={inputCls(errors.title)}
                />
              </Field>

              <Field label="Harga (Rp)" required error={errors.price}>
                <input
                  type="number"
                  placeholder="Contoh: 299000"
                  min={0}
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  className={inputCls(errors.price)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Durasi" required>
                  <select
                    value={form.duration}
                    onChange={(e) => set("duration", e.target.value)}
                    className={inputCls()}
                  >
                    {DURATION_OPTIONS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Masa Akses" required>
                  <select
                    value={form.accessPeriod}
                    onChange={(e) => set("accessPeriod", e.target.value)}
                    className={inputCls()}
                  >
                    {ACCESS_OPTIONS.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Jumlah Modul"
                  required
                  error={errors.totalModules}
                >
                  <input
                    type="number"
                    placeholder="Contoh: 12"
                    min={1}
                    value={form.totalModules}
                    onChange={(e) => set("totalModules", e.target.value)}
                    className={inputCls(errors.totalModules)}
                  />
                </Field>
                <Field label="Kesulitan" required>
                  <select
                    value={form.difficulty}
                    onChange={(e) => set("difficulty", e.target.value)}
                    className={inputCls()}
                  >
                    {DIFFICULTY_OPTIONS.map((d) => (
                      <option key={d} className="capitalize">
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Metode Pembelajaran" required>
                <select
                  value={form.method}
                  onChange={(e) => set("method", e.target.value)}
                  className={inputCls()}
                >
                  {METHOD_OPTIONS.map((m) => (
                    <option key={m} className="capitalize">
                      {m}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Sertifikat toggle */}
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white">
                <div>
                  <p className="text-xs font-semibold text-slate-600">
                    Sertifikat
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Peserta mendapat sertifikat setelah selesai
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => set("sertificate", !form.sertificate)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${
                    form.sertificate ? "bg-blue-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                      form.sertificate ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <Field label="URL Gambar">
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={(e) => set("image", e.target.value)}
                  className={inputCls()}
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="mt-2 w-full h-28 object-cover rounded-lg border border-slate-200"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </Field>

              <Field label="Deskripsi">
                <textarea
                  rows={3}
                  placeholder="Deskripsi singkat mengenai paket ini..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className={`${inputCls()} resize-none`}
                />
              </Field>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            {mode === "view" ? "Tutup" : "Batal"}
          </button>
          {mode === "delete" && (
            <button
              onClick={() => onDelete(item.id)}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 rounded-xl transition-all shadow-sm shadow-red-200 cursor-pointer"
            >
              Ya, Hapus
            </button>
          )}
          {(mode === "create" || mode === "edit") && (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl transition-all shadow-sm shadow-blue-200 cursor-pointer"
            >
              {mode === "create" ? "Simpan Paket" : "Simpan Perubahan"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const inputCls = (err) =>
  `w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
    err
      ? "border-red-300 bg-red-50 focus:ring-red-300/30 focus:border-red-400"
      : "border-slate-200 bg-white focus:ring-blue-500/20 focus:border-blue-400"
  }`;

const formatPrice = (price) => {
  if (price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
