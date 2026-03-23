import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    MapPin,
    Clock,
    Calendar,
    ChevronLeft,
    Phone,
    MessageCircle,
    CheckCircle2,
    Shield
} from 'lucide-react';
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { CONTACT_INFO } from '@/lib/data';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const tour = await prisma.tour.findUnique({
        where: { id },
    });

    if (!tour) {
        return {
            title: 'Tour Not Found',
        };
    }

    return {
        title: `${tour.title} | GP Travels`,
        description: tour.description.substring(0, 160),
        openGraph: {
            title: `${tour.title} | GP Travels`,
            description: tour.description.substring(0, 160),
            images: [tour.image],
        },
    };
}

export default async function TourDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const tour = await prisma.tour.findUnique({
        where: { id },
    });

    if (!tour) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#020617] text-white">
            <div className="max-w-7xl mx-auto">
                <Link
                    href="/tours"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-12 group"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to all tours
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Side: Images */}
                    <div className="space-y-8">
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                            <Image
                                src={tour.image}
                                alt={tour.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] grid grid-cols-2 gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-black uppercase tracking-widest">Duration</p>
                                    <p className="font-bold">{tour.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-black uppercase tracking-widest">Location</p>
                                    <p className="font-bold">{tour.destination}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content & Booking */}
                    <div className="space-y-12">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6 border border-primary/20">
                                {tour.featured ? '★ Featured Package' : 'Popular Choice'}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
                                {tour.title}
                            </h1>
                            <div className="text-4xl font-black text-secondary">
                                {tour.price}
                                <span className="text-lg text-slate-500 font-medium ml-2">/ per person</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold border-b border-white/5 pb-4">Overview</h3>
                            <p className="text-slate-400 text-lg leading-relaxed whitespace-pre-line">
                                {tour.description}
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { icon: CheckCircle2, text: "Verified Experience", color: "text-blue-400" },
                                { icon: Shield, text: "Secure Booking", color: "text-emerald-400" },
                            ].map((badge, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
                                    <badge.icon className={cn("w-5 h-5", badge.color)} />
                                    <span className="text-sm font-bold">{badge.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Booking CTA */}
                        <div className="bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/10 p-10 rounded-[3rem] space-y-8">
                            <h3 className="text-2xl font-bold">Ready to take off?</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button
                                    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=I am interested in the ${tour.title} package`}
                                    size="lg"
                                    className="bg-[#25D366] hover:bg-[#22c35e] text-white border-none py-6 rounded-2xl gap-3 text-lg"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    WhatsApp Us
                                </Button>
                                <Button
                                    href={`tel:${CONTACT_INFO.phone}`}
                                    variant="outline"
                                    size="lg"
                                    className="border-white/10 bg-white/5 hover:bg-white/10 py-6 rounded-2xl gap-3 text-lg"
                                >
                                    <Phone className="w-6 h-6" />
                                    Call Direct
                                </Button>
                            </div>
                            <p className="text-center text-xs text-slate-500 font-medium uppercase tracking-widest">
                                ⚡ Instant response during business hours
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
