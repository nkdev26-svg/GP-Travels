
import React from 'react';
import { getSiteSettings } from '@/lib/settings';
import { NavbarClient } from './NavbarClient';

export const Navbar = async () => {
    // This is now an independent fetch
    const settings = await getSiteSettings();
    return <NavbarClient settings={settings} />;
};
