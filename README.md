# Alpha Solution

Alpha Solution adalah aplikasi web untuk mencari dan memesan paket pelatihan. Pengguna dapat melihat katalog, mendapatkan rekomendasi paket dengan metode TOPSIS, membuat pesanan, dan mengirim bukti pembayaran. Admin dapat mengelola paket pelatihan dan memantau pesanan melalui dashboard.

## Fitur

- Katalog paket pelatihan dan halaman detail paket
- Rekomendasi paket berdasarkan kriteria menggunakan metode TOPSIS
- Registrasi, login, dan pengelolaan profil pengguna
- Pemesanan paket, riwayat pesanan, dan unggah bukti pembayaran
- Dashboard admin untuk mengelola paket serta memverifikasi pembayaran
- Ekspor invoice dan data pemesanan ke PDF

## Teknologi

- **Frontend:** React, Vite, React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Penyimpanan gambar:** Cloudinary
- **Autentikasi:** JSON Web Token (JWT)

## Struktur proyek

```text
AlphaSolution/
├── backend/        # REST API, model, controller, dan middleware
└── frontend/       # Aplikasi React
```

## Persyaratan

- Node.js 22 atau lebih baru
- npm
- MongoDB lokal atau MongoDB Atlas
- Akun Cloudinary untuk unggah gambar paket dan bukti pembayaran

## Menjalankan secara lokal

### 1. Siapkan backend

```bash
cd backend
npm install
```

Buat file `.env` di direktori `backend`:

```env
PORT=4000
MONGODB_URL=mongodb://127.0.0.1:27017/alpha-solution
JWT_SECRET=ganti_dengan_secret_jwt_yang_acak
ADMIN_SECRET_KEY=ganti_dengan_kunci_pendaftaran_admin
CLOUDINARY_NAME=nama_cloudinary
CLOUDINARY_KEY=api_key_cloudinary
CLOUDINARY_SECRET=api_secret_cloudinary
```

Ganti nilai contoh dengan kredensial milik Anda. Jangan commit file `.env` atau membagikan secret ke publik.

Jalankan API dari direktori `backend`:

```bash
node server.js
```

API berjalan di `http://localhost:4000` secara default. Port dapat diubah melalui `PORT`.

### 2. Siapkan frontend

Buka terminal baru:

```bash
cd frontend
npm install
```

Buat file `.env` di direktori `frontend`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

> `VITE_BACKEND_URL` adalah alamat dasar API; jangan tambahkan `/api` di akhir.

Jalankan frontend:

```bash
npm run dev
```

Buka alamat lokal yang ditampilkan Vite (biasanya `http://localhost:5173`). Pastikan backend dan MongoDB juga berjalan.

## Pendaftaran admin

Endpoint pendaftaran admin tersedia di `POST /api/admin/register`. Pendaftaran memerlukan `ADMIN_SECRET_KEY` yang sama dengan nilai pada konfigurasi backend. Setelah membuat akun, buka `/login/admin` pada frontend untuk masuk ke dashboard admin.

## Endpoint API utama

Semua endpoint menggunakan base URL backend dan prefiks `/api`.

| Prefiks | Kegunaan |
| --- | --- |
| `/api/user` | Registrasi/login pengguna, profil, katalog paket, rekomendasi, pemesanan, riwayat, dan bukti pembayaran |
| `/api/admin` | Registrasi/login admin, pengelolaan paket, statistik dashboard, pesanan, dan verifikasi pembayaran |

Contoh endpoint pengguna: `GET /api/user/paket`, `POST /api/user/recommendation`, `POST /api/user/order-paket`.

## Perintah frontend

Jalankan perintah ini dari direktori `frontend`:

```bash
npm run dev      # server pengembangan
npm run build    # build produksi ke frontend/dist
npm run preview  # pratinjau build produksi
npm run lint     # pemeriksaan ESLint
```

## Catatan unggah file

Backend menyimpan file sementara melalui Multer ke direktori `backend/uploads/`, lalu mengunggahnya ke Cloudinary. Pastikan direktori tersebut tersedia saat menjalankan backend dan kredensial Cloudinary sudah diatur.
