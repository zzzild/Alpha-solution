import React, { useContext, useEffect, useState } from "react";
import {
  BookIcon,
  ClockIcon,
  CalendarIcon,
  UploadIcon,
} from "../components/Icons";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function StatPill({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5 text-gray-400">
        {icon}
        <span className="text-[10.5px] uppercase tracking-wider font-semibold">
          {label}
        </span>
      </div>
      <span className="text-[14px] font-extrabold text-gray-900">{value}</span>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
      <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-[15px] font-extrabold text-gray-900">{value}</p>
    </div>
  );
}

function Modal({ children }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl w-full max-w-md fade-up">
        {children}
      </div>
    </div>
  );
}

const DetailPaket = () => {
  const { paketId } = useParams();
  const { paketInfo, fetchPaketInfo, makeOrder, submitPayment, token } =
    useContext(AppContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPaketInfo(paketId);
  }, [paketId]);

  const handleBuyNow = () =>{ 
    if (!token) {
      toast.error("Silahkan login terlebih dahulu")
      navigate('/login')
      return;
    }
    setShowConfirmModal(true)};

  const confirmOrder = async () => {
    try {
      setLoading(true);
      const response = await makeOrder(paketId);
      if (response.success) {
        toast.success("Pesanan berhasil dibuat");
        setCurrentOrderId(
          response.data?.pemesananId || response.data?._id || response.orderId,
        );
        setShowConfirmModal(false);
        setShowPaymentModal(true);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal membuat pesanan");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPayment = async () => {
    if (!paymentProof)
      return toast.error("Pilih bukti pembayaran terlebih dahulu");
    try {
      setLoading(true);
      const success = await submitPayment(currentOrderId, paymentProof);
      if (success) {
        toast.success("Pembayaran berhasil");
        setShowPaymentModal(false);
        setPaymentProof(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal upload pembayaran");
    } finally {
      setLoading(false);
    }
  };

  if (!paketInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg
            className="spinner w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          <span className="text-[13px] font-semibold">Memuat data...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="py-16 sm:py-20 min-h-screen">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-6 fade-up">
              <div className="relative overflow-hidden">
                <img
                  src={paketInfo.imagePaket}
                  alt={paketInfo.namePaket}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11.5px] font-semibold capitalize">
                    {paketInfo.tingkatKesulitan}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-bg-secondary text-[11.5px] font-semibold capitalize">
                    {paketInfo.metode}
                  </span>
                  {paketInfo.sertifikat === "ada" && (
                    <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[11.5px] font-semibold">
                      ✓ Sertifikat
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
                  {paketInfo.namePaket}
                </h1>

                <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
                  {paketInfo.description}
                </p>

                <div className="grid grid-cols-3 gap-6 pt-5 border-t border-gray-100">
                  <StatPill
                    icon={<BookIcon />}
                    label="Modul"
                    value={paketInfo.jumlahModul}
                  />
                  <StatPill
                    icon={<ClockIcon />}
                    label="Durasi"
                    value={`${paketInfo.duration} Hari`}
                  />
                  <StatPill
                    icon={<CalendarIcon />}
                    label="Akses"
                    value={`${paketInfo.masaAkses} Hari`}
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div
                className="lg:col-span-2 fade-up"
                style={{ animationDelay: "0.08s" }}
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 pt-5 pb-4 border-b border-gray-50">
                    <h2 className="text-[15px] font-bold text-gray-800">
                      Informasi Pelatihan
                    </h2>
                    <p className="text-[12.5px] text-gray-400 mt-0.5">
                      Detail lengkap paket ini
                    </p>
                  </div>
                  <div className="p-6 grid sm:grid-cols-2 gap-4">
                    <InfoCard
                      label="Jumlah Modul"
                      value={`${paketInfo.jumlahModul} Modul`}
                    />
                    <InfoCard
                      label="Durasi"
                      value={`${paketInfo.duration} Hari`}
                    />
                    <InfoCard
                      label="Masa Akses"
                      value={`${paketInfo.masaAkses} Hari`}
                    />
                    <InfoCard label="Metode Belajar" value={paketInfo.metode} />
                  </div>
                </div>
              </div>

              <div className="fade-up" style={{ animationDelay: "0.12s" }}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                    Harga Paket
                  </div>
                  <div className="text-[28px] font-extrabold text-gray-900 mb-1">
                    Rp {paketInfo.price.toLocaleString("id-ID")}
                  </div>
                  <p className="text-[12px] text-gray-400 mb-6">
                    Akses {paketInfo.masaAkses} hari penuh
                  </p>

                  <button
                    onClick={handleBuyNow}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-lightprimary text-white rounded-xl text-[14px] font-bold transition-colors shadow-md shadow-blue-200 cursor-pointer"
                  >
                    Beli Sekarang
                  </button>

                  <div className="flex items-center gap-2 mt-4 text-[11.5px] text-gray-400">
                    <span>Pembayaran aman & terverifikasi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showConfirmModal && (
          <Modal>
            <div className="p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[12px] font-bold text-secondary mb-4">
                Konfirmasi Pembelian
              </div>
              <h2 className="text-[18px] font-extrabold text-gray-900 mb-1">
                Yakin ingin membeli?
              </h2>
              <p className="text-[13px] text-gray-500 mb-2">
                Anda akan membeli paket:
              </p>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6">
                <p className="font-extrabold text-gray-900">
                  {paketInfo.namePaket}
                </p>
                <p className="text-[13px] text-gray-500 mt-0.5">
                  Rp {paketInfo.price.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={confirmOrder}
                  disabled={loading}
                  className="flex-1 py-2.5 bg-primary hover:bg-lightprimary disabled:opacity-70 text-white rounded-xl text-[13px] font-bold transition-colors shadow-md shadow-blue-200 cursor-pointer"
                >
                  {loading ? "Memproses..." : "Ya, Beli"}
                </button>
              </div>
            </div>
          </Modal>
        )}

        {showPaymentModal && (
          <Modal>
            <div className="p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-[12px] font-bold text-green-700 mb-4">
                <UploadIcon /> Upload Bukti Pembayaran
              </div>
              <h2 className="text-[18px] font-extrabold text-gray-900 mb-4">
                Transfer & Upload
              </h2>

              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-4">
                <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">
                  Transfer ke
                </p>
                <p className="text-[15px] font-extrabold text-gray-900">
                  BCA · 1234567890
                </p>
                <p className="text-[13px] text-gray-500">a.n Alpha Solution</p>
              </div>

              <label className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors text-[13px] text-gray-500 mb-5">
                <UploadIcon />
                <span className="truncate">
                  {paymentProof?.name ?? "Pilih bukti pembayaran..."}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setPaymentProof(e.target.files[0])}
                />
              </label>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleUploadPayment}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-secondary hover:bg-blue-800 disabled:opacity-70 text-white rounded-xl text-[13px] font-bold transition-colors shadow-md shadow-blue-200 cursor-pointer"
                >
                  {loading ? (
                    "Mengupload..."
                  ) : (
                    <>
                      <UploadIcon /> Upload Bukti
                    </>
                  )}
                </button>
              </div>
            </div>
          </Modal>
        )}

        <Footer />
      </div>
    </>
  );
};

export default DetailPaket;
