import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false,
  );

  const [paket, setPaket] = useState([]);
  const [paketInfo, setPaketInfo] = useState(null);
  const [userData, setUserData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  const registerUser = async (formData) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/register`,
        formData,
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);

        toast.success("Pendaftaran berhasil!");

        return true;
      }

      toast.error(data.message || "Pendaftaran gagal!");

      return false;
    } catch (error) {
      console.error(error);

      toast.error("Terjadi kesalahan pada saat registrasi!");

      return false;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);

        setToken(data.token);

        toast.success("Login berhasil!");

        return true;
      }

      toast.error(data.message || "Login gagal!");

      return false;
    } catch (error) {
      console.error(error);

      toast.error("Terjadi kesalahan pada saat login!");

      return false;
    }
  };

  const loadProfileData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUserData(response.data.userData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async (formData) => {
    try {
      const { data } = await axios.put(backendUrl + "/api/user/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserData(data.userData);
        toast.success("Profil berhasil diperbarui!");
        await loadProfileData();
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui profil!");
    }
  };

  const fetchPaket = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/paket`);

      if (data.success) {
        setPaket(data.paket);
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada saat mengambil data paket!");
    }
  };

  const fetchPaketInfo = async (paketId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/paket/${paketId}`,
      );
      if (data.success) {
        setPaketInfo(data.paket);
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada saat mengambil data paket!");
    }
  };

  const getRecommendation = async (formData) => {
    const { data } = await axios.post(
      `${backendUrl}/api/user/recommendation`,
      formData,
    );

    return data;
  };

  const makeOrder = async (paketId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/order-paket`,
        { paketId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Gagal membuat pesanan");

      return {
        success: false,
      };
    }
  };

  const getUserOrderHistory = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/order-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setOrderHistory(data.orders.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada saat mengambil riwayat pesanan!");
    }
  };

  const submitPayment = async (orderId, paymentProof) => {
  try {
    const formData = new FormData();

    formData.append(
      "paymentProof",
      paymentProof
    );

    const { data } =
      await axios.post(
        `${backendUrl}/api/user/upload-payment-proof/${orderId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    if (data.success) {
      toast.success(data.message);

      await getUserOrderHistory();

      return true;
    }

    return false;
  } catch (error) {
    console.error(error);

    toast.error(
      "Gagal mengunggah bukti pembayaran!"
    );

    return false;
  }
};

  const value = {
    backendUrl,
    registerUser,
    loginUser,
    token,
    setToken,
    userData,
    setUserData,
    paket,
    fetchPaket,
    fetchPaketInfo,
    paketInfo,
    loadProfileData,
    getRecommendation,
    makeOrder,
    getUserOrderHistory,
    submitPayment,
    orderHistory,
    updateProfile,
  };

  useEffect(() => {
    fetchPaket();
    fetchPaketInfo();
  }, []);

  useEffect(() => {
    if (token) {
      loadProfileData();
    }
  }, [token]);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
