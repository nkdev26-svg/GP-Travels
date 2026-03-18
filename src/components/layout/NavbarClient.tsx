
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MapPin, LogOut, LayoutDashboard } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { CONTACT_INFO } from '@/lib/data';

const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Fleet', href: '/cars' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export const NavbarClient = ({ settings }: { settings: Record<string, string> }) => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const phone = settings.phone || CONTACT_INFO.phone;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 gpu-boost",
                (scrolled || isOpen || pathname !== "/") 
                    ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-white/5 py-3 shadow-md text-slate-900 dark:text-white" 
                    : "bg-transparent text-white"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative z-[110]">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">
                        GP <span className="text-primary">Tour</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Admin Specific Controls */}
                    {session && (
                        <>
                            <div className="h-6 w-px bg-border/20 mx-2" />
                            <div className="flex items-center gap-6">
                                <Link
                                    href="/admin"
                                    className="text-sm font-bold text-primary flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Admin
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="text-sm font-medium text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </>
                    )}

                    <Button href={`tel:${phone}`} size="sm" className="gap-2">
                        <Phone className="w-4 h-4" />
                        Book Now
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "md:hidden p-2 transition-colors relative z-[110]",
                        (scrolled || isOpen || pathname !== "/") ? "text-slate-900 dark:text-white" : "text-white"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-2xl z-[100] md:hidden transition-all duration-500 ease-in-out px-4 pt-20 flex flex-col items-center gpu-boost",
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                )}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative w-full max-w-sm flex flex-col gap-5 text-center">
                    <div className="grid grid-cols-2 gap-3 mb-2">
                        {NAV_LINKS.map((link, i) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                style={{ transitionDelay: `${i * 30}ms` }}
                                className={cn(
                                    "flex items-center justify-center h-14 rounded-2xl border transition-all duration-300 font-bold text-xs tracking-widest uppercase",
                                    pathname === link.href 
                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]" 
                                        : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {session && (
                        <div className="flex flex-col gap-3 py-4 border-y border-slate-200/50 dark:border-white/5">
                            <Link
                                href="/admin"
                                className="h-14 flex items-center justify-center gap-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-[0.2em] transition-all hover:bg-primary/20"
                                onClick={() => setIsOpen(false)}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Admin Panel
                            </Link>
                            <button
                                onClick={() => {
                                    signOut({ callbackUrl: '/' });
                                    setIsOpen(false);
                                }}
                                className="h-12 flex items-center justify-center gap-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-xs uppercase tracking-[0.2em]"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    )}

                    <div className="mt-2">
                        <Button href={`tel:${phone}`} size="lg" className="w-full h-16 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/10">
                            <Phone className="w-4 h-4 mr-2" />
                            Direct Call
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
