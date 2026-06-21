import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { INITIAL_DATA } from "../../components/DashboardComponents/Pelatihan/PelatihanConstants";
import { formatPrice } from "../../components/DashboardComponents/Pelatihan/PelatihanUtils";
import PelatihanToolbar from "../../components/DashboardComponents/Pelatihan/PelatihanToolbar";
import PelatihanTable from "../../components/DashboardComponents/Pelatihan/PelatihanTable";
import PelatihanModal from "../../components/DashboardComponents/Pelatihan/PelatihanModal";

/**
 * PelatihanAdmin — halaman manajemen paket kursus untuk panel admin.
 *
 * Komponen ini hanya mengurus:
 * - State (data, search, filter, modal)
 * - Handler CRUD (create, update, delete)
 * - Layout halaman
 *
 * Semua tampilan didelegasikan ke sub-komponen masing-masing.
 */
export default function PelatihanAdmin() {
  const { paket } = useContext(AdminContext);

  // Daftar paket yang ditampilkan
  const [data, setData] = useState(INITIAL_DATA);

  // Kata kunci pencarian nama paket
  const [search, setSearch] = useState("");

  // Filter tingkat kesulitan; "semua" = tidak ada filter
  const [filterDifficulty, setFilterDifficulty] = useState("semua");

  // State modal: null = tertutup, { mode, item? } = terbuka
  const [modal, setModal] = useState(null);

  /** Tambah paket baru ke awal daftar. */
  const handleCreate = (form) => {
    setData((prev) => [
      {
        ...form,
        id: Date.now(),
        price: Number(form.price),
        totalModules: Number(form.totalModules),
      },
      ...prev,
    ]);
    setModal(null);
  };

  /** Perbarui data paket yang cocok berdasarkan id. */
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

  /** Hapus paket berdasarkan id. */
  const handleDelete = (id) => {
    setData((prev) => prev.filter((d) => d.id !== id));
    setModal(null);
  };

  // Data setelah difilter pencarian dan tingkat kesulitan
  const filtered = data.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
    const matchDiff =
      filterDifficulty === "semua" || d.difficulty === filterDifficulty;
    return matchSearch && matchDiff;
  });

  return (
    <div className="space-y-5">
      {/* Header halaman + tombol tambah */}
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

      {/* Toolbar: pencarian + filter */}
      <PelatihanToolbar
        search={search}
        setSearch={setSearch}
        filterDifficulty={filterDifficulty}
        setFilterDifficulty={setFilterDifficulty}
      />

      {/* Tabel daftar paket */}
      <PelatihanTable
        filtered={filtered}
        data={data}
        setModal={setModal}
        formatPrice={formatPrice}
      />

      {/* Modal CRUD — hanya render saat modal tidak null */}
      {modal && (
        <PelatihanModal
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
