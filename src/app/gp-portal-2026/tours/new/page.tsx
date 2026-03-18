import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import TourForm from '@/components/sections/TourForm';

export default function NewTourPage() {
    return (
        <div className="space-y-10 pb-20">
            <div className="space-y-4">
                <Link
                    href="/gp-portal-2026/tours"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors mb-2"
                >
                    <ChevronLeft className="w-4 h-4" />
                    List Management
                </Link>
                <h1 className="text-5xl font-black text-white tracking-tighter">New Tour</h1>
                <p className="text-slate-400 max-w-2xl">Create a stunning travel package to showcase to your dream travelers.</p>
            </div>

            <TourForm />
        </div>
    );
}
