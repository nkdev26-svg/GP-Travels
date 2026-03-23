"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Save,
    X,
    Image as ImageIcon,
    Info,
    Clock,
    IndianRupee,
    CheckCircle2,
    Upload,
    Link as LinkIcon,
    Car
} from 'lucide-react';
import { Car as CarType } from '@prisma/client';
import { createCar, updateCar } from '@/lib/actions';
import { Button } from '@/components/ui/Button';

interface CarFormProps {
    car?: CarType;
}

export default function CarForm({ car }: CarFormProps) {
    const isEditing = !!car;
    const [loading, setLoading] = useState(false);
    const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file');
    const router = useRouter();

    const [previewUrl, setPreviewUrl] = useState(car?.image || "");
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFilePreview(url);
            setPreviewUrl(url);
        }
    };

    React.useEffect(() => {
        return () => {
            if (filePreview) {
                URL.revokeObjectURL(filePreview);
            }
        };
    }, [filePreview]);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            if (isEditing) {
                await updateCar(car.id, formData);
            } else {
                await createCar(formData);
            }
        } catch (error) {
            console.error(error);
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
                            <Car className="w-5 h-5 text-primary" />
                            <span>Vehicle Information</span>
                        </h2>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Car Name / Model</label>
                                <input
                                    name="name"
                                    type="text"
                                    defaultValue={car?.name}
                                    placeholder="e.g. Toyota Land Cruiser"
                                    className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Car Details (Specs, Capacity, etc.)</label>
                                <textarea
                                    name="details"
                                    rows={6}
                                    defaultValue={car?.details}
                                    placeholder="Describe the vehicle, its features, seating capacity..."
                                    className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Hourly Price (Optional)</label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                    <input
                                        name="hourly-price"
                                        type="text"
                                        defaultValue={car?.hourlyPrice || ''}
                                        placeholder="e.g. ₹500/hr (Leave empty if price varies)"
                                        className="w-full pl-12 pr-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <p className="text-[10px] text-slate-500 mt-1">Leave this empty if you want to provide personalized quotes.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Media */}
                <div className="space-y-8">
                    <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl sticky top-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-primary" />
                            <span>Vehicle Media</span>
                        </h2>

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
                                        placeholder="Paste image URL..."
                                        className="w-full px-5 py-4 bg-slate-950/50 border border-white/10 rounded-2xl text-white text-xs outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                            <Button
                                type="submit"
                                className="w-full py-4 text-base font-black rounded-2xl tracking-wide gap-3"
                                disabled={loading}
                            >
                                <Save className="w-5 h-5" />
                                {loading ? "Saving..." : (isEditing ? "Update Vehicle" : "Add Vehicle")}
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
                </div>
            </div>
        </form>
    );
}
