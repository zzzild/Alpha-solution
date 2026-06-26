/**
 * PemesananToolbar — bar pencarian + dropdown filter status.
 * statusOptions diterima lewat props, mengikuti pola PelatihanToolbar.
 *
 * @param {string}   search         - Kata kunci pencarian saat ini
 * @param {Function} setSearch      - Setter kata kunci
 * @param {string}   filterStatus   - Status filter aktif ("semua" | status)
 * @param {Function} setFilterStatus - Setter filter status
 * @param {Array}    statusOptions  - Daftar pilihan status
 */
const PemesananToolbar = ({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  statusOptions,
}) => {
  return (
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
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PemesananToolbar;
