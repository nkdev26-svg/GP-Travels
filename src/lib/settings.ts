import { prisma } from './db';
import { unstable_cache } from 'next/cache';

export const getSiteSettings = unstable_cache(
    async () => {
        const settings = await prisma.siteSettings.findMany();
        const settingsMap: Record<string, string> = {};
        settings.forEach(s => {
            settingsMap[s.key] = s.value;
        });
        return settingsMap;
    },
    ['site-settings'],
    { tags: ['settings'] }
);

export const getTestimonials = unstable_cache(
    async () => {
        return await prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' }
        });
    },
    ['testimonials'],
    { tags: ['testimonials'] }
);

export const CONTACT_INFO = {
    phone: '+1234567890',
    whatsapp: '+1234567890',
};
