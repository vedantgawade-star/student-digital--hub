import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { SeoInspectorModal } from './components/SeoInspectorModal.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { BlogPage } from './pages/BlogPage.tsx';
import { ArticleDetailPage } from './pages/ArticleDetailPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { SitemapPage } from './pages/SitemapPage.tsx';
import { ARTICLES } from './data/articles.ts';
import { updatePageSeo, generateArticleJsonLd } from './utils/seo.ts';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [seoInspectorOpen, setSeoInspectorOpen] = useState(false);
  const [inspectorArticleSlug, setInspectorArticleSlug] = useState<string | undefined>(undefined);

  // Synchronize browser history and popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState(null, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Extract article slug if path is /article/[slug]
  const articleMatch = currentPath.match(/^\/article\/([^/?#]+)/);
  const currentArticleSlug = articleMatch ? articleMatch[1] : null;
  const currentArticle = currentArticleSlug 
    ? ARTICLES.find(a => a.slug === currentArticleSlug) 
    : null;

  // Extract query parameters for category or search if present
  const urlParams = new URLSearchParams(window.location.search);
  const queryCategory = urlParams.get('category') || undefined;
  const querySearch = urlParams.get('q') || undefined;

  // Update real document metadata (Title, Meta Description, Canonical URL, JSON-LD) on route change
  useEffect(() => {
    if (currentArticle) {
      updatePageSeo({
        title: `${currentArticle.seoTitle} | The Student Digital Hub`,
        description: currentArticle.metaDescription,
        canonicalPath: `/article/${currentArticle.slug}`,
        ogType: 'article',
        schemaJson: generateArticleJsonLd(currentArticle)
      });
    } else if (currentPath.startsWith('/blog') || currentPath.startsWith('/categories')) {
      updatePageSeo({
        title: 'All Articles & Digital Guides | The Student Digital Hub',
        description: 'Explore comprehensive guides for college students on AI tools, Excel analytics, career planning, personal branding, and productivity.',
        canonicalPath: '/blog',
        ogType: 'website'
      });
    } else if (currentPath.startsWith('/about')) {
      updatePageSeo({
        title: 'About the Project & SEO Syllabus Rubric | The Student Digital Hub',
        description: 'Learn about The Student Digital Hub, an academic case study for the Fundamentals of SEO course focusing on student productivity and digital skills.',
        canonicalPath: '/about',
        ogType: 'website'
      });
    } else if (currentPath.startsWith('/contact')) {
      updatePageSeo({
        title: 'Contact Editorial Desk | The Student Digital Hub',
        description: 'Submit an editorial inquiry, propose a case study, or reach out to the project research team at The Student Digital Hub.',
        canonicalPath: '/contact',
        ogType: 'website'
      });
    } else if (currentPath.startsWith('/sitemap')) {
      updatePageSeo({
        title: 'HTML & XML Sitemap Index | The Student Digital Hub',
        description: 'Hierarchical index of all indexable articles, core disciplines, and XML crawl directives for search engine web crawlers.',
        canonicalPath: '/sitemap',
        ogType: 'website'
      });
    } else {
      // Home page
      updatePageSeo({
        title: 'The Student Digital Hub — Master Productivity, Tech & Career Skills',
        description: 'A comprehensive digital publication and SEO case study helping university students excel in productivity, AI tools, Excel analytics, career planning, and personal branding.',
        canonicalPath: '/',
        ogType: 'website'
      });
    }
  }, [currentPath, currentArticle]);

  const handleOpenSeoInspector = (slug?: string) => {
    if (slug) {
      setInspectorArticleSlug(slug);
    } else if (currentArticle) {
      setInspectorArticleSlug(currentArticle.slug);
    } else {
      setInspectorArticleSlug(ARTICLES[0].slug);
    }
    setSeoInspectorOpen(true);
  };

  // Determine which page component to render
  const renderContent = () => {
    if (currentArticle) {
      return (
        <ArticleDetailPage
          article={currentArticle}
          onNavigate={navigateTo}
          onOpenSeoInspector={handleOpenSeoInspector}
        />
      );
    }

    if (currentPath.startsWith('/blog') || currentPath.startsWith('/categories')) {
      return (
        <BlogPage
          onNavigate={navigateTo}
          initialCategory={queryCategory || 'All'}
          initialSearch={querySearch || ''}
        />
      );
    }

    if (currentPath.startsWith('/about')) {
      return (
        <AboutPage
          onNavigate={navigateTo}
          onOpenSeoInspector={handleOpenSeoInspector}
        />
      );
    }

    if (currentPath.startsWith('/contact')) {
      return (
        <ContactPage
          onNavigate={navigateTo}
        />
      );
    }

    if (currentPath.startsWith('/sitemap')) {
      return (
        <SitemapPage
          onNavigate={navigateTo}
        />
      );
    }

    // Default Home Page
    return (
      <HomePage
        onNavigate={navigateTo}
        onOpenSeoInspector={handleOpenSeoInspector}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans selection:bg-amber-100 selection:text-amber-950">
      
      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSeoInspector={() => handleOpenSeoInspector()}
      />

      {/* Main Dynamic View */}
      <div className="flex-1">
        {renderContent()}
      </div>

      {/* Institutional Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenSeoInspector={() => handleOpenSeoInspector()}
      />

      {/* Live SEO Inspector Slide-over Modal */}
      <SeoInspectorModal
        isOpen={seoInspectorOpen}
        onClose={() => setSeoInspectorOpen(false)}
        currentArticleSlug={inspectorArticleSlug}
        onNavigateToArticle={(slug) => navigateTo(`/article/${slug}`)}
      />

    </div>
  );
}
