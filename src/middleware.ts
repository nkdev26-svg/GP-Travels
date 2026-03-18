import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const url = req.nextUrl.pathname;

    // Block access to /gp-portal-2026 if not logged in or not an admin
    if (url.startsWith("/gp-portal-2026")) {
        if (!token || token.role !== "admin") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/gp-portal-2026/:path*"],
};
