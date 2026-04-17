import type { Metadata } from "next";
import { Montserrat, Outfit } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
    title: "Sakib",
    description: "Personal portfolio of Sakib Akondo",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${outfit.variable} ${montserrat.variable} h-full antialiased`}>
            <body className="min-h-full">
                <div className="pb-20">{children}</div>
            </body>
        </html>
    );
}
