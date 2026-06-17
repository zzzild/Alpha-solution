import React, { useContext, useEffect } from "react";

import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { dashDataStats, getDashboardStats } = useContext(AdminContext);

  useEffect(() => {
    getDashboardStats();
  }, []);

  const stats = [
    {
      label: "Total Paket",
      value: dashDataStats?.totalPaket || 0,
      icon: "ti-package",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total User",
      value: dashDataStats?.totalUser || 0,
      icon: "ti-users",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Pemesanan",
      value: dashDataStats?.totalPemesanan || 0,
      icon: "ti-shopping-cart",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Total Kriteria",
      value: dashDataStats?.totalKriteria || 0,
      icon: "ti-list-details",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>

        <p className="text-blue-100 text-sm">
          Kelola data pelatihan, pengguna, dan pemesanan.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-4 shadow-sm"
          >
            <div
              className={`${s.bg} ${s.color} w-11 h-11 rounded-xl flex items-center justify-center`}
            >
              <i className={`ti ${s.icon} text-xl`} />
            </div>

            <div>
              <p className="text-2xl font-bold text-slate-800">{s.value}</p>

              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-800 text-lg">
              Pemesanan Terbaru
            </h2>

            <p className="text-sm text-slate-500">5 transaksi terakhir</p>
          </div>

          <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
            {dashDataStats?.latestOrders?.length || 0} Data
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  User
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Paket
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Tanggal
                </th>
              </tr>
            </thead>

            <tbody>
              {dashDataStats?.latestOrders?.length > 0 ? (
                dashDataStats.latestOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                          {order.userData?.nameUser?.charAt(0) || "U"}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {order.userData?.nameUser || "User tidak ditemukan"}
                          </p>

                          <p className="text-xs text-slate-500">
                            {order.userData?.email || "Tidak ada email"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-800">
                          {order.paketData?.namePaket ||
                            "Paket tidak ditemukan"}
                        </p>

                        <p className="text-xs text-slate-500">
                          ID: {order.pemesananId}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          order.paymentStatus === "completed"
                            ? "bg-green-100 text-green-700"
                            : order.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-700">
                          {order.updatedAt
                            ? new Date(order.updatedAt).toLocaleDateString(
                                "id-ID",
                              )
                            : "-"}
                        </p>

                        <p className="text-xs text-slate-500">
                          {order.updatedAt
                            ? new Date(order.updatedAt).toLocaleTimeString(
                                "id-ID",
                              )
                            : "-"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-slate-500">
                    Belum ada data pemesanan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
