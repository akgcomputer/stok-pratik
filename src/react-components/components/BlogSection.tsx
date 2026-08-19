import React from 'react';
import { BookOpen, Clock, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { BLOG_POSTS, OFFICIAL_LINKS } from '../data/mockData';

export const BlogSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/60" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
              Blog & Rehberler
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Tekstil Stok Yönetimi Rehberleri
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Varyant takibi, sezonluk stok eritme ve toptan satış hakkında uzman makaleleri.
            </p>
          </div>

          <a
            href={OFFICIAL_LINKS.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-teal-500 text-slate-700 hover:text-teal-700 font-bold text-xs sm:text-sm transition-colors self-start sm:self-auto shrink-0 shadow-2xs"
          >
            <span>Tüm Blog Yazıları</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <article
              key={idx}
              className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Meta Category & Read Time */}
                <div className="flex items-center justify-between text-xs font-semibold mb-4">
                  <span className="bg-teal-50 text-teal-800 border border-teal-200/70 px-2.5 py-1 rounded-lg">
                    {post.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors font-['Outfit',sans-serif] leading-snug">
                  <a href={OFFICIAL_LINKS.blog} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Read More Link */}
              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  {post.date}
                </span>
                <a
                  href={OFFICIAL_LINKS.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-teal-700 group-hover:text-teal-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Yazıyı Oku</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
