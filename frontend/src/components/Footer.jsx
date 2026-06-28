const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">

          {/* Tentang */}
          <div>
            <h2 className="text-primary text-2xl font-extrabold mb-4">
              ALPHA SOLUSI
            </h2>

            <p className="text-sm leading-7 text-gray-500">
              Alpha Solusi merupakan platform pelatihan kerja yang
              menghubungkan masyarakat dengan lembaga pelatihan terpercaya
              di seluruh Indonesia sehingga peserta dapat meningkatkan
              kompetensi dan kesiapan memasuki dunia kerja.
            </p>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Hubungi Kami
            </h3>

            <div className="space-y-4 text-sm">

              <div>
                <p className="text-gray-300 font-medium">
                  Email
                </p>
                <p className="text-gray-500">
                  support@alphasolusi.com
                </p>
              </div>

              <div>
                <p className="text-gray-300 font-medium">
                  Telepon
                </p>
                <p className="text-gray-500">
                  +62 812-3456-7890
                </p>
              </div>

              <div>
                <p className="text-gray-300 font-medium">
                  Alamat
                </p>
                <p className="text-gray-500 leading-6">
                  Jl. Sudirman No. 123
                  <br />
                  Bekasi, Jawa Barat
                  <br />
                  Indonesia
                </p>
              </div>

            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-6 flex justify-center">
          <p className="text-xs text-gray-600">
            © 2026 Alpha Solusi. Hak Cipta Dilindungi.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;