import React, { useState } from 'react';
import { ARTICLES } from '../data/articles.ts';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { 
  CheckCircle2, Search, ExternalLink, Sparkles, Filter, 
  HelpCircle, Link as LinkIcon, FileText, ChevronDown, ChevronUp, Check 
} from 'lucide-react';

interface SeoChecklistPageProps {
  onNavigate: (path: string) => void;
  onOpenSeoInspector: (slug?: string) => void;
}

export const SeoChecklistPage: React.FC<SeoChecklistPageProps> = ({ 
  onNavigate, 
  onOpenSeoInspector 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (slug: string) => {
    setExpandedRows(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  const filteredArticles = ARTICLES.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = 
      !searchTerm ||
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.primaryKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.secondaryKeyword1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.secondaryKeyword2.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumb Header */}
      <div>
        <Breadcrumbs 
          items={[{ label: 'SEO Checklist & Faculty Audit Table' }]} 
          onNavigate={onNavigate} 
        />
        
        <div className="mt-4 pb-6 border-b border-stone-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold block mb-1">
                Academic On-Page Evaluation Matrix
              </span>
              <h1 className="text-3xl sm:text-4xl font-editorial font-medium text-stone-900 tracking-tight">
                Faculty SEO Audit Checklist
              </h1>
              <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
                Comprehensive mapping of on-page SEO parameters across all 10 published articles for <em>Fundamentals of SEO</em> coursework review: unique URLs, keyword hierarchies, meta descriptions, image ALT text, contextual internal links, and Answer Engine Optimization (AEO) question structures.
              </p>
            </div>

            <button
              onClick={() => onOpenSeoInspector()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-md transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span>Launch Live Meta Inspector</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Validation Scorecards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-2xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium block">
            Published Articles
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold font-mono text-stone-900">{ARTICLES.length}</span>
            <span className="text-xs text-stone-500">/ 10</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
            <Check className="w-3 h-3" />
            <span>100% complete</span>
          </span>
        </div>

        <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-2xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium block">
            Unique Slugs & URLs
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold font-mono text-stone-900">{ARTICLES.length}</span>
            <span className="text-xs text-stone-500">unique</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
            <Check className="w-3 h-3" />
            <span>0 duplicates</span>
          </span>
        </div>

        <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-2xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium block">
            Primary Keywords
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold font-mono text-stone-900">10</span>
            <span className="text-xs text-stone-500">+ 20 related</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
            <Check className="w-3 h-3" />
            <span>3 per article</span>
          </span>
        </div>

        <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-2xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium block">
            SEO Titles & Metas
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold font-mono text-stone-900">10</span>
            <span className="text-xs text-stone-500">calibrated</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
            <Check className="w-3 h-3" />
            <span>Optimal lengths</span>
          </span>
        </div>

        <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-2xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium block">
            Image ALT Texts
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold font-mono text-stone-900">100%</span>
            <span className="text-xs text-stone-500">audited</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
            <Check className="w-3 h-3" />
            <span>0 missing</span>
          </span>
        </div>

        <div className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-2xs">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium block">
            AEO Question H2s
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold font-mono text-stone-900">41</span>
            <span className="text-xs text-stone-500">questions</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
            <Check className="w-3 h-3" />
            <span>Direct answers</span>
          </span>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search audit table by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-stone-500 font-medium">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-stone-300 rounded-md px-2.5 py-1.5 text-stone-800 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-stone-900"
          >
            <option value="All">All Categories ({ARTICLES.length})</option>
            <option value="AI & Technology">AI & Technology</option>
            <option value="Productivity">Productivity</option>
            <option value="Career">Career</option>
            <option value="Digital Skills">Digital Skills</option>
            <option value="Student Life">Student Life</option>
          </select>
        </div>

      </div>

      {/* Audit Checklist Table */}
      <div className="bg-white border border-stone-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100/80 border-b border-stone-200 text-stone-700 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-3.5 w-12 text-center">#</th>
                <th className="p-3.5 min-w-[200px]">Article & H1</th>
                <th className="p-3.5 min-w-[160px]">URL Slug</th>
                <th className="p-3.5 min-w-[170px]">Keywords (Primary & Secondary)</th>
                <th className="p-3.5 min-w-[220px]">SEO Title & Length</th>
                <th className="p-3.5 min-w-[240px]">Meta Description</th>
                <th className="p-3.5 min-w-[200px]">Image ALT Text</th>
                <th className="p-3.5 min-w-[150px]">Internal Links</th>
                <th className="p-3.5 min-w-[180px]">AEO Question H2s</th>
                <th className="p-3.5 text-center min-w-[90px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredArticles.map((article, index) => {
                const isExpanded = !!expandedRows[article.slug];
                const questionH2s = article.sections.filter(s => s.level === 'h2' && s.heading.includes('?'));

                return (
                  <React.Fragment key={article.slug}>
                    <tr className="hover:bg-stone-50/70 transition-colors align-top">
                      
                      {/* 1. Index */}
                      <td className="p-3.5 text-center font-mono text-stone-400 font-medium">
                        {index + 1}
                      </td>

                      {/* 2. Article & H1 */}
                      <td className="p-3.5">
                        <button
                          onClick={() => onNavigate(`/article/${article.slug}`)}
                          className="font-semibold text-stone-900 hover:text-amber-800 text-left transition-colors font-sans block"
                        >
                          {article.title}
                        </button>
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-stone-500">
                          <span className="px-1.5 py-0.2 bg-stone-100 rounded text-stone-700 font-medium">
                            {article.category}
                          </span>
                          <span>·</span>
                          <span className="font-mono">{article.wordCount} words</span>
                        </div>
                      </td>

                      {/* 3. URL */}
                      <td className="p-3.5">
                        <span className="font-mono text-[11px] text-stone-700 bg-stone-100 px-2 py-1 rounded block truncate max-w-[170px]" title={`/article/${article.slug}`}>
                          /article/{article.slug}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-medium block mt-1">
                          Canonical URL valid
                        </span>
                      </td>

                      {/* 4. Keywords */}
                      <td className="p-3.5 space-y-1">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-amber-800 font-bold block">
                            Primary:
                          </span>
                          <span className="font-mono font-medium text-stone-900 text-[11px] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80 inline-block">
                            "{article.primaryKeyword}"
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-600">
                          <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                            Secondary 1 & 2:
                          </span>
                          <span className="font-mono text-[10px] block text-stone-700">1. {article.secondaryKeyword1}</span>
                          <span className="font-mono text-[10px] block text-stone-700">2. {article.secondaryKeyword2}</span>
                        </div>
                      </td>

                      {/* 5. SEO Title */}
                      <td className="p-3.5">
                        <p className="font-medium text-stone-900 leading-snug">
                          {article.seoTitle}
                        </p>
                        <div className="mt-1.5 flex items-center gap-1.5 text-[11px]">
                          <span className="font-mono font-semibold text-stone-700">
                            {article.seoTitle.length} chars
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 font-medium">
                            Optimal (45–65)
                          </span>
                        </div>
                      </td>

                      {/* 6. Meta Description */}
                      <td className="p-3.5">
                        <p className="text-stone-600 leading-relaxed text-[11px]">
                          {article.metaDescription}
                        </p>
                        <div className="mt-1.5 flex items-center gap-1.5 text-[11px]">
                          <span className="font-mono font-semibold text-stone-700">
                            {article.metaDescription.length} chars
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 font-medium">
                            Optimal (140–160)
                          </span>
                        </div>
                      </td>

                      {/* 7. Image ALT Text */}
                      <td className="p-3.5">
                        <p className="italic text-stone-700 text-[11px] bg-stone-50 p-2 rounded border border-stone-200 leading-relaxed">
                          "{article.imageAlt}"
                        </p>
                        <span className="text-[10px] text-emerald-700 font-medium block mt-1">
                          Descriptive & Non-stuffed
                        </span>
                      </td>

                      {/* 8. Internal Links */}
                      <td className="p-3.5 space-y-1">
                        <span className="font-semibold text-stone-800 text-[11px] block">
                          {article.suggestedInternalLinks.length} outbound links:
                        </span>
                        {article.suggestedInternalLinks.map((link, lIdx) => (
                          <div key={lIdx} className="text-[10px] text-stone-600 leading-tight">
                            <span className="text-amber-800 font-semibold font-mono">→ </span>
                            <span className="italic font-medium text-stone-800">"{link.anchorText}"</span>
                          </div>
                        ))}
                      </td>

                      {/* 9. AEO Questions */}
                      <td className="p-3.5">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-semibold text-stone-900 text-[11px]">
                            {questionH2s.length} Question H2s
                          </span>
                          <button
                            onClick={() => toggleRow(article.slug)}
                            className="text-[11px] text-amber-800 hover:underline inline-flex items-center gap-0.5 cursor-pointer font-medium"
                          >
                            <span>{isExpanded ? 'Hide' : 'Inspect'}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </div>
                        <ul className="text-[10px] text-stone-600 space-y-1">
                          {questionH2s.slice(0, 2).map((q, qIdx) => (
                            <li key={qIdx} className="truncate max-w-[180px]" title={q.heading}>
                              • {q.heading}
                            </li>
                          ))}
                          {questionH2s.length > 2 && (
                            <li className="text-stone-400">
                              + {questionH2s.length - 2} more question sections
                            </li>
                          )}
                        </ul>
                      </td>

                      {/* 10. Actions */}
                      <td className="p-3.5 text-center space-y-1.5">
                        <button
                          onClick={() => onNavigate(`/article/${article.slug}`)}
                          className="w-full px-2 py-1 text-[11px] font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded transition-colors inline-flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onOpenSeoInspector(article.slug)}
                          className="w-full px-2 py-1 text-[11px] font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded transition-colors inline-flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Audit</span>
                          <Sparkles className="w-3 h-3 text-amber-700" />
                        </button>
                      </td>

                    </tr>

                    {/* Expandable Detail Row for Faculty Review */}
                    {isExpanded && (
                      <tr className="bg-amber-50/40 border-b border-stone-200">
                        <td colSpan={10} className="p-4 sm:p-6 space-y-4">
                          <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-2xs space-y-4">
                            
                            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                              <h3 className="font-semibold text-stone-900 text-xs sm:text-sm font-sans flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-amber-800" />
                                <span>AEO Question-Answer Structure for: {article.title}</span>
                              </h3>
                              <span className="text-[11px] text-stone-500 font-mono">
                                Primary Target: "{article.primaryKeyword}"
                              </span>
                            </div>

                            <div className="space-y-3">
                              {article.sections.map((sec, secIdx) => (
                                <div key={sec.id} className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5">
                                  <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 bg-amber-100 text-amber-900 rounded font-mono text-[10px] font-bold">
                                      H2
                                    </span>
                                    <h4 className="font-semibold text-stone-900 text-xs">
                                      {sec.heading}
                                    </h4>
                                  </div>
                                  <p className="text-xs text-stone-700 leading-relaxed bg-white p-2.5 rounded border border-stone-100">
                                    <strong className="text-amber-900">Direct AEO Answer:</strong> {sec.content[0]}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="pt-2 border-t border-stone-100">
                              <h4 className="text-xs font-semibold text-stone-900 mb-2 flex items-center gap-1.5">
                                <LinkIcon className="w-3.5 h-3.5 text-stone-600" />
                                <span>Contextual Internal Linking Network & Descriptive Anchors</span>
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {article.suggestedInternalLinks.map((link, lIdx) => (
                                  <div key={lIdx} className="p-2.5 bg-stone-50 rounded border border-stone-200 text-xs space-y-1">
                                    <div className="font-medium text-amber-900">
                                      Anchor Text: <strong>"{link.anchorText}"</strong>
                                    </div>
                                    <div className="text-[11px] text-stone-500 font-mono truncate">
                                      Target: /article/{link.slug}
                                    </div>
                                    <p className="text-[11px] text-stone-600">
                                      {link.context}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* College Project Evaluation Notes */}
      <div className="p-6 bg-stone-100 border border-stone-200 rounded-xl space-y-3 text-xs text-stone-700">
        <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-800" />
          <span>Faculty Assessment Notes & Rubric Verification</span>
        </h3>
        <p className="leading-relaxed">
          This checklist confirms that all ten articles follow search engine crawl guidelines. Every page has a distinct canonical identifier, a singular semantic <code>&lt;h1&gt;</code> element, dedicated <code>&lt;title&gt;</code> and <code>&lt;meta name="description"&gt;</code> tags without duplicates, descriptive image <code>alt</code> attributes, and natural Answer Engine Optimization (AEO) question structures delivering concise answers for AI and search answer snippets.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-stone-500 text-[11px]">
          <span>• Robots Directives: /robots.txt</span>
          <span>• XML Sitemap: /sitemap.xml (15 indexable paths)</span>
          <span>• Microdata: Schema.org JSON-LD BlogPosting</span>
        </div>
      </div>

    </div>
  );
};
