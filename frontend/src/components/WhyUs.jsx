import React from 'react'
import {FEATURES} from '../assets/assets.js'

const WhyUs = ({CheckCircle, ArrowRight}) => {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <p className="text-[12px] font-bold text-blue-600 uppercase tracking-widest mb-3">
                  Keunggulan Kami
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                  Mengapa Ribuan Peserta
                  <br />
                  Mempercayai Alpha Solusi?
                </h2>
                <p className="text-[14.5px] text-gray-500 leading-relaxed mb-8 max-w-md">
                  Kami menghubungkan pencari kerja dengan lembaga pelatihan di
                  seluruh Indonesia, didukung penuh oleh pemerintah.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {FEATURES.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle />
                      <span className="text-[13.5px] text-gray-700 leading-snug">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href="/login"
                  className="mt-8 w-fit flex items-center gap-2 px-6 py-3 bg-primary hover:bg-lightprimary text-white rounded-xl font-bold text-[14px] transition-colors shadow-lg shadow-orange-200"
                >
                  Mulai Daftar Gratis <ArrowRight />
                </a>
              </div>

              {/* Right: visual grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    num: "42.8K+",
                    label: "Alumni Berhasil",
                    color: "bg-blue-700",
                    text: "text-white",
                    sub: "text-blue-200",
                  },
                  {
                    num: "180+",
                    label: "Lembaga Mitra",
                    color: "bg-white border border-gray-100",
                    text: "text-gray-900",
                    sub: "text-gray-400",
                  },
                  {
                    num: "98%",
                    label: "Tingkat Kelulusan",
                    color: "bg-white border border-gray-100",
                    text: "text-gray-900",
                    sub: "text-gray-400",
                  },
                  {
                    num: "Terjangkau",
                    label: "Biaya Pelatihan",
                    color: "bg-green-600",
                    text: "text-white",
                    sub: "text-green-200",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl p-6 shadow-sm ${card.color} flex flex-col justify-between aspect-square`}
                  >
                    <div
                      className={`text-4xl font-black leading-none ${card.text}`}
                    >
                      {card.num}
                    </div>
                    <div className={`text-[13px] font-semibold ${card.sub}`}>
                      {card.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
  )
}

export default WhyUs
