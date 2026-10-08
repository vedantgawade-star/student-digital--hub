import React, { useState, useEffect } from 'react';
import { Article } from '../types/index.ts';
import { ARTICLES } from '../data/articles.ts';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { 
  Clock, Calendar, User, Share2, Copy, Check, ArrowLeft, 
  ArrowRight, Sparkles, BookOpen, BookmarkCheck, ExternalLink,
  ChevronRight
} from 'lucide-react';
import { auditArticleSeo } from '../utils/seo.ts';

interface ArticleDetailPageProps {
  article: Article;
  onNavigate: (path: string) => void;
  onOpenSeoInspector: (slug?: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onNavigate,
  onOpenSeoInspector
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');

  const audit = auditArticleSeo(article);

  // Calculate reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Track active TOC section
      const headings = article.sections.map(s => document.getElementById(s.id));
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(article.sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`Reading "${article.title}" on The Student Digital Hub`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  // Find next and previous articles
  const currentIndex = ARTICLES.findIndex(a => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  // Related articles in same category
  const relatedArticles = ARTICLES
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div>
      {/* Top Thin Horizontal Reading Progress Rail */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-amber-600 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Articles', path: '/blog' },
            { label: article.category, path: `/blog?category=${encodeURIComponent(article.category)}` },
            { label: article.title }
          ]}
          onNavigate={onNavigate}
        />

        {/* Article Header Section */}
        <header className="mt-6 pb-8 border-b border-stone-200">
          
          {/* Zero-Pill Metadata Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-4 font-sans">
            <span className="font-semibold text-stone-900">{article.category}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>Published {article.publishedDate}</span>
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{article.readTime}</span>
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="font-mono-data text-stone-600">{article.wordCount} words</span>
          </div>

          {/* Semantic H1 Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-medium text-stone-950 tracking-tight leading-[1.18] mb-6 text-balance">
            {article.title}
          </h1>

          {/* Lead Excerpt */}
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-3xl font-sans mb-8">
            {article.excerpt}
          </p>

          {/* Author Strip & Social Sharing */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-stone-100">
            
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center font-editorial font-semibold text-stone-800 text-sm">
                {article.author.name.charAt(0)}
              </div>
              <div className="text-xs">
                <span className="font-semibold text-stone-900 block">{article.author.name}</span>
                <span className="text-stone-500">{article.author.role}</span>
              </div>
            </div>

            {/* Actions: SEO Inspector & Social Share */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenSeoInspector(article.slug)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors cursor-pointer"
                title="View on-page SEO metrics, canonical tag, and schema for this article"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Article SEO Audit</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
                title="Copy share link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleShareTwitter}
                className="px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
                title="Share to X / Twitter"
              >
                Share
              </button>
            </div>

          </div>

        </header>

        {/* Featured Image & Accessibility Alt */}
        <div className="my-8">
          <figure className="relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
            <img
              src={article.featuredImage}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full aspect-16/9 sm:aspect-21/9 object-cover"
              loading="eager"
            />
            <figcaption className="p-3 text-[11px] text-stone-500 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <span className="italic font-editorial">{article.imageAlt}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono">
                Primary Keyword: {article.primaryKeyword}
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Asymmetric Reading Grid (70% main body / 30% margin sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
          
          {/* Main Body Editorial Column (lg:col-span-8) */}
          <main className="lg:col-span-8 space-y-10 text-stone-800 font-sans">
            
            {/* Sections */}
            {article.sections.map((section, sIndex) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                
                {/* H2 Heading */}
                <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-stone-950 tracking-tight leading-snug pt-2 border-t border-stone-100">
                  {section.heading}
                </h2>

                {/* Paragraphs */}
                {section.content.map((paragraph, pIndex) => (
                  <p 
                    key={pIndex} 
                    className={`text-base sm:text-[17px] leading-[1.8] text-stone-700 ${
                      sIndex === 0 && pIndex === 0 ? 'editorial-dropcap' : ''
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}

                {/* Callout quote if present */}
                {section.callout && (
                  <div className="my-6 p-4 sm:p-5 bg-amber-50/70 border-l-4 border-amber-600 rounded-r-lg text-sm text-stone-800 italic font-editorial leading-relaxed">
                    {section.callout}
                  </div>
                )}

                {/* Subsections (H3) */}
                {section.subsections && section.subsections.length > 0 && (
                  <div className="space-y-6 pt-3">
                    {section.subsections.map((sub) => (
                      <div key={sub.id} id={sub.id} className="scroll-mt-24 space-y-2">
                        <h3 className="text-lg sm:text-xl font-editorial font-semibold text-stone-900 tracking-tight">
                          {sub.heading}
                        </h3>
                        {sub.content.map((subP, subIdx) => (
                          <p key={subIdx} className="text-base leading-[1.8] text-stone-700">
                            {subP}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

              </section>
            ))}

            {/* Key Takeaways Box */}
            <div className="my-10 p-6 sm:p-8 bg-stone-100/80 border border-stone-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-amber-800" />
                <h3 className="text-base font-semibold text-stone-900 font-sans">
                  Key Takeaways for Students
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm text-stone-700 pt-1">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0 mt-2"></span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Short Conclusion */}
            <section className="pt-6 border-t border-stone-200 space-y-3">
              <h2 className="text-xl sm:text-2xl font-editorial font-medium text-stone-900">
                Conclusion & Next Steps
              </h2>
              <p className="text-base sm:text-[17px] leading-[1.8] text-stone-700">
                {article.conclusion}
              </p>
            </section>

            {/* Contextual Suggested Internal Links (SEO Requirement) */}
            <section className="pt-8 border-t border-stone-200 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                  Recommended Internal Reading
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Explore connected guides to deepen your knowledge across productivity, technology, and career planning:
              </p>

              <div className="space-y-3">
                {article.suggestedInternalLinks.map((link, idx) => {
                  const targetArt = ARTICLES.find(a => a.slug === link.slug);
                  return (
                    <div 
                      key={idx}
                      onClick={() => {
                        onNavigate(`/article/${link.slug}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-4 bg-white border border-stone-200/90 rounded-xl hover:border-stone-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-xs font-semibold text-stone-900 group-hover:text-amber-800 transition-colors block">
                          → <span className="underline decoration-amber-600/40 underline-offset-2">{link.anchorText}</span>
                        </span>
                        <p className="text-xs text-stone-500 mt-1">
                          {link.context}
                        </p>
                      </div>
                      <span className="text-xs text-amber-800 font-medium inline-flex items-center gap-1 shrink-0 self-start sm:self-auto">
                        <span>Explore guide</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Author Profile Bio Box */}
            <div className="p-6 bg-stone-100 border border-stone-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-12">
              <div className="w-14 h-14 rounded-full bg-stone-300 flex items-center justify-center font-editorial font-bold text-stone-800 text-lg shrink-0">
                {article.author.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-stone-900 font-sans">
                  Written by {article.author.name}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {article.author.bio}
                </p>
                <span className="text-[11px] text-stone-500 block pt-1">
                  Lead Contributor · The Student Digital Hub SEO Project
                </span>
              </div>
            </div>

            {/* Pagination / Next & Previous Article */}
            <nav aria-label="Article navigation" className="pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <button
                  onClick={() => {
                    onNavigate(`/article/${prevArticle.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-4 bg-white border border-stone-200 rounded-xl text-left hover:border-stone-400 transition-colors cursor-pointer group"
                >
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 flex items-center gap-1 mb-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Article</span>
                  </span>
                  <span className="text-xs font-semibold text-stone-900 group-hover:text-amber-800 line-clamp-1 block">
                    {prevArticle.title}
                  </span>
                </button>
              ) : <div />}

              {nextArticle ? (
                <button
                  onClick={() => {
                    onNavigate(`/article/${nextArticle.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-4 bg-white border border-stone-200 rounded-xl text-right hover:border-stone-400 transition-colors cursor-pointer group"
                >
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 flex items-center justify-end gap-1 mb-1">
                    <span>Next Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-xs font-semibold text-stone-900 group-hover:text-amber-800 line-clamp-1 block">
                    {nextArticle.title}
                  </span>
                </button>
              ) : <div />}
            </nav>

          </main>

          {/* Sticky Sidebar (lg:col-span-4) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Table of Contents */}
              <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-2xs">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-3 font-sans">
                  Table of Contents
                </span>
                <nav className="space-y-1.5 text-xs">
                  {article.sections.map((section, idx) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block py-1 px-2 rounded transition-colors ${
                        activeSection === section.id
                          ? 'bg-stone-100 text-stone-950 font-semibold'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-stone-400 mr-1.5 font-mono">{idx + 1}.</span>
                      {section.heading.length > 40 ? `${section.heading.slice(0, 40)}...` : section.heading}
                    </a>
                  ))}
                </nav>
              </div>

              {/* On-Page SEO Snapshot Card */}
              <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    On-Page SEO Diagnostics
                  </span>
                  <button
                    onClick={() => onOpenSeoInspector(article.slug)}
                    className="text-[11px] text-amber-800 font-semibold hover:underline"
                  >
                    Inspect Full
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Target Keyword:</span>
                    <span className="font-mono text-stone-900 font-medium">"{article.primaryKeyword}"</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Keyword Density:</span>
                    <span className="font-mono text-stone-900 font-medium">{audit.keywordDensity} ({audit.keywordCount}x)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Title Tag:</span>
                    <span className="font-mono text-emerald-700 font-medium">{audit.titleLength} chars (Optimal)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Meta Desc:</span>
                    <span className="font-mono text-emerald-700 font-medium">{audit.metaDescLength} chars (Optimal)</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-stone-500">Heading Tags:</span>
                    <span className="font-mono text-stone-900 font-medium">1x H1 · {audit.headingsCount.h2}x H2 · {audit.headingsCount.h3}x H3</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenSeoInspector(article.slug)}
                  className="w-full py-2 px-3 text-xs font-medium text-amber-950 bg-amber-100/80 hover:bg-amber-100 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Open Schema & SERP Preview</span>
                </button>
              </div>

              {/* Related in Same Category */}
              {relatedArticles.length > 0 && (
                <div className="p-5 bg-white border border-stone-200 rounded-xl space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2 font-sans">
                    More in {article.category}
                  </span>
                  <div className="space-y-3">
                    {relatedArticles.map(rel => (
                      <div
                        key={rel.slug}
                        onClick={() => {
                          onNavigate(`/article/${rel.slug}`);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="cursor-pointer group"
                      >
                        <h5 className="text-xs font-medium text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                          {rel.title}
                        </h5>
                        <span className="text-[11px] text-stone-400 mt-0.5 block">
                          {rel.readTime} · {rel.publishedDate}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>

        </div>

      </article>
    </div>
  );
};
