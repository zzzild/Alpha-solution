import { useState } from "react";

/* ─────────────────────────── Data awal ─────────────────────────── */
const INITIAL_DATA = [
  {
    id: 1,
    title: "Pemrograman Web dengan React.js",
    category: "Teknologi",
    instructor: "Budi Santoso",
    startDate: "2026-05-05",
    endDate: "2026-06-30",
    maxParticipants: 40,
    sessions: "3× seminggu",
    status: "berlangsung",
    description:
      "Mempelajari dasar hingga lanjutan React.js untuk membangun aplikasi web modern.",
  },
  {
    id: 2,
    title: "Desain UI/UX Figma untuk Pemula",
    category: "Desain",
    instructor: "Rina Marlina",
    startDate: "2026-05-10",
    endDate: "2026-06-25",
    maxParticipants: 30,
    sessions: "2× seminggu",
    status: "berlangsung",
    description:
      "Belajar desain antarmuka menggunakan Figma dari nol hingga siap kerja.",
  },
  {
    id: 3,
    title: "Analisis Data dengan Python & Pandas",
    category: "Data Science",
    instructor: "Ahmad Fauzi",
    startDate: "2026-05-01",
    endDate: "2026-06-15",
    maxParticipants: 25,
    sessions: "4× seminggu",
    status: "berlangsung",
    description:
      "Eksplorasi dan analisis data menggunakan Python, Pandas, dan visualisasi dasar.",
  },
  {
    id: 4,
    title: "Digital Marketing & SEO",
    category: "Pemasaran",
    instructor: "Siti Rahmawati",
    startDate: "2026-05-15",
    endDate: "2026-07-10",
    maxParticipants: 35,
    sessions: "2× seminggu",
    status: "berlangsung",
    description:
      "Strategi pemasaran digital, optimasi mesin pencari, dan media sosial.",
  },
  {
    id: 5,
    title: "Manajemen Proyek Agile",
    category: "Manajemen",
    instructor: "Dwi Prasetyo",
    startDate: "2026-06-05",
    endDate: "2026-07-20",
    maxParticipants: 25,
    sessions: "2× seminggu",
    status: "akan datang",
    description:
      "Memahami metodologi Agile, Scrum, dan Kanban untuk manajemen proyek modern.",
  },
];

const CATEGORIES = [
  "Teknologi",
  "Desain",
  "Data Science",
  "Pemasaran",
  "Manajemen",
  "Lainnya",
];
const SESSIONS_OPTIONS = [
  "1× seminggu",
  "2× seminggu",
  "3× seminggu",
  "4× seminggu",
  "5× seminggu",
];
const STATUS_OPTIONS = ["akan datang", "berlangsung", "selesai"];

const EMPTY_FORM = {
  title: "",
  category: "Teknologi",
  instructor: "",
  startDate: "",
  endDate: "",
  maxParticipants: "",
  sessions: "2× seminggu",
  status: "akan datang",
  description: "",
};

const CAT_COLOR = {
  Teknologi: "bg-blue-100 text-blue-700",
  Desain: "bg-pink-100 text-pink-700",
  "Data Science": "bg-emerald-100 text-emerald-700",
  Pemasaran: "bg-amber-100 text-amber-700",
  Manajemen: "bg-violet-100 text-violet-700",
  Lainnya: "bg-slate-100 text-slate-600",
};

const STATUS_COLOR = {
  berlangsung: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "akan datang": "bg-amber-50 text-amber-700 border-amber-200",
  selesai: "bg-slate-100 text-slate-500 border-slate-200",
};

/* ─────────────────────────── Komponen utama ─────────────────────── */
export default function PelatihanPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("semua");
  const [filterStatus, setFilterStatus] = useState("semua");

  // Modal state: null | { mode: "create"|"edit"|"view"|"delete", item?: object }
  const [modal, setModal] = useState(null);

  /* ── CRUD handlers ── */
  const handleCreate = (form) => {
    const newItem = {
      ...form,
      id: Date.now(),
      maxParticipants: Number(form.maxParticipants),
    };
    setData((prev) => [newItem, ...prev]);
    setModal(null);
  };

  const handleUpdate = (form) => {
    setData((prev) =>
      prev.map((d) =>
        d.id === form.id
          ? { ...form, maxParticipants: Number(form.maxParticipants) }
          : d,
      ),
    );
    setModal(null);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((d) => d.id !== id));
    setModal(null);
  };

  /* ── Filter ── */
  const filtered = data.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.instructor.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "semua" || d.category === filterCat;
    const matchStatus = filterStatus === "semua" || d.status === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Manajemen Pelatihan
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {data.length} pelatihan terdaftar ·{" "}
            {data.filter((d) => d.status === "berlangsung").length} sedang
            berjalan
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "create" })}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-150 shadow-sm shadow-blue-200"
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
          Tambah Pelatihan
        </button>
      </div>

      {/* ── Filter bar ── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        {/* Search */}
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
            placeholder="Cari pelatihan atau instruktur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-slate-50"
          />
        </div>
        {/* Kategori */}
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-slate-600"
        >
          <option value="semua">Semua Kategori</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {/* Status */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-slate-600"
        >
          <option value="semua">Semua Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} className="capitalize">
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* ── Tabel ── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">
                  Pelatihan
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden md:table-cell">
                  Instruktur
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden lg:table-cell">
                  Periode
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden sm:table-cell">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden lg:table-cell">
                  Kapasitas
                </th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-400">
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <p className="text-sm font-medium">
                      Tidak ada data ditemukan
                    </p>
                    <p className="text-xs mt-1">
                      Coba ubah filter atau tambah pelatihan baru
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
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
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
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 leading-tight">
                            {item.title}
                          </p>
                          <span
                            className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-md ${CAT_COLOR[item.category] || CAT_COLOR["Lainnya"]}`}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                          <span className="text-[9px] font-bold text-slate-600">
                            {item.instructor.charAt(0)}
                          </span>
                        </div>
                        {item.instructor}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-slate-600 text-xs">
                        {formatDate(item.startDate)}
                      </p>
                      <p className="text-slate-400 text-xs">
                        s/d {formatDate(item.endDate)}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className={`inline-block capitalize text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_COLOR[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-slate-700 text-sm font-medium">
                        {item.maxParticipants} orang
                      </p>
                      <p className="text-slate-400 text-xs">{item.sessions}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        {/* View */}
                        <button
                          onClick={() => setModal({ mode: "view", item })}
                          title="Detail"
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
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
                        {/* Edit */}
                        <button
                          onClick={() => setModal({ mode: "edit", item })}
                          title="Edit"
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
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
                        {/* Delete */}
                        <button
                          onClick={() => setModal({ mode: "delete", item })}
                          title="Hapus"
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 transition-colors"
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

        {/* Footer tabel */}
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>
              Menampilkan {filtered.length} dari {data.length} pelatihan
            </span>
            <span className="hidden sm:block">
              {data.filter((d) => d.status === "berlangsung").length} aktif ·{" "}
              {data.filter((d) => d.status === "akan datang").length} akan
              datang · {data.filter((d) => d.status === "selesai").length}{" "}
              selesai
            </span>
          </div>
        )}
      </div>

      {/* ── Modal ── */}
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

/* ─────────────────────────── Modal ─────────────────────────────── */
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
    if (!form.title.trim()) e.title = "Nama pelatihan wajib diisi";
    if (!form.instructor.trim()) e.instructor = "Instruktur wajib diisi";
    if (!form.startDate) e.startDate = "Tanggal mulai wajib diisi";
    if (!form.endDate) e.endDate = "Tanggal selesai wajib diisi";
    if (form.startDate && form.endDate && form.startDate >= form.endDate)
      e.endDate = "Tanggal selesai harus setelah tanggal mulai";
    if (!form.maxParticipants || Number(form.maxParticipants) < 1)
      e.maxParticipants = "Kapasitas minimal 1 orang";
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
    create: "Tambah Pelatihan",
    edit: "Edit Pelatihan",
    view: "Detail Pelatihan",
    delete: "Hapus Pelatihan",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden flex flex-col max-h-[90vh] ${mode === "delete" ? "max-w-md" : "max-w-2xl"}`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0 ${
            mode === "delete"
              ? "bg-red-50"
              : mode === "view"
                ? "bg-blue-50"
                : "bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                mode === "delete"
                  ? "bg-red-100"
                  : mode === "view"
                    ? "bg-blue-100"
                    : "bg-blue-600"
              }`}
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
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
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

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* ── Delete confirm ── */}
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
                Hapus Pelatihan?
              </h3>
              <p className="text-slate-500 text-sm mb-1">
                Anda akan menghapus pelatihan:
              </p>
              <p className="font-semibold text-slate-800 mb-4">
                "{item.title}"
              </p>
              <p className="text-xs text-red-500 bg-red-50 rounded-lg px-4 py-2">
                Tindakan ini tidak dapat dibatalkan. Data pelatihan akan hilang
                secara permanen.
              </p>
            </div>
          )}

          {/* ── View detail ── */}
          {mode === "view" && (
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${CAT_COLOR[item.category] || CAT_COLOR["Lainnya"]}`}
                    >
                      {item.category}
                    </span>
                    <span
                      className={`capitalize text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_COLOR[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>
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
                  { label: "Instruktur", value: item.instructor },
                  { label: "Sesi", value: item.sessions },
                  { label: "Tanggal Mulai", value: formatDate(item.startDate) },
                  { label: "Tanggal Selesai", value: formatDate(item.endDate) },
                  {
                    label: "Kapasitas",
                    value: `${item.maxParticipants} peserta`,
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Create / Edit form ── */}
          {(mode === "create" || mode === "edit") && (
            <div className="space-y-4">
              {/* Nama pelatihan */}
              <Field label="Nama Pelatihan" required error={errors.title}>
                <input
                  type="text"
                  placeholder="Masukkan nama pelatihan"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  className={inputCls(errors.title)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                {/* Kategori */}
                <Field label="Kategori" required>
                  <select
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={inputCls()}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                {/* Status */}
                <Field label="Status" required>
                  <select
                    value={form.status}
                    onChange={(e) => set("status", e.target.value)}
                    className={inputCls()}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} className="capitalize">
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Instruktur */}
              <Field label="Instruktur" required error={errors.instructor}>
                <input
                  type="text"
                  placeholder="Nama instruktur"
                  value={form.instructor}
                  onChange={(e) => set("instructor", e.target.value)}
                  className={inputCls(errors.instructor)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                {/* Tanggal mulai */}
                <Field label="Tanggal Mulai" required error={errors.startDate}>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => set("startDate", e.target.value)}
                    className={inputCls(errors.startDate)}
                  />
                </Field>
                {/* Tanggal selesai */}
                <Field label="Tanggal Selesai" required error={errors.endDate}>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => set("endDate", e.target.value)}
                    className={inputCls(errors.endDate)}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Kapasitas */}
                <Field
                  label="Kapasitas Peserta"
                  required
                  error={errors.maxParticipants}
                >
                  <input
                    type="number"
                    placeholder="Contoh: 30"
                    min={1}
                    value={form.maxParticipants}
                    onChange={(e) => set("maxParticipants", e.target.value)}
                    className={inputCls(errors.maxParticipants)}
                  />
                </Field>
                {/* Sesi */}
                <Field label="Frekuensi Sesi">
                  <select
                    value={form.sessions}
                    onChange={(e) => set("sessions", e.target.value)}
                    className={inputCls()}
                  >
                    {SESSIONS_OPTIONS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Deskripsi */}
              <Field label="Deskripsi">
                <textarea
                  rows={3}
                  placeholder="Deskripsi singkat mengenai pelatihan ini..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className={`${inputCls()} resize-none`}
                />
              </Field>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all"
          >
            {mode === "view" ? "Tutup" : "Batal"}
          </button>

          {mode === "delete" && (
            <button
              onClick={() => onDelete(item.id)}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 rounded-xl transition-all shadow-sm shadow-red-200"
            >
              Ya, Hapus
            </button>
          )}
          {(mode === "create" || mode === "edit") && (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl transition-all shadow-sm shadow-blue-200"
            >
              {mode === "create" ? "Simpan Pelatihan" : "Simpan Perubahan"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Helper ────────────────────────────── */
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

const formatDate = (str) => {
  if (!str) return "-";
  const d = new Date(str);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
