import React from 'react';
import CarForm from '@/components/forms/CarForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewCarPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4">
                <Link 
                    href="/gp-portal-2026/cars" 
                    className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Fleet
                </Link>
                <h1 className="text-4xl font-black text-white tracking-tight">Add New Vehicle</h1>
                <p className="text-slate-400">Add a new car to your travel fleet. Remember to provide clear specs and features.</p>
            </div>

            <CarForm />
        </div>
    );
}
