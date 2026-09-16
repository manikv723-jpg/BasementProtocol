import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const pages: [path: string, priority: number][] = [
  ['', 1],
  ['/ai-consulting', 0.9],
  ['/ai-agent-development', 0.9],
  ['/ai-lead-generation', 0.8],
  ['/smes', 0.9],
  ['/enterprise', 0.8],
  ['/about', 0.6],
  ['/4ruple', 0.9],
  ['/contact', 0.5],
  ['/terms', 0.3],
  ['/privacy', 0.3],
  ['/refund-policy', 0.3],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-09-15');
  return pages.map(([path, priority]) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
