import React from 'react';
import CarForm from '@/components/forms/CarForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function EditCarPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const car = await prisma.car.findUnique({
        where: { id }
    });

    if (!car) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4">
                <Link 
                    href="/admin/cars" 
                    className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Fleet
                </Link>
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-black text-white tracking-tight">Edit Vehicle</h1>
                    <span className="px-4 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest">
                        Editing Mode
                    </span>
                </div>
                <p className="text-slate-400">Update the details or images for <span className="text-white font-bold">{car.name}</span>.</p>
            </div>

            <CarForm car={car} />
        </div>
    );
}
