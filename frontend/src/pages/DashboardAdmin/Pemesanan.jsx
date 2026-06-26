import { useState } from "react";
import { INITIAL_DATA, STATUS_OPTIONS } from "../../components/DashboardComponents/Pemesanan/PemesananConstants";
import PemesananToolbar from "../../components/DashboardComponents/Pemesanan/PemesananToolbar";
import PemesananTable from "../../components/DashboardComponents/Pemesanan/PemesananTable";
import PemesananModal from "../../components/DashboardComponents/Pemesanan/PemesananModal";

/**
 * PemesananPage — halaman manajemen pemesanan kursus untuk panel admin.
 */
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

      {/* Stat cards — klik untuk filter per status */}
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

      <PemesananToolbar
        search={search}
        setSearch={setSearch}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        statusOptions={STATUS_OPTIONS}
      />

      <PemesananTable
        filtered={filtered}
        data={data}
        counts={counts}
        setModal={setModal}
        handleStatusChange={handleStatusChange}
      />

      {modal && (
        <PemesananModal
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
