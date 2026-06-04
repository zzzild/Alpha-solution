import React from "react";
import { CATEGORIES } from "../assets/assets.js";

const ChevronRight = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Category = () => {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[12px] font-bold text-blue-600 uppercase tracking-widest mb-2">
              Kejuruan
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Pilih Bidang Minatmu
            </h2>
          </div>
          <button className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold text-blue-700 hover:underline">
            Lihat semua <ChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat, i) => (
            <button
              key={i}
              className={`category-chip flex flex-col items-center gap-2.5 px-3 py-5 rounded-2xl border transition-all duration-200 cursor-pointer ${cat.color}`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <div className="text-center">
                <div className="text-[12px] font-bold leading-snug">
                  {cat.name}
                </div>
                <div className="text-[11px] opacity-60 mt-0.5">
                  {cat.count} pelatihan
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
