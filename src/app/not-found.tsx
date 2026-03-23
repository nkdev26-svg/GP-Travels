import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mb-8 rotate-12">
        <span className="text-4xl font-black text-primary -rotate-12">404</span>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-black mb-6">Lost in the wild?</h2>
      <p className="text-slate-400 text-lg max-w-lg mb-12">
        We couldn't find the destination you're looking for. It might have been moved, 
        or you might have taken a wrong turn. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-sm">
        <Link
          href="/"
          className="w-full flex items-center justify-center px-8 py-4 bg-primary text-white hover:bg-primary/90 rounded-2xl font-bold transition-all"
        >
          Return Home
        </Link>
        <Link
          href="/tours"
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all text-slate-300"
        >
          <Search className="w-5 h-5" />
          Browse Tours
        </Link>
      </div>
    </div>
  );
}
