const PelatihanToolbar = ({
  search,
  setSearch,
  filterDifficulty,
  setFilterDifficulty,
  difficultyOptions,
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

        {difficultyOptions.map((difficulty) => (
          <option
            key={difficulty}
            value={difficulty}
          >
            {difficulty}
          </option>
        ))}
      </select>

    </div>
  );
};

export default PelatihanToolbar;