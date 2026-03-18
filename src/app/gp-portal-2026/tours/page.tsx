import React from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    ExternalLink,
    Star,
    MapPin
} from 'lucide-react';
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { deleteTour } from '@/lib/actions';
import { DeleteTourButton } from '@/components/ui/DeleteTourButton';
import { SearchInput } from '@/components/ui/SearchInput';

export default async function ManageToursPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search } = await searchParams;

    const tours = await prisma.tour.findMany({
        where: search ? {
            OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { destination: { contains: search, mode: 'insensitive' } },
            ],
        } : {},
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">Manage Tours</h1>
                    <p className="text-slate-400">View, edit, and manage all your travel packages.</p>
                </div>
                <Button href="/gp-portal-2026/tours/new" className="h-14 px-8 rounded-2xl gap-3 shadow-xl shadow-primary/20">
                    <Plus className="w-6 h-6" />
                    Add New Tour
                </Button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <SearchInput
                    defaultValue={search}
                    placeholder="Search tours, destinations..."
                    className="flex-1"
                />
                <button className="px-6 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-slate-400 hover:text-white flex items-center gap-2 transition-all">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                </button>
            </div>

            {/* Tours Table/Grid */}
            <div className="hidden lg:block bg-slate-900/50 border border-white/5 rounded-[2rem] backdrop-blur-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Tour Details</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Price</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Duration</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
                                <th className="p-6 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {tours.map((tour) => (
                                <tr key={tour.id} className="hover:bg-white/5 transition-all group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/10 group-hover:border-primary/50 transition-colors">
                                                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white flex items-center gap-2">
                                                    {tour.title}
                                                    {tour.featured && (
                                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                    )}
                                                </div>
                                                <div className="text-sm text-slate-500 font-medium">{tour.destination}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="font-bold text-secondary text-lg">{tour.price}</div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-sm text-slate-400 font-medium">{tour.duration}</div>
                                    </td>
                                    <td className="p-6">
                                        <span className={cn(
                                            "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border",
                                            tour.featured
                                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                                : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                                        )}>
                                            {tour.featured ? "Featured" : "Standard"}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/gp-portal-2026/tours/${tour.id}`}
                                                className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all"
                                                title="Edit"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </Link>
                                            <DeleteTourButton
                                                tourId={tour.id}
                                                tourTitle={tour.title}
                                            />
                                            <Link
                                                href={`/tours`}
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
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {tours.map((tour) => (
                    <div key={tour.id} className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/10">
                                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-white truncate">{tour.title}</h3>
                                <p className="text-slate-500 text-sm font-medium">{tour.destination}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-secondary font-black">{tour.price}</span>
                                    <span className="text-slate-600">•</span>
                                    <span className="text-slate-500 text-xs font-bold">{tour.duration}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className={cn(
                                "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border",
                                tour.featured
                                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                    : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                            )}>
                                {tour.featured ? "Featured" : "Standard"}
                            </span>
                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/gp-portal-2026/tours/${tour.id}`}
                                    className="p-3 rounded-2xl bg-white/5 text-slate-400 hover:text-primary transition-all pr-4"
                                >
                                    <Edit2 className="w-5 h-5" />
                                </Link>
                                <DeleteTourButton tourId={tour.id} tourTitle={tour.title} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {tours.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-10 h-10 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No tours found</h3>
                        <p className="text-slate-500 max-w-xs mx-auto mb-8">
                            Your tour catalog is empty. Start by creating your first travel package.
                        </p>
                        <Button href="/gp-portal-2026/tours/new" variant="outline" className="h-12 border-primary/20 text-primary">
                            Create First Tour
                        </Button>
                    </div>
                )}
        </div>
    );
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
