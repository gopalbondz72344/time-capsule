"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import Image from "next/image";
import { navLinks } from "@/constants";

const Header = ({ session }: { session: any | null }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="mt-10 px-8 py-3  flex justify-between items-center gap-5">
            {/* Logo */}
            <Link href="/" className="flex">
                <Image src="/logo.png" alt="logo" width={200} height={50} priority />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-10">
                {session ? (
                    <Link href="/my-profile" className="text-white flex justify-center items-center gap-2">
                        <Avatar>
                            <AvatarFallback className="bg-blue-500 text-white font-bold">
                                {getInitials(session?.user?.name || "IN")}
                            </AvatarFallback>
                        </Avatar>
                        My Profile
                    </Link>
                ) : (
                    navLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={link.href}
                            className="text-white hover:bg-blue-600 font-medium text-lg px-6 py-2 rounded-xl transition-all duration-300 ease-in-out"
                        >
                            {link.name}
                        </Link>
                    ))
                )}
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden  focus:outline-none transition-all duration-300"
                onClick={() => setIsOpen(true)}
            >
                <Image width={30} height={30} src="/assets/menu.svg" alt="menu" loading="lazy"/>
            </button>

            {/* Sidebar Navigation (Mobile) */}
            <div
                className={`fixed top-0 left-0 w-[250px] h-full bg-gray-800 shadow-lg transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-white"
                    onClick={() => setIsOpen(false)}
                >
                    <Image width={30} height={30} src="/assets/x.svg" alt="x" loading="lazy"/>
                </button>

                {/* Sidebar Links */}
                <nav className="flex flex-col items-start mt-16 pl-6 space-y-4">
                    {session ? (
                        <>
                        <Link href="/my-profile" className="text-white flex justify-center items-center gap-2"  onClick={() => setIsOpen(false)}>
                            <Avatar>
                                <AvatarFallback className="bg-blue-500 text-white font-bold">
                                    {getInitials(session?.user?.name || "IN")}
                                </AvatarFallback>
                            </Avatar>
                            My Profile
                        </Link>
                        <h1 className="text-white font-bold">Hello {session?.user?.name}</h1>
                        </>
                    ) : (

                        navLinks.map((link) => (
                            <Link
                                key={link.id}
                                href={link.href}
                                className="text-white text-lg py-2 px-4 hover:bg-blue-600 rounded-lg w-full transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))
                    )}
                </nav>
            </div>

            {/* Overlay (Click to Close Sidebar) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </header>
    );
};

export default Header;
