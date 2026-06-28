import { useContext, useMemo, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { exportPemesananPDF } from "../../utils/ExportPemesananPdf";

import { STATUS_OPTIONS } from "../../components/DashboardComponents/Pemesanan/PemesananConstants";
import PemesananToolbar from "../../components/DashboardComponents/Pemesanan/PemesananToolbar";
import PemesananTable from "../../components/DashboardComponents/Pemesanan/PemesananTable";
import PemesananModal from "../../components/DashboardComponents/Pemesanan/PemesananModal";

export default function PemesananPage() {
  const { pemesanan, verifyPayment } = useContext(AdminContext);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [modal, setModal] = useState(null);

  const data = useMemo(() => {
    return [...(pemesanan || [])]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // terbaru dulu
      .map((item) => ({
        id: item.pemesananId,

        namaPemesan: item.userData?.nameUser || "-",
        email: item.userData?.email || "-",
        paket: item.paketData?.namePaket || "-",
        harga: item.paketData?.price || 0,

        status:
          item.paymentStatus === "pending"
            ? "menunggu"
            : item.paymentStatus === "completed"
              ? "dikonfirmasi"
              : item.paymentStatus === "rejected"
                ? "ditolak"
                : "expired",

        phone: item.userData?.phone || "-",

        tanggal: item.createdAt,

        buktiPembayaran: item.paymentProof,
      }));
  }, [pemesanan]);

  const handleCreate = () => {};

  const handleUpdate = () => {};

  const handleDelete = () => {};

  const handleStatusChange = async (id, status) => {
    let paymentStatus = "";

    switch (status) {
      case "dikonfirmasi":
        paymentStatus = "completed";
        break;

      case "ditolak":
        paymentStatus = "rejected";
        break;

      default:
        return;
    }

    await verifyPayment(id, paymentStatus);
  };

  // =============================
  // Filter
  // =============================
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
        <button
          onClick={() => exportPemesananPDF(filtered)}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-150 shadow-sm shadow-blue-200 cursor-pointer"
        >
          Export PDF
        </button>
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
                ? `${bg} ${border} ring-2 ring-offset-1 ${border.replace(
                    "border-",
                    "ring-",
                  )}`
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
