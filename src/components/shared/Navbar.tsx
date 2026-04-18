"use client";

import Image from "next/image";
import ThemeSwitcher from "./theme/ThemeSwitcher";
import logo from "@/assets/quran.png";
import home from "@/assets/home.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    const checkHome = pathname.includes("/surah");

    return (
        <div>
            <nav
                className={`flex justify-between items-center h-25 ${checkHome ? " border-b border-border px-4" : "max-w-5xl mx-auto px-4 xl:px-0"}`}
            >
                <div className="space-y-1">
                    <div className="flex gap-2">
                        <Image src={logo} width={35} height={35} alt="logo" />
                        <p className="text-3xl font-bold uppercase">القرآن</p>
                    </div>
                    <p className="text-text-muted uppercase text-sm tracking-wider">quran mazid</p>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeSwitcher />

                    {checkHome && (
                        <Link href="/">
                            <Image src={home} width={25} height={25} alt="home" className="hover:scale-110 transition duration-150" />
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
