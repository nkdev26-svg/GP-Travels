"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, Users, MapPin, Globe, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CONTACT_INFO } from '@/lib/data';

interface HeroSectionProps {
    settings: Record<string, string>;
}

export const HeroSection = ({ settings }: HeroSectionProps) => {
    const title = settings.heroTitle || "Explore Amazing Destinations";
    const subtitle = settings.heroSubtitle || "Embark on unforgettable journeys with our curated tour packages. From serene mountain peaks to vibrant cityscapes, we bring the world to you.";
    const phone = settings.phone || CONTACT_INFO.phone;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 gpu-boost">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                    alt="Travel Background"
                    fill
                    className="object-cover scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-background" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center pt-16 md:pt-24 pb-12 md:pb-48 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-white mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-sm font-medium tracking-wide flex items-center gap-2">
                            <Plane className="w-4 h-4" />
                            DISCOVER YOUR NEXT ADVENTURE
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1]"
                    >
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-400">Amazing</span> <br />
                        Destinations
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-xl text-slate-200 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        Embark on unforgettable journeys with our curated tour packages. From serene mountain peaks to vibrant cityscapes, we bring the world to you.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 relative z-20"
                    >
                        <Button href="/tours" size="lg" className="w-full sm:w-auto px-10 group bg-white text-slate-900 border-none hover:bg-white/90">
                            View All Tours
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            href={`tel:${CONTACT_INFO.phone}`}
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto px-10 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                        >
                            Call Now
                        </Button>
                    </motion.div>
                </div>

                {/* Stats Grid - 2026 Premium Light Glass Style */}
                <div className="w-full pb-12 md:pb-0 md:absolute md:bottom-8 md:left-0 md:right-0 z-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 p-4">
                        {[
                            { label: "Happy Customers", value: "10k+", icon: <Users className="w-5 h-5 text-blue-400" />, glow: "bg-blue-400/30" },
                            { label: "Amazing Tours", value: "500+", icon: <MapPin className="w-5 h-5 text-emerald-400" />, glow: "bg-emerald-400/30" },
                            { label: "Countries", value: "30+", icon: <Globe className="w-5 h-5 text-purple-400" />, glow: "bg-purple-400/30" },
                            { label: "Trust Rating", value: "4.9/5", icon: <Star className="w-5 h-5 text-orange-400" />, glow: "bg-orange-400/30" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                transition={{ 
                                    opacity: { delay: 0.8 + i * 0.1 },
                                    y: { type: "spring", stiffness: 300, damping: 20 },
                                    scale: { duration: 0.2 }
                                }}
                                className="group relative gpu-boost"
                            >
                                {/* Glow Background */}
                                <div className={`absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.glow}`} />
                                
                                <div className="relative h-full backdrop-blur-sm md:backdrop-blur-3xl bg-white/10 border border-white/30 p-4 md:p-6 rounded-3xl flex flex-col items-center justify-center text-center overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                                    {/* Mirror Shine Effect */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                    <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-white/10 skew-x-[45deg] group-hover:translate-x-[400%] transition-transform duration-1000" />

                                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl md:text-4xl font-black text-white md:text-orange-500 mb-2 tracking-tight drop-shadow-md">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] md:text-xs text-slate-300 md:text-orange-400 font-black uppercase tracking-[0.2em] drop-shadow-sm">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
