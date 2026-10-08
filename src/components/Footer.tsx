import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, FileText, Globe, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '../data/articles.ts';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenSeoInspector: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSeoInspector }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-4">
            <span className="text-xl font-editorial font-semibold text-white tracking-tight block">
              The Student Digital Hub
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              An academic digital publication developed for the <strong>Fundamentals of SEO</strong> course. Dedicated to empowering undergraduate students with modern digital skills, career strategies, and productivity principles.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenSeoInspector}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                <span>Launch SEO Audit Inspector</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => {
                      onNavigate(`/blog?category=${encodeURIComponent(cat.name)}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-stone-300 hover:text-white transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Technical SEO */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              Sitemap & Technical SEO
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { onNavigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('/blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  All 10 Core Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('/about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  About & Academic Rubric
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('/contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Contact Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('/seo-checklist'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-medium"
                >
                  <FileText className="w-3 h-3" />
                  <span>Faculty SEO Checklist (/seo-checklist)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('/sitemap'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>HTML & XML Sitemaps</span>
                </button>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-1"
                >
                  <Globe className="w-3 h-3" />
                  <span>View robots.txt</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              The Digital Scholar Dispatch
            </h3>
            <p className="text-xs text-stone-400 mb-3">
              Receive weekly curated case studies on AI prompts, business analytics, and career blueprints.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 bg-emerald-950/60 border border-emerald-800 rounded-md text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You are subscribed to weekly dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter university email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-800 border border-stone-700 rounded-md text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-white rounded-md transition-colors font-sans-ui"
                >
                  Subscribe Free
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} The Student Digital Hub. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built for Fundamentals of SEO Project</span>
            <span>·</span>
            <span>Production Ready for Vercel Deployment</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
