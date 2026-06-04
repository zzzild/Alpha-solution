import React from "react";

const Hero = ({ TypingInput }) => {
  return (
    <section className="hero-mesh relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-28">
      <div className="blob-1" />
      <div className="blob-2" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="fade-up-1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[12px] font-semibold text-blue-700 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Platform Pelatihan
          </div>

          {/* Headline */}
          <h1 className="fade-up-2 text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-gray-900 leading-[1.12] tracking-tight mb-5">
            Bangun Karier sebagai
            <br />
            <span className="text-blue-700">Talenta Unggulan</span>
          </h1>
          <p className="fade-up-3 text-[15.5px] sm:text-[17px] text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
            Pelatihan bersertifikat, diselenggarakan oleh lembaga resmi. Mulai
            dari nol hingga siap kerja.
          </p>

          {/* Smart search box */}
          <div className="fade-up-4 max-w-2xl mx-auto">
            <TypingInput />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
