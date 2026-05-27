import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Paket from "./pages/Paket";
import PaketDetail from "./pages/PaketDetail";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1000,
});

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/s" element={<Home />} />
        <Route path="/paket" element={<Paket />} />
        <Route path="/detail" element={<PaketDetail />} />
      </Routes>
    </div>
  );
};

export default App;