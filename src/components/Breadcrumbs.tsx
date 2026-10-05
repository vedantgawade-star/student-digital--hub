import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2.5">
      <ol 
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
        className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500"
      >
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem" 
          className="inline-flex items-center"
        >
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-stone-900 transition-colors inline-flex items-center gap-1 cursor-pointer"
            itemProp="item"
          >
            <Home className="w-3.5 h-3.5 text-stone-400" />
            <span itemProp="name">Home</span>
          </button>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 2;

          return (
            <li 
              key={index} 
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem" 
              className="inline-flex items-center gap-1.5"
            >
              <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" aria-hidden="true" />
              {isLast || !item.path ? (
                <span 
                  itemProp="name" 
                  className="font-medium text-stone-900 truncate max-w-[200px] sm:max-w-md"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(item.path!)}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </button>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
