import { Article, SeoAuditReport } from '../types/index.ts';

export function updatePageSeo(params: {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  schemaJson?: object;
}) {
  const { title, description, canonicalPath = '', ogType = 'website', schemaJson } = params;

  // 1. Update Title
  document.title = title;

  // 2. Base domain
  const baseUrl = 'https://thestudentdigitalhub.vercel.app';
  const fullCanonicalUrl = canonicalPath.startsWith('http') 
    ? canonicalPath 
    : `${baseUrl}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  // 3. Update Canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', fullCanonicalUrl);

  // 4. Update Meta Description
  updateMetaTag('name', 'description', description);

  // 5. Update Open Graph
  updateMetaTag('property', 'og:title', title);
  updateMetaTag('property', 'og:description', description);
  updateMetaTag('property', 'og:url', fullCanonicalUrl);
  updateMetaTag('property', 'og:type', ogType);

  // 6. Update Twitter Card
  updateMetaTag('name', 'twitter:title', title);
  updateMetaTag('name', 'twitter:description', description);

  // 7. Update or inject JSON-LD structured data
  if (schemaJson) {
    let scriptEl = document.getElementById('dynamic-ld-json') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-ld-json';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemaJson, null, 2);
  }
}

function updateMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function generateArticleJsonLd(article: Article, originUrl: string = 'https://thestudentdigitalhub.vercel.app') {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${originUrl}/article/${article.slug}`
    },
    "headline": article.seoTitle,
    "description": article.metaDescription,
    "image": article.featuredImage,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Student Digital Hub",
      "logo": {
        "@type": "ImageObject",
        "url": `${originUrl}/favicon.ico`
      }
    },
    "datePublished": "2026-10-04T00:00:00Z",
    "dateModified": "2026-10-04T00:00:00Z",
    "keywords": [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
    "articleSection": article.category,
    "wordCount": article.wordCount
  };
}

export function auditArticleSeo(article: Article): SeoAuditReport {
  const titleLen = article.seoTitle.length;
  let titleStatus: SeoAuditReport['titleStatus'] = 'optimal';
  if (titleLen < 30) titleStatus = 'short';
  else if (titleLen > 65) titleStatus = 'long';
  else if (titleLen < 45 || titleLen > 60) titleStatus = 'warning';

  const descLen = article.metaDescription.length;
  let metaDescStatus: SeoAuditReport['metaDescStatus'] = 'optimal';
  if (descLen < 120) metaDescStatus = 'short';
  else if (descLen > 165) metaDescStatus = 'long';
  else if (descLen < 140 || descLen > 160) metaDescStatus = 'warning';

  // Count primary keyword occurrences in text
  const lowerKeyword = article.primaryKeyword.toLowerCase();
  const allText = [
    article.title,
    article.seoTitle,
    article.metaDescription,
    article.excerpt,
    ...article.sections.flatMap(s => [s.heading, ...s.content, ...(s.subsections?.flatMap(sub => [sub.heading, ...sub.content]) || [])]),
    article.conclusion
  ].join(' ').toLowerCase();

  const regex = new RegExp(`\\b${lowerKeyword}\\b`, 'gi');
  const matches = allText.match(regex);
  const keywordCount = matches ? matches.length : 0;
  
  const totalWords = allText.split(/\s+/).filter(Boolean).length;
  const density = totalWords > 0 ? ((keywordCount * lowerKeyword.split(' ').length / totalWords) * 100).toFixed(2) : '0.00';

  let h2Count = 0;
  let h3Count = 0;
  article.sections.forEach(s => {
    if (s.level === 'h2') h2Count++;
    if (s.subsections) {
      h3Count += s.subsections.length;
    }
  });

  return {
    title: article.seoTitle,
    titleLength: titleLen,
    titleStatus,
    metaDescription: article.metaDescription,
    metaDescLength: descLen,
    metaDescStatus,
    primaryKeyword: article.primaryKeyword,
    keywordCount,
    keywordDensity: `${density}%`,
    wordCount: article.wordCount,
    canonicalUrl: `https://thestudentdigitalhub.vercel.app/article/${article.slug}`,
    headingsCount: {
      h1: 1, // The article title is the semantic H1
      h2: h2Count,
      h3: h3Count
    },
    hasOgTags: true,
    hasSchemaJsonLd: true
  };
}
