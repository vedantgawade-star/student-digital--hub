import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, BookOpen, ArrowUpDown, X } from 'lucide-react';
import { ARTICLES, CATEGORIES } from '../data/articles.ts';
import { ArticleCard } from '../components/ArticleCard.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';

interface BlogPageProps {
  onNavigate: (path: string) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({ 
  onNavigate, 
  initialCategory = 'All',
  initialSearch = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'newest' | 'readTime' | 'title'>('newest');

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory = 
        selectedCategory === 'All' || article.category === selectedCategory;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.primaryKeyword.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'readTime') {
        const aMin = parseInt(a.readTime);
        const bMin = parseInt(b.readTime);
        return aMin - bMin;
      }
      // default newest (keep original catalog order)
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Breadcrumb Header */}
      <div>
        <Breadcrumbs items={[{ label: 'Articles & Guides' }]} onNavigate={onNavigate} />
        
        <div className="mt-4 pb-6 border-b border-stone-200">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block mb-2">
            The Digital Scholar Library
          </span>
          <h1 className="text-3xl sm:text-4xl font-editorial font-medium text-stone-900 tracking-tight">
            All Articles & Practical Guides
          </h1>
          <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            In-depth, research-backed guides covering career planning, business spreadsheets, AI tools, and student personal finance.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="space-y-4">
        
        {/* Search Bar + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by topic, keyword, or tool (e.g. Excel, AI, Resume)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900 transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                aria-label="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-stone-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-300 rounded-md px-2.5 py-1.5 text-stone-800 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-stone-900"
            >
              <option value="newest">Featured & Recommended</option>
              <option value="readTime">Read Time (Shortest First)</option>
              <option value="title">Title (Alphabetical)</option>
            </select>
          </div>

        </div>

        {/* Category Tabs (Interactive Filter Controls as permitted by Constitution) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none pt-1">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            All Articles ({ARTICLES.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
        <span>
          Showing <strong>{filteredArticles.length}</strong> of {ARTICLES.length} articles
          {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
        </span>
        
        {(searchQuery || selectedCategory !== 'All') && (
          <button
            onClick={clearFilters}
            className="text-stone-700 hover:text-stone-950 font-medium underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-stone-200 rounded-xl p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-base font-semibold text-stone-900 font-sans">
            No matching articles found
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            We couldn't find any articles matching "{searchQuery}". Try searching for broader terms like "Excel", "Resume", or "Routine".
          </p>
          <div className="pt-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
