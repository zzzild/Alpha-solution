import { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const EyeIcon = ({ open }) => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);
const UserIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const MailIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const LockIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
const PhoneIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

function Field({ icon, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        {children}
      </div>
      {error && (
        <p className="text-[11.5px] text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}

const inputCls = (err) =>
  `w-full pl-10 pr-4 py-3 rounded-xl border text-[13.5px] text-gray-800 outline-none transition-all duration-200 bg-gray-50 placeholder-gray-300 ${
    err
      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white"
  }`;

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    gender: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama lengkap wajib diisi";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Format email tidak valid";
    if (form.password.length < 8) e.password = "Password minimal 8 karakter";
    if (!form.address.trim()) e.address = "Alamat wajib diisi";
    if (!/^\d{10,13}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Nomor HP tidak valid (10–13 digit)";
    if (!form.gender) e.gender = "Pilih jenis kelamin";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSubmitted(true);
  };

  const pwStrength =
    form.password.length === 0
      ? 0
      : form.password.length < 6
        ? 1
        : form.password.length < 10
          ? 2
          : 3;
  const pwColors = ["", "bg-red-400", "bg-amber-400", "bg-green-500"];
  const pwLabels = ["", "Lemah", "Sedang", "Kuat"];

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <svg
                className="w-10 h-10 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Akun Berhasil Dibuat!
            </h2>
            <p className="text-gray-500 text-[14px] mb-6">
              Selamat datang,{" "}
              <span className="font-bold text-gray-800">{form.name}</span>.
              Silakan login untuk melanjutkan.
            </p>
            <a
              href="/login"
              className="inline-block px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-[14px] transition-colors"
            >
              Masuk Sekarang
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        <div className="flex-1 flex items-start justify-center bg-gray-50 overflow-y-auto py-10 px-4 sm:px-8">
          <div className="w-full max-w-lg">
            <div className="fade-1 mb-7">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5">
                Buat Akun Baru
              </h1>
              <p className="text-[14px] text-gray-500">
                Sudah punya akun?{" "}
                <a
                  href="/login"
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Masuk di sini
                </a>
              </p>
            </div>

            <div className="fade-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-7 flex flex-col gap-4">
              <Field
                icon={<UserIcon />}
                label="Nama Lengkap"
                error={errors.name}
              >
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputCls(errors.name)}
                />
              </Field>

              <Field
                icon={<MailIcon />}
                label="Alamat Email"
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
                icon={<LockIcon />}
                label="Password"
                error={errors.password}
              >
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  className={`${inputCls(errors.password)} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <EyeIcon open={showPw} />
                </button>
              </Field>

              {form.password.length > 0 && (
                <div className="-mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= pwStrength ? pwColors[pwStrength] : "bg-gray-100"}`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-[11px] font-semibold ${pwStrength === 1 ? "text-red-500" : pwStrength === 2 ? "text-amber-500" : "text-green-600"}`}
                  >
                    Password {pwLabels[pwStrength]}
                  </p>
                </div>
              )}

              <Field
                icon={<PhoneIcon />}
                label="Nomor HP / WhatsApp"
                error={errors.phone}
              >
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="08xxxxxxxxxx"
                  value={form.phone}
                  onChange={(e) =>
                    set("phone", e.target.value.replace(/[^\d\s]/g, ""))
                  }
                  className={inputCls(errors.phone)}
                />
              </Field>

              <Field
                icon={<MapPinIcon />}
                label="Alamat Lengkap"
                error={errors.address}
              >
                <textarea
                  rows={3}
                  placeholder="Jalan, kelurahan, kecamatan, kota..."
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  className={`${inputCls(errors.address)} resize-none pt-3`}
                  style={{ paddingTop: "12px" }}
                />
              </Field>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                  Jenis Kelamin
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {["Laki-laki", "Perempuan"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => set("gender", g)}
                      className={`py-3 rounded-xl border text-[13.5px] font-semibold transition-all duration-150 cursor-pointer ${
                        form.gender === g
                          ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                          : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-white"
                      }`}
                    >
                      {g === "Laki-laki" ? "Laki-laki" : "Perempuan"}
                    </button>
                  ))}
                </div>
                {errors.gender && (
                  <p className="text-[11.5px] text-red-500 font-medium">
                    {errors.gender}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3.5 mt-1 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white rounded-xl text-[14.5px] font-extrabold transition-colors shadow-lg shadow-blue-200 cursor-pointer"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
