import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'https://gptravels.com';

  try {
      // Get tours
      const tours = await prisma.tour.findMany({
        select: {
          id: true,
          updatedAt: true,
        },
      });

      const tourUrls = tours.map((tour) => ({
        url: `${baseUrl}/tours/${tour.id}`,
        lastModified: tour.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

      // Get cars
      const cars = await prisma.car.findMany({
        select: {
          id: true,
          updatedAt: true,
        },
      });

      const carUrls = cars.map((car) => ({
        url: `${baseUrl}/cars/${car.id}`,
        lastModified: car.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

      // Static routes
      const staticRoutes = ['', '/tours', '/cars', '/about', '/contact', '/login'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.9,
      }));

      return [...staticRoutes, ...tourUrls, ...carUrls];
  } catch (error) {
      console.error("Failed to generate sitemap", error);
      // Fallback
      return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        }
      ]
  }
}
