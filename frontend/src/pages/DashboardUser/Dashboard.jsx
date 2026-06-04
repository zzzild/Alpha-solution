// import { useState } from "react";
// import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default Dashboard;
