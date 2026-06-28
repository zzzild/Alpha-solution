import { STATUS_OPTIONS, STATUS_COLOR } from "./PemesananConstants";

// Lokal — hanya dipakai di tabel ini, mengikuti pola PelatihanTable
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

/**
 * PemesananTable — tabel daftar pemesanan dengan aksi per baris.
 *
 * @param {Array}    filtered          - Data setelah difilter
 * @param {Array}    data              - Data asli (untuk hitung total di footer)
 * @param {Object}   counts            - { menunggu, dikonfirmasi, ditolak }
 * @param {Function} setModal          - Buka modal dengan { mode, item }
 * @param {Function} handleStatusChange - Ubah status langsung dari dropdown baris
 */
const PemesananTable = ({
  filtered,
  data,
  counts,
  setModal,
  handleStatusChange,
}) => {
  return (
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
                  {/* Kolom: avatar + nama pemesan */}
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

                  {/* Kolom: nama paket */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-slate-700 text-xs font-medium leading-snug max-w-[180px] truncate">
                      {item.paket}
                    </p>
                  </td>

                  {/* Kolom: harga */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="font-semibold text-slate-800">
                      {formatPrice(item.harga)}
                    </p>
                  </td>

                  {/* Kolom: tanggal */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <p className="text-slate-600 text-xs">
                      {formatDate(item.tanggal)}
                    </p>
                  </td>

                  {/* Kolom: thumbnail bukti pembayaran */}
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

                  {/* Kolom: dropdown status langsung */}
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

                  {/* Kolom: tombol aksi */}
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
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: ringkasan jumlah data */}
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
  );
};

export default PemesananTable;
