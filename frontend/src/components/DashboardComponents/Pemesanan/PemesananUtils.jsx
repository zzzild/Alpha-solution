/**
 * Menghasilkan kelas CSS Tailwind untuk elemen input/select/textarea.
 * Menerapkan gaya error (merah) jika parameter `err` tidak kosong.
 *
 * @param {string} [err] - Pesan error
 * @returns {string} String kelas CSS
 */
export const inputCls = (err) =>
  `w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
    err
      ? "border-red-300 bg-red-50 focus:ring-red-300/30 focus:border-red-400"
      : "border-slate-200 bg-white focus:ring-blue-500/20 focus:border-blue-400"
  }`;

/**
 * Memformat angka harga ke format mata uang Rupiah Indonesia.
 * Menampilkan "Gratis" jika harga 0 atau kosong.
 *
 * @param {number} price
 * @returns {string} mis. "Rp 350.000" atau "Gratis"
 */
export const formatPrice = (price) => {
  if (!price || price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Memformat string tanggal ke format lokal Indonesia.
 * Menampilkan "-" jika string kosong atau tidak valid.
 *
 * @param {string} str - String tanggal (mis. "2024-01-15")
 * @returns {string} mis. "15 Jan 2024" atau "-"
 */
export const formatDate = (str) => {
  if (!str) return "-";
  return new Date(str).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
