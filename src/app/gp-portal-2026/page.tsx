import React from 'react';
import Link from 'next/link';
import {
    Plus,
    MapPin,
    TrendingUp,
    Users,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import { LogoutButton } from '@/components/ui/LogoutButton';
import { cn } from '@/lib/utils';

export default async function AdminDashboard() {
    const tourCount = await prisma.tour.count();
    const featuredCount = await prisma.tour.count({ where: { featured: true } });
    const inquiryCount = await prisma.inquiry.count();

    const recentTours = await prisma.tour.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' }
    });

    const recentInquiries = await prisma.inquiry.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">Dashboard</h1>
                    <p className="text-slate-400">Welcome back, manager. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button href="/gp-portal-2026/tours/new" className="h-14 px-8 rounded-2xl gap-3 shadow-xl shadow-primary/20">
                        <Plus className="w-6 h-6" />
                        Create New Tour
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Tours", value: tourCount, icon: MapPin, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Featured Packs", value: featuredCount, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "Total Inquiries", value: inquiryCount, icon: Calendar, color: "text-orange-500", bg: "bg-orange-500/10" },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl group hover:border-primary/20 transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", stat.bg)}>
                                    <Icon className={cn("w-7 h-7", stat.color)} />
                                </div>
                                <div className="text-slate-500 hover:text-primary transition-colors cursor-pointer">
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-slate-500 font-medium uppercase tracking-wider text-xs">{stat.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity Grids */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Tours */}
                <div className="bg-slate-900/50 border border-white/5 rounded-[2rem] backdrop-blur-xl overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Recently Added Tours</h2>
                        <Link href="/gp-portal-2026/tours" className="text-primary text-sm font-semibold hover:underline">View All</Link>
                    </div>
                    <div className="divide-y divide-white/5 flex-grow">
                        {recentTours.length > 0 ? recentTours.map((tour) => (
                            <div key={tour.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 flex-shrink-0 border border-white/10">
                                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{tour.title}</h3>
                                        <p className="text-sm text-slate-500">{tour.destination} • {tour.duration}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-secondary">{tour.price}</div>
                                    <Link
                                        href={`/gp-portal-2026/tours/${tour.id}`}
                                        className="text-xs text-primary font-bold hover:underline"
                                    >
                                        Edit Details
                                    </Link>
                                </div>
                            </div>
                        )) : (
                            <div className="p-12 text-center text-slate-500">
                                No tours added yet. Click the button above to start.
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Inquiries */}
                <div className="bg-slate-900/50 border border-white/5 rounded-[2rem] backdrop-blur-xl overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Recent Inquiries</h2>
                        <Link href="/gp-portal-2026/inquiries" className="text-primary text-sm font-semibold hover:underline">View All</Link>
                    </div>
                    <div className="divide-y divide-white/5 flex-grow">
                        {recentInquiries.length > 0 ? recentInquiries.map((inq: any) => (
                            <div key={inq.id} className="p-6 flex flex-col hover:bg-white/5 transition-colors gap-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{inq.name}</h3>
                                        <p className="text-sm text-primary font-bold">{inq.phone}</p>
                                    </div>
                                    <span className={cn(
                                        "text-xs px-2 py-1 rounded-full font-bold uppercase tracking-widest border",
                                        inq.status === 'new' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                            inq.status === 'clicked' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                                                "bg-slate-500/10 text-slate-400 border-white/10"
                                    )}>
                                        {inq.status || 'New'}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-white/10 pl-3">
                                    {inq.message}
                                </p>
                                <div className="text-xs text-slate-500 mt-2 text-right">
                                    {new Date(inq.createdAt).toLocaleDateString()} at {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        )) : (
                            <div className="p-12 text-center text-slate-500">
                                No inquiries yet. They will appear here when users submit forms or click links.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
