"use client";

import React from 'react';
import Image from 'next/image';
import { Car as CarIcon, IndianRupee, Phone, MessageCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Car } from '@prisma/client';
import { logContactClick } from '@/lib/actions';
import { CONTACT_INFO } from '@/lib/data';

interface CarCardProps {
    car: Car;
    settings?: Record<string, string>;
}

export const CarCard = ({ car, settings }: CarCardProps) => {
    const whatsapp = settings?.whatsapp || CONTACT_INFO.whatsapp;
    const phone = settings?.phone || CONTACT_INFO.phone;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-[#0f172a]/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500"
        >
            <div className="relative h-72 w-full overflow-hidden">
                <Image
                    src={car.image || "/placeholder-car.jpg"}
                    alt={car.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
                
                {car.hourlyPrice && (
                    <div className="absolute top-6 right-6">
                        <span className="bg-primary px-5 py-2 rounded-2xl text-xs font-black text-white shadow-xl shadow-primary/20 flex items-center gap-2">
                            <IndianRupee className="w-3.5 h-3.5" />
                            {car.hourlyPrice}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <CarIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors">
                        {car.name}
                    </h3>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex gap-3">
                        <div className="mt-1">
                            <Info className="w-4 h-4 text-slate-500" />
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                            {car.details}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                    <a
                        href={`https://wa.me/${whatsapp}?text=Hi, I'm interested in booking the ${car.name}.`}
                        onClick={() => logContactClick('whatsapp', `Car: ${car.name}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/10"
                    >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                    </a>
                    <a
                        href={`tel:${phone}`}
                        onClick={() => logContactClick('phone', `Car: ${car.name}`)}
                        className="p-4 bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black rounded-2xl transition-all"
                        title="Call for Booking"
                    >
                        <Phone className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};
