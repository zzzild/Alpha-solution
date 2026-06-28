import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";

export default function ProfilePage() {
  const {
    userData,
    setToken,
    updateProfile,
    orderHistory,
    getUserOrderHistory,
  } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    window.location.href = "/";
  };

  const openEditModal = () => {
    setFormData({
      name: userData?.nameUser || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
    });

    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateProfile(formData);
    setIsEditing(false);
  };

  const firstLetter = userData?.nameUser?.charAt(0)?.toUpperCase() || "U";

  const totalTraining = orderHistory?.length || 0;

  const paidCount =
    orderHistory?.filter((o) => o.paymentStatus === "completed").length || 0;

  const pendingCount =
    orderHistory?.filter((o) => o.paymentStatus === "pending").length || 0;

  useEffect(() => {
    if (userData) {
      getUserOrderHistory();
    }
  }, [userData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="py-16 sm:py-20 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold ">
              Profil <span className="text-secondary">Saya</span>
            </h1>
          </div>

          <div className="bg-white rounded-2xl border border-blue-100 p-6 flex flex-wrap items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {firstLetter}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xl font-bold text-gray-900 truncate">
                {userData?.nameUser || "User"}
              </p>
              <p className="text-sm text-gray-400 truncate">
                {userData?.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="border border-red-500 text-red-500 hover:bg-red-50 rounded-xl px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-blue-100 p-5">
              <p className="text-base font-bold text-gray-900 mb-4">
                Informasi Pribadi
              </p>
              <div className="space-y-3">
                <ProfileItem label="Nama Lengkap" value={userData?.nameUser} />
                <div className="h-px bg-blue-50" />
                <ProfileItem label="Email" value={userData?.email} />
                <div className="h-px bg-blue-50" />
                <ProfileItem label="Nomor HP" value={userData?.phone} />
                <div className="h-px bg-blue-50" />
                <ProfileItem label="Jenis Kelamin" value={userData?.gender} />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-blue-100 p-5 flex flex-col">
              <p className="text-base font-bold text-gray-900 mb-4">Alamat</p>
              <div
                className="flex-1 rounded-xl p-4 text-sm text-gray-400"
                style={{ background: "#EEF2F8" }}
              >
                {userData?.address || "Belum ada alamat"}
              </div>
              <button
                onClick={openEditModal}
                className="mt-4 w-full py-2.5 rounded-xl border-2 border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Edit Profil
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Pelatihan Saya"
              value={totalTraining}
              color="text-blue-600"
            />

            <StatCard
              title="Pembayaran Berhasil"
              value={paidCount}
              color="text-green-600"
            />

            <StatCard
              title="Menunggu Konfirmasi"
              value={pendingCount}
              color="text-yellow-500"
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-blue-100">
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-lg font-bold text-gray-900">Edit Profil</h2>
            </div>

            <input
              type="text"
              placeholder="Nama"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-blue-100 rounded-xl p-3 mb-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
            />

            <input
              type="text"
              placeholder="Nomor HP"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full border border-blue-100 rounded-xl p-3 mb-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
            />

            <textarea
              placeholder="Alamat"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full border border-blue-100 rounded-xl p-3 mb-4 text-sm focus:outline-none focus:border-blue-400 transition-colors"
              rows={4}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 border border-blue-100 text-gray-500 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="flex-1 rounded-xl py-2.5 text-sm font-medium text-white transition-colors cursor-pointer bg-primary"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase text-gray-400 font-semibold">{label}</p>

      <p className="text-gray-800 font-medium mt-1">{value || "-"}</p>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
}
