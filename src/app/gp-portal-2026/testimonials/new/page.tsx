"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { createTestimonial } from '@/lib/actions';
import { User, Quote, Star, ImageIcon, Send, AlertCircle, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function NewTestimonialPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [rating, setRating] = useState(5);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setError(null);
        
        // Ensure rating is passed correctly
        formData.set("rating", rating.toString());
        
        try {
            console.log("Submitting testimonial...");
            const result = await createTestimonial(formData);
            
            if (result.success) {
                setSuccess(true);
                // We use router.refresh first to clear cache
                router.refresh(); 
                setTimeout(() => {
                    router.push("/gp-portal-2026/testimonials");
                }, 1000);
            } else {
                setError(result.error || "An error occurred while saving.");
            }
        } catch (err: any) {
            console.error("Testimonial creation client-side error:", err);
            setError("The server could not process your request. Please ensure you are logged in and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <Link 
                href="/gp-portal-2026/testimonials" 
                className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium mb-4"
            >
                <ChevronLeft className="w-4 h-4" />
                Back to Testimonials
            </Link>

            <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black tracking-tight text-white">Create Testimonial</h2>
                <p className="text-slate-500">Add a review that will appear on your homepage.</p>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in duration-300">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in duration-300">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Testimonial added! Redirecting to list...</p>
                </div>
            )}

            <form action={handleSubmit} className="glass dark:bg-slate-900/40 p-10 rounded-[2.5rem] border-white/5 shadow-2xl space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left side: Text Inputs */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Customer Name *</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                                <input
                                    name="name"
                                    required
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 outline-none focus:border-primary/50 transition-all font-medium"
                                    placeholder="e.g. John Smith"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Role / Subtitle</label>
                            <div className="relative group">
                                <Quote className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                                <input
                                    name="role"
                                    className="w-full bg-slate-950/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 outline-none focus:border-primary/50 transition-all font-medium"
                                    placeholder="e.g. Verified Customer"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Rating</label>
                            <div className="flex items-center gap-2 bg-slate-950/50 p-3 rounded-2xl w-fit border border-white/5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setRating(s)}
                                        className="p-1 hover:scale-110 transition-transform"
                                    >
                                        <Star 
                                            className={cn(
                                                "w-7 h-7 transition-colors",
                                                s <= rating ? "fill-amber-400 text-amber-400" : "text-slate-700"
                                            )} 
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right side: Image Upload */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Profile Picture (Optional)</label>
                        <div className="relative group aspect-square rounded-[2rem] overflow-hidden bg-slate-950/50 border border-dashed border-white/10 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center">
                            {preview ? (
                                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <>
                                    <ImageIcon className="w-10 h-10 text-slate-700 mb-2 group-hover:text-primary/50 transition-colors" />
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Select Image</span>
                                </>
                            )}
                            <input
                                type="file"
                                name="image-file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Review Content *</label>
                    <textarea
                        name="content"
                        required
                        rows={5}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-[2rem] p-6 text-white placeholder:text-slate-700 outline-none focus:border-primary/50 transition-all font-medium resize-none"
                        placeholder="Type the full testimonial here..."
                    />
                </div>

                <div className="flex justify-end gap-3 items-center pt-4">
                    <Link href="/gp-portal-2026/testimonials" className="px-6 text-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
                        Cancel
                    </Link>
                    <Button 
                        type="submit" 
                        disabled={loading || success} 
                        size="lg"
                        className="gap-3 px-12 group"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        )}
                        {loading ? "Saving..." : success ? "Published!" : "Publish Now"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
