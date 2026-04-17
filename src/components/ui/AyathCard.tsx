"use client";

import { useState } from "react";
import { useSurahSettings } from "../shared/Surahsettingscontext";

interface AyathCardProps {
    verseNumber: number;
    surahName: string;
    verseKey: string;
    arabicText: string;
    translation?: string;
}

const AyathCard = ({ verseNumber, surahName, verseKey, arabicText, translation }: AyathCardProps) => {
    const [localShow, setLocalShow] = useState(false);
    const { fontFamily, fontSize, showAllTranslations } = useSurahSettings();

    // Global toggle overrides local — when turned off globally, revert to local state
    const translationVisible = showAllTranslations || localShow;

    const arabicClass = fontFamily === "naskh" ? "font-arabic-naskh" : "font-arabic-kufi";

    return (
        <article className="group relative rounded-2xl border border-border bg-bg-soft px-6 pt-6 pb-7 transition-shadow duration-200 hover:shadow-md">
            {/* ── Verse number badge + controls ── */}
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white shadow-sm">
                        {verseNumber}
                    </div>
                    <span className="text-xs text-text-muted">
                        {surahName} · {verseKey.replace("_", " ")}
                    </span>
                </div>

                {/* Per-verse toggle — hidden when global "show all" is on */}
                {translation && !showAllTranslations && (
                    <button
                        onClick={() => setLocalShow((prev) => !prev)}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-bg-main text-text-muted hover:border-brand/40 hover:text-brand transition-colors duration-150"
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
                className={`text-right leading-loose tracking-wide text-text-primary transition-all duration-200 ${arabicClass}`}
            >
                {arabicText}
            </p>

            {/* ── Translation ── */}
            {translationVisible && translation && (
                <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-text-secondary">{translation}</p>
            )}
        </article>
    );
};

export default AyathCard;
