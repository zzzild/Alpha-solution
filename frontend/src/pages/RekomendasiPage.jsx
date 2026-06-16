import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  TrophyIcon,
  ClockIcon,
  BookIcon,
  CalendarIcon,
} from "../components/Icons";

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11.5px] font-bold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative flex items-center">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none pl-3.5 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13.5px] text-gray-800 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 pointer-events-none">
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function StatPill({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5 text-gray-400">
        {icon}
        <span className="text-[10.5px] uppercase tracking-wider font-semibold">
          {label}
        </span>
      </div>
      <span className="text-[14px] font-extrabold text-gray-900">{value}</span>
    </div>
  );
}

function RankBadge({ rank, best }) {
  if (best)
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-white text-[11px] font-extrabold shadow-md shadow-amber-200">
        <TrophyIcon /> TERBAIK
      </div>
    );
  const colors = [
    "bg-gray-200 text-gray-600",
    "bg-blue-100 text-blue-700",
    "bg-violet-100 text-violet-700",
    "bg-green-100 text-green-700",
  ];
  return (
    <div
      className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${colors[(rank - 1) % colors.length]}`}
    >
      Rank #{rank}
    </div>
  );
}

function TrainingCard({ item, rank, best, to }) {
  return (
    <Link to={to}>
      <div
        className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl flex flex-col lg:flex-row ${best ? "border-amber-300 shadow-lg shadow-amber-100" : "border-gray-100 shadow-sm"}`}
      >
        <div className="relative w-full lg:w-64 xl:w-72 flex-shrink-0 overflow-hidden">
          <img
            src={item.imagePaket}
            alt={item.namePaket}
            className="w-full h-48 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {best && (
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent pointer-events-none" />
          )}
        </div>

        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <RankBadge rank={rank} best={best} />
                <h3
                  className={`mt-2 font-extrabold leading-snug ${best ? "text-[18px] text-gray-900" : "text-[16px] text-gray-900"}`}
                >
                  {item.namePaket}
                </h3>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[11px] text-gray-400 font-medium">
                  Harga
                </div>
                <div
                  className={`font-extrabold ${best ? "text-[20px] text-gray-900" : "text-[17px] text-gray-900"}`}
                >
                  Rp {item.price.toLocaleString("id-ID")}
                </div>
              </div>
            </div>

            <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-4">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11.5px] font-semibold capitalize">
                {item.tingkatKesulitan}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11.5px] font-semibold capitalize">
                {item.metode}
              </span>
              {item.sertifikat === "ada" && (
                <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[11.5px] font-semibold">
                  ✓ Sertifikat
                </span>
              )}
            </div>
          </div>

          <div
            className={`grid grid-cols-3 gap-4 pt-4 border-t ${best ? "border-amber-100" : "border-gray-100"}`}
          >
            <StatPill
              icon={<BookIcon />}
              label="Modul"
              value={item.jumlahModul}
            />
            <StatPill
              icon={<ClockIcon />}
              label="Durasi"
              value={`${item.duration} Hari`}
            />
            <StatPill
              icon={<CalendarIcon />}
              label="Akses"
              value={`${item.masaAkses} Hari`}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

const RekomendasiPage = () => {
  const { getRecommendation } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState({
    budget: "",
    minimalModul: "",
    minimalAkses: "",
    duration: "",
    tingkatKesulitan: "",
    sertifikat: "",
    metode: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleProses = async () => {
    try {
      setLoading(true);
      const response = await getRecommendation({
        budget: Number(formData.budget),
        minimalModul: Number(formData.minimalModul),
        minimalAkses: Number(formData.minimalAkses),
        duration: Number(formData.duration),
        tingkatKesulitan: formData.tingkatKesulitan,
        sertifikat: formData.sertifikat,
        metode: formData.metode,
      });
      if (response && response.success) {
        setResults(response);
      } else {
        setResults(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const FIELDS = [
    {
      label: "Budget",
      name: "budget",
      options: [
        { value: "", label: "Pilih Budget" },
        { value: "1000000", label: "Kurang dari Rp 1 Juta" },
        { value: "1500000", label: "Rp 1 – 1,5 Juta" },
        { value: "2000000", label: "Rp 1,5 – 2 Juta" },
        { value: "3000000", label: "Lebih dari Rp 2 Juta" },
      ],
    },
    {
      label: "Jumlah Modul",
      name: "minimalModul",
      options: [
        { value: "", label: "Pilih Jumlah Modul" },
        { value: "5", label: "Minimal 5 Modul" },
        { value: "10", label: "Minimal 10 Modul" },
        { value: "15", label: "Minimal 15 Modul" },
        { value: "20", label: "Minimal 20 Modul" },
      ],
    },
    {
      label: "Masa Akses",
      name: "minimalAkses",
      options: [
        { value: "", label: "Pilih Masa Akses" },
        { value: "30", label: "30 Hari" },
        { value: "60", label: "60 Hari" },
        { value: "90", label: "90 Hari" },
        { value: "180", label: "180 Hari" },
      ],
    },
    {
      label: "Durasi Pelatihan",
      name: "duration",
      options: [
        { value: "", label: "Pilih Durasi" },
        { value: "14", label: "14 Hari" },
        { value: "21", label: "21 Hari" },
        { value: "30", label: "30 Hari" },
        { value: "45", label: "45 Hari" },
      ],
    },
    {
      label: "Tingkat Kesulitan",
      name: "tingkatKesulitan",
      options: [
        { value: "", label: "Semua Level" },
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
      ],
    },
    {
      label: "Sertifikat",
      name: "sertifikat",
      options: [
        { value: "", label: "Semua" },
        { value: "ada", label: "Ada Sertifikat" },
        { value: "tidak", label: "Tidak Ada" },
      ],
    },
    {
      label: "Metode",
      name: "metode",
      options: [
        { value: "", label: "Semua Metode" },
        { value: "vidio", label: "Video" },
        { value: "live class", label: "Live Class" },
        { value: "hybrid", label: "Hybrid" },
      ],
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="py-16 sm:py-20 min-h-screen">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-4">
            <div className="mb-8 fade-up">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                Rekomendasi Paket Pelatihan
              </h1>
              <p className="text-[14.5px] text-gray-500 max-w-xl leading-relaxed">
                Isi preferensi Anda dan sistem akan merekomendasikan paket
                terbaik berdasarkan kebutuhan.
              </p>
            </div>

            <div
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6 fade-up"
              style={{ animationDelay: "0.08s" }}
            >
              <div className="px-6 pt-5 pb-4 border-b border-gray-50">
                <h2 className="text-[15px] font-bold text-gray-800">
                  Preferensi Pelatihan
                </h2>
                <p className="text-[12.5px] text-gray-400 mt-0.5">
                  Pilih kriteria sesuai kebutuhan Anda
                </p>
              </div>

              <div className="p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {FIELDS.map((f) => (
                    <SelectField
                      key={f.name}
                      label={f.label}
                      name={f.name}
                      value={formData[f.name]}
                      onChange={handleChange}
                      options={f.options}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                  <button
                    onClick={handleProses}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-lightprimary disabled:opacity-70 text-white rounded-xl text-[14px] font-bold transition-colors shadow-md shadow-blue-200 whitespace-nowrap cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="spinner w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        Memproses...
                      </>
                    ) : (
                      <>Cari Rekomendasi</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {results?.bestRecommendation && (
              <>
                <div className="mt-10 result-card">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-white flex-shrink-0">
                      <TrophyIcon />
                    </div>
                    <div>
                      <h2 className="text-[18px] font-extrabold text-gray-900">
                        Rekomendasi Terbaik
                      </h2>
                      <p className="text-[12px] text-gray-400">
                        Paket dengan nilai SAW tertinggi sesuai preferensi Anda
                      </p>
                    </div>
                  </div>

                  <TrainingCard
                    item={results.bestRecommendation}
                    rank={1}
                    best={true}
                    to={`/pelatihandetail/${results.bestRecommendation.paketId}`}
                  />
                </div>

                {results.ranking.slice(1, 5).length > 0 && (
                  <div
                    className="mt-10 result-card"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div>
                        <h2 className="text-[18px] font-extrabold text-gray-900">
                          Alternatif Lainnya
                        </h2>
                        <p className="text-[12px] text-gray-400">
                          Pilihan lain yang juga sesuai kriteria Anda
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      {results.ranking.slice(1, 5).map((item, index) => (
                        <div
                          key={item.paketId}
                          style={{
                            animation: `fadeUp 0.4s ease ${(index + 1) * 0.07}s both`,
                          }}
                        >
                          <TrainingCard
                            item={item}
                            rank={index + 2}
                            best={false}
                            to={`/pelatihandetail/${item.paketId}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RekomendasiPage;
