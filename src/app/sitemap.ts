import { MetadataRoute } from 'next';
import { PRODUCTS } from '../data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.frallicciardi.it';

  // Base routes
  const routes = ['', '/chi-siamo', '/contatti', '/catalogo', '/privacy', '/termini-condizioni'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/catalogo' ? 0.9 : 0.8,
  }));

  // Dynamic product routes
  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/catalogo/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...productRoutes];
}
