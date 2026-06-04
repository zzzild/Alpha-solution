import { useState } from "react";
import { Link } from "react-router-dom";

const STATS = [
  {
    label: "Pelatihan Aktif",
    value: 4,
    icon: "ti-player-play",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Total Peserta",
    value: 128,
    icon: "ti-users",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Selesai Bulan Ini",
    value: 2,
    icon: "ti-circle-check",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    label: "Menunggu Mulai",
    value: 3,
    icon: "ti-clock",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const TRAININGS = [
  {
    id: 1,
    title: "Pemrograman Web dengan React.js",
    category: "Teknologi",
    instructor: "Budi Santoso",
    startDate: "5 Mei 2026",
    endDate: "30 Jun 2026",
    participants: 32,
    maxParticipants: 40,
    progress: 62,
    status: "berlangsung",
    categoryColor: "bg-blue-100 text-blue-700",
    sessions: "3× seminggu",
  },
  {
    id: 2,
    title: "Desain UI/UX Figma untuk Pemula",
    category: "Desain",
    instructor: "Rina Marlina",
    startDate: "10 Mei 2026",
    endDate: "25 Jun 2026",
    participants: 28,
    maxParticipants: 30,
    progress: 45,
    status: "berlangsung",
    categoryColor: "bg-pink-100 text-pink-700",
    sessions: "2× seminggu",
  },
  {
    id: 3,
    title: "Analisis Data dengan Python & Pandas",
    category: "Data Science",
    instructor: "Ahmad Fauzi",
    startDate: "1 Mei 2026",
    endDate: "15 Jun 2026",
    participants: 25,
    maxParticipants: 25,
    progress: 78,
    status: "berlangsung",
    categoryColor: "bg-emerald-100 text-emerald-700",
    sessions: "4× seminggu",
  },
  {
    id: 4,
    title: "Digital Marketing & SEO",
    category: "Pemasaran",
    instructor: "Siti Rahmawati",
    startDate: "15 Mei 2026",
    endDate: "10 Jul 2026",
    participants: 18,
    maxParticipants: 35,
    progress: 28,
    status: "berlangsung",
    categoryColor: "bg-amber-100 text-amber-700",
    sessions: "2× seminggu",
  },
];

const UPCOMING = [
  {
    title: "Jaringan Komputer Dasar",
    date: "2 Jun 2026",
    participants: 0,
    max: 30,
  },
  {
    title: "Manajemen Proyek Agile",
    date: "5 Jun 2026",
    participants: 12,
    max: 25,
  },
  {
    title: "Public Speaking & Presentasi",
    date: "10 Jun 2026",
    participants: 8,
    max: 20,
  },
];

const Dashboard = () => {
  const [filter, setFilter] = useState("semua");

  const filtered =
    filter === "semua"
      ? TRAININGS
      : TRAININGS.filter((t) => t.category.toLowerCase().includes(filter));

  const categories = [
    "semua",
    ...new Set(TRAININGS.map((t) => t.category.toLowerCase())),
  ];

  return (
    <div className="space-y-6">
      {/* ── Selamat datang ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white" />
          <div className="absolute -bottom-12 right-24 w-64 h-64 rounded-full bg-white" />
        </div>
        <div className="relative">
          <p className="text-blue-200 text-sm font-medium mb-1">
            Kamis, 28 Mei 2026
          </p>
          <h1 className="text-2xl font-bold mb-1">Selamat datang kembali 👋</h1>
          <p className="text-blue-100 text-sm">
            Ada <span className="font-semibold text-white">4 pelatihan</span>{" "}
            yang sedang berjalan saat ini.
          </p>
        </div>
      </div>

      {/* ── Statistik ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-4 shadow-sm"
          >
            <div
              className={`${s.bg} ${s.color} w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}
            >
              <i className={`ti ${s.icon} text-xl`} aria-hidden="true" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{s.value}</p>
              <p className="text-xs text-slate-500 leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Pelatihan berjalan ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-800">
            Pelatihan Sedang Berjalan
          </h2>
          <Link
            to="/dashboard/rekrutmen"
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            Lihat semua{" "}
            <i className="ti ti-arrow-right text-sm" aria-hidden="true" />
          </Link>
        </div>

        {/* Filter kategori */}
        <div className="flex gap-2 flex-wrap mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-150 ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((t) => (
            <TrainingCard key={t.id} training={t} />
          ))}
        </div>
      </div>

      {/* ── Akan Datang ── */}
      <div>
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Akan Segera Dimulai
        </h2>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm divide-y divide-slate-50">
          {UPCOMING.map((u, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <i
                  className="ti ti-calendar-event text-slate-500 text-lg"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {u.title}
                </p>
                <p className="text-xs text-slate-500">Mulai {u.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-semibold text-slate-700">
                  {u.participants}/{u.max}
                </p>
                <p className="text-xs text-slate-400">peserta</p>
              </div>
              <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-lg font-medium shrink-0">
                Segera
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Kartu Pelatihan ── */
const TrainingCard = ({ training: t }) => {
  const pctFull = Math.round((t.participants / t.maxParticipants) * 100);
  const isFull = pctFull >= 100;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span
            className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md mb-2 ${t.categoryColor}`}
          >
            {t.category}
          </span>
          <h3 className="text-sm font-semibold text-slate-800 leading-snug">
            {t.title}
          </h3>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <i className="ti ti-user text-slate-400" aria-hidden="true" />
          {t.instructor}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="ti ti-clock text-slate-400" aria-hidden="true" />
          {t.sessions}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="ti ti-calendar text-slate-400" aria-hidden="true" />
          {t.startDate}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="ti ti-calendar-off text-slate-400" aria-hidden="true" />
          {t.endDate}
        </span>
      </div>

      {/* Progress pelatihan */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Progress materi</span>
          <span className="font-medium text-slate-700">{t.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${t.progress}%` }}
          />
        </div>
      </div>

      {/* Footer peserta */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-50">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <i className="ti ti-users text-slate-400" aria-hidden="true" />
          <span>
            <span
              className={`font-semibold ${isFull ? "text-red-600" : "text-slate-700"}`}
            >
              {t.participants}
            </span>
            /{t.maxParticipants} peserta
            {isFull && (
              <span className="ml-1.5 text-[10px] bg-red-50 text-red-600 border border-red-200 px-1.5 py-0.5 rounded font-medium">
                Penuh
              </span>
            )}
          </span>
        </div>
        <div className="w-24 bg-slate-100 rounded-full h-1 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isFull
                ? "bg-red-400"
                : pctFull > 80
                  ? "bg-amber-400"
                  : "bg-emerald-400"
            }`}
            style={{ width: `${pctFull}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
