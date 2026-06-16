import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaketCard from "../components/PaketCard";

export default function PelatihanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-16 sm:py-20 min-h-screen">
        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="mb-8 fade-up">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
              Pelatihan
            </h1>
            <p className="text-[14.5px] text-gray-500 max-w-xl leading-relaxed">
              Temukan pelatihan terbaik sesuai kebutuhan dan tingkat
              kemampuanmu.
            </p>
          </div>
          <div className="fade-up">
            <PaketCard />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
