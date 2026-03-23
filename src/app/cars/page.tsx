
import React, { Suspense } from 'react';
import { Search, Car as CarIcon, Info } from 'lucide-react';
import { CarCard } from '@/components/ui/CarCard';
import { SearchInput } from '@/components/ui/SearchInput';
import { prisma } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { CONTACT_INFO } from '@/lib/data';
import { CarCardSkeleton } from '@/components/ui/Skeletons';

export const revalidate = 3600;

async function CarsContent({ search }: { search?: string }) {
    const [cars, settings] = await Promise.all([
        prisma.car.findMany({
            where: search ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { details: { contains: search, mode: 'insensitive' } },
                ],
            } : {},
            orderBy: { createdAt: 'desc' },
            take: 100
        }),
        getSiteSettings()
    ]);

    if (cars.length === 0) {
        return (
            <div className="py-32 text-center rounded-[3rem] border border-dashed border-white/5 bg-white/[0.02]">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CarIcon className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No vehicles found</h3>
                <p className="text-slate-500">Try adjusting your search filters or check back later.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cars.map((car) => (
                <CarCard key={car.id} car={car} settings={settings} />
            ))}
        </div>
    );
}

async function CarsCTA() {
    const settings = await getSiteSettings();
    return (
        <div className="mt-32 relative group overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] group-hover:bg-primary/30 transition-colors duration-700" />
            <div className="relative bg-slate-900/50 backdrop-blur-2xl border border-white/5 p-16 md:p-24 rounded-[4rem] flex flex-col items-center text-center">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                    Need a Custom <span className="text-primary italic">Transfer?</span>
                </h2>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                    Whether it's an airport transfer, a corporate event, or a wedding, our fleet is at your service. Contact our logistics team now.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                    <a 
                        href={`https://wa.me/${settings.whatsapp || CONTACT_INFO.whatsapp}`}
                        className="px-10 py-5 bg-white text-black hover:bg-primary hover:text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300"
                    >
                        Get Instant Quote
                    </a>
                    <a 
                        href={`tel:${settings.phone || CONTACT_INFO.phone}`}
                        className="px-10 py-5 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300"
                    >
                        Call Concierge
                    </a>
                </div>
            </div>
        </div>
    );
}

export default async function CarsPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search } = await searchParams;

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 bg-[#020617]">
            <div className="max-w-7xl mx-auto">
                <div className="relative mb-20">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-end justify-between gap-12 relative z-10">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                <CarIcon className="w-3.5 h-3.5" />
                                Premium Fleet
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                                Travel in <br />
                                <span className="text-primary italic">Ultimate</span> Comfort
                            </h1>
                            <p className="text-slate-400 text-xl md:text-2xl leading-relaxed">
                                Choose from our premium selection of vehicles for your tours and transfers. All vehicles are maintained to the highest standards.
                            </p>
                        </div>

                        <div className="w-full md:w-auto">
                            <SearchInput
                                defaultValue={search}
                                placeholder="Search by car or spec..."
                                className="w-full md:w-96"
                            />
                        </div>
                    </div>
                </div>

                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[...Array(3)].map((_, i) => <CarCardSkeleton key={i} />)}
                    </div>
                }>
                    <CarsContent search={search} />
                </Suspense>

                <Suspense fallback={<div className="h-96 animate-pulse bg-white/5 rounded-[4rem] mt-32" />}>
                    <CarsCTA />
                </Suspense>
            </div>
        </main>
    );
}
