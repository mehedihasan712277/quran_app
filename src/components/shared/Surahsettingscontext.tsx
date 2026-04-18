"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type FontFamily = "naskh" | "kufi";

interface SurahSettingsContextType {
    fontFamily: FontFamily;
    setFontFamily: (f: FontFamily) => void;
    fontSize: number;
    setFontSize: (s: number) => void;
    translationFontSize: number;
    setTranslationFontSize: (s: number) => void;
    showAllTranslations: boolean;
    setShowAllTranslations: (v: boolean) => void;
    drawerOpen: boolean;
    setDrawerOpen: (v: boolean) => void;
}

const STORAGE_KEY = "surah-settings";

function loadSettings() {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

const SurahSettingsContext = createContext<SurahSettingsContextType | null>(null);

export const SurahSettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const saved = loadSettings();

    const [fontFamily, setFontFamily] = useState<FontFamily>(saved?.fontFamily ?? "naskh");
    const [fontSize, setFontSize] = useState<number>(saved?.fontSize ?? 26);
    const [translationFontSize, setTranslationFontSize] = useState<number>(saved?.translationFontSize ?? 14);
    const [showAllTranslations, setShowAllTranslations] = useState<boolean>(saved?.showAllTranslations ?? false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ fontFamily, fontSize, translationFontSize, showAllTranslations }));
        } catch {}
    }, [fontFamily, fontSize, translationFontSize, showAllTranslations]);

    return (
        <SurahSettingsContext.Provider
            value={{
                fontFamily,
                setFontFamily,
                fontSize,
                setFontSize,
                translationFontSize,
                setTranslationFontSize,
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
