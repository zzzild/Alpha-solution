import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const DetailPaket = () => {
  const { paketId } = useParams();

  const {
    paketInfo,
    fetchPaketInfo,
    makeOrder,
    submitPayment,
  } = useContext(AppContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPaketInfo(paketId);
  }, [paketId]);

  const handleBuyNow = () => {
    setShowConfirmModal(true);
  };

  const confirmOrder = async () => {
    try {
      setLoading(true);

      const response = await makeOrder(paketId);

      if (response.success) {
        toast.success("Pesanan berhasil dibuat");

        setCurrentOrderId(
          response.data?.pemesananId ||
          response.data?._id ||
          response.orderId
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
    if (!paymentProof) {
      return toast.error("Pilih bukti pembayaran terlebih dahulu");
    }

    try {
      setLoading(true);

      const success = await submitPayment(
        currentOrderId,
        paymentProof
      );

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
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img
            src={paketInfo.imagePaket}
            alt={paketInfo.namePaket}
            className="w-full h-[400px] object-cover"
          />

          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                {paketInfo.tingkatKesulitan}
              </span>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                {paketInfo.metode}
              </span>

              {paketInfo.sertifikat === "ada" && (
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                  Sertifikat
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {paketInfo.namePaket}
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {paketInfo.description}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">
                Informasi Pelatihan
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border rounded-xl p-4">
                  <p className="text-gray-500 text-sm">
                    Jumlah Modul
                  </p>
                  <p className="font-bold text-lg">
                    {paketInfo.jumlahModul}
                  </p>
                </div>

                <div className="border rounded-xl p-4">
                  <p className="text-gray-500 text-sm">
                    Durasi
                  </p>
                  <p className="font-bold text-lg">
                    {paketInfo.duration} Jam
                  </p>
                </div>

                <div className="border rounded-xl p-4">
                  <p className="text-gray-500 text-sm">
                    Masa Akses
                  </p>
                  <p className="font-bold text-lg">
                    {paketInfo.masaAkses} Hari
                  </p>
                </div>

                <div className="border rounded-xl p-4">
                  <p className="text-gray-500 text-sm">
                    Metode Belajar
                  </p>
                  <p className="font-bold text-lg">
                    {paketInfo.metode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <p className="text-gray-500 text-sm">
                Harga Paket
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Rp {paketInfo.price.toLocaleString("id-ID")}
              </h2>

              <button
                onClick={handleBuyNow}
                className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 cursor-pointer"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-3">
              Konfirmasi Pembelian
            </h2>

            <p>
              Apakah Anda yakin ingin membeli paket ini?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border py-2 rounded-lg"
              >
                Tidak
              </button>

              <button
                onClick={confirmOrder}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pembayaran */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">
              Upload Bukti Pembayaran
            </h2>

            <div className="bg-gray-100 p-4 rounded-xl mb-4">
              <p className="font-semibold">
                Transfer ke:
              </p>

              <p>BCA : 1234567890</p>
              <p>a.n Alpha Solution</p>
            </div>

            <input
              type="file"
              onChange={(e) =>
                setPaymentProof(
                  e.target.files[0]
                )
              }
              className="w-full border p-2 rounded-lg"
            />

            <div className="flex gap-3 mt-5">
              <button
                onClick={() =>
                  setShowPaymentModal(false)
                }
                className="flex-1 border py-2 rounded-lg"
              >
                Batal
              </button>

              <button
                onClick={handleUploadPayment}
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg"
              >
                Upload Bukti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPaket;