import React from 'react';
import { TrendingUp, Users, CheckCircle2, Clock, Zap } from 'lucide-react';
import { STATS } from '../data/mockData';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-800 via-teal-900 to-indigo-950 text-white relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-700/60 border border-teal-500/40 text-teal-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Sektörel İstatistikler</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Outfit',sans-serif]">
            Rakamlarla Tekstilde Stok Pratik Etkisi
          </h2>
          <p className="mt-2 text-sm sm:text-base text-teal-100/80">
            Tekstil üreticileri, butikler ve toptancıların verimlilik artışları ölçümlendi.
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:bg-white/15 transition-all text-center flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold text-amber-300 font-['Outfit',sans-serif] tracking-tight mb-2">
                  {stat.value}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {stat.label}
                </h3>
              </div>
              <p className="text-xs text-teal-100/80 leading-relaxed pt-2 border-t border-white/10">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
