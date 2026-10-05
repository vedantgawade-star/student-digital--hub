export type CategoryType = 
  | 'AI & Technology'
  | 'Productivity'
  | 'Career'
  | 'Digital Skills'
  | 'Student Life';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface InternalLinkRef {
  slug: string;
  anchorText: string;
  context: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  level: 'h2' | 'h3';
  content: string[]; // array of paragraphs or lists
  callout?: string;
  subsections?: {
    id: string;
    heading: string;
    content: string[];
  }[];
}

export interface Article {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: CategoryType;
  publishedDate: string;
  readTime: string;
  wordCount: number;
  featuredImage: string;
  imageAlt: string;
  author: Author;
  excerpt: string;
  sections: ArticleSection[];
  conclusion: string;
  keyTakeaways: string[];
  suggestedInternalLinks: InternalLinkRef[];
  isFeatured?: boolean;
}

export interface SeoAuditReport {
  title: string;
  titleLength: number;
  titleStatus: 'optimal' | 'warning' | 'short' | 'long';
  metaDescription: string;
  metaDescLength: number;
  metaDescStatus: 'optimal' | 'warning' | 'short' | 'long';
  primaryKeyword: string;
  keywordCount: number;
  keywordDensity: string;
  wordCount: number;
  canonicalUrl: string;
  headingsCount: {
    h1: number;
    h2: number;
    h3: number;
  };
  hasOgTags: boolean;
  hasSchemaJsonLd: boolean;
}
