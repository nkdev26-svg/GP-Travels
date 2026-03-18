"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    MapPin,
    Settings,
    Home,
    PlusCircle,
    MessageSquare,
    Globe,
    Car,
    Star,
    Menu,
    X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoutButton } from '@/components/ui/LogoutButton';
import { useState } from 'react';

const ADMIN_LINKS = [
    { name: 'Dashboard', href: '/gp-portal-2026', icon: LayoutDashboard },
    { name: 'Manage Tours', href: '/gp-portal-2026/tours', icon: MapPin },
    { name: 'Manage Cars', href: '/gp-portal-2026/cars', icon: Car },
    { name: 'Customer Inquiries', href: '/gp-portal-2026/inquiries', icon: MessageSquare },
    { name: 'Testimonials', href: '/gp-portal-2026/testimonials', icon: Star },
    { name: 'Site Settings', href: '/gp-portal-2026/settings', icon: Globe },
    { name: 'Security (2FA)', href: '/gp-portal-2026/security', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 flex overflow-x-hidden">
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "w-72 border-r border-white/5 bg-slate-900/50 backdrop-blur-sm lg:backdrop-blur-xl flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0 gpu-boost",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            GP <span className="text-primary">Admin</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {ADMIN_LINKS.map((link) => {
                        const Icon = link.icon;
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    active
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "hover:bg-white/5 text-slate-400 hover:text-white"
                                )}
                            >
                                <Icon className={cn("w-5 h-5", active ? "text-white" : "text-slate-500 group-hover:text-primary")} />
                                <span className="font-medium text-sm">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all group"
                    >
                        <Home className="w-5 h-5 text-slate-500 group-hover:text-primary" />
                        <span className="font-medium text-sm">Back to Site</span>
                    </Link>
                    <LogoutButton variant="ghost" className="w-full justify-start px-4 py-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 min-h-screen w-full">
                {/* Top Header */}
                <header className="h-20 border-b border-white/5 bg-slate-900/30 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleSidebar}
                            className="p-2 hover:bg-white/5 rounded-lg lg:hidden text-slate-400"
                        >
                            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <div className="hidden sm:block">
                            <span className="text-slate-500 text-sm font-medium">Pages / </span>
                            <span className="text-white text-sm font-bold">
                            {(() => {
                                const segments = pathname.split('/').filter(Boolean);
                                const last = segments[segments.length - 1];
                                if (!last || last === 'gp-portal-2026') return 'Dashboard';
                                
                                // Handling Tours
                                if (segments.includes('tours')) {
                                    if (last === 'new') return 'Add New Tour';
                                    if (segments.length > 2 && last !== 'new') return 'Edit Tour';
                                    return 'Manage Tours';
                                }
                                
                                // Handling Cars
                                if (segments.includes('cars')) {
                                    if (last === 'new') return 'Add New Car';
                                    if (segments.length > 2 && last !== 'new') return 'Edit Car';
                                    return 'Manage Cars';
                                }

                                // Handling Specific Named Pages
                                const labels: Record<string, string> = {
                                    'inquiries': 'Customer Inquiries',
                                    'testimonials': 'Testimonials',
                                    'settings': 'Site Settings',
                                    'security': 'Security (2FA)',
                                };

                                if (labels[last]) return labels[last];
                                
                                // Generic Fallback
                                return last.charAt(0).toUpperCase() + last.slice(1);
                            })()}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                        <LogoutButton variant="glass" className="px-6 py-2 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all" />
                    </div>
                </header>

                <div className="p-8 md:p-12 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
