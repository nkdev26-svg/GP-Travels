"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe2, HeadphonesIcon } from 'lucide-react';

const FEATURES = [
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "Safe & Secure",
        description: "Your safety is our top priority. We partner only with certified and trusted local operators."
    },
    {
        icon: <Globe2 className="w-8 h-8" />,
        title: "Expert Guides",
        description: "Our local experts bring stories to life, taking you beyond the usual tourist trails."
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: "Fast Booking",
        description: "Quick and easy booking process via phone or WhatsApp. No complex forms needed."
    },
    {
        icon: <HeadphonesIcon className="w-8 h-8" />,
        title: "24/7 Support",
        description: "We're here for you at any time, before, during, and after your incredible journey."
    }
];

export const WhyChooseUs = () => {
    return (
        <section className="py-24 px-6 bg-slate-950 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block"
                        >
                            The GP Tour Advantage
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black tracking-tight mb-8 leading-tight"
                        >
                            Why Hundreds of Travelers <br />
                            Trust Us Every Year
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-slate-400 text-lg mb-12 leading-relaxed max-w-lg"
                        >
                            We don't just sell tours; we create memories that last a lifetime. Our personalized approach ensures every trip is tailored to your dreams.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {FEATURES.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="space-y-4"
                                >
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-secondary border border-white/10">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-xl font-bold">{feature.title}</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="aspect-square relative rounded-[3rem] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2070&auto=format&fit=crop"
                                alt="Happy Travelers"
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        </div>

                        {/* Floating Card */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl max-w-xs hidden md:block"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                                    4.9
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900">Average Rating</h5>
                                    <p className="text-xs text-slate-600 uppercase font-bold">Google Reviews</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed italic">
                                "Outstanding service from start to finish. Best travel agency in town!"
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
