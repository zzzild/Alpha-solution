import { useContext, useMemo, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

import { formatPrice } from "../../components/DashboardComponents/Pelatihan/PelatihanUtils";
import PelatihanToolbar from "../../components/DashboardComponents/Pelatihan/PelatihanToolbar";
import PelatihanTable from "../../components/DashboardComponents/Pelatihan/PelatihanTable";
import PelatihanModal from "../../components/DashboardComponents/Pelatihan/PelatihanModal";
import { AppContext } from "../../context/AppContext";

export default function PelatihanAdmin() {
  const {
    addPaket,
    updatePaket,
    deletePaket,
  } = useContext(AdminContext);

  const {
    paket,
  fetchPaket
  } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("semua");
  const [modal, setModal] = useState(null);

  

  const data = useMemo(() => {
    return paket.map((item) => ({
      id: item.paketId,
      paketId: item.paketId,

      title: item.namePaket,
      image: item.imagePaket,
      description: item.description,

      price: item.price,

      duration: item.duration,
      accessPeriod: item.masaAkses,

      totalModules: item.jumlahModul,

      difficulty: item.tingkatKesulitan,

      sertificate: item.sertifikat === "ada",

      method: item.metode,
    }));
  }, [paket]);

  const handleCreate = async (formData) => {
    try {
      await addPaket(formData);
      await fetchPaket();
      setModal(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updatePaket(formData.paketId, formData);
      await fetchPaket();
      setModal(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (paketId) => {
    try {
      await deletePaket(paketId);
      await fetchPaket();
      setModal(null);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = data.filter((d) => {
    const matchSearch = d.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchDiff =
      filterDifficulty === "semua" ||
      d.difficulty === filterDifficulty;

    return matchSearch && matchDiff;
  });

  const difficultyOptions = useMemo(() => {
  return [...new Set(data.map((item) => item.difficulty))]
    .filter(Boolean);
}, [data]);


  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Manajemen Paket
          </h1>

          <p className="text-sm text-slate-500 mt-0.5">
            {data.length} paket terdaftar ·{" "}
            {
              data.filter(
                (d) => d.difficulty === "pemula"
              ).length
            }{" "}
            untuk pemula
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

      <PelatihanToolbar
        search={search}
        setSearch={setSearch}
        filterDifficulty={filterDifficulty}
        setFilterDifficulty={setFilterDifficulty}
        difficultyOptions={difficultyOptions}
      />

      <PelatihanTable
        filtered={filtered}
        data={data}
        setModal={setModal}
        formatPrice={formatPrice}
      />

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