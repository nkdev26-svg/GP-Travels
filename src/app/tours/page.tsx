import React, { Suspense } from 'react';

import { Search, MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
export const revalidate = 3600;
import { TourCard } from '@/components/ui/TourCard';
import { SearchInput } from '@/components/ui/SearchInput';
import { prisma } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { CONTACT_INFO } from '@/lib/data';
import { SectionSkeleton } from '@/components/ui/Skeletons';

async function ToursContent({ search }: { search?: string }) {
    const tours = await prisma.tour.findMany({
        where: search ? {
            OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { destination: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ],
        } : {},
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
            ))}
        </div>
    );
}

async function ContactCTA() {
    const settings = await getSiteSettings();
    return (
        <div className="mt-20 relative px-4">
            {/* Background Decorative Mesh Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative bg-white/10 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] text-center max-w-4xl mx-auto border border-white/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden group">
                {/* Internal Glass Shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/20 rounded-full blur-3xl pointer-events-none" />

                <span className="relative z-10 inline-block py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                    Custom Itineraries
                </span>
                
                <h2 className="relative z-10 text-3xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight leading-tight">
                    Don't see what you're <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">looking for?</span>
                </h2>
                
                <p className="relative z-10 text-slate-600 mb-10 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
                    We specialize in <span className="text-primary font-bold">custom itineraries</span> and group tours. Contact us directly to build your dream trip from scratch.
                </p>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                    {/* Glassic Button 1 */}
                    <a 
                        href={`tel:${settings.phone || CONTACT_INFO.phone}`} 
                        className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary transition-all shadow-xl shadow-slate-900/20"
                    >
                        <Phone className="w-5 h-5 mr-1" />
                        {settings.phone || CONTACT_INFO.phone}
                    </a>
                    
                    <div className="text-slate-300 font-bold text-xs uppercase tracking-widest hidden sm:block">OR</div>
                    
                    {/* Glassic Button 2 */}
                    <a 
                        href={`https://wa.me/${settings.whatsapp || CONTACT_INFO.whatsapp}`} 
                        className="flex items-center gap-3 bg-white/40 backdrop-blur-md border border-white/60 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:border-primary hover:text-primary transition-all shadow-lg"
                    >
                        <MessageCircle className="w-6 h-6 text-[#25D366]" />
                        WhatsApp Us
                    </a>
                </div>
            </div>
        </div>
    );
}

export default async function ToursPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search } = await searchParams;

    return (
        <main className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                            Explore Our <span className="text-primary">Packages</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Find the perfect journey for your next adventure.
                        </p>
                    </div>

                    <SearchInput
                        defaultValue={search}
                        className="w-full md:w-96"
                    />
                </div>

                <Suspense fallback={<SectionSkeleton count={6} />}>
                    <ToursContent search={search} />
                </Suspense>

                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 rounded-[3rem] mt-20" />}>
                    <ContactCTA />
                </Suspense>
            </div>
        </main>
    );
}
