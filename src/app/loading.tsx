
import React from 'react';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 dark:bg-[#020617]">
            <div className="relative">
                {/* Outer glowing ring */}
                <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-primary/20 animate-pulse" />
                
                {/* Inner spinning ring */}
                <div className="w-24 h-24 rounded-full border-t-4 border-primary animate-spin" />
                
                {/* Center logo/dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full animate-bounce shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                </div>
            </div>
            
            <div className="absolute bottom-12 text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] animate-pulse">
                    GP Tour & Travels
                </span>
            </div>
        </div>
    );
}
