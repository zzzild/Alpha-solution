const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="text-primary font-extrabold text-xl mb-3">
              ALPHA SOLUSI
            </div>
            <p className="text-[13px] leading-relaxed text-gray-500">
              Platform pelatihan yang menghubungkan pencari kerja dengan lembaga
              terpercaya di seluruh Indonesia.
            </p>
          </div>
          {[
            {
              title: "Pelatihan",
              links: [
                "Semua Pelatihan",
                "Pelatihan Gratis",
                "Sertifikasi",
                "Pelatihan Online",
              ],
            },
            {
              title: "Tentang",
              links: ["Tentang Kami", "Lembaga Mitra", "Akreditasi", "Karir"],
            },
            {
              title: "Bantuan",
              links: [
                "Pusat Bantuan",
                "Syarat & Ketentuan",
                "Kebijakan Privasi",
                "Hubungi Kami",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-white font-bold text-[14px] mb-3">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <button className="text-[13px] text-gray-500 hover:text-white transition-colors">
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-gray-600">
            © 2026 Alpha Solusi. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
