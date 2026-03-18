
import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/data';
import { getSiteSettings } from '@/lib/settings';

export const Footer = async () => {
    // Independent fetch for footer settings
    const settings = await getSiteSettings();
    
    const contact = {
        address: settings.address || CONTACT_INFO.address,
        phone: settings.phone || CONTACT_INFO.phone,
        email: settings.email || CONTACT_INFO.email
    };

    return (
        <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            GP <span className="text-primary">Tour</span>
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed mb-6">
                        Connecting you to the most beautiful destinations around the world. Your trusted travel partner since 2015.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                    <ul className="flex flex-col gap-4 text-sm">
                        <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><Link href="/tours" className="hover:text-primary transition-colors">Featured Tours</Link></li>
                        <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-6">Destinations</h4>
                    <ul className="flex flex-col gap-4 text-sm">
                        <li><Link href="/tours" className="hover:text-primary transition-colors">Swiss Alps</Link></li>
                        <li><Link href="/tours" className="hover:text-primary transition-colors">Bali Islands</Link></li>
                        <li><Link href="/tours" className="hover:text-primary transition-colors">Serengeti Safari</Link></li>
                        <li><Link href="/tours" className="hover:text-primary transition-colors">Rome & Tokyo</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-6">Contact Us</h4>
                    <ul className="flex flex-col gap-4 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary shrink-0" />
                            <span>{contact.address}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-primary shrink-0" />
                            <a href={`tel:${contact.phone}`} className="hover:text-primary">{contact.phone}</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-primary shrink-0" />
                            <a href={`mailto:${contact.email}`} className="hover:text-primary">{contact.email}</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <p>© 2026 GP Tour Agency. All rights reserved.</p>
                <div className="flex gap-6 items-center">
                    <Link href="/login" className="text-slate-600 hover:text-primary transition-colors">Admin Login</Link>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};
