import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TourForm from '@/components/sections/TourForm';
import { prisma } from '@/lib/db';

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const tour = await prisma.tour.findUnique({
        where: { id }
    });

    if (!tour) {
        notFound();
    }

    return (
        <div className="space-y-10 pb-20">
            <div className="space-y-4">
                <Link
                    href="/admin/tours"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors mb-2"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Collection
                </Link>
                <div className="flex items-center gap-4">
                    <h1 className="text-5xl font-black text-white tracking-tighter">Edit Tour</h1>
                    <span className="text-xs font-mono text-slate-700 mt-2 px-3 py-1 bg-slate-900 border border-white/5 rounded-full">ID: {id}</span>
                </div>
                <p className="text-slate-400 max-w-2xl">Update the details of "{tour.title}" destination package.</p>
            </div>

            <TourForm tour={tour} />
        </div>
    );
}
