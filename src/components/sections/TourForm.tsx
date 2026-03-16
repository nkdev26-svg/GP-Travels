"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Save,
    X,
    Image as ImageIcon,
    MapPin,
    Clock,
    DollarSign,
    CheckCircle2,
    Upload,
    Link as LinkIcon,
    AlertCircle
} from 'lucide-react';
import { Tour } from '@prisma/client';
import { createTour, updateTour } from '@/lib/actions';
import { Button } from '@/components/ui/Button';

interface TourFormProps {
    tour?: Tour;
}

export default function TourForm({ tour }: TourFormProps) {
    const isEditing = !!tour;
    const [loading, setLoading] = useState(false);
    const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file');
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const router = useRouter();

    const [previewUrl, setPreviewUrl] = useState(tour?.image || "");
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFilePreview(url);
            setPreviewUrl(url);
        }
    };

    // Cleanup object URL
    React.useEffect(() => {
        return () => {
            if (filePreview) {
                URL.revokeObjectURL(filePreview);
            }
        };
    }, [filePreview]);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setStatus(null);
        try {
            if (isEditing) {
                await updateTour(tour.id, formData);
                setStatus({ type: 'success', message: 'Tour updated successfully!' });
            } else {
                await createTour(formData);
                setStatus({ type: 'success', message: 'Tour created successfully!' });
            }
            // Optional: redirect or clear form after delay
            setTimeout(() => setStatus(null), 5000);
        } catch (error: any) {
            console.error(error);
            setStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span>Tour Information</span>
                        </h2>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Tour Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    defaultValue={tour?.title}
                                    placeholder="e.g. Exotic Paradise Getaway"
                                    className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Description</label>
                                <textarea
                                    name="description"
                                    rows={6}
                                    defaultValue={tour?.description}
                                    placeholder="Tell the story of this amazing destination..."
                                    className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Destination</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                        <input
                                            name="destination"
                                            type="text"
                                            defaultValue={tour?.destination}
                                            placeholder="e.g. Bali, Indonesia"
                                            className="w-full pl-12 pr-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Duration</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                        <input
                                            name="duration"
                                            type="text"
                                            defaultValue={tour?.duration}
                                            placeholder="e.g. 7 Days / 6 Nights"
                                            className="w-full pl-12 pr-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">
                        <h2 className="text-xl font-bold text-white mb-6">Price & Promotions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Price Range</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                    <input
                                        name="price"
                                        type="text"
                                        defaultValue={tour?.price}
                                        placeholder="e.g. ₹1,200 - ₹1,500"
                                        className="w-full pl-12 pr-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-end pb-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            name="featured"
                                            type="checkbox"
                                            defaultChecked={tour?.featured}
                                            className="sr-only peer"
                                        />
                                        <div className="w-12 h-6 bg-slate-800 rounded-full border border-white/10 peer-checked:bg-primary transition-all duration-300"></div>
                                        <div className="absolute top-1 left-1 w-4 h-4 bg-slate-400 rounded-full transition-all duration-300 peer-checked:left-7 peer-checked:bg-white"></div>
                                    </div>
                                    <span className="text-sm font-bold text-slate-400 uppercase group-hover:text-white transition-colors">Featured Package</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Media */}
                <div className="space-y-8">
                    <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl sticky top-8">
                        <h2 className="text-xl font-bold text-white mb-6">Tour Media</h2>

                        <div className="space-y-6">
                            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-dashed border-white/10 flex flex-col items-center justify-center group mb-4">
                                {previewUrl ? (
                                    <>
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white text-xs font-bold uppercase tracking-widest">
                                                {uploadMode === 'file' ? 'Click below to change file' : 'Update URL below'}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5">
                                            <ImageIcon className="w-6 h-6 text-slate-500" />
                                        </div>
                                        <p className="text-slate-500 text-xs font-medium">Image Preview</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex bg-slate-950/50 p-1 rounded-xl border border-white/5 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setUploadMode('file')}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all",
                                        uploadMode === 'file' ? "bg-primary text-white" : "text-slate-500 hover:text-slate-300"
                                    )}
                                >
                                    <Upload className="w-3 h-3" />
                                    Upload File
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUploadMode('url')}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all",
                                        uploadMode === 'url' ? "bg-primary text-white" : "text-slate-500 hover:text-slate-300"
                                    )}
                                >
                                    <LinkIcon className="w-3 h-3" />
                                    Image URL
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                                    {uploadMode === 'file' ? 'Choose Image' : 'Image URL'}
                                </label>

                                {uploadMode === 'file' ? (
                                    <div className="relative group">
                                        <input
                                            name="image-file"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-slate-400 text-xs outline-none group-hover:border-primary/50 transition-all flex items-center gap-3">
                                            <Upload className="w-4 h-4" />
                                            <span className="truncate">
                                                {filePreview ? 'File selected' : 'Click to select image...'}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <input
                                        name="image-url"
                                        type="text"
                                        value={previewUrl}
                                        onChange={(e) => setPreviewUrl(e.target.value)}
                                        placeholder="Paste Unsplash or direct image URL..."
                                        className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white text-xs outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                                    />
                                )}

                                <p className="text-[10px] text-slate-600 mt-2 px-1 leading-relaxed">
                                    {uploadMode === 'file'
                                        ? "Choose a high-quality JPG or PNG from your computer."
                                        : "Tip: Use high-quality URLs from sites like Unsplash."}
                                </p>
                            </div>
                        </div>
                        
                        {/* Status Messages */}
                        {status && (
                            <div className={cn(
                                "mt-6 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300",
                                status.type === 'success' ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500" : "bg-red-500/10 border border-red-500/20 text-red-500"
                            )}>
                                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                <p className="text-sm font-bold">{status.message}</p>
                            </div>
                        )}

                        <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                            <Button
                                type="submit"
                                className="w-full py-4 text-base font-black rounded-2xl tracking-wide gap-3"
                                disabled={loading}
                            >
                                <Save className="w-5 h-5" />
                                {loading ? "Saving..." : (isEditing ? "Update Tour" : "Create Tour")}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full py-4 text-sm font-bold border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 rounded-2xl tracking-wide gap-2"
                                onClick={() => router.back()}
                            >
                                <X className="w-4 h-4" />
                                Cancel Changes
                            </Button>
                        </div>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl backdrop-blur-xl">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <h4 className="text-emerald-500 font-bold text-sm">SEO Optimized</h4>
                                <p className="text-emerald-500/60 text-xs mt-1 leading-tight">
                                    Your tour title and description are automatically formatted for search engines.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
