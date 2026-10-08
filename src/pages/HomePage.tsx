import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Compass, ShieldCheck, TrendingUp } from 'lucide-react';
import { ARTICLES, CATEGORIES } from '../data/articles.ts';
import { ArticleCard } from '../components/ArticleCard.tsx';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSeoInspector: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSeoInspector }) => {
  const featuredArticle = ARTICLES.find(a => a.isFeatured) || ARTICLES[0];
  const secondaryFeatured = ARTICLES.filter(a => a.slug !== featuredArticle.slug).slice(0, 2);
  const latestArticles = ARTICLES.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-10">
            {/* Project Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-widest mb-3">
              <span>Fundamentals of SEO — College Study Publication</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-medium text-stone-900 tracking-tight leading-[1.12] mb-6 text-balance">
              The Student Digital Hub.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-sans mb-8">
              A curated digital publication for university students navigating business analytics, career preparation, artificial intelligence tools, and personal productivity. Built with production-grade on-page SEO.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('/blog')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
              >
                <span>Browse All 10 Articles</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSeoInspector}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Inspect On-Page SEO Diagnostics</span>
              </button>
            </div>
          </div>

          {/* Lead Editorial Feature Spotlight */}
          <div className="mt-8">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-3 block">
              Lead Editorial Feature
            </span>
            <ArticleCard article={featuredArticle} onNavigate={onNavigate} featured={true} />
          </div>

        </div>
      </section>

      {/* 2. CATEGORIES OVERVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-1">
              Curated Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-stone-900 tracking-tight">
              Explore by Core Category
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/blog')}
            className="text-xs font-semibold text-stone-800 hover:text-amber-700 transition-colors inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Topics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onNavigate(`/blog?category=${encodeURIComponent(cat.name)}`)}
              className="text-left p-5 bg-white border border-stone-200/90 rounded-xl hover:border-stone-400 hover:shadow-sm transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold text-stone-900 group-hover:text-amber-800 transition-colors mb-2 font-sans">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>
              <div className="pt-4 mt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 group-hover:text-stone-700">
                <span>Explore {cat.name}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. SECONDARY HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pb-4 border-b border-stone-200">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-1">
            Editor's Choice
          </span>
          <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-stone-900 tracking-tight">
            Key Digital Skills for Tomorrow's Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryFeatured.map((article) => (
            <ArticleCard key={article.slug} article={article} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* 4. WHY ON-PAGE SEO MATTERS (Academic Rubric Focus) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block">
              Case Study & Syllabus Integration
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-white leading-tight">
              Built to Demonstrate Practical Fundamentals of SEO
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Search engine optimization is not just keywords; it is information architecture, semantic accessibility, searcher intent satisfaction, and technical precision. Every article on this hub includes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-start gap-2 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tailored 50–60 char Title Tags and 140–160 char Meta Descriptions</span>
              </div>
              <div className="flex items-start gap-2 text-stone-300">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Strict semantic H1, H2, and H3 outline hierarchy</span>
              </div>
              <div className="flex items-start gap-2 text-stone-300">
                <Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Contextual internal links establishing domain topical authority</span>
              </div>
              <div className="flex items-start gap-2 text-stone-300">
                <BookOpen className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Schema.org JSON-LD BlogPosting markup & XML sitemaps</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('/seo-checklist')}
                className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors cursor-pointer"
              >
                View Faculty SEO Checklist
              </button>
              <button
                onClick={onOpenSeoInspector}
                className="px-4 py-2 text-xs font-medium text-white border border-stone-700 hover:bg-stone-800 rounded transition-colors cursor-pointer"
              >
                Inspect Live SEO Data
              </button>
              <button
                onClick={() => onNavigate('/about')}
                className="px-4 py-2 text-xs font-medium text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                Project Syllabus & Goals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LATEST ARTICLES GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-1">
              Complete Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-stone-900 tracking-tight">
              Latest Articles & Blueprints
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/blog')}
            className="text-xs font-semibold text-stone-800 hover:text-amber-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({ARTICLES.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

    </div>
  );
};
