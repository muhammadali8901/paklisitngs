import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // AI + SEO crawlers hammering the site (Nov 2026 CDN burn: top
        // paths were bot-hit 404s + /blog pagination). These agents obey
        // robots.txt. Googlebot/Bingbot stay allowed (ranking traffic);
        // facebookexternalhit stays allowed (link previews).
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'Google-Extended',
          'CCBot',
          'PerplexityBot',
          'Bytespider',
          'Applebot',
          'cohere-ai',
          'Meta-ExternalAgent',
          'meta-webindexer',
          'SemrushBot',
          'Amazonbot',
          'ExaSearchBot',
          'AhrefsBot',
        ],
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api/*',
          '/login',
          '/login/*',
          '/register',
          '/register/*',
          '/dashboard',
          '/dashboard/*',
          '/business-dashboard',
          '/business-dashboard/*',
        ],
      },
    ],
    sitemap: 'https://www.paklistings.com/sitemap.xml',
  }
}
