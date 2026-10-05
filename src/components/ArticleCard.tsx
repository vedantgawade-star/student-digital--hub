import React, { useState } from 'react';
import { Article } from '../types/index.ts';
import { ArrowUpRight, BookOpen } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onNavigate: (slug: string) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate, featured = false }) => {
  const [imgError, setImgError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(`/article/${article.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (featured) {
    return (
      <article className="group relative bg-white border border-stone-200/90 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Visual Column */}
          <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-stone-100">
            {!imgError ? (
              <img
                src={article.featuredImage}
                alt={article.imageAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full min-h-[260px] flex items-center justify-center bg-stone-100 text-stone-400">
                <BookOpen className="w-12 h-12 stroke-[1.2]" />
              </div>
            )}
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Zero-Pill Metadata Line */}
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-3 font-sans">
                <span className="font-semibold text-stone-800">{article.category}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{article.readTime}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{article.publishedDate}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-editorial font-medium text-stone-900 group-hover:text-amber-800 transition-colors leading-snug tracking-tight mb-3">
                <a href={`/article/${article.slug}`} onClick={handleClick}>
                  {article.title}
                </a>
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed mb-6">
                {article.excerpt}
              </p>
            </div>

            {/* Bottom Author & CTA */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center text-xs font-semibold text-stone-700">
                  {article.author.name.charAt(0)}
                </div>
                <div className="text-xs">
                  <span className="font-medium text-stone-900 block">{article.author.name}</span>
                  <span className="text-stone-400 text-[11px] block">{article.wordCount} words</span>
                </div>
              </div>

              <a
                href={`/article/${article.slug}`}
                onClick={handleClick}
                className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 hover:text-amber-700 transition-colors"
                aria-label={`Read full article: ${article.title}`}
              >
                <span>Read Article</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </article>
    );
  }

  // Standard Editorial Card
  return (
    <article className="group flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      
      {/* Thumbnail */}
      <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
        {!imgError ? (
          <img
            src={article.featuredImage}
            alt={article.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
            <BookOpen className="w-10 h-10 stroke-[1.2]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2.5 font-sans">
            <span className="font-medium text-stone-800">{article.category}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{article.readTime}</span>
          </div>

          {/* Heading */}
          <h3 className="text-lg font-editorial font-medium text-stone-900 group-hover:text-amber-800 transition-colors leading-snug tracking-tight mb-2.5">
            <a href={`/article/${article.slug}`} onClick={handleClick}>
              {article.title}
            </a>
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-400 text-[11px]">{article.publishedDate}</span>
          
          <a
            href={`/article/${article.slug}`}
            onClick={handleClick}
            className="inline-flex items-center gap-1 font-semibold text-stone-900 group-hover:text-amber-700 transition-colors"
          >
            <span>Read</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

      </div>
    </article>
  );
};
