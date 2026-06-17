import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { AppContext } from "../../context/AppContext";
import { AdminContext } from "../../context/AdminContext";

/* ─── ICONS ─── */
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

export default function LoginPage({admin}) {
  const { token,  loginUser } = useContext(AppContext);
  const {loginAdmin} = useContext(AdminContext)
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
  e.preventDefault();

  setLoading(true);

  let success;

  if (admin) {
    success = await loginAdmin(email, password);
  } else {
    success = await loginUser(email, password);
  }

  setLoading(false);

  if (success) {
    navigate(admin ? "/admin" : "/");
  }
};
  
 

  const inputCls = (err) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border text-[13.5px] text-gray-800 outline-none transition-all duration-200 bg-gray-50 placeholder-gray-300 ${
      err
        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white"
    }`;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 sm:px-8 py-12">
          <div className="w-full max-w-lg">
            <div className="fade-1 mb-7">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5">
                Masuk ke Akun
              </h1>
              <p className="text-[14px] text-gray-500">
                Belum punya akun?{" "}
                <a
                  href="/register"
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Daftar gratis
                </a>
              </p>
            </div>

            <div className="fade-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                  Alamat Email
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <MailIcon />
                  </span>
                  <input
                    type="email"
                    placeholder="contoh@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((er) => ({ ...er, email: undefined }));
                    }}
                    className={inputCls(errors.email)}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11.5px] text-red-500 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-[12px] text-blue-600 font-semibold hover:underline"
                  >
                    Lupa password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <LockIcon />
                  </span>
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((er) => ({ ...er, password: undefined }));
                    }}
                    className={`${inputCls(errors.password)} pr-10`}
                    onKeyDown={(e) => e.key === "Enter" && onSubmitHandler()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <EyeIcon open={showPw} />
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11.5px] text-red-500 font-medium">
                    {errors.password}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer group -mt-1">
                <div
                  onClick={() => setRemember((r) => !r)}
                  className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all duration-150 ${
                    remember
                      ? "bg-blue-700 border-blue-700"
                      : "border-gray-300 group-hover:border-blue-400"
                  }`}
                >
                  {remember && (
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
                  className="text-[13px] text-gray-600 select-none"
                  onClick={() => setRemember((r) => !r)}
                >
                  Ingat saya selama 30 hari
                </span>
              </label>

              <button
                onClick={onSubmitHandler}
                disabled={loading}
                className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 disabled:opacity-70 text-white rounded-xl text-[14.5px] font-extrabold transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg
                      className="spinner w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
