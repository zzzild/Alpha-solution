import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pelatihan from "./pages/Pelatihan";
import AdminLayout from "./components/DashboardComponents/AdminLayout";
import Dashboard from "./pages/DashboardAdmin/Dashboard";
import PelatihanAdmin from "./pages/DashboardAdmin/PelatihanAdmin";
import OrderPaket from "./pages/OrderPaket";
import Rekomendasi from "./pages/RekomendasiPage";
import Login from "./components/DashboardComponents/Login";
import ProfilePage from "./pages/ProfilePage";
import Register from "./components/DashboardComponents/Register";
import AOS from "aos";
import "aos/dist/aos.css";
import {ToastContainer} from "react-toastify";
import MyOrders from "./pages/MyOrder";

AOS.init({ duration: 1000 });

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pelatihan" element={<Pelatihan />} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />
        <Route path="/pelatihandetail/:paketId" element={<OrderPaket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/profile"
  element={<ProfilePage />}
/>
<Route path="/my-order" element={<MyOrders/>}/>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pelatihanadmin" element={<PelatihanAdmin />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
