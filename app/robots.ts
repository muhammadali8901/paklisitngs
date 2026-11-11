import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
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
    sitemap: 'https://www.paklistings.com/sitemap.xml',
  }
}
