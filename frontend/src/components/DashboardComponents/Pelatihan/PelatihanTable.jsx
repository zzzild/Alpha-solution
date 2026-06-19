import { DIFFICULTY_COLOR, METHOD_COLOR } from "./PelatihanConstants";

const formatPrice = (price) => {
  if (price === 0) return "Gratis";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const PelatihanTable = ({ data, filtered, setModal }) => {
  return (
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
            {/* Tampilkan pesan kosong jika tidak ada hasil filter */}
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
              // Render satu baris per paket yang lolos filter
              filtered.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/60 transition-colors group"
                >
                  {/* Kolom: thumbnail + nama paket */}
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
                          // Fallback jika URL gambar tidak valid
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

                  {/* Kolom: harga (tersembunyi di layar kecil) */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="font-semibold text-slate-800">
                      {formatPrice(item.price)}
                    </p>
                  </td>

                  {/* Kolom: durasi & masa akses (tersembunyi di layar medium ke bawah) */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-slate-700 text-xs font-medium">
                      {item.duration}
                    </p>
                    <p className="text-slate-400 text-xs">
                      Akses {item.accessPeriod}
                    </p>
                  </td>

                  {/* Kolom: jumlah modul (hanya tampil di layar besar) */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <p className="text-slate-700 text-sm font-medium">
                      {item.totalModules} modul
                    </p>
                  </td>

                  {/* Kolom: status sertifikat (hanya tampil di layar besar) */}
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

                  {/* Kolom: badge tingkat kesulitan (tersembunyi di layar kecil) */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`inline-block capitalize text-xs font-medium px-2.5 py-1 rounded-full border ${DIFFICULTY_COLOR[item.difficulty]}`}
                    >
                      {item.difficulty}
                    </span>
                  </td>

                  {/* Kolom: badge metode pembelajaran (hanya tampil di layar besar) */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span
                      className={`inline-block capitalize text-xs font-medium px-2.5 py-1 rounded-full border ${METHOD_COLOR[item.method]}`}
                    >
                      {item.method}
                    </span>
                  </td>

                  {/* Kolom: tombol aksi (detail / edit / hapus) */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      {/* Tombol lihat detail */}
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

                      {/* Tombol edit paket */}
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

                      {/* Tombol hapus paket */}
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

      {/* Footer tabel: ringkasan jumlah data yang ditampilkan */}
      {filtered.length > 0 && (
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>
            Menampilkan {filtered.length} dari {data.length} paket
          </span>
          <span className="hidden sm:block">
            {data.filter((d) => d.difficulty === "pemula").length} pemula ·{" "}
            {data.filter((d) => d.difficulty === "menengah").length} menengah ·{" "}
            {data.filter((d) => d.difficulty === "lanjutan").length} lanjutan
          </span>
        </div>
      )}
    </div>
  );
};

export default PelatihanTable;
