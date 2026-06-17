import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "",
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [pemesanan, setPemesanan] = useState([]);
  const [dashDataStats, setDashDataStats] = useState();
  const [paket, setPaket] = useState([])

  const loginAdmin = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("aToken", data.atoken);
        setAToken(data.atoken);

        toast.success("Login berhasil!");
        return true;
      }

      toast.error(data.message || "Login gagal!");
      return false;
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat login!");
      return false;
    }
  };

  const addPaket = async (formData) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-paket`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (data.success) {
        toast.success("Paket berhasil ditambahkan!");
        getPaket();
      } else {
        toast.error("Gagal menambahkan paket!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada saat menambahkan paket!");
    }
  };

  const deletePaket = async (paketId) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete-paket/${paketId}`,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        },
      );

      if (data.success) {
        toast.success("Paket berhasil dihapus!");
        getPaket();
      } else {
        toast.error("Gagal menghapus paket!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada saat menghapus paket!");
    }
  };

  const updatePaket = async (paketId, formData) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/admin/update-paket/${paketId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (data.success) {
        toast.success("Paket berhasil diperbarui!");
        getPaket();
      } else {
        toast.error("Gagal memperbarui paket!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada saat memperbarui paket!");
    }
  };

  const getPaket = async () => {
    try {
        const {data} = await axios.get(`${backendUrl}/api/user/paket`);
        if (data.success) {
            setPaket(data.daftarPaket);
        } else {
            console.error("Gagal mengambil data paket:", data.message);
        toast.error("Gagal ");
        }
    } catch (error) {
        console.log(error);
        toast.error("Gagal mengambil data paket")
    }
  }

  const addKriteria = async (formData) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-kriteria`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        },
      );

      if (data.success) {
        toast.success("Kriteria berhasil ditambahkan!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada saat menambahkan kriteria!");
    }
  };

  const deleteKriteria = async (kriteriaId) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete-kriteria/${kriteriaId}`,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        },
      );
      if (data.success) {
        toast.success("Kriteria berhasil dihapus!");
      } else {
        toast.error("Gagal menghapus kriteria!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada saat menghapus kriteria!");
    }
  };

  const updateKriteria = async (kriteriaId, formData) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/admin/update-kriteria/${kriteriaId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        },
      );
      if (data.success) {
        toast.success("Kriteria berhasil diperbarui!");
      } else {
        toast.error("Gagal memperbarui kriteria!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada saat memperbarui kriteria!");
    }
  };

  const getPemesanan = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/pemesanan`, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
      if (data.success) {
        setPemesanan(data.pemesanan);
      } else {
        console.error("Gagal mengambil data pemesanan:", data.message);
        toast.error("Gagal mengambil data pemesanan!");
      }
    } catch (error) {
      console.error(
        "Terjadi kesalahan pada saat mengambil data pemesanan:",
        error,
      );
      toast.error("Terjadi kesalahan pada saat mengambil data pemesanan!");
    }
  };

  const getDashboardStats = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/dashboard-stats`,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        },
      );

      if (data.success) {
        setDashDataStats(data.stats);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    backendUrl,
    aToken,
    setAToken,
    loginAdmin,
    addPaket,
    deletePaket,
    updatePaket,
    addKriteria,
    deleteKriteria,
    updateKriteria,
    getPemesanan,
    pemesanan,
    getDashboardStats,
    dashDataStats,getPaket, paket
  };

  useEffect(() => {
    if (aToken) {
      getPemesanan();
      getDashboardStats();
      getPaket();
    }
  }, [aToken]);

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
