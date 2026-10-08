import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { Sparkles, ShieldCheck, CheckCircle2, Award, BookOpen, Layers, ExternalLink } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenSeoInspector: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenSeoInspector }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      
      {/* Breadcrumb Header */}
      <div>
        <Breadcrumbs items={[{ label: 'About & Academic Rubric' }]} onNavigate={onNavigate} />
        
        <div className="mt-4 pb-6 border-b border-stone-200">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block mb-2">
            Academic Project Overview
          </span>
          <h1 className="text-3xl sm:text-5xl font-editorial font-medium text-stone-900 tracking-tight">
            About The Student Digital Hub
          </h1>
          <p className="text-base text-stone-600 mt-3 leading-relaxed">
            A comprehensive college project for the <strong>Fundamentals of SEO</strong> course, demonstrating how modern search engine optimization principles unite with authentic, high-value editorial content.
          </p>
        </div>
      </div>

      {/* 1. Project Purpose & Scope */}
      <section className="space-y-4">
        <h2 className="text-2xl font-editorial font-medium text-stone-900">
          1. Purpose & Mission
        </h2>
        <div className="space-y-3 text-sm text-stone-700 leading-relaxed font-sans">
          <p>
            Higher education today demands more than memorizing lectures. To thrive in competitive corporate, tech, and entrepreneurial ecosystems, university students need hands-on mastery of digital skills, spreadsheet modeling, AI assistants, and personal brand building.
          </p>
          <p>
            <strong>The Student Digital Hub</strong> was conceived to solve two simultaneous goals:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-stone-800">
            <li>
              <strong>An Educational Resource:</strong> Provide undergraduate students with practical, actionable, 700–1000 word blueprints that help them optimize their college routine, ace interviews, and build lasting career leverage.
            </li>
            <li>
              <strong>A Live SEO Demonstration:</strong> Serve as an empirical testbed for the <em>Fundamentals of SEO</em> curriculum—implementing real-world on-page, off-page, technical, and semantic search optimizations.
            </li>
          </ol>
        </div>
      </section>

      {/* 2. Syllabus & Rubric Alignment (Course Focus) */}
      <section className="p-6 sm:p-8 bg-white border border-stone-200 rounded-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Syllabus Mapping
            </span>
            <h2 className="text-xl sm:text-2xl font-editorial font-medium text-stone-900 mt-1">
              Fundamentals of SEO Course Rubric Compliance
            </h2>
          </div>
          <Award className="w-8 h-8 text-amber-700 hidden sm:block shrink-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-700">
          
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
            <h3 className="font-semibold text-stone-900 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Keyword Strategy & Intent</span>
            </h3>
            <p className="leading-relaxed">
              Every article targets a distinct commercial or informational student keyword (e.g., <em>"productive college routine"</em>, <em>"Excel skills for BBA students"</em>) placed naturally in titles, H1s, introductory paragraphs, and conclusion sections.
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
            <h3 className="font-semibold text-stone-900 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Metadata & Snippet Optimization</span>
            </h3>
            <p className="leading-relaxed">
              All 10 articles maintain strict character length parameters: Title tags are calibrated between 45–60 characters to prevent truncation, and meta descriptions are composed between 140–160 characters.
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
            <h3 className="font-semibold text-stone-900 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Heading Hierarchy & Semantics</span>
            </h3>
            <p className="leading-relaxed">
              Clean semantic HTML: Exactly one &lt;h1&gt; element per page corresponding to the core topic, followed by structured &lt;h2&gt; main sections and nested &lt;h3&gt; specific takeaways.
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
            <h3 className="font-semibold text-stone-900 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Topical Internal Linking Silo</span>
            </h3>
            <p className="leading-relaxed">
              Cross-linked articles share thematic relevance, passing PageRank across career, digital skills, and productivity clusters to build deep domain topical authority.
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
            <h3 className="font-semibold text-stone-900 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Technical Directives & Sitemaps</span>
            </h3>
            <p className="leading-relaxed">
              Includes fully compliant <a href="/robots.txt" className="text-amber-800 underline">robots.txt</a> and <a href="/sitemap.xml" className="text-amber-800 underline">sitemap.xml</a> files specifying canonical indexable routes and change frequencies.
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
            <h3 className="font-semibold text-stone-900 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Schema.org (JSON-LD)</span>
            </h3>
            <p className="leading-relaxed">
              Dynamically embedded <code>BlogPosting</code> and <code>WebSite</code> structured data empowers search crawlers with verified authorship, dates, and category tags.
            </p>
          </div>

        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
          <span className="text-xs text-stone-500">
            Want to examine on-page metrics and the faculty matrix?
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/seo-checklist')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-stone-200 hover:bg-stone-300 rounded transition-colors cursor-pointer"
            >
              <span>View Faculty SEO Checklist</span>
            </button>
            <button
              onClick={onOpenSeoInspector}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200 rounded transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span>Launch Live SEO Inspector</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Target Audience Personas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-editorial font-medium text-stone-900">
          3. Target Audience Personas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-700">
          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
            <span className="font-semibold text-stone-900 block text-sm">
              The Business & BBA Major
            </span>
            <p className="leading-relaxed text-stone-600">
              Needs actionable Excel financial modeling, case competition strategies, entrance exam roadmaps (CAT/GMAT), and consulting resume formats.
            </p>
          </div>

          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
            <span className="font-semibold text-stone-900 block text-sm">
              The Tech & Digital Aspirant
            </span>
            <p className="leading-relaxed text-stone-600">
              Seeks ethical AI research tools, digital marketing analytics (GA4), search engine mechanics, and public proof-of-work documentation.
            </p>
          </div>

          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
            <span className="font-semibold text-stone-900 block text-sm">
              The Ambitious Undergrad
            </span>
            <p className="leading-relaxed text-stone-600">
              Struggles with semester time-management, financial budgeting, and LinkedIn networking, seeking clear cognitive productivity frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Author & Editorial Integrity */}
      <section className="p-6 bg-stone-100 border border-stone-200 rounded-xl space-y-4">
        <h2 className="text-xl font-editorial font-medium text-stone-900">
          4. Author Bio & Editorial Methodology
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-16 h-16 rounded-full bg-stone-300 flex items-center justify-center text-xl font-editorial font-bold text-stone-800 shrink-0">
            VG
          </div>
          <div className="space-y-1 text-xs text-stone-700">
            <h3 className="text-sm font-semibold text-stone-900">
              Vedant Gawade — Project Lead & Primary Author
            </h3>
            <p className="leading-relaxed">
              Student researcher focusing on search engine algorithms, information architecture, and technical marketing. This project was developed as the primary deliverable for university coursework in Fundamentals of SEO, demonstrating practical search discoverability on modern single-page web applications.
            </p>
            <div className="pt-1 flex items-center gap-3 text-stone-500">
              <span>Primary Stack: React, TypeScript, Tailwind CSS</span>
              <span>·</span>
              <span>Host Target: Vercel Cloud Platform</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
