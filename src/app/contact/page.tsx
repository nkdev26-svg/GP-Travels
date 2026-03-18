import React, { Suspense } from "react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { CONTACT_INFO } from "@/lib/data";
import { getSiteSettings } from "@/lib/settings";

export const revalidate = 3600;

async function ContactContent() {
    const settings = await getSiteSettings();
    const phone = settings.phone || CONTACT_INFO.phone;
    const whatsapp = settings.whatsapp || CONTACT_INFO.whatsapp;
    const email = settings.email || CONTACT_INFO.email;
    const address = settings.address || CONTACT_INFO.address;
    const map = settings.googleMapsEmbed || CONTACT_INFO.googleMapsEmbed;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-1 space-y-8">
                <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-2xl shadow-primary/5 group">
                    <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">Contact Information</h3>
                    
                    <div className="space-y-8">
                        <a 
                            href={`tel:${phone}`} 
                            className="flex items-center gap-6 group/item"
                        >
                            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white group-hover/item:scale-110 transition-all duration-500">
                                <Phone className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Call Us</p>
                                <p className="font-black text-xl text-slate-800 tracking-tight">{phone}</p>
                            </div>
                        </a>

                        <a 
                            href={`https://wa.me/${whatsapp}`} 
                            target="_blank"
                            className="flex items-center gap-6 group/item"
                        >
                            <div className="w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-2xl flex items-center justify-center group-hover/item:bg-[#25D366] group-hover/item:text-white group-hover/item:scale-110 transition-all duration-500">
                                <MessageCircle className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">WhatsApp</p>
                                <p className="font-black text-xl text-slate-800 tracking-tight">Message Now</p>
                            </div>
                        </a>

                        <div className="flex items-center gap-6 group/item">
                            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center group-hover/item:bg-slate-900 group-hover/item:text-white group-hover/item:scale-110 transition-all duration-500">
                                <Mail className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Email Us</p>
                                <p className="font-black text-xl text-slate-800 tracking-tight">{email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group/item">
                            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center group-hover/item:bg-slate-900 group-hover/item:text-white group-hover/item:scale-110 transition-all duration-500">
                                <Clock className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Working Hours</p>
                                <p className="font-black text-xl text-slate-800 tracking-tight italic text-slate-500 font-medium">Mon - Sat: 9AM - 6PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-2xl shadow-primary/5">
                    <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-4 tracking-tight">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <MapPin className="text-primary w-6 h-6" />
                        </div>
                        Office Location
                    </h3>
                    <p className="text-slate-500 mb-8 leading-relaxed font-medium pl-2">
                        {address}
                    </p>
                    <div className="aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-slate-200 grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700 shadow-inner">
                        <iframe
                            src={map}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Contact Form & Trust Section */}
            <div className="lg:col-span-2 space-y-12">
                <ContactForm />
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Zap className="w-5 h-5 text-amber-500" />,
                            title: "Instant Response",
                            desc: "Our team typically responds within 2 hours.",
                            bg: "bg-amber-50/50"
                        },
                        {
                            icon: <Sparkles className="w-5 h-5 text-primary" />,
                            title: "Expert Guidance",
                            desc: "Get personalized tips from travel specialists.",
                            bg: "bg-primary/5"
                        },
                        {
                            icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
                            title: "Secure Data",
                            desc: "Your information is protected by industry standards.",
                            bg: "bg-emerald-50/50"
                        }
                    ].map((item, i) => (
                        <div key={i} className={`p-6 rounded-[2rem] border border-slate-100 bg-white/50 backdrop-blur-sm group hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5`}>
                            <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                {item.icon}
                            </div>
                            <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-wider">{item.title}</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        Get in <span className="text-primary">Touch</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        Have questions or ready to book your next adventure? <br className="hidden md:block" /> We're just a message or call away.
                    </p>
                </div>

                <Suspense fallback={<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-pulse"><div className="h-96 bg-slate-100 rounded-[3rem]" /><div className="lg:col-span-2 h-96 bg-slate-100 rounded-[3rem]" /></div>}>
                    <ContactContent />
                </Suspense>
            </div>
        </main>
    );
}
