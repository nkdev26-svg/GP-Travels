"use client";

import { usePathname } from "next/navigation";

export default function ClientLayout({
    children,
    navbar,
    footer
}: {
    children: React.ReactNode,
    navbar: React.ReactNode,
    footer: React.ReactNode
}) {
    const pathname = usePathname();

    // Hide Navbar, Footer, and FloatingButtons on admin and login pages
    const isAdminPage = pathname?.startsWith("/gp-portal-2026");
    const isLoginPage = pathname === "/login";
    const shouldHide = isAdminPage || isLoginPage;

    return (
        <>
            {!shouldHide && navbar}
            
            {children}
            
            {!shouldHide && footer}
        </>
    );
}
