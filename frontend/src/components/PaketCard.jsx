import React from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const PaketCard = ({ limit }) => {
  const { paket } = useContext(AppContext);

  const displayPaket = limit ? paket.slice(0, limit) : paket;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {displayPaket?.map((item) => (
        <Link
          key={item.paketId}
          to={`/pelatihandetail/${item.paketId}`}
          className="group"
        >
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col hover:border-blue-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 group">
            <div className="relative overflow-hidden aspect-video">
              <img
                src={item.imagePaket}
                alt={item.namePaket}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 text-[11px] font-semibold text-gray-800 capitalize">
                {item.tingkatKesulitan}
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <div className="text-[11px] font-semibold text-blue-700">
                {item.paketId}
              </div>

              <div className="text-[12px] text-gray-500 capitalize">
                {item.metode}
              </div>

              <div className="text-[13.5px] font-bold text-gray-900 leading-snug line-clamp-2 min-h-[40px]">
                {item.namePaket}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11.5px] font-semibold capitalize">
                  {item.tingkatKesulitan}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-bg-secondary text-[11.5px] font-semibold capitalize">
                  {item.metode}
                </span>
                {item.sertifikat === "ada" && (
                  <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[11.5px] font-semibold">
                    ✓ Sertifikat
                  </span>
                )}
              </div>

              <div className="mt-auto">
                <div className="flex items-end justify-between mt-3">
                  <div>
                    <div className="text-[10.5px] text-gray-400">Harga</div>

                    <div className="text-lg font-extrabold text-gray-900">
                      Rp {item.price.toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default PaketCard;
