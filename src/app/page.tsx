import AllSurahList from "@/components/ui/home/AllSurahList";
import Hero from "@/components/ui/home/Hero";
import logo from "@/assets/quran.png";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Al Quran | Home",
    description: "Your daily Quran companion – browse all 114 Surahs",
};

const page = () => {
    return (
        <div className="space-y-12">
            <Hero></Hero>
            <AllSurahList classes="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-5xl mx-auto px-4 xl:px-0"></AllSurahList>
            <footer className="border-t border-border flex flex-col items-center gap-4 py-20">
                <div className="space-y-1">
                    <div className="flex gap-2">
                        <Image src={logo} width={35} height={35} alt="logo" />
                        <p className="text-3xl font-bold uppercase">القرآن</p>
                    </div>
                    <p className="text-text-muted uppercase text-sm tracking-wider">quran mazid</p>
                </div>
                <p>Your daily Quran companion</p>
            </footer>
        </div>
    );
};

export default page;
