// Opsi status pemesanan
export const STATUS_OPTIONS = ["menunggu", "dikonfirmasi", "ditolak"];

// Kelas warna badge per status
export const STATUS_COLOR = {
  menunggu: "bg-amber-50 text-amber-700 border-amber-200",
  dikonfirmasi: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ditolak: "bg-red-50 text-red-600 border-red-200",
};

// Ikon badge per status
export const STATUS_ICON = {
  menunggu: (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  dikonfirmasi: (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  ditolak: (
    <svg
      className="w-3 h-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
};

// Daftar paket yang tersedia beserta harganya
export const PAKET_OPTIONS = [
  { label: "React.js untuk Pemula", price: 350000 },
  { label: "UI/UX Figma Profesional", price: 275000 },
  { label: "Data Science dengan Python", price: 499000 },
  { label: "Digital Marketing Strategis", price: 199000 },
  { label: "Agile Project Management", price: 425000 },
];

// Nilai awal form kosong untuk mode create
export const EMPTY_FORM = {
  namaPemesan: "",
  paket: PAKET_OPTIONS[0].label,
  harga: PAKET_OPTIONS[0].price,
  status: "menunggu",
  tanggal: "",
  buktiPembayaran: "",
  catatan: "",
};

// Data dummy awal
export const INITIAL_DATA = [
  {
    id: 1,
    namaPemesan: "Budi Santoso",
    paket: "React.js untuk Pemula",
    harga: 350000,
    status: "menunggu",
    tanggal: "2024-01-15",
    buktiPembayaran: "",
    catatan: "",
  },
  {
    id: 2,
    namaPemesan: "Siti Rahayu",
    paket: "UI/UX Figma Profesional",
    harga: 275000,
    status: "dikonfirmasi",
    tanggal: "2024-01-20",
    buktiPembayaran: "",
    catatan: "Mohon konfirmasi segera",
  },
  {
    id: 3,
    namaPemesan: "Ahmad Fauzi",
    paket: "Data Science dengan Python",
    harga: 499000,
    status: "ditolak",
    tanggal: "2024-01-22",
    buktiPembayaran: "",
    catatan: "Bukti pembayaran tidak valid",
  },
];
