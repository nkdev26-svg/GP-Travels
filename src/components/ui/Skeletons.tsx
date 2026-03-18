
import React from 'react';

export const TourCardSkeleton = () => (
    <div className="bg-slate-100 dark:bg-slate-900/50 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 animate-pulse">
        <div className="h-72 bg-slate-200 dark:bg-slate-800" />
        <div className="p-8">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mb-4" />
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-6" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6 mb-8" />
            <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-white/5">
                <div className="w-1/3 h-10 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            </div>
        </div>
    </div>
);

export const CarCardSkeleton = () => (
    <div className="bg-slate-900/40 rounded-[3rem] overflow-hidden border border-white/5 animate-pulse">
        <div className="h-64 bg-slate-800" />
        <div className="p-10">
            <div className="h-10 bg-slate-800 rounded w-2/3 mb-6" />
            <div className="h-4 bg-slate-800 rounded w-full mb-2" />
            <div className="h-4 bg-slate-800 rounded w-5/6 mb-10" />
            <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl">
                <div className="w-1/4 h-8 bg-slate-800 rounded" />
                <div className="w-12 h-12 bg-slate-800 rounded-2xl" />
            </div>
        </div>
    </div>
);

export const SectionSkeleton = ({ count = 3, gridCols = "grid-cols-1 md:grid-cols-3" }) => (
    <div className={`grid ${gridCols} gap-8`}>
        {[...Array(count)].map((_, i) => (
            <TourCardSkeleton key={i} />
        ))}
    </div>
);
