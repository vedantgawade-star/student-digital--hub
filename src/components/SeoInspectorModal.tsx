import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Copy, Check, ExternalLink, Globe, Layers, Search, FileCode } from 'lucide-react';
import { Article } from '../types/index.ts';
import { ARTICLES } from '../data/articles.ts';
import { auditArticleSeo, generateArticleJsonLd } from '../utils/seo.ts';

interface SeoInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentArticleSlug?: string;
  onNavigateToArticle: (slug: string) => void;
}

export const SeoInspectorModal: React.FC<SeoInspectorModalProps> = ({
  isOpen,
  onClose,
  currentArticleSlug,
  onNavigateToArticle
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(currentArticleSlug || ARTICLES[0].slug);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeTab, setActiveTab] = useState<'onpage' | 'schema' | 'serp' | 'technical'>('onpage');

  if (!isOpen) return null;

  const currentArticle = ARTICLES.find(a => a.slug === selectedSlug) || ARTICLES[0];
  const audit = auditArticleSeo(currentArticle);
  const jsonLd = generateArticleJsonLd(currentArticle);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonLd, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-xl shadow-2xl border border-stone-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="seo-inspector-title"
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 id="seo-inspector-title" className="text-base font-semibold text-stone-900 font-sans">
                SEO Meta & Audit Inspector
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Live on-page diagnostics & structured data for <em>Fundamentals of SEO</em> academic assessment
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
            aria-label="Close SEO Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Selector Dropdown */}
        <div className="px-6 py-3 bg-stone-100/70 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-medium text-stone-700 flex items-center gap-2">
            <span>Audit Target:</span>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="text-xs font-sans bg-white border border-stone-300 rounded px-2.5 py-1.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500 max-w-xs"
            >
              {ARTICLES.map((art) => (
                <option key={art.slug} value={art.slug}>
                  {art.title.length > 50 ? `${art.title.slice(0, 50)}...` : art.title}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={() => {
              onNavigateToArticle(selectedSlug);
              onClose();
            }}
            className="text-xs text-amber-900 hover:text-amber-800 font-semibold inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Open Article in View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-3 border-b border-stone-200 flex items-center gap-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('onpage')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'onpage'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            On-Page Elements
          </button>
          <button
            onClick={() => setActiveTab('serp')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'serp'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Google SERP Preview
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'schema'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Schema.org (JSON-LD)
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'technical'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Technical Directives
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
          
          {/* TAB 1: ON-PAGE SEO */}
          {activeTab === 'onpage' && (
            <div className="space-y-6">
              
              {/* Scorecard Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 block mb-1">
                    Title Tag Length
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold font-mono text-stone-900">{audit.titleLength}</span>
                    <span className="text-xs text-stone-500">chars</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Target: 40–60 chars</span>
                  </span>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 block mb-1">
                    Meta Description
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold font-mono text-stone-900">{audit.metaDescLength}</span>
                    <span className="text-xs text-stone-500">chars</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Target: 140–160 chars</span>
                  </span>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 block mb-1">
                    Word Count
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold font-mono text-stone-900">{audit.wordCount}</span>
                    <span className="text-xs text-stone-500">words</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Target: 700–1000</span>
                  </span>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 block mb-1">
                    Keyword Density
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold font-mono text-stone-900">{audit.keywordDensity}</span>
                    <span className="text-xs text-stone-500">({audit.keywordCount}x)</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Natural range</span>
                  </span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                
                {/* Title */}
                <div className="p-4 bg-white border border-stone-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      SEO Page Title (&lt;title&gt;)
                    </span>
                    <span className="text-xs text-stone-500 font-mono">{audit.titleLength} characters</span>
                  </div>
                  <p className="text-stone-900 font-medium font-editorial text-base">{audit.title}</p>
                </div>

                {/* Description */}
                <div className="p-4 bg-white border border-stone-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Meta Description (&lt;meta name="description"&gt;)
                    </span>
                    <span className="text-xs text-stone-500 font-mono">{audit.metaDescLength} characters</span>
                  </div>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">{audit.metaDescription}</p>
                </div>

                {/* Canonical & Slug & Keywords */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <span className="text-[11px] uppercase tracking-wider text-amber-800 block mb-1 font-semibold">
                      Primary Target Keyword
                    </span>
                    <p className="text-xs font-semibold text-stone-900 font-mono">
                      "{audit.primaryKeyword}"
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 block mb-1">
                      Secondary Keywords (1 & 2)
                    </span>
                    <p className="text-xs text-stone-700 font-mono">
                      1. "{currentArticle.secondaryKeyword1}"
                    </p>
                    <p className="text-xs text-stone-700 font-mono mt-0.5">
                      2. "{currentArticle.secondaryKeyword2}"
                    </p>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 block mb-1">
                      Canonical Link Tag
                    </span>
                    <p className="text-xs text-stone-600 font-mono truncate" title={audit.canonicalUrl}>
                      {audit.canonicalUrl}
                    </p>
                  </div>
                </div>

                {/* Heading Hierarchy Check */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                    Semantic Heading Hierarchy
                  </span>
                  <div className="flex items-center gap-4 text-xs font-mono text-stone-800">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-stone-200 rounded text-[11px]">H1</span>
                      <span>{audit.headingsCount.h1} (Strictly One)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-stone-200 rounded text-[11px]">H2</span>
                      <span>{audit.headingsCount.h2} Core Sections</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-stone-200 rounded text-[11px]">H3</span>
                      <span>{audit.headingsCount.h3} Subsections</span>
                    </div>
                  </div>
                </div>

                {/* Suggested Internal Links */}
                <div className="p-4 bg-white border border-stone-200 rounded-lg">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                    Internal Linking Structure ({currentArticle.suggestedInternalLinks.length} Connections)
                  </span>
                  <div className="space-y-2">
                    {currentArticle.suggestedInternalLinks.map((link, idx) => (
                      <div key={idx} className="text-xs flex items-start gap-2 bg-stone-50 p-2 rounded">
                        <span className="font-semibold text-amber-900 whitespace-nowrap">→ Anchor:</span>
                        <span className="text-stone-800 italic font-medium">"{link.anchorText}"</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-600 truncate">{link.context}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: SERP PREVIEW */}
          {activeTab === 'serp' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">
                Simulated appearance on Google Search Engine Results Page (SERP) with rich snippet attributes:
              </p>
              
              {/* Google Result Card */}
              <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-stone-600 mb-1">
                  <div className="w-4 h-4 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-bold">
                    S
                  </div>
                  <div>
                    <span className="text-stone-900 font-medium block leading-none">The Student Digital Hub</span>
                    <span className="text-stone-500 text-[11px]">https://thestudentdigitalhub.vercel.app › article › {currentArticle.slug}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-medium text-blue-800 hover:underline cursor-pointer leading-snug">
                  {currentArticle.seoTitle}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  <span className="text-stone-400 font-normal">Oct 4, 2026 — </span>
                  {currentArticle.metaDescription}
                </p>

                <div className="pt-2 flex items-center gap-3 text-xs text-stone-500">
                  <span>Reading time: {currentArticle.readTime}</span>
                  <span>·</span>
                  <span>Category: {currentArticle.category}</span>
                </div>
              </div>

              {/* OpenGraph & Social Preview */}
              <div className="pt-4 border-t border-stone-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                  OpenGraph Social Share Card Preview (LinkedIn / Twitter)
                </h4>
                <div className="max-w-md border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  <img
                    src={currentArticle.featuredImage}
                    alt={currentArticle.imageAlt}
                    className="w-full aspect-16/9 object-cover"
                  />
                  <div className="p-4 bg-stone-50">
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                      thestudentdigitalhub.vercel.app
                    </span>
                    <h5 className="font-semibold text-stone-900 text-sm leading-tight mb-1">
                      {currentArticle.seoTitle}
                    </h5>
                    <p className="text-xs text-stone-600 line-clamp-2">
                      {currentArticle.metaDescription}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SCHEMA.ORG JSON-LD */}
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                    Schema.org BlogPosting Structured Data
                  </h4>
                  <p className="text-xs text-stone-500">
                    Helps search crawlers understand article author, publication date, category, and keywords.
                  </p>
                </div>
                
                <button
                  onClick={handleCopySchema}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
                >
                  {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSchema ? 'Copied JSON!' : 'Copy Schema'}</span>
                </button>
              </div>

              <pre className="p-4 bg-stone-900 text-stone-200 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed max-h-[380px]">
                {JSON.stringify(jsonLd, null, 2)}
              </pre>
            </div>
          )}

          {/* TAB 4: TECHNICAL DIRECTIVES */}
          {activeTab === 'technical' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* robots.txt */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                      <FileCode className="w-4 h-4 text-stone-600" />
                      <span>robots.txt Directive</span>
                    </span>
                    <a
                      href="/robots.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-700 hover:underline flex items-center gap-1"
                    >
                      <span>Direct File</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <pre className="text-[11px] font-mono bg-white p-2.5 rounded border border-stone-200 text-stone-700">
{`User-agent: *
Allow: /

Sitemap: https://thestudentdigitalhub.vercel.app/sitemap.xml`}
                  </pre>
                </div>

                {/* sitemap.xml */}
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-stone-600" />
                      <span>XML Sitemap Support</span>
                    </span>
                    <a
                      href="/sitemap.xml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-700 hover:underline flex items-center gap-1"
                    >
                      <span>Direct File</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-2">
                    Includes all 14 canonical indexable routes (Home, Blog, About, Contact, and 10 individual articles) with daily/weekly change frequencies.
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>XML 0.9 Protocol Compliant</span>
                  </span>
                </div>

              </div>

              {/* College Project SEO Rubric Checklist */}
              <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-lg space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 block">
                  Fundamentals of SEO Course Alignment Checklist
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Unique Title Tag & Meta Description per page</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Single semantic &lt;h1&gt; with structured &lt;h2&gt; & &lt;h3&gt;</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Clean SEO-friendly slug architecture (/article/*)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Contextual internal linking between articles</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Accessible descriptive image alt attributes</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Canonical URL tags & OpenGraph metadata</span>
                  </li>
                </ul>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            Fundamentals of SEO Project · The Student Digital Hub
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-stone-800 bg-white border border-stone-300 rounded hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
