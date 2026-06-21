/**
 * inputCls — menghasilkan kelas CSS Tailwind untuk elemen input/select/textarea.
 * Menerapkan gaya error (merah) jika parameter `err` tidak kosong.
 *
 * @param {string} [err] - Pesan error; jika ada, gunakan gaya error
 * @returns {string} String kelas CSS
 */
export const inputCls = (err) =>
  `w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
    err
      ? "border-red-300 bg-red-50 focus:ring-red-300/30 focus:border-red-400"
      : "border-slate-200 bg-white focus:ring-blue-500/20 focus:border-blue-400"
  }`;

/**
 * formatPrice — memformat angka harga ke format mata uang Rupiah Indonesia.
 * Menampilkan "Gratis" jika harga bernilai 0.
 *
 * @param {number} price - Nilai harga dalam Rupiah
 * @returns {string} Harga terformat, mis. "Rp 350.000" atau "Gratis"
 */
export const formatPrice = (price) => {
  if (price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
