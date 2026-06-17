import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pelatihan from "./pages/Pelatihan";
import DashboardLayout from "./components/DashboardComponents/DashboardLayout";
import Dashboard from "./pages/DashboardAdmin/Dashboard";
import PelatihanAdmin from "./pages/DashboardAdmin/PelatihanAdmin";
import Pemesanan from "./pages/DashboardAdmin/Pemesanan";
import OrderPaket from "./pages/OrderPaket";
import Rekomendasi from "./pages/RekomendasiPage";
import Login from "./components/DashboardComponents/Login";
import ProfilePage from "./pages/ProfilePage";
import Register from "./components/DashboardComponents/Register";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import MyOrders from "./pages/MyOrder";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";

AOS.init({ duration: 1000 });

const App = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/pelatihan" element={<Pelatihan />} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />
        <Route path="/pelatihandetail/:paketId" element={<OrderPaket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pemesanan" element={<MyOrders />} />

        {/* ADMIN LOGIN */}
        <Route path="/login/admin" element={<Login admin />} />

        {/* ADMIN PAGE */}
        <Route element={aToken ? <DashboardLayout/> : <Navigate to="/login/admin"/>}> 

        <Route
          path="/admin"
          element={aToken ? <Dashboard /> : <Navigate to="/login/admin" />}
          />

        <Route
          path="/admin/paket-pelatihan"
          element={aToken ? <PelatihanAdmin /> : <Navigate to="/login/admin" />}
          />

        <Route
          path="/admin/pemesanan"
          element={aToken ? <Pemesanan /> : <Navigate to="/login/admin" />}
          />
          </Route>
      </Routes>
    </div>
  );
};

export default App;
