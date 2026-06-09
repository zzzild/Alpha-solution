import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaketCard from "../components/PaketCard";

export default function PelatihanPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Pelatihan
          </h1>

          <p className="mt-2 text-gray-500">
            Temukan pelatihan terbaik sesuai kebutuhan dan tingkat kemampuanmu.
          </p>
        </div>

        {/* Card List */}
        <PaketCard />

        {/* Load More */}
        
      </main>

      <Footer />
    </div>
  );
}