import React, { useState } from 'react';
import { Search, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSeoInspector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenSeoInspector }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'All Articles', path: '/blog' },
    { label: 'SEO Checklist', path: '/seo-checklist' },
    { label: 'About Project', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}
          className="text-lg sm:text-xl font-editorial font-semibold tracking-tight text-stone-900 hover:text-stone-700 transition-colors"
        >
          The Student Digital Hub
        </a>

        {/* Zone 2: 4–6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.path); }}
                className={`transition-colors py-1 ${
                  isActive 
                    ? 'text-stone-950 font-semibold border-b-2 border-stone-900 -mb-0.5' 
                    : 'hover:text-stone-950'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSeoInspector}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-50/80 border border-amber-200 rounded-md hover:bg-amber-100/90 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            title="Inspect Real-Time On-Page SEO, Meta Tags & Schema Markup"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">SEO</span> Inspector
          </button>

          <button
            onClick={() => handleNavClick('/blog')}
            className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Explore Reads</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-50 border-b border-stone-200 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                currentPath === link.path
                  ? 'bg-stone-200 text-stone-900 font-semibold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => { onOpenSeoInspector(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium text-amber-900 bg-amber-50 border border-amber-200 rounded-md"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              Open SEO Meta Inspector
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
