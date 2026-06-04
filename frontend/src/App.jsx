import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pelatihan from "./pages/Pelatihan";
import PelatihanDetail from "./pages/PelatihanDetail";
import Rekomendasi from "./pages/Rekomendasi";
import Login from "./components/DashboardComponents/Login";
import Register from "./components/DashboardComponents/Register";
import AdminLayout from "./components/DashboardComponents/AdminLayout";
import DashboardAdmin from "./pages/DashboardAdmin/Dashboard";
import PelatihanAdmin from "./pages/DashboardAdmin/PelatihanAdmin";
import DashboardUser from "./pages/DashboardUser/Dashboard";
// import PemasananUser from "./pages/DashboardUser/PemasananUser";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 1000 });

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pelatihan" element={<Pelatihan />} />
        <Route path="/pelatihandetail" element={<PelatihanDetail />} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="pelatihan" element={<PelatihanAdmin />} />
        </Route>
        <Route path="/user" element={<AdminLayout />}>
          <Route index element={<DashboardUser />} />
          {/* <Route path="pemesanan" element={<PemasananUser />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
