import React from 'react';
import { Quote, Star, Building, CheckCircle2, Award } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-slate-200/60" id="referanslar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            Sektöre Özel Referanslar
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Tekstil ve Hazır Giyim Markaları Ne Diyor?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Türkiye'nin dört bir yanındaki tekstil üreticileri, toptancıları ve butik zincirlerinin gerçek başarı deneyimleri.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/70">
                    {item.impactBadge}
                  </span>
                </div>

                {/* Quote Text */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-teal-200/80 absolute -top-3 -left-2 -z-0 opacity-50" />
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium relative z-10 italic">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-600 to-cyan-500 text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {item.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {item.author}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {item.role} • <span className="text-teal-700 font-semibold">{item.company}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200/90 flex flex-wrap items-center justify-around gap-6 text-slate-500 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Merter, Osmanbey, Laleli Tekstilcilerinin Tercihi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Bursa, İzmir, Denizli Tekstil Üreticileri</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>E-Ticaret & Pazaryeri Lider Butikleri</span>
          </div>
        </div>

      </div>
    </section>
  );
};
