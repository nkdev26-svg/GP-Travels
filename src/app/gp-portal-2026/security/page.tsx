import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/db";
import { TwoFactorSetup } from "./TwoFactorSetup";
import { generate2FASecret } from "./actions";
import { Shield } from "lucide-react";

export default async function SecurityPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return null; // Handled by middleware
    }

    let is2FAEnabled = false;
    let initialSecret = null;
    let rawSecret = null;

    try {
        const user = await (prisma as any).user.findUnique({
            where: { email: session.user.email },
            select: { twoFactorSecret: true },
        });

        if (user) {
            is2FAEnabled = !!user.twoFactorSecret;
        }

        // Only generate a new secret if 2FA is NOT already enabled
        if (!is2FAEnabled) {
            const generated = await generate2FASecret();
            initialSecret = generated.uri;
            rawSecret = generated.secret;
        }
    } catch (err) {
        console.error("[SecurityPage] Error loading user:", err);
    }

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-white">Security Settings</h2>
                </div>
                <p className="text-slate-400 ml-13">Manage your account security and authentication methods.</p>
            </div>

            <TwoFactorSetup
                is2FAEnabled={is2FAEnabled}
                initialUri={initialSecret}
                rawSecret={rawSecret}
            />
        </div>
    );
}
