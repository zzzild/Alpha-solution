import React from "react";
import { STATS } from "../assets/assets.js";

const Statistik = () => {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-gray-100">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="stat-card flex flex-col items-center justify-center py-8 px-4 text-center transition-colors cursor-default"
            >
              <div className="stat-value text-3xl sm:text-[2rem] font-black text-gray-900 leading-none mb-1 transition-colors duration-200">
                {s.value}
              </div>
              <div className="text-[12px] text-gray-400 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistik;
