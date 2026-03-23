'use client';
 
import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);
 
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-slate-400 max-w-md mb-8">
        We're sorry, but an unexpected error occurred while processing your request. 
        Our team has been notified.
      </p>
      <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white hover:bg-primary/90 rounded-xl font-bold transition-colors"
          >
            Return Home
          </Link>
      </div>
    </div>
  );
}
