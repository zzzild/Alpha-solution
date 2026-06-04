const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-white via-gray-50 to-white border-t border-gray-200 shadow-lg">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3 text-gray-600">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <img src="" alt="Logo" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">ALPHA SOLUSI</div>
              <div className="text-xs text-gray-500">
                ALPHA SOLUSI - Platform Pelatihan Terpercaya
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">Versi 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;