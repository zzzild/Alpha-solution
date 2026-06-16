import { useState } from "react";
import Navbar from "../components/Navbar";

// Icons
const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-secondary flex-shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const MapPinIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const UsersIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const CertIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const ShareIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const InfoIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const XIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const SuccessIcon = () => (
  <svg
    className="w-14 h-14 text-green-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Data
const TRAINING = {
  id: "#9FAE2E41",
  badge: "Batch 2 Tahun 2026",
  category: "Bisnis Dan Manajemen",
  title: "Digital Office Administration Berbasis Google Workspace",
  subtitle:
    "Kuasai tools produktivitas modern untuk administrasi perkantoran digital yang efisien dan profesional",
  tags: ["Offline", "Non Boarding", "Bantuan Transport"],
  reviewCount: 128,
  lembaga: "BPVP SAMARINDA",
  lembagaLogo: null,
  lokasi: "Samarinda, Kalimantan Timur",
  durasi: "200 Jam",
  kuota: 30,
  terdaftar: 24,
  mulai: "14 Juli 2026",
  selesai: "15 Agustus 2026",
  pendaftaran: "1 – 10 Juli 2026",
  sertifikasi: "Sertifikat",
  harga: "Gratis",
  img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=500&fit=crop",
  fasilitas: [
    "Bantuan Transport",
    "Modul & Materi Digital",
    "Sertifikat Kompetensi",
  ],
  persyaratan: [
    "WNI usia 17–45 tahun",
    "Pendidikan minimal SMA/SMK sederajat",
    "Memiliki KTP yang masih berlaku",
    "Belum pernah mengikuti program Prakerja",
    "Bersedia mengikuti seluruh rangkaian pelatihan",
  ],
  kompetensi: [
    "Mengelola dokumen digital menggunakan Google Docs & Drive",
    "Membuat laporan dan presentasi profesional dengan Google Slides",
    "Mengorganisasi jadwal dan agenda kerja dengan Google Calendar",
    "Berkolaborasi tim secara real-time menggunakan Google Meet",
    "Mengelola spreadsheet data menggunakan Google Sheets",
    "Membuat formulir survei dan pengumpulan data dengan Google Forms",
  ],
  kurikulum: [
    {
      minggu: "Minggu 1",
      topik: "Pengenalan Ekosistem Google Workspace",
      jp: "40 JP",
    },
    {
      minggu: "Minggu 2",
      topik: "Google Docs & Drive untuk Administrasi",
      jp: "40 JP",
    },
    {
      minggu: "Minggu 3",
      topik: "Google Sheets & Data Management",
      jp: "40 JP",
    },
    {
      minggu: "Minggu 4",
      topik: "Google Slides & Komunikasi Profesional",
      jp: "40 JP",
    },
    {
      minggu: "Minggu 5",
      topik: "Kolaborasi Tim & Ujian Sertifikasi",
      jp: "40 JP",
    },
  ],
};

const PENDIDIKAN = [
  "SMA/SMK Sederajat",
  "Diploma (D1/D2/D3)",
  "Sarjana (S1)",
  "Magister (S2)",
  "Doktor (S3)",
];

// ── Modal Formulir Pendaftaran ──
function ModalDaftar({ training, onClose }) {
  const [step, setStep] = useState(1); // 1 = form, 2 = sukses
  const [form, setForm] = useState({
    namaLengkap: "",
    nik: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    pendidikan: "",
    noHp: "",
    email: "",
    alamat: "",
    persetujuan: false,
  });
  const [errors, setErrors] = useState({});

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.namaLengkap.trim()) e.namaLengkap = "Nama wajib diisi";
    if (!/^\d{16}$/.test(form.nik)) e.nik = "NIK harus 16 digit angka";
    if (!form.tempatLahir.trim()) e.tempatLahir = "Tempat lahir wajib diisi";
    if (!form.tanggalLahir) e.tanggalLahir = "Tanggal lahir wajib diisi";
    if (!form.jenisKelamin) e.jenisKelamin = "Jenis kelamin wajib dipilih";
    if (!form.pendidikan) e.pendidikan = "Pendidikan wajib dipilih";
    if (!/^\d{10,13}$/.test(form.noHp.replace(/\s/g, "")))
      e.noHp = "Nomor HP tidak valid";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email tidak valid";
    if (!form.alamat.trim()) e.alamat = "Alamat wajib diisi";
    if (!form.persetujuan)
      e.persetujuan = "Anda harus menyetujui syarat & ketentuan";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      // scroll to first error
      const firstKey = Object.keys(e)[0];
      document
        .getElementById(`field-${firstKey}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStep(2);
  };

  // Backdrop click close
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <style>{`
        @keyframes modalIn { from { opacity:0; transform:scale(0.96) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .modal-in { animation: modalIn 0.25s cubic-bezier(.22,.68,0,1.2) forwards; }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .fade-in { animation: fadeIn 0.2s ease forwards; }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 fade-in"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
        onClick={handleBackdrop}
      >
        <div className="modal-in bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh] sm:max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <div>
              <div className="text-[11px] text-blue-600 font-semibold mb-0.5">
                {training.id}
              </div>
              <h2 className="text-[15px] font-extrabold text-gray-900 leading-tight line-clamp-1">
                Formulir Pendaftaran
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700 flex-shrink-0"
            >
              <XIcon />
            </button>
          </div>

          {step === 1 ? (
            <>
              {/* Scrollable Body */}
              <div className="overflow-y-auto flex-1 px-5 py-5 space-y-4">
                {/* Info pelatihan */}
                <div className="bg-blue-50 rounded-xl p-3.5 border border-blue-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                    <CertIcon />
                  </div>
                  <div>
                    <div className="text-[11px] text-blue-500 font-semibold">
                      {training.lembaga}
                    </div>
                    <div className="text-[12.5px] font-bold text-blue-900 leading-snug">
                      {training.title}
                    </div>
                    <div className="text-[11px] text-blue-600 mt-0.5">
                      {training.mulai} – {training.selesai}
                    </div>
                  </div>
                </div>

                {/* Section: Data Diri */}
                <SectionLabel label="Data Diri" />

                <Field
                  id="field-namaLengkap"
                  label="Nama Lengkap"
                  required
                  error={errors.namaLengkap}
                >
                  <input
                    type="text"
                    placeholder="Sesuai KTP"
                    value={form.namaLengkap}
                    onChange={(e) => set("namaLengkap", e.target.value)}
                    className={inputCls(errors.namaLengkap)}
                  />
                </Field>

                <Field
                  id="field-nik"
                  label="NIK (Nomor Induk Kependudukan)"
                  required
                  error={errors.nik}
                >
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={16}
                    placeholder="16 digit angka"
                    value={form.nik}
                    onChange={(e) =>
                      set("nik", e.target.value.replace(/\D/g, ""))
                    }
                    className={inputCls(errors.nik)}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field
                    id="field-tempatLahir"
                    label="Tempat Lahir"
                    required
                    error={errors.tempatLahir}
                  >
                    <input
                      type="text"
                      placeholder="Kota"
                      value={form.tempatLahir}
                      onChange={(e) => set("tempatLahir", e.target.value)}
                      className={inputCls(errors.tempatLahir)}
                    />
                  </Field>
                  <Field
                    id="field-tanggalLahir"
                    label="Tanggal Lahir"
                    required
                    error={errors.tanggalLahir}
                  >
                    <input
                      type="date"
                      value={form.tanggalLahir}
                      onChange={(e) => set("tanggalLahir", e.target.value)}
                      className={inputCls(errors.tanggalLahir)}
                    />
                  </Field>
                </div>

                <Field
                  id="field-jenisKelamin"
                  label="Jenis Kelamin"
                  required
                  error={errors.jenisKelamin}
                >
                  <div className="flex gap-3">
                    {["Laki-laki", "Perempuan"].map((jk) => (
                      <button
                        key={jk}
                        type="button"
                        onClick={() => set("jenisKelamin", jk)}
                        className={`flex-1 py-2.5 rounded-xl border text-[13px] font-semibold transition-colors ${form.jenisKelamin === jk ? "border-blue-600 bg-blue-50 text-secondary" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                      >
                        {jk}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field
                  id="field-pendidikan"
                  label="Pendidikan Terakhir"
                  required
                  error={errors.pendidikan}
                >
                  <select
                    value={form.pendidikan}
                    onChange={(e) => set("pendidikan", e.target.value)}
                    className={inputCls(errors.pendidikan)}
                  >
                    <option value="">Pilih pendidikan</option>
                    {PENDIDIKAN.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>

                {/* Section: Kontak */}
                <SectionLabel label="Informasi Kontak" />

                <Field
                  id="field-noHp"
                  label="Nomor HP / WhatsApp"
                  required
                  error={errors.noHp}
                >
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="08xxxxxxxxxx"
                    value={form.noHp}
                    onChange={(e) =>
                      set("noHp", e.target.value.replace(/[^\d\s]/g, ""))
                    }
                    className={inputCls(errors.noHp)}
                  />
                </Field>

                <Field
                  id="field-email"
                  label="Alamat Email"
                  required
                  error={errors.email}
                >
                  <input
                    type="email"
                    placeholder="contoh@email.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={inputCls(errors.email)}
                  />
                </Field>

                <Field
                  id="field-alamat"
                  label="Alamat Lengkap"
                  required
                  error={errors.alamat}
                >
                  <textarea
                    rows={3}
                    placeholder="Jalan, kelurahan, kecamatan, kota..."
                    value={form.alamat}
                    onChange={(e) => set("alamat", e.target.value)}
                    className={`${inputCls(errors.alamat)} resize-none`}
                  />
                </Field>

                {/* Persetujuan */}
                <div id="field-persetujuan">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      onClick={() => set("persetujuan", !form.persetujuan)}
                      className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors ${form.persetujuan ? "bg-secondary border-secondary" : "border-gray-300 group-hover:border-blue-400"}`}
                    >
                      {form.persetujuan && (
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-[12.5px] text-gray-600 leading-relaxed"
                      onClick={() => set("persetujuan", !form.persetujuan)}
                    >
                      Saya menyatakan bahwa data yang diisi adalah benar dan
                      saya bersedia mengikuti seluruh rangkaian pelatihan sesuai
                      ketentuan yang berlaku.
                    </span>
                  </label>
                  {errors.persetujuan && (
                    <p className="text-[11.5px] text-red-500 mt-1.5 ml-8">
                      {errors.persetujuan}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0 flex gap-2.5">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-[13.5px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-[2] py-3 rounded-xl bg-secondary hover:bg-blue-800 active:bg-blue-900 text-white text-[14px] font-bold shadow-md shadow-blue-200 transition-colors"
                >
                  Kirim Pendaftaran
                </button>
              </div>
            </>
          ) : (
            /* ── Success State ── */
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center fade-in flex-1">
              <div className="mb-4">
                <SuccessIcon />
              </div>
              <h3 className="text-[18px] font-extrabold text-gray-900 mb-2">
                Pendaftaran Terkirim!
              </h3>
              <p className="text-[13.5px] text-gray-500 leading-relaxed mb-1 max-w-xs">
                Terima kasih,{" "}
                <span className="font-semibold text-gray-700">
                  {form.namaLengkap}
                </span>
                . Pendaftaran kamu untuk pelatihan ini telah kami terima.
              </p>
              <p className="text-[12.5px] text-gray-400 mb-6 max-w-xs">
                Konfirmasi akan dikirim ke{" "}
                <span className="font-medium text-gray-600">{form.email}</span>{" "}
                dalam 1×24 jam kerja.
              </p>

              {/* Summary */}
              <div className="w-full max-w-sm bg-gray-50 rounded-xl border border-gray-100 p-4 text-left mb-6 space-y-2">
                <SummaryRow label="Pelatihan" value={TRAINING.title} />
                <SummaryRow label="Lembaga" value={TRAINING.lembaga} />
                <SummaryRow
                  label="Periode"
                  value={`${TRAINING.mulai} – ${TRAINING.selesai}`}
                />
                <SummaryRow label="Lokasi" value={TRAINING.lokasi} />
              </div>

              <button
                onClick={onClose}
                className="w-full max-w-sm py-3 rounded-xl bg-secondary hover:bg-blue-800 text-white text-[14px] font-bold transition-colors"
              >
                Selesai
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Helper components
function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <span className="text-[11.5px] font-bold text-secondary uppercase tracking-wider">
        {label}
      </span>
      <div className="flex-1 h-px bg-blue-100" />
    </div>
  );
}

function Field({ id, label, required, error, children }) {
  return (
    <div id={id} className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-[11.5px] text-red-500">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-[11.5px] text-gray-400 w-20 flex-shrink-0">
        {label}
      </span>
      <span className="text-[12px] font-semibold text-gray-700 leading-snug">
        {value}
      </span>
    </div>
  );
}

const inputCls = (error) =>
  `w-full px-3.5 py-2.5 rounded-xl border text-[13.5px] text-gray-800 outline-none transition-colors placeholder-gray-300 ${
    error
      ? "border-red-300 bg-red-50 focus:border-red-400"
      : "border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  }`;

// Sub-components
function Breadcrumb() {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
      {["Beranda", "Pelatihan", "Bisnis Dan Manajemen"].map((item, i, arr) => (
        <span key={item} className="flex items-center gap-1.5">
          <button
            className={
              i === arr.length - 1
                ? "text-secondary font-medium"
                : "hover:text-gray-600 transition-colors"
            }
          >
            {item}
          </button>
          {i < arr.length - 1 && <ChevronRightIcon />}
        </span>
      ))}
    </nav>
  );
}

function InfoBadge({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5 py-3 border-b border-gray-100 last:border-0">
      <span className="text-blue-600 flex-shrink-0">{icon}</span>
      <div>
        <div className="text-[10.5px] text-gray-400">{label}</div>
        <div className="text-[13px] font-semibold text-gray-800">{value}</div>
      </div>
    </div>
  );
}

function KurikulumItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[11px] font-bold text-secondary flex-shrink-0">
            {index + 1}
          </span>
          <div>
            <div className="text-[12px] text-gray-400 font-medium">
              {item.minggu}
            </div>
            <div className="text-[13.5px] font-semibold text-gray-800">
              {item.topik}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-[11px] text-gray-400 font-medium">
            {item.jp}
          </span>
          <span
            className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <ChevronDownIcon />
          </span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 bg-gray-50 border-t border-gray-100">
          <p className="text-[13px] text-gray-500">
            Peserta akan mempelajari {item.topik.toLowerCase()} secara intensif
            melalui sesi teori, praktik langsung, dan studi kasus dunia nyata.
          </p>
        </div>
      )}
    </div>
  );
}
