import React from 'react';
import { prisma } from '@/lib/db';
import { cn } from '@/lib/utils';
import { MessageSquare, Phone, Calendar, Clock, Trash2 } from 'lucide-react';
import { deleteInquiry } from '@/lib/actions';

export default async function InquiriesPage() {
    // Fetch all inquiries from the database, newest first
    const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">Customer Inquiries</h1>
                    <p className="text-slate-400 text-lg">Detailed list of all customer messages and link clicks.</p>
                </div>
                <div className="bg-slate-900/50 px-6 py-4 rounded-2xl border border-white/5 backdrop-blur-xl">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs block mb-1">Total Records</span>
                    <span className="text-2xl font-black text-white">{inquiries.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {inquiries.length > 0 ? inquiries.map((inq: any) => (
                    <div 
                        key={inq.id} 
                        className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] backdrop-blur-xl p-8 hover:border-primary/20 transition-all duration-300 group relative overflow-hidden"
                    >
                        {/* 2026 Style Decorative background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 blur-[60px] pointer-events-none" />

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 border border-white/10 shadow-xl">
                                    <MessageSquare className="w-8 h-8" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-black text-white">{inq.name}</h3>
                                        <span className={cn(
                                            "text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border",
                                            inq.status === 'new' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                inq.status === 'clicked' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                                                    "bg-slate-500/10 text-slate-400 border-white/10"
                                        )}>
                                            {inq.status || 'New'}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-6 text-sm font-bold">
                                        <a href={`tel:${inq.phone}`} className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            {inq.phone}
                                        </a>
                                        <div className="text-slate-500 flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(inq.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="text-slate-500 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delete Action */}
                            <form action={async (formData) => {
                                'use server';
                                const id = formData.get('id') as string;
                                await deleteInquiry(id);
                            }} className="relative z-20">
                                <input type="hidden" name="id" value={inq.id} />
                                <button 
                                    type="submit"
                                    className="p-4 rounded-2xl bg-red-500/5 text-red-500 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white border border-red-500/10 focus:opacity-100"
                                    title="Delete Enquiry"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </form>
                        </div>

                        <div className="mt-8 relative z-10">
                            <div className="bg-white/5 rounded-3xl p-8 border border-white/5 group-hover:bg-white/[0.07] transition-colors">
                                <p className="text-slate-300 leading-relaxed text-lg font-medium">
                                    {inq.message}
                                </p>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-20 text-center backdrop-blur-xl">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                            <MessageSquare className="w-10 h-10 text-slate-600" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">No Inquiries Found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto font-medium">
                            When users submit the contact form or click your links, their queries will automatically appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
