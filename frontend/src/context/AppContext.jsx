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
      } else {
        toast.error("Pendaftaran gagal!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada saat registrasi!");
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
      } else {
        toast.error("Login gagal!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan pada saat login!");
    }
  };

  const loadProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error("Gagal mengambil data profil!");
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "Unauthorized"
      ) {
        localStorage.removeItem("token");
        setToken(false);
        toast.error("Sesi Anda telah habis. Silakan login kembali.");
      } else {
        toast.error("Terjadi kesalahan pada saat mengambil data profil!");
      }
    }
  };

  const fetchPaket = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/paket`);
      console.log("Response API:", data);

      if (data.success) {
        setPaket(data.paket);
      } else {
        toast.error("Gagal mengambil data paket!");
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
      } else {
        toast.error("Gagal mengambil data paket!");
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

  const value = {
    backendUrl,
    registerUser,
    loginUser,
    token,
    paket,
    fetchPaket,
    fetchPaketInfo,
    paketInfo,
    loadProfileData,
    userData,
    getRecommendation,
  };

  useEffect(() => {
    (fetchPaket(), fetchPaketInfo(), loadProfileData());
  }, []);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
