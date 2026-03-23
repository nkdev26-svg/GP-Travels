import React from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    ExternalLink,
    Car as CarIcon,
    IndianRupee
} from 'lucide-react';
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { deleteCar } from '@/lib/actions';
import { DeleteCarButton } from '@/components/ui/DeleteCarButton';
import { SearchInput } from '@/components/ui/SearchInput';
import { cn } from '@/lib/utils';

export default async function ManageCarsPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search } = await searchParams;

    const cars = await prisma.car.findMany({
        where: search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { details: { contains: search, mode: 'insensitive' } },
            ],
        } : {},
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">Manage Fleet</h1>
                    <p className="text-slate-400">View, edit, and manage all your tour vehicles.</p>
                </div>
                <Button href="/gp-portal-2026/cars/new" className="h-14 px-8 rounded-2xl gap-3 shadow-xl shadow-primary/20">
                    <Plus className="w-6 h-6" />
                    Add New Vehicle
                </Button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <SearchInput
                    defaultValue={search}
                    placeholder="Search by vehicle name or details..."
                    className="flex-1"
                />
            </div>

            {/* Cars Table */}
            <div className="bg-slate-900/50 border border-white/5 rounded-[2rem] backdrop-blur-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Vehicle</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Hourly Price</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Details</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {cars.map((car) => (
                                <tr key={car.id} className="hover:bg-white/5 transition-all group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/10 group-hover:border-primary/50 transition-colors">
                                                <img 
                                                    src={car.image || '/placeholder-car.jpg'} 
                                                    alt={car.name} 
                                                    className="w-full h-full object-cover" 
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white mb-0.5">{car.name}</div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">ID: {car.id.slice(-8)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        {car.hourlyPrice ? (
                                            <div className="font-bold text-secondary text-lg flex items-center gap-1">
                                                <IndianRupee className="w-4 h-4" />
                                                {car.hourlyPrice}
                                            </div>
                                        ) : (
                                            <div className="text-sm text-slate-500 italic">No price set</div>
                                        )}
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm text-slate-400 font-medium line-clamp-1 max-w-xs">{car.details}</div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/gp-portal-2026/cars/${car.id}`}
                                                className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
                                                title="Edit Vehicle"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </Link>
                                            <DeleteCarButton
                                                carId={car.id}
                                                carName={car.name}
                                            />
                                            <Link
                                                href={`/cars`}
                                                target="_blank"
                                                className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all"
                                                title="View Live"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {cars.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <CarIcon className="w-10 h-10 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Fleet is empty</h3>
                        <p className="text-slate-500 max-w-xs mx-auto mb-8">
                            Start adding vehicles to show them on your website.
                        </p>
                        <Button href="/gp-portal-2026/cars/new" variant="outline" className="h-12 border-primary/20 text-primary">
                            Add First Vehicle
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
