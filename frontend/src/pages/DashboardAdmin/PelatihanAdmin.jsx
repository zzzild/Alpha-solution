import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import {
  INITIAL_DATA,
  DIFFICULTY_OPTIONS,
  METHOD_OPTIONS,
  DURATION_OPTIONS,
  ACCESS_OPTIONS,
  EMPTY_FORM,
  DIFFICULTY_COLOR,
  METHOD_COLOR,
} from "../../components/DashboardComponents/Pelatihan/PelatihanConstants";

import PelatihanToolbar from "../../components/DashboardComponents/Pelatihan/PelatihanToolbar";
import PelatihanTable from "../../components/DashboardComponents/Pelatihan/PelatihanTable";
// import PelatihanModal from "../../components/DashboardComponents/Pelatihan/PelatihanModal";

/**
 * PaketPage — halaman manajemen paket kursus untuk panel admin.
 *
 * Fitur:
 * - Menampilkan daftar paket dalam bentuk tabel responsif
 * - Pencarian paket berdasarkan nama
 * - Filter paket berdasarkan tingkat kesulitan
 * - Tambah, lihat detail, edit, dan hapus paket via modal
 *
 * @returns {JSX.Element}
 */
export default function PaketPage() {
  // Mengambil data paket dari context admin (saat ini belum digunakan secara aktif)
  const { paket } = useContext(AdminContext);

  // State daftar paket yang ditampilkan
  const [data, setData] = useState(INITIAL_DATA);

  // State kata kunci pencarian
  const [search, setSearch] = useState("");

  // State filter tingkat kesulitan; "semua" berarti tidak ada filter
  const [filterDifficulty, setFilterDifficulty] = useState("semua");

  /**
   * State modal. Nilainya null jika modal tertutup,
   * atau objek { mode, item? } jika modal terbuka.
   * mode: "create" | "edit" | "view" | "delete"
   */
  const [modal, setModal] = useState(null);

  /**
   * Menambahkan paket baru ke daftar.
   * Mengonversi price dan totalModules dari string ke number,
   * lalu menempatkan item baru di awal array.
   *
   * @param {Object} form - Data form dari modal create
   */
  const handleCreate = (form) => {
    const newItem = {
      ...form,
      id: Date.now(), // ID unik berbasis timestamp
      price: Number(form.price),
      totalModules: Number(form.totalModules),
    };
    setData((prev) => [newItem, ...prev]);
    setModal(null);
  };

  /**
   * Memperbarui data paket yang sudah ada berdasarkan id.
   *
   * @param {Object} form - Data form dari modal edit (harus mengandung `id`)
   */
  const handleUpdate = (form) => {
    setData((prev) =>
      prev.map((d) =>
        d.id === form.id
          ? {
              ...form,
              price: Number(form.price),
              totalModules: Number(form.totalModules),
            }
          : d,
      ),
    );
    setModal(null);
  };

  /**
   * Menghapus paket dari daftar berdasarkan id.
   *
   * @param {number} id - ID paket yang akan dihapus
   */
  const handleDelete = (id) => {
    setData((prev) => prev.filter((d) => d.id !== id));
    setModal(null);
  };

  /**
   * Data yang sudah difilter berdasarkan `search` dan `filterDifficulty`.
   * Dihitung ulang setiap kali salah satu dependency berubah.
   */
  const filtered = data.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
    const matchDiff =
      filterDifficulty === "semua" || d.difficulty === filterDifficulty;
    return matchSearch && matchDiff;
  });

  return (
    <div className="space-y-5">
      {/* ── Header: judul halaman + tombol tambah ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manajemen Paket</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {data.length} paket terdaftar ·{" "}
            {data.filter((d) => d.difficulty === "pemula").length} untuk pemula
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "create" })}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-150 shadow-sm shadow-blue-200 cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Paket
        </button>
      </div>

      {/* ── Toolbar: input pencarian + dropdown filter kesulitan ── */}
      <PelatihanToolbar
        search={search}
        setSearch={setSearch}
        filterDifficulty={filterDifficulty}
        setFilterDifficulty={setFilterDifficulty}
      />

      {/* ── Tabel daftar paket ── */}
      <PelatihanTable
        filtered={filtered}
        data={data}
        setModal={setModal}
        formatPrice={formatPrice}
      />

      {/* Render modal hanya jika state `modal` tidak null */}
      {modal && (
        <Modal
          modal={modal}
          onClose={() => setModal(null)}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

// =============================================================================
// KOMPONEN MODAL
// =============================================================================

/**
 * Modal — dialog multi-mode untuk operasi CRUD paket.
 *
 * Mode yang didukung:
 * - "create" : form tambah paket baru
 * - "edit"   : form edit paket yang sudah ada
 * - "view"   : tampilan detail read-only
 * - "delete" : konfirmasi penghapusan
 *
 * @param {Object}   props
 * @param {Object}   props.modal     - Objek { mode, item? } dari state parent
 * @param {Function} props.onClose   - Callback menutup modal
 * @param {Function} props.onCreate  - Callback tambah paket baru
 * @param {Function} props.onUpdate  - Callback simpan perubahan paket
 * @param {Function} props.onDelete  - Callback hapus paket berdasarkan id
 */
function Modal({ modal, onClose, onCreate, onUpdate, onDelete }) {
  const { mode, item } = modal;

  /**
   * State form: diinisialisasi dengan EMPTY_FORM saat create,
   * atau salinan data item yang dipilih saat edit/view/delete.
   */
  const [form, setForm] = useState(
    mode === "create" ? EMPTY_FORM : { ...item },
  );

  /** State pesan error validasi per field. */
  const [errors, setErrors] = useState({});

  /**
   * Memperbarui satu field pada state form dan menghapus error field tersebut.
   *
   * @param {string} key - Nama field
   * @param {*}      val - Nilai baru
   */
  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  /**
   * Memvalidasi field wajib sebelum form dikirim.
   *
   * @returns {Object} Objek error; kosong jika semua valid
   */
  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Nama paket wajib diisi";
    if (!form.price || Number(form.price) < 0) e.price = "Harga tidak valid";
    if (!form.totalModules || Number(form.totalModules) < 1)
      e.totalModules = "Jumlah modul minimal 1";
    return e;
  };

  /**
   * Menjalankan validasi lalu memanggil onCreate atau onUpdate sesuai mode.
   * Jika ada error, form tidak dikirim dan pesan error ditampilkan.
   */
  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    mode === "create" ? onCreate(form) : onUpdate(form);
  };

  /** Judul header modal berdasarkan mode aktif. */
  const titles = {
    create: "Tambah Paket",
    edit: "Edit Paket",
    view: "Detail Paket",
    delete: "Hapus Paket",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay semi-transparan; klik untuk menutup modal */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Kontainer modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden flex flex-col max-h-[90vh] ${mode === "delete" ? "max-w-md" : "max-w-2xl"}`}
      >
        {/* ── Header modal ── */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0 ${mode === "delete" ? "bg-red-50" : mode === "view" ? "bg-blue-50" : "bg-white"}`}
        >
          <div className="flex items-center gap-3">
            {/* Ikon header sesuai mode */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${mode === "delete" ? "bg-red-100" : mode === "view" ? "bg-blue-100" : "bg-blue-600"}`}
            >
              {mode === "create" && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
              {mode === "edit" && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              )}
              {mode === "view" && (
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
              {mode === "delete" && (
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </div>
            <h2 className="font-bold text-slate-800">{titles[mode]}</h2>
          </div>

          {/* Tombol tutup modal */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* ── Body modal (scrollable) ── */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* -- Mode DELETE: konfirmasi penghapusan -- */}
          {mode === "delete" && (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">
                Hapus Paket?
              </h3>
              <p className="text-slate-500 text-sm mb-1">
                Anda akan menghapus paket:
              </p>
              <p className="font-semibold text-slate-800 mb-4">
                "{item.title}"
              </p>
              <p className="text-xs text-red-500 bg-red-50 rounded-lg px-4 py-2">
                Tindakan ini tidak dapat dibatalkan. Data paket akan hilang
                secara permanen.
              </p>
            </div>
          )}

          {/* -- Mode VIEW: tampilan detail read-only -- */}
          {mode === "view" && (
            <div className="space-y-5">
              {/* Gambar sampul paket */}
              <img
                src={
                  item.image ||
                  "https://placehold.co/600x200/e2e8f0/94a3b8?text=No+Image"
                }
                alt={item.title}
                className="w-full h-44 object-cover rounded-xl border border-slate-100"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x200/e2e8f0/94a3b8?text=No+Image";
                }}
              />

              {/* Judul, badge, dan harga */}
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span
                      className={`capitalize text-xs font-medium px-2.5 py-0.5 rounded-full border ${DIFFICULTY_COLOR[item.difficulty]}`}
                    >
                      {item.difficulty}
                    </span>
                    <span
                      className={`capitalize text-xs font-medium px-2.5 py-0.5 rounded-full border ${METHOD_COLOR[item.method]}`}
                    >
                      {item.method}
                    </span>
                    {item.sertificate && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
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
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        Bersertifikat
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-bold text-blue-600">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>

              {/* Deskripsi paket (opsional) */}
              {item.description && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Deskripsi
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Grid informasi detail paket */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Harga", value: formatPrice(item.price) },
                  {
                    label: "Jumlah Modul",
                    value: `${item.totalModules} modul`,
                  },
                  { label: "Durasi", value: item.duration },
                  { label: "Masa Akses", value: item.accessPeriod },
                  { label: "Kesulitan", value: item.difficulty },
                  { label: "Metode", value: item.method },
                  {
                    label: "Sertifikat",
                    value: item.sertificate ? "Ada" : "Tidak Ada",
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-slate-700 capitalize">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -- Mode CREATE / EDIT: form input data paket -- */}
          {(mode === "create" || mode === "edit") && (
            <div className="space-y-4">
              {/* Field nama paket */}
              <Field label="Nama Paket" required error={errors.title}>
                <input
                  type="text"
                  placeholder="Masukkan nama paket"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  className={inputCls(errors.title)}
                />
              </Field>

              {/* Field harga */}
              <Field label="Harga (Rp)" required error={errors.price}>
                <input
                  type="number"
                  placeholder="Contoh: 299000"
                  min={0}
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  className={inputCls(errors.price)}
                />
              </Field>

              {/* Field durasi dan masa akses dalam satu baris */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Durasi" required>
                  <select
                    value={form.duration}
                    onChange={(e) => set("duration", e.target.value)}
                    className={inputCls()}
                  >
                    {DURATION_OPTIONS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Masa Akses" required>
                  <select
                    value={form.accessPeriod}
                    onChange={(e) => set("accessPeriod", e.target.value)}
                    className={inputCls()}
                  >
                    {ACCESS_OPTIONS.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Field jumlah modul dan tingkat kesulitan dalam satu baris */}
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Jumlah Modul"
                  required
                  error={errors.totalModules}
                >
                  <input
                    type="number"
                    placeholder="Contoh: 12"
                    min={1}
                    value={form.totalModules}
                    onChange={(e) => set("totalModules", e.target.value)}
                    className={inputCls(errors.totalModules)}
                  />
                </Field>
                <Field label="Kesulitan" required>
                  <select
                    value={form.difficulty}
                    onChange={(e) => set("difficulty", e.target.value)}
                    className={inputCls()}
                  >
                    {DIFFICULTY_OPTIONS.map((d) => (
                      <option key={d} className="capitalize">
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Field metode pembelajaran */}
              <Field label="Metode Pembelajaran" required>
                <select
                  value={form.method}
                  onChange={(e) => set("method", e.target.value)}
                  className={inputCls()}
                >
                  {METHOD_OPTIONS.map((m) => (
                    <option key={m} className="capitalize">
                      {m}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Toggle sertifikat: aktif/nonaktif dengan animasi */}
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-white">
                <div>
                  <p className="text-xs font-semibold text-slate-600">
                    Sertifikat
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Peserta mendapat sertifikat setelah selesai
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => set("sertificate", !form.sertificate)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${
                    form.sertificate ? "bg-blue-600" : "bg-slate-200"
                  }`}
                >
                  {/* Indikator posisi toggle */}
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                      form.sertificate ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Field URL gambar + preview jika URL diisi */}
              <Field label="URL Gambar">
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={(e) => set("image", e.target.value)}
                  className={inputCls()}
                />
                {/* Preview gambar; disembunyikan jika URL tidak valid */}
                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="mt-2 w-full h-28 object-cover rounded-lg border border-slate-200"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </Field>

              {/* Field deskripsi paket (opsional) */}
              <Field label="Deskripsi">
                <textarea
                  rows={3}
                  placeholder="Deskripsi singkat mengenai paket ini..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className={`${inputCls()} resize-none`}
                />
              </Field>
            </div>
          )}
        </div>

        {/* ── Footer modal: tombol aksi ── */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0">
          {/* Tombol batal / tutup */}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            {mode === "view" ? "Tutup" : "Batal"}
          </button>

          {/* Tombol konfirmasi hapus (hanya mode delete) */}
          {mode === "delete" && (
            <button
              onClick={() => onDelete(item.id)}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 rounded-xl transition-all shadow-sm shadow-red-200 cursor-pointer"
            >
              Ya, Hapus
            </button>
          )}

          {/* Tombol simpan (hanya mode create dan edit) */}
          {(mode === "create" || mode === "edit") && (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl transition-all shadow-sm shadow-blue-200 cursor-pointer"
            >
              {mode === "create" ? "Simpan Paket" : "Simpan Perubahan"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// KOMPONEN PEMBANTU
// =============================================================================

/**
 * Field — wrapper label + input + pesan error untuk satu field form.
 *
 * @param {Object}      props
 * @param {string}      props.label    - Teks label
 * @param {boolean}     [props.required] - Tampilkan tanda bintang merah jika true
 * @param {string}      [props.error]  - Pesan error; ditampilkan di bawah input
 * @param {JSX.Element} props.children - Elemen input/select/textarea
 */
function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// =============================================================================
// UTILITAS
// =============================================================================

/**
 * Menghasilkan kelas CSS Tailwind untuk elemen input/select/textarea.
 * Menerapkan gaya error (merah) jika parameter `err` tidak kosong.
 *
 * @param {string} [err] - Pesan error; jika ada, gunakan gaya error
 * @returns {string} String kelas CSS
 */
const inputCls = (err) =>
  `w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
    err
      ? "border-red-300 bg-red-50 focus:ring-red-300/30 focus:border-red-400"
      : "border-slate-200 bg-white focus:ring-blue-500/20 focus:border-blue-400"
  }`;

/**
 * Memformat angka harga ke format mata uang Rupiah Indonesia.
 * Menampilkan "Gratis" jika harga bernilai 0.
 *
 * @param {number} price - Nilai harga dalam Rupiah
 * @returns {string} Harga terformat, mis. "Rp 350.000" atau "Gratis"
 */
const formatPrice = (price) => {
  if (price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
