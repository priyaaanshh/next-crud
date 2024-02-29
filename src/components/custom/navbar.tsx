"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import ToggleTheme from './toggleTheme';

const Navbar = () => {

    const router = useRouter();
    return (
        <div className="fixed top-0 flex justify-between items-center w-full px-8 py-4 mb-2 border-b shadow">
            <Button variant="ghost" onClick={() => router.push("/")}>Home</Button>
            <div className="flex items-center gap-5">
                <ToggleTheme/>
                <Button variant="ghost" onClick={() => router.push("/signup")}>Signup</Button>
                <Button variant="ghost" onClick={() => router.push("/login")}>Login</Button>
            </div>
        </div>
    )
}

export default Navbar
