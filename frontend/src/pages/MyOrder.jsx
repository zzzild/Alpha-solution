import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";

const MyOrders = () => {
  const {
    orderHistory,
    getUserOrderHistory,
    submitPayment,
  } = useContext(AppContext);

  const [selectedFile, setSelectedFile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserOrderHistory();
  }, []);

  const handleUpload = async (orderId) => {
    const file = selectedFile[orderId];

    if (!file) {
      alert("Pilih bukti pembayaran terlebih dahulu");
      return;
    }

    setLoading(true);

    const success = await submitPayment(
      orderId,
      file
    );

    if (success) {
      await getUserOrderHistory();
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          Pesanan Saya
        </h1>

        {orderHistory.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            Belum ada pesanan
          </div>
        ) : (
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div
                key={order.pemesananId}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-xl">
                      {
                        order.paketData
                          ?.namePaket
                      }
                    </h2>

                    <p className="text-gray-500 mt-1">
                      ID Pesanan :
                      {" "}
                      {
                        order.pemesananId
                      }
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      order.paymentStatus ===
                      "completed"
                        ? "bg-green-100 text-green-700"
                        : order.paymentStatus ===
                            "expired"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                  >
                    {
                      order.paymentStatus
                    }
                  </span>
                </div>

                {order.paymentStatus ===
                  "pending" && (
                  <div className="mt-6 border-t pt-4">
                    <p className="font-medium mb-3">
                      Upload Bukti
                      Pembayaran
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setSelectedFile(
                          (
                            prev
                          ) => ({
                            ...prev,
                            [
                              order.pemesananId
                            ]:
                              e
                                .target
                                .files[0],
                          })
                        )
                      }
                    />

                    <button
                      onClick={() =>
                        handleUpload(
                          order.pemesananId
                        )
                      }
                      disabled={loading}
                      className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Upload Bukti
                    </button>
                  </div>
                )}

                {order.paymentStatus ===
                  "completed" && (
                  <div className="mt-4 text-green-600 font-medium">
                    Pesanan Selesai
                  </div>
                )}

                {order.paymentStatus ===
                  "expired" && (
                  <div className="mt-4 text-red-600 font-medium">
                    Pesanan telah
                    kadaluarsa
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;