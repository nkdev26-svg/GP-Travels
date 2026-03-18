import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PlusCircle, Trash2, Star, User, ChevronLeft, ChevronRight } from "lucide-react";
import { deleteTestimonial } from "@/lib/actions";

export default async function TestimonialsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page: pageStr } = await searchParams;
    const page = parseInt(pageStr || '1');
    const take = 4;
    const skip = (page - 1) * take;

    const [testimonials, total] = await Promise.all([
        prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' },
            skip,
            take
        }),
        prisma.testimonial.count()
    ]);

    const totalPages = Math.ceil(total / take);

    return (
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-white mb-2">Customer Testimonials</h2>
                    <p className="text-slate-400">Manage real customer reviews shown on the home page.</p>
                </div>
                <Button href="/gp-portal-2026/testimonials/new" className="gap-2">
                    <PlusCircle className="w-5 h-5" />
                    Add Testimonial
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((t) => (
                    <div key={t.id} className="glass p-8 rounded-[2rem] relative group border border-white/5 hover:border-primary/50 transition-all flex flex-col">
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                {t.image ? (
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                                        <User className="w-6 h-6" />
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold text-white tracking-tight">{t.name}</h4>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{t.role}</p>
                                </div>
                            </div>
                            <div className="flex gap-1 text-secondary">
                                {[...Array(t.rating || 5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-secondary" />
                                ))}
                            </div>
                        </div>

                        <p className="text-slate-400 italic mb-8 leading-relaxed flex-grow">"{t.content}"</p>

                        <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                            <form action={async () => {
                                "use server";
                                await deleteTestimonial(t.id);
                            }}>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    size="sm"
                                    className="text-red-400 border-red-500/20 hover:bg-red-500/10 hover:border-red-500 transition-all gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </Button>
                            </form>
                        </div>
                    </div>
                ))}

                {testimonials.length === 0 && (
                    <div className="col-span-full py-20 text-center glass rounded-[2.5rem]">
                        <p className="text-slate-500 font-medium">No testimonials found. Add your first one above!</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-6 pt-12">
                    <Button
                        href={`/gp-portal-2026/testimonials?page=${page - 1}`}
                        variant="outline"
                        disabled={page <= 1}
                        className="rounded-full w-12 h-12 p-0 border-white/10"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Button>

                    <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <Link
                                key={i}
                                href={`/gp-portal-2026/testimonials?page=${i + 1}`}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${page === i + 1
                                        ? 'bg-primary text-white'
                                        : 'text-slate-400 hover:bg-white/5'
                                    }`}
                            >
                                {i + 1}
                            </Link>
                        ))}
                    </div>

                    <Button
                        href={`/gp-portal-2026/testimonials?page=${page + 1}`}
                        variant="outline"
                        disabled={page >= totalPages}
                        className="rounded-full w-12 h-12 p-0 border-white/10"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </Button>
                </div>
            )}
        </div>
    );
}
