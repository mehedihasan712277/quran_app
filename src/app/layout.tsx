import type { Metadata } from "next";
import { Montserrat, Noto_Kufi_Arabic, Noto_Naskh_Arabic, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme/ThemeProvider";
import Navbar from "@/components/shared/Navbar";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    style: ["normal"],
    variable: "--font-outfit",
    display: "swap",
});
const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-montserrat",
    display: "swap",
});

// arabic -------------------------------------------
const notoKufi = Noto_Kufi_Arabic({
    subsets: ["arabic"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-noto-kufi",
    display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
    subsets: ["arabic"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-noto-naskh",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Al Quran",
    description: "This ia an online Quran app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`
            ${outfit.variable}
            ${montserrat.variable} 
            ${notoKufi.variable}
            ${notoNaskh.variable}
            h-full antialiased`}
        >
            <body className="min-h-full">
                <ThemeProvider>
                    <Navbar></Navbar>
                    <div className="pb-20">{children}</div>
                </ThemeProvider>
                <div className="pb-20">{children}</div>
            </body>
        </html>
    );
}
