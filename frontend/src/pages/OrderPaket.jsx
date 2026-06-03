import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";

const DetailPaket = () => {
  const { paketId } = useParams();

  const { paketInfo, fetchPaketInfo } = useContext(AppContext);

  useEffect(() => {
    fetchPaketInfo(paketId);
  }, [paketId]);

  if (!paketInfo) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img
            src={paketInfo.imagePaket}
            alt={paketInfo.namePaket}
            className="w-full h-[400px] object-cover"
          />

          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                {paketInfo.tingkatKesulitan}
              </span>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                {paketInfo.metode}
              </span>

              {paketInfo.sertifikat === "ada" && (
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                  Sertifikat
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {paketInfo.namePaket}
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {paketInfo.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Kiri */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Informasi Pelatihan</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border rounded-xl p-4">
                  <p className="text-gray-500 text-sm">Jumlah Modul</p>
                  <p className="font-bold text-lg">{paketInfo.jumlahModul}</p>
                </div>

                <div className="border rounded-xl p-4">
                  <p className="text-gray-500 text-sm">Durasi</p>
                  <p className="font-bold text-lg">{paketInfo.duration} Jam</p>
                </div>

                <div className="border rounded-xl p-4">
                  <p className="text-gray-500 text-sm">Masa Akses</p>
                  <p className="font-bold text-lg">
                    {paketInfo.masaAkses} Hari
                  </p>
                </div>

                <div className="border rounded-xl p-4">
                  <p className="text-gray-500 text-sm">Metode Belajar</p>
                  <p className="font-bold text-lg">{paketInfo.metode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <p className="text-gray-500 text-sm">Harga Paket</p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Rp {paketInfo.price.toLocaleString("id-ID")}
              </h2>

              <button className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 cursor-pointer">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPaket;
