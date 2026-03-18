"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '@prisma/client';

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    useEffect(() => {
        if (testimonials.length <= 1) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide, testimonials.length]);

    if (!testimonials || testimonials.length === 0) return null;

    const current = testimonials[currentIndex];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section className="py-24 px-6 bg-white dark:bg-slate-950 overflow-hidden relative gpu-boost">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block"
                    >
                        What Our Travelers Say
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white"
                    >
                        Customer Stories
                    </motion.h2>
                </div>

                <div className="relative max-w-4xl mx-auto h-[450px] md:h-[400px]">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute w-full h-full gpu-boost"
                        >
                            <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm md:backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-10 md:p-14 rounded-[3rem] relative h-full flex flex-col justify-center shadow-2xl shadow-primary/5 transition-all duration-500">
                                <Quote className="absolute top-10 right-10 w-16 h-16 text-primary/10" />
                                <div className="flex gap-1 mb-8">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < (current.rating || 5) ? 'fill-orange-400 text-orange-400' : 'text-slate-200 dark:text-slate-700'}`} />
                                    ))}
                                </div>
                                <p className="text-xl md:text-2xl font-medium leading-[1.6] mb-10 italic text-slate-800 dark:text-slate-200">
                                    "{current.content}"
                                </p>
                                <div className="flex items-center gap-5 mt-auto">
                                    {current.image ? (
                                        <div className="w-16 h-16 relative rounded-2xl overflow-hidden shadow-xl bg-slate-100 dark:bg-slate-800">
                                            <Image
                                                src={current.image}
                                                alt={current.name}
                                                fill
                                                className="object-cover"
                                                sizes="64px"
                                                onError={(e) => {
                                                    // Fallback for broken images (e.g. old local /uploads/)
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    const parent = target.parentElement;
                                                    if (parent) {
                                                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>';
                                                    }
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shadow-xl">
                                            <Star className="w-8 h-8 opacity-20" />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-bold text-xl text-slate-900 dark:text-white">{current.name}</h4>
                                        <p className="text-primary text-sm font-bold uppercase tracking-wider">{current.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 z-10">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-white transition-all group shadow-lg"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setDirection(i > currentIndex ? 1 : -1);
                                        setCurrentIndex(i);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-white transition-all group shadow-lg"
                        >
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
