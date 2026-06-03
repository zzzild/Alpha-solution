import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pelatihan from "./pages/Pelatihan";
import AdminLayout from "./components/AdminComponents/AdminLayout";
import Dashboard from "./pages/AdminPages/Dashboard";
import PelatihanAdmin from "./pages/AdminPages/PelatihanAdmin";
import OrderPaket from "./pages/OrderPaket";
import Rekomendasi from "./pages/RekomendasiPage";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 1000 });

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pelatihan" element={<Pelatihan />} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />
        <Route path="/pelatihandetail/:paketId" element={<OrderPaket />} />

        {/* Admin - nested route */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pelatihanAdmin" element={<PelatihanAdmin />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
