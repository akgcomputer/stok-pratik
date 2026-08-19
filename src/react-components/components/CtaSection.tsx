import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  MessageCircle, 
  ShieldCheck, 
  Send,
  Building,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/mockData';

interface CtaSectionProps {
  onOpenDemoModal: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenDemoModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-teal-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden" id="demo-iletisim">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Promises */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Anında Kurulumsuz Erişim</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif] leading-tight">
              Stok Pratik'i Tekstil Sektöründe Dene!
            </h2>

            <p className="text-lg text-teal-100/90 leading-relaxed max-w-xl">
              14 gün ücretsiz, taahhüt yok, kredi kartı bilgisi gerekmez. Kendi ürünlerinizi ve renk-beden varyantlarınızı sisteme girin, farkı bizzat görün.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-teal-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tek tıkla hazır tekstil şablonu</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-teal-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sınırsız renk ve beden tanımlama</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-teal-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ücretsiz uzman tekstil eğitimi</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-teal-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Trendyol & Pazaryeri desteği</span>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={OFFICIAL_LINKS.phone}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-300" />
                <span>Hemen Ara: 0850 308 00 00</span>
              </a>

              <a
                href={OFFICIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Canlı Destek</span>
              </a>
            </div>

          </div>

          {/* Right Column: Instant Demo Request Form */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
              
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-['Outfit',sans-serif] text-slate-900">
                    Talebiniz Alındı!
                  </h3>
                  <p className="text-sm text-slate-600">
                    Sayın <strong>{name}</strong>, tekstil uzmanımız <strong>{phone}</strong> numaranız üzerinden demo giriş bilgilerinizle birlikte en kısa sürede sizinle iletişime geçecektir.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-colors cursor-pointer"
                  >
                    Yeni Form Gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-slate-900">
                      Hızlı Demo Talebi
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      1 dakika içinde bilgilerinizi girin, sisteminizi hemen kuralım.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Adınız Soyadınız *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Telefon Numaranız *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05XX XXX XX XX"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Firma / Mağaza Adı (Opsiyonel)
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Örn: Trend Butik Tekstil"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sektör / Faaliyet Alanı
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Tekstil, Hazır Giyim & Konfeksiyon"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-teal-800"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      id="btn-cta-submit-demo"
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md shadow-teal-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>İşleniyor...</span>
                      ) : (
                        <>
                          <span>Demo Hesabımı Oluştur</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-slate-400">
                    🔒 Bilgileriniz KVKK kapsamında korunur, asla 3. şahıslarla paylaşılmaz.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
