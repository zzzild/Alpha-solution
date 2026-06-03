import React, {
  useContext,
  useState,
} from "react";

import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const RekomendasiPage = () => {
  const { getRecommendation } =
    useContext(AppContext);

  const [loading, setLoading] =
    useState(false);

  const [results, setResults] =
    useState(null);

  const [formData, setFormData] =
    useState({
      budget: "",
      minimalModul: "",
      minimalAkses: "",
      duration: "",
      tingkatKesulitan: "",
      sertifikat: "",
      metode: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleProses = async () => {
    try {
      setLoading(true);

      const response =
        await getRecommendation({
          budget: Number(
            formData.budget
          ),
          minimalModul: Number(
            formData.minimalModul
          ),
          minimalAkses: Number(
            formData.minimalAkses
          ),
          duration: Number(
            formData.duration
          ),
          tingkatKesulitan:
            formData
              .tingkatKesulitan,
          sertifikat:
            formData.sertifikat,
          metode: formData.metode,
        });

      console.log(
        "HASIL REKOMENDASI",
        response
      );

      if (
        response &&
        response.success
      ) {
        setResults(response);
      } else {
        setResults(null);
        alert(
          response?.message ||
            "Tidak ada rekomendasi"
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900">
            Sistem Rekomendasi
            Paket Training
          </h1>

          <p className="text-gray-500 mt-2">
            Cari paket training
            terbaik berdasarkan
            kebutuhan Anda.
          </p>
        </div>

        {/* FORM */}

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">

          <h2 className="text-xl font-bold mb-6">
            Preferensi Training
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            <input
              type="number"
              name="budget"
              placeholder="Budget Maksimal"
              value={
                formData.budget
              }
              onChange={
                handleChange
              }
              className="border rounded-xl p-3"
            />

            <input
              type="number"
              name="minimalModul"
              placeholder="Minimal Modul"
              value={
                formData.minimalModul
              }
              onChange={
                handleChange
              }
              className="border rounded-xl p-3"
            />

            <input
              type="number"
              name="minimalAkses"
              placeholder="Minimal Masa Akses"
              value={
                formData.minimalAkses
              }
              onChange={
                handleChange
              }
              className="border rounded-xl p-3"
            />

            <input
              type="number"
              name="duration"
              placeholder="Durasi Yang Diinginkan"
              value={
                formData.duration
              }
              onChange={
                handleChange
              }
              className="border rounded-xl p-3"
            />

            <select
              name="tingkatKesulitan"
              value={
                formData.tingkatKesulitan
              }
              onChange={
                handleChange
              }
              className="border rounded-xl p-3"
            >
              <option value="">
                Semua Level
              </option>

              <option value="beginner">
                Beginner
              </option>

              <option value="intermediate">
                Intermediate
              </option>
            </select>

            <select
              name="sertifikat"
              value={
                formData.sertifikat
              }
              onChange={
                handleChange
              }
              className="border rounded-xl p-3"
            >
              <option value="">
                Sertifikat
              </option>

              <option value="ada">
                Ada
              </option>

              <option value="tidak">
                Tidak Ada
              </option>
            </select>

            <select
              name="metode"
              value={
                formData.metode
              }
              onChange={
                handleChange
              }
              className="border rounded-xl p-3"
            >
              <option value="">
                Semua Metode
              </option>

              <option value="vidio">
                Video
              </option>

              <option value="live class">
                Live Class
              </option>

              <option value="hybrid">
                Hybrid
              </option>
            </select>

          </div>

          <button
            onClick={
              handleProses
            }
            disabled={loading}
            className="mt-6 bg-primary text-white px-8 py-3 rounded-xl font-bold"
          >
            {loading
              ? "Memproses..."
              : "Cari Rekomendasi"}
          </button>
        </div>

        {/* RESULT */}

        {results?.bestRecommendation && (
          <>
            {/* BEST */}

            <div className="mt-10 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-3xl p-6">

              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">
                  ⭐
                </span>

                <h2 className="text-2xl font-black text-yellow-700">
                  BEST
                  RECOMMENDATION
                </h2>
              </div>

              <h3 className="text-3xl font-bold">
                {
                  results
                    .bestRecommendation
                    .namePaket
                }
              </h3>

              <p className="mt-3 text-gray-600">
                {
                  results
                    .bestRecommendation
                    .description
                }
              </p>

              <div className="flex flex-wrap gap-3 mt-5">

                <span className="bg-white px-4 py-2 rounded-full border">
                  Score :
                  {" "}
                  {
                    results
                      .bestRecommendation
                      .score
                  }
                </span>

                <span className="bg-white px-4 py-2 rounded-full border">
                  Rp{" "}
                  {results.bestRecommendation.price.toLocaleString(
                    "id-ID"
                  )}
                </span>

              </div>
            </div>

            {/* RANKING */}

            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-5">
                Ranking Paket
              </h2>

              <div className="space-y-5">

                {results.ranking.map(
                  (
                    item,
                    index
                  ) => (
                    <Link
                      key={
                        item.paketId
                      }
                      to={`/pelatihandetail/${item.paketId}`}
                    >
                      <div
                        className={`bg-white rounded-3xl overflow-hidden border hover:shadow-xl transition mb-4 ${
                          index === 0
                            ? "border-yellow-400"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row">

                          <img
                            src={
                              item.imagePaket
                            }
                            alt={
                              item.namePaket
                            }
                            className="w-full lg:w-80 h-56 object-cover"
                          />

                          <div className="p-6 flex-1">

                            <div className="flex justify-between">

                              <div>
                                <p className="text-blue-600 font-bold">
                                  Rank #
                                  {index +
                                    1}
                                </p>

                                <h3 className="text-2xl font-bold">
                                  {
                                    item.namePaket
                                  }
                                </h3>
                              </div>

                              {index ===
                                0 && (
                                <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold h-fit">
                                  ⭐
                                  Terbaik
                                </div>
                              )}
                            </div>

                            <p className="text-gray-500 mt-3">
                              {
                                item.description
                              }
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4">

                              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                {
                                  item.tingkatKesulitan
                                }
                              </span>

                              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                {
                                  item.metode
                                }
                              </span>

                              {item.sertifikat ===
                                "ada" && (
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                  Sertifikat
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">

                              <div>
                                <p className="text-xs text-gray-400">
                                  Harga
                                </p>
                                <p className="font-bold">
                                  Rp{" "}
                                  {item.price.toLocaleString(
                                    "id-ID"
                                  )}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-gray-400">
                                  Modul
                                </p>
                                <p className="font-bold">
                                  {
                                    item.jumlahModul
                                  }
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-gray-400">
                                  Durasi
                                </p>
                                <p className="font-bold">
                                  {
                                    item.duration
                                  }{" "}
                                  Hari
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-gray-400">
                                  Akses
                                </p>
                                <p className="font-bold">
                                  {
                                    item.masaAkses
                                  }{" "}
                                  Hari
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-gray-400">
                                  Score
                                </p>
                                <p className="font-bold text-blue-600">
                                  {
                                    item.score
                                  }
                                </p>
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RekomendasiPage;