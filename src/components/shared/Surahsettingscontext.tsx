"use client";

import { createContext, useContext, useState } from "react";

export type FontFamily = "naskh" | "kufi";

interface SurahSettingsContextType {
    fontFamily: FontFamily;
    setFontFamily: (f: FontFamily) => void;
    fontSize: number;
    setFontSize: (s: number) => void;
    showAllTranslations: boolean;
    setShowAllTranslations: (v: boolean) => void;
    drawerOpen: boolean;
    setDrawerOpen: (v: boolean) => void;
}

const SurahSettingsContext = createContext<SurahSettingsContextType | null>(null);

export const SurahSettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [fontFamily, setFontFamily] = useState<FontFamily>("naskh");
    const [fontSize, setFontSize] = useState(20);
    const [showAllTranslations, setShowAllTranslations] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false); // closed by default on mobile

    return (
        <SurahSettingsContext.Provider
            value={{
                fontFamily,
                setFontFamily,
                fontSize,
                setFontSize,
                showAllTranslations,
                setShowAllTranslations,
                drawerOpen,
                setDrawerOpen,
            }}
        >
            {children}
        </SurahSettingsContext.Provider>
    );
};

export const useSurahSettings = () => {
    const ctx = useContext(SurahSettingsContext);
    if (!ctx) throw new Error("useSurahSettings must be used within SurahSettingsProvider");
    return ctx;
};
