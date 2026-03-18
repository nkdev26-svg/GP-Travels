"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function generate2FASecret() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const authenticator = require("authenticator");

    const formattedKey = authenticator.generateKey();

    const uri = authenticator.generateTotpUri(
        formattedKey,
        session.user.email,
        "GP-Tour Admin",
        "SHA1",
        6,
        30
    );

    return { secret: formattedKey, uri };
}

export async function enable2FA(secret: string, token: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const authenticator = require("authenticator");

    const isValid = authenticator.verifyToken(secret, token);

    if (!isValid) {
        throw new Error("Invalid authenticator code. Please enter the current 6-digit code shown in your app.");
    }

    // Use 'as any' to bypass stale Prisma type cache
    await prisma.user.update({
        where: { email: session.user.email },
        data: { twoFactorSecret: secret },
    });

    revalidatePath("/gp-portal-2026/security");
    return { success: true };
}

export async function disable2FA() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    // Use 'as any' to bypass stale Prisma type cache
    await prisma.user.update({
        where: { email: session.user.email },
        data: { twoFactorSecret: null },
    });

    revalidatePath("/gp-portal-2026/security");
    return { success: true };
}

export async function check2FAStatus(): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return false;

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { twoFactorSecret: true },
        });
        return !!user?.twoFactorSecret;
    } catch {
        return false;
    }
}

export async function generateBackupCodes() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    const backupCodes = Array.from({ length: 5 }, () => Math.random().toString(36).slice(-8));
    await prisma.user.update({
        where: { email: session.user.email },
        data: { backupCodes },
    });

    return backupCodes;
}
