import { useState } from "react";

// Dummy Data
const STATUS_OPTIONS = ["menunggu", "dikonfirmasi", "ditolak"];

// Status Color
const STATUS_COLOR = {
  menunggu: "bg-amber-50 text-amber-700 border-amber-200",
  dikonfirmasi: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ditolak: "bg-red-50 text-red-600 border-red-200",
};

// Status Icon
const STATUS_ICON = {
  menunggu: (
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
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  dikonfirmasi: (
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
  ),
  ditolak: (
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
  ),
};

const PAKET_OPTIONS = [
  { label: "React.js untuk Pemula", price: 350000 },
  { label: "UI/UX Figma Profesional", price: 275000 },
  { label: "Data Science dengan Python", price: 499000 },
  { label: "Digital Marketing Strategis", price: 199000 },
  { label: "Agile Project Management", price: 425000 },
];

const INITIAL_DATA = [
  {
    id: 1,
    namaPemesan: "Andi Kurniawan",
    paket: "React.js untuk Pemula",
    harga: 350000,
    status: "dikonfirmasi",
    tanggal: "2026-05-10",
    buktiPembayaran:
      "https://placehold.co/400x300/d1fae5/065f46?text=Bukti+Transfer",
    catatan: "",
  },
  {
    id: 2,
    namaPemesan: "Sari Dewi",
    paket: "UI/UX Figma Profesional",
    harga: 275000,
    status: "menunggu",
    tanggal: "2026-05-14",
    buktiPembayaran:
      "https://placehold.co/400x300/fef3c7/92400e?text=Bukti+Transfer",
    catatan: "Transfer via BCA",
  },
  {
    id: 3,
    namaPemesan: "Budi Santoso",
    paket: "Data Science dengan Python",
    harga: 499000,
    status: "menunggu",
    tanggal: "2026-05-15",
    buktiPembayaran:
      "https://placehold.co/400x300/dbeafe/1e3a8a?text=Bukti+Transfer",
    catatan: "",
  },
  {
    id: 4,
    namaPemesan: "Rina Marlina",
    paket: "Digital Marketing Strategis",
    harga: 199000,
    status: "ditolak",
    tanggal: "2026-05-08",
    buktiPembayaran: "",
    catatan: "Bukti pembayaran tidak valid",
  },
  {
    id: 5,
    namaPemesan: "Dwi Prasetyo",
    paket: "Agile Project Management",
    harga: 425000,
    status: "dikonfirmasi",
    tanggal: "2026-05-12",
    buktiPembayaran:
      "https://placehold.co/400x300/ede9fe/4c1d95?text=Bukti+Transfer",
    catatan: "",
  },
];

const EMPTY_FORM = {
  namaPemesan: "",
  paket: PAKET_OPTIONS[0].label,
  harga: PAKET_OPTIONS[0].price,
  status: "menunggu",
  tanggal: "",
  buktiPembayaran: "",
  catatan: "",
};

// Component
export default function PemesananPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [modal, setModal] = useState(null);

  const handleCreate = (form) => {
    setData((prev) => [
      { ...form, id: Date.now(), harga: Number(form.harga) },
      ...prev,
    ]);
    setModal(null);
  };

  const handleUpdate = (form) => {
    setData((prev) =>
      prev.map((d) =>
        d.id === form.id ? { ...form, harga: Number(form.harga) } : d,
      ),
    );
    setModal(null);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((d) => d.id !== id));
    setModal(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setData((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d)),
    );
  };

  const filtered = data.filter((d) => {
    const matchSearch =
      d.namaPemesan.toLowerCase().includes(search.toLowerCase()) ||
      d.paket.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "semua" || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    menunggu: data.filter((d) => d.status === "menunggu").length,
    dikonfirmasi: data.filter((d) => d.status === "dikonfirmasi").length,
    ditolak: data.filter((d) => d.status === "ditolak").length,
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Manajemen Pemesanan
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {data.length} pemesanan · {counts.menunggu} menunggu konfirmasi
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Menunggu",
            key: "menunggu",
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-100",
          },
          {
            label: "Dikonfirmasi",
            key: "dikonfirmasi",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
          },
          {
            label: "Ditolak",
            key: "ditolak",
            color: "text-red-500",
            bg: "bg-red-50",
            border: "border-red-100",
          },
        ].map(({ label, key, color, bg, border }) => (
          <button
            key={key}
            onClick={() =>
              setFilterStatus(filterStatus === key ? "semua" : key)
            }
            className={`rounded-xl border p-3 text-left transition-all cursor-pointer ${
              filterStatus === key
                ? `${bg} ${border} ring-2 ring-offset-1 ${border.replace("border-", "ring-")}`
                : "bg-white border-slate-100 hover:bg-slate-50"
            }`}
          >
            <p className={`text-xl font-bold ${color}`}>{counts[key]}</p>
            <p className="text-xs text-slate-500 mt-0.5 capitalize">{label}</p>
          </button>
        ))}
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
            placeholder="Cari nama pemesan atau paket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-slate-50"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-slate-600 cursor-pointer"
        >
          <option value="semua">Semua Status</option>
          {STATUS_OPTIONS.map((s) => (
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
                  Pemesan
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden md:table-cell">
                  Paket
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden sm:table-cell">
                  Harga
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden lg:table-cell">
                  Tanggal
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden lg:table-cell">
                  Bukti
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide hidden sm:table-cell">
                  Status
                </th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wide">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-slate-400">
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
                      Coba ubah filter atau tambah pemesanan baru
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
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-blue-600">
                            {item.namaPemesan.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 leading-tight">
                            {item.namaPemesan}
                          </p>
                          <p className="text-[11px] text-slate-400 md:hidden">
                            {item.paket}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-slate-700 text-xs font-medium leading-snug max-w-[180px] truncate">
                        {item.paket}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="font-semibold text-slate-800">
                        {formatPrice(item.harga)}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-slate-600 text-xs">
                        {formatDate(item.tanggal)}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {item.buktiPembayaran ? (
                        <button
                          onClick={() => setModal({ mode: "bukti", item })}
                          className="cursor-pointer"
                          title="Lihat bukti pembayaran"
                        >
                          <img
                            src={item.buktiPembayaran}
                            alt="Bukti"
                            className="w-12 h-8 object-cover rounded-md border border-slate-200 hover:ring-2 hover:ring-blue-400 transition-all"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Tidak ada
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${STATUS_COLOR[item.status]}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option
                            key={s}
                            value={s}
                            className="bg-white text-slate-800 capitalize"
                          >
                            {s}
                          </option>
                        ))}
                      </select>
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
              Menampilkan {filtered.length} dari {data.length} pemesanan
            </span>
            <span className="hidden sm:block">
              {counts.menunggu} menunggu · {counts.dikonfirmasi} dikonfirmasi ·{" "}
              {counts.ditolak} ditolak
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
    setForm((f) => {
      const updated = { ...f, [key]: val };
      if (key === "paket") {
        const found = PAKET_OPTIONS.find((p) => p.label === val);
        if (found) updated.harga = found.price;
      }
      return updated;
    });
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.namaPemesan.trim()) e.namaPemesan = "Nama pemesan wajib diisi";
    if (!form.tanggal) e.tanggal = "Tanggal wajib diisi";
    if (!form.harga || Number(form.harga) < 0) e.harga = "Harga tidak valid";
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
    edit: "Edit Pemesanan",
    view: "Detail Pemesanan",
    bukti: "Bukti Pembayaran",
  };

  if (mode === "bukti") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Bukti Pembayaran
                </p>
                <p className="text-xs text-slate-400">
                  {item.namaPemesan} · {item.paket}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-400 cursor-pointer transition-colors"
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
          <div className="p-4">
            <img
              src={item.buktiPembayaran}
              alt="Bukti Pembayaran"
              className="w-full rounded-xl border border-slate-100 object-contain max-h-96"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/400x300/e2e8f0/94a3b8?text=Gambar+Tidak+Tersedia";
              }}
            />
          </div>
        </div>
      </div>
    );
  }

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
                Hapus Pemesanan?
              </h3>
              <p className="text-slate-500 text-sm mb-1">
                Anda akan menghapus pemesanan dari:
              </p>
              <p className="font-semibold text-slate-800 mb-1">
                "{item.namaPemesan}"
              </p>
              <p className="text-sm text-slate-500 mb-4">{item.paket}</p>
              <p className="text-xs text-red-500 bg-red-50 rounded-lg px-4 py-2">
                Tindakan ini tidak dapat dibatalkan. Data pemesanan akan hilang
                secara permanen.
              </p>
            </div>
          )}

          {mode === "view" && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-blue-600">
                    {item.namaPemesan.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg">
                    {item.namaPemesan}
                  </h3>
                  <p className="text-sm text-slate-500">{item.paket}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 capitalize text-xs font-semibold px-3 py-1.5 rounded-full border ${STATUS_COLOR[item.status]}`}
                >
                  {STATUS_ICON[item.status]}
                  {item.status}
                </span>
              </div>

              {item.buktiPembayaran ? (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Bukti Pembayaran
                  </p>
                  <img
                    src={item.buktiPembayaran}
                    alt="Bukti Pembayaran"
                    className="w-full h-48 object-cover rounded-xl border border-slate-100"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x200/e2e8f0/94a3b8?text=Gambar+Tidak+Tersedia";
                    }}
                  />
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <svg
                    className="w-8 h-8 mx-auto text-slate-300 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs text-slate-400">
                    Bukti pembayaran tidak tersedia
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Nama Pemesan", value: item.namaPemesan },
                  { label: "Harga", value: formatPrice(item.harga) },
                  { label: "Paket", value: item.paket },
                  { label: "Tanggal", value: formatDate(item.tanggal) },
                  { label: "Status", value: item.status },
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

              {item.catatan && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">
                    Catatan
                  </p>
                  <p className="text-sm text-slate-700">{item.catatan}</p>
                </div>
              )}
            </div>
          )}

          {(mode === "create" || mode === "edit") && (
            <div className="space-y-4">
              <Field label="Nama Pemesan" required error={errors.namaPemesan}>
                <input
                  type="text"
                  placeholder="Masukkan nama pemesan"
                  value={form.namaPemesan}
                  onChange={(e) => set("namaPemesan", e.target.value)}
                  className={inputCls(errors.namaPemesan)}
                />
              </Field>

              <Field label="Paket" required>
                <select
                  value={form.paket}
                  onChange={(e) => set("paket", e.target.value)}
                  className={inputCls()}
                >
                  {PAKET_OPTIONS.map((p) => (
                    <option key={p.label} value={p.label}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Harga (Rp)" required error={errors.harga}>
                  <input
                    type="number"
                    min={0}
                    value={form.harga}
                    onChange={(e) => set("harga", e.target.value)}
                    className={inputCls(errors.harga)}
                  />
                </Field>
                <Field label="Tanggal Pesan" required error={errors.tanggal}>
                  <input
                    type="date"
                    value={form.tanggal}
                    onChange={(e) => set("tanggal", e.target.value)}
                    className={inputCls(errors.tanggal)}
                  />
                </Field>
              </div>

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

              <Field label="URL Bukti Pembayaran">
                <input
                  type="text"
                  placeholder="https://example.com/bukti.jpg"
                  value={form.buktiPembayaran}
                  onChange={(e) => set("buktiPembayaran", e.target.value)}
                  className={inputCls()}
                />
                {form.buktiPembayaran && (
                  <img
                    src={form.buktiPembayaran}
                    alt="Preview"
                    className="mt-2 w-full h-32 object-cover rounded-lg border border-slate-200"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </Field>

              <Field label="Catatan">
                <textarea
                  rows={2}
                  placeholder="Catatan tambahan (opsional)..."
                  value={form.catatan}
                  onChange={(e) => set("catatan", e.target.value)}
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
              {mode === "create" ? "Simpan Pemesanan" : "Simpan Perubahan"}
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
  if (!price || price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const formatDate = (str) => {
  if (!str) return "-";
  return new Date(str).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
