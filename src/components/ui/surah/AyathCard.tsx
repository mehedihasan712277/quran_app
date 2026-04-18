"use client";

import { useSurahSettings } from "@/components/shared/Surahsettingscontext";
import { useState } from "react";

interface AyathCardProps {
    verseNumber: number;
    surahName: string;
    verseKey: string;
    arabicText: string;
    translation?: string;
    forceShowTranslation?: boolean;
    hideToggle?: boolean;
    highlightQuery?: string;
}

const highlight = (text: string, query: string) => {
    if (!query.trim()) return <>{text}</>;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return (
        <>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="rounded-sm px-0.5 text-black" style={{ background: "yellow" }}>
                        {part}
                    </mark>
                ) : (
                    part
                ),
            )}
        </>
    );
};

const AyathCard = ({ surahName, verseKey, arabicText, translation, forceShowTranslation, hideToggle, highlightQuery = "" }: AyathCardProps) => {
    const [localShow, setLocalShow] = useState(false);
    const { fontFamily, fontSize, showAllTranslations } = useSurahSettings();

    const translationVisible = forceShowTranslation || showAllTranslations || localShow;

    const arabicClass = fontFamily === "naskh" ? "font-arabic-naskh" : "font-arabic-kufi";

    return (
        <article className="group relative rounded-2xl border border-border bg-bg-soft p-3 sm:px-6 sm:py-6 transition-shadow duration-200 hover:shadow-md">
            {/* ── Verse number badge + controls ── */}
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-xs text-brand">
                        {surahName} · {verseKey.replace("_", " ")}
                    </span>
                </div>

                {translation && !showAllTranslations && !hideToggle && (
                    <button
                        onClick={() => setLocalShow((prev) => !prev)}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-bg-main text-text-muted hover:border-brand/40 hover:text-brand"
                    >
                        {localShow ? "Hide" : "Translation"}
                    </button>
                )}
            </div>

            {/* ── Arabic text ── */}
            <p
                dir="rtl"
                lang="ar"
                style={{ fontSize: `${fontSize}px` }}
                className={`text-right leading-loose tracking-wide text-text-primary ${arabicClass}`}
            >
                {arabicText}
            </p>

            {/* ── Translation ── */}
            {translationVisible && translation && (
                <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-text-secondary">
                    {highlight(translation, highlightQuery)}
                </p>
            )}
        </article>
    );
};

export default AyathCard;
