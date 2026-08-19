import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ChallengesSection } from './components/ChallengesSection';
import { SolutionsSection } from './components/SolutionsSection';
import { InteractiveVariantDemo } from './components/InteractiveVariantDemo';
import { StatsSection } from './components/StatsSection';
import { WhyUsSection } from './components/WhyUsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingPackagesSection } from './components/PricingPackagesSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { MessageCircle, PhoneCall, Sparkles } from 'lucide-react';
import { OFFICIAL_LINKS } from './data/mockData';

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <Header onOpenDemoModal={() => setDemoModalOpen(true)} />

      {/* Main One-Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenDemoModal={() => setDemoModalOpen(true)} />

        {/* 2. Sektöre Özel Zorluklar & Hızlı Bilgi */}
        <ChallengesSection />

        {/* 3. Sektöre Özel Çözümlerimiz */}
        <SolutionsSection onOpenDemoModal={() => setDemoModalOpen(true)} />

        {/* 4. Canlı İnteraktif Varyant & Beden Matrisi Simülatörü */}
        <InteractiveVariantDemo onOpenDemoModal={() => setDemoModalOpen(true)} />

        {/* 5. Sektöre Özel Rakamlar ve İstatistikler */}
        <StatsSection />

        {/* 6. Neden Stok Pratik? */}
        <WhyUsSection onOpenDemoModal={() => setDemoModalOpen(true)} />

        {/* 7. Sektöre Özel Referanslar */}
        <TestimonialsSection />

        {/* 8. Paketler (Fiyatsız, Girişimci Paketsiz, Tek Mağaza / 5 Şubeli / 10 Şubeli) */}
        <PricingPackagesSection onOpenDemoModal={() => setDemoModalOpen(true)} />

        {/* 9. Sıkça Sorulan Sorular (SSS) */}
        <FaqSection />

        {/* 10. Blog & Kaynaklar */}
        <BlogSection />

        {/* 11. Demo ve İletişim */}
        <CtaSection onOpenDemoModal={() => setDemoModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />

      {/* 14-Day Free Demo Modal */}
      <DemoModal 
        isOpen={demoModalOpen} 
        onClose={() => setDemoModalOpen(false)} 
      />

      {/* Floating Action WhatsApp & Quick Demo Pill for Mobile/Desktop */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <a
          href={OFFICIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center group"
          title="WhatsApp ile Bilgi Alın"
          aria-label="WhatsApp Canlı Destek"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs px-0 group-hover:px-2">
            WhatsApp Destek
          </span>
        </a>

        <button
          onClick={() => setDemoModalOpen(true)}
          className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>14 Gün Ücretsiz Dene</span>
        </button>
      </div>
    </div>
  );
}
