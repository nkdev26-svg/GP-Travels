"use client";

import { MapPin, Users, Heart, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Our Story</span>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1]">
                            Crafting Unforgettable <br />
                            <span className="text-primary">Memories</span> Since 2015
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            What started as a small passion project among three friends has grown into one of the most trusted local travel agencies. We believe that travel is not just about visiting new places, but about seeing the world with new eyes.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Our mission is to provide premium, personalized travel experiences that connect people with local cultures and nature in a meaningful and sustainable way.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop"
                                alt="Our Team in the field"
                                width={1974}
                                height={1000}
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-[2.5rem] hidden md:block max-w-xs shadow-2xl shadow-primary/10">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                                    <Users className="text-primary w-5 h-5" />
                                </div>
                                <span className="font-black text-slate-900">Friendly Experts</span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                Our guides are not just experts; they're your <span className="text-primary font-bold">friends</span> in the field.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision - 2026 Premium Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
                    {[
                        {
                            icon: <Heart className="w-10 h-10 text-rose-500" />,
                            title: "Passion for Travel",
                            description: "We live and breathe travel, and we want to share that passion with every explorer.",
                            gradient: "from-rose-500/10 to-transparent",
                            hoverBorder: "border-rose-500/30",
                            iconBg: "bg-rose-50 dark:bg-rose-500/10"
                        },
                        {
                            icon: <Star className="w-10 h-10 text-amber-500" />,
                            title: "Quality First",
                            description: "We never compromise on the quality of our tours, from vehicles to accommodations.",
                            gradient: "from-amber-500/10 to-transparent",
                            hoverBorder: "border-amber-500/30",
                            iconBg: "bg-amber-50 dark:bg-amber-500/10"
                        },
                        {
                            icon: <MapPin className="w-10 h-10 text-emerald-500" />,
                            title: "Local Excellence",
                            description: "We work directly with local communities to bring you the most authentic experiences.",
                            gradient: "from-emerald-500/10 to-transparent",
                            hoverBorder: "border-emerald-500/30",
                            iconBg: "bg-emerald-50 dark:bg-emerald-500/10"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            whileHover={{ y: -10 }}
                            className={`relative p-10 rounded-[3rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-2xl shadow-primary/5 overflow-hidden group transition-all duration-500`}
                        >
                            {/* Ambient Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                            
                            {/* Mirror Shine Effect */}
                            <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none" />

                            <div className="relative z-10">
                                <div className={`w-20 h-20 rounded-3xl ${item.iconBg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                    {item.description}
                                </p>
                            </div>

                            {/* Corner Accent */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.gradient} blur-3xl -translate-y-16 translate-x-16 group-hover:opacity-100 opacity-0 transition-opacity`} />
                        </motion.div>
                    ))}
                </div>

                {/* Gallery/Assets Section - 2026 Visible Style */}
                <div className="text-center mb-32 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/2 rounded-full blur-[120px] pointer-events-none" />
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black mb-16 tracking-tight relative z-10"
                    >
                        Our Fleet & <span className="text-primary">Journeys</span>
                    </motion.h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {[
                            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=2070&auto=format&fit=crop"
                        ].map((src, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5 group border border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900"
                            >
                                <Image 
                                    src={src} 
                                    alt="Gallery item" 
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    priority={i < 4}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-[2.5rem] transition-all duration-500 pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
