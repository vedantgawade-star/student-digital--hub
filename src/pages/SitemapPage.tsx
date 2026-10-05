import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { ARTICLES, CATEGORIES } from '../data/articles.ts';
import { FileText, Globe, ExternalLink, ArrowRight } from 'lucide-react';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      
      {/* Header */}
      <div>
        <Breadcrumbs items={[{ label: 'Sitemap & Information Architecture' }]} onNavigate={onNavigate} />
        
        <div className="mt-4 pb-6 border-b border-stone-200">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block mb-2">
            Technical SEO Architecture
          </span>
          <h1 className="text-3xl sm:text-5xl font-editorial font-medium text-stone-900 tracking-tight">
            Website Index & Sitemap
          </h1>
          <p className="text-base text-stone-600 mt-3 leading-relaxed">
            A comprehensive hierarchical map of all indexable pages, categories, and articles on The Student Digital Hub. Designed for both human navigation and search engine web crawlers.
          </p>
        </div>
      </div>

      {/* Direct Machine-Readable Files */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-700 hover:shadow-2xs transition-all group flex items-start justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-amber-800 font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>XML Sitemap File</span>
            </span>
            <h3 className="text-sm font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
              /sitemap.xml
            </h3>
            <p className="text-xs text-stone-500">
              Standard XML sitemap listing all 14 canonical URLs, priorities, and change frequencies for Googlebot and Bingbot.
            </p>
          </div>
          <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-amber-800 shrink-0 mt-1" />
        </a>

        <a
          href="/robots.txt"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-700 hover:shadow-2xs transition-all group flex items-start justify-between"
        >
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-amber-800 font-semibold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Crawl Directives</span>
            </span>
            <h3 className="text-sm font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
              /robots.txt
            </h3>
            <p className="text-xs text-stone-500">
              Instructions for search engine robots allowing universal indexing across all sub-paths.
            </p>
          </div>
          <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-amber-800 shrink-0 mt-1" />
        </a>
      </div>

      {/* Main Pages Hierarchy */}
      <div className="space-y-6">
        <h2 className="text-xl font-editorial font-medium text-stone-900">
          Core Static Pages
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            { title: 'Home Page', path: '/', desc: 'Lead editorial showcase, top disciplines, and featured guides.' },
            { title: 'All Articles & Search Archive', path: '/blog', desc: 'Complete searchable catalog of all 10 long-form student articles.' },
            { title: 'About & Academic Rubric', path: '/about', desc: 'Course syllabus alignment, SEO methodology, and author credentials.' },
            { title: 'Contact Desk & Inquiries', path: '/contact', desc: 'Editorial inquiries, collaboration proposals, and student FAQs.' },
          ].map((page) => (
            <div
              key={page.path}
              onClick={() => onNavigate(page.path)}
              className="p-4 bg-white border border-stone-200 rounded-lg hover:border-stone-400 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {page.title}
                </span>
                <span className="font-mono text-stone-400 text-[11px]">{page.path}</span>
              </div>
              <p className="text-stone-500 leading-relaxed">{page.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories & Articles Grouping */}
      <div className="space-y-6">
        <h2 className="text-xl font-editorial font-medium text-stone-900">
          All 10 Core SEO Articles by Category Silo
        </h2>

        <div className="space-y-4">
          {CATEGORIES.map((cat) => {
            const catArticles = ARTICLES.filter(a => a.category === cat.name);
            return (
              <div key={cat.slug} className="p-5 bg-white border border-stone-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900 font-sans">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">{cat.description}</p>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">
                    {catArticles.length} {catArticles.length === 1 ? 'article' : 'articles'}
                  </span>
                </div>

                <ul className="space-y-2 text-xs">
                  {catArticles.map((article) => (
                    <li key={article.slug}>
                      <button
                        onClick={() => onNavigate(`/article/${article.slug}`)}
                        className="text-left w-full hover:text-amber-800 transition-colors flex items-start justify-between group cursor-pointer"
                      >
                        <div className="space-y-0.5">
                          <span className="font-medium text-stone-800 group-hover:text-amber-800 block">
                            {article.title}
                          </span>
                          <span className="text-[11px] text-stone-400 font-mono">
                            /article/{article.slug} · Keyword: "{article.primaryKeyword}"
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 group-hover:text-amber-800 transition-all shrink-0 mt-1" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
