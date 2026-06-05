import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function ProfilePage() {
  const {
    userData,
    setToken,
    updateProfile,
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

  const firstLetter =
    userData?.nameUser?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-36 bg-gradient-to-r from-blue-600 to-blue-500" />

          <div className="px-8 pb-8">
            <div className="-mt-14 flex flex-col md:flex-row md:items-end gap-5">

              <div className="w-28 h-28 rounded-full bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                  {firstLetter}
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {userData?.nameUser || "User"}
                </h1>

                <p className="text-gray-500">
                  {userData?.email}
                </p>
              </div>

              <button
                onClick={logout}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold"
              >
                Logout
              </button>

            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-5">
              Informasi Pribadi
            </h2>

            <div className="space-y-4">
              <ProfileItem
                label="Nama Lengkap"
                value={userData?.nameUser}
              />

              <ProfileItem
                label="Email"
                value={userData?.email}
              />

              <ProfileItem
                label="Nomor HP"
                value={userData?.phone}
              />

              <ProfileItem
                label="Jenis Kelamin"
                value={userData?.gender}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-5">
              Alamat
            </h2>

            <div className="bg-gray-50 rounded-xl p-4 text-gray-700">
              {userData?.address || "Belum ada alamat"}
            </div>

            <button
              onClick={openEditModal}
              className="mt-5 w-full py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50"
            >
              Edit Profil
            </button>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <StatCard title="Pelatihan Diikuti" value="0" />
          <StatCard title="Sertifikat" value="0" />
          <StatCard title="Pelatihan Selesai" value="0" />
        </div>

      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">

            <h2 className="text-xl font-bold mb-5">
              Edit Profil
            </h2>

            <input
              type="text"
              placeholder="Nama"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-3"
            />

            <input
              type="text"
              placeholder="Nomor HP"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-3"
            />

            <textarea
              placeholder="Alamat"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-4"
              rows={4}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 border rounded-lg py-3"
              >
                Batal
              </button>

              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white rounded-lg py-3"
              >
                Simpan
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase text-gray-400 font-semibold">
        {label}
      </p>

      <p className="text-gray-800 font-medium mt-1">
        {value || "-"}
      </p>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold text-blue-600 mt-2">
        {value}
      </p>
    </div>
  );
}